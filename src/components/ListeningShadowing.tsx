import React, { useState, useEffect, useRef, useCallback } from "react";
import { playSound } from "../utils/audio";
import { 
  PRESET_LISTENING_EPISODES, 
  ListeningEpisode, 
  ListeningLine, 
  ListeningKeyword 
} from "../data/listeningData";
import { KanjiRuby } from "./KanjiRuby";
import { 
  Play, 
  Pause, 
  Square,
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Sparkles, 
  Headphones, 
  Mic, 
  MicOff, 
  BookOpen, 
  ArrowLeft, 
  Sliders, 
  Layers, 
  Check, 
  RefreshCw,
  Globe,
  Radio,
  Type,
  Video,
  Edit3,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Save,
  FileText,
  FastForward,
  Rewind,
  ExternalLink
} from "lucide-react";

interface ListeningShadowingProps {
  onGoBack?: () => void;
}

export default function ListeningShadowing({ onGoBack }: ListeningShadowingProps) {
  // --- Episode Selection & LocalStorage Persistence State ---
  const [selectedLevel, setSelectedLevel] = useState<"ALL" | "N5" | "N4" | "N3">("ALL");
  const [episodesList, setEpisodesList] = useState<ListeningEpisode[]>(() => {
    try {
      const saved = localStorage.getItem("custom_listening_episodes_v5");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const presetMap = new Map(PRESET_LISTENING_EPISODES.map(ep => [ep.id, ep]));
          // Retain only valid custom user-created episodes
          const customEpisodes = parsed.filter((ep: ListeningEpisode) => 
            (ep.id.startsWith("custom-") || ep.id.startsWith("ai-")) &&
            !presetMap.has(ep.id)
          );
          return [...PRESET_LISTENING_EPISODES, ...customEpisodes];
        }
      }
    } catch (e) {}
    return PRESET_LISTENING_EPISODES;
  });

  // Purge obsolete cache keys after mount
  useEffect(() => {
    try {
      localStorage.removeItem("custom_listening_episodes_v4");
      localStorage.removeItem("custom_listening_episodes_v3");
      localStorage.removeItem("custom_listening_episodes_v2");
      localStorage.removeItem("custom_listening_episodes");
    } catch (e) {}
  }, []);

  const [activeEpisode, setActiveEpisode] = useState<ListeningEpisode | null>(() => {
    return episodesList[0] || null;
  });

  // Ensure activeEpisode is updated if it was invalid
  useEffect(() => {
    if (!episodesList.some(ep => ep.id === activeEpisode?.id)) {
      setActiveEpisode(episodesList[0] || null);
    }
  }, [episodesList, activeEpisode]);

  // Auto save episode list changes
  useEffect(() => {
    try {
      localStorage.setItem("custom_listening_episodes_v5", JSON.stringify(episodesList));
    } catch (e) {}
  }, [episodesList]);

  const filteredEpisodes = episodesList.filter(
    ep => selectedLevel === "ALL" || ep.level === selectedLevel
  );

  // --- YouTube Script Editor & Custom Subtitle Modal State ---
  const [showScriptEditorModal, setShowScriptEditorModal] = useState<boolean>(false);
  const [editYoutubeUrl, setEditYoutubeUrl] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editLevel, setEditLevel] = useState<"N5" | "N4" | "N3">("N4");
  const [editCategory, setEditCategory] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editLines, setEditLines] = useState<ListeningLine[]>([]);
  const [rawTranscriptInput, setRawTranscriptInput] = useState<string>("");
  const [isProcessingRawAi, setIsProcessingRawAi] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<"lines" | "ai_raw">("lines");

  // --- AI Generator Modal State ---
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiLevel, setAiLevel] = useState<"N5" | "N4" | "N3">("N5");
  const [aiContentType, setAiContentType] = useState<"dialogue" | "monologue">("dialogue");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiErrorMessage, setAiErrorMessage] = useState("");

  // --- Learning Experience Mode: "video" (Xem video & đọc sub bên dưới) | "listening" (Luyện nghe & Shadowing) ---
  const [experienceMode, setExperienceMode] = useState<"video" | "listening">("video");
  const [autoScrollSubtitles, setAutoScrollSubtitles] = useState<boolean>(true);

  // --- Player State ---
  const [mode, setMode] = useState<"listening" | "shadowing">("listening");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0); // 0.75, 1.0, 1.25
  const [loopMode, setLoopMode] = useState<"off" | "line" | "episode">("off");
  const [shadowingPauseSec, setShadowingPauseSec] = useState<number>(3); // seconds to pause between lines in shadowing mode
  const [isPausedInShadowing, setIsPausedInShadowing] = useState(false);
  const [shadowingCountdown, setShadowingCountdown] = useState<number>(0);

  // --- Display Toggles ---
  const [showFurigana, setShowFurigana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(true);

  // --- YouTube Iframe & Sync State ---
  const ytPlayerRef = useRef<any>(null);
  const [isYtReady, setIsYtReady] = useState<boolean>(false);
  const [ytCurrentTime, setYtCurrentTime] = useState<number>(0);
  const [ytDuration, setYtDuration] = useState<number>(0);

  // Send control commands directly to the YouTube iframe
  const postYoutubeCommand = useCallback((func: string, args: any[] = []) => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current[func] === "function") {
      try {
        ytPlayerRef.current[func](...args);
        return;
      } catch (e) {}
    }
    const iframe = document.getElementById("youtube-video-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: "command",
          func,
          args
        }), "*");
      } catch (e) {}
    }
  }, []);

  const seekYoutubeRelative = (deltaSeconds: number) => {
    playSound.click();
    const target = Math.max(0, Math.min(ytDuration || 9999, ytCurrentTime + deltaSeconds));
    setYtCurrentTime(target);
    postYoutubeCommand("seekTo", [target, true]);
  };

  const handleSetSpeed = (newSpeed: number) => {
    playSound.click();
    setSpeed(newSpeed);
    postYoutubeCommand("setPlaybackRate", [newSpeed]);
  };

  // --- Custom Original MP3 Audio Tape & YouTube Video State ---
  const [episodeAudioSourceMap, setEpisodeAudioSourceMap] = useState<Record<string, { url: string; name: string }>>({});
  const [customYoutubeMap, setCustomYoutubeMap] = useState<Record<string, string>>({});
  const [showMp3SourceModal, setShowMp3SourceModal] = useState<boolean>(false);
  const [customAudioUrlInput, setCustomAudioUrlInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const extractYoutubeId = (url: string) => {
    if (!url) return null;
    const clean = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = clean.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);

  // Synchronize activeYoutubeId with activeEpisode or custom map
  useEffect(() => {
    const ytid = activeEpisode ? (customYoutubeMap[activeEpisode.id] || activeEpisode.youtubeId || null) : null;
    setActiveYoutubeId(ytid);
  }, [activeEpisode, customYoutubeMap]);

  // Synchronize dynamic references for timer/message handlers to prevent teardown cycles
  const activeEpisodeRef = useRef(activeEpisode);
  const currentLineIndexRef = useRef(currentLineIndex);
  const autoScrollSubtitlesRef = useRef(autoScrollSubtitles);

  useEffect(() => {
    activeEpisodeRef.current = activeEpisode;
  }, [activeEpisode]);

  useEffect(() => {
    currentLineIndexRef.current = currentLineIndex;
  }, [currentLineIndex]);

  useEffect(() => {
    autoScrollSubtitlesRef.current = autoScrollSubtitles;
  }, [autoScrollSubtitles]);

  // Safe subtitle jump / sync callback based on current video time
  const updateSubtitlesForTime = useCallback((time: number) => {
    if (singleLineTargetRef.current && time >= singleLineTargetRef.current.endTime) {
      singleLineTargetRef.current = null;
      postYoutubeCommand("pauseVideo");
      setIsPlaying(false);
      isPlayingRef.current = false;
    }

    const ep = activeEpisodeRef.current;
    if (ep && ep.lines && ep.lines.length > 0) {
      const matchedIndex = ep.lines.findIndex((line, idx) => {
        const start = line.startTime ?? (idx * 4);
        const nextLine = ep.lines[idx + 1];
        const end = line.endTime ?? (nextLine?.startTime ?? start + 4);
        return time >= start && time < end;
      });

      if (matchedIndex !== -1 && matchedIndex !== currentLineIndexRef.current) {
        currentLineIndexRef.current = matchedIndex;
        setCurrentLineIndex(matchedIndex);
        if (autoScrollSubtitlesRef.current) {
          lineRefs.current[matchedIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }
  }, [postYoutubeCommand]);

  // Initialize YouTube listener and bidirectional state sync (independent of line changes)
  useEffect(() => {
    if (!activeYoutubeId) return;

    setIsYtReady(true);

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (!data) return;

        if (data.event === "infoDelivery" && data.info) {
          if (typeof data.info.currentTime === "number") {
            const time = data.info.currentTime;
            setYtCurrentTime(time);
            updateSubtitlesForTime(time);
          }

          if (typeof data.info.duration === "number") {
            setYtDuration(data.info.duration);
          }

          if (typeof data.info.playerState === "number") {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (data.info.playerState === 1) {
              setIsPlaying(true);
              isPlayingRef.current = true;
            } else if (data.info.playerState === 2 || data.info.playerState === 0) {
              setIsPlaying(false);
              isPlayingRef.current = false;
            }
          }
        }
      } catch (e) {}
    };

    window.addEventListener("message", handleMessage);

    // Continuous poll interval for active playback time
    const interval = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        try {
          const time = ytPlayerRef.current.getCurrentTime();
          if (typeof time === "number" && !isNaN(time)) {
            setYtCurrentTime(time);
            updateSubtitlesForTime(time);
          }
          const dur = ytPlayerRef.current.getDuration();
          if (typeof dur === "number" && !isNaN(dur) && dur > 0) {
            setYtDuration(dur);
          }
        } catch (e) {}
      } else {
        // Direct postMessage ping to iframe
        const iframe = document.getElementById("youtube-video-iframe") as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
          } catch (e) {}
        }
      }
    }, 200);

    // Also connect to YouTube Iframe API if available
    const initYT = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        try {
          if (ytPlayerRef.current) {
            try { ytPlayerRef.current.destroy(); } catch (e) {}
          }
          ytPlayerRef.current = new (window as any).YT.Player("youtube-video-iframe", {
            events: {
              onReady: (event: any) => {
                setIsYtReady(true);
                try {
                  setYtDuration(event.target.getDuration());
                  const firstStart = activeEpisodeRef.current?.lines?.[0]?.startTime ?? 0;
                  if (firstStart > 0) {
                    setYtCurrentTime(firstStart);
                  }
                } catch (e) {}
              },
              onStateChange: (event: any) => {
                if (event.data === 1) {
                  setIsPlaying(true);
                  isPlayingRef.current = true;
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                  isPlayingRef.current = false;
                }
              }
            }
          });
        } catch (err) {
          // Iframe API binding fallback
        }
      } else {
        if (!document.getElementById("youtube-iframe-api-script")) {
          const tag = document.createElement("script");
          tag.id = "youtube-iframe-api-script";
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }
      }
    };

    const timer = setTimeout(initYT, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("message", handleMessage);
      if (ytPlayerRef.current) {
        try { ytPlayerRef.current.destroy(); } catch (e) {}
        ytPlayerRef.current = null;
      }
    };
  }, [activeYoutubeId, activeEpisode?.id, updateSubtitlesForTime]);

  // --- Audio Voice & Engine State ---
  const [ttsEngine, setTtsEngine] = useState<"gemini" | "browser">("gemini");
  const [voiceGender, setVoiceGender] = useState<"auto" | "female" | "male">("auto");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [isLoadingTts, setIsLoadingTts] = useState<boolean>(false);
  const [showVoiceSettingsModal, setShowVoiceSettingsModal] = useState<boolean>(false);

  // Audio References & Playback Session Token
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const playbackTokenRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const singleLineTargetRef = useRef<{ lineIdx: number; endTime: number } | null>(null);

  // --- Microphone Recording State (User Shadowing Rec) ---
  const [recordingLineId, setRecordingLineId] = useState<string | null>(null);
  const [recordedAudioMap, setRecordedAudioMap] = useState<Record<string, string>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Refs
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isSpeechActiveRef = useRef(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch & Load Browser Japanese Voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const jaVoices = voices.filter(v => 
          v.lang.toLowerCase().includes("ja") || 
          v.name.toLowerCase().includes("japan") || 
          v.name.toLowerCase().includes("kyoko") || 
          v.name.toLowerCase().includes("nanami") ||
          v.name.toLowerCase().includes("otoya")
        );
        setAvailableVoices(jaVoices.length > 0 ? jaVoices : voices);
        
        if (jaVoices.length > 0 && !selectedVoiceURI) {
          // Prioritize high quality natural Japanese voices
          const preferred = jaVoices.find(v => 
            v.name.includes("Google") || 
            v.name.includes("Natural") || 
            v.name.includes("Nanami") || 
            v.name.includes("Kyoko") ||
            v.name.includes("Keita") ||
            v.name.includes("Otoya")
          ) || jaVoices[0];
          setSelectedVoiceURI(preferred.voiceURI);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoiceURI]);

  // PA 1: Primary Web Speech API Engine with Speaker Pitch & High Quality Japanese Voice
  const speakBrowserSpeech = (text: string, speaker?: string, token?: number, onEndCallback?: () => void) => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ Web Speech API tiếng Nhật.");
      if (onEndCallback) onEndCallback();
      return;
    }

    window.speechSynthesis.cancel();

    if (token !== undefined && token !== playbackTokenRef.current) return;
    if (!isPlayingRef.current && token !== undefined) return;

    const cleanText = text.replace(/[\(\)（）]/g, "").trim();
    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ja-JP";
    utterance.rate = speed;

    // Pitch & Voice differentiation for characters
    const spk = (speaker || "").toLowerCase();
    const isMale = spk.includes("tanaka") || spk.includes("yamada") || spk.includes("nam") || spk.includes("bác sĩ") || spk.includes("医師") || spk.includes("面接官") || spk.includes("anh") || spk.includes("keita") || spk.includes("otoya");
    const isFemale = spk.includes("sakura") || spk.includes("linh") || spk.includes("nữ") || spk.includes("chị") || spk.includes("yuri") || spk.includes("店員") || spk.includes("nanami") || spk.includes("kyoko");

    if (isMale) {
      utterance.pitch = 0.88; // Lower pitch for male speakers
    } else if (isFemale) {
      utterance.pitch = 1.12; // Higher pitch for female speakers
    } else {
      utterance.pitch = 1.0;
    }

    const voices = window.speechSynthesis.getVoices();
    const jaVoices = voices.filter(v => v.lang.toLowerCase().includes("ja"));

    let targetVoice = voices.find(v => v.voiceURI === selectedVoiceURI);

    // If specific gender is needed and user didn't force a single voiceURI
    if (!targetVoice && jaVoices.length > 0) {
      if (isMale) {
        targetVoice = jaVoices.find(v => v.name.includes("Keita") || v.name.includes("Otoya") || v.name.includes("Hattori") || v.name.toLowerCase().includes("male")) || jaVoices[0];
      } else if (isFemale) {
        targetVoice = jaVoices.find(v => v.name.includes("Nanami") || v.name.includes("Kyoko") || v.name.includes("Google") || v.name.toLowerCase().includes("female")) || jaVoices[0];
      } else {
        targetVoice = jaVoices.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Nanami")) || jaVoices[0];
      }
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onstart = () => { isSpeechActiveRef.current = true; };
    utterance.onend = () => {
      isSpeechActiveRef.current = false;
      if (token !== undefined && token !== playbackTokenRef.current) return;
      if (!isPlayingRef.current) return;
      if (onEndCallback) onEndCallback();
    };
    utterance.onerror = (e) => {
      console.warn("Browser speech notice:", e);
      isSpeechActiveRef.current = false;
      if (token !== undefined && token !== playbackTokenRef.current) return;
      if (!isPlayingRef.current) return;
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Pre-fetch all lines in active episode sequentially in background with delay
  const prefetchEpisodeAudio = useCallback(async (episode: ListeningEpisode | null) => {
    if (!episode || !episode.lines || ttsEngine === "browser" || episode.youtubeId) return;

    const lines = episode.lines;
    // Process strictly sequentially with a 1.2s delay between requests to respect rate limits
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const cleanText = line.japanese.replace(/[\(\)（）]/g, "").trim();
      if (!cleanText) continue;

      const cacheKey = `${cleanText}_${line.speaker || ''}_${voiceGender}`;
      if (audioCacheRef.current.has(cacheKey)) continue;

      try {
        const res = await fetch("/api/gemini/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: cleanText,
            speaker: line.speaker,
            gender: voiceGender === "auto" ? undefined : voiceGender
          }),
        });
        const data = await res.json();
        if (data.audioBase64) {
          const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
          audioCacheRef.current.set(cacheKey, audioUrl);
        }
      } catch (e) {
        console.warn("Background audio pre-fetch skipped for line:", line.japanese);
      }

      // Wait 1.2s before prefetching next line
      await new Promise((r) => setTimeout(r, 1200));
    }
  }, [ttsEngine, voiceGender]);

  // Pre-fetch episode audio whenever activeEpisode or tts settings change
  useEffect(() => {
    if (activeEpisode && ttsEngine === "gemini") {
      prefetchEpisodeAudio(activeEpisode);
    }
  }, [activeEpisode, ttsEngine, voiceGender, prefetchEpisodeAudio]);

  // Main Speech function (Native Audio MP3 / Google Japanese HD / Browser Speech)
  const speakJapaneseLine = async (
    text: string, 
    speaker?: string, 
    token?: number, 
    onEndCallback?: () => void,
    directAudioUrl?: string
  ) => {
    const currentToken = token ?? playbackTokenRef.current;

    // Check cancellation
    if (currentToken !== playbackTokenRef.current || !isPlayingRef.current) {
      return;
    }

    // If Browser Speech engine is manually chosen by user in settings
    if (ttsEngine === "browser") {
      speakBrowserSpeech(text, speaker, currentToken, onEndCallback);
      return;
    }

    // Native Audio MP3 / Google Studio Voice Engine
    try {
      const cleanText = text.replace(/[\(\)（）]/g, "").trim();
      const cacheKey = `${cleanText}_${speaker || ''}_${voiceGender}`;
      let audioUrl = directAudioUrl || audioCacheRef.current.get(cacheKey);

      if (!audioUrl) {
        setIsLoadingTts(true);
        let res = await fetch("/api/gemini/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: cleanText,
            speaker,
            gender: voiceGender === "auto" ? undefined : voiceGender
          }),
        });

        if (currentToken !== playbackTokenRef.current || !isPlayingRef.current) {
          setIsLoadingTts(false);
          return;
        }

        let data = await res.json();

        // If rate limited, retry once on client side after 1.5s
        if (!data.audioBase64 && res.status === 429) {
          await new Promise((r) => setTimeout(r, 1500));
          if (currentToken !== playbackTokenRef.current || !isPlayingRef.current) {
            setIsLoadingTts(false);
            return;
          }
          res = await fetch("/api/gemini/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: cleanText,
              speaker,
              gender: voiceGender === "auto" ? undefined : voiceGender
            }),
          });
          data = await res.json();
        }

        if (data.audioBase64) {
          audioUrl = `data:${data.mimeType || 'audio/mpeg'};base64,${data.audioBase64}`;
          audioCacheRef.current.set(cacheKey, audioUrl);
        } else {
          throw new Error(data.error || "Lỗi tải âm thanh tiếng Nhật");
        }
      }

      setIsLoadingTts(false);

      if (currentToken !== playbackTokenRef.current || !isPlayingRef.current) {
        return;
      }

      // Proactively pre-fetch the next line in background
      if (activeEpisode && activeEpisode.lines[currentLineIndex + 1]) {
        const nextLine = activeEpisode.lines[currentLineIndex + 1];
        const nextCleanText = nextLine.japanese.replace(/[\(\)（）]/g, "").trim();
        const nextCacheKey = `${nextCleanText}_${nextLine.speaker || ''}_${voiceGender}`;
        if (!audioCacheRef.current.has(nextCacheKey)) {
          fetch("/api/gemini/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: nextCleanText,
              speaker: nextLine.speaker,
              gender: voiceGender === "auto" ? undefined : voiceGender
            }),
          })
            .then(r => r.json())
            .then(d => {
              if (d.audioBase64) {
                audioCacheRef.current.set(nextCacheKey, `data:${d.mimeType || 'audio/mpeg'};base64,${d.audioBase64}`);
              }
            })
            .catch(() => {});
        }
      }

      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audio.playbackRate = speed;
      currentAudioRef.current = audio;

      audio.onended = () => {
        isSpeechActiveRef.current = false;
        if (currentToken !== playbackTokenRef.current || !isPlayingRef.current) return;
        if (onEndCallback) onEndCallback();
      };

      audio.onerror = (e) => {
        console.warn("Audio element error:", e);
        setIsLoadingTts(false);
      };

      isSpeechActiveRef.current = true;
      await audio.play();
    } catch (err) {
      console.warn("Audio Playback Notice, falling back to browser speech:", err);
      setIsLoadingTts(false);
      // Graceful fallback to browser speech synthesis
      speakBrowserSpeech(text, speaker, currentToken, onEndCallback);
    }
  };

  // Stop playback completely
  const stopPlayback = () => {
    // Clear single line target
    singleLineTargetRef.current = null;

    // Increment playback token to invalidate any in-flight promises or timeouts
    playbackTokenRef.current++;
    isPlayingRef.current = false;

    // Stop browser synthesis immediately
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // Stop and unload HTML Audio element immediately
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }

    // Clear active shadowing countdown timer
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    // Reset UI state flags
    setIsPlaying(false);
    setIsPausedInShadowing(false);
    setIsLoadingTts(false);
  };

  // Auto scroll active line into view smoothly
  useEffect(() => {
    if (activeEpisode && lineRefs.current[currentLineIndex]) {
      lineRefs.current[currentLineIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentLineIndex, activeEpisode]);

  // Clean up timers & speech on unmount or episode change
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [activeEpisode]);

  // Play line handler (continuous full audio / dialogue progression)
  const playCurrentLine = (lineIdx: number) => {
    if (!activeEpisode || !activeEpisode.lines[lineIdx]) return;

    singleLineTargetRef.current = null;
    const currentToken = ++playbackTokenRef.current;
    isPlayingRef.current = true;
    setIsPlaying(true);
    setIsPausedInShadowing(false);
    setCurrentLineIndex(lineIdx);

    const line = activeEpisode.lines[lineIdx];

    speakJapaneseLine(line.japanese, line.speaker, currentToken, () => {
      if (playbackTokenRef.current !== currentToken || !isPlayingRef.current) return;
      if (!activeEpisode) return;

      if (mode === "shadowing") {
        // Pause for shadowing repeating time
        setIsPausedInShadowing(true);
        setShadowingCountdown(shadowingPauseSec);

        let remaining = shadowingPauseSec;
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

        countdownTimerRef.current = setInterval(() => {
          if (playbackTokenRef.current !== currentToken || !isPlayingRef.current) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            return;
          }

          remaining -= 1;
          setShadowingCountdown(remaining);

          if (remaining <= 0) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            setIsPausedInShadowing(false);

            // Move to next step or loop
            handleAfterLineFinished(lineIdx, currentToken);
          }
        }, 1000);
      } else {
        // Normal continuous listening mode
        handleAfterLineFinished(lineIdx, currentToken);
      }
    }, line.audioUrl);
  };

  const handleAfterLineFinished = (lineIdx: number, token?: number) => {
    if (!activeEpisode) return;
    if (token !== undefined && (playbackTokenRef.current !== token || !isPlayingRef.current)) return;

    if (loopMode === "line") {
      // Repeat same line
      playCurrentLine(lineIdx);
    } else if (lineIdx < activeEpisode.lines.length - 1) {
      // Move to next line
      playCurrentLine(lineIdx + 1);
    } else {
      // Reached end of episode
      if (loopMode === "episode") {
        playCurrentLine(0);
      } else {
        stopPlayback();
        playSound.correct();
      }
    }
  };

  const togglePlayPause = () => {
    playSound.click();
    singleLineTargetRef.current = null;
    if (activeYoutubeId) {
      if (isPlaying) {
        postYoutubeCommand("pauseVideo");
        setIsPlaying(false);
        isPlayingRef.current = false;
      } else {
        const firstStart = activeEpisode?.lines?.[0]?.startTime ?? 0;
        if (firstStart > 0 && ytCurrentTime < firstStart - 1) {
          postYoutubeCommand("seekTo", [firstStart, true]);
        }
        postYoutubeCommand("playVideo");
        setIsPlaying(true);
        isPlayingRef.current = true;
      }
    } else {
      if (isPlaying) {
        stopPlayback();
      } else {
        playCurrentLine(currentLineIndex);
      }
    }
  };

  // Play ONLY a single selected line and stop immediately when finished (do not advance to next line)
  const playSingleLine = (index: number) => {
    if (!activeEpisode || !activeEpisode.lines[index]) return;
    playSound.click();
    stopPlayback();
    setCurrentLineIndex(index);

    const line = activeEpisode.lines[index];

    if (activeYoutubeId) {
      const targetStart = Math.max(0, (line.startTime ?? (index * 4)) - 0.2);
      const nextLine = activeEpisode.lines[index + 1];
      const targetEnd = nextLine?.startTime 
        ? Math.max(nextLine.startTime, (line.endTime ?? targetStart + 3) + 0.6)
        : (line.endTime ? line.endTime + 0.8 : targetStart + 5);

      singleLineTargetRef.current = { lineIdx: index, endTime: targetEnd };
      postYoutubeCommand("seekTo", [targetStart, true]);
      postYoutubeCommand("playVideo");
      setIsPlaying(true);
      isPlayingRef.current = true;
    } else {
      const currentToken = ++playbackTokenRef.current;
      isPlayingRef.current = true;
      setIsPlaying(true);
      setIsPausedInShadowing(false);

      speakJapaneseLine(
        line.japanese,
        line.speaker,
        currentToken,
        () => {
          // Finished playing this single line -> stop immediately, do NOT advance to next line!
          if (playbackTokenRef.current === currentToken) {
            stopPlayback();
          }
        },
        line.audioUrl
      );
    }
  };

  const jumpToLine = (index: number) => {
    playSingleLine(index);
  };

  const handleNextLine = () => {
    if (!activeEpisode) return;
    playSound.click();
    const nextIdx = Math.min(activeEpisode.lines.length - 1, currentLineIndex + 1);
    playSingleLine(nextIdx);
  };

  const handlePrevLine = () => {
    if (!activeEpisode) return;
    playSound.click();
    const prevIdx = Math.max(0, currentLineIndex - 1);
    playSingleLine(prevIdx);
  };

  // --- Voice Recording Handler for User Shadowing Practice ---
  const startRecordingLine = async (lineId: string) => {
    try {
      playSound.click();
      stopPlayback();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioMap(prev => ({ ...prev, [lineId]: audioUrl }));
        setRecordingLineId(null);
        playSound.correct();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecordingLineId(lineId);
    } catch (err) {
      console.error("Mic access denied:", err);
      alert("Vui lòng cấp quyền truy cập micro để thu âm giọng đọc nhại của em nhé!");
    }
  };

  const stopRecordingLine = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecordedVoice = (lineId: string) => {
    const url = recordedAudioMap[lineId];
    if (url) {
      playSound.click();
      const audio = new Audio(url);
      audio.play();
    }
  };

  // --- AI Listening Generator Handler ---
  const handleGenerateAiListening = async () => {
    if (!aiTopic.trim()) {
      setAiErrorMessage("Vui lòng nhập chủ đề em muốn luyện nghe nhé!");
      return;
    }

    setIsGeneratingAi(true);
    setAiErrorMessage("");
    playSound.click();

    try {
      const response = await fetch("/api/gemini/generate-listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          level: aiLevel,
          contentType: aiContentType,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setAiErrorMessage(data.error);
        setIsGeneratingAi(false);
        return;
      }

      if (data.listeningData && data.listeningData.lines?.length > 0) {
        const newEpisode: ListeningEpisode = {
          id: `ai-gen-${Date.now()}`,
          title: data.listeningData.title,
          level: data.listeningData.level || aiLevel,
          category: data.listeningData.category || "AI Tự Tạo",
          icon: "✨",
          durationEst: "2 phút",
          description: data.listeningData.description,
          lines: data.listeningData.lines,
          summaryKeywords: data.listeningData.summaryKeywords || []
        };

        stopPlayback();
        setEpisodesList(prev => [newEpisode, ...prev]);
        setActiveEpisode(newEpisode);
        setCurrentLineIndex(0);
        setShowAiModal(false);
        setAiTopic("");
        playSound.correct();
      } else {
        setAiErrorMessage("Không thể tạo bài nghe từ chủ đề này. Vui lòng thử lại chủ đề khác nhé!");
      }
    } catch (err: any) {
      setAiErrorMessage("Đã xảy ra lỗi kết nối AI. Hãy thử lại sau giây lát nhé!");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // --- Custom MP3 File & Link Handlers ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeEpisode) return;

    if (!file.type.startsWith("audio/") && !file.name.endsWith(".mp3") && !file.name.endsWith(".wav") && !file.name.endsWith(".m4a")) {
      alert("Vui lòng chọn file âm thanh định dạng .mp3, .wav hoặc .m4a nhé!");
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setEpisodeAudioSourceMap(prev => ({
      ...prev,
      [activeEpisode.id]: { url: blobUrl, name: file.name }
    }));

    setShowMp3SourceModal(false);
    playSound.correct();
  };

  const handleApplyCustomUrl = () => {
    if (!customAudioUrlInput.trim() || !activeEpisode) return;

    const inputVal = customAudioUrlInput.trim();
    const ytId = extractYoutubeId(inputVal);

    if (ytId) {
      setCustomYoutubeMap(prev => ({
        ...prev,
        [activeEpisode.id]: ytId
      }));
    } else {
      setEpisodeAudioSourceMap(prev => ({
        ...prev,
        [activeEpisode.id]: { url: inputVal, name: "Link Audio MP3 Tùy Chỉnh" }
      }));
    }

    setShowMp3SourceModal(false);
    setCustomAudioUrlInput("");
    playSound.correct();
  };

  // --- Script & YouTube Video Editor Handlers ---
  const openScriptEditor = (ep?: ListeningEpisode, initialTab: "lines" | "ai_raw" = "lines") => {
    const target = ep || activeEpisode;
    if (!target) return;
    const yId = customYoutubeMap[target.id] || target.youtubeId || "";
    setEditYoutubeUrl(yId ? `https://www.youtube.com/watch?v=${yId}` : "");
    setEditTitle(target.title);
    setEditLevel(target.level);
    setEditCategory(target.category);
    setEditDescription(target.description || "");
    setEditLines(JSON.parse(JSON.stringify(target.lines)));
    setRawTranscriptInput("");
    setEditorTab(initialTab);
    setShowScriptEditorModal(true);
  };

  const handleAddNewEpisode = () => {
    const newEp: ListeningEpisode = {
      id: `custom-yt-${Date.now()}`,
      title: "Bài Nghe YouTube Mới",
      level: "N4",
      category: "YouTube Video",
      icon: "📺",
      durationEst: "3 phút",
      description: "Bài nghe đồng bộ phụ đề từ YouTube",
      youtubeId: "5ljslFP3yXE",
      lines: [
        {
          id: "line-1",
          speaker: "Nhân vật 1",
          japanese: "こんにちは！",
          furigana: "こんにちは！",
          romaji: "Konnichiwa!",
          vietnamese: "Xin chào!",
          startTime: 0,
          endTime: 3
        }
      ],
      summaryKeywords: []
    };
    setEpisodesList(prev => [newEp, ...prev]);
    setActiveEpisode(newEp);
    openScriptEditor(newEp);
  };

  const handleDeleteEpisode = (e: React.MouseEvent, episodeId: string) => {
    e.stopPropagation();
    playSound.click();
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      const updated = episodesList.filter(ep => ep.id !== episodeId);
      setEpisodesList(updated);
      try {
        localStorage.setItem("custom_listening_episodes_v5", JSON.stringify(updated));
      } catch (err) {}
      if (activeEpisode?.id === episodeId) {
        setActiveEpisode(updated[0] || null);
      }
    }
  };

  const handleSaveScriptEditor = () => {
    if (!activeEpisode) return;
    const cleanYtId = extractYoutubeId(editYoutubeUrl) || activeEpisode.youtubeId;
    const updatedEpisode: ListeningEpisode = {
      ...activeEpisode,
      title: editTitle.trim() || activeEpisode.title,
      level: editLevel,
      category: editCategory.trim() || activeEpisode.category,
      description: editDescription.trim() || activeEpisode.description,
      youtubeId: cleanYtId,
      lines: editLines.map((l, idx) => ({
        ...l,
        id: l.id || `line-${idx + 1}`
      }))
    };

    setActiveEpisode(updatedEpisode);
    setEpisodesList(prev => prev.map(ep => ep.id === updatedEpisode.id ? updatedEpisode : ep));
    if (cleanYtId) {
      setCustomYoutubeMap(prev => ({ ...prev, [updatedEpisode.id]: cleanYtId }));
    }
    setShowScriptEditorModal(false);
    playSound.correct();
  };

  const handleAiTranscribeRaw = async () => {
    if (!rawTranscriptInput.trim()) return;
    setIsProcessingRawAi(true);
    try {
      const response = await fetch("/api/gemini/generate-listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawTranscript: rawTranscriptInput,
          level: editLevel,
          topic: editTitle || "YouTube Video Subtitles"
        })
      });
      const data = await response.json();
      if (data.lines && Array.isArray(data.lines) && data.lines.length > 0) {
        setEditLines(data.lines);
        if (data.title && !editTitle) setEditTitle(data.title);
        setEditorTab("lines");
        playSound.correct();
      } else {
        alert("Không thể phân tích văn bản. Vui lòng kiểm tra lại đoạn kịch bản nhập vào.");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi AI phân tích kịch bản.");
    } finally {
      setIsProcessingRawAi(false);
    }
  };

  const handleAddLineEdit = () => {
    const lastLine = editLines[editLines.length - 1];
    const newStart = lastLine && typeof lastLine.endTime === "number" ? lastLine.endTime : 0;
    const newEnd = Number((newStart + 4).toFixed(1));
    setEditLines(prev => [
      ...prev,
      {
        id: `line-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        speaker: "Talker",
        japanese: "日本語の文章",
        furigana: "にほんごの ぶんしょう",
        romaji: "Nihongo no bunshou",
        vietnamese: "Câu nói tiếng Nhật",
        startTime: newStart,
        endTime: newEnd
      }
    ]);
  };

  const handleRemoveLineEdit = (index: number) => {
    setEditLines(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateLineField = (index: number, field: keyof ListeningLine, val: any) => {
    setEditLines(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const activeCustomAudio = activeEpisode ? episodeAudioSourceMap[activeEpisode.id] : null;

  return (
    <div id="listening-shadowing-container" className="space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none text-9xl font-black">
          🎧
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onGoBack && (
                <button
                  onClick={() => { playSound.click(); stopPlayback(); onGoBack(); }}
                  className="p-2.5 bg-white/20 hover:bg-white/30 rounded-2xl transition-all cursor-pointer text-white"
                  title="Quay lại"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                <Radio className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Podcast & Shadowing Tiếng Nhật</span>
              </div>
            </div>

            <button
              onClick={() => { playSound.click(); setShowAiModal(true); }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-2xl font-black shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-pink-700 fill-pink-700" />
              <span>Thầy Sơn AI Soạn Bài Nghe Mới</span>
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Góc Luyện Nghe Thụ Động & Shadowing N5 - N3
            </h1>
            <p className="text-xs sm:text-sm text-pink-100 max-w-2xl leading-relaxed">
              "Luyện tai nghe nhạy bén mọi lúc mọi nơi và luyện phát âm chuẩn ngữ điệu bản ngữ bằng phương pháp Shadowing (đọc nhại liên tục) cùng Thầy Sơn AI."
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar">
            {(["ALL", "N5", "N4", "N3"] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => { playSound.click(); setSelectedLevel(lvl); }}
                className={`px-4 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-white text-pink-700 shadow-sm scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {lvl === "ALL" ? "Tất Cả Bài Nghe" : `Cấp Độ ${lvl}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Episode Selector + Active Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Preset Episodes Library List (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-black text-natural-deep uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-pink-600" />
              <span>Danh Sách Bài Nghe ({filteredEpisodes.length})</span>
            </h3>
            <button
              onClick={() => { playSound.click(); handleAddNewEpisode(); }}
              className="px-2.5 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 font-extrabold text-[11px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo Thẻ Mới</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredEpisodes.map(ep => {
              const isActive = activeEpisode?.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    playSound.click();
                    stopPlayback();
                    setActiveEpisode(ep);
                    setCurrentLineIndex(0);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 relative ${
                    isActive
                      ? "bg-pink-50/80 border-pink-400 shadow-sm ring-2 ring-pink-300"
                      : "bg-white border-natural-border hover:border-pink-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl">{ep.icon}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                        ep.level === "N5" ? "bg-emerald-100 text-emerald-700" :
                        ep.level === "N4" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {ep.level}
                      </span>
                      {(ep.id.startsWith("custom-") || ep.id.startsWith("ai-")) && (
                        <button
                          onClick={(e) => handleDeleteEpisode(e, ep.id)}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Xóa bài học này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-natural-deep line-clamp-1">
                      {ep.title}
                    </h4>
                    {ep.description ? (
                      <p className="text-[11px] text-natural-muted line-clamp-2 mt-1">
                        {ep.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-natural-muted font-bold pt-1 border-t border-natural-border/40">
                    <span>{ep.category}</span>
                    <span>{ep.lines.length} câu thoại</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audio Player & Interactive Script (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {activeEpisode ? (
            <div className="bg-white border border-natural-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
              
              {/* Episode Header Info & Main Experience Mode Switcher */}
              <div className="space-y-4 pb-4 border-b border-natural-border">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activeEpisode.icon}</span>
                      <span className="bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        {activeEpisode.level} · {activeEpisode.category}
                      </span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {activeEpisode.lines.length} câu thoại
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-natural-deep">
                      {activeEpisode.title}
                    </h2>
                    {activeEpisode.description ? (
                      <p className="text-xs text-natural-muted">
                        {activeEpisode.description}
                      </p>
                    ) : null}
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="bg-natural-soft/60 p-1 rounded-2xl flex items-center gap-1 border border-natural-border/50">
                    <button
                      onClick={() => { playSound.click(); stopPlayback(); setMode("listening"); }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        mode === "listening"
                          ? "bg-white text-pink-600 shadow-xs font-black"
                          : "text-natural-muted hover:text-natural-text"
                      }`}
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Nghe Thụ Động</span>
                    </button>

                    <button
                      onClick={() => { playSound.click(); stopPlayback(); setMode("shadowing"); }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        mode === "shadowing"
                          ? "bg-amber-400 text-slate-900 shadow-xs font-black"
                          : "text-natural-muted hover:text-natural-text"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Shadowing (Đọc Nhại)</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* UNIFIED EXPERIENCE VIEW */}
              <div className="space-y-6">

                {/* YouTube Video Player & Live Subtitle Card (If episode has YouTube) */}
                {activeYoutubeId && (
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-5 space-y-4 text-white shadow-xl">
                    <div className="flex items-center justify-between gap-2 pb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-300">Video Bài Học (YouTube HD)</span>
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${activeYoutubeId}&t=${activeEpisode?.lines?.[0]?.startTime || 0}s`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mở trên YouTube</span>
                      </a>
                    </div>

                    {/* Direct High-Performance YouTube Iframe Container */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                      <iframe
                        id="youtube-video-iframe"
                        key={`yt-iframe-${activeYoutubeId}-${activeEpisode?.id}`}
                        src={`https://www.youtube.com/embed/${activeYoutubeId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1${typeof window !== 'undefined' && window.location.origin ? `&origin=${encodeURIComponent(window.location.origin)}` : ''}&start=${activeEpisode?.lines?.[0]?.startTime || 0}`}
                        title={activeEpisode?.title || "YouTube Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0 rounded-2xl"
                      />
                    </div>

                    {/* Realtime Live Subtitle Karaoke Banner directly under video */}
                    {activeEpisode && activeEpisode.lines && activeEpisode.lines[currentLineIndex] && (
                      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-pink-500/40 space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-3 py-1 rounded-full bg-pink-600 text-white shadow-sm flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                              <span>CÂU {currentLineIndex + 1}/{activeEpisode.lines.length}</span>
                            </span>
                            <span className="text-xs font-black text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                              {activeEpisode.lines[currentLineIndex].speaker}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                            <span>⏱️ {Math.floor(ytCurrentTime / 60)}:{("0" + Math.floor(ytCurrentTime % 60)).slice(-2)}</span>
                            <span>/</span>
                            <span>{Math.floor(ytDuration / 60)}:{("0" + Math.floor(ytDuration % 60)).slice(-2)}</span>
                          </div>
                        </div>

                        {/* Subtitle Line Text with strict Kanji-only Furigana rule */}
                        <div className="py-2 text-center space-y-2">
                          <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-loose tracking-wide">
                            <KanjiRuby
                              japanese={activeEpisode.lines[currentLineIndex].japanese}
                              furigana={activeEpisode.lines[currentLineIndex].furigana}
                              showFurigana={showFurigana}
                              rtClassName="text-amber-300 font-bold"
                            />
                          </div>

                          {showRomaji && (
                            <p className="text-xs sm:text-sm font-semibold text-amber-200/90 italic">
                              {activeEpisode.lines[currentLineIndex].romaji}
                            </p>
                          )}

                          {showVietnamese && (
                            <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300 pt-1">
                              {activeEpisode.lines[currentLineIndex].vietnamese}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                  {/* Player Control Toolbar */}
                  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-4 shadow-md space-y-4">
                    
                    {/* Audio Progress & Play Status Banner */}
                    <div className="flex flex-wrap items-center justify-between text-xs font-bold text-slate-300 px-1 gap-2">
                      <div className="flex items-center gap-2">
                        <span>
                          Câu {currentLineIndex + 1} / {activeEpisode.lines.length}
                        </span>
                      </div>

                      {isLoadingTts ? (
                        <span className="text-amber-300 font-extrabold flex items-center gap-1.5 animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          Đang tải file MP3 người thật...
                        </span>
                      ) : isPausedInShadowing ? (
                        <span className="text-amber-300 font-extrabold flex items-center gap-1 animate-bounce">
                          🗣️ Luyện đọc nhại lại! Đợi {shadowingCountdown}s...
                        </span>
                      ) : isPlaying ? (
                        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                          Đang phát thoại...
                        </span>
                      ) : (
                        <span className="text-slate-400">Đang tạm dừng</span>
                      )}
                    </div>

                    {/* Primary Playback Control Buttons */}
                    <div className="flex items-center justify-between gap-2">
                      
                      {/* Prev Button */}
                      <button
                        onClick={handlePrevLine}
                        disabled={currentLineIndex === 0}
                        className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl transition-all cursor-pointer text-white"
                        title="Câu trước"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>

                      {/* Play / Pause / Stop Button Group */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlayPause}
                          className="px-6 sm:px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-black shadow-lg transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-5 h-5 fill-white" />
                              <span>Tạm Dừng</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                              <span>{mode === "shadowing" ? "Bắt Đầu Shadowing" : "Phát Bài Nghe"}</span>
                            </>
                          )}
                        </button>

                        {/* Dedicated Stop Button */}
                        {(isPlaying || isPausedInShadowing || isLoadingTts) && (
                          <button
                            onClick={() => { playSound.click(); stopPlayback(); }}
                            className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer animate-fade-in"
                            title="Dừng hẳn bài nghe ngay lập tức"
                          >
                            <Square className="w-4 h-4 fill-white" />
                            <span className="text-xs">Dừng Hẳn</span>
                          </button>
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={handleNextLine}
                        disabled={currentLineIndex === activeEpisode.lines.length - 1}
                        className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl transition-all cursor-pointer text-white"
                        title="Câu tiếp"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Settings Toolbar: Speed, Loop, Shadowing Pause & Display Toggles */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                      
                      {/* Speed Controller */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-medium">Tốc độ:</span>
                        {([0.75, 1.0, 1.25] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => handleSetSpeed(s)}
                            className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                              speed === s ? "bg-pink-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                            }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>

                      {/* Loop Mode Controller */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-medium">Lặp:</span>
                        <button
                          onClick={() => {
                            playSound.click();
                            setLoopMode(prev => prev === "off" ? "line" : prev === "line" ? "episode" : "off");
                          }}
                          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            loopMode !== "off" ? "bg-amber-400 text-slate-900" : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{loopMode === "off" ? "Tắt" : loopMode === "line" ? "Lặp Câu" : "Lặp Bài"}</span>
                        </button>
                      </div>

                      {/* Shadowing Pause Sec (Visible in Shadowing mode) */}
                      {mode === "shadowing" && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-300 font-medium">Nghỉ nhại:</span>
                          {[2, 3, 5].map(sec => (
                            <button
                              key={sec}
                              onClick={() => { playSound.click(); setShadowingPauseSec(sec); }}
                              className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                                shadowingPauseSec === sec ? "bg-amber-400 text-slate-900" : "bg-white/10 text-slate-300 hover:bg-white/20"
                              }`}
                            >
                              {sec}s
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Display Toggles */}
                      <div className="flex items-center gap-2 border-l border-white/20 pl-3">
                        <button
                          onClick={() => setShowFurigana(!showFurigana)}
                          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                            showFurigana ? "bg-pink-600 text-white" : "bg-white/10 text-slate-400"
                          }`}
                          title="Hiện/Ẩn Furigana"
                        >
                          Furigana
                        </button>

                        <button
                          onClick={() => setShowRomaji(!showRomaji)}
                          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                            showRomaji ? "bg-pink-600 text-white" : "bg-white/10 text-slate-400"
                          }`}
                          title="Hiện/Ẩn Romaji"
                        >
                          Romaji
                        </button>

                        <button
                          onClick={() => setShowVietnamese(!showVietnamese)}
                          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                            showVietnamese ? "bg-pink-600 text-white" : "bg-white/10 text-slate-400"
                          }`}
                          title="Hiện/Ẩn Tiếng Việt"
                        >
                          Tiếng Việt
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Karaoke Script Line-by-Line List with Mic & Scoring (ONLY IN SHADOWING MODE) */}
                  {mode === "shadowing" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-natural-muted uppercase tracking-wider flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-pink-600" />
                          <span>Nội Dung Kịch Bản Luyện Tập ({activeEpisode.lines.length} câu)</span>
                        </h3>
                        <span className="text-[11px] text-amber-700 font-bold bg-amber-100 px-2.5 py-0.5 rounded-full">
                          💡 Bấm câu nào phát câu đó
                        </span>
                      </div>

                      <div className="space-y-3">
                        {activeEpisode.lines.map((line, idx) => {
                          const isCurrent = idx === currentLineIndex;
                          const isRecording = recordingLineId === line.id;
                          const hasRecorded = !!recordedAudioMap[line.id];

                          return (
                            <div
                              key={line.id}
                              ref={(el) => (lineRefs.current[idx] = el)}
                              onClick={() => jumpToLine(idx)}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                                isCurrent
                                  ? "bg-gradient-to-r from-amber-50/90 via-pink-50/90 to-amber-50/90 border-amber-400 shadow-lg ring-4 ring-amber-400/80 -translate-y-0.5"
                                  : "bg-white border-natural-border/70 hover:border-pink-200 hover:bg-slate-50/50"
                              }`}
                            >
                              {/* Speaker & Action Row */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-black px-3 py-1 rounded-full ${
                                    isCurrent ? "bg-pink-600 text-white shadow-xs" : "bg-natural-soft text-natural-deep"
                                  }`}>
                                    {line.speaker}
                                  </span>

                                  {isCurrent && (
                                    <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                                      ĐANG CHỌN
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                  {/* Individual Speak Button */}
                                  <button
                                    onClick={() => jumpToLine(idx)}
                                    className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                                      isCurrent && isPlaying ? "bg-pink-600 text-white" : "bg-natural-soft hover:bg-pink-100 text-natural-text"
                                    }`}
                                    title="Đọc câu này"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>

                                  {/* Individual Mic Record Button for Shadowing */}
                                  {isRecording ? (
                                    <button
                                      onClick={stopRecordingLine}
                                      className="px-3 py-1 bg-red-600 text-white rounded-xl text-xs font-black animate-pulse flex items-center gap-1 cursor-pointer"
                                    >
                                      <MicOff className="w-3.5 h-3.5" />
                                      <span>Dừng Thu</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => startRecordingLine(line.id)}
                                      className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-all cursor-pointer"
                                      title="Thu âm đọc nhại câu này"
                                    >
                                      <Mic className="w-4 h-4" />
                                    </button>
                                  )}

                                  {/* Play Recorded Voice */}
                                  {hasRecorded && !isRecording && (
                                    <button
                                      onClick={() => playRecordedVoice(line.id)}
                                      className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-[11px] font-black flex items-center gap-1 cursor-pointer"
                                    >
                                      <Play className="w-3 h-3 fill-emerald-800" />
                                      <span>Nghe Thu</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Japanese Sentence Text Display with strict Kanji-only Furigana rule */}
                              <div className="space-y-1">
                                <div className={`font-mono text-base sm:text-lg font-bold tracking-wide leading-loose ${
                                  isCurrent ? "text-pink-950 font-black" : "text-natural-deep"
                                }`}>
                                  <KanjiRuby
                                    japanese={line.japanese}
                                    furigana={line.furigana}
                                    showFurigana={showFurigana}
                                    rtClassName="text-pink-600 font-bold"
                                  />
                                </div>

                                {showRomaji && (
                                  <p className="text-xs text-natural-muted font-mono italic">
                                    {line.romaji}
                                  </p>
                                )}

                                {showVietnamese && (
                                  <p className={`text-xs sm:text-sm font-medium ${
                                    isCurrent ? "text-pink-900 font-bold" : "text-natural-muted"
                                  }`}>
                                    {line.vietnamese}
                                  </p>
                                )}
                              </div>

                              {/* Keyword Pills */}
                              {line.keywords && line.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {line.keywords.map((kw, kIdx) => (
                                    <span
                                      key={kIdx}
                                      className="bg-white/80 border border-pink-200/80 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-lg"
                                    >
                                      {kw.word} ({kw.reading}): {kw.meaning}
                                    </span>
                                  ))}
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Episode Summary Vocabulary Card */}
                  {activeEpisode.summaryKeywords && activeEpisode.summaryKeywords.length > 0 && (
                    <div className="bg-natural-soft/50 rounded-2xl p-5 border border-natural-border space-y-3">
                      <h4 className="text-xs font-black text-natural-deep uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Từ Vựng Quan Trọng Trong Bài ({activeEpisode.summaryKeywords.length})</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeEpisode.summaryKeywords.map((kw, idx) => (
                          <div
                            key={idx}
                            onClick={() => speakJapaneseLine(kw.word)}
                            className="bg-white p-3 rounded-xl border border-natural-border flex items-center justify-between hover:border-pink-300 transition-all cursor-pointer group"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-natural-deep text-sm">{kw.word}</span>
                                <span className="text-[11px] text-pink-600 font-medium">({kw.reading})</span>
                              </div>
                              <p className="text-xs text-natural-muted">{kw.meaning}</p>
                            </div>

                            <Volume2 className="w-4 h-4 text-natural-muted group-hover:text-pink-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-natural-border text-natural-muted">
              Hãy chọn một bài nghe từ thư viện bên trái để bắt đầu luyện nghe nhé!
            </div>
          )}
        </div>

      </div>

      {/* AI Listening Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in border border-pink-100">
            
            <div className="flex items-center justify-between border-b border-natural-border pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-pink-100 text-pink-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-natural-deep">
                    Soạn Bài Nghe Mới Với Thầy Sơn AI
                  </h3>
                  <p className="text-xs text-natural-muted">
                    Nhập chủ đề bất kỳ em muốn luyện nghe thụ động & shadowing!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAiModal(false)}
                className="p-1 text-natural-muted hover:text-natural-text rounded-xl"
              >
                ✕
              </button>
            </div>

            {aiErrorMessage && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                {aiErrorMessage}
              </div>
            )}

            <div className="space-y-4">
              
              {/* Level Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                  Trình độ JLPT
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["N5", "N4", "N3"] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setAiLevel(l)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        aiLevel === l
                          ? "bg-pink-600 text-white border-pink-600 shadow-xs"
                          : "bg-white text-natural-text border-natural-border hover:bg-slate-50"
                      }`}
                    >
                      Trình độ {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                  Thể loại
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAiContentType("dialogue")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      aiContentType === "dialogue"
                        ? "bg-pink-600 text-white border-pink-600"
                        : "bg-white text-natural-text border-natural-border"
                    }`}
                  >
                    💬 Hội thoại Kaiwa
                  </button>

                  <button
                    onClick={() => setAiContentType("monologue")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      aiContentType === "monologue"
                        ? "bg-pink-600 text-white border-pink-600"
                        : "bg-white text-natural-text border-natural-border"
                    }`}
                  >
                    📖 Đoạn văn tự sự
                  </button>
                </div>
              </div>

              {/* Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                  Chủ đề mong muốn
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ví dụ: Đi ăn phở ở Tokyo, Mua sắm quần áo ở Akihabara, Phim Studio Ghibli..."
                  className="w-full px-4 py-3 bg-natural-soft/50 border border-natural-border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Quick Preset Prompt Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-natural-muted font-bold">Gợi ý nhanh:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Giao tiếp khi mua cơm Bento",
                    "Hỏi đường đi ga Shinjuku",
                    "Rủ bạn đi ăn lẩu Sukiyaki",
                    "Lễ hội pháo hoa Hanabi"
                  ].map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setAiTopic(chip)}
                      className="text-[10px] bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-700 font-bold px-2.5 py-1 rounded-lg border border-slate-200/80 transition-all cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Hủy
              </button>

              <button
                onClick={handleGenerateAiListening}
                disabled={isGeneratingAi}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Thầy Sơn AI Đang Soạn...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tạo Bài Nghe Ngay</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Voice Engine & Character Settings Modal */}
      {showVoiceSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-scale-in border border-natural-border">
            
            <div className="flex items-center justify-between pb-4 border-b border-natural-border">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-100 rounded-2xl text-pink-600">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-natural-deep">
                    Cấu Hình Giọng Nhân Vật & Động Cơ Đọc
                  </h3>
                  <p className="text-xs text-natural-muted">
                    Tùy chỉnh giọng đọc chuẩn tiếng Nhật, chọn giọng AI hoặc giọng máy
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowVoiceSettingsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Voice Engine Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider flex items-center justify-between">
                  <span>1. Chọn Nguồn Phát Âm Bài Nghe</span>
                  {ttsEngine === "gemini" && (
                    <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ⚡ Nguồn Chuẩn (Băng Âm Thanh Người Thật 100%)
                    </span>
                  )}
                </label>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => { playSound.click(); setTtsEngine("gemini"); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      ttsEngine === "gemini"
                        ? "bg-pink-50/90 border-pink-500 shadow-xs ring-2 ring-pink-300"
                        : "bg-white border-natural-border hover:border-pink-200"
                    }`}
                  >
                    <span className="text-2xl mt-0.5">🎧</span>
                    <div>
                      <div className="text-xs font-black text-natural-deep flex items-center gap-1.5">
                        <span>Băng Ghi Âm Người Thật Bản Xứ (Native Audio MP3)</span>
                      </div>
                      <p className="text-[11px] text-natural-muted mt-0.5 leading-relaxed">
                        Phát trực tiếp từ file âm thanh MP3 ghi âm thực tế chuẩn đài phát thanh NHK & giáo trình JLPT. Tải 0ms tức thì, chuẩn 100% ngữ điệu Tokyo Pitch Accent.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => { playSound.click(); setTtsEngine("browser"); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      ttsEngine === "browser"
                        ? "bg-slate-50/90 border-slate-500 shadow-xs ring-2 ring-slate-300"
                        : "bg-white border-natural-border hover:border-slate-200"
                    }`}
                  >
                    <span className="text-2xl mt-0.5">⚡</span>
                    <div>
                      <div className="text-xs font-black text-natural-deep flex items-center gap-1.5">
                        <span>Trình Đọc Dự Phòng (Web Speech API)</span>
                      </div>
                      <p className="text-[11px] text-natural-muted mt-0.5 leading-relaxed">
                        Chế độ phát dự phòng trên thiết bị khi không có mạng.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Gemini Voice Persona Option */}
              {ttsEngine === "gemini" && (
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                    2. Phong Cách / Giới Tính Nhân Vật
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "auto", label: "🤖 Tự Động theo Vai" },
                      { id: "female", label: "👩 Giọng Nữ (Aoede)" },
                      { id: "male", label: "👨 Giọng Nam (Fenrir)" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => { playSound.click(); setVoiceGender(g.id as any); }}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                          voiceGender === g.id
                            ? "bg-pink-600 text-white border-pink-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Browser Installed Voice Picker */}
              {ttsEngine === "browser" && (
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                    2. Chọn Giọng Đọc Trong Máy Của Bạn
                  </label>
                  {availableVoices.length > 0 ? (
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {availableVoices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      Không tìm thấy bộ giọng tiếng Nhật cài riêng trên trình duyệt. Trình duyệt sẽ dùng giọng mặc định hệ thống.
                    </p>
                  )}
                </div>
              )}

              {/* Voice Preview Test Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    speakJapaneseLine("こんにちは！一緒(いっしょ)に日本語(にほんご)を勉強(べんきょう)しましょう！", "Thầy Sơn");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>▶ Nghe Thử Giọng "Konnichiwa! Issho ni nihongo o benkyou shimashou!"</span>
                </button>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => { playSound.click(); setShowVoiceSettingsModal(false); }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-xs shadow-sm cursor-pointer"
              >
                Xác Nhận & Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MP3 Tape Source & Custom Audio Link Modal */}
      {showMp3SourceModal && activeEpisode && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-scale-in border border-natural-border">
            
            <div className="flex items-center justify-between pb-4 border-b border-natural-border">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-2xl text-amber-700">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-natural-deep">
                    Tải File Băng MP3 Gốc Hoặc Nhập Link
                  </h3>
                  <p className="text-xs text-natural-muted">
                    Nguồn bài: {activeEpisode.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowMp3SourceModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Option 1: Upload MP3 file from local machine */}
              <div className="space-y-2">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                  Cách 1: Tải File Băng Ghi Âm (.MP3 / .WAV) Từ Máy Tính
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*,.mp3,.wav,.m4a"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/50 rounded-2xl text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="text-xl">📁</span>
                  <span>Bấm Vào Đây Để Chọn File .MP3 Băng Nghe Bản Xứ</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-xs font-bold uppercase">Hoặc</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Option 2: Paste direct MP3 or YouTube URL */}
              <div className="space-y-2">
                <label className="text-xs font-black text-natural-deep uppercase tracking-wider">
                  Cách 2: Nhập Link Audio MP3 Hoặc Link YouTube Video
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Dán link MP3 hoặc YouTube (VD: https://www.youtube.com/watch?v=5ljslFP3yXE)"
                    value={customAudioUrlInput}
                    onChange={(e) => setCustomAudioUrlInput(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={handleApplyCustomUrl}
                    disabled={!customAudioUrlInput.trim()}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-black rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Gắn Link Audio / Video YouTube
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMp3SourceModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* YouTube Video Link & Subtitle Script Editor Modal */}
      {showScriptEditorModal && activeEpisode && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-3xl w-full shadow-2xl space-y-6 animate-scale-in border border-natural-border my-auto max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-natural-border flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-red-100 rounded-2xl text-red-600">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-natural-deep">
                    Chỉnh Sửa Phụ Đề & Link Video YouTube
                  </h3>
                  <p className="text-xs text-natural-muted">
                    Cập nhật link YouTube mới và chỉnh sửa câu thoại khớp 100% video
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowScriptEditorModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="space-y-5 overflow-y-auto pr-1 flex-grow">
              
              {/* YouTube Link & Title Meta */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-red-600" />
                    <span>Link Video YouTube</span>
                  </label>
                  <input
                    type="url"
                    value={editYoutubeUrl}
                    onChange={(e) => setEditYoutubeUrl(e.target.value)}
                    placeholder="VD: https://www.youtube.com/watch?v=5ljslFP3yXE hoặc 5ljslFP3yXE"
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  {editYoutubeUrl && (
                    <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      ✓ Đã nhận diện YouTube ID: <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded">{extractYoutubeId(editYoutubeUrl) || "Chưa hợp lệ"}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-800 uppercase">Tên bài nghe</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="VD: Luyện nghe hội thoại..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-800 uppercase">Cấp độ & Thể loại</label>
                    <div className="flex gap-2">
                      <select
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value as any)}
                        className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="N5">N5</option>
                        <option value="N4">N4</option>
                        <option value="N3">N3</option>
                      </select>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="Thể loại"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode Tabs for Subtitle Creation */}
              <div className="flex items-center gap-2 border-b border-natural-border pb-3">
                <button
                  onClick={() => setEditorTab("lines")}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === "lines"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>📝 Sửa Từng Dòng Phụ Đề ({editLines.length} câu)</span>
                </button>

                <button
                  onClick={() => setEditorTab("ai_raw")}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === "ai_raw"
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Dán Văn Bản Video & AI Tự Đồng Bộ</span>
                </button>
              </div>

              {/* Tab 1: AI Auto Transcribe from pasted transcript */}
              {editorTab === "ai_raw" && (
                <div className="space-y-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center justify-between">
                      <span>Dán Đoạn Thoại / Transcript Tiếng Nhật Từ Video YouTube</span>
                      <span className="text-[10px] text-amber-700 font-bold">Thầy Sơn AI sẽ tự thêm Furigana, Dịch & Khớp Giờ</span>
                    </label>
                    <textarea
                      rows={5}
                      value={rawTranscriptInput}
                      onChange={(e) => setRawTranscriptInput(e.target.value)}
                      placeholder="Dán toàn bộ đoạn hội thoại tiếng Nhật trong video tại đây... 
Ví dụ:
店員: いらっしゃいませ！
客: これはおいくらですか？
店員: 500円になります。"
                      className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    onClick={handleAiTranscribeRaw}
                    disabled={isProcessingRawAi || !rawTranscriptInput.trim()}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 disabled:opacity-50 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {isProcessingRawAi ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI Đang Phân Tích & Tạo Subtitle Karaoke Đồng Bộ...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Chuyển Đổi Thành Phụ Đề Đồng Bộ Video</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tab 2: Manual Line Editor */}
              {editorTab === "lines" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 uppercase">
                      Danh Sách Các Dòng Phụ Đề Video
                    </span>
                    <button
                      onClick={handleAddLineEdit}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Dòng Mới</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {editLines.map((line, idx) => (
                      <div
                        key={line.id || idx}
                        className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-2.5 relative group hover:border-pink-300 transition-all"
                      >
                        {/* Line Header Controls */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-pink-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              Câu {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={line.speaker || ""}
                              onChange={(e) => handleUpdateLineField(idx, "speaker", e.target.value)}
                              placeholder="Nhân vật (VD: Tanaka)"
                              className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold w-32"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Start/End Time in seconds */}
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                              <span>⏱️ Giờ (Giây):</span>
                              <input
                                type="number"
                                step="0.5"
                                value={line.startTime ?? 0}
                                onChange={(e) => handleUpdateLineField(idx, "startTime", parseFloat(e.target.value) || 0)}
                                className="w-14 p-1 bg-white border border-slate-300 rounded text-center text-xs font-mono font-bold"
                              />
                              <span>-</span>
                              <input
                                type="number"
                                step="0.5"
                                value={line.endTime ?? 0}
                                onChange={(e) => handleUpdateLineField(idx, "endTime", parseFloat(e.target.value) || 0)}
                                className="w-14 p-1 bg-white border border-slate-300 rounded text-center text-xs font-mono font-bold"
                              />
                              <span>s</span>
                            </div>

                            <button
                              onClick={() => handleRemoveLineEdit(idx)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Xóa câu này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Japanese & Furigana */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tiếng Nhật (Kanji/Kana)</label>
                            <input
                              type="text"
                              value={line.japanese}
                              onChange={(e) => handleUpdateLineField(idx, "japanese", e.target.value)}
                              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Furigana (Cách đọc Hiragana)</label>
                            <input
                              type="text"
                              value={line.furigana}
                              onChange={(e) => handleUpdateLineField(idx, "furigana", e.target.value)}
                              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        {/* Vietnamese Translation */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Dịch nghĩa tiếng Việt</label>
                          <input
                            type="text"
                            value={line.vietnamese}
                            onChange={(e) => handleUpdateLineField(idx, "vietnamese", e.target.value)}
                            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-emerald-800"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-natural-border flex-shrink-0">
              <button
                onClick={() => setShowScriptEditorModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Hủy
              </button>

              <button
                onClick={handleSaveScriptEditor}
                className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu & Cập Nhật Phụ Đề Video</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
