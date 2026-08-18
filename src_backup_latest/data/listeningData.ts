export interface ListeningKeyword {
  word: string;
  reading: string;
  meaning: string;
}

export interface ListeningLine {
  id: string;
  speaker: string;
  japanese: string;
  furigana: string;
  romaji: string;
  vietnamese: string;
  audioUrl?: string;
  startTime?: number; // timestamp in seconds for video sync
  endTime?: number;   // timestamp in seconds for video sync
  keywords?: ListeningKeyword[];
}

export interface ListeningEpisode {
  id: string;
  title: string;
  level: "N5" | "N4" | "N3";
  category: string;
  icon: string;
  durationEst: string;
  description: string;
  youtubeId?: string;
  lines: ListeningLine[];
  summaryKeywords: ListeningKeyword[];
}

export const PRESET_LISTENING_EPISODES: ListeningEpisode[] = [
  // --- FEATURED YOUTUBE EPISODE 3 ---
  {
    id: "youtube-Tvsa7Q5x3Zw",
    title: "こんな修理屋さんは嫌だ (Tiệm Sửa Xe Bất Ổn)",
    level: "N3",
    category: "Giao Tiếp Thực Tế",
    icon: "🎭",
    durationEst: "1 phút",
    description: "Hài kịch Kusesugo tình huống tiệm sửa chữa hài hước, rèn luyện phản xạ nghe hiểu văn nói và ngữ điệu tự nhiên.",
    youtubeId: "Tvsa7Q5x3Zw",
    lines: [
      {
        id: "yt-tvs-1",
        speaker: "Fukuda (Khách hàng)",
        japanese: "これちょっと修理したいんですけど",
        furigana: "これ ちょっと しゅうり したいんですけど",
        romaji: "Kore chotto shuuri shitain desukedo",
        vietnamese: "Tôi muốn sửa cái này một chút...",
        startTime: 50,
        endTime: 54,
        keywords: [
          { word: "修理", reading: "しゅうり", meaning: "Sửa chữa" },
          { word: "〜たいんですけど", reading: "〜たいんですけど", meaning: "Muốn... nhưng mà (nói ngập ngừng, nhờ vả)" }
        ]
      },
      {
        id: "yt-tvs-2",
        speaker: "Fukuda (Khách hàng)",
        japanese: "すいません",
        furigana: "すいません",
        romaji: "Suimasen",
        vietnamese: "Xin lỗi...",
        startTime: 54,
        endTime: 56,
        keywords: [
          { word: "すいません", reading: "すいません", meaning: "Xin lỗi / Cho hỏi" }
        ]
      },
      {
        id: "yt-tvs-3",
        speaker: "Kanade (Nhân viên)",
        japanese: "あなたのターンですよ？",
        furigana: "あなたの ターン ですよ？",
        romaji: "Anata no taan desu yo?",
        vietnamese: "Đến lượt của chị rồi đấy?",
        startTime: 56,
        endTime: 58,
        keywords: [
          { word: "ターン", reading: "たーん", meaning: "Lượt (trong hội thoại / trò chơi)" }
        ]
      },
      {
        id: "yt-tvs-4",
        speaker: "Fukuda (Khách hàng)",
        japanese: "ターン？",
        furigana: "ターン？",
        romaji: "Taan?",
        vietnamese: "Lượt?",
        startTime: 58,
        endTime: 59,
        keywords: [
          { word: "ターン", reading: "たーん", meaning: "Lượt" }
        ]
      },
      {
        id: "yt-tvs-5",
        speaker: "Kanade (Nhân viên)",
        japanese: "あなた待ちでしょ？",
        furigana: "あなた まち でしょ？",
        romaji: "Anata machi desho?",
        vietnamese: "Tôi đang đợi chị mà?",
        startTime: 59,
        endTime: 61,
        keywords: [
          { word: "待ち", reading: "まち", meaning: "Đang đợi (ai đó)" }
        ]
      },
      {
        id: "yt-tvs-6",
        speaker: "Kanade (Nhân viên)",
        japanese: "『修理したいんですけど』……何ですか？",
        furigana: "『しゅうり したいんですけど』…… なんですか？",
        romaji: "'Shuuri shitain desukedo'...... Nan desu ka?",
        vietnamese: "Chị bảo 'Tôi muốn sửa cái này'...... rồi sao nữa?",
        startTime: 61,
        endTime: 63,
        keywords: [
          { word: "何ですか", reading: "なんですか", meaning: "Là sao / Gì cơ" }
        ]
      },
      {
        id: "yt-tvs-7",
        speaker: "Fukuda (Khách hàng)",
        japanese: "あ、はい。あの、修理したいんです",
        furigana: "あ、はい。あの、しゅうり したいんです",
        romaji: "A, hai. Ano, shuuri shitain desu",
        vietnamese: "À vâng. À thì, tôi muốn sửa...",
        startTime: 64,
        endTime: 66,
        keywords: [
          { word: "修理したい", reading: "しゅうりしたい", meaning: "Muốn sửa chữa" }
        ]
      },
      {
        id: "yt-tvs-8",
        speaker: "Kanade (Nhân viên)",
        japanese: "『修理したいんですけど修理できないんです』だったら文法的に分かるんだけど",
        furigana: "『しゅうり したいんですけど しゅうり できないんです』だったら ぶんぽうてきに わかるんだけど",
        romaji: "'Shuuri shitain desukedo shuuri dekinai n desu' dattara bumpouteki ni wakaru n dakedo",
        vietnamese: "Nếu chị nói 'Tôi muốn sửa nhưng không sửa được' thì về mặt ngữ pháp tôi còn hiểu được...",
        startTime: 66,
        endTime: 70,
        keywords: [
          { word: "文法的", reading: "ぶんぽうてき", meaning: "Về mặt ngữ pháp" },
          { word: "分かる", reading: "わかる", meaning: "Hiểu được" }
        ]
      },
      {
        id: "yt-tvs-9",
        speaker: "Fukuda (Khách hàng)",
        japanese: "ああ、いや……どうしたらいいかな。あの、ちょっと修理したくて……あ、すいません",
        furigana: "ああ、いや…… どうしたら いいかな。あの、ちょっと しゅうり したくて…… あ、すいません",
        romaji: "Aa, iya...... dou shitara ii kana. Ano, chotto shuuri shitakute...... a, suimasen",
        vietnamese: "À không... vậy giờ phải làm sao nhỉ. Tôi muốn sửa một chút... à xin lỗi.",
        startTime: 71,
        endTime: 75,
        keywords: [
          { word: "どうしたらいいかな", reading: "どうしたらいいかな", meaning: "Phải làm sao bây giờ nhỉ" }
        ]
      },
      {
        id: "yt-tvs-10",
        speaker: "Kanade (Nhân viên)",
        japanese: "だから、あなたのターン！",
        furigana: "だから、あなたの ターン！",
        romaji: "Dakara, anata no taan!",
        vietnamese: "Đã bảo là đến lượt của chị rồi mà!",
        startTime: 76,
        endTime: 78,
        keywords: [
          { word: "だから", reading: "だから", meaning: "Đã bảo là / Cho nên" }
        ]
      },
      {
        id: "yt-tvs-11",
        speaker: "Fukuda (Khách hàng)",
        japanese: "私のターン？",
        furigana: "わたしの ターン？",
        romaji: "Watashi no taan?",
        vietnamese: "Lượt của tôi?",
        startTime: 78,
        endTime: 80,
        keywords: [
          { word: "私", reading: "わたし", meaning: "Tôi" }
        ]
      },
      {
        id: "yt-tvs-12",
        speaker: "Fukuda (Khách hàng)",
        japanese: "時間ないんですよ。ちょっとこれ修理したいんですけど、どうしたらいいですか？",
        furigana: "じかん ないんですよ。ちょっと これ しゅうり したいんですけど、どうしたら いいですか？",
        romaji: "Jikan nain desu yo. Chotto kore shuuri shitain desukedo, dou shitara ii desu ka?",
        vietnamese: "Tôi không có nhiều thời gian đâu. Tôi muốn sửa cái này một chút thì phải làm thế nào ạ?",
        startTime: 80,
        endTime: 84,
        keywords: [
          { word: "時間", reading: "じかん", meaning: "Thời gian" },
          { word: "どうしたらいいですか", reading: "どうしたらいいですか", meaning: "Nên làm thế nào ạ" }
        ]
      },
      {
        id: "yt-tvs-13",
        speaker: "Kanade (Nhân viên)",
        japanese: "『ちょっと修理したい』んですか？ ちょっとでいいの？ 全部直さなくていいってこと？",
        furigana: "『ちょっと しゅうり したい』んですか？ ちょっとで いいの？ ぜんぶ なおさなくて いいってこと？",
        romaji: "'Chotto shuuri shitai' n desu ka? Chotto de ii no? Zembu naosanakute ii tte koto?",
        vietnamese: "'Sửa một chút' là sao? Sửa một chút thôi là được à? Ý là không cần sửa hết toàn bộ hay sao?",
        startTime: 84,
        endTime: 89,
        keywords: [
          { word: "全部", reading: "ぜんぶ", meaning: "Toàn bộ" },
          { word: "直す", reading: "なおす", meaning: "Sửa chữa" }
        ]
      },
      {
        id: "yt-tvs-14",
        speaker: "Kanade (Nhân viên)",
        japanese: "あと『修理したい』って何？ あなたがしたいならあなたがすればいいじゃないの？",
        furigana: "あと『しゅうり したい』って なに？ あなたが したいなら あなたが すれば いいじゃないの？",
        romaji: "Ato 'shuuri shitai' tte nani? Anata ga shitai nara anata ga sureba ii ja nai no?",
        vietnamese: "Với lại 'muốn sửa' là sao? Nếu bản thân chị muốn làm thì chị tự đi mà làm chứ?",
        startTime: 90,
        endTime: 94,
        keywords: [
          { word: "〜ばいいじゃない", reading: "〜ばいいじゃない", meaning: "Chẳng phải... là được rồi sao" }
        ]
      },
      {
        id: "yt-tvs-15",
        speaker: "Kanade (Nhân viên)",
        japanese: "『修理してほしい』でしょ？",
        furigana: "『しゅうり してほしい』でしょ？",
        romaji: "'Shuuri shite hoshii' desho?",
        vietnamese: "Phải nói là 'nhờ sửa giúp' chứ?",
        startTime: 94,
        endTime: 96,
        keywords: [
          { word: "〜てほしい", reading: "〜てほしい", meaning: "Muốn người khác làm giúp" }
        ]
      },
      {
        id: "yt-tvs-16",
        speaker: "Kanade (Nhân viên)",
        japanese: "あと『どうしたらいいですか』って何？ どうしたらいいか分かってるからここに持ってきてるんじゃないの？",
        furigana: "あと『どうしたら いいですか』って なに？ どうしたら いいか わかってるから ここに もってきてるんじゃないの？",
        romaji: "Ato 'dou shitara ii desu ka' tte nani? Dou shitara ii ka wakatteru kara koko ni motte kiterun ja nai no?",
        vietnamese: "Lại còn hỏi 'phải làm thế nào' là sao? Chẳng phải vì biết phải làm gì nên chị mới mang đến đây sao?",
        startTime: 97,
        endTime: 102,
        keywords: [
          { word: "持ってくる", reading: "もってくる", meaning: "Mang đến" }
        ]
      },
      {
        id: "yt-tvs-17",
        speaker: "Khách hàng (Fukuda)",
        japanese: "旦那にも同じ顔させたことあります……",
        furigana: "だんなにも おなじ かお させたこと あります……",
        romaji: "Danna ni mo onaji kao saseta koto arimasu......",
        vietnamese: "Tôi từng làm cho chồng mình lộ ra vẻ mặt y hệt thế này rồi đấy...",
        startTime: 103,
        endTime: 106,
        keywords: [
          { word: "旦那", reading: "だんな", meaning: "Chồng" },
          { word: "同じ顔", reading: "おなじかお", meaning: "Vẻ mặt y hệt" }
        ]
      },
      {
        id: "yt-tvs-18",
        speaker: "Kanade (Nhân viên)",
        japanese: "でしょうね！ 虚無なんですよ！",
        furigana: "でしょうね！ きょむ なんですよ！",
        romaji: "Deshou ne! Kyomu nan desu yo!",
        vietnamese: "Chắc chắn rồi! Cảm giác trống rỗng vô hồn luôn ấy chứ!",
        startTime: 106,
        endTime: 108,
        keywords: [
          { word: "虚無", reading: "きょむ", meaning: "Hư vô / Trống rỗng, bất lực" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "修理", reading: "しゅうり", meaning: "Sửa chữa" },
      { word: "ターン", reading: "たーん", meaning: "Lượt nói / Lượt" },
      { word: "文法的", reading: "ぶんぽうてき", meaning: "Thuộc về ngữ pháp" },
      { word: "虚無", reading: "きょむ", meaning: "Hư vô / Trống rỗng, bất lực" },
      { word: "旦那", reading: "だんな", meaning: "Chồng" },
      { word: "直す", reading: "なおす", meaning: "Sửa chữa" }
    ]
  },
  // --- FEATURED YOUTUBE EPISODE 2 ---
  {
    id: "youtube-rX55rRxdpR0",
    title: "告白 (Lời Tỏ Tình)",
    level: "N5",
    category: "Giao Tiếp Thực Tế",
    icon: "💖",
    durationEst: "14 giây",
    description: "",
    youtubeId: "rX55rRxdpR0",
    lines: [
      {
        id: "yt-kokuhaku-1",
        speaker: "Kingo",
        japanese: "うん、これからもずっと一緒にいたいと思ったので、え…",
        furigana: "うん、これからも ずっと いっしょに いたいと おもったので、え…",
        romaji: "Un, kore kara mo zutto issho ni itai to omotta no de, e...",
        vietnamese: "Ừm, vì anh nghĩ rằng từ giờ về sau vẫn muốn luôn ở bên cạnh em nên là, à...",
        startTime: 0,
        endTime: 5,
        keywords: [
          { word: "ずっと", reading: "ずっと", meaning: "Suốt / Mãi mãi" },
          { word: "一緒に", reading: "いっしょに", meaning: "Cùng nhau / Ở bên cạnh" },
          { word: "思う", reading: "おもう", meaning: "Nghĩ / Cảm thấy" }
        ]
      },
      {
        id: "yt-kokuhaku-2",
        speaker: "Kingo",
        japanese: "お… こんな僕でよかったら付き合ってください。",
        furigana: "お… こんな ぼくで よかったら つきあってください。",
        romaji: "O... Konna boku de yokattara tsukiatte kudasai.",
        vietnamese: "Ồ… Nếu em không chê một người như anh thì hãy hẹn hò với anh nhé.",
        startTime: 5,
        endTime: 8,
        keywords: [
          { word: "僕でよかったら", reading: "ぼくでよかったら", meaning: "Nếu không chê người như anh" },
          { word: "付き合う", reading: "つきあう", meaning: "Hẹn hò / Yêu nhau" }
        ]
      },
      {
        id: "yt-kokuhaku-3",
        speaker: "Rinon",
        japanese: "え、お願いします！",
        furigana: "え、おねがいします！",
        romaji: "E, onegaishimasu!",
        vietnamese: "Ơ, vâng em đồng ý ạ!",
        startTime: 9,
        endTime: 12,
        keywords: [
          { word: "お願いします", reading: "おねがいします", meaning: "Em đồng ý / Xin nhờ cậy anh" }
        ]
      },
      {
        id: "yt-4",
        speaker: "Rinon",
        japanese: "本当に？",
        furigana: "ほんとうに？",
        romaji: "Hontou ni?",
        vietnamese: "Thật sao ạ?",
        startTime: 12,
        endTime: 14,
        keywords: [
          { word: "本当に", reading: "ほんとうに", meaning: "Thật sao? / Thật sự" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "告白", reading: "こくはく", meaning: "Tỏ tình / Thổ lộ tình cảm" },
      { word: "付き合う", reading: "つきあう", meaning: "Hẹn hò / Yêu nhau" },
      { word: "一緒に", reading: "いっしょに", meaning: "Cùng nhau" },
      { word: "ずっと", reading: "ずっと", meaning: "Mãi mãi / Luôn luôn" },
      { word: "本当に", reading: "ほんとうに", meaning: "Thật sự / Thật sao" }
    ]
  },
  // --- FEATURED YOUTUBE EPISODE 1 ---
  {
    id: "youtube-5ljslFP3yXE",
    title: "Cãi Nhau Vợ Chồng Đời Thực",
    level: "N4",
    category: "Giao Tiếp Thực Tế",
    icon: "🎬",
    durationEst: "1 phút 20 giây",
    description: "",
    youtubeId: "5ljslFP3yXE",
    lines: [
      {
        id: "yt-1",
        speaker: "妻 (Người vợ)",
        japanese: "あんた分かってんの？",
        furigana: "あんた わかってんの？",
        romaji: "Anta wakatten no?",
        vietnamese: "Anh có hiểu không vậy?",
        startTime: 1,
        endTime: 2,
        keywords: [
          { word: "分かってんの", reading: "わかってんの", meaning: "Có hiểu không (văn nói)" }
        ]
      },
      {
        id: "yt-2",
        speaker: "妻 (Người vợ)",
        japanese: "養育費に家のローン、車の維持費で大変なの。",
        furigana: "よういくひに いえの ろーん、くるまの いじひで たいへんなの。",
        romaji: "Youikuhi ni ie no roon, kuruma no ijihi de taihen na no.",
        vietnamese: "Tiền nuôi con, tiền trả góp nhà, rồi chi phí nuôi xe đang rất chật vật đấy.",
        startTime: 3,
        endTime: 5,
        keywords: [
          { word: "養育費", reading: "よういくひ", meaning: "Tiền nuôi con / chi phí nuôi dưỡng" },
          { word: "維持費", reading: "いじひ", meaning: "Phí duy trì / bảo dưỡng" }
        ]
      },
      {
        id: "yt-3",
        speaker: "妻 (Người vợ)",
        japanese: "うちにはゲームに使うお金なんてないの！",
        furigana: "うちには げーむに つかう おかねなんて ないの！",
        romaji: "Uchi ni wa geemu ni tsukau okane nante nai no!",
        vietnamese: "Nhà mình làm gì có tiền để tiêu vào game chứ!",
        startTime: 6,
        endTime: 7,
        keywords: [
          { word: "〜なんて", reading: "〜なんて", meaning: "Cái thứ như là... (thái độ bất bình)" }
        ]
      },
      {
        id: "yt-4",
        speaker: "夫 (Người chồng)",
        japanese: "そんな訳ねえだろ。",
        furigana: "そんな わけねえだろ。",
        romaji: "Sonna wake nee daro.",
        vietnamese: "Làm gì có chuyện đó.",
        startTime: 8,
        endTime: 9,
        keywords: [
          { word: "訳ねえ", reading: "わけねえ", meaning: "Làm gì có chuyện (訳がない)" }
        ]
      },
      {
        id: "yt-5",
        speaker: "妻 (Người vợ)",
        japanese: "昇進はどうなった？",
        furigana: "しょうしんは どうなった？",
        romaji: "Shoushin wa dou natta?",
        vietnamese: "Chuyện thăng chức thế nào rồi?",
        startTime: 9,
        endTime: 10,
        keywords: [
          { word: "昇進", reading: "しょうしん", meaning: "Thăng chức / thăng tiến" }
        ]
      },
      {
        id: "yt-6",
        speaker: "夫 (Người chồng)",
        japanese: "今回は…",
        furigana: "こんかいは…",
        romaji: "Konkai wa...",
        vietnamese: "Lần này thì...",
        startTime: 11,
        endTime: 12,
        keywords: [
          { word: "今回", reading: "こんかい", meaning: "Lần này" }
        ]
      },
      {
        id: "yt-7",
        speaker: "妻 (Người vợ)",
        japanese: "言ったよね？分かったらメールしてって。",
        furigana: "いったよね？わかったら めーるしてって。",
        romaji: "Itta yo ne? Wakattara meeru shitette.",
        vietnamese: "Em đã dặn rồi đúng không? Có kết quả thì phải nhắn tin/báo cho em chứ.",
        startTime: 12,
        endTime: 14,
        keywords: [
          { word: "メールしてって", reading: "めーるしてって", meaning: "Bảo nhắn tin (lời dặn)" }
        ]
      },
      {
        id: "yt-8",
        speaker: "夫 (Người chồng)",
        japanese: "てか、今ゲームの話…",
        furigana: "てか、いま げーむの はなし…",
        romaji: "Teka, ima geemu no hanashi...",
        vietnamese: "Mà này, đang nói chuyện game cơ mà...",
        startTime: 14,
        endTime: 15,
        keywords: [
          { word: "てか", reading: "てか", meaning: "Mà nói đúng ra / Cơ mà (と言うか)" }
        ]
      },
      {
        id: "yt-9",
        speaker: "妻 (Người vợ)",
        japanese: "そんなんだから出世できないんでしょ！",
        furigana: "そんなんだから しゅっせ できないんでしょ！",
        romaji: "Sonnan dakara shusse dekinai n desho!",
        vietnamese: "Anh cứ như thế nên mới không thăng tiến được đấy!",
        startTime: 15,
        endTime: 16,
        keywords: [
          { word: "出世", reading: "しゅっせ", meaning: "Thăng tiến / Thành đạt" }
        ]
      },
      {
        id: "yt-10",
        speaker: "夫 (Người chồng)",
        japanese: "俺の話聞けよ！",
        furigana: "おれの はなし きけよ！",
        romaji: "Ore no hanashi kike yo!",
        vietnamese: "Hãy nghe anh nói đã chứ!",
        startTime: 17,
        endTime: 18,
        keywords: [
          { word: "聞けよ", reading: "きけよ", meaning: "Nghe đi chứ (mệnh lệnh)" }
        ]
      },
      {
        id: "yt-11",
        speaker: "夫 (Người chồng)",
        japanese: "最後まで聞けよ！",
        furigana: "さいごまで きけよ！",
        romaji: "Saigo made kike yo!",
        vietnamese: "Nghe cho hết câu đi chứ!",
        startTime: 20,
        endTime: 22,
        keywords: [
          { word: "最後まで", reading: "さいごまで", meaning: "Đến cuối cùng / Hết câu" }
        ]
      },
      {
        id: "yt-12",
        speaker: "夫 (Người chồng)",
        japanese: "いいか？",
        furigana: "いいか？",
        romaji: "Ii ka?",
        vietnamese: "Nghe này!",
        startTime: 24,
        endTime: 25,
        keywords: [
          { word: "いいか", reading: "いいか", meaning: "Nghe rõ đây / Được chưa" }
        ]
      },
      {
        id: "yt-13",
        speaker: "夫 (Người chồng)",
        japanese: "俺が生活費使ったか？",
        furigana: "おれが せいかつひ つかったか？",
        romaji: "Ore ga seikatsuhi tsukatta ka?",
        vietnamese: "Anh có đụng vào tiền sinh hoạt phí không?",
        startTime: 25,
        endTime: 27,
        keywords: [
          { word: "生活費", reading: "せいかつひ", meaning: "Tiền sinh hoạt phí" }
        ]
      },
      {
        id: "yt-14",
        speaker: "夫 (Người chồng)",
        japanese: "小遣い上げてくれって頼んだかよ？",
        furigana: "こづかい あげてくれって たのんだかよ？",
        romaji: "Kozukai agete kure tte tanonda ka yo?",
        vietnamese: "Anh có đòi tăng thêm tiền tiêu vặt không hả?",
        startTime: 28,
        endTime: 29,
        keywords: [
          { word: "小遣い", reading: "こづかい", meaning: "Tiền tiêu vặt" }
        ]
      },
      {
        id: "yt-15",
        speaker: "夫 (Người chồng)",
        japanese: "ゲームは昼飯ケチって小遣い貯めて買ったんだよ。",
        furigana: "げーむは ひるめし けちって こづかい ためて かったんだよ。",
        romaji: "Geemu wa hirumeshi kechitte kozukai tamete katta n da yo.",
        vietnamese: "Game là anh nhịn bớt tiền ăn trưa, dành dụm tiền tiêu vặt để mua đấy.",
        startTime: 31,
        endTime: 33,
        keywords: [
          { word: "ケチる", reading: "けちる", meaning: "Hà tiện / Bóp mồm bóp miệng" },
          { word: "貯める", reading: "ためる", meaning: "Dành dụm / Tích cóp" }
        ]
      },
      {
        id: "yt-16",
        speaker: "夫 (Người chồng)",
        japanese: "それのどこが悪いんだよ？",
        furigana: "それの どこが わるいんだよ？",
        romaji: "Sore no doko ga warui n da yo?",
        vietnamese: "Như thế thì có gì sai chứ?",
        startTime: 33,
        endTime: 34,
        keywords: [
          { word: "どこが悪い", reading: "どこがわるい", meaning: "Sai ở chỗ nào" }
        ]
      },
      {
        id: "yt-17",
        speaker: "妻 (Người vợ)",
        japanese: "ゲームやる暇があったら家の事をやれって言ってるの！",
        furigana: "げーむ やる ひまが あったら いえの ことを やれって いってるの！",
        romaji: "Geemu yaru hima ga attara ie no koto o yare tte itteru no!",
        vietnamese: "Em bảo là nếu có thời gian rảnh chơi game thì hãy làm việc nhà đi!",
        startTime: 35,
        endTime: 36,
        keywords: [
          { word: "暇", reading: "ひま", meaning: "Rảnh rỗi" },
          { word: "家の事", reading: "いえのこと", meaning: "Việc nhà" }
        ]
      },
      {
        id: "yt-18",
        speaker: "夫 (Người chồng)",
        japanese: "だったら最初からそう言えよ。",
        furigana: "だったら さいしょから そう いえよ。",
        romaji: "Dattara saisho kara sou ie yo.",
        vietnamese: "Thế thì ngay từ đầu cứ nói thẳng ra như vậy đi.",
        startTime: 37,
        endTime: 38,
        keywords: [
          { word: "最初から", reading: "さいしょから", meaning: "Ngay từ đầu" }
        ]
      },
      {
        id: "yt-19",
        speaker: "妻 (Người vợ)",
        japanese: "それくらい分かるでしょ！？",
        furigana: "それくらい わかるでしょ！？",
        romaji: "Sore kurai wakaru desho!?",
        vietnamese: "Chuyện như thế anh cũng phải tự hiểu chứ!?",
        startTime: 38,
        endTime: 39,
        keywords: [
          { word: "それくらい", reading: "それくらい", meaning: "Chừng đó / Mức như thế" }
        ]
      },
      {
        id: "yt-20",
        speaker: "夫 (Người chồng)",
        japanese: "分かんねえよ！",
        furigana: "わかんねえよ！",
        romaji: "Wakannee yo!",
        vietnamese: "Ai mà hiểu được!",
        startTime: 39,
        endTime: 40,
        keywords: [
          { word: "分かんねえ", reading: "わかんねえ", meaning: "Không thể hiểu được (văn nói)" }
        ]
      },
      {
        id: "yt-21",
        speaker: "妻 (Người vợ)",
        japanese: "分かろうとしないからでしょ！",
        furigana: "わかろうと しないから でしょ！",
        romaji: "Wakarou to shinai kara desho!",
        vietnamese: "Là do anh không chịu hiểu thì có!",
        startTime: 40,
        endTime: 41,
        keywords: [
          { word: "〜うとしない", reading: "〜うとしない", meaning: "Không chịu cố gắng làm gì" }
        ]
      },
      {
        id: "yt-22",
        speaker: "妻 (Người vợ)",
        japanese: "私のことなんて全然見てない！",
        furigana: "わたしの ことなんて ぜんぜん みてない！",
        romaji: "Watashi no koto nante zenzen mite nai!",
        vietnamese: "Anh chẳng hề quan tâm để ý gì đến em cả!",
        startTime: 42,
        endTime: 43,
        keywords: [
          { word: "全然〜ない", reading: "ぜんぜん〜ない", meaning: "Hoàn toàn không..." }
        ]
      },
      {
        id: "yt-23",
        speaker: "妻 (Người vợ)",
        japanese: "大体、私がバイトの時間増やしたいって言ったらなんて言った？",
        furigana: "だいたい、わたしが ばいとの じかん ふやしたいって いったら なんて いった？",
        romaji: "Daitai, watashi ga baito no jikan fuyashitai tte ittara nante itta?",
        vietnamese: "Với lại, lúc em bảo muốn tăng thêm giờ làm thêm thì anh đã nói gì hả?",
        startTime: 44,
        endTime: 48,
        keywords: [
          { word: "大体", reading: "だいたい", meaning: "Vả lại / Đại thể" },
          { word: "増やす", reading: "ふやす", meaning: "Tăng lên" }
        ]
      },
      {
        id: "yt-24",
        speaker: "夫 (Người chồng)",
        japanese: "はぁ？",
        furigana: "はぁ？",
        romaji: "Haa?",
        vietnamese: "Hả?",
        startTime: 49,
        endTime: 50,
        keywords: []
      },
      {
        id: "yt-25",
        speaker: "妻 (Người vợ)",
        japanese: "「家事と育児が大変そう」",
        furigana: "「かじと いくじが たいへんそう」",
        romaji: "\"Kaji to ikuji ga taihensou\"",
        vietnamese: "\"Việc nhà với chăm con trông có vẻ vất vả nhỉ\"",
        startTime: 50,
        endTime: 51,
        keywords: [
          { word: "家事", reading: "かじ", meaning: "Việc nhà" },
          { word: "育児", reading: "いくじ", meaning: "Chăm con" }
        ]
      },
      {
        id: "yt-26",
        speaker: "妻 (Người vợ)",
        japanese: "他人事かよ！",
        furigana: "ひとごとかよ！",
        romaji: "Hitogoto ka yo!",
        vietnamese: "Như thể chuyện của người ngoài ấy à!",
        startTime: 52,
        endTime: 53,
        keywords: [
          { word: "他人事", reading: "ひとごと", meaning: "Chuyện người ngoài" }
        ]
      },
      {
        id: "yt-27",
        speaker: "妻 (Người vợ)",
        japanese: "誰のせいでそうなってんだよ、あんただろ！",
        furigana: "だれの せいで そうなってんだよ、あんただろ！",
        romaji: "Dare no sei de sou natte n da yo, anta daro!",
        vietnamese: "Do ai mà thành ra thế này hả, là do anh đấy!",
        startTime: 53,
        endTime: 55,
        keywords: [
          { word: "誰のせい", reading: "だれのせい", meaning: "Do lỗi tại ai" }
        ]
      },
      {
        id: "yt-28",
        speaker: "夫 (Người chồng)",
        japanese: "被害者ぶんなよ。",
        furigana: "ひがいしゃぶんなよ。",
        romaji: "Higaisha bun na yo.",
        vietnamese: "Đừng có giả vờ làm nạn nhân nữa.",
        startTime: 55,
        endTime: 56,
        keywords: [
          { word: "被害者", reading: "ひがいしゃ", meaning: "Nạn nhân" },
          { word: "〜ぶる", reading: "〜ぶる", meaning: "Giả vờ / Tỏ vẻ" }
        ]
      },
      {
        id: "yt-29",
        speaker: "夫 (Người chồng)",
        japanese: "お前だって俺のこと何も分かってねえよ。",
        furigana: "おまえだって おれの こと なにも わかってねえよ。",
        romaji: "Omae datte ore no koto nanimo wakattenee yo.",
        vietnamese: "Cô cũng có hiểu gì về tôi đâu.",
        startTime: 57,
        endTime: 59,
        keywords: [
          { word: "お前", reading: "おまえ", meaning: "Cô / Mày (xưng hô)" }
        ]
      },
      {
        id: "yt-30",
        speaker: "夫 (Người chồng)",
        japanese: "いいか？",
        furigana: "いいか？",
        romaji: "Ii ka?",
        vietnamese: "Nghe này.",
        startTime: 59,
        endTime: 61,
        keywords: []
      },
      {
        id: "yt-31",
        speaker: "夫 (Người chồng)",
        japanese: "俺だって外でストレスいっぱいで、",
        furigana: "おれだって そとで すとれす いっぱいで、",
        romaji: "Ore datte soto de sutoresu ippai de,",
        vietnamese: "Tôi ở bên ngoài cũng chịu đủ mọi áp lực,",
        startTime: 61,
        endTime: 63,
        keywords: [
          { word: "ストレス", reading: "すとれす", meaning: "Căng thẳng / Áp lực" }
        ]
      },
      {
        id: "yt-32",
        speaker: "夫 (Người chồng)",
        japanese: "家に帰ってきた時くらいほっとしたいんだよ。",
        furigana: "いえに かえってきた ときくらい ほっとしたいんだよ。",
        romaji: "Ie ni kaette kita toki kurai hotto shitai n da yo.",
        vietnamese: "Về đến nhà chỉ mong có được chút cảm giác thảnh thơi nhẹ nhõm.",
        startTime: 63,
        endTime: 66,
        keywords: [
          { word: "ほっとする", reading: "ほっとする", meaning: "Thở phào nhẹ nhõm / Thảnh thơi" }
        ]
      },
      {
        id: "yt-33",
        speaker: "夫 (Người chồng)",
        japanese: "そのために結婚したのに。",
        furigana: "そのために けっこんしたのに。",
        romaji: "Sono tame ni kekkon shita noni.",
        vietnamese: "Rõ ràng vì muốn thế nên tôi mới kết hôn cơ mà.",
        startTime: 66,
        endTime: 67,
        keywords: [
          { word: "結婚", reading: "けっこん", meaning: "Kết hôn" }
        ]
      },
      {
        id: "yt-34",
        speaker: "夫 (Người chồng)",
        japanese: "客より上司より部下より、",
        furigana: "きゃくより じょうしより ぶかより、",
        romaji: "Kyaku yori joushi yori buka yori,",
        vietnamese: "So với khách hàng, cấp trên hay cấp dưới,",
        startTime: 68,
        endTime: 70,
        keywords: [
          { word: "上司", reading: "じょうし", meaning: "Cấp trên" },
          { word: "部下", reading: "ぶか", meaning: "Cấp dưới" }
        ]
      },
      {
        id: "yt-35",
        speaker: "夫 (Người chồng)",
        japanese: "お前の相手してる方が100倍大変なんだよ！",
        furigana: "おまえの あいてしてる ほうが ひゃくばい たいへんなんだよ！",
        romaji: "Omae no aite shiteru hou ga hyakubai taihen na n da yo!",
        vietnamese: "Đối phó với cô còn mệt mỏi hơn gấp 100 lần!",
        startTime: 70,
        endTime: 73,
        keywords: [
          { word: "相手する", reading: "あいてする", meaning: "Đối phó / Tiếp chuyện" },
          { word: "100倍", reading: "ひゃくばい", meaning: "Gấp 100 lần" }
        ]
      },
      {
        id: "yt-36",
        speaker: "夫 (Người chồng)",
        japanese: "こんな家だから俺は出世できねえんだよ！",
        furigana: "こんな いえだから おれは しゅっせ できねえんだよ！",
        romaji: "Konna ie dakara ore wa shusse dekinee n da yo!",
        vietnamese: "Chính vì cái nhà này mà tôi mới không thể thăng tiến được đấy!",
        startTime: 74,
        endTime: 77,
        keywords: [
          { word: "出世", reading: "しゅっせ", meaning: "Thăng tiến" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "養育費", reading: "よういくひ", meaning: "Tiền nuôi con" },
      { word: "出世", reading: "しゅっせ", meaning: "Thăng tiến sự nghiệp" },
      { word: "ケチる", reading: "けちる", meaning: "Hà tiện / Bóp mồm bóp miệng" },
      { word: "他人事", reading: "ひとごと", meaning: "Chuyện người ngoài" },
      { word: "被害者ぶる", reading: "ひがいしゃぶる", meaning: "Giả vờ làm nạn nhân" },
      { word: "ほっとする", reading: "ほっとする", meaning: "Thở phào nhẹ nhõm" }
    ]
  }
];
