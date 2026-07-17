export interface DialogueExample {
  q: string;
  qh: string;
  qr: string;
  qv: string;
  a: string;
  ah: string;
  ar: string;
  av: string;
}

export interface QuestionWordItem {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  category: "kosoado" | "nani_group" | "reasons" | "general" | "advanced";
  desc: string;
  examples: DialogueExample[];
}

export interface QuizItem {
  id: number;
  question: string;
  answer: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const MASTER_SENSEI_DATA: QuestionWordItem[] = [
  // ================= TAB I: HỆ KO-SO-A-DO =================
  {
    id: "kore", word: "これ", reading: "Kore", meaning: "Cái này", category: "kosoado", desc: "Đại từ chỉ định dùng để chỉ vật ở gần người nói. Thường đứng độc lập làm chủ ngữ.",
    examples: [
      { q: "これは何ですか。", qh: "これ は なん です か。", qr: "Kore wa nan desu ka?", qv: "Đây là cái gì?", a: "これは和菓子です。", ah: "これ は わがし です。", ar: "Kore wa wagashi desu.", av: "Đây là bánh ngọt truyền thống Nhật Bản." },
      { q: "これは誰のペンですか。", qh: "これ は だれ の ペン です か。", qr: "Kore wa dare no pen desu ka?", qv: "Đây là bút của ai?", a: "それは山田さんのです。", ah: "それ は やまだ さん の です。", ar: "Sore wa Yamada-san no desu.", av: "Đó là của anh Yamada." }
    ]
  },
  {
    id: "dore", word: "どれ", reading: "Dore", meaning: "Cái nào", category: "kosoado", desc: "Đại từ dùng để chọn 1 vật bất kỳ trong số từ 3 đối tượng trở lên.",
    examples: [
      { q: "あなたの傘はどれですか。", qh: "あなた の かさ は どれ です か。", qr: "Anata no kasa wa dore desu ka?", qv: "Ô của bạn là cái nào?", a: "あの青い傘です。", ah: "あの あおい かさ です。", ar: "Ano aoi kasa desu.", av: "Là chiếc ô màu xanh đằng kia." },
      { q: "どれが一番おすすめですか。", qh: "どれ が いちばん おすすめ です か。", qr: "Dore ga ichiban osusume desu ka?", qv: "Cái nào là gợi ý tốt nhất ạ?", a: "この特製ラーメンです。", ah: "この とくせい ラーメン です。", ar: "Kono tokusei raamen desu.", av: "Là món mì ramen đặc biệt này ạ." }
    ]
  },
  {
    id: "dono", word: "どの (+ N)", reading: "Dono", meaning: "[Danh từ] nào", category: "kosoado", desc: "Từ chỉ định đi kèm danh từ ngay phía sau để hỏi rõ đối tượng cụ thể nào.",
    examples: [
      { q: "どの本が面白いですか。", qh: "どの ほん が おもしろい です か。", qr: "Dono hon ga omoshiroi desu ka?", qv: "Quyển sách nào hay thế?", a: "この日本の歴史の本です。", ah: "この にほん の れきし の ほん です。", ar: "Kono nihon no rekishi no hon desu.", av: "Là quyển sách lịch sử Nhật Bản này." },
      { q: "どの部屋が鈴木さんの部屋ですか。", qh: "どの へや が すずき さん の へや です か。", qr: "Dono heya ga Suzuki-san no heya desu ka?", qv: "Phòng nào là phòng của anh Suzuki?", a: "二階の一番奥 of 部屋です。", ah: "にかい の いちばん おく の へや です。", ar: "Nikai no ichiban oku no heya desu.", av: "Là phòng ở tận cùng phía trong của tầng 2." }
    ]
  },
  {
    id: "doko", word: "どこ", reading: "Doko", meaning: "Ở đâu", category: "kosoado", desc: "Nghi vấn từ dùng để hỏi vị trí, địa điểm của người, sự vật hoặc hành động.",
    examples: [
      { q: "お手洗いはどこですか。", qh: "おてあらい は どこ です か。", qr: "Otearai wa doko desu ka?", qv: "Nhà vệ sinh ở đâu vậy?", a: "あそこの階段の隣です。", ah: "あそこ の かいだん の となり です。", ar: "Asoko no kaidan no tonari desu.", av: "Ở đằng kia, bên cạnh cầu thang." },
      { q: "どこで日本語を勉強していますか。", qh: "どこ で にほんご を べんきょう しています か。", qr: "Doko de nihongo o benkyou shite imasu ka?", qv: "Bạn học tiếng Nhật ở đâu?", a: "さくらセンターで勉強しています。", ah: "さくら センター で べんきょう しています。", ar: "Sakura sentaa de benkyou shite imasu.", av: "Tôi học ở trung tâm Sakura." }
    ]
  },
  {
    id: "dochira", word: "どちら", reading: "Dochira", meaning: "Nơi nào / Hướng nào / Cái nào", category: "kosoado", desc: "Thể lịch sự của 'Doko', 'Dare' (khi thêm 様) hoặc dùng chọn 1 trong 2 vật.",
    examples: [
      { q: "お国はどちらですか。", qh: "おくに は どちら です か。", qr: "Okuni wa dochira desu ka?", qv: "Đất nước của bạn ở đâu vậy ạ? (Lịch sự)", a: "ベトナムです。", ah: "ベトナム です。", ar: "Betonamu desu.", av: "Dạ là Việt Nam ạ." },
      { q: "紅茶とコーヒー、どちらがいいですか。", qh: "こうちゃ と コーヒー、どちら が いい です か。", qr: "Koucha to koohii, dochira ga ii desu ka?", qv: "Hồng trà và cà phê, bạn thích cái nào hơn?", a: "コーヒーをお願いします。", ah: "コーヒー を おねがいします。", ar: "Koohii o onegai shimasu.", av: "Cho tôi xin cà phê nhé." }
    ]
  },
  {
    id: "dotchi", word: "どっち", reading: "Dotchi", meaning: "Phía nào / Cái nào (Thân mật)", category: "kosoado", desc: "Lối nói suồng sã, thân mật dùng trong hội thoại hằng ngày của từ 'どちら'.",
    examples: [
      { q: "今日のランチ、パスタとピザどっちにする？", qh: "きょう の ランチ、パスタ と ピザ どっち に する？", qr: "Kyou no ranchi, pasuta to piza dotchi ni suru?", qv: "Trưa nay ăn mì Ý hay pizza, chọn cái nào đây?", a: "パスタにしよう！", ah: "パスタ に しよう！", ar: "Pasuta ni shiyou!", av: "Ăn mì Ý đi!" },
      { q: "どっちの服が可愛いと思う？", qh: "どっち の ふく が かわいい と おもう？", qr: "Dotchi no fuku ga kawaii to omou?", qv: "Cậu nghĩ bộ đồ nào dễ thương hơn?", a: "右のピンクのワンピースだよ。", ah: "みぎ の ピンク の ワンピース だよ。", ar: "Migi no pinku no wanpiisu dayo.", av: "Cái váy liền màu hồng bên phải đó." }
    ]
  },
  {
    id: "donata", word: "どなた", reading: "Donata", meaning: "Ai (Kính ngữ)", category: "kosoado", desc: "Cách hỏi lịch sự và tôn kính đối phương của từ 'だれ' (Ai).",
    examples: [
      { q: "失礼ですが、どなた様でしょうか。", qh: "しつれい です が、どなた さま でしょう か。", qr: "Shitsurei desu ga, donata-sama deshou ka?", qv: "Xin lỗi, tôi có thể hỏi quý danh vị nào thế ạ?", a: "山田商事の佐藤と申します。", ah: "やまだ しょうじ の さとう と もうします。", ar: "Yamada shouji no Satou to moushimasu.", av: "Tôi là Sato bên công ty thương mại Yamada." },
      { q: "あちらにいらっしゃる方はどなたですか。", qh: "あちら に いらっしゃる かた は どなた です か。", qr: "Achira ni irassharu kata wa donata desu ka?", qv: "Vị đang ở đằng kia là ai thế ạ?", a: "本校の校長先生でございます。", ah: "ほんこう の こうちょう せんせい で ございます。", ar: "Honkou no kouchou sensei de gozaimasu.", av: "Dạ là thầy Hiệu trưởng của trường chúng tôi ạ." }
    ]
  },
  {
    id: "dare", word: "だれ", reading: "Dare", meaning: "Ai (Thông thường)", category: "kosoado", desc: "Nghi vấn từ cơ bản để hỏi danh tính con người trong cuộc sống thường nhật.",
    examples: [
      { q: "あの人は誰ですか。", qh: "あの ひと は だれ です か。", qr: "Ano hito wa dare desu ka?", qv: "Người kia là ai thế?", a: "田中さんの新しい友達です。", ah: "たなか さん の あたらしい ともだち です。", ar: "Tanaka-san no atarashii tomodachi desu.", av: "Là bạn mới của anh Tanaka." },
      { q: "誰がこの料理を作りましたか。", qh: "だれ が この りょうり を つくりました か。", qr: "Dare ga kono ryouri o tsukurimashita ka?", qv: "Ai đã nấu món ăn này thế?", a: "母が作ってくれました。", ah: "はは が つくって くれました。", ar: "Haha ga tsukutte kuremashita.", av: "Mẹ đã nấu cho tôi đấy." }
    ]
  },
  {
    id: "dou", word: "どう", reading: "Dou", meaning: "Như thế nào (Ý kiến / Trạng thái)", category: "kosoado", desc: "Hỏi về tính chất, ý kiến, phương pháp hoặc tình trạng của sự việc.",
    examples: [
      { q: "日本の生活はどうですか。", qh: "にほん の せいかつ は どう です か。", qr: "Nihon no seikatsu wa dou desu ka?", qv: "Cuộc sống ở Nhật Bản thế nào?", a: "とても忙しいですが、楽しいです。", ah: "とても いそがしい です が、たのしい です。", ar: "Totemo isogashii desu ga, tanoshii desu.", av: "Rất bận rộn nhưng mà vui vẻ." },
      { q: "スマホが壊れたんですが、どうすればいいですか。", qh: "スマホ が こわれた ん です が、どう すれば いい です か。", qr: "Sumaho ga kowareta n desu ga, dou sureba ii desu ka?", qv: "Điện thoại bị hỏng rồi, tôi nên làm thế nào bây giờ?", a: "修理店に持って行くといいですよ。", ah: "しゅうりてん に もっていく と いい です よ。", ar: "Shuuriten ni motte iku to ii desu yo.", av: "Bạn đem ra tiệm sửa là tốt nhất." }
    ]
  },
  {
    id: "donna", word: "どんな (+ N)", reading: "Donna", meaning: "[Danh từ] như thế nào", category: "kosoado", desc: "Đi kèm trước danh từ để hỏi đặc điểm, tính chất, chủng loại của sự vật đó.",
    examples: [
      { q: "どんな音楽が好きですか。", qh: "どんな おんがく が すき です か。", qr: "Donna ongaku ga suki desu ka?", qv: "Bạn thích loại nhạc như thế nào?", a: "クラシックなどの静かな音楽が好きです。", ah: "クラシック など の しずかな おんがく が すき です。", ar: "Kurashikku nado no shizukana ongaku ga suki desu.", av: "Tôi thích nhạc yên tĩnh như nhạc cổ điển." },
      { q: "ハノイはどんな街ですか。", qh: "ハノイ は どんな まち です か。", qr: "Hanoi wa donna machi desu ka?", qv: "Hà Nội là một thành phố thế nào?", a: "賑やかred、歴史が古い街です。", ah: "にぎやか で、れきし が ふるい まち です。", ar: "Nigiyaka de, rekishi ga furui machi desu.", av: "Là một thành phố náo nhiệt và cổ kính." }
    ]
  },

  // ================= TAB II: GHÉP VỚI CHỮ 何 =================
  {
    id: "nani", word: "何 (なに)", reading: "Nani", meaning: "Cái gì (Thường dùng độc lập)", category: "nani_group", desc: "Đọc là Nani khi đứng trước trợ từ を, が hoặc khi dùng độc lập không bị ảnh hưởng biến âm.",
    examples: [
      { q: "朝ご飯に何を食べましたか。", qh: "あさごはん に なに を たべました か。", qr: "Asagohan ni nani o tabemashita ka?", qv: "Sáng nay bạn đã ăn cái gì thế?", a: "パンと牛乳を食べました。", ah: "パン と ぎゅうにゅう を たべました。", ar: "Pan to gyuunyuu o tabemashita.", av: "Tôi đã ăn bánh mì và sữa tươi." },
      { q: "何をお探しですか。", qh: "なに を おさがし です か。", qr: "Nani o osagashi desu ka?", qv: "Bạn đang tìm cái gì vậy ạ?", a: "日本語の辞書を探しています。", ah: "にほんご の じしょ を さがしています。", ar: "Nihongo no jisho o sagashite imasu.", av: "Tôi đang tìm cuốn từ điển tiếng Nhật." }
    ]
  },
  {
    id: "nan", word: "何 (なん)", reading: "Nan", meaning: "Cái gì (Trước t, d, n / Đơn vị đếm)", category: "nani_group", desc: "Biến âm đọc của chữ 何. Bắt buộc đọc là Nan trước hàng t, d, n và trước các hậu tố đếm.",
    examples: [
      { q: "これは何ですか。", qh: "これ は なん です か。", qr: "Kore wa nan desu ka?", qv: "Đây là cái gì?", a: "これはお土産のクッキーです。", ah: "これ は おみやげ の クッキー です。", ar: "Kore wa omiyage no kukkii desu.", av: "Đây là bánh quy làm quà lưu niệm." },
      { q: "ご趣味は何ですか。", qh: "ごしゅみ は なん です か。", qr: "Goshumi wa nan desu ka?", qv: "Sở thích của anh là gì?", a: "写真撮影と旅行です。", ah: "しゃしん さつえい と りょこう です。", ar: "Shashin satsuei to ryokou desu.", av: "Sở thích của tôi là chụp ảnh và du lịch." }
    ]
  },
  {
    id: "nande_what", word: "何で (なんで)", reading: "Nande", meaning: "Tại sao / Bằng cái gì (Thân mật)", category: "nani_group", desc: "Trong văn nói thân mật có hai nghĩa: 1. Tại sao, 2. Bằng phương tiện, cách thức nào.",
    examples: [
      { q: "なんで昨日、学校を休んだの？", qh: "なんで きのう、がっこう を やすんだ の？", qr: "Nande kinou, gakkou o yasunda no?", qv: "Sao hôm qua cậu lại nghỉ học thế?", a: "風邪をひいて熱があったんだ。", ah: "かぜ を ひいて ねつ が あったんだ。", ar: "Kaze o hiite netsu ga attanda.", av: "Vì tớ bị cảm lạnh và sốt." },
      { q: "会社までなんで行っている của cậu?", qh: "かいしゃ まで なんで いっている の？", qr: "Kaisha made nande itte iru no?", qv: "Cậu đi đến công ty bằng phương tiện gì vậy?", a: "自転車で行っているよ。", ah: "じてんしゃ で いっている よ。", ar: "Jitensha de itte iru yo.", av: "Tớ đi bằng xe đạp đấy." }
    ]
  },
  {
    id: "nan_no_tame_ni", word: "何のために", reading: "Nan no tame ni", meaning: "Để làm gì / Vì mục đích gì", category: "nani_group", desc: "Cụm hỏi làm rõ mục đích, ý định hướng tới của hành động.",
    examples: [
      { q: "何のために日本語を勉強しているのですか。", qh: "なん の ため に にほんご を べんきょう している の です か。", qr: "Nan no tame ni nihongo o benkyou shite imasu ka?", qv: "Bạn học tiếng Nhật để làm gì vậy?", a: "将来、日本のIT企業で働くためです。", ah: "しょうらい、にほん の アイティー きぎょう で はたらく ため です。", ar: "Shourai, nihon no aitii kigyou de hataraku tame desu.", av: "Để sau này làm việc tại một công ty IT Nhật Bản." },
      { q: "このボタンは何のために使うのですか。", qh: "この ボタン は なん の ため に つかう の です か。", qr: "Kono botan wa nan no tame ni tsukau no desu ka?", qv: "Cái nút bấm này dùng để làm gì?", a: "機械を緊急停止するために使います。", ah: "きかい を きんきゅうていし する ため に つかいます。", ar: "Kikai o kinkyuteishi suru tame ni tsukaimasu.", av: "Dùng để dừng máy khẩn cấp khi có sự cố." }
    ]
  },
  {
    id: "nanimono", word: "何者 (なにもの)", reading: "Nanimono", meaning: "Kẻ nào / Ai (Bí ẩn, dò hỏi)", category: "nani_group", desc: "Hỏi danh tính với sắc thái nghi ngờ, bí ẩn hoặc cảnh giác. Dùng nhiều trong tiểu thuyết, phim ảnh.",
    examples: [
      { q: "あそこの黒い服の人、何者ですか。", qh: "あそこ の くろい ふく の ひと、なにもの です か。", qr: "Asoko no kuroi fuku no hito, nanimono desu ka?", qv: "Người mặc đồ đen đằng kia là kẻ nào thế?", a: "新しい警備員ですよ。", ah: "あたらしい けいびいん です よ。", ar: "Atarashii keibiin desu yo.", av: "Là bảo vệ mới đấy mà." },
      { q: "あのお面をつけた男は何者だ？", qh: "あの おめん を つけた おとこ は なにもの だ？", qr: "Ano omen o tsuketa otoko wa nanimono da?", qv: "Gã đeo mặt nạ đằng kia là kẻ nào thế?", a: "お祭りのパフォーマーらしいよ。", ah: "おまつり の パフォーマー らしい よ。", ar: "Omatsuri no pafoomaa rashii yo.", av: "Nghe nói là diễn viên biểu diễn lễ hội đó." }
    ]
  },
  {
    id: "nanji", word: "何時 (なんじ)", reading: "Nanji", meaning: "Mấy giờ", category: "nani_group", desc: "Hỏi về mốc giờ giấc cụ thể trong ngày.",
    examples: [
      { q: "今、何時ですか。", qh: "いま、なんじ です か。", qr: "Ima, nanji desu ka?", qv: "Bây giờ là mấy giờ?", a: "午後3時半です。", ah: "ごご さんじはん です。", ar: "Gogo sanjihan desu.", av: "Bây giờ là 3 giờ rưỡi chiều." },
      { q: "明日の会議は何時からですか。", qh: "あした の かいぎ は なんじ から です か。", qr: "Ashita no kaigi wa nanji kara desu ka?", qv: "Cuộc họp ngày mai từ mấy giờ thế?", a: "午前10時からです。", ah: "ごぜん じゅうじ から です。", ar: "Gozen juuji kara desu.", av: "Từ 10 giờ sáng." }
    ]
  },
  {
    id: "nanpun", word: "何分 (なんぷん)", reading: "Nanpun", meaning: "Mấy phút / Bao nhiêu phút", category: "nani_group", desc: "Hỏi số phút cụ thể hoặc thời lượng số phút trôi qua.",
    examples: [
      { q: "今、何時何分ですか。", qh: "いま、なんじ なんぷん です か。", qr: "Ima, nanji nanpun desu ka?", qv: "Bây giờ là mấy giờ mấy phút?", a: "10時15分です。", ah: "じゅうじ じゅうごふん です。", ar: "Juuji juugofun desu.", av: "Là 10 giờ 15 phút." },
      { q: "駅まで歩いて何分かかりますか。", qh: "えき まで あるいて なんぷん かかります か。", qr: "Eki made aruite nanpun kakarimasu ka?", qv: "Đi bộ ra ga mất mấy phút?", a: "だいたい10分くらいです。", ah: "だいたい じゅっぷん くらい です。", ar: "Daitai juppun kurai desu.", av: "Tầm khoảng 10 phút." }
    ]
  },
  {
    id: "nanyoubi", word: "何曜日 (なんようび)", reading: "Nanyoubi", meaning: "Thứ mấy", category: "nani_group", desc: "Dùng để hỏi thứ trong tuần từ thứ Hai đến chủ Nhật.",
    examples: [
      { q: "今日は何曜日ですか。", qh: "きょう は なんようび です か。", qr: "Kyou wa nanyoubi desu ka?", qv: "Hôm nay là thứ mấy?", a: "木曜日ですよ。", ah: "もくようび です よ。", ar: "Mokuyoubi desu yo.", av: "Là thứ Năm đấy." },
      { q: "日本語のクラスは何曜日ですか。", qh: "にほんご の クラス は なんようび です か。", qr: "Nihongo no kurasu wa nanyoubi desu ka?", qv: "Lớp học tiếng Nhật của bạn vào thứ mấy?", a: "月曜日と木曜日です。", ah: "げつようび と もくようび です。", ar: "Getsuyoubi to mokuyoubi desu.", av: "Vào thứ Hai và thứ Năm." }
    ]
  },
  {
    id: "nannichi", word: "何日 (なんにち)", reading: "Nannichi", meaning: "Ngày mấy / Mấy ngày", category: "nani_group", desc: "Dùng để hỏi ngày cụ thể trong tháng hoặc hỏi khoảng thời gian kéo dài bao nhiêu ngày.",
    examples: [
      { q: "今日は何日ですか。", qh: "きょう は なんにち です か。", qr: "Kyou wa nannichi desu ka?", qv: "Hôm nay là ngày mùng mấy?", a: "10月20日です。", ah: "じゅうがつ はつか です。", ar: "Juugatsu hatsuka desu.", av: "Là ngày 20 tháng 10." },
      { q: "日本への出張は何日間ですか。", qh: "にほん へ の しゅっちょう は なんにちかん です か。", qr: "Nihon e no shucchou wa nannichikan desu ka?", qv: "Chuyến công tác Nhật Bản kéo dài mấy ngày?", a: "5日間の予定です。", ah: "ごにchかん の よてい です。", ar: "Gonichikan no yotei desu.", av: "Dự kiến diễn ra trong 5 ngày." }
    ]
  },
  {
    id: "nankagetsu", word: "何ヶ月 (なんかげつ)", reading: "Nankagetsu", meaning: "Mấy tháng", category: "nani_group", desc: "Dùng để hỏi số lượng tháng của một khoảng thời gian.",
    examples: [
      { q: "日本語を何ヶ月勉強しましたか。", qh: "にほんご を なんかげつ べんきょう しました か。", qr: "Nihongo o nankagetsu benkyou shimashita ka?", qv: "Bạn đã học tiếng Nhật được mấy tháng rồi?", a: "6ヶ月勉強しました。", ah: "ろっかげつ べんきょう しました。", ar: "Rokkagetsu benkyou shimashita.", av: "Tôi đã học được 6 tháng rồi." },
      { q: "日本留学まであと何ヶ月ありますか。", qh: "にほん りゅうがく まで あと なんかげつ あります か。", qr: "Nihon ryuugaku made ato nankagetsu arimasu ka?", qv: "Cho đến khi đi du học Nhật Bản còn mấy tháng nữa?", a: "あと3ヶ月ありますよ。", ah: "あと さんかげつ あります よ。", ar: "Ato sankagetsu arimasu yo.", av: "Còn 3 tháng nữa đấy." }
    ]
  },
  {
    id: "nangatsu", word: "何月 (なんがつ)", reading: "Nangatsu", meaning: "Tháng mấy", category: "nani_group", desc: "Dùng để hỏi mốc tháng trong năm (Tháng 1 đến tháng 12).",
    examples: [
      { q: "今は何月ですか。", qh: "いま は なんがつ です か。", qr: "Ima wa nangatsu desu ka?", qv: "Bây giờ là tháng mấy?", a: "10月ですよ。", ah: "じゅうがつ です よ。", ar: "Juugatsu desu yo.", av: "Là tháng 10 đấy." },
      { q: "何月に日本へ行きますか。", qh: "なんがつ に にほん へ いきます か。", qr: "Nangatsu ni nihon e ikimasu ka?", qv: "Bạn đi Nhật vào tháng mấy?", a: "来年の4月に行きます。", ah: "らいねん の よんがつ に いきます。", ar: "Rainen no yongatsu ni ikimasu.", av: "Tôi đi vào tháng 4 năm sau." }
    ]
  },
  {
    id: "nannen", word: "何年 (なんねん)", reading: "Nannen", meaning: "Năm mấy / Mấy năm", category: "nani_group", desc: "Dùng để hỏi năm cụ thể (Năm mấy) hoặc khoảng thời gian kéo dài mấy năm.",
    examples: [
      { q: "今年は西暦何年ですか。", qh: "ことし は せいれき なんねん です か。", qr: "Kotoshi wa seireki nannen desu ka?", qv: "Năm nay là dương lịch năm bao nhiêu?", a: "2026年です。", ah: "にせんにじゅうろくねん です。", ar: "Nisen nijuuroku nen desu.", av: "Là năm 2026." },
      { q: "日本に何年住んでいますか。", qh: "にほん に なんねん すんでいます か。", qr: "Nihon ni nannen sunde imasu ka?", qv: "Bạn sống ở Nhật mấy năm rồi?", a: "3年住んでいます。", ah: "さんねん すんでいます。", ar: "Sannen sunde imasu.", av: "Tôi sống được 3 năm rồi." }
    ]
  },
  {
    id: "nanseiki", word: "何世紀 (なんせいき)", reading: "Nanseiki", meaning: "Thế kỷ mấy", category: "nani_group", desc: "Dùng để hỏi mốc thế kỷ cụ thể trong lịch sử.",
    examples: [
      { q: "今は何世紀ですか。", qh: "いま は なんせいき です か。", qr: "Ima wa nanseiki desu ka?", qv: "Bây giờ là thế kỷ thứ mấy?", a: "21世紀です。", ah: "にじゅういっせいき です。", ar: "Nijuu Isseiki desu.", av: "Là thế kỷ thứ 21." },
      { q: "この建物は何世紀に建てられましたか。", qh: "この たてもの は なんせいき に たてられました か。", qr: "Kono tatemono wa nanseiki ni tateraremashita ka?", qv: "Tòa nhà này được xây từ thế kỷ thứ mấy?", a: "15世紀の終わりに建てられました。", ah: "じゅうごせいき の おわり に たてられました。", ar: "Juugoseiki no owari ni tateraremashita.", av: "Xây vào cuối thế kỷ 15." }
    ]
  },
  {
    id: "nansai", word: "何歳 (なんさい)", reading: "Nansai", meaning: "Mấy tuổi", category: "nani_group", desc: "Từ hỏi tuổi tác phổ thông. Khi hỏi lịch sự hơn, người ta đổi thành 'Oikutsu'.",
    examples: [
      { q: "田中さんは何歳ですか。", qh: "たなか さん は なんさい です か。", qr: "Tanaka-san wa nansai desu ka?", qv: "Anh Tanaka bao nhiêu tuổi rồi?", a: "今年で28歳になりました。", ah: "ことし で にじゅうhaっさい に なりました。", ar: "Kotoshi de nijuuhassai ni narimashita.", av: "Tôi đã tròn 28 tuổi trong năm nay." },
      { q: "お子さんは何歳ですか。", qh: "おこさん は なんさい です か。", qr: "Okosan wa nansai desu ka?", qv: "Cháu bé nhà anh chị mấy tuổi rồi?", a: "5歳になりました。", ah: "ごさい に なりました。", ar: "Gosai ni narimashita.", av: "Cháu lên 5 tuổi rồi." }
    ]
  },
  {
    id: "nanko", word: "何個 (なんこ)", reading: "Nanko", meaning: "Mấy cái (vật nhỏ, tròn...)", category: "nani_group", desc: "Đơn vị đếm đồ vật có kích thước nhỏ như hoa quả, trứng, tẩy, hộp nhỏ.",
    examples: [
      { q: "りんごを何個買いましたか。", qh: "りんご を なんこ かいました か。", qr: "Ringo o nanko kaimashita ka?", qv: "Bạn đã mua mấy quả táo?", a: "5個買いました。", ah: "ごこ かいました。", ar: "Goko kaimashita.", av: "Tôi đã mua 5 quả." },
      { q: "消しゴムは何個必要ですか。", qh: "けしゴム は なんこ ひつよう です か。", qr: "Keshigomu wa nanko hitsuyou desu ka?", qv: "Bạn cần bao nhiêu cục tẩy?", a: "20個必要です。", ah: "にじゅうこ ひつよう です。", ar: "Nijuuko hitsuyou desu.", av: "Cần 20 cục." }
    ]
  },
  {
    id: "nanbon", word: "何本 (なんぼん)", reading: "Nanbon", meaning: "Mấy cái / chiếc / chai (vật dài)", category: "nani_group", desc: "Đơn vị đếm các vật dài mỏng như bút, chai nước, ô, ngón tay.",
    examples: [
      { q: "ビールを何本冷やしておきますか。", qh: "ビール を なんぼん ひやしておきます か。", qr: "Biiru o nanbon hiyashite okimasu ka?", qv: "Ướp lạnh sẵn mấy chai bia đây nhỉ?", a: "6本冷やしておいてください。", ah: "ろっぽん ひやしておいて ください。", ar: "Roppon hiyashite oite kudasai.", av: "Hãy ướp lạnh sẵn 6 chai nhé." },
      { q: "ペンを何本持っていますか。", qh: "ペン を なんぼん もっています か。", qr: "Pen o nanbon motte imasu ka?", qv: "Bạn mang theo mấy chiếc bút?", a: "黒を2本と赤を1本持っています。", ah: "くろ を にほん と あか を いっぽん もっています。", ar: "Kuro o nihon to aka o ippon motte imasu.", av: "Tôi mang 2 chiếc bút đen và 1 chiếc bút đỏ." }
    ]
  },
  {
    id: "nanmai", word: "何枚 (なんまい)", reading: "Nanmai", meaning: "Mấy tờ / tấm (vật mỏng)", category: "nani_group", desc: "Đơn vị đếm các vật mỏng phẳng như giấy, đĩa CD, áo sơ mi, vé tàu xe.",
    examples: [
      { q: "コピーは何枚必要ですか。", qh: "コピー は なんまい ひつよう です か。", qr: "Kopii wa nanmai hitsuyou desu ka?", qv: "Cần photocopy bao nhiêu tờ?", a: "50枚印刷してください。", ah: "ごじゅうまい いんさつ してください。", ar: "Gojuumai insatsu shite kudasai.", av: "Hãy in giúp 50 bản." },
      { q: "お皿は何枚用意しますか。", qh: "おさら は なんまい ようい します か。", qr: "Osara wa nanmai youi shimasu ka?", qv: "Chuẩn bị mấy cái đĩa đây ạ?", a: "8枚出してください。", ah: "はちまい だしてください。", ar: "Hachimai dashite kudasai.", av: "Hãy xếp ra 8 cái đĩa." }
    ]
  },
  {
    id: "nandai", word: "何台 (なんだい)", reading: "Nandai", meaning: "Mấy chiếc (xe cộ, máy móc)", category: "nani_group", desc: "Đơn vị đếm dành riêng cho thiết bị điện tử, máy tính, ô tô, xe máy.",
    examples: [
      { q: "会社にパソコンが何台ありますか。", qh: "かいしゃ に パソコン が なんだい あります か。", qr: "Kaisha ni pasokon ga nandai arimasu ka?", qv: "Ở công ty có bao nhiêu chiếc máy tính?", a: "全部で20台あります。", ah: "ぜんぶ で にじゅうだい あります。", ar: "Zenbu de nijuudai arimasu.", av: "Tổng cộng có 20 chiếc máy tính." },
      { q: "スマホを何台持っていますか。", qh: "スマホ を なんだい もっています か。", qr: "Sumaho o nandai motte imasu ka?", qv: "Bạn có mấy chiếc điện thoại thông minh?", a: "仕事用と個人用で2台持っています。", ah: "しごとよう と こじんよう で にだい もっています。", ar: "Shigotoyou_to_kojinyou_de_nidai_motte_imasu.", av: "Tôi có 2 chiếc, một cho công việc và một cho cá nhân." }
    ]
  },
  {
    id: "nannin", word: "何人 (なんにん)", reading: "Nannin", meaning: "Mấy người", category: "nani_group", desc: "Đơn vị đếm người. Cần lưu ý phản xạ khi đếm 1 người (Hitori), 2 người (Futari).",
    examples: [
      { q: "ご家族は何人ですか。", qh: "ごかぞく は なんにん です か。", qr: "Gokazoku wa nannin desu ka?", qv: "Gia đình bạn có mấy người?", a: "4人です。両親と妹と私です。", ah: "よにん です。りょうしん と いもうto と わたし です。", ar: "Yonin desu. Ryoushin to imouto to watashi desu.", av: "Có 4 người. Bố mẹ, em gái và tôi." },
      { q: "この教室に学生は何人いますか。", qh: "この きょうしつ に がくせい は なんにん います か。", qr: "Kono kyoushitsu ni gakusei wa nannin imasu ka?", qv: "Lớp học này có bao nhiêu học sinh?", a: "ちょうど20人います。", ah: "ちょうど にじゅうにん います。", ar: "Choudo nijuunin imasu.", av: "Có đúng 20 học sinh." }
    ]
  },
  {
    id: "nanbiki", word: "何匹 (なんびき)", reading: "Nanbiki", meaning: "Mấy con (động vật nhỏ)", category: "nani_group", desc: "Đơn vị đếm các con vật có kích cỡ trung bình, nhỏ như chó, mèo, thỏ, cá, côn trùng.",
    examples: [
      { q: "ペットの猫を何匹飼っていますか。", qh: "ペット の ねこ を なんびき かっています か。", qr: "Petto no neko o nanbiki katte imasu ka?", qv: "Bạn đang nuôi mấy chú mèo cưng vậy?", a: "可愛い白猫を2匹飼っています。", ah: "かわいい しろねこ を にひき かっています。", ar: "Kawaii shironeko o nihiki katte imasu.", av: "Tôi đang nuôi 2 chú mèo trắng rất dễ thương." },
      { q: "池に金魚が何匹泳いでいますか。", qh: "いけ に きんぎょ が なんびき およいでいます か。", qr: "Ike ni kingyo ga nanbiki oyoide imasu ka?", qv: "Có mấy chú cá vàng đang bơi trong hồ thế?", a: "赤い金魚が10匹泳いでいますよ。", ah: "あかい きんぎょ が じっぴき およいでいます よ。", ar: "Akai kingyo ga jippiki oyoide imasu yo.", av: "Có 10 chú cá vàng đỏ đang bơi đấy." }
    ]
  },
  {
    id: "nantou", word: "何頭 (なんとう)", reading: "Nantou", meaning: "Mấy con (động vật lớn)", category: "nani_group", desc: "Đơn vị đếm động vật lớn như voi, bò, ngựa, sư tử, gấu.",
    examples: [
      { q: "動物園にゾウが何頭いますか。", qh: "どうぶつえん に ゾウ が なんとう います か。", qr: "Doubutsuen ni zou ga nantou imasu ka?", qv: "Trong vườn thú có mấy con voi?", a: "大きなゾウが3頭います。", ah: "おおきな ゾウ が さんとう います。", ar: "Ookina zou ga santou imasu.", av: "Có 3 con voi lớn." },
      { q: "サーカス団には馬は何頭所属していますか。", qh: "サーカスだん に は うま が なんとう しょぞく しています か。", qr: "Saakusudan ni wa uma ga nantou shozoku shite imasu ka?", qv: "Đoàn xiếc sở hữu mấy chú ngựa vậy?", a: "白い馬が4頭所属しています。", ah: "しろい うま が よんとう しょぞく しています。", ar: "Shiroi uma ga yontou shosoku shite imasu.", av: "Có 4 chú ngựa trắng thuộc biên chế đoàn xiếc." }
    ]
  },
  {
    id: "nanchaku", word: "何着 (なんちゃく)", reading: "Nanchaku", meaning: "Mấy bộ (quần áo)", category: "nani_group", desc: "Đơn vị đếm trang phục, quần áo nguyên bộ, complet, jacket.",
    examples: [
      { q: "スーツを何着持っていますか。", qh: "スーツ を なんちゃく もっています か。", qr: "Suutsu o nanchaku motte imasu ka?", qv: "Bạn sở hữu mấy bộ suit (complet)?", a: "仕事用に3着持っています。", ah: "しごとよう に さんちゃく もっています。", ar: "Shigotoyou ni sanchaku motte imasu.", av: "Tôi có 3 bộ dành cho công việc." },
      { q: "冬用のコートは何着ありますか。", qh: "ふゆよう の コート は なんちゃく あります か。", qr: "Fuyuyou no kooto wa nanchaku arimasu ka?", qv: "Bạn có mấy chiếc áo khoác mùa đông?", a: "クローゼットに2着ありますよ。", ah: "クローゼット に にちゃく あります よ。", ar: "Kuroozetto ni nichaku arimasu yo.", av: "Tôi có 2 chiếc trong tủ quần áo." }
    ]
  },
  {
    id: "nanzoku", word: "何足 (なんぞく)", reading: "Nanzoku", meaning: "Mấy đôi (giày, tất)", category: "nani_group", desc: "Đơn vị đếm giày dép, tất, các vật mang ở chân đi theo đôi.",
    examples: [
      { q: "靴を何足持っていますか。", qh: "くつ を なんぞく もっています か。", qr: "Kutsu o nanzoku motte imasu ka?", qv: "Bạn có tất cả mấy đôi giày?", a: "スニーカーを3足と革靴を1足持っています。", ah: "スニーカー を さんぞく と かわぐつ を いっそく もっています。", ar: "Suniikaa o sanzoku to kawagutsu o issoku motte imasu.", av: "Tôi có 3 đôi giày thể thao và 1 đôi giày da." },
      { q: "仕事用の靴下を何足買いましたか。", qh: "しごとよう の くつした を なんぞく かいました か。", qr: "Shigotoyou no kutsushita o nanzoku kaimashita ka?", qv: "Bạn đã mua mấy đôi tất công sở?", a: "洗い替え用に5足まとめて買いました。", ah: "あらいがえよう に ごそく まとめて かいました。", ar: "Araigaeyou ni gosoku matomete kaimashita.", av: "Tôi mua liền một lúc 5 đôi để thay đổi khi giặt giũ." }
    ]
  },
  {
    id: "nankai", word: "何回 (なんかい)", reading: "Nankai", meaning: "Mấy lần (Phổ thông)", category: "nani_group", desc: "Hỏi về số lần hoặc tần suất thực hiện hành động một cách thông dụng.",
    examples: [
      { q: "日本へ何回行ったことがありますか。", qh: "にほん へ なんかい いった こと が あります か。", qr: "Nihon e nankai itta koto ga arimasu ka?", qv: "Bạn đã đi Nhật Bản mấy lần rồi?", a: "これまでに3回行ったことがあります。", ah: "これ まで に さんかい いった こと が あります。", ar: "Kore made ni sankai itta koto ga arimasu.", av: "Tính đến nay tôi đã đi được 3 lần." },
      { q: "1週間に何回ジムに通っていますか。", qh: "いっしゅうかん に なんかい ジム に かよっています か。", qr: "Isshuukan ni nankai jimu ni kayotte imasu ka?", qv: "Một tuần bạn đi phòng gym mấy lần?", a: "週に2回通っています。", ah: "しゅう に にかい かよっています。", ar: "Shuu ni nikai kayotte imasu.", av: "Tôi đi tuần 2 lần." }
    ]
  },
  {
    id: "nando", word: "何度 (なんど)", reading: "Nando", meaning: "Mấy lần (Lịch sự / Nhấn mạnh)", category: "nani_group", desc: "Cách hỏi lịch sự của Nankai hoặc dùng để nhấn mạnh tần suất nhiều lần.",
    examples: [
      { q: "同じことを何度言わせるのですか。", qh: "おなじ こと を なんど いわせる の です か。", qr: "Onaji koto o nando iwaseru no desu ka?", qv: "Cậu bắt tớ phải nói một việc tới mấy lần nữa thế?", a: "すみません、今度からしっかり覚えます。", ah: "すみません、こんど から しっかり おぼえます。", ar: "Sumimasen, kondo kara shikkari oboemasu.", av: "Xin lỗi cậu, từ lần sau tớ sẽ nhớ thật kỹ." },
      { q: "富士山には何度登りましたか。", qh: "ふじさん に は なんど のぼりました か。", qr: "Fujisan ni wa nando noborimashita ka?", qv: "Cậu đã leo núi Phú Sĩ mấy lần rồi?", a: "私はこれまでに2度登りましたよ。", ah: "わたし は これ まで に にど のぼりました よ。", ar: "Watashi wa kore made ni nido noborimashita yo.", av: "Tớ đã leo được 2 lần tính đến nay rồi." }
    ]
  },
  {
    id: "nanban", word: "何番 (なんばん)", reading: "Nanban", meaning: "Số mấy", category: "nani_group", desc: "Dùng để hỏi vị trí số thứ tự, số điện thoại hoặc mã số.",
    examples: [
      { q: "あなたの背番号は何番ですか。", qh: "あなた の せばんごう は なんばん です か。", qr: "Anata no sebangou wa nanban desu ka?", qv: "Số áo thi đấu của bạn là số mấy?", a: "私の背番号は10番です。", ah: "わたし の せばんごう は じゅうばん です。", ar: "Watashi no sebangou wa juuban desu.", av: "Số áo của tôi là số 10." },
      { q: "電話番号は何番ですか。", qh: "でんわ ばんごう は なんばん です か。", qr: "Denwa bangou wa nanban desu ka?", qv: "Số điện thoại của bạn là số mấy?", a: "090-1234-5678です。", ah: "ぜろきゅうぜろ の いちにさんよん の ごろくななはch です。", ar: "Zero kyuu zero, ichi ni san yon, go roku nana hachi desu.", av: "Là số 090-1234-5678." }
    ]
  },
  {
    id: "nanbansen", word: "何番線 (なんばんせん)", reading: "Nanbansen", meaning: "Tuyến / đường ray số mấy", category: "nani_group", desc: "Hỏi rõ đường tàu điện số mấy ở nhà ga Nhật Bản.",
    examples: [
      { q: "東京行きは何番線から発車しますか。", qh: "とうきょう いき は なんばんせん から はっしゃ します か。", qr: "Toukyou iki wa nanbansen kara hassha shimasu ka?", qv: "Tàu đi Tokyo xuất phát từ đường ray số mấy?", a: "3番線から発車します。", ah: "さんばんせん から はっしゃ します。", ar: "Sanbansen kara hassha shimasu.", av: "Tàu xuất phát từ đường ray số 3." },
      { q: "山手線は何番線ですか。", qh: "やまのてせん は なんばんせん です か。", qr: "Yamanotesen wa nanbansen desu ka?", qv: "Tuyến Yamanote ở đường ray số mấy vậy ạ?", a: "5番線と6番線ですよ。", ah: "ごばんせん と ろくばんせん です よ。", ar: "Gobansen to rokubansen desu yo.", av: "Ở đường ray số 5 và số 6 đấy ạ." }
    ]
  },

  // ================= TAB III: NHÓM LÝ DO =================
  {
    id: "naze", word: "なぜ", reading: "Naze", meaning: "Tại sao (Trang trọng / Văn viết)", category: "reasons", desc: "Dùng để hỏi nguyên nhân trong bối cảnh lịch sự, nghiên cứu học thuật hoặc văn viết trang nghiêm.",
    examples: [
      { q: "なぜ地球温暖化は進むのでしょうか。", qh: "なぜ ちきゅう おんだんか は すすむ の でしょう か。", qr: "Naze chikyuu ondanka wa susumu no deshou ka?", qv: "Tại sao nóng lên toàn cầu vẫn tiếp diễn?", a: "排気ガスの増加が原因だと言われています。", ah: "はいき ガス の ぞうか など が げんいん だ と いわれています。", ar: "Haiki gasu no zouka nado ga gen'in da to iwarete imasu.", av: "Nhiều người nói nguyên nhân chính là khí thải gia tăng." },
      { q: "なぜ日本語の勉強を始めたのですか。", qh: "なぜ にほんご の べんきょう を はじめた の です か。", qr: "Naze nihongo o benkyou shite imasu ka?", qv: "Tại sao bạn lại bắt đầu học tiếng Nhật thế?", a: "日本の文化に強い関心があるからです。", ah: "にほん の ぶんか に つよい かんしん が ある から です。", ar: "Nihon no bunka ni tsuyoi kanshin ga aru kara desu.", av: "Bởi vì tôi có mối quan tâm sâu sắc tới văn hóa Nhật." }
    ]
  },
  {
    id: "doushite", word: "どうして", reading: "Doushite", meaning: "Tại sao (Thông dụng nói & viết)", category: "reasons", desc: "Từ hỏi lý do thông thường, tự nhiên và được dùng rộng rãi nhất.",
    examples: [
      { q: "どうして昨日、遅刻したのですか。", qh: "どうして きのう、ちこく した の です か。", qr: "Doushite kinou, chikoku shita no desu ka?", qv: "Tại sao hôm qua em lại đi muộn?", a: "電車が遅れたためです。", ah: "でんしゃ が おくれた ため です。", ar: "Densha ga okureta tame desu.", av: "Thưa thầy, do tàu điện bị trễ chuyến ạ." },
      { q: "どうして泣いているの？", qh: "どうして ないている の？", qr: "Doushite naite iru no?", qv: "Sao em lại khóc thế?", a: "転んで足が痛いからです。", ah: "ころんで あし が いたい から です。", ar: "Koronde ashi ga itai kara desu.", av: "Do em bị ngã nên chân đau quá." }
    ]
  },
  {
    id: "nande_why", word: "なんで", reading: "Nande", meaning: "Tại sao (Suồng sã)", category: "reasons", desc: "Lối hỏi lý do hàng ngày cực kỳ suồng sã, thân mật giữa bạn bè thân quen.",
    examples: [
      { q: "なんで来なかったの？", qh: "なんで こなかった の？", qr: "Nande konatta no?", qv: "Sao cậu lại không đến?", a: "ちょっと急用ができちゃって。", ah: "ちょっと きゅうよう が できちゃって。", ar: "Chotto kyuuyou ga dekichatte.", av: "Tớ bận việc đột xuất chút xíu." },
      { q: "なんで言わなかったの？", qh: "なんで いわなかった の？", qr: "Nande iwanatta no?", qv: "Sao hồi đó cậu không nói?", a: "言うのが恥ずかしかったからだよ。", ah: "いう の が はずかしかった から だよ。", ar: "Iu no ga hazukashikatta kara dayo.", av: "Vì lúc đó nói ra ngại ngùng xấu hổ lắm." }
    ]
  },

  // ================= TAB IV: TRẠNG THÁI & LƯỢNG TỔNG QUÁT =================
  {
    id: "itsu", word: "いつ", reading: "Itsu", meaning: "Khi nào", category: "general", desc: "Hỏi mốc thời gian chung chung. Tránh bẫy tuyệt đối không đi kèm trợ từ に sau 'いつ'.",
    examples: [
      { q: "いつ日本へ行きますか。", qh: "いつ にほん へ いきます か。", qr: "Itsu nihon e ikimasu ka?", qv: "Khi nào bạn đi Nhật Bản?", a: "来年の4月に行きます。", ah: "らいねん の よんがつ に いきます。", ar: "Rainen no yongatsu ni iku yotei desu.", av: "Tháng 4 năm sau tôi đi." },
      { q: "宿題はいつまでに提出ですか。", qh: "しゅくだい は いつ まで に ていしゅつ です か。", qr: "Shukudai wa itsu made ni teishutsu desu ka?", qv: "Bài tập nộp trước khi nào thế?", a: "金曜日の5時までです。", ah: "きんようび の ごじ まで です。", ar: "Kinyoubi no goji made desu.", av: "Trước 5 giờ chiều thứ Sáu." }
    ]
  },
  {
    id: "ikura", word: "いくら", reading: "Ikura", meaning: "Bao nhiêu tiền", category: "general", desc: "Nghi vấn từ chuyên dụng dùng hỏi về giá trị tiền bạc, phí tổn dịch vụ.",
    examples: [
      { q: "この靴はいくらですか。", qh: "この くつ は いくら です か。", qr: "Kono kutsu wa ikura desu ka?", qv: "Đôi giày này giá bao nhiêu tiền vậy?", a: "5,000円です。", ah: "ごせんえん です。", ar: "Gosen-en desu.", av: "Giá 5,000 Yên." },
      { q: "全部でいくらになりますか。", qh: "ぜんぶ で いくら に なります か。", qr: "Zenbu de ikura ni narimasu ka?", qv: "Tổng cộng hết bao nhiêu tiền ạ?", a: "税込みで4,200円になります。", ah: "ぜいこみ で よんせんにひゃくえん に なります。", ar: "Zeikomi de yonsen-nihyaku-en ni narimasu.", av: "Cả thuế là 4,200 Yên ạ." }
    ]
  },
  {
    id: "ikutsu", word: "いくつ", reading: "Ikutsu", meaning: "Bao nhiêu cái / Mấy tuổi", category: "general", desc: "Dùng để hỏi số lượng đồ vật đếm bằng hệ đếm thuần Nhật hoặc hỏi tuổi nhã nhặn.",
    examples: [
      { q: "みかんをいくつ食べましたか。", qh: "みかん を いくつ たべました か。", qr: "Mikan o ikutsu tabemashita ka?", qv: "Cậu đã ăn bao nhiêu quả quýt?", a: "3つ食べました。", ah: "みっつ たべました。", ar: "Mittsu tabemashita.", av: "Tớ ăn 3 quả." },
      { q: "おいくつになられますか。", qh: "おいくつ に なられます か。", qr: "Oikutsu ni nararemasu ka?", qv: "Năm nay bác thọ bao nhiêu tuổi rồi ạ? (Kính ngữ)", a: "今年で70歳になります。", ah: "ことし で ななじゅっさい に なります。", ar: "Kotoshi de nanajuusai ni narimasu.", av: "Năm nay tôi bước sang tuổi 70." }
    ]
  },
  {
    id: "ikaga", word: "いかが", reading: "Ikaga", meaning: "Như thế nào (Lịch sự)", category: "general", desc: "Tôn kính ngữ của どう, chuyên dùng để thăm hỏi ý kiến hoặc mời mọc khách hàng.",
    examples: [
      { q: "お味はいかがですか。", qh: "おあじ は いかが です か。", qr: "Oaji wa ikaga desu ka?", qv: "Hương vị món ăn thế nào ạ?", a: "とても美味しいです！", ah: "とても おいしい です！", ar: "Totemo oishii desu!", av: "Dạ rất là ngon miệng ạ!" },
      { q: "コーヒーはいかがですか。", qh: "コーヒー は いかが です か。", qr: "Koohii wa ikaga desu ka?", qv: "Mời quý khách dùng cà phê nhé?", a: "ありがとうございます、いただきます。", ah: "ありがとう ございます、いただきます。", ar: "Arigatou gozaimasu, itadakimasu.", av: "Xin cảm ơn bạn, tôi xin nhận." }
    ]
  },
  {
    id: "dono_you_ni", word: "どのように", reading: "Dono you ni", meaning: "Như thế nào (Hỏi cách làm chi tiết)", category: "general", desc: "Tìm hiểu chi tiết về cách thực hiện, quy trình hoặc phương pháp hành động cụ thể.",
    examples: [
      { q: "この機械はどのように使いますか。", qh: "この きかい は どのように つかいます か。", qr: "Kono kikai wa dono you ni tsukaimasu ka?", qv: "Chiếc máy này dùng như thế nào ạ?", a: "赤いボタンを押して起動させます。", ah: "あかい ボタン を おして きどう させます。", ar: "Akai botan o oshite kidou sasemasu.", av: "Hãy nhấn nút màu đỏ này để khởi động máy." },
      { q: "どのように日本語を勉強しましたか。", qh: "どのように にほんご を べんきょう しました か。", qr: "Dono you ni nihongo o benkyou shimashita ka?", qv: "Cậu học tiếng Nhật bằng cách thức cụ thể nào thế?", a: "毎朝ニュースを聞いて単語を覚えました。", ah: "まいあさ ニュース を きいて たんご を おぼえました。", ar: "Maiasa nyuusu o kiite tango o oboemashita.", av: "Mỗi sáng tớ đều nghe bản tin rồi ghi nhớ từ vựng." }
    ]
  },
  {
    id: "dono_kurai", word: "どのくらい", reading: "Dono kurai / Ore kurai", meaning: "Bao lâu / Bao nhiêu", category: "general", desc: "Hỏi về khoảng thời gian, độ dài khoảng cách hoặc số lượng ước chừng.",
    examples: [
      { q: "ハノイから東京までどのくらいですか。", qh: "ハノイ から とуきょう まで どのくらい です か。", qr: "Hanoi kara Toukyou made dono kurai desu ka?", qv: "Từ Hà Nội bay tới Tokyo mất bao lâu?", a: "飛行機でだいたい5時間半くらいかかります。", ah: "ひこうき で だいたい ごじかんはん くらい かかります。", ar: "Hikouki de daitai gojikanhan kurai kakarimasu.", av: "Đi máy bay hết tầm khoảng 5 tiếng rưỡi." },
      { q: "毎日、日本語をどのくらい勉強していますか。", qh: "まいにち、にほんご を どのくらい べんきょう しています か。", qr: "Mainichi, nihongo o dono kurai benkyou shite imasu ka?", qv: "Mỗi ngày bạn học tiếng Nhật khoảng bao lâu?", a: "毎日2時間くらい勉強するようにしています。", ah: "まいにち にじかん くらい べんきょう するように しています。", ar: "Mainichi nijikan kurai benkyou suru you ni shite imasu.", av: "Mỗi ngày tôi cố gắng học khoảng 2 tiếng." }
    ]
  },

  // ================= TAB V: KẾT HỢP NÂNG CAO =================
  {
    id: "dokoka", word: "どこか", reading: "Dokoka", meaning: "Nơi nào đó (Bất định)", category: "advanced", desc: "Đại từ chỉ một địa điểm mơ hồ không xác định rõ. Không dùng hỏi nội dung mà hỏi xác nhận Có/Không.",
    examples: [
      { q: "週末、どこかへ行きましたか。", qh: "しゅうまつ、どこか へ いきました か。", qr: "Shuumatsu, dokoka e ikimashita ka?", qv: "Cuối tuần bạn có đi đâu đó chơi không?", a: "はい、近くの公園へ散歩に行きました。", ah: "はい、ちかく の こうえん へ さんぽ に いきました。", ar: "Hai, chikaku no kouen e sanpo ni ikimashita.", av: "Có, tôi đã đi dạo ở công viên gần nhà." },
      { q: "鍵をどこかに忘れてしまいました。", qh: "かぎ を どこか に わすれて しまいました。", qr: "Kagi o dokoka ni wasurete shimaimashita.", qv: "Tớ lỡ quên chìa khóa ở nơi nào đó mất rồi.", a: "もう一度カバンの中を探しましょう。", ah: "もういちど カバン の なか を さがしましょう。", ar: "Mou ichido kaban no naka o sagashimashou.", av: "Chúng ta hãy tìm lại trong túi một lần nữa đi." }
    ]
  },
  {
    id: "dareka", word: "だれか", reading: "Dareka", meaning: "Ai đó (Bất định)", category: "advanced", desc: "Đại từ chỉ người không xác định danh tính cụ thể.",
    examples: [
      { q: "教室に誰かいますか。", qh: "きょうしつ に だれか います か。", qr: "Kyoushitsu ni dareka imasu ka?", qv: "Có ai đó trong lớp học không?", a: "はい、鈴木さんが一人で勉強しています。", ah: "はい、すずき さん が ひとり で べんきょう しています。", ar: "Hai, Suzuki-san ga hitori de benkyou shite imasu.", av: "Có, bạn Suzuki đang tự học một mình." },
      { q: "誰か手伝ってくれる人はいますか。", qh: "だれか てつだって くれる ひと は います か。", qr: "Dareka tetsudatte kureru hito wa imasu ka?", qv: "Có ai có thể giúp đỡ tôi một tay không?", a: "私が手伝いますよ、何をすればいいですか。", ah: "わたし が てつだいます よ、なに を すれば いい です か。", ar: "Watashi ga tetsudaimasu yo, nani o sureba ii desu ka?", av: "Tôi sẽ giúp bạn, tôi nên làm gì đây?" }
    ]
  },
  {
    id: "nanika", word: "何か", reading: "Nanika", meaning: "Cái gì đó (Bất định)", category: "advanced", desc: "Đại từ chỉ vật mơ hồ không xác định rõ. Dùng nhiều trong đề nghị rủ rê.",
    examples: [
      { q: "のどが渇きましたね、何か飲みませんか。", qh: "のど が かわきました ね、なにか のみません か。", qr: "Nodo ga kawakimashita ne, nanika nomasen ka?", qv: "Khô cổ họng quá, uống cái gì đó không cậu?", a: "ええ、冷たいお茶を買いましょう。", ah: "ええ、つめたい おちゃ を かいましょう。", ar: "Ee, tsumetai ocha o kaimashou.", av: "Ừ, chúng ta cùng đi mua trà lạnh uống đi." },
      { q: "カバンの中に何か入っていますか。", qh: "カバン の なか に なにか はいっています か。", qr: "Kaban no naka ni nanika haitte imasu ka?", qv: "Trong cặp có đựng cái gì đó không?", a: "いいえ、何も入っていませんよ。空です。", ah: "いいえ、なにも はいっていません よ。から です。", ar: "Iie, nanimo haitte imasen yo. Kara desu.", av: "Không, chả có cái gì cả. Trống không à." }
    ]
  },
  {
    id: "itsuka", word: "いつか", reading: "Itsuka", meaning: "Khi nào đó / Một ngày nào đó", category: "advanced", desc: "Đại từ chỉ thời điểm không xác định rõ trong tương lai hoặc quá khứ.",
    examples: [
      { q: "いつか日本へ旅行に行きたいですか。", qh: "いつか にほん へ りょこう に いきたい です か。", qr: "Itsuka nihon e ryokou ni ikitai desu ka?", qv: "Một ngày nào đó cậu có muốn đi du lịch Nhật Bản không?", a: "はい、お金を貯めて絶対行きます！", ah: "はい、おかね を ためて ぜったい いきます！", ar: "Hai, okane o tamete zettai ikimasu!", av: "Có chứ, tớ nhất định tích lũy tiền rồi sẽ đi!" },
      { q: "いつかまた一緒にお酒を飲みましょう。", qh: "いつか また いっしょ に おさけ を のみましょう。", qr: "Itsuka mata issho ni osake o nomimashou.", qv: "Khi nào đó rảnh rỗi chúng ta lại cùng nhau uống rượu nhé.", a: "ええ、楽しみにしていますよ。", ah: "ええ、たのしみ に しています よ。", ar: "Ee, tanoshimi ni shite imasu yo.", av: "Vâng, tôi rất mong đợi cơ hội đó đấy." }
    ]
  },
  {
    id: "dokomo", word: "どこも (+ Phủ định)", reading: "Dokomo + Phủ định", meaning: "Không nơi nào cả (Phủ định hoàn toàn)", category: "advanced", desc: "Nghi vấn từ どこ đi kèm trợ từ も và động từ thể phủ định nhấn mạnh không có địa điểm nào.",
    examples: [
      { q: "連休はどこかへ行きましたか。", qh: "れんきゅう は どこか へ いきました か。", qr: "Renkyuu wa dokoka e ikimashita ka?", qv: "Kỳ nghỉ dài ngày bạn có đi đâu đó không?", a: "いいえ、どこへも行きませんでした。家で寝ていました。", ah: "いいえ、どこ へ も いきません でした。いえ で ねていました。", ar: "Iie, doko e mo ikimasen deshita. Ie de nete imashita.", av: "Không, tớ chẳng đi đâu cả sất. Cứ ở nhà ngủ thôi." },
      { q: "スマホはどこにありますか。", qh: "スマホ は <b>どこ</b> に あります か。", qr: "Sumaho wa doko ni arimasu ka?", qv: "Điện thoại của tớ nằm ở xó nào thế nhỉ?", a: "部屋を探しましたが、どこにもありませんね。", ah: "へや を さがしました が、どこ に も ありません ね。", ar: "Heya o sagashimashita ga, doko ni mo arimasen ne.", av: "Tớ lục tung cả phòng lên rồi mà chả thấy ở đâu cả." }
    ]
  },
  {
    id: "daremo", word: "だれも (+ Phủ định)", reading: "Daremo + Phủ định", meaning: "Không một ai cả (Phủ định hoàn toàn)", category: "advanced", desc: "Nghi vấn từ だれ đi kèm trợ từ も và động từ phủ định chỉ sự vắng bóng hoàn toàn của con người.",
    examples: [
      { q: "部屋に誰かいますか。", qh: "へや に だれか います か。", qr: "Heya ni dareka imasu ka?", qv: "Trong phòng có ai đó không?", a: "いいえ、誰もいません。電気も消えています。", ah: "いいえ、だれ も いません。でんき も きえています。", ar: "Iie, daremo imasen. Denki mo kiete imasu.", av: "Không, chả có ai đâu. Đèn cũng tắt ngúm rồi." },
      { q: "その秘密を誰かに話しましたか。", qh: "その ひみつ を だれか に はなしました か。", qr: "Sono himitsu o dareka ni hanashimashita ka?", qv: "Cậu có kể bí mật đó cho ai nghe chưa?", a: "いいえ、誰にも話していません。", ah: "いいえ、だれ に も はなしていません。", ar: "Iie, dare ni mo hanashite imasen.", av: "Không, tớ chưa hé nửa lời cho bất kỳ ai." }
    ]
  },
  {
    id: "nanimo", word: "何も (+ Phủ định)", reading: "Nanimo + Phủ định", meaning: "Không cái gì cả (Phủ định hoàn toàn)", category: "advanced", desc: "Nghi vấn từ 何 đi kèm trợ từ も và động từ phủ định biểu thị sự trống không hoàn toàn về hành động, sự vật.",
    examples: [
      { q: "朝ご飯に何を食べましたか。", qh: "あさごはん に なに を たべました か。", qr: "Asagohan ni nani o tabemashita ka?", qv: "Sáng nay bạn đã ăn cái gì thế?", a: "時間がなかったので、何も食べませんでした。", ah: "じかん が なかった ので、なにも たべませんでした。", ar: "Jikan ga nakatta node, nanimo tabemasen deshita.", av: "Vì không có thời gian nên tôi chả ăn cái gì cả." },
      { q: "私に何か不満がありますか。", qh: "わたし に なにか ふまん が あります か。", qr: "Watashi ni nanika fuman ga arimasu ka?", qv: "Có điều gì không hài lòng về tôi sao?", a: "いいえ、何も不満はありませんよ。", ah: "いいえ、なにも ふまん は ありません よ。", ar: "Iie, nanimo fuman wa arimasen yo.", av: "Không, tớ chả có gì không hài lòng về cậu cả." }
    ]
  }
];

export const SENSEI_QUIZ_DATA: QuizItem[] = [
  {
    id: 1,
    question: "あのハンサムな男性は______ですか。",
    answer: "鈴木先生ですよ。新しく入った英語の先生です。",
    options: ["だれ", "どれ", "どこ", "何"],
    correctAnswer: "だれ",
    explanation: "Câu trả lời chỉ danh tính người cụ thể '鈴木先生' (Thầy Suzuki). Từ để hỏi người thông dụng là 'だれ' (Ai)."
  },
  {
    id: 2,
    question: "お国は______ですか。",
    answer: "ベトナムです。ハノイから来ました。",
    options: ["どこ", "どちら", "どれ", "どっち"],
    correctAnswer: "どちら",
    explanation: "Để hỏi về đất nước, quê hương của một người một cách kính cẩn, tôn trọng trong bối cảnh lịch sự, người Nhật dùng 'どちら' (Nơi nào) thay vì 'どこ'."
  },
  {
    id: 3,
    question: "すいません、喉が渇きましたね。自動販売機で______飲みませんか。",
    answer: "いいですね！冷たいお茶uを買いましょう。",
    options: ["何か", "何も", "だれか", "どこか"],
    correctAnswer: "何か",
    explanation: "Đây là câu rủ rê, đề xuất đối phương uống 'Một cái gì đó không?' (đại từ bất định). Do đó ta điền '何か'."
  },
  {
    id: 4,
    question: "日本語のクラスは______から始まりますか。",
    answer: "明日の午前9時半からですよ。遅れないでね。",
    options: ["何時", "何日", "いつ", "何曜日"],
    correctAnswer: "何時",
    explanation: "Câu trả lời nêu rõ mốc giờ cụ thể '午前9時半' (9 giờ rưỡi sáng). Từ hỏi giờ là '何時' (Mấy giờ)."
  },
  {
    id: 5,
    question: "田中さん、おいくつですか。",
    answer: "お陰様で、今年で______になります。",
    options: ["28歳", "28個", "28枚", "28回"],
    correctAnswer: "28歳",
    explanation: "'おいくつ' là cách hỏi tuổi tác một cách nhã nhặn lịch sự. Câu trả lời tương ứng phải đi kèm lượng từ đếm tuổi là '歳' (sai)."
  },
  {
    id: 6,
    question: "______そんなに悲しそうな顔をしているのですか。何か辛いことでもあったのですか。",
    answer: "実は、大切にしていた腕時計を無くしてしまったんです。",
    options: ["なぜ", "なに", "どう", "どんな"],
    correctAnswer: "なぜ",
    explanation: "Câu trả lời mở đầu bằng '実は' (Thực ra là...) để giải thích nguyên nhân. Do đó cần dùng từ hỏi lý do trang trọng là 'なぜ' (Tại sao)."
  },
  {
    id: 7,
    question: "日本語の辞書を買いたいんですが、______本がいいですか。",
    answer: "このイラストがたくさん入っている本がわかりやすくてお勧めですよ。",
    options: ["どんな", "どの", "どれ", "どう"],
    correctAnswer: "どんな",
    explanation: "Câu trả lời mô tả tính chất 'Có nhiều hình minh họa, dễ hiểu'. Vì có danh từ '本' (sách) đi liền phía sau nên ta dùng định từ hỏi tính chất 'どんな' (như thế nào)."
  },
  {
    id: 8,
    question: "冷蔵庫の中にビールが______残っていますか。",
    answer: "あと2本だけ残っていますよ。",
    options: ["何本", "何個", "何枚", "何人"],
    correctAnswer: "何本",
    explanation: "Bia chai, bia lon thon dài có lượng từ đếm tương xứng là '本'. Câu hỏi lượng từ đếm phù hợp là '何本' (Mấy chai)."
  },
  {
    id: 9,
    question: "昨日は祝日でしたが、どこかへ行きましたか。",
    answer: "いいえ、体調が悪かったので、______行きませんでした。",
    options: ["どこも", "どこか", "何も", "だれも"],
    correctAnswer: "どこも",
    explanation: "Vế sau chia động từ thể phủ định '行きませんでした' (đã không đi). Sự kết hợp Nghi vấn từ nơi chốn + も + Phủ định tạo ra cấu trúc 'đâu cũng không / どこも...ない' (Không đi đâu cả)."
  },
  {
    id: 10,
    question: "田中さんの会社は、ここから歩いて______くらいかかりますか。",
    answer: "だいたい15分くらいかかりますよ。",
    options: ["どのくらい", "いくら", "いつ", "いくつ"],
    correctAnswer: "どのくらい",
    explanation: "Câu trả lời đưa ra khoảng lượng thời gian ước tính 'khoảng 15 phút'. Nghi vấn từ dùng hỏi lượng tương ứng là 'どのくらい' (Bao lâu)."
  }
];
