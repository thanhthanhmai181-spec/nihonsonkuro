import React, { useEffect, useRef, useState } from "react";
import { playSound } from "../utils/audio";
import { UserProgress } from "../types";
import { Play, Home, RefreshCw, Trophy, Lock } from "lucide-react";

interface SonkuroDriftProps {
  onGoBack: () => void;
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
}

interface QuestionData {
  type: string;
  question: string;
  answers?: string[];
  words?: string[];
  correct?: number;
}

const levelNames = ["Khởi Đầu", "Tăng Tốc", "Vào Cua", "Đường Trơn", "Về Đích"];
const levelThemes = ["🔥", "💨", "🌀", "🌧️", "🏆"];
const totalLevels = 5;

export default function SonkuroDrift({ onGoBack, progress, updateProgress }: SonkuroDriftProps) {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number>(5); // Unlocked all by default for trial
  const [levelStars, setLevelStars] = useState<Record<number, number>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<any>(null);

  // Load stars from localStorage on mount
  useEffect(() => {
    try {
      const data = localStorage.getItem("driftGame_stars");
      if (data) {
        setLevelStars(JSON.parse(data));
      }
    } catch (e) {
      console.error("Error loading stars", e);
    }
  }, []);

  const saveStars = (level: number, starCount: number) => {
    try {
      const data = localStorage.getItem("driftGame_stars");
      const stars = data ? JSON.parse(data) : {};
      stars[level] = Math.max(stars[level] || 0, starCount);
      localStorage.setItem("driftGame_stars", JSON.stringify(stars));
      setLevelStars(stars);
    } catch (e) {
      console.error("Error saving stars", e);
    }
  };

  const startLevel = (level: number) => {
    playSound.click();
    setActiveLevel(level);
  };

  const handleBackToMenu = () => {
    playSound.click();
    if (gameInstanceRef.current) {
      gameInstanceRef.current.destroy();
      gameInstanceRef.current = null;
    }
    setActiveLevel(null);
  };

  // Setup game loop when level is active
  useEffect(() => {
    if (activeLevel === null) return;

    const level = activeLevel;
    const wrapper = containerRef.current;
    if (!wrapper) return;

    class Question {
      data: QuestionData;
      type: string;
      onCorrect: (() => void) | null = null;
      onWrong: (() => void) | null = null;

      constructor(data: QuestionData) {
        this.data = data;
        this.type = data.type || "fill-blank";
      }

      render(container: HTMLElement, answersContainer: HTMLElement, arrangeContainer: HTMLElement) {
        container.innerHTML = this.data.question.replace(/\n/g, "<br/>");
        answersContainer.innerHTML = "";
        arrangeContainer.innerHTML = "";
        answersContainer.style.display = "none";
        arrangeContainer.style.display = "none";

        if (this.type === "fill-blank" || this.type === "conjugation") {
          answersContainer.style.display = "grid";
          this.data.answers?.forEach((ans, idx) => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.textContent = `${idx + 1}. ${ans}`;
            btn.addEventListener("click", () => this.checkAnswer(idx, btn, answersContainer));
            btn.addEventListener("touchend", (e) => {
              e.preventDefault();
              this.checkAnswer(idx, btn, answersContainer);
            });
            answersContainer.appendChild(btn);
          });
        } else if (this.type === "arrange") {
          this.renderArrange(arrangeContainer);
        }
      }

      renderArrange(container: HTMLElement) {
        container.style.display = "block";
        container.innerHTML = "";

        const wrap = document.createElement("div");
        wrap.className = "arrange-container";

        // Word bank label
        const bankLabel = document.createElement("div");
        bankLabel.className = "arrange-label";
        bankLabel.textContent = "📦 Từ có sẵn (bấm để chọn)";
        wrap.appendChild(bankLabel);

        // Word bank container
        const wordBank = document.createElement("div");
        wordBank.className = "word-bank";
        wordBank.id = "wordBank";

        // Answer bank label
        const answerLabel = document.createElement("div");
        answerLabel.className = "arrange-label";
        answerLabel.textContent = "📝 Câu của bạn (bấm để trả về)";
        answerLabel.style.marginTop = "10px";
        wrap.appendChild(answerLabel);

        // Answer bank container
        const answerBank = document.createElement("div");
        answerBank.className = "answer-bank";
        answerBank.id = "answerBank";

        const wordsList = this.data.words || [];
        const shuffled = [...wordsList].sort(() => Math.random() - 0.5);
        const selectedWords: number[] = [];

        const updateUI = () => {
          // Update word bank
          const wordBankEl = wrapper?.querySelector("#wordBank") as HTMLElement;
          if (wordBankEl) {
            wordBankEl.innerHTML = "";
            shuffled.forEach((word, idx) => {
              const used = selectedWords.includes(idx);
              const wordEl = document.createElement("span");
              wordEl.className = "arrange-word";
              if (used) wordEl.classList.add("used");
              wordEl.textContent = word;
              if (!used) {
                const selectWord = () => {
                  selectedWords.push(idx);
                  updateUI();
                };
                wordEl.addEventListener("click", selectWord);
                wordEl.addEventListener("touchend", (e) => {
                  e.preventDefault();
                  selectWord();
                });
              }
              wordBankEl.appendChild(wordEl);
            });
          }

          // Update answer bank
          const answerBankEl = wrapper?.querySelector("#answerBank") as HTMLElement;
          if (answerBankEl) {
            answerBankEl.innerHTML = "";
            selectedWords.forEach((wordIdx, pos) => {
              const wordEl = document.createElement("span");
              wordEl.className = "arrange-word";
              wordEl.textContent = shuffled[wordIdx];
              
              const deselectWord = () => {
                selectedWords.splice(pos, 1);
                updateUI();
              };
              wordEl.addEventListener("click", deselectWord);
              wordEl.addEventListener("touchend", (e) => {
                e.preventDefault();
                deselectWord();
              });
              answerBankEl.appendChild(wordEl);
            });
            if (selectedWords.length === 0) {
              answerBankEl.innerHTML = '<span style="color:#666;font-size:14px;">Bấm vào từ bên trên để thêm vào đây...</span>';
            }
          }

          // Update submit button
          const submitBtn = wrapper?.querySelector("#submitArrangeBtn") as HTMLButtonElement;
          if (submitBtn) {
            submitBtn.disabled = selectedWords.length !== shuffled.length;
          }
        };

        wrap.appendChild(wordBank);
        wrap.appendChild(answerBank);

        // Clear button
        const clearBtn = document.createElement("button");
        clearBtn.className = "clear-btn";
        clearBtn.textContent = "🔄 Xóa hết, làm lại";
        const clearAll = () => {
          selectedWords.length = 0;
          updateUI();
        };
        clearBtn.addEventListener("click", clearAll);
        clearBtn.addEventListener("touchend", (e) => {
          e.preventDefault();
          clearAll();
        });
        wrap.appendChild(clearBtn);

        // Submit button
        const submitBtn = document.createElement("button");
        submitBtn.className = "submit-arrange-btn";
        submitBtn.id = "submitArrangeBtn";
        submitBtn.textContent = "✅ Xác nhận thứ tự";
        submitBtn.disabled = true;

        const checkOrder = () => {
          const userOrder = selectedWords.map(idx => shuffled[idx]).join("");
          const correctOrder = wordsList.join("");
          if (userOrder === correctOrder) {
            if (this.onCorrect) this.onCorrect();
          } else {
            if (this.onWrong) this.onWrong();
          }
        };

        submitBtn.addEventListener("click", checkOrder);
        submitBtn.addEventListener("touchend", (e) => {
          e.preventDefault();
          if (submitBtn.disabled) return;
          checkOrder();
        });
        wrap.appendChild(submitBtn);

        container.appendChild(wrap);
        updateUI();
      }

      checkAnswer(idx: number, btn: HTMLElement, container: HTMLElement) {
        const allBtns = container.querySelectorAll(".answer-btn");
        allBtns.forEach(b => ((b as HTMLElement).style.pointerEvents = "none"));
        if (idx === this.data.correct) {
          btn.classList.add("correct-answer");
          if (this.onCorrect) this.onCorrect();
        } else {
          btn.classList.add("wrong-answer");
          if (this.data.correct !== undefined && allBtns[this.data.correct]) {
            allBtns[this.data.correct].classList.add("correct-answer");
          }
          if (this.onWrong) this.onWrong();
        }
      }
    }

    function getQuestionsForLevel(lvl: number): QuestionData[] {
      if (lvl === 1) {
        return [
          { type: "fill-blank", question: "A: どうして遅れたんですか。\nB: 電車が遅れた<span class='blank-space'>______</span>。", answers: ["んです", "ます", "ました", "でしょう"], correct: 0 },
          { type: "fill-blank", question: "毎朝ジョギングをし<span class='blank-space'>______</span>。", answers: ["ています", "ます", "ました", "ましょう"], correct: 0 },
          { type: "fill-blank", question: "音楽を聞き<span class='blank-space'>______</span>勉強します。", answers: ["ながら", "ます", "ました", "たい"], correct: 0 },
          { type: "fill-blank", question: "このアパートは静かだ<span class='blank-space'>______</span>、駅から近い<span class='blank-space'>______</span>、とてもいいです。", answers: ["し、し", "て、て", "たり、たり", "ながら、ながら"], correct: 0 },
          { type: "fill-blank", question: "窓が割れ<span class='blank-space'>______</span>。", answers: ["ています", "てあります", "ておきます", "てしまいます"], correct: 0 },
          { type: "fill-blank", question: "会議室に椅子が並べ<span class='blank-space'>______</span>。", answers: ["てあります", "ています", "ます", "ました"], correct: 0 },
          { type: "fill-blank", question: "旅行の前に、チケットを予約し<span class='blank-space'>______</span>。", answers: ["ておきます", "ています", "てあります", "てしまいます"], correct: 0 },
          { type: "fill-blank", question: "電車に傘を忘れ<span class='blank-space'>______</span>。", answers: ["てしまいました", "ておきました", "てありました", "ていました"], correct: 0 },
          { type: "fill-blank", question: "財布に100円<span class='blank-space'>______</span>。", answers: ["しかありません", "があります", "もありません", "がありますか"], correct: 0 },
          { type: "fill-blank", question: "私は日本語が話<span class='blank-space'>______</span>。", answers: ["せます", "します", "されます", "したい"], correct: 0 },
          { type: "fill-blank", question: "東京<span class='blank-space'>______</span>物価が高いです<span class='blank-space'>______</span>、大阪<span class='blank-space'>______</span>比較的安いです。", answers: ["は、が、は", "が、は、が", "は、は、gai", "が、が、は"], correct: 0 },
          { type: "fill-blank", question: "すみません、この書類 các em check hộ Thầy xem có đúng không, nếu sai thì sửa hộ Thầy nhé!<br/>この書類をチェックし<span class='blank-space'>______</span>。", answers: ["ていただけませんか", "てください", "たい", "ましょう"], correct: 0 },
          { type: "fill-blank", question: "明日の試験のために、どう勉強し<span class='blank-space'>______</span>。", answers: ["たらいいですか", "ますか", "ましたか", "ないか"], correct: 0 },
          { type: "fill-blank", question: "毎晩寝る前に日記を書い<span class='blank-space'>______</span>。", answers: ["ています", "ます", "ました", "たい"], correct: 0 },
          { type: "fill-blank", question: "彼は毎週プールで泳い<span class='blank-space'>______</span>。", answers: ["でいます", "ぎます", "ぎました", "ぎたい"], correct: 0 },
          { type: "fill-blank", question: "A: 顔色が悪いですね。\nB: ええ、ちょっと頭が痛い<span class='blank-space'>______</span>。", answers: ["んです", "ません", "ない", "だろう"], correct: 0 },
          { type: "fill-blank", question: "日本へ留学に行く<span class='blank-space'>______</span>。楽しみです！", answers: ["んです", "ません", "ます", "た"], correct: 0 },
          { type: "fill-blank", question: "ちょっと教え<span class='blank-space'>______</span>。", answers: ["ていただけませんか", "てくれ", "たい", "る"], correct: 0 },
          { type: "fill-blank", question: "写真を撮っ<span class='blank-space'>______</span>。", answers: ["ていただけませんか", "てあげる", "たい", "ましょう"], correct: 0 },
          { type: "fill-blank", question: "駅へ行くするには、どのバスに乗っ<span class='blank-space'>______</span>。", answers: ["たらいいですか", "てください", "ます", "たい"], correct: 0 },
          { type: "fill-blank", question: "日本語が上手になるには、どうすれ<span class='blank-space'>______</span>。", answers: ["ばいいですか", "ますか", "ました", "たい"], correct: 0 },
          { type: "fill-blank", question: "週末はいつも図書館で勉強し<span class='blank-space'>______</span>。", answers: ["ています", "ました", "ません", "たい"], correct: 0 },
          { type: "fill-blank", question: "お茶を飲み<span class='blank-space'>______</span>話しましょう。", answers: ["ながら", "ます", "ました", "ません"], correct: 0 },
          { type: "fill-blank", question: "歩き<span class='blank-space'>______</span>電話しないでください。", answers: ["ながら", "ます", "ました", "たい"], correct: 0 },
          { type: "fill-blank", question: "今日は雨も降っている<span class='blank-space'>______</span>、寒い<span class='blank-space'>______</span>、家にいましょう。", answers: ["し、し", "たり、たり", "て、て", "から、から"], correct: 0 },
          { type: "fill-blank", question: "彼は優しい<span class='blank-space'>______</span>、面白い<span class='blank-space'>______</span>、人気があります。", answers: ["し、し", "て、て", "たり、たり", "から、から"], correct: 0 },
          { type: "fill-blank", question: "電気が消え<span class='blank-space'>______</span>。", answers: ["ています", "てあります", "ます", "ました"], correct: 0 },
          { type: "fill-blank", question: "壁にポスターが貼っ<span class='blank-space'>______</span>。", answers: ["てあります", "ています", "ます", "ましょう"], correct: 0 },
          { type: "fill-blank", question: "明日の会議の資料を準備し<span class='blank-space'>______</span>。", answers: ["ておきます", "ています", "ます", "ました"], correct: 0 },
          { type: "fill-blank", question: "ケーキを全部食べ<span class='blank-space'>______</span>。", answers: ["てしまいました", "てありました", "ておきました", "ます"], correct: 0 },
        ];
      } else if (lvl === 2) {
        return [
          { type: "conjugation", question: "来年、日本へ留学<span class='blank-space'>______</span>と思っています。", answers: ["しよう", "する", "します", "した"], correct: 0 },
          { type: "conjugation", question: "今度の休みに国へ<span class='blank-space'>______</span>つもりです。", answers: ["帰る", "帰らない", "帰った", "帰って"], correct: 0 },
          { type: "conjugation", question: "会議は10時から始まる<span class='blank-space'>______</span>です。", answers: ["予定", "つもり", "ほう", "ところ"], correct: 0 },
          { type: "conjugation", question: "まだ昼ごはんを<span class='blank-space'>______</span>。", answers: ["食べていません", "食べます", "食べました", "食べません"], correct: 0 },
          { type: "conjugation", question: "熱があるなら、<span class='blank-space'>______</span>ほうがいいですよ。", answers: ["休んだ", "休む", "休み", "休んで"], correct: 0 },
          { type: "conjugation", question: "たぶん明日は雨が<span class='blank-space'>______</span>でしょう。", answers: ["降る", "降った", "降り", "降らない"], correct: 0 },
          { type: "conjugation", question: "もしかしたら彼は<span class='blank-space'>______</span>かもしれません。", answers: ["来ない", "来ます", "来ました", "来よう"], correct: 0 },
          { type: "conjugation", question: "早く<span class='blank-space'>______</span>！遅れるよ。", answers: ["走れ", "走る", "走ります", "走って"], correct: 0 },
          { type: "conjugation", question: "ここでタバコを<span class='blank-space'>______</span>！", answers: ["吸うな", "吸います", "吸って", "吸わない"], correct: 0 },
          { type: "conjugation", question: "看板に「止まれ」<span class='blank-space'>______</span>あります。", answers: ["と書いて", "を書いて", "が書いて", "に書いて"], correct: 0 },
          { type: "conjugation", question: "この漢字は「やま」<span class='blank-space'>______</span>読みます。", answers: ["と", "を", "に", "が"], correct: 0 },
          { type: "conjugation", question: "先生は明日テストが<span class='blank-space'>______</span>言っていました。", answers: ["あると", "ある", "あります", "あった"], correct: 0 },
          { type: "conjugation", question: "彼に電話が<span class='blank-space'>______</span>伝えていただけませんか。", answers: ["あったと", "ある", "あります", "ありました"], correct: 0 },
          { type: "conjugation", question: "私が<span class='blank-space'>______</span>とおりに、書いてください。", answers: ["言った", "言う", "言います", "言って"], correct: 0 },
          { type: "conjugation", question: "ご飯を<span class='blank-space'>______</span>あとで、薬を飲みます。", answers: ["食べた", "食べる", "食べます", "食べて"], correct: 0 },
          { type: "conjugation", question: "<span class='blank-space'>______</span>後に、出発します。", answers: ["1時間", "1時間の", "1時間に", "1時間で"], correct: 0 },
          { type: "conjugation", question: "手を洗っ<span class='blank-space'>______</span>、ご飯を食べます。", answers: ["て", "た", "たり", "ながら"], correct: 0 },
          { type: "conjugation", question: "電気を消さ<span class='blank-space'>______</span>寝てください。", answers: ["ないde", "なくて", "ない", "なかった"], correct: 0 },
          { type: "conjugation", question: "安けれ<span class='blank-space'>______</span>、買います。", answers: ["ば", "たら", "なら", "と"], correct: 0 },
          { type: "conjugation", question: "急gaiなけれ<span class='blank-space'>______</span>、間に合いませんよ。", answers: ["ば", "れば", "たら", "なら"], correct: 0 },
          { type: "conjugation", question: "天気が良<span class='blank-space'>______</span>、散歩しましょう。", answers: ["ければ", "かったら", "いなら", "くて"], correct: 0 },
          { type: "conjugation", question: "暇<span class='blank-space'>______</span>、遊びに来てください。", answers: ["なら", "だったら", "だと", "だ"], correct: 0 },
          { type: "conjugation", question: "どこで切符を買え<span class='blank-space'>______</span>いいですか。", answers: ["ば", "る", "た", "て"], correct: 0 },
          { type: "conjugation", question: "旅行<span class='blank-space'>______</span>、北海道がいいです。", answers: ["なら", "だったら", "は", "が"], correct: 0 },
          { type: "conjugation", question: "この薬は1日<span class='blank-space'>______</span>飲んでください。", answers: ["に3回", "3回に", "3回を", "3回で"], correct: 0 },
          { type: "conjugation", question: "ここに「禁煙」<span class='blank-space'>______</span>書いてあります。", answers: ["と", "を", "gai", "に"], correct: 0 },
          { type: "conjugation", question: "彼は「明日休む」<span class='blank-space'>______</span>言っていました。", answers: ["と", "を", "が", "に"], correct: 0 },
          { type: "conjugation", question: "天気予報<span class='blank-space'>______</span>、明日は雪だそうです。", answers: ["によると", "について", "によって", "に関して"], correct: 0 },
          { type: "conjugation", question: "この道をまっすぐ行く<span class='blank-space'>______</span>、駅があります。", answers: ["と", "ば", "たら", "なら"], correct: 0 },
          { type: "conjugation", question: "薬を飲んだ<span class='blank-space'>______</span>、熱が下がりました。", answers: ["ら", "ば", "と", "なら"], correct: 0 },
        ];
      } else if (lvl === 3) {
        return [
          { type: "conjugation", question: "忘れない<span class='blank-space'>______</span>、メモしてください。", answers: ["ように", "そうに", "ために", "のに"], correct: 0 },
          { type: "conjugation", question: "毎日運動する<span class='blank-space'>______</span>しています。", answers: ["ように", "そうに", "ために", "のに"], correct: 0 },
          { type: "conjugation", question: "日本語が話せる<span class='blank-space'>______</span>なりました。", answers: ["ように", "そうに", "ために", "のに"], correct: 0 },
          { type: "conjugation", question: "先生に<span class='blank-space'>______</span>ました。", answers: ["ほめられ", "ほめ", "ほめる", "ほめて"], correct: 0 },
          { type: "conjugation", question: "私は母に日記を<span class='blank-space'>______</span>ました。", answers: ["読まれ", "読み", "読む", "読んで"], correct: 0 },
          { type: "conjugation", question: "日本では「源氏物語」がよく<span class='blank-space'>______</span>います。", answers: ["読まれて", "読んで", "読み", "読む"], correct: 0 },
          { type: "conjugation", question: "一人で旅行する<span class='blank-space'>______</span>は楽しいです。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "約束した<span class='blank-space'>______</span>を忘れました。", answers: ["の", "こと", "もの", "ところ"], correct: 1 },
          { type: "conjugation", question: "彼が結婚した<span class='blank-space'>______</span>を知っていますか。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "あの眼鏡をかけている<span class='blank-space'>______</span>は田中さんです。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "天気が<span class='blank-space'>______</span>ので、出かけません。", answers: ["悪い", "悪くて", "悪いで", "悪かった"], correct: 0 },
          { type: "conjugation", question: "明日休む<span class='blank-space'>______</span>、今日中に終わらせます。", answers: ["ので", "から", "し", "が"], correct: 0 },
          { type: "conjugation", question: "彼が来る<span class='blank-space'>______</span>、聞いてください。", answers: ["かどうか", "か", "が", "を"], correct: 0 },
          { type: "conjugation", question: "this服を<span class='blank-space'>______</span>みてもいいですか。", answers: ["着て", "着る", "着ます", "着た"], correct: 0 },
          { type: "conjugation", question: "りんごを<span class='blank-space'>______</span>買いました。", answers: ["三つ", "三枚", "三本", "三冊"], correct: 0 },
          { type: "conjugation", question: "健康のために、甘いものを<span class='blank-space'>______</span>ようにしています。", answers: ["食べない", "食べる", "食べた", "食べて"], correct: 0 },
          { type: "conjugation", question: "もっと野菜を食べる<span class='blank-space'>______</span>してください。", answers: ["ように", "そうに", "ために", "のに"], correct: 0 },
          { type: "conjugation", question: "this建物は去年<span class='blank-space'>______</span>ました。", answers: ["建てられ", "建て", "建てる", "建てた"], correct: 0 },
          { type: "conjugation", question: "この本は多くの人に<span class='blank-space'>______</span>います。", answers: ["読まれて", "読んで", "読む", "読んだ"], correct: 0 },
          { type: "conjugation", question: "映画を見る<span class='blank-space'>______</span>は楽しいです。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "宿題を出す<span class='blank-space'>______</span>を忘れました。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "彼が合格した<span class='blank-space'>______</span>を知っています。", answers: ["の", "こと", "もの", "ところ"], correct: 0 },
          { type: "conjugation", question: "車の運転<span class='blank-space'>______</span>のは危ないです。", answers: ["する", "した", "して", "し"], correct: 0 },
          { type: "conjugation", question: "道が<span class='blank-space'>______</span>、遅れました。", answers: ["混んでいて", "混んでいる", "混んだ", "混みます"], correct: 0 },
          { type: "conjugation", question: "家が<span class='blank-space'>______</span>ので、引っ越しました。", answers: ["狭い", "狭くて", "狭いで", "狭かった"], correct: 0 },
          { type: "conjugation", question: "日曜日です<span class='blank-space'>______</span>、道がすいています。", answers: ["ので", "から", "し", "が"], correct: 3 },
          { type: "conjugation", question: "どこ<span class='blank-space'>______</span>切符を買うか、教えてください。", answers: ["で", "に", "を", "が"], correct: 0 },
          { type: "conjugation", question: "おいしい<span class='blank-space'>______</span>、食べてみます。", answers: ["かどうか", "か", "が", "を"], correct: 0 },
          { type: "conjugation", question: "ちょっと<span class='blank-space'>______</span>みます。", answers: ["考えて", "考える", "考えた", "考え"], correct: 0 },
          { type: "conjugation", question: "犬が<span class='blank-space'>______</span>います。", answers: ["三匹", "三つ", "三枚", "三本"], correct: 0 },
        ];
      } else if (lvl === 4) {
        return [
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi nhận quà từ thầy giáo.\"", words: ["わたしは", "先生に", "プレゼントを", "いただきました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi được thầy giáo dạy tiếng Nhật.\"", words: ["わたしは", "先生に", "日本語を", "教えて", "いただきました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Thầy giáo cho tôi cuốn sách.\"", words: ["先生は", "わたしに", "本を", "くださいました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Thầy đã viết thư cho tôi.\"", words: ["先生は", "わたしに", "手紙を", "書いて", "くださいました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi cho chó ăn.\"", words: ["わたしは", "犬に", "えさを", "やりました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi đọc sách cho em gái nghe.\"", words: ["わたしは", "妹に", "本を", "読んで", "やりました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Vì sức khỏe, tôi tập thể dục.\"", words: ["健康の", "ために", "運動を", "しています"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Đây là từ điển dùng để tra từ.\"", words: ["これは", "ことばを", "調べる", "のに", "使う", "辞書です"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Trời có vẻ sắp mưa.\"", words: ["雨が", "降り", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Món này có vẻ ngon.\"", words: ["この", "料理は", "おいし", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi đi mua đồ rồi quay lại.\"", words: ["ちょっと", "買い物に", "行って", "きます"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi ăn quá nhiều.\"", words: ["わたしは", "食べ", "すぎました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Cây bút này dễ viết.\"", words: ["この", "ペンは", "書き", "やすいです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi chọn trà.\"", words: ["わたしは", "お茶に", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Dù trời lạnh nhưng tôi vẫn đi bộ.\"", words: ["寒い", "のに", "散歩します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi nhận được vé từ công ty.\"", words: ["わたしは", "会社に", "チケットuを", "いただきました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi được chị chỉ cách nấu.\"", words: ["わたしは", "姉に", "料理の", "しかたを", "教えて", "いただきました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Thầy cho tôi cuốn từ điển.\"", words: ["先生は", "わたしに", "辞書を", "くださいました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Giám đốc đã khen tôi.\"", words: ["社長は", "わたしを", "ほめて", "くださいました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi tưới nước cho cây.\"", words: ["わたしは", "花に", "水を", "やりました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi hát cho em bé nghe.\"", words: ["わたしは", "赤ちゃんに", "歌を", "歌って", "やりました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Vì thi, tôi học chăm chỉ.\"", words: ["試験の", "ために", "一生懸命", "勉強します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Đây là dao để cắt bánh mì.\"", words: ["これは", "パンを", "切る", "のに", "使う", "ナイフです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Có vẻ sắp có bão.\"", words: ["台風gai", "来", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Anh ấy có vẻ khỏe.\"", words: ["彼は", "元気", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi đi rút tiền rồi quay lại.\"", words: ["ちょっと", "お金を", "下ろして", "きます"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi đã uống quá nhiều rượu.\"", words: ["わたしは", "お酒を", "comp", "すぎました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Bài toán này khó giải.\"", words: ["この", "問題は", "解き", "にくいです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi quyết định chọn món cá.\"", words: ["わたしは", "魚料理に", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Dù đắt nhưng tôi vẫn mua.\"", words: ["高い", "のに", "買いました"] },
        ];
      } else if (lvl === 5) {
        return [
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi chuẩn bị đi ngủ.\"", words: ["これから", "寝る", "ところです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi đang ăn cơm.\"", words: ["今", "食べて", "いるところです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi vừa mới về nhà.\"", words: ["たった今", "家に", "着いた", "boc"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Chắc là anh ấy sẽ đến.\"", words: ["彼は", "来る", "はずです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Theo tin tức, ngày mai trời mưa.\"", words: ["ニュースに", "よると", "明日は", "雨だ", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Dường như anh ấy đã ngủ rồi.\"", words: ["彼は", "mou", "寝た", "ようです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Mẹ bắt tôi học bài.\"", words: ["母は", "わたしを", "勉強", "させます"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Xin phép cho tôi nghỉ ngày mai.\"", words: ["明日", "休ませて", "いただけませんか"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Thầy đã về nước rồi ạ.\"", words: ["先生は", "帰国", "されました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Xin hãy đợi một chút.\"", words: ["少々", "お待ち", "ください"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép hướng dẫn cho ngài.\"", words: ["ご案内", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Xin hãy ngồi xuống.\"", words: ["おかけ", "ください"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép cầm giúp hành lý.\"", words: ["荷物を", "お持ち", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Ngài đi đâu ạ?\"", words: ["どちらへ", "いらっしゃいますか"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép được gặp ngài.\"", words: ["お目に", "かかりたいです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi sắp ra ngoài.\"", words: ["今から", "出かける", "ところです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Cô ấy đang gọi điện.\"", words: ["彼女は", "今", "電話を", "しているところです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi vừa mới đến công ty.\"", words: ["たった今", "会社に", "着いた", "ばかりです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Chắc là chuyến bay sẽ hủy.\"", words: ["飛行機は", "欠航する", "はずです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Theo bác sĩ, tôi bị cảm.\"", words: ["医者に", "よると", "わたしは", "風邪だ", "そうです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Có vẻ như anh ấy bận.\"", words: ["彼は", "忙しい", "ようです"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi cho con đi siêu thị.\"", words: ["わたしは", "子供を", "スーパーへ", "行かせます"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Cho tôi xem tài liệu đó được không?\"", words: ["その", "資料を", "見せて", "いただけませんか"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Giám đốc đã nói như vậy.\"", words: ["社長が", "そう", "おっしゃいました"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Xin hãy đến lúc 10 giờ.\"", words: ["10時に", "お越し", "ください"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép trả lời.\"", words: ["お答え", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Xin hãy kiểm tra.\"", words: ["お調べ", "ください"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép giới thiệu.\"", words: ["ご紹介", "します"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Ngài có biết không ạ?\"", words: ["ご存知ですか"] },
          { type: "arrange", question: "Hãy sắp xếp: \"Tôi xin phép được hỏi.\"", words: ["お聞き", "したいです"] },
        ];
      }
      return [];
    }

    // Clean up typos from raw dataset
    const questionsRaw = getQuestionsForLevel(level);
    const cleanedQuestions = questionsRaw.map(q => {
      let cleanedQText = q.question;
      // Clean up metadata notes or other minor typos in the question text
      cleanedQText = cleanedQText.replace("các em check hộ Thầy xem có đúng không, nếu sai thì sửa hộ Thầy nhé!<br/>", "");
      cleanedQText = cleanedQText.replace("this服", "この服");
      cleanedQText = cleanedQText.replace("this建物", "この建物");
      cleanedQText = cleanedQText.replace("駅へ行くするには", "駅へ行くには");
      cleanedQText = cleanedQText.replace("急gaiなけれ", "急がなけれ");
      
      let cleanedAnswers = q.answers?.map(a => {
        let clean = a.replace("ないde", "ないで");
        clean = clean.replace("from", "から");
        return clean;
      });

      let cleanedWords = q.words?.map(w => {
        let clean = w.replace("チケットuを", "チケットを");
        clean = clean.replace("台風gai", "台風が");
        clean = clean.replace("comp", "飲み");
        clean = clean.replace("boc", "ばかりです");
        clean = clean.replace("mou", "もう");
        return clean;
      });

      return {
        ...q,
        question: cleanedQText,
        answers: cleanedAnswers,
        words: cleanedWords
      };
    });

    class Game {
      level: number;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      isMobile: boolean;
      animationId: number | null = null;
      gameSpeed = 0;
      isDrifting = false;
      driftPower = 0;
      gamePaused = false;
      gameEnded = false;
      correctAnswersCount = 0;
      score = 0;
      distance = 0;
      roadOffset = 0;
      obstacles: any[] = [];
      obstacleTimer = 0;
      obstacleInterval = 70;
      particles: Particle[] = [];
      frameCount = 0;
      currentQuestion: Question | null = null;
      keys: Record<string, boolean> = {};
      scale = 1;
      player: any = null;
      neonSigns: any[] = [];
      roadWidth = 450;
      laneWidth = 150;
      maxSpeed = 320;
      acceleration = 0.5;
      deceleration = 0.3;
      friction = 0.96;
      TOTAL_QUESTIONS = 30;
      allQuestions: QuestionData[];
      availableQuestions: QuestionData[] = [];
      usedQuestions: QuestionData[] = [];

      boundHandleKeyDown: (e: KeyboardEvent) => void;
      boundHandleKeyUp: (e: KeyboardEvent) => void;

      constructor(level: number) {
        this.level = level;
        this.canvas = wrapper?.querySelector("#gameCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
        this.isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || window.innerWidth < 768;
        this.allQuestions = cleanedQuestions;
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
      }

      shuffleArray(arr: any[]) {
        const s = arr.slice();
        for (let i = s.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [s[i], s[j]] = [s[j], s[i]];
        }
        return s;
      }

      resetQuestions() {
        this.availableQuestions = this.shuffleArray(this.allQuestions.slice());
        this.usedQuestions = [];
      }

      getRandomQuestion() {
        if (this.availableQuestions.length === 0) {
          this.availableQuestions = this.shuffleArray(this.usedQuestions.slice());
          this.usedQuestions = [];
        }
        const q = this.availableQuestions.pop() as QuestionData;
        this.usedQuestions.push(q);
        return q;
      }

      initGame() {
        this.resizeCanvas();
        this.gameSpeed = 0;
        this.isDrifting = false;
        this.driftPower = 0;
        this.gamePaused = false;
        this.gameEnded = false;
        this.correctAnswersCount = 0;
        this.score = 0;
        this.distance = 0;
        this.roadOffset = 0;
        this.obstacles = [];
        this.obstacleTimer = 0;
        this.obstacleInterval = 70;
        this.particles = [];
        this.frameCount = 0;
        this.currentQuestion = null;
        this.keys = {};
        this.resetQuestions();
        this.scale = Math.min(1, this.canvas.width / 500);
        this.player = {
          x: this.canvas.width / 2,
          y: this.canvas.height - 160 * this.scale,
          width: 75 * this.scale,
          height: 140 * this.scale,
          lateralSpeed: 0,
          rotationAngle: 0,
        };
        this.initNeonSigns();
        
        const speedEl = wrapper?.querySelector("#speed");
        if (speedEl) speedEl.textContent = "0";

        const scoreEl = wrapper?.querySelector("#score");
        if (scoreEl) scoreEl.textContent = "Điểm: 0";

        const correctEl = wrapper?.querySelector("#correctAnswers");
        if (correctEl) correctEl.textContent = `Đúng: 0/${this.TOTAL_QUESTIONS}`;

        const fillEl = wrapper?.querySelector("#progressFill") as HTMLElement;
        if (fillEl) fillEl.style.width = "0%";

        wrapper?.querySelector("#questionModal")?.classList.remove("show");
        wrapper?.querySelector("#gameOverScreen")?.classList.remove("show");
        wrapper?.querySelector("#victoryScreen")?.classList.remove("show");
        wrapper?.querySelectorAll(".confetti").forEach(el => el.remove());
        
        const indicator = wrapper?.querySelector("#drift-indicator") as HTMLElement;
        if (indicator) indicator.style.display = "none";
      }

      resizeCanvas() {
        this.canvas.width = wrapper?.clientWidth || window.innerWidth;
        this.canvas.height = wrapper?.clientHeight || window.innerHeight;
        this.roadWidth = Math.min(450, this.canvas.width * 0.8);
        this.laneWidth = this.roadWidth / 3;
      }

      initNeonSigns() {
        this.neonSigns = [];
        for (let i = 0; i < 8; i++) {
          this.neonSigns.push({
            x: Math.random() * 200 - 100,
            y: Math.random() * this.canvas.height,
            color: ["#ff0066", "#00ffff", "#ffd700", "#ff6b6b", "#00ff88"][Math.floor(Math.random() * 5)],
            text: ["ラーメン", "パチンコ", "喫茶", "寿司", "ゲーム", "ドリフト", "日本語", "勉強"][Math.floor(Math.random() * 8)],
            size: Math.random() * 16 + 16,
          });
        }
      }

      handleKeyDown(e: KeyboardEvent) {
        if (this.gamePaused || this.gameEnded) return;
        this.keys[e.key] = true;
        if (e.key === " " || e.key === "Spacebar") {
          this.isDrifting = true;
          e.preventDefault();
        }
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
        }
      }

      handleKeyUp(e: KeyboardEvent) {
        this.keys[e.key] = false;
        if (e.key === " " || e.key === "Spacebar") {
          this.isDrifting = false;
          e.preventDefault();
        }
      }

      setupMobileControls() {
        const setup = (id: string, key: string) => {
          const b = wrapper?.querySelector(`#${id}`);
          if (!b) return;
          const s = (e: Event) => {
            e.preventDefault();
            if (!this.gamePaused && !this.gameEnded) this.keys[key] = true;
          };
          const end = (e: Event) => {
            e.preventDefault();
            this.keys[key] = false;
          };
          b.addEventListener("touchstart", s);
          b.addEventListener("touchend", end);
          b.addEventListener("touchcancel", end);
          b.addEventListener("mousedown", s);
          b.addEventListener("mouseup", end);
          b.addEventListener("mouseleave", end);
        };
        
        setup("btnLeft", "ArrowLeft");
        setup("btnRight", "ArrowRight");
        setup("btnUp", "ArrowUp");
        setup("btnDown", "ArrowDown");

        const db = wrapper?.querySelector("#btnDrift");
        if (db) {
          const s = (e: Event) => {
            e.preventDefault();
            if (!this.gamePaused && !this.gameEnded) this.isDrifting = true;
          };
          const end = (e: Event) => {
            e.preventDefault();
            this.isDrifting = false;
          };
          db.addEventListener("touchstart", s);
          db.addEventListener("touchend", end);
          db.addEventListener("touchcancel", end);
          db.addEventListener("mousedown", s);
          db.addEventListener("mouseup", end);
          db.addEventListener("mouseleave", end);
        }
      }

      setupRestartButtons() {
        const restart = (e: Event) => {
          e.preventDefault();
          this.destroy();
          startLevel(this.level);
        };
        const menu = (e: Event) => {
          e.preventDefault();
          handleBackToMenu();
        };

        const r1 = wrapper?.querySelector("#restartBtn");
        if (r1) {
          r1.addEventListener("click", restart);
          r1.addEventListener("touchend", restart);
        }
        const r2 = wrapper?.querySelector("#victoryRestartBtn");
        if (r2) {
          r2.addEventListener("click", restart);
          r2.addEventListener("touchend", restart);
        }
        const m1 = wrapper?.querySelector("#menuFromGameOverBtn");
        if (m1) {
          m1.addEventListener("click", menu);
          m1.addEventListener("touchend", menu);
        }
        const m2 = wrapper?.querySelector("#menuFromVictoryBtn");
        if (m2) {
          m2.addEventListener("click", menu);
          m2.addEventListener("touchend", menu);
        }
      }

      updateProgress() {
        const correctEl = wrapper?.querySelector("#correctAnswers");
        if (correctEl) correctEl.textContent = `Đúng: ${this.correctAnswersCount}/${this.TOTAL_QUESTIONS}`;

        const fillEl = wrapper?.querySelector("#progressFill") as HTMLElement;
        if (fillEl) fillEl.style.width = `${(this.correctAnswersCount / this.TOTAL_QUESTIONS) * 100}%`;

        // Reward User XP in real application state
        updateProgress({ xp: progress.xp + 10 });

        if (this.correctAnswersCount >= this.TOTAL_QUESTIONS) this.victory();
      }

      victory() {
        this.gameEnded = true;
        this.gamePaused = true;
        this.isDrifting = false;
        
        const scoreEl = wrapper?.querySelector("#victoryScore");
        if (scoreEl) scoreEl.textContent = String(this.score);

        wrapper?.querySelector("#victoryScreen")?.classList.add("show");
        this.createConfetti();
        
        let stars = 1;
        if (this.score > 5000) stars = 2;
        if (this.score > 10000) stars = 3;
        saveStars(this.level, stars);
        playSound.achievement();
      }

      createConfetti() {
        const colors = ["#ff0066", "#ffd700", "#00ffff", "#00ff88", "#ff6b6b"];
        const vs = wrapper?.querySelector("#victoryScreen");
        if (!vs) return;

        for (let i = 0; i < 80; i++) {
          setTimeout(() => {
            const c = document.createElement("div");
            c.className = "confetti";
            c.style.left = `${Math.random() * 100}%`;
            c.style.top = `-${Math.random() * 100}px`;
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.width = `${Math.random() * 10 + 5}px`;
            c.style.height = `${Math.random() * 10 + 5}px`;
            c.style.animationDuration = `${Math.random() * 3 + 2}s`;
            vs.appendChild(c);
            setTimeout(() => {
              if (c.parentNode) c.remove();
            }, 4000);
          }, i * 30);
        }
      }

      showQuestion() {
        if (this.gameEnded) return;
        this.gamePaused = true;
        this.isDrifting = false;
        const qData = this.getRandomQuestion();
        this.currentQuestion = new Question(qData);
        
        this.currentQuestion.onCorrect = () => {
          this.correctAnswersCount++;
          this.score += 200;
          this.updateProgress();
          playSound.correct();
          setTimeout(() => {
            wrapper?.querySelector("#questionModal")?.classList.remove("show");
            if (!this.gameEnded) {
              this.gamePaused = false;
              this.currentQuestion = null;
              this.player.rotationAngle = 0;
              this.player.lateralSpeed = 0;
            }
          }, 800);
        };

        this.currentQuestion.onWrong = () => {
          playSound.wrong();
          setTimeout(() => {
            wrapper?.querySelector("#questionModal")?.classList.remove("show");
            if (!this.gameEnded) {
              this.gameEnded = true;
              
              const finalScoreEl = wrapper?.querySelector("#finalScore");
              if (finalScoreEl) finalScoreEl.textContent = String(this.score);

              const finalCorrectEl = wrapper?.querySelector("#finalCorrect");
              if (finalCorrectEl) finalCorrectEl.textContent = String(this.correctAnswersCount);

              wrapper?.querySelector("#gameOverScreen")?.classList.add("show");
            }
          }, 1200);
        };

        const questionDisplay = wrapper?.querySelector("#questionDisplay") as HTMLElement;
        const answersContainer = wrapper?.querySelector("#answersContainer") as HTMLElement;
        const arrangeContainer = wrapper?.querySelector("#arrangeContainer") as HTMLElement;

        if (questionDisplay && answersContainer && arrangeContainer) {
          this.currentQuestion.render(questionDisplay, answersContainer, arrangeContainer);
        }

        wrapper?.querySelector("#questionModal")?.classList.add("show");
      }

      createExplosion(x: number, y: number, color: string) {
        const c = this.isMobile ? 20 : 35;
        for (let i = 0; i < c; i++) this.particles.push(new Particle(x, y, color, "spark"));
        for (let j = 0; j < c / 2; j++) this.particles.push(new Particle(x, y, "#fff", "smoke"));
      }

      createObstacle() {
        const lane = Math.floor(Math.random() * 3);
        const x = this.canvas.width / 2 - this.roadWidth / 2 + lane * this.laneWidth + this.laneWidth / 2;
        const types = [
          { w: 70 * this.scale, h: 130 * this.scale, c: "#4a5568", s: 0.3 },
          { w: 55 * this.scale, h: 110 * this.scale, c: "#2d3748", s: 0.5 },
          { w: 60 * this.scale, h: 100 * this.scale, c: "#e53e3e", s: 0.7 },
        ];
        const t = types[Math.floor(Math.random() * types.length)];
        return { x: x, y: -180 * this.scale, width: t.w, height: t.h, lane: lane, color: t.c, baseSpeed: t.s };
      }

      update() {
        if (this.gamePaused || this.gameEnded) return;
        this.frameCount++;
        
        if (this.keys["ArrowUp"]) {
          this.gameSpeed = Math.min(this.gameSpeed + this.acceleration * (this.isDrifting ? 1.3 : 1), this.maxSpeed);
        } else if (this.keys["ArrowDown"]) {
          this.gameSpeed = Math.max(this.gameSpeed - this.deceleration * 2.5, 0);
        } else {
          this.gameSpeed *= this.friction;
        }

        if (this.isDrifting && this.gameSpeed > 80) {
          this.driftPower = Math.min(this.driftPower + 0.02, 0.25);
          if (this.keys["ArrowLeft"]) this.player.rotationAngle = Math.max(-0.25, this.player.rotationAngle - 0.02);
          else if (this.keys["ArrowRight"]) this.player.rotationAngle = Math.min(0.25, this.player.rotationAngle + 0.02);
          
          if (this.frameCount % 2 === 0) {
            this.particles.push(new Particle(this.player.x + (this.player.width / 2) * (Math.random() - 0.5), this.player.y + this.player.height / 2, "#fff", "smoke"));
          }
        } else {
          this.driftPower = Math.max(0, this.driftPower - 0.01);
          this.player.rotationAngle *= 0.9;
        }

        const lm = this.isDrifting ? 1.3 : 1;
        if (this.keys["ArrowLeft"]) this.player.lateralSpeed = Math.max(this.player.lateralSpeed - 1 * lm, -8);
        else if (this.keys["ArrowRight"]) this.player.lateralSpeed = Math.min(this.player.lateralSpeed + 1 * lm, 8);
        else this.player.lateralSpeed *= 0.9;

        this.player.x += this.player.lateralSpeed;
        const lb = this.canvas.width / 2 - this.roadWidth / 2 + this.player.width / 2;
        const rb = this.canvas.width / 2 + this.roadWidth / 2 - this.player.width / 2;
        
        if (this.player.x < lb) {
          this.player.x = lb;
          this.player.lateralSpeed *= -0.2;
        }
        if (this.player.x > rb) {
          this.player.x = rb;
          this.player.lateralSpeed *= -0.2;
        }

        this.roadOffset = (this.roadOffset + this.gameSpeed * 0.5) % 40;
        if (this.gameSpeed > 0) {
          this.distance += this.gameSpeed * 0.1 * (this.isDrifting ? 1.3 : 1);
          this.score = Math.floor(this.distance / 10);
        }

        this.obstacleTimer++;
        if (this.obstacleTimer > this.obstacleInterval && this.gameSpeed > 40) {
          this.obstacles.push(this.createObstacle());
          this.obstacleTimer = 0;
          this.obstacleInterval = Math.max(30, 65 - this.gameSpeed * 0.12);
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          obs.y += (this.gameSpeed - obs.baseSpeed * 40) * 0.25;
          
          if (
            this.player.x - this.player.width / 2 + 8 < obs.x + obs.width / 2 &&
            this.player.x + this.player.width / 2 - 8 > obs.x - obs.width / 2 &&
            this.player.y - this.player.height / 2 + 8 < obs.y + obs.height / 2 &&
            this.player.y + this.player.height / 2 - 8 > obs.y - obs.height / 2
          ) {
            this.createExplosion(obs.x, obs.y, "#ff4757");
            this.obstacles.splice(i, 1);
            this.gameSpeed *= 0.4;
            this.player.rotationAngle = (Math.random() - 0.5) * 0.15;
            this.showQuestion();
          } else if (obs.y > this.canvas.height + 200) {
            this.obstacles.splice(i, 1);
          }
        }

        for (let j = this.particles.length - 1; j >= 0; j--) {
          this.particles[j].update();
          if (this.particles[j].life <= 0 || this.particles[j].y < -50) {
            this.particles.splice(j, 1);
          }
        }

        const maxP = this.isMobile ? 80 : 150;
        if (this.particles.length > maxP) {
          this.particles.splice(0, this.particles.length - maxP);
        }

        if (this.gameSpeed > 100 && this.frameCount % 3 === 0) {
          this.particles.push(new Particle(this.player.x + (Math.random() - 0.5) * 20, this.player.y + this.player.height / 2, this.isDrifting ? "#ff6b6b" : "#ffa502", "spark"));
        }

        this.neonSigns.forEach(s => {
          s.y += this.gameSpeed * 0.15;
          if (s.y > this.canvas.height + 30) {
            s.y = -30;
            s.x = Math.random() * 300 - 150;
          }
        });
      }

      drawCityBackground() {
        const ctx = this.ctx;
        const sg = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        sg.addColorStop(0, "#0a0a1a");
        sg.addColorStop(0.4, "#1a1a3e");
        sg.addColorStop(0.7, "#1a0a2e");
        sg.addColorStop(1, "#0d0d1a");
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const bc = this.isMobile ? 15 : 25;
        ctx.fillStyle = "#0d0d2b";
        for (let i = 0; i < bc; i++) {
          const bx = ((i * 140 + this.roadOffset * 1.5) % (this.canvas.width + 200)) - 100;
          const bh = Math.sin(i) * 100 + 120; // Stable building heights
          ctx.fillRect(bx, this.canvas.height - bh - 350, 50, bh);
        }

        this.neonSigns.forEach(sign => {
          ctx.fillStyle = sign.color;
          ctx.font = `${sign.size}px "MS Gothic", Arial`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = sign.color;
          ctx.fillText(sign.text, this.canvas.width / 2 + sign.x, sign.y);
          ctx.shadowBlur = 0;
        });

        const sc = this.isMobile ? 30 : 60;
        ctx.fillStyle = "white";
        for (let j = 0; j < sc; j++) {
          const sx = (j * 173.21) % this.canvas.width;
          const sy = ((j * 91.17 + this.roadOffset * 0.3) % (this.canvas.height * 0.4));
          ctx.globalAlpha = Math.sin(Date.now() * 0.001 + j) * 0.2 + 0.4;
          ctx.beginPath();
          ctx.arc(sx, sy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      drawRoad() {
        const ctx = this.ctx;
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(this.canvas.width / 2 - this.roadWidth / 2, 0, this.roadWidth, this.canvas.height);

        const eg1 = ctx.createLinearGradient(this.canvas.width / 2 - this.roadWidth / 2 - 10, 0, this.canvas.width / 2 - this.roadWidth / 2 + 10, 0);
        eg1.addColorStop(0, "rgba(0,255,255,0)");
        eg1.addColorStop(0.5, "rgba(0,255,255,0.4)");
        eg1.addColorStop(1, "rgba(0,255,255,0)");
        ctx.fillStyle = eg1;
        ctx.fillRect(this.canvas.width / 2 - this.roadWidth / 2 - 15, 0, 30, this.canvas.height);

        const eg2 = ctx.createLinearGradient(this.canvas.width / 2 + this.roadWidth / 2 - 10, 0, this.canvas.width / 2 + this.roadWidth / 2 + 10, 0);
        eg2.addColorStop(0, "rgba(255,0,102,0)");
        eg2.addColorStop(0.5, "rgba(255,0,102,0.4)");
        eg2.addColorStop(1, "rgba(255,0,102,0)");
        ctx.fillStyle = eg2;
        ctx.fillRect(this.canvas.width / 2 + this.roadWidth / 2 - 15, 0, 30, this.canvas.height);

        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([25, 18]);
        ctx.lineDashOffset = -this.roadOffset;

        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(this.canvas.width / 2 - this.roadWidth / 2 + i * this.laneWidth, 0);
          ctx.lineTo(this.canvas.width / 2 - this.roadWidth / 2 + i * this.laneWidth, this.canvas.height);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      drawPlayerCar() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.player.x, this.player.y);
        ctx.rotate(this.player.rotationAngle);
        const pw = this.player.width;
        const ph = this.player.height;

        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.beginPath();
        ctx.roundRect(-pw / 2 + 6, -ph / 2 + 6, pw - 12, ph - 12, 10);
        ctx.fill();

        const bg = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2);
        bg.addColorStop(0, "#ff1744");
        bg.addColorStop(0.3, "#ff4569");
        bg.addColorStop(0.7, "#d50000");
        bg.addColorStop(1, "#b71c1c");
        ctx.fillStyle = bg;

        ctx.beginPath();
        ctx.moveTo(-pw / 2 + 4, -ph / 2 + 25);
        ctx.lineTo(-pw / 2 + 12, -ph / 2 + 4);
        ctx.quadraticCurveTo(0, -ph / 2 - 8, pw / 2 - 12, -ph / 2 + 4);
        ctx.lineTo(pw / 2 - 4, -ph / 2 + 25);
        ctx.lineTo(pw / 2 - 8, ph / 2 - 20);
        ctx.lineTo(-pw / 2 + 8, ph / 2 - 20);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.moveTo(-pw / 2 + 16, -ph / 2 + 16);
        ctx.lineTo(pw / 2 - 16, -ph / 2 + 16);
        ctx.lineTo(pw / 2 - 20, -ph / 2 + 50);
        ctx.lineTo(-pw / 2 + 20, -ph / 2 + 50);
        ctx.closePath();
        ctx.fill();

        const wg = ctx.createLinearGradient(0, -ph / 2 + 20, 0, -ph / 2 + 65);
        wg.addColorStop(0, "#87ceeb");
        wg.addColorStop(1, "#1a1a2e");
        ctx.fillStyle = wg;

        ctx.beginPath();
        ctx.moveTo(-pw / 2 + 14, -ph / 2 + 20);
        ctx.quadraticCurveTo(0, -ph / 2 + 10, pw / 2 - 14, -ph / 2 + 20);
        ctx.lineTo(pw / 2 - 18, -ph / 2 + 55);
        ctx.lineTo(-pw / 2 + 18, -ph / 2 + 55);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(-pw / 2 + 20, -ph / 2 + 24);
        ctx.lineTo(0, -ph / 2 + 16);
        ctx.lineTo(-6, -ph / 2 + 50);
        ctx.lineTo(-pw / 2 + 24, -ph / 2 + 50);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fillRect(-8, -ph / 2 + 12, 16, ph - 40);

        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.moveTo(-pw / 2 - 12, ph / 2 - 35);
        ctx.lineTo(-pw / 2 - 6, ph / 2 - 48);
        ctx.lineTo(pw / 2 + 6, ph / 2 - 48);
        ctx.lineTo(pw / 2 + 12, ph / 2 - 35);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#333";
        ctx.fillRect(-pw / 2 - 14, ph / 2 - 37, 5, 20);
        ctx.fillRect(pw / 2 + 9, ph / 2 - 37, 5, 20);

        const wps = [
          { x: -pw / 2 - 2, y: -ph / 2 + 50 },
          { x: pw / 2 + 2, y: -ph / 2 + 50 },
          { x: -pw / 2 - 2, y: ph / 2 - 60 },
          { x: pw / 2 + 2, y: ph / 2 - 60 },
        ];
        wps.forEach(w => {
          ctx.fillStyle = "#1a1a1a";
          ctx.fillRect(w.x - 8, w.y - 14, 16, 28);
          const rg = ctx.createRadialGradient(w.x, w.y, 1, w.x, w.y, 8);
          rg.addColorStop(0, "#c0c0c0");
          rg.addColorStop(0.6, "#808080");
          rg.addColorStop(1, "#404040");
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(w.x, w.y, 7, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = "#ffd700";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#ffd700";
        ctx.beginPath();
        ctx.arc(-pw / 2 + 20, -ph / 2 + 12, 5, 0, Math.PI * 2);
        ctx.arc(pw / 2 - 20, -ph / 2 + 12, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff0000";
        ctx.beginPath();
        ctx.arc(-pw / 2 + 20, ph / 2 - 30, 4, 0, Math.PI * 2);
        ctx.arc(pw / 2 - 20, ph / 2 - 30, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (this.gameSpeed > 150 || this.isDrifting) {
          ctx.fillStyle = "#ff4500";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ff4500";
          for (let i = 0; i < 2; i++) {
            const fx = -8 + i * 16;
            const fh = Math.random() * 15 + 8;
            ctx.beginPath();
            ctx.moveTo(fx - 3, ph / 2 - 25);
            ctx.lineTo(fx, ph / 2 - 25 - fh);
            ctx.lineTo(fx + 3, ph / 2 - 25);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        }
        ctx.restore();
      }

      drawObstacles() {
        const ctx = this.ctx;
        this.obstacles.forEach(obs => {
          ctx.save();
          ctx.translate(obs.x, obs.y);
          
          ctx.fillStyle = "rgba(0,0,0,0.35)";
          ctx.beginPath();
          ctx.roundRect(-obs.width / 2 + 4, -obs.height / 2 + 4, obs.width - 8, obs.height - 8, 8);
          ctx.fill();

          const og = ctx.createLinearGradient(0, -obs.height / 2, 0, obs.height / 2);
          og.addColorStop(0, obs.color);
          og.addColorStop(1, "#1a1a1a");
          ctx.fillStyle = og;
          ctx.beginPath();
          ctx.roundRect(-obs.width / 2, -obs.height / 2, obs.width, obs.height, 10);
          ctx.fill();

          ctx.fillStyle = "#2d3748";
          ctx.fillRect(-obs.width / 2 + 8, -obs.height / 2 + 16, obs.width - 16, 32);

          ctx.fillStyle = "#000";
          ctx.fillRect(-obs.width / 2 - 4, -obs.height / 2 + 24, 10, 20);
          ctx.fillRect(obs.width / 2 - 6, -obs.height / 2 + 24, 10, 20);
          ctx.fillRect(-obs.width / 2 - 4, obs.height / 2 - 44, 10, 20);
          ctx.fillRect(obs.width / 2 - 6, obs.height / 2 - 44, 10, 20);

          ctx.restore();
        });
      }

      drawSpeedLines() {
        if (this.gameSpeed > 60) {
          const ctx = this.ctx;
          const intensity = (this.gameSpeed - 60) / (this.maxSpeed - 60);
          ctx.strokeStyle = `rgba(255,255,255,${intensity * 0.25})`;
          ctx.lineWidth = 1.5;
          const lc = Math.floor(intensity * (this.isMobile ? 5 : 8));
          for (let i = 0; i < lc; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + (Math.random() - 0.5) * 20, y + Math.random() * 100 + 40);
            ctx.stroke();
          }
        }
      }

      drawHUD() {
        const di = wrapper?.querySelector("#drift-indicator") as HTMLElement;
        if (di) di.style.display = this.isDrifting && this.gameSpeed > 80 ? "block" : "none";
      }

      draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCityBackground();
        this.drawRoad();
        this.drawSpeedLines();
        this.drawObstacles();
        this.drawPlayerCar();
        this.drawHUD();
        this.particles.forEach(p => p.draw(this.ctx));

        if (this.isDrifting && this.gameSpeed > 120) {
          this.ctx.fillStyle = "rgba(255,0,102,0.04)";
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        const vg = this.ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.35, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.75);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0,0,0,0.35)");
        this.ctx.fillStyle = vg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      gameLoop() {
        this.update();
        this.draw();
        
        const speedEl = wrapper?.querySelector("#speed");
        if (speedEl) speedEl.textContent = String(Math.floor(this.gameSpeed));

        const scoreEl = wrapper?.querySelector("#score");
        if (scoreEl) scoreEl.textContent = `Điểm: ${this.score}`;

        this.animationId = requestAnimationFrame(() => this.gameLoop());
      }

      start() {
        this.initGame();
        window.addEventListener("keydown", this.boundHandleKeyDown);
        window.addEventListener("keyup", this.boundHandleKeyUp);
        this.setupMobileControls();
        this.setupRestartButtons();
        this.gameLoop();
      }

      destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        window.removeEventListener("keydown", this.boundHandleKeyDown);
        window.removeEventListener("keyup", this.boundHandleKeyUp);
        this.gamePaused = true;
        this.gameEnded = true;
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life = 1;
      decay: number;
      color: string;
      size: number;
      rotation: number;
      type: "smoke" | "spark" | "normal";

      constructor(x: number, y: number, color: string, type: "smoke" | "spark" | "normal" = "normal") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.vx = (Math.random() - 0.5) * (this.type === "smoke" ? 2 : 4);
        this.vy = Math.random() * (this.type === "smoke" ? -2 : 2) + (this.type === "smoke" ? -1.5 : 0);
        this.decay = Math.random() * 0.02 + (this.type === "smoke" ? 0.015 : 0.025);
        this.color = color;
        this.size = Math.random() * (this.type === "smoke" ? 6 : 3) + (this.type === "smoke" ? 2 : 1);
        this.rotation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.type === "smoke") {
          this.size += 0.08;
          this.vy *= 0.98;
          this.vx *= 0.98;
        }
        this.life -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.life * 0.5;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === "smoke") {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          g.addColorStop(0, "rgba(255,255,255,0.25)");
          g.addColorStop(0.6, "rgba(200,200,200,0.08)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        }

        ctx.beginPath();
        if (this.type === "smoke") {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        } else if (this.type === "spark") {
          ctx.moveTo(-this.size, 0);
          ctx.lineTo(0, -this.size * 1.5);
          ctx.lineTo(this.size, 0);
          ctx.lineTo(0, this.size * 1.5);
        } else {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
    }

    const game = new Game(level);
    gameInstanceRef.current = game;
    game.start();

    const handleResize = () => {
      if (gameInstanceRef.current && !gameInstanceRef.current.gameEnded) {
        gameInstanceRef.current.resizeCanvas();
        gameInstanceRef.current.scale = Math.min(1, gameInstanceRef.current.canvas.width / 500);
        gameInstanceRef.current.player.y = gameInstanceRef.current.canvas.height - 160 * gameInstanceRef.current.scale;
        gameInstanceRef.current.player.width = 75 * gameInstanceRef.current.scale;
        gameInstanceRef.current.player.height = 140 * gameInstanceRef.current.scale;
        gameInstanceRef.current.initNeonSigns();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy();
        gameInstanceRef.current = null;
      }
    };
  }, [activeLevel]);

  return (
    <div ref={containerRef} id="sonkuro-drift-game-wrapper" className="relative w-full h-[650px] overflow-hidden rounded-3xl bg-[#000] border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#FF6B35]">
      {/* Scope CSS */}
      <style>{`
        #sonkuro-drift-game-wrapper {
          --safe-top: 15px;
          --safe-bottom: 10px;
          --neon-pink: #ff0066;
          --neon-cyan: #00ffff;
          --neon-gold: #ffd700;
          --neon-green: #00ff88;
          --bg-deep: #0a0a1a;
          --card-bg: rgba(26, 26, 46, 0.85);
          font-family: 'Segoe UI', 'Arial', 'MS Gothic', sans-serif;
        }

        #sonkuro-drift-game-wrapper canvas {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
        }

        #sonkuro-drift-game-wrapper #ui {
          position: absolute;
          top: 15px;
          left: 15px;
          color: white;
          font-size: 14px;
          z-index: 10;
          pointer-events: none;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        #sonkuro-drift-game-wrapper #speed {
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(45deg, #ff0066, #ff6b6b, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 0, 102, 0.5));
        }

        #sonkuro-drift-game-wrapper #score {
          color: #00ffff;
          font-size: 16px;
          text-shadow: 0 0 15px #00ffff;
          letter-spacing: 2px;
        }

        #sonkuro-drift-game-wrapper #correctAnswers {
          color: #00ff88;
          font-size: 14px;
          margin-top: 5px;
          text-shadow: 0 0 10px #00ff88;
        }

        #sonkuro-drift-game-wrapper #progressBar {
          width: 180px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          margin-top: 5px;
          overflow: hidden;
        }

        #sonkuro-drift-game-wrapper #progressFill {
          height: 100%;
          background: linear-gradient(90deg, #00ff88, #00ffff);
          border-radius: 10px;
          transition: width 0.5s;
          width: 0%;
        }

        #sonkuro-drift-game-wrapper #goalText {
          color: #ffd700;
          font-size: 12px;
          margin-top: 3px;
          letter-spacing: 1px;
        }

        #sonkuro-drift-game-wrapper #drift-indicator {
          position: absolute;
          top: 50%;
          right: 3vw;
          transform: translateY(-50%);
          color: #ff0066;
          font-size: 28px;
          font-weight: bold;
          text-shadow: 0 0 20px #ff0066;
          z-index: 10;
          display: none;
          pointer-events: none;
          animation: driftPulse 0.5s infinite;
        }

        @keyframes driftPulse {
          0%, 100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
          }
        }

        #sonkuro-drift-game-wrapper #backToMenuBtn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 20;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 1px;
          backdrop-filter: blur(5px);
          transition: all 0.3s;
        }

        #sonkuro-drift-game-wrapper #backToMenuBtn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffd700;
        }

        #sonkuro-drift-game-wrapper #mobileControls {
          display: flex;
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          z-index: 20;
          padding: 0 10px;
          justify-content: space-between;
          align-items: flex-end;
          pointer-events: none;
        }

        #sonkuro-drift-game-wrapper .control-group {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          pointer-events: auto;
        }

        #sonkuro-drift-game-wrapper .control-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(5px);
          transition: all 0.1s;
          pointer-events: auto;
        }

        #sonkuro-drift-game-wrapper .control-btn:active {
          background: rgba(255, 255, 255, 0.4);
          border-color: #ffd700;
          transform: scale(0.9);
        }

        #sonkuro-drift-game-wrapper .control-btn.drift-btn {
          width: 65px;
          height: 65px;
          background: rgba(255, 0, 102, 0.3);
          border-color: rgba(255, 0, 102, 0.6);
          font-size: 14px;
          font-weight: bold;
          pointer-events: auto;
        }

        #sonkuro-drift-game-wrapper .control-btn.drift-btn:active {
          background: rgba(255, 0, 102, 0.6);
          border-color: #ff0066;
          box-shadow: 0 0 30px rgba(255, 0, 102, 0.8);
        }

        #sonkuro-drift-game-wrapper .control-btn.up-btn {
          width: 65px;
          height: 65px;
          background: rgba(0, 255, 255, 0.2);
          border-color: rgba(0, 255, 255, 0.4);
        }

        #sonkuro-drift-game-wrapper .control-btn.up-btn:active {
          background: rgba(0, 255, 255, 0.5);
          border-color: #00ffff;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
        }

        #sonkuro-drift-game-wrapper #questionModal {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 100;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(10px);
          padding: 15px;
        }

        #sonkuro-drift-game-wrapper #questionModal.show {
          display: flex;
        }

        #sonkuro-drift-game-wrapper .modal-content {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border: 2px solid #ff0066;
          border-radius: 15px;
          padding: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 90%;
          overflow-y: auto;
          box-shadow: 0 0 40px rgba(255, 0, 102, 0.4);
        }

        #sonkuro-drift-game-wrapper .modal-title {
          color: #ffd700;
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
          text-shadow: 0 0 20px #ffd700;
          letter-spacing: 2px;
        }

        #sonkuro-drift-game-wrapper .modal-subtitle {
          color: #ff0066;
          text-align: center;
          font-size: 14px;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        #sonkuro-drift-game-wrapper .question-text {
          color: white;
          font-size: 18px;
          text-align: center;
          margin: 15px 0;
          line-height: 1.8;
          background: rgba(0, 0, 0, 0.3);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        #sonkuro-drift-game-wrapper .blank-space {
          display: inline-block;
          min-width: 100px;
          border-bottom: 3px dashed #00ffff;
          color: #00ffff;
          font-weight: bold;
          padding: 0 8px;
          animation: blankBlink 1s infinite;
        }

        @keyframes blankBlink {
          0%, 100% { border-color: #00ffff; }
          50% { border-color: transparent; }
        }

        #sonkuro-drift-game-wrapper .answers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        #sonkuro-drift-game-wrapper .answer-btn {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 2px solid #00ffff;
          color: white;
          padding: 12px;
          font-size: 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 1px;
        }

        #sonkuro-drift-game-wrapper .answer-btn:hover {
          border-color: #ffd700;
          background: rgba(0, 255, 255, 0.1);
        }

        #sonkuro-drift-game-wrapper .correct-answer {
          background: linear-gradient(135deg, #00b894, #00cec9) !important;
          border-color: #00ff88 !important;
          animation: correctPulse 0.5s;
        }

        #sonkuro-drift-game-wrapper .wrong-answer {
          background: linear-gradient(135deg, #d63031, #e17055) !important;
          border-color: #ff0000 !important;
          animation: shake 0.5s;
        }

        @keyframes correctPulse {
          0%, 100% { box-shadow: 0 0 20px #00ff88; }
          50% { box-shadow: 0 0 50px #00ff88; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        #sonkuro-drift-game-wrapper .arrange-container {
          margin-top: 20px;
        }

        #sonkuro-drift-game-wrapper .arrange-label {
          color: #aaa;
          font-size: 13px;
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        #sonkuro-drift-game-wrapper .word-bank {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          padding: 15px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          margin-bottom: 15px;
          min-height: 50px;
        }

        #sonkuro-drift-game-wrapper .arrange-word {
          background: #1a1a3e;
          border: 2px solid #ffd700;
          color: white;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        #sonkuro-drift-game-wrapper .arrange-word:hover {
          background: #2a2a5e;
          border-color: #fff;
          transform: translateY(-2px);
        }

        #sonkuro-drift-game-wrapper .arrange-word.used {
          opacity: 0.3;
          pointer-events: none;
          border-color: #555;
          color: #666;
        }

        #sonkuro-drift-game-wrapper .answer-bank {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          padding: 15px;
          background: rgba(0, 255, 136, 0.08);
          border-radius: 12px;
          border: 2px dashed #00ff88;
          margin-bottom: 15px;
          min-height: 50px;
        }

        #sonkuro-drift-game-wrapper .answer-bank .arrange-word {
          background: #0f3460;
          border: 2px solid #00ff88;
          color: white;
          animation: popIn 0.3s ease-out;
        }

        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        #sonkuro-drift-game-wrapper .submit-arrange-btn {
          display: block;
          width: 100%;
          background: linear-gradient(135deg, #ffd700, #ffaa00);
          border: none;
          color: #1a1a2e;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          letter-spacing: 1px;
          transition: all 0.3s;
          margin-top: 15px;
        }

        #sonkuro-drift-game-wrapper .submit-arrange-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        #sonkuro-drift-game-wrapper .clear-btn {
          display: block;
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 20px;
          font-size: 12px;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 1px;
          transition: all 0.3s;
          margin-top: 8px;
        }

        #sonkuro-drift-game-wrapper #gameOverScreen,
        #sonkuro-drift-game-wrapper #victoryScreen {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 150;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
        }

        #sonkuro-drift-game-wrapper #gameOverScreen.show,
        #sonkuro-drift-game-wrapper #victoryScreen.show {
          display: flex;
        }

        #sonkuro-drift-game-wrapper .game-over-text {
          color: #ff0066;
          font-size: 48px;
          font-weight: bold;
          text-shadow: 0 0 30px #ff0066;
          margin-bottom: 15px;
          text-align: center;
        }

        #sonkuro-drift-game-wrapper .victory-text {
          color: #ffd700;
          font-size: 56px;
          font-weight: bold;
          text-shadow: 0 0 40px #ffd700;
          margin-bottom: 15px;
          text-align: center;
          animation: victoryPulse 0.8s infinite;
        }

        @keyframes victoryPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        #sonkuro-drift-game-wrapper .victory-subtitle {
          color: #00ffff;
          font-size: 20px;
          text-align: center;
          margin-bottom: 20px;
          text-shadow: 0 0 20px #00ffff;
        }

        #sonkuro-drift-game-wrapper .restart-btn,
        #sonkuro-drift-game-wrapper .victory-btn,
        #sonkuro-drift-game-wrapper .menu-btn {
          background: linear-gradient(135deg, #ff0066, #ff6b6b);
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 2px;
          margin: 8px;
        }

        #sonkuro-drift-game-wrapper .victory-btn {
          background: linear-gradient(135deg, #ffd700, #ffaa00);
          color: #1a1a2e;
          font-weight: bold;
        }

        #sonkuro-drift-game-wrapper .menu-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        #sonkuro-drift-game-wrapper .final-stats {
          color: white;
          font-size: 18px;
          margin: 8px 0;
          text-align: center;
        }

        #sonkuro-drift-game-wrapper .final-score {
          color: #ffd700;
          font-weight: bold;
        }

        #sonkuro-drift-game-wrapper .final-correct {
          color: #00ff88;
          font-weight: bold;
          text-shadow: 0 0 10px #00ff88;
        }

        #sonkuro-drift-game-wrapper .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confettiFall linear forwards;
          pointer-events: none;
        }

        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {activeLevel === null ? (
        // Level Selection Screen
        <div id="levelSelectScreen">
          <div className="absolute top-4 left-4">
            <button
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-black tracking-widest uppercase border border-white/20 cursor-pointer transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Thoát</span>
            </button>
          </div>

          <div className="text-center mb-8 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-center uppercase" style={{
              background: "linear-gradient(45deg, #ff0066, #ff6b6b, #ffd700, #00ffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255, 0, 102, 0.6))"
            }}>
              SONKURO DRIFT
            </h1>
            <p className="text-[#00ffff] text-sm sm:text-lg tracking-widest mt-2 uppercase font-black" style={{ textShadow: "0 0 15px #00ffff" }}>
              🏎️ CHỌN MÀN CHƠI · NÍ HỐNG GỒ
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center max-w-4xl w-full px-6">
            {Array.from({ length: totalLevels }).map((_, idx) => {
              const lvl = idx + 1;
              const isLocked = lvl > unlockedLevels;
              const stars = levelStars[lvl] || 0;

              return (
                <button
                  key={lvl}
                  onClick={() => !isLocked && startLevel(lvl)}
                  disabled={isLocked}
                  className={`w-36 h-48 sm:w-44 sm:h-56 bg-gradient-to-br from-[#1a1a3e] to-[#16213e] rounded-2xl flex flex-col items-center justify-center border-2 transition-all relative overflow-hidden shadow-2xl group ${
                    isLocked 
                      ? "opacity-50 cursor-not-allowed border-white/10 grayscale" 
                      : "border-white/10 hover:border-[#00ffff] hover:-translate-y-2 hover:shadow-[#00ffff]/20"
                  }`}
                >
                  <div className="text-4xl sm:text-5xl mb-2">{levelThemes[idx]}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 font-black">MÀN {lvl}</div>
                  <div className="text-xs font-extrabold text-[#ffd700] mt-1 text-center px-2">{levelNames[idx]}</div>
                  
                  {/* Stars Display */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map((starIdx) => (
                      <span
                        key={starIdx}
                        className={`text-lg ${starIdx <= stars ? "text-[#ffd700] animate-pulse" : "text-gray-700"}`}
                        style={starIdx <= stars ? { textShadow: "0 0 10px #ffd700" } : {}}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {isLocked && <Lock className="w-6 h-6 text-white/40 mt-3" />}
                  
                  <div className={`text-[10px] font-black mt-3 uppercase tracking-wider ${isLocked ? "text-red-500" : (stars > 0 ? "text-[#00ff88]" : "text-sky-400")}`}>
                    {isLocked ? "KHÓA" : (stars > 0 ? "HOÀN THÀNH" : "SẴN SÀNG")}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center text-white/40 text-[11px] font-bold uppercase tracking-widest mt-8">
            Tất cả các màn đã được mở khóa để bạn rèn luyện phản xạ!
          </div>
        </div>
      ) : (
        // Active Game Board
        <>
          <div id="ui">
            <div className="text-xs text-[#ffd700] tracking-[3px] font-black uppercase">SONKURO DRIFT - NÍ HỐNG GỒ</div>
            <div>Tốc độ: <span id="speed">0</span> km/h</div>
            <div id="score" className="font-black">Điểm: 0</div>
            <div id="correctAnswers" className="font-extrabold">Đúng: 0/{30}</div>
            <div id="goalText" className="font-bold">🏁 Mục tiêu: 30/30</div>
            <div id="progressBar"><div id="progressFill"></div></div>
          </div>
          
          <div id="drift-indicator">ドリフト!</div>
          
          <button id="backToMenuBtn" onClick={handleBackToMenu} className="font-black">🏠 Menu</button>

          {/* Desktop/Web Controls Guide Overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden md:flex flex-col items-center gap-1 text-center bg-black/40 backdrop-blur-xs border border-white/10 rounded-full px-4 py-1">
            <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">
              Phím: ⬆️ Tăng tốc | ⬇️ Phanh | ⬅️ ➡️ Lái xe | [Space] Drift cực ngầu!
            </p>
          </div>

          {/* Mobile Joystick & Buttons */}
          <div id="mobileControls">
            <div className="control-group">
              <button className="control-btn" id="btnLeft">⬅️</button>
              <button className="control-btn up-btn" id="btnUp">⬆️</button>
            </div>
            
            <button className="control-btn drift-btn shadow-[0_0_15px_rgba(255,0,102,0.4)]" id="btnDrift">DRIFT</button>
            
            <div className="control-group">
              <button className="control-btn" id="btnDown">⬇️</button>
              <button className="control-btn" id="btnRight">➡️</button>
            </div>
          </div>

          <canvas id="gameCanvas" className="w-full h-full block bg-[#0c0c1e]" />

          {/* Conflict/Crash Question Overlay Modal */}
          <div id="questionModal">
            <div className="modal-content border-2 border-[#ff0066] shadow-[0_0_40px_rgba(255,0,102,0.4)]">
              <div className="modal-title flex items-center justify-center gap-2">
                <span>⚠️ 衝突！Va chạm!</span>
              </div>
              <div className="modal-subtitle font-bold uppercase tracking-wider text-center mt-1">Trả lời đúng ngữ pháp để bứt tốc vượt đối thủ!</div>
              <div id="questionDisplay" className="question-text font-medium select-text"></div>
              <div id="answersContainer" className="answers-grid"></div>
              <div id="arrangeContainer" style={{ display: "none" }}></div>
            </div>
          </div>

          {/* Game Over Screen */}
          <div id="gameOverScreen">
            <div className="game-over-text tracking-widest font-black uppercase flex flex-col items-center gap-2">
              <span>GAME OVER</span>
              <span className="text-sm tracking-widest text-[#ff0066]/70 mt-1 font-bold">NGƯƠI LƯỜI BIẾNG LẮM! THẦY RẤT PHẪN NỘ!</span>
            </div>
            <div className="final-stats text-lg">Điểm số: <span className="final-score" id="finalScore">0</span></div>
            <div className="final-stats text-lg">Trả lời đúng: <span className="final-correct" id="finalCorrect">0</span>/30</div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="restart-btn hover:scale-105 transition font-black uppercase tracking-wider" id="restartBtn">🔄 Chơi lại</button>
              <button className="menu-btn hover:scale-105 transition font-black uppercase tracking-wider" id="menuFromGameOverBtn">🏠 Về Menu</button>
            </div>
          </div>

          {/* Victory Screen */}
          <div id="victoryScreen">
            <div className="victory-text tracking-widest font-black uppercase">🎉 ゴール! 🎉</div>
            <div className="victory-subtitle uppercase font-black text-center tracking-widest">VỀ ĐÍCH AN TOÀN! SUGOI NE!</div>
            <div className="final-stats text-lg">Tổng điểm: <span className="final-score" id="victoryScore">0</span></div>
            <div className="final-stats text-lg">Kết quả: <span className="final-correct">30/30</span> câu đúng</div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="victory-btn hover:scale-105 transition font-black uppercase tracking-wider shadow-lg shadow-yellow-500/30" id="victoryRestartBtn">🔄 Chơi lại</button>
              <button className="menu-btn hover:scale-105 transition font-black uppercase tracking-wider" id="menuFromVictoryBtn">🏠 Về Menu</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
