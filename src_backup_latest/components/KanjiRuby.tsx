import React from "react";

export interface RubySegment {
  text: string;
  ruby?: string;
  isKanji: boolean;
}

const KANJI_REGEX = /[\u4E00-\u9FAF\u3400-\u4DBF\uF900-\uFAFF]/;

/**
 * Convert Katakana to Hiragana (including prolonged sound mark handling)
 */
function toHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

function normalizeKana(str: string): string {
  return toHiragana(str)
    .replace(/[\s　、。！？,.!?…「」『』〜~ー・\-]/g, "")
    .toLowerCase();
}

/**
 * Universal parser for Japanese text with Furigana.
 * STRICT RULES:
 * 1. KHÔNG phiên âm chữ Hiragana (không đặt <rt> trên chữ Hiragana).
 * 2. CHỈ phiên âm chữ Hán (Kanji).
 * 3. Chữ Katakana giữ nguyên dạng Katakana (không phiên âm Hiragana cho Katakana).
 */
export function parseKanjiRuby(japanese: string, furigana?: string): RubySegment[] {
  if (!japanese) return [];

  // Check if string contains any Kanji
  if (!KANJI_REGEX.test(japanese)) {
    return [{ text: japanese, isKanji: false }];
  }

  // 1. Check if string uses explicit bracket notation like [最後|さいご]まで[聞|き]けよ！ or [最後](さいご)
  if (/\[.+?[\||\(].+?[\]|\)]/.test(japanese)) {
    const segments: RubySegment[] = [];
    const regex = /\[([^\|\]\(\)]+)[\||\(]([^\]\)]+)[\]|\)]|([^\[]+)/g;
    let match;
    while ((match = regex.exec(japanese)) !== null) {
      if (match[1] && match[2]) {
        const hasKanji = KANJI_REGEX.test(match[1]);
        if (hasKanji) {
          segments.push({ text: match[1], ruby: match[2].trim(), isKanji: true });
        } else {
          segments.push({ text: match[1], isKanji: false });
        }
      } else if (match[3]) {
        segments.push({ text: match[3], isKanji: false });
      }
    }
    return segments;
  }

  // If no furigana or identical, return without ruby
  if (!furigana || furigana.trim() === "" || furigana.trim() === japanese.trim()) {
    return [{ text: japanese, isKanji: false }];
  }

  // 2. Break japanese into tokens: Kanji blocks vs Non-Kanji blocks
  const tokens: { text: string; isKanji: boolean }[] = [];
  let currentText = "";
  let currentIsKanji = false;

  for (let i = 0; i < japanese.length; i++) {
    const char = japanese[i];
    const isK = KANJI_REGEX.test(char);
    if (i === 0) {
      currentText = char;
      currentIsKanji = isK;
    } else if (isK === currentIsKanji) {
      currentText += char;
    } else {
      tokens.push({ text: currentText, isKanji: currentIsKanji });
      currentText = char;
      currentIsKanji = isK;
    }
  }
  if (currentText) {
    tokens.push({ text: currentText, isKanji: currentIsKanji });
  }

  // Clean Furigana string (strip redundant spaces while keeping content)
  const cleanFuri = furigana.replace(/[\s　]+/g, "");
  const result: RubySegment[] = [];
  let furiIdx = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token.isKanji) {
      // Non-Kanji (Hiragana, Katakana, Punctuation, Latin, Whitespace) -> NO RUBY!
      result.push({ text: token.text, isKanji: false });

      // Find anchor in cleanFuri to advance index
      const cleanTokenText = token.text.replace(/[\s　]+/g, "");
      if (!cleanTokenText) continue;

      const hiraToken = toHiragana(cleanTokenText);
      let matchPos = cleanFuri.indexOf(cleanTokenText, furiIdx);
      if (matchPos === -1 && hiraToken !== cleanTokenText) {
        matchPos = cleanFuri.indexOf(hiraToken, furiIdx);
      }
      
      // If still not found, try matching first character
      if (matchPos === -1 && cleanTokenText.length > 0) {
        const firstChar = cleanTokenText[0];
        const firstHira = toHiragana(firstChar);
        matchPos = cleanFuri.indexOf(firstChar, furiIdx);
        if (matchPos === -1 && firstHira !== firstChar) {
          matchPos = cleanFuri.indexOf(firstHira, furiIdx);
        }
      }

      if (matchPos !== -1) {
        furiIdx = matchPos + cleanTokenText.length;
      }
    } else {
      // Kanji block -> Find the next anchor in tokens
      const nextToken = tokens[i + 1];
      if (nextToken) {
        const nextCleanText = nextToken.text.replace(/[\s　]+/g, "");
        const nextHira = toHiragana(nextCleanText);
        let nextPos = nextCleanText ? cleanFuri.indexOf(nextCleanText, furiIdx) : -1;
        if (nextPos === -1 && nextHira && nextHira !== nextCleanText) {
          nextPos = cleanFuri.indexOf(nextHira, furiIdx);
        }

        // Try matching prefix if full next token isn't found
        if (nextPos === -1 && nextCleanText.length > 1) {
          for (let len = nextCleanText.length - 1; len >= 1; len--) {
            const prefix = nextCleanText.slice(0, len);
            const prefixHira = toHiragana(prefix);
            nextPos = cleanFuri.indexOf(prefix, furiIdx);
            if (nextPos === -1 && prefixHira !== prefix) {
              nextPos = cleanFuri.indexOf(prefixHira, furiIdx);
            }
            if (nextPos !== -1) break;
          }
        }

        if (nextPos !== -1 && nextPos >= furiIdx) {
          const rubyText = cleanFuri.slice(furiIdx, nextPos);
          result.push({ text: token.text, ruby: rubyText, isKanji: true });
          furiIdx = nextPos;
        } else {
          result.push({ text: token.text, isKanji: true });
        }
      } else {
        // Last token is Kanji -> takes the remainder of cleanFuri
        const rubyText = cleanFuri.slice(furiIdx);
        result.push({ text: token.text, ruby: rubyText, isKanji: true });
        furiIdx = cleanFuri.length;
      }
    }
  }

  return result;
}

interface KanjiRubyProps {
  japanese: string;
  furigana?: string;
  showFurigana?: boolean;
  className?: string;
  rtClassName?: string;
}

export const KanjiRuby: React.FC<KanjiRubyProps> = ({
  japanese,
  furigana,
  showFurigana = true,
  className = "",
  rtClassName = "text-amber-300"
}) => {
  if (!showFurigana || !japanese) {
    return <span className={className}>{japanese}</span>;
  }

  const segments = parseKanjiRuby(japanese, furigana);

  return (
    <span className={`kanji-ruby-container ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.isKanji && seg.ruby && seg.ruby.trim() !== "") {
          return (
            <ruby key={idx} className="kanji-ruby">
              {seg.text}
              <rt className={`kanji-rt ${rtClassName}`}>{seg.ruby}</rt>
            </ruby>
          );
        }
        return <span key={idx}>{seg.text}</span>;
      })}
    </span>
  );
};
