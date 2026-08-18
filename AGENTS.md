# Project Guidelines & Persistent Rules: Học Cùng Thầy Sơn

## 1. Japanese Video Listening & Shadowing Specifications (`ListeningShadowing.tsx`)

### UI Modes:
1. **Nghe Thụ Động (`mode === "listening"`)**:
   - MUST ONLY display the Video Player / Audio Player, Live Karaoke Subtitle Banner, Control Bar, and Summary Vocabulary.
   - **DO NOT** display the line-by-line script cards with individual mic/record/read buttons in this mode.
2. **Shadowing (Đọc Nhại) (`mode === "shadowing"`)**:
   - Displays the Player + the complete line-by-line interactive script list with mic recording, recorded audio review ("Nghe Thu"), and single-sentence playback.

### Subtitle & Furigana Rules:
- **Kanji-Only Furigana**: Furigana (`<KanjiRuby />`) must strictly appear over Kanji characters only, never over plain Hiragana/Katakana.
- **YouTube Sync**: YouTube player listeners must use React refs (`activeEpisodeRef`, `currentLineIndexRef`, `autoScrollSubtitlesRef`) rather than state dependencies in player lifecycle `useEffect` hooks, preventing player teardown during playback.
- **YouTube Origin**: Embed URLs must include `&origin=${encodeURIComponent(window.location.origin)}` for iframe postMessage compatibility.

### Data Schema (`ListeningEpisode` in `src/data/listeningData.ts`):
- All episodes must follow the `ListeningEpisode` structure with accurate `startTime` and `endTime` in seconds, `youtubeId`, `lines` with `speaker`, `japanese`, `furigana`, `romaji`, `vietnamese`, `keywords`, and `summaryKeywords`.
