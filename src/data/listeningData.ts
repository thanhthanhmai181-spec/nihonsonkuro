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
  // --- FEATURED YOUTUBE EPISODE: THẢM HỌA NẤU CÀ RI (NICHIJOU) ---
  {
    id: "youtube-AQX6HiZLDmo",
    title: "Thảm Họa Nấu Cà Ri (Nichijou)",
    level: "N4",
    category: "Hội Thoại Anime",
    icon: "🍛",
    durationEst: "2 phút 27 giây",
    description: "Trích đoạn anime hài kinh điển Nichijou: Chuyến cắm trại thảm họa khi nồi cà ri và nồi cơm đều gặp sự cố bất ngờ.",
    youtubeId: "AQX6HiZLDmo",
    lines: [
      {
        id: "yt-curry-1",
        speaker: "Mio",
        japanese: "んま！ゆっこ、カレーどう？",
        furigana: "んま！ゆっこ、かれー どう？",
        romaji: "Nma! Yukko, karee dou?",
        vietnamese: "Chà! Yukko, món cà ri thế nào rồi?",
        startTime: 10,
        endTime: 13,
        keywords: [
          { word: "カレー", reading: "かれー", meaning: "Món cà ri" }
        ]
      },
      {
        id: "yt-curry-2",
        speaker: "Yuuko",
        japanese: "うん、もうすぐできるよ。",
        furigana: "うん、もうすぐ できるよ。",
        romaji: "Un, mousugu dekiru yo.",
        vietnamese: "Ừ, sắp xong rồi nè.",
        startTime: 14,
        endTime: 16,
        keywords: [
          { word: "もうすぐ", reading: "もうすぐ", meaning: "Sắp sửa / Sắp xong" },
          { word: "できる", reading: "できる", meaning: "Xong / Hoàn thành" }
        ]
      },
      {
        id: "yt-curry-3",
        speaker: "Mio",
        japanese: "もうかなりグーペコになってきたよー。",
        furigana: "もう かなり ぐーぺこ に なってきたよー。",
        romaji: "Mou kanari guupeko ni natte kita yoo.",
        vietnamese: "Bụng tớ bắt đầu đói cồn cào rồi đấy.",
        startTime: 16,
        endTime: 18,
        keywords: [
          { word: "かなり", reading: "かなり", meaning: "Khá là / Rất" },
          { word: "グーペコ", reading: "ぐーぺこ", meaning: "Bụng đói cồn cào (bụng kêu réo)" }
        ]
      },
      {
        id: "yt-curry-4",
        speaker: "Yuuko",
        japanese: "超私も。",
        furigana: "ちょう わたし も。",
        romaji: "Chou watashi mo.",
        vietnamese: "Tớ cũng siêu đói luôn.",
        startTime: 19,
        endTime: 21,
        keywords: [
          { word: "超", reading: "ちょう", meaning: "Siêu / Cực kỳ" },
          { word: "私", reading: "わたし", meaning: "Tôi / Tớ" }
        ]
      },
      {
        id: "yt-curry-5",
        speaker: "Mio",
        japanese: "麻衣ちゃん、そっちはどう？",
        furigana: "まい ちゃん、そっちは どう？",
        romaji: "Mai-chan, socchi wa dou?",
        vietnamese: "Mai-chan, bên cậu thế nào rồi?",
        startTime: 21,
        endTime: 23,
        keywords: [
          { word: "そっち", reading: "そっち", meaning: "Bên đó / Phía đó" }
        ]
      },
      {
        id: "yt-curry-6",
        speaker: "Mai",
        japanese: "大物の予感。",
        furigana: "おおもの の よかん。",
        romaji: "Oomono no yokan.",
        vietnamese: "Linh cảm có cá lớn.",
        startTime: 23,
        endTime: 25,
        keywords: [
          { word: "大物", reading: "おおもの", meaning: "Cá to / Đồ khủng" },
          { word: "予感", reading: "よかん", meaning: "Linh cảm / Điềm báo" }
        ]
      },
      {
        id: "yt-curry-7",
        speaker: "Mio & Yuuko",
        japanese: "おおー！",
        furigana: "おおー！",
        romaji: "Ooo-!",
        vietnamese: "Ồồồ!",
        startTime: 25,
        endTime: 26,
        keywords: [
          { word: "おおー", reading: "おおー", meaning: "Ồ (thán từ)" }
        ]
      },
      {
        id: "yt-curry-8",
        speaker: "Mio",
        japanese: "えへへ、こりゃあごちそうだな。",
        furigana: "えへへ、こりゃあ ごちそう だな。",
        romaji: "Ehehe, koryaa gochisou da na.",
        vietnamese: "Ehehe, phen này có bữa thịnh soạn rồi.",
        startTime: 26,
        endTime: 28,
        keywords: [
          { word: "ごちそう", reading: "ごちそう", meaning: "Bữa ăn ngon thịnh soạn" }
        ]
      },
      {
        id: "yt-curry-9",
        speaker: "Yuuko",
        japanese: "よし！もういい感じだろう。",
        furigana: "よし！もう いい かんじ だろう。",
        romaji: "Yoshi! Mou ii kanji darou.",
        vietnamese: "Được rồi! Chắc là ngon nghẻ rồi đấy.",
        startTime: 31,
        endTime: 34,
        keywords: [
          { word: "いい感じ", reading: "いいかんじ", meaning: "Cảm giác ổn / Ngon lành rồi" }
        ]
      },
      {
        id: "yt-curry-10",
        speaker: "Yuuko",
        japanese: "よっと。",
        furigana: "よっと。",
        romaji: "Yotto.",
        vietnamese: "Nào.",
        startTime: 36,
        endTime: 37,
        keywords: [
          { word: "よっと", reading: "よっと", meaning: "Nào (tiếng thốt khi nhấc đồ)" }
        ]
      },
      {
        id: "yt-curry-11",
        speaker: "Yuuko",
        japanese: "へいお待ち！超美味スーパーカレー、完成の巻きなのだ！",
        furigana: "へい お まち！ちょう びみ すーぱー かれー、かんせい の まき なのだ！",
        romaji: "Hei omachi! Chou bimi suupaa karee, kansei no maki na no da!",
        vietnamese: "Có ngay đây! Siêu phẩm cà ri siêu ngon, hoàn thành mỹ mãn rồi đây!",
        startTime: 37,
        endTime: 42,
        keywords: [
          { word: "お待ち", reading: "おまち", meaning: "Có ngay đây (khi dọn món)" },
          { word: "超美味", reading: "ちょうびみ", meaning: "Siêu ngon lành" },
          { word: "完成", reading: "かんせい", meaning: "Hoàn thành" }
        ]
      },
      {
        id: "yt-curry-12",
        speaker: "Yuuko",
        japanese: "ああーーー！ううう…",
        furigana: "ああーーー！ううう…",
        romaji: "Aaaa---! Uuu...",
        vietnamese: "Aaaa---! Uuu...",
        startTime: 43,
        endTime: 45,
        keywords: []
      },
      {
        id: "yt-curry-13",
        speaker: "Mio",
        japanese: "こっちはもうちょっとかかるかな。",
        furigana: "こっちは もう ちょっと かかるかな。",
        romaji: "Kocchi wa mou chotto kakaru ka na.",
        vietnamese: "Bên này chắc còn phải chờ thêm một chút nữa.",
        startTime: 47,
        endTime: 50,
        keywords: [
          { word: "かかる", reading: "かかる", meaning: "Tốn / Mất thời gian" },
          { word: "もうちょっと", reading: "もうちょっと", meaning: "Thêm một chút nữa" }
        ]
      },
      {
        id: "yt-curry-14",
        speaker: "Mio",
        japanese: "カレー作る前に仕込んどけばよかったね。",
        furigana: "かれー つくる まえ に しこんどけば よかったね。",
        romaji: "Karee tsukuru mae ni shikondokeba yokatta ne.",
        vietnamese: "Đáng lẽ phải nấu cơm trước khi nấu cà ri mới đúng.",
        startTime: 50,
        endTime: 53,
        keywords: [
          { word: "仕込む", reading: "しこむ", meaning: "Chuẩn bị trước / Nấu trước" },
          { word: "〜ばよかった", reading: "〜ばよかった", meaning: "Biết thế thì đã... / Giá mà..." }
        ]
      },
      {
        id: "yt-curry-15",
        speaker: "Mio",
        japanese: "まあ、赤子泣いても蓋取るなっつってね。あははは。",
        furigana: "まあ、あかご ないても ふた とるな っつってね。あははは。",
        romaji: "Maa, akago naitemo futa toru na ttsutte ne. Ahahaha.",
        vietnamese: "Mà, người ta bảo 'dù trẻ con có khóc cũng không được mở nắp nồi' mà. A ha ha ha.",
        startTime: 53,
        endTime: 57,
        keywords: [
          { word: "赤子", reading: "あかご", meaning: "Đứa trẻ sơ sinh" },
          { word: "泣く", reading: "なく", meaning: "Khóc" },
          { word: "蓋", reading: "ふた", meaning: "Nắp nồi" }
        ]
      },
      {
        id: "yt-curry-16",
        speaker: "Mio",
        japanese: "あ、マヨネーズ持ってくればよかったよ。カレーにはマヨネーズだよね、やっぱ。",
        furigana: "あ、まよねーず もってくれば よかったよ。かれー には まよねーず だよね、やっぱ。",
        romaji: "A, mayoneezu mottekureba yokatta yo. Karee ni wa mayoneezu da yo ne, yappa.",
        vietnamese: "A, biết thế mang theo sốt mayonnaise. Cà ri thì phải ăn với sốt mayonnaise mới chuẩn nhỉ.",
        startTime: 59,
        endTime: 65,
        keywords: [
          { word: "マヨネーズ", reading: "まよねーず", meaning: "Sốt mayonnaise" },
          { word: "持って来る", reading: "もってくる", meaning: "Mang theo / Mang đến" },
          { word: "やっぱ", reading: "やっぱ", meaning: "Quả nhiên là / Đúng là" }
        ]
      },
      {
        id: "yt-curry-17",
        speaker: "Yuuko",
        japanese: "ま、マヨ…",
        furigana: "ま、まよ…",
        romaji: "Ma, mayo...",
        vietnamese: "M-Mayo...",
        startTime: 66,
        endTime: 67,
        keywords: []
      },
      {
        id: "yt-curry-18",
        speaker: "Mio",
        japanese: "ゆっこは何派？",
        furigana: "ゆっこ は なん は？",
        romaji: "Yukko wa nan pa?",
        vietnamese: "Yukko thuộc phe nào?",
        startTime: 67,
        endTime: 69,
        keywords: [
          { word: "何派", reading: "なんぱ", meaning: "Phe nào / Trường phái nào" }
        ]
      },
      {
        id: "yt-curry-19",
        speaker: "Yuuko",
        japanese: "あ、あ、ああ…う、う、う…",
        furigana: "あ、あ、ああ…う、う、う…",
        romaji: "A, a, aa... u, u, u...",
        vietnamese: "A, a, a... ư, ư, ư...",
        startTime: 69,
        endTime: 76,
        keywords: []
      },
      {
        id: "yt-curry-20",
        speaker: "Mio",
        japanese: "なんつって。",
        furigana: "なんつって。",
        romaji: "Nantsutte.",
        vietnamese: "Nói đùa tí thôi.",
        startTime: 76,
        endTime: 77,
        keywords: [
          { word: "なんつって", reading: "なんつって", meaning: "Nói đùa tí thôi" }
        ]
      },
      {
        id: "yt-curry-21",
        speaker: "Yuuko",
        japanese: "ち、違うの！こ、これはそういうんじゃなくて…",
        furigana: "ち、ちがう の！こ、これは そういうんじゃなくて…",
        romaji: "Chi, chigau no! Ko, kore wa sou iu n ja nakute...",
        vietnamese: "K-Không phải đâu! C-Cái này không phải như vậy đâu...",
        startTime: 78,
        endTime: 82,
        keywords: [
          { word: "違う", reading: "ちがう", meaning: "Không phải / Khác" }
        ]
      },
      {
        id: "yt-curry-22",
        speaker: "Yuuko",
        japanese: "まだ、ほ、ほら！ところてんもあるし！と、ところてん…なんつ…",
        furigana: "まだ、ほ、ほら！ところてん も あるし！と、ところてん…なんつ…",
        romaji: "Mada, ho, hora! Tokoroten mo aru shi! To, tokoroten... nantsu...",
        vietnamese: "Vẫn, n-nhìn này! Vẫn còn tokoroten (thạch rong biển) mà! T-Tokoroten... nói đ...",
        startTime: 83,
        endTime: 88,
        keywords: [
          { word: "ところてん", reading: "ところてん", meaning: "Tokoroten (Món thạch rong biển truyền thống Nhật Bản)" }
        ]
      },
      {
        id: "yt-curry-23",
        speaker: "Mio",
        japanese: "なんつ…",
        furigana: "なんつ…",
        romaji: "Nantsu...",
        vietnamese: "Nói đ...",
        startTime: 88,
        endTime: 90,
        keywords: []
      },
      {
        id: "yt-curry-24",
        speaker: "Mio",
        japanese: "お前の…",
        furigana: "おまえ の…",
        romaji: "Omae no...",
        vietnamese: "Máu của mày...",
        startTime: 92,
        endTime: 95,
        keywords: [
          { word: "お前", reading: "おまえ", meaning: "Mày / Cậu (ngôi thứ 2 thô bạo)" }
        ]
      },
      {
        id: "yt-curry-25",
        speaker: "Yuuko",
        japanese: "み、みおちゃん！？",
        furigana: "み、みお ちゃん！？",
        romaji: "Mi, Mio-chan!?",
        vietnamese: "M-Mio-chan?!",
        startTime: 95,
        endTime: 96,
        keywords: []
      },
      {
        id: "yt-curry-26",
        speaker: "Mio",
        japanese: "お前の…",
        furigana: "おまえ の…",
        romaji: "Omae no...",
        vietnamese: "Máu của mày...",
        startTime: 96,
        endTime: 98,
        keywords: []
      },
      {
        id: "yt-curry-27",
        speaker: "Yuuko",
        japanese: "ああー！",
        furigana: "ああー！",
        romaji: "Aaa-!",
        vietnamese: "Aaa!",
        startTime: 98,
        endTime: 99,
        keywords: []
      },
      {
        id: "yt-curry-28",
        speaker: "Mio",
        japanese: "お前の血は何色だーーー！！",
        furigana: "おまえ の ち は なにいろ だーーー！！",
        romaji: "Omae no chi wa nani iro da---!!",
        vietnamese: "MÁU CỦA MÀY MÀU GÌ HẢẢẢẢẢ!!",
        startTime: 100,
        endTime: 104,
        keywords: [
          { word: "血", reading: "ち", meaning: "Máu" },
          { word: "何色", reading: "なにいろ", meaning: "Màu gì" }
        ]
      },
      {
        id: "yt-curry-29",
        speaker: "Mio",
        japanese: "ぐっ！みぎゃーーー！",
        furigana: "ぐっ！みぎゃーーー！",
        romaji: "Gu'! Migyaaa---!",
        vietnamese: "Hự! Áaaa---!",
        startTime: 104,
        endTime: 107,
        keywords: []
      },
      {
        id: "yt-curry-30",
        speaker: "Yuuko & Mio",
        japanese: "ぎゃあああああ！",
        furigana: "ぎゃあああああ！",
        romaji: "Gyaaaaaaa!",
        vietnamese: "Áaaaaaaa!",
        startTime: 108,
        endTime: 114,
        keywords: []
      },
      {
        id: "yt-curry-31",
        speaker: "Yuuko & Mio",
        japanese: "ごめん麻衣ちゃん！昼食のカレーも米もなくなったーーー！",
        furigana: "ごめん まい ちゃん！ちゅうしょく の かれー も こめ も なくなったーーー！",
        romaji: "Gomen Mai-chan! Chuushoku no karee mo kome mo naku natta---!",
        vietnamese: "Xin lỗi Mai-chan! Cả cơm lẫn cà ri cho bữa trưa đều đi tong hết rồi---!",
        startTime: 116,
        endTime: 120,
        keywords: [
          { word: "昼食", reading: "ちゅうしょく", meaning: "Bữa trưa" },
          { word: "米", reading: "こめ", meaning: "Gạo / Cơm" },
          { word: "なくなる", reading: "なくなる", meaning: "Biến mất / Hết sạch" }
        ]
      },
      {
        id: "yt-curry-32",
        speaker: "Mio",
        japanese: "麻衣ちゃん…",
        furigana: "まい ちゃん…",
        romaji: "Mai-chan...",
        vietnamese: "Mai-chan...",
        startTime: 126,
        endTime: 128,
        keywords: []
      },
      {
        id: "yt-curry-33",
        speaker: "Yuuko",
        japanese: "ところてんならあるけど…",
        furigana: "ところてん なら あるけど…",
        romaji: "Tokoroten nara aru kedo...",
        vietnamese: "Tụi mình chỉ còn thạch tokoroten thôi...",
        startTime: 128,
        endTime: 129,
        keywords: [
          { word: "〜ならある", reading: "〜ならある", meaning: "Nếu là ... thì còn / có" }
        ]
      },
      {
        id: "yt-curry-34",
        speaker: "Yuuko & Mio",
        japanese: "わあーー！麻衣ちゃん！",
        furigana: "わあーー！まい ちゃん！",
        romaji: "Waaa--! Mai-chan!",
        vietnamese: "Oaaa! Mai-chan!",
        startTime: 135,
        endTime: 138,
        keywords: []
      },
      {
        id: "yt-curry-35",
        speaker: "Mai",
        japanese: "リリース。",
        furigana: "りりーす。",
        romaji: "Ririisu.",
        vietnamese: "Thả.",
        startTime: 139,
        endTime: 141,
        keywords: [
          { word: "リリース", reading: "りりーす", meaning: "Thả phóng sinh (Release)" }
        ]
      },
      {
        id: "yt-curry-36",
        speaker: "Yuuko & Mio",
        japanese: "ぎゃあああああああーーーー！",
        furigana: "ぎゃあああああああーーーー！",
        romaji: "Gyaaaaaaaaaaaa----!",
        vietnamese: "Áaaaaaaaaaaa----!",
        startTime: 141,
        endTime: 147,
        keywords: []
      }
    ],
    summaryKeywords: [
      { word: "カレー", reading: "かれー", meaning: "Món cà ri" },
      { word: "仕込む", reading: "しこむ", meaning: "Chuẩn bị trước / Nấu trước" },
      { word: "予感", reading: "よかん", meaning: "Linh cảm / Điềm báo" },
      { word: "昼食", reading: "ちゅうしょく", meaning: "Bữa trưa" },
      { word: "血", reading: "ち", meaning: "Máu" },
      { word: "ところてん", reading: "ところてん", meaning: "Món thạch tokoroten" },
      { word: "リリース", reading: "りりーす", meaning: "Thả phóng sinh" }
    ]
  },
  // --- FEATURED YOUTUBE EPISODE: MAI ĐẾN CHƠI NHÀ & VẼ CÁ MẬP (NICHIJOU) ---
  {
    id: "youtube-R1mqTmfIVT8",
    title: "Mai Đến Chơi Nhà & Vẽ Cá Mập (Nichijou)",
    level: "N4",
    category: "Hội Thoại Anime",
    icon: "🦈",
    durationEst: "2 phút 20 giây",
    description: "Trích đoạn anime hài Nichijou: Bạn Mai (Minakami) ghé thăm phòng thí nghiệm Shinonome, tặng tượng Đại Uy Đức Minh Vương và trổ tài vẽ cá mập cho Hakase.",
    youtubeId: "R1mqTmfIVT8",
    lines: [
      {
        id: "yt-mai-1",
        speaker: "Nano (なの)",
        japanese: "水上さん、どうしたんですか？",
        furigana: "みなかみ さん、どうしたんですか？",
        romaji: "Minakami-san, doushitan desu ka?",
        vietnamese: "Minakami-san, có chuyện gì thế ạ?",
        startTime: 5,
        endTime: 8,
        keywords: [
          { word: "水上さん", reading: "みなかみさん", meaning: "Bạn Minakami (Mai)" },
          { word: "どうしたんですか", reading: "どうしたんですか", meaning: "Có chuyện gì thế ạ?" }
        ]
      },
      {
        id: "yt-mai-2",
        speaker: "Mai (麻衣)",
        japanese: "遊びに来た。",
        furigana: "あそび に きた。",
        romaji: "Asobi ni kita.",
        vietnamese: "Tớ đến chơi.",
        startTime: 8,
        endTime: 10,
        keywords: [
          { word: "遊びに来る", reading: "あそびにくる", meaning: "Đến chơi" }
        ]
      },
      {
        id: "yt-mai-3",
        speaker: "Nano (なの)",
        japanese: "わぁ、すみません、こんなにお菓子もらってしまって。",
        furigana: "わぁ、すみません、こんなに おかし もらってしまって。",
        romaji: "Waa, sumimasen, konna ni okashi moratte shimatte.",
        vietnamese: "Oa, cảm ơn bạn nhiều nhé, cho chúng mình nhiều bánh kẹo thế này.",
        startTime: 14,
        endTime: 18,
        keywords: [
          { word: "お菓子", reading: "おかし", meaning: "Bánh kẹo" },
          { word: "もらう", reading: "もらう", meaning: "Nhận được" }
        ]
      },
      {
        id: "yt-mai-4",
        speaker: "Hakase (はかせ)",
        japanese: "あっ！博士に犬噛ませようとした人だ！",
        furigana: "あっ！はかせ に いぬ かませよう と した ひと だ！",
        romaji: "A'! Hakase ni inu kamaseyou to shita hito da!",
        vietnamese: "A! Người đã định thả chó cắn Hakase này!",
        startTime: 18,
        endTime: 21,
        keywords: [
          { word: "博士", reading: "はかせ", meaning: "Bé Hakase / Tiến sĩ" },
          { word: "犬", reading: "いぬ", meaning: "Chó" },
          { word: "噛ませる", reading: "かませる", meaning: "Thả cắn / Cho cắn (sai khiến)" }
        ]
      },
      {
        id: "yt-mai-5",
        speaker: "Hakase (はかせ)",
        japanese: "絶対この人なんだけど！",
        furigana: "ぜったい この ひと なんだけど！",
        romaji: "Zettai kono hito nan dakedo!",
        vietnamese: "Chắc chắn là người này mà!",
        startTime: 29,
        endTime: 31,
        keywords: [
          { word: "絶対", reading: "ぜったい", meaning: "Tuyệt đối / Chắc chắn" }
        ]
      },
      {
        id: "yt-mai-6",
        speaker: "Nano (なの)",
        japanese: "じゃあ、私ちょっとお茶淹れてきますね。",
        furigana: "じゃあ、わたし ちょっと おちゃ いれてきますね。",
        romaji: "Jaa, watashi chotto ocha iretekimasu ne.",
        vietnamese: "Vậy em đi pha trà một chút nhé.",
        startTime: 32,
        endTime: 35,
        keywords: [
          { word: "お茶", reading: "おちゃ", meaning: "Trà" },
          { word: "淹れる", reading: "いれる", meaning: "Pha (trà, cà phê)" }
        ]
      },
      {
        id: "yt-mai-7",
        speaker: "Hakase (はかせ)",
        japanese: "何しに来たの？",
        furigana: "なに しに きた の？",
        romaji: "Nani shi ni kita no?",
        vietnamese: "Chị đến đây làm gì thế?",
        startTime: 41,
        endTime: 43,
        keywords: [
          { word: "何しに来た", reading: "なにしにきた", meaning: "Đến làm gì" }
        ]
      },
      {
        id: "yt-mai-8",
        speaker: "Mai (麻衣)",
        japanese: "あげる。",
        furigana: "あげる。",
        romaji: "Ageru.",
        vietnamese: "Cho nè.",
        startTime: 48,
        endTime: 49,
        keywords: [
          { word: "あげる", reading: "あげる", meaning: "Cho / Tặng" }
        ]
      },
      {
        id: "yt-mai-9",
        speaker: "Hakase (はかせ)",
        japanese: "何それ？",
        furigana: "なに それ？",
        romaji: "Nani sore?",
        vietnamese: "Cái gì thế này?",
        startTime: 49,
        endTime: 50,
        keywords: []
      },
      {
        id: "yt-mai-10",
        speaker: "Mai (麻衣)",
        japanese: "大威徳明王。",
        furigana: "だいいとくみょうおう。",
        romaji: "Daiitoku Myouou.",
        vietnamese: "Đại Uy Đức Minh Vương.",
        startTime: 50,
        endTime: 52,
        keywords: [
          { word: "大威徳明王", reading: "だいいとくみょうおう", meaning: "Đại Uy Đức Minh Vương (Vị minh vương Phật giáo)" }
        ]
      },
      {
        id: "yt-mai-11",
        speaker: "Hakase (はかせ)",
        japanese: "いらない。",
        furigana: "いらない。",
        romaji: "Iranai.",
        vietnamese: "Không cần đâu.",
        startTime: 52,
        endTime: 53,
        keywords: [
          { word: "いらない", reading: "いらない", meaning: "Không cần" }
        ]
      },
      {
        id: "yt-mai-12",
        speaker: "Mai (麻衣)",
        japanese: "かっこいいけど。",
        furigana: "かっこいい けど。",
        romaji: "Kakkoii kedo.",
        vietnamese: "Ngầu lắm đó.",
        startTime: 54,
        endTime: 55,
        keywords: [
          { word: "かっこいい", reading: "かっこいい", meaning: "Ngầu / Đẹp mắt" }
        ]
      },
      {
        id: "yt-mai-13",
        speaker: "Hakase (はかせ)",
        japanese: "全然かっこよくない！",
        furigana: "ぜんぜん かっこよくない！",
        romaji: "Zenzen kakkoyokunai!",
        vietnamese: "Chẳng ngầu chút nào hết!",
        startTime: 55,
        endTime: 58,
        keywords: [
          { word: "全然〜ない", reading: "ぜんぜん〜ない", meaning: "Hoàn toàn không..." }
        ]
      },
      {
        id: "yt-mai-14",
        speaker: "Mai (麻衣)",
        japanese: "これ、面白いよ。",
        furigana: "これ、おもしろい よ。",
        romaji: "Kore, omoshiroi yo.",
        vietnamese: "Cái này thú vị lắm nè.",
        startTime: 62,
        endTime: 64,
        keywords: [
          { word: "面白い", reading: "おもしろい", meaning: "Thú vị / Hay" }
        ]
      },
      {
        id: "yt-mai-15",
        speaker: "Hakase (はかせ)",
        japanese: "何それ？",
        furigana: "なに それ？",
        romaji: "Nani sore?",
        vietnamese: "Cái gì thế?",
        startTime: 64,
        endTime: 65,
        keywords: []
      },
      {
        id: "yt-mai-16",
        speaker: "Mai (麻衣)",
        japanese: "36LDK。",
        furigana: "36LDK。",
        romaji: "Sanjuuroku Eru Dii Kee.",
        vietnamese: "Căn hộ 36LDK.",
        startTime: 65,
        endTime: 67,
        keywords: [
          { word: "LDK", reading: "えるでぃーけー", meaning: "Phòng khách, ăn, bếp (Living, Dining, Kitchen)" }
        ]
      },
      {
        id: "yt-mai-17",
        speaker: "Hakase (はかせ)",
        japanese: "全然面白くない！",
        furigana: "ぜんぜん おもしろくない！",
        romaji: "Zenzen omoshirokunai!",
        vietnamese: "Chẳng thú vị chút nào!",
        startTime: 67,
        endTime: 69,
        keywords: [
          { word: "面白くない", reading: "おもしろくない", meaning: "Không thú vị / Chẳng buồn cười" }
        ]
      },
      {
        id: "yt-mai-18",
        speaker: "Mai (麻衣)",
        japanese: "風呂、トイレ、窓なし。",
        furigana: "ふろ、といれ、まど なし。",
        romaji: "Furo, toire, mado nashi.",
        vietnamese: "Không phòng tắm, không nhà vệ sinh, không cửa sổ.",
        startTime: 69,
        endTime: 71,
        keywords: [
          { word: "風呂", reading: "ふろ", meaning: "Bồn tắm / Phòng tắm" },
          { word: "トイレ", reading: "といれ", meaning: "Nhà vệ sinh" },
          { word: "窓", reading: "まど", meaning: "Cửa sổ" },
          { word: "なし", reading: "なし", meaning: "Không có" }
        ]
      },
      {
        id: "yt-mai-19",
        speaker: "Hakase (はかせ)",
        japanese: "面白くない！",
        furigana: "おもしろくない！",
        romaji: "Omoshirokunai!",
        vietnamese: "Không hề thú vị!",
        startTime: 71,
        endTime: 73,
        keywords: []
      },
      {
        id: "yt-mai-20",
        speaker: "Mai (麻衣)",
        japanese: "何描いてるの？",
        furigana: "なに かいてる の？",
        romaji: "Nani kaiteru no?",
        vietnamese: "Em đang vẽ gì thế?",
        startTime: 83,
        endTime: 84,
        keywords: [
          { word: "描く", reading: "かく", meaning: "Vẽ" }
        ]
      },
      {
        id: "yt-mai-21",
        speaker: "Hakase (はかせ)",
        japanese: "教えてあげない！",
        furigana: "おしえて あげない！",
        romaji: "Oshiete agenai!",
        vietnamese: "Không thèm nói cho chị biết đâu!",
        startTime: 84,
        endTime: 86,
        keywords: [
          { word: "教える", reading: "おしえる", meaning: "Nói cho biết / Chỉ cho" }
        ]
      },
      {
        id: "yt-mai-22",
        speaker: "Hakase (はかせ)",
        japanese: "はい。",
        furigana: "はい。",
        romaji: "Hai.",
        vietnamese: "Đây nè.",
        startTime: 95,
        endTime: 96,
        keywords: []
      },
      {
        id: "yt-mai-23",
        speaker: "Mai (麻衣)",
        japanese: "ん、ヨシキリザメ。",
        furigana: "ん、よしきりざめ。",
        romaji: "N, yoshikirizame.",
        vietnamese: "Ừm, cá mập xanh.",
        startTime: 97,
        endTime: 99,
        keywords: [
          { word: "ヨシキリザメ", reading: "よしきりざめ", meaning: "Cá mập xanh" }
        ]
      },
      {
        id: "yt-mai-24",
        speaker: "Hakase (はかせ)",
        japanese: "あ！…はあぁ〜！かっこいい！",
        furigana: "あ！…はあぁ〜！かっこいい！",
        romaji: "A! ...Haaa~! Kakkoii!",
        vietnamese: "A! ... Oa oa~! Ngầu quá đi!",
        startTime: 99,
        endTime: 104,
        keywords: [
          { word: "かっこいい", reading: "かっこいい", meaning: "Ngầu / Tuyệt vời" }
        ]
      },
      {
        id: "yt-mai-25",
        speaker: "Mai (麻衣)",
        japanese: "あげる。",
        furigana: "あげる。",
        romaji: "Ageru.",
        vietnamese: "Cho em nè.",
        startTime: 106,
        endTime: 107,
        keywords: []
      },
      {
        id: "yt-mai-26",
        speaker: "Hakase (はかせ)",
        japanese: "やったー！",
        furigana: "やったー！",
        romaji: "Yattaa-!",
        vietnamese: "Tuyệt quá!",
        startTime: 107,
        endTime: 108,
        keywords: [
          { word: "やったー", reading: "やったー", meaning: "Hoan hô / Tuyệt vời" }
        ]
      },
      {
        id: "yt-mai-27",
        speaker: "Hakase (はかせ)",
        japanese: "ねえねえ、違うサメも描いてみて！",
        furigana: "ねえねえ、ちがう さめ も かいてみて！",
        romaji: "Nee nee, chigau same mo kaitemite!",
        vietnamese: "Này này, vẽ con cá mập khác nữa đi!",
        startTime: 108,
        endTime: 110,
        keywords: [
          { word: "違う", reading: "ちがう", meaning: "Khác" },
          { word: "サメ", reading: "さめ", meaning: "Cá mập" },
          { word: "描く", reading: "かく", meaning: "Vẽ" }
        ]
      },
      {
        id: "yt-mai-28",
        speaker: "Mai (麻衣)",
        japanese: "いいよ。",
        furigana: "いいよ。",
        romaji: "Ii yo.",
        vietnamese: "Được thôi.",
        startTime: 110,
        endTime: 111,
        keywords: [
          { word: "いいよ", reading: "いいよ", meaning: "Được thôi" }
        ]
      },
      {
        id: "yt-mai-29",
        speaker: "Hakase (はかせ)",
        japanese: "笑ってるやつ描いてみて！",
        furigana: "わらってる やつ かいてみて！",
        romaji: "Waratteru yatsu kaitemite!",
        vietnamese: "Vẽ con nào đang cười đi!",
        startTime: 111,
        endTime: 113,
        keywords: [
          { word: "笑う", reading: "わらう", meaning: "Cười" },
          { word: "やつ", reading: "やつ", meaning: "Con / Đứa" }
        ]
      },
      {
        id: "yt-mai-30",
        speaker: "Mai (麻衣)",
        japanese: "いいよ。",
        furigana: "いいよ。",
        romaji: "Ii yo.",
        vietnamese: "Được thôi.",
        startTime: 113,
        endTime: 114,
        keywords: []
      },
      {
        id: "yt-mai-31",
        speaker: "Hakase (はかせ)",
        japanese: "博士のと交換していい？",
        furigana: "はかせ の と こうかん して いい？",
        romaji: "Hakase no to koukan shite ii?",
        vietnamese: "Đổi lấy tranh của Hakase được không?",
        startTime: 114,
        endTime: 116,
        keywords: [
          { word: "交換", reading: "こうかん", meaning: "Đổi / Trao đổi" }
        ]
      },
      {
        id: "yt-mai-32",
        speaker: "Mai (麻衣)",
        japanese: "いいよ。",
        furigana: "いいよ。",
        romaji: "Ii yo.",
        vietnamese: "Được chứ.",
        startTime: 116,
        endTime: 117,
        keywords: []
      },
      {
        id: "yt-mai-33",
        speaker: "Nano (なの)",
        japanese: "お待たせしまし…",
        furigana: "お またせ しまし…",
        romaji: "Omatase shimashi...",
        vietnamese: "Xin lỗi vì để mọi người phải...",
        startTime: 118,
        endTime: 120,
        keywords: [
          { word: "お待たせする", reading: "おまたせする", meaning: "Để ai đó phải chờ đợi" }
        ]
      },
      {
        id: "yt-mai-34",
        speaker: "Nano (なの)",
        japanese: "あっ、あれ？",
        furigana: "あっ、あれ？",
        romaji: "A', are?",
        vietnamese: "A, ủa?",
        startTime: 123,
        endTime: 124,
        keywords: []
      },
      {
        id: "yt-mai-35",
        speaker: "Nano (なの)",
        japanese: "あ、博士、水上さん帰っちゃったんですか？",
        furigana: "あ、はかせ、みなかみ さん かえっちゃった ん ですか？",
        romaji: "A, Hakase, Minakami-san kaecchatta n desu ka?",
        vietnamese: "A, Hakase, Minakami-san về rồi ạ?",
        startTime: 128,
        endTime: 131,
        keywords: [
          { word: "帰っちゃう", reading: "かえっちゃう", meaning: "Về mất rồi" }
        ]
      },
      {
        id: "yt-mai-36",
        speaker: "Hakase (はかせ)",
        japanese: "おう！でもまた絵描きに来てって言っといたよ。",
        furigana: "おう！でも また えかき に きて って いっといた よ。",
        romaji: "Ou! Demo mata ekaki ni kite tte ittoita yo.",
        vietnamese: "Ừm! Nhưng em đã bảo chị ấy lần sau lại tới vẽ tranh tiếp rồi.",
        startTime: 131,
        endTime: 135,
        keywords: [
          { word: "絵描き", reading: "えかき", meaning: "Vẽ tranh" },
          { word: "言っておく", reading: "いっておく", meaning: "Dặn trước / Bảo trước" }
        ]
      },
      {
        id: "yt-mai-37",
        speaker: "Nano (なの)",
        japanese: "そうですか。",
        furigana: "そう です か。",
        romaji: "Sou desu ka.",
        vietnamese: "Vậy ạ.",
        startTime: 135,
        endTime: 137,
        keywords: []
      },
      {
        id: "yt-mai-38",
        speaker: "Hakase & Nano (はかせ・なの)",
        japanese: "何しに来たんだろう？",
        furigana: "なに しに きた んだろう？",
        romaji: "Nani shi ni kita n darou?",
        vietnamese: "Không biết chị ấy/bạn ấy đến đây làm gì nhỉ?",
        startTime: 138,
        endTime: 140,
        keywords: [
          { word: "何しに来た", reading: "なにしにきた", meaning: "Đến làm gì" },
          { word: "〜んだろう", reading: "〜んだろう", meaning: "Không biết là... nhỉ" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "遊びに来る", reading: "あそびにくる", meaning: "Đến chơi" },
      { word: "大威徳明王", reading: "だいいとくみょうおう", meaning: "Đại Uy Đức Minh Vương" },
      { word: "全然〜ない", reading: "ぜんぜん〜ない", meaning: "Hoàn toàn không... chút nào" },
      { word: "ヨシキリザメ", reading: "よしきりざめ", meaning: "Cá mập xanh (Prionace glauca)" },
      { word: "交換", reading: "こうかん", meaning: "Trao đổi / Đổi chác" },
      { word: "お待たせする", reading: "おまたせする", meaning: "Để ai đó phải chờ đợi" },
      { word: "帰っちゃう", reading: "かえっちゃう", meaning: "Đã về mất rồi" },
      { word: "絵描き", reading: "えかき", meaning: "Vẽ tranh" }
    ]
  },
  // --- FEATURED YOUTUBE EPISODE: TIỆM SỬA BẤT ỔN ---
  {
    id: "youtube-Tvsa7Q5x3Zw",
    title: "Tiệm Sửa Bất Ổn (Lượt Của Chị Đấy!)",
    level: "N4",
    category: "Giao Tiếp Hài Hước",
    icon: "💻",
    durationEst: "58 giây",
    description: "Tình huống dở khóc dở cười khi vị khách đi sửa máy tính nói chuyện bỏ lửng câu khiến nhân viên tiệm sửa chữa nổi điên vì 'ngữ pháp bất ổn'.",
    youtubeId: "Tvsa7Q5x3Zw",
    lines: [
      {
        id: "yt-fukuda-1",
        speaker: "Khách hàng (Fukuda)",
        japanese: "これちょっと修理したいんですけど",
        furigana: "これ ちょっと しゅうり したいんですけど",
        romaji: "Kore chotto shuuri shitain desu kedo",
        vietnamese: "Tôi muốn sửa cái này một chút...",
        startTime: 0,
        endTime: 4,
        keywords: [
          { word: "修理", reading: "しゅうり", meaning: "Sửa chữa" },
          { word: "〜たい", reading: "〜たい", meaning: "Muốn làm gì đó" },
          { word: "〜んですけど", reading: "〜んですけど", meaning: "Nhưng mà... (mở lời nhờ vả nhẹ nhàng)" }
        ]
      },
      {
        id: "yt-fukuda-2",
        speaker: "Khách hàng (Fukuda)",
        japanese: "すいません",
        furigana: "すいません",
        romaji: "Suimasen",
        vietnamese: "Xin lỗi...",
        startTime: 4,
        endTime: 6,
        keywords: [
          { word: "すいません", reading: "すいません", meaning: "Xin lỗi / Làm phiền một chút" }
        ]
      },
      {
        id: "yt-kanade-3",
        speaker: "Nhân viên (Kanade)",
        japanese: "あなたのターンですよ？",
        furigana: "あなたの たーん ですよ？",
        romaji: "Anata no taan desu yo?",
        vietnamese: "Đến lượt của chị rồi đấy?",
        startTime: 6,
        endTime: 8,
        keywords: [
          { word: "ターン", reading: "たーん", meaning: "Lượt (Turn)" }
        ]
      },
      {
        id: "yt-fukuda-4",
        speaker: "Khách hàng (Fukuda)",
        japanese: "ターン？",
        furigana: "たーん？",
        romaji: "Taan?",
        vietnamese: "Lượt?",
        startTime: 8,
        endTime: 9,
        keywords: [
          { word: "ターン", reading: "たーん", meaning: "Lượt" }
        ]
      },
      {
        id: "yt-kanade-5",
        speaker: "Nhân viên (Kanade)",
        japanese: "あなた待ちでしょ？",
        furigana: "あなた まち でしょ？",
        romaji: "Anata machi desho?",
        vietnamese: "Tôi đang đợi chị mà?",
        startTime: 9,
        endTime: 11,
        keywords: [
          { word: "待ち", reading: "まち", meaning: "Đang chờ đợi" }
        ]
      },
      {
        id: "yt-kanade-6",
        speaker: "Nhân viên (Kanade)",
        japanese: "『修理したいんですけど』……何ですか？",
        furigana: "『しゅうり したいんですけど』…… なん ですか？",
        romaji: "'Shuuri shitain desu kedo'... Nan desu ka?",
        vietnamese: "Chị bảo 'Tôi muốn sửa cái này'...... rồi sao nữa?",
        startTime: 11,
        endTime: 13,
        keywords: [
          { word: "何ですか", reading: "なんですか", meaning: "Sao cơ / Có chuyện gì thế?" }
        ]
      },
      {
        id: "yt-fukuda-7",
        speaker: "Khách hàng (Fukuda)",
        japanese: "あ、はい。あの、修理したいんです",
        furigana: "あ、はい。あの、しゅうり したいんです",
        romaji: "A, hai. Ano, shuuri shitain desu",
        vietnamese: "À vâng. À thì, tôi muốn sửa...",
        startTime: 14,
        endTime: 16,
        keywords: [
          { word: "〜んです", reading: "〜んです", meaning: "Nhấn mạnh lý do / giải thích" }
        ]
      },
      {
        id: "yt-kanade-8",
        speaker: "Nhân viên (Kanade)",
        japanese: "『修理したいんですけど修理できないんです』だったら文法的に分かるんだけど",
        furigana: "『しゅうり したいんですけど しゅうり できないんです』だったら ぶんぽうてきに わかるんだけど",
        romaji: "'Shuuri shitain desu kedo shuuri dekinain desu' dattara bumpouteki ni wakaru n dakedo",
        vietnamese: "Nếu chị nói 'Tôi muốn sửa nhưng không sửa được' thì về mặt ngữ pháp tôi còn hiểu được...",
        startTime: 16,
        endTime: 20,
        keywords: [
          { word: "文法的", reading: "ぶんぽうてき", meaning: "Về mặt ngữ pháp" },
          { word: "分かる", reading: "わかる", meaning: "Hiểu được" }
        ]
      },
      {
        id: "yt-fukuda-9",
        speaker: "Khách hàng (Fukuda)",
        japanese: "ああ、いや……どうしたらいいかな。あの、ちょっと修理したくて……あ、すいません",
        furigana: "ああ、いや……どうしたら いいかな。あの、ちょっと しゅうり したくて……あ、すいません",
        romaji: "Aa, iya... dou shitara ii ka na. Ano, chotto shuuri shitakute... a, suimasen",
        vietnamese: "À không... vậy giờ phải làm sao nhỉ. Tôi muốn sửa một chút... à xin lỗi.",
        startTime: 21,
        endTime: 25,
        keywords: [
          { word: "どうしたらいい", reading: "どうしたらいい", meaning: "Nên làm thế nào đây" },
          { word: "修理したくて", reading: "しゅうりしたくて", meaning: "Muốn sửa (dạng thể Te)" }
        ]
      },
      {
        id: "yt-kanade-10",
        speaker: "Nhân viên (Kanade)",
        japanese: "だから、あなたのターン！",
        furigana: "だから、あなたの たーん！",
        romaji: "Dakara, anata no taan!",
        vietnamese: "Đã bảo là đến lượt của chị rồi mà!",
        startTime: 26,
        endTime: 28,
        keywords: [
          { word: "だから", reading: "だから", meaning: "Cho nên / Đã bảo là..." }
        ]
      },
      {
        id: "yt-fukuda-11",
        speaker: "Khách hàng (Fukuda)",
        japanese: "私のターン？",
        furigana: "わたし の たーん？",
        romaji: "Watashi no taan?",
        vietnamese: "Lượt của tôi?",
        startTime: 28,
        endTime: 30,
        keywords: [
          { word: "私", reading: "わたし", meaning: "Tôi" }
        ]
      },
      {
        id: "yt-fukuda-12",
        speaker: "Khách hàng (Fukuda)",
        japanese: "時間ないんですよ。ちょっとこれ修理したいんですけど、どうしたらいいですか？",
        furigana: "じかん ないんですよ。ちょっと これ しゅうり したいんですけど、どうしたら いいですか？",
        romaji: "Jikan nain desu yo. Chotto kore shuuri shitain desu kedo, dou shitara ii desu ka?",
        vietnamese: "Tôi không có nhiều thời gian đâu. Tôi muốn sửa cái này một chút thì phải làm thế nào ạ?",
        startTime: 30,
        endTime: 34,
        keywords: [
          { word: "時間ない", reading: "じかんない", meaning: "Không có thời gian" },
          { word: "どうしたらいいですか", reading: "どうしたらいいですか", meaning: "Tôi phải làm sao / làm thế nào?" }
        ]
      },
      {
        id: "yt-kanade-13",
        speaker: "Nhân viên (Kanade)",
        japanese: "『ちょっと修理したい』んですか？ ちょっとでいいの？ 全部直さなくていいってこと？",
        furigana: "『ちょっと しゅうり したい』んですか？ ちょっとで いいの？ ぜんぶ なおさなくて いいってこと？",
        romaji: "'Chotto shuuri shitai'n desu ka? Chotto de ii no? Zembu naosanakute ii tte koto?",
        vietnamese: "'Sửa một chút' là sao? Sửa một chút thôi là được à? Ý là không cần sửa hết toàn bộ hay sao?",
        startTime: 34,
        endTime: 39,
        keywords: [
          { word: "全部", reading: "ぜんぶ", meaning: "Toàn bộ / Tất cả" },
          { word: "直す", reading: "なおす", meaning: "Sửa lại / Chỉnh sửa" },
          { word: "〜ってこと", reading: "〜ってこと", meaning: "Ý là / Nghĩa là..." }
        ]
      },
      {
        id: "yt-kanade-14",
        speaker: "Nhân viên (Kanade)",
        japanese: "あと『修理したい』って何？ あなたがしたいならあなたがすればいいじゃないの？",
        furigana: "あと『しゅうり したい』って なん？ あなたが したいなら あなたが すれば いいじゃないの？",
        romaji: "Ato 'shuuri shitai' tte nan? Anata ga shitai nara anata ga sureba ii ja nai no?",
        vietnamese: "Với lại 'muốn sửa' là sao? Nếu bản thân chị muốn làm thì chị tự đi mà làm chứ?",
        startTime: 40,
        endTime: 44,
        keywords: [
          { word: "〜なら", reading: "〜なら", meaning: "Nếu như..." },
          { word: "〜ばいい", reading: "〜ばいい", meaning: "Làm ... là được chứ sao" }
        ]
      },
      {
        id: "yt-kanade-15",
        speaker: "Nhân viên (Kanade)",
        japanese: "『修理してほしい』でしょ？",
        furigana: "『しゅうり してほしい』でしょ？",
        romaji: "'Shuuri shite hoshii' desho?",
        vietnamese: "Phải nói là 'nhờ sửa giúp' chứ?",
        startTime: 44,
        endTime: 46,
        keywords: [
          { word: "〜てほしい", reading: "〜てほしい", meaning: "Muốn ai đó làm gì cho mình (yêu cầu/nhờ cậy)" }
        ]
      },
      {
        id: "yt-kanade-16",
        speaker: "Nhân viên (Kanade)",
        japanese: "あと『どうしたらいいですか』って何？ どうしたらいいか分かってるからここに持ってきてるんじゃないの？",
        furigana: "あと『どうしたら いいですか』って なん？ どうしたら いいか わかってるから ここに もってきてるんじゃないの？",
        romaji: "Ato 'dou shitara ii desu ka' tte nan? Dou shitara ii ka wakatteru kara koko ni mottekiterun ja nai no?",
        vietnamese: "Lại còn hỏi 'phải làm thế nào' là sao? Chẳng phải vì biết phải làm gì nên chị mới mang đến đây sao?",
        startTime: 47,
        endTime: 52,
        keywords: [
          { word: "持って来る", reading: "もってくる", meaning: "Mang đến" },
          { word: "〜んじゃないの", reading: "〜んじゃないの", meaning: "Chẳng phải là ... hay sao?" }
        ]
      },
      {
        id: "yt-fukuda-17",
        speaker: "Khách hàng (Fukuda)",
        japanese: "旦那にも同じ顔させたことあります……",
        furigana: "だんな にも おなじ かお させたこと あります……",
        romaji: "Danna ni mo onaji kao saseta koto arimasu...",
        vietnamese: "Tôi từng làm cho chồng mình lộ ra vẻ mặt y hệt thế này rồi đấy...",
        startTime: 53,
        endTime: 56,
        keywords: [
          { word: "旦那", reading: "だんな", meaning: "Chồng (cách gọi thân mật/thường ngày)" },
          { word: "同じ顔", reading: "おなじかお", meaning: "Cùng một nét mặt / vẻ mặt y hệt" },
          { word: "〜させたことがある", reading: "〜させたことがある", meaning: "Đã từng khiến/làm cho ai đó phải..." }
        ]
      },
      {
        id: "yt-kanade-18",
        speaker: "Nhân viên (Kanade)",
        japanese: "でしょうね！ 虚無なんですよ！",
        furigana: "でしょうね！ きょむ なんですよ！",
        romaji: "Deshou ne! Kyomu nan desu yo!",
        vietnamese: "Chắc chắn rồi! Cảm giác trống rỗng vô hồn luôn ấy chứ!",
        startTime: 56,
        endTime: 58,
        keywords: [
          { word: "でしょうね", reading: "でしょうね", meaning: "Chắc chắn là vậy rồi / Chuẩn luôn" },
          { word: "虚無", reading: "きょむ", meaning: "Hư vô / Cảm giác trống rỗng, bất lực" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "修理", reading: "しゅうり", meaning: "Sửa chữa" },
      { word: "文法的", reading: "ぶんぽうてき", meaning: "Về mặt ngữ pháp" },
      { word: "〜てほしい", reading: "〜てほしい", meaning: "Nhờ người khác làm gì cho mình" },
      { word: "直す", reading: "なおす", meaning: "Sửa lại / Khắc phục" },
      { word: "旦那", reading: "だんな", meaning: "Chồng (của mình)" },
      { word: "虚無", reading: "きょむ", meaning: "Hư vô / Cảm giác trống rỗng, bất lực" }
    ]
  },
  // --- FEATURED YOUTUBE EPISODE: KẾ HOẠCH CUỐI TUẦN CỦA SAKUTA ---
  {
    id: "youtube-ZMbzhrlOY6E",
    title: "Kế Hoạch Cuối Tuần Của Sakuta",
    level: "N4",
    category: "Hội Thoại Anime",
    icon: "🌸",
    durationEst: "35 giây",
    description: "Đoạn hội thoại gia đình vui nhộn giữa Sakuta, em gái Kaede và Mai-san về kế hoạch đi chơi và hẹn hò cuối tuần.",
    youtubeId: "ZMbzhrlOY6E",
    lines: [
      {
        id: "yt-sakuta-1",
        speaker: "花楓 (Kaede)",
        japanese: "そうだ、お兄ちゃんは……えっと",
        furigana: "そうだ、お にい ちゃんは……えっと",
        romaji: "Sou da, oniichan wa... etto",
        vietnamese: "À đúng rồi, anh hai thì... ừm...",
        startTime: 0,
        endTime: 4,
        keywords: [
          { word: "お兄ちゃん", reading: "おにいちゃん", meaning: "Anh hai / Anh trai" },
          { word: "そうだ", reading: "そうだ", meaning: "À phải rồi / Đúng rồi" }
        ]
      },
      {
        id: "yt-sakuta-2",
        speaker: "咲太 (Sakuta)",
        japanese: "なんだよ？",
        furigana: "なんだよ？",
        romaji: "Nan da yo?",
        vietnamese: "Gì thế?",
        startTime: 4,
        endTime: 5,
        keywords: [
          { word: "なんだよ", reading: "なんだよ", meaning: "Gì vậy / Có chuyện gì?" }
        ]
      },
      {
        id: "yt-sakuta-3",
        speaker: "花楓 (Kaede)",
        japanese: "明日と明後日、どうしてる？",
        furigana: "あした と あさって、どうしてる？",
        romaji: "Ashita to asatte, dou shiteru?",
        vietnamese: "Ngày mai với ngày kia anh định làm gì?",
        startTime: 5,
        endTime: 8,
        keywords: [
          { word: "明日", reading: "あした", meaning: "Ngày mai" },
          { word: "明後日", reading: "あさって", meaning: "Ngày kia" },
          { word: "どうしてる", reading: "どうしてる", meaning: "Định làm gì / Thế nào rồi" }
        ]
      },
      {
        id: "yt-sakuta-4",
        speaker: "咲太 (Sakuta)",
        japanese: "土曜日と日曜日を満喫している予定。",
        furigana: "どようび と にちようび を まんきつ している よてい。",
        romaji: "Doyoubi to nichiyoubi o mankitsu shite iru yotei.",
        vietnamese: "Dự định là sẽ tận hưởng trọn vẹn thứ Bảy và Chủ Nhật.",
        startTime: 8,
        endTime: 11,
        keywords: [
          { word: "満喫", reading: "まんきつ", meaning: "Tận hưởng trọn vẹn / Thưởng thức hết mình" },
          { word: "予定", reading: "よてい", meaning: "Dự định / Kế hoạch" }
        ]
      },
      {
        id: "yt-sakuta-5",
        speaker: "花楓 (Kaede)",
        japanese: "ヒマか聞いてるの！むー…",
        furigana: "ひま か きいてる の！むー…",
        romaji: "Hima ka kiiteru no! Muu...",
        vietnamese: "Em hỏi là anh có rảnh không cơ mà! Hứ...",
        startTime: 11,
        endTime: 15,
        keywords: [
          { word: "ヒマ", reading: "ひま", meaning: "Rảnh rỗi" },
          { word: "聞く", reading: "きく", meaning: "Hỏi / Lắng nghe" }
        ]
      },
      {
        id: "yt-sakuta-6",
        speaker: "咲太 (Sakuta)",
        japanese: "明日はバイト、日曜は麻衣さんとデートして、麻衣さんに甘えて、麻衣さんに甘やかされるのに忙しい。",
        furigana: "あした は ばいと、にちよう は まい さんと でーと して、まい さんに あまえて、まい さんに あまやかされる のに いそがしい。",
        romaji: "Ashita wa baito, nichiyou wa Mai-san to deeto shite, Mai-san ni amaete, Mai-san ni amayakasareru no ni isogashii.",
        vietnamese: "Mai thì đi làm thêm, Chủ Nhật thì bận hẹn hò với chị Mai, làm nũng chị Mai rồi được chị Mai cưng chiều.",
        startTime: 15,
        endTime: 23,
        keywords: [
          { word: "バイト", reading: "ばいと", meaning: "Làm thêm (Arubaito)" },
          { word: "甘える", reading: "あまえる", meaning: "Làm nũng / Dựa dẫm" },
          { word: "甘やかす", reading: "あまやかす", meaning: "Nuông chiều / Cưng chiều" },
          { word: "忙しい", reading: "いそがしい", meaning: "Bận rộn" }
        ]
      },
      {
        id: "yt-sakuta-7",
        speaker: "花楓 (Kaede)",
        japanese: "むー。それじゃ困るよぉ。",
        furigana: "むー。それじゃ こまる よぉ。",
        romaji: "Muu. Sore ja komaru yo.",
        vietnamese: "Hứ, thế thì phiền phức thật đó.",
        startTime: 23,
        endTime: 26,
        keywords: [
          { word: "困る", reading: "こまる", meaning: "Khó khăn / Phiền toái / Rắc rối" }
        ]
      },
      {
        id: "yt-sakuta-8",
        speaker: "麻衣 (Mai)",
        japanese: "大丈夫よ、花楓ちゃん。私、週末は用事あるから。",
        furigana: "だいじょうぶ よ、かえで ちゃん。わたし、しゅうまつ は ようじ あるから。",
        romaji: "Daijoubu yo, Kaede-chan. Watashi, shuumatsu wa youji aru kara.",
        vietnamese: "Không sao đâu Kaede-chan. Cuối tuần chị có việc bận rồi.",
        startTime: 26,
        endTime: 29,
        keywords: [
          { word: "週末", reading: "しゅうまつ", meaning: "Cuối tuần" },
          { word: "用事", reading: "ようじ", meaning: "Công việc bận / Việc riêng" }
        ]
      },
      {
        id: "yt-sakuta-9",
        speaker: "咲太 (Sakuta)",
        japanese: "えー、仕事？",
        furigana: "えー、しごと？",
        romaji: "Ee, shigoto?",
        vietnamese: "Hả, công việc á?",
        startTime: 29,
        endTime: 31,
        keywords: [
          { word: "仕事", reading: "しごと", meaning: "Công việc" }
        ]
      },
      {
        id: "yt-sakuta-10",
        speaker: "麻衣 (Mai)",
        japanese: "まあ、そんな感じ。",
        furigana: "まあ、そんな かんじ。",
        romaji: "Maa, sonna kanji.",
        vietnamese: "Ừm, kiểu kiểu vậy.",
        startTime: 31,
        endTime: 33,
        keywords: [
          { word: "そんな感じ", reading: "そんなかんじ", meaning: "Đại loại là thế / Kiểu kiểu như vậy" }
        ]
      },
      {
        id: "yt-sakuta-11",
        speaker: "咲太 (Sakuta)",
        japanese: "どんな感じ…？",
        furigana: "どんな かんじ…？",
        romaji: "Donna kanji...?",
        vietnamese: "Kiểu kiểu vậy là sao chứ...?",
        startTime: 33,
        endTime: 35,
        keywords: [
          { word: "どんな感じ", reading: "どんなかんじ", meaning: "Kiểu như thế nào cơ?" }
        ]
      }
    ],
    summaryKeywords: [
      { word: "満喫", reading: "まんきつ", meaning: "Tận hưởng trọn vẹn" },
      { word: "甘える", reading: "あまえる", meaning: "Làm nũng, dựa dẫm" },
      { word: "甘やかす", reading: "あまやかす", meaning: "Cưng chiều, nuông chiều" },
      { word: "週末", reading: "しゅうまつ", meaning: "Cuối tuần" },
      { word: "用事", reading: "ようじ", meaning: "Việc bận / Việc riêng" },
      { word: "そんな感じ", reading: "そんなかんじ", meaning: "Đại loại như thế" }
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
