---
name: japanese-listening-video
description: Guidelines, data schemas, and UI behavioral specifications for building Japanese video listening and shadowing lessons.
---

# Japanese Video Listening & Shadowing Lesson Skill

This skill defines the complete data format, synchronization architecture, UI rules, and best practices for creating and maintaining Japanese listening and shadowing exercises with synchronized video and audio.

---

## 1. Episode Data Structure

Every listening episode must follow the `ListeningEpisode` schema defined in `src/data/listeningData.ts`:

```typescript
export interface ListeningKeyword {
  word: string;
  reading: string;
  meaning: string;
}

export interface ListeningLine {
  id: string;
  speaker: string;         // E.g. "妻 (Người vợ)", "夫 (Người chồng)", "Kingo", "店員"
  japanese: string;        // Japanese sentence with Kanji
  furigana: string;        // Space-separated furigana corresponding to Kanji
  romaji: string;          // Hepburn Romaji
  vietnamese: string;      // Natural Vietnamese translation
  startTime?: number;      // Start timestamp in seconds for video/audio sync
  endTime?: number;        // End timestamp in seconds for video/audio sync
  audioUrl?: string;       // Optional dedicated line audio
  keywords?: ListeningKeyword[]; // Vocabulary points in this sentence
}

export interface ListeningEpisode {
  id: string;              // E.g. "youtube-rX55rRxdpR0" or "custom-<timestamp>"
  title: string;           // Descriptive title (e.g. "告白 (Lời Tỏ Tình)")
  level: "N5" | "N4" | "N3";
  category: string;        // E.g. "Giao Tiếp Thực Tế", "Đời Sống Hằng Ngày", "Công Sở"
  icon: string;            // Relevant Emoji icon (e.g. "💖", "🎬", "🍱")
  durationEst: string;     // E.g. "14 giây", "1 phút 20 giây"
  description: string;     // Brief context summary
  youtubeId?: string;      // Clean 11-character YouTube video ID
  lines: ListeningLine[];  // Array of dialogue lines with timestamps
  summaryKeywords: ListeningKeyword[]; // Key vocabulary summarizing the episode
}
```

---

## 2. Strict UI Mode Separation

The listening system has **two distinct modes**:

### A. Nghe Thụ Động (`mode === "listening"`)
- **Purpose**: Continuous, immersive listening experience without clutter.
- **Includes**:
  1. YouTube HD Video player container with live timestamp display.
  2. Real-time Live Subtitle Karaoke Banner directly under the video (showing active sentence with KanjiRuby, Romaji, Vietnamese).
  3. Player Control Toolbar (Play/Pause, Replay, Seek ±5s, Speed 0.75x/1.0x/1.25x).
  4. Episode Summary Vocabulary Card (`summaryKeywords`).
- **FORBIDDEN**: **NEVER display the individual line-by-line script cards with mic/record/read buttons in this mode.**

### B. Shadowing (Đọc Nhại) (`mode === "shadowing"`)
- **Purpose**: Interactive speaking and shadowing practice.
- **Includes**:
  1. Video/Audio player and live karaoke subtitle banner.
  2. Full **Nội Dung Kịch Bản Luyện Tập** line-by-line list:
     - Individual sentence speak button (plays only that single sentence and stops).
     - Individual microphone record button (`MediaRecorder`) for shadowing practice.
     - "Nghe Thu" playback button to review recorded voice.
     - Keyword badges for each sentence.

---

## 3. Video & Subtitle Sync Rules

1. **Independent Lifecycle**:
   - The YouTube listener `useEffect` MUST NOT include `currentLineIndex` in its dependency array.
   - Use `activeEpisodeRef`, `currentLineIndexRef`, and `autoScrollSubtitlesRef` to avoid tearing down the YouTube player instance during line changes.
2. **Origin Security**:
   - Always append `&origin=${encodeURIComponent(window.location.origin)}` to YouTube iframe `src` to support sandboxed and cloud environments.
3. **Dual Polling**:
   - Combine YouTube Iframe API `getCurrentTime()` with a 200ms polling interval and `postMessage` fallback for rock-solid timestamp tracking.
4. **Single-Sentence Playback**:
   - When playing a single line (`playSingleLine`), set `singleLineTargetRef.current = { lineIdx, endTime }` and pause the video immediately when `time >= endTime`.

---

## 4. Typography & Furigana Rules

- **Kanji-Only Furigana**: Furigana must only appear above Kanji characters. Plain Hiragana/Katakana must never have redundant ruby text above them.
- Render all Japanese sentences with the `<KanjiRuby />` component to guarantee correct syllable alignment.
