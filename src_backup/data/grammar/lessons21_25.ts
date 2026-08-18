import { GrammarPoint, Dialogue, LessonQuizRaw } from "../grammarN5Data";

export const grammar21_25: Record<number, GrammarPoint[]> = {};
export const dialogues21_25: Record<number, Dialogue[]> = {};
export const quizzes21_25: Record<number, LessonQuizRaw> = {};

// --- BÀI 21 ---
grammar21_25[21] = [
  { pattern: "V/N/A普通形 と思います", meaning: "Tôi nghĩ là ～", note: "Bày tỏ suy nghĩ, phỏng đoán hoặc quan điểm cá nhân. Danh từ và tính từ な giữ nguyên だ ở khẳng định hiện tại.", examples: [
    { jp: "A: きのうはあめがふりましたか。B: はい、あめがふったと思います。", vn: "A: Hôm qua trời đã mưa phải không? B: Vâng, tôi nghĩ là trời đã mưa." },
    { jp: "A: これはなんですか。B: かさだと思います。", vn: "A: Cái này là cái gì? B: Tôi nghĩ đó là cái ô." },
    { jp: "A: にほんの かいしゃ は たいへんですか。B: たいへんだと思います。", vn: "A: Công ty Nhật vất vả lắm phải không? B: Tôi nghĩ là vất vả." },
    { jp: "A: このりょうり は からいですか。B: からいと思います。", vn: "A: Món ăn này cay phải không? B: Tôi nghĩ là cay." },
    { jp: "A: ミラーさんはもう帰りましたか。B: はい、たぶん かえったと思います。", vn: "A: Anh Miller đã về chưa? B: Vâng, tôi nghĩ có lẽ anh ấy đã về rồi." }
  ]},
  { pattern: "～についてどう思いますか", meaning: "Bạn nghĩ thế nào về ～?", note: "Dùng để hỏi ý kiến hoặc nhận xét của đối phương về một chủ đề.", examples: [
    { jp: "A: 日本のせいかつについてどう思いますか。B: べんりだと思います。", vn: "A: Bạn nghĩ thế nào về cuộc sống ở Nhật? B: Tôi nghĩ là rất tiện lợi." },
    { jp: "A: 日本の会社についてどう思いますか。B: 厳しいですが良いと思います。", vn: "A: Bạn nghĩ thế nào về công ty Nhật? B: Tôi nghĩ là nghiêm khắc nhưng tốt." },
    { jp: "A: 日本人についてどう思いますか。B: 親切だと思います。", vn: "A: Bạn nghĩ thế nào về người Nhật? B: Tôi nghĩ là họ rất tốt bụng." },
    { jp: "A: 日本りょうりについてどう思いますか。B: おいしいと思います。", vn: "A: Bạn nghĩ thế nào về món ăn Nhật? B: Tôi nghĩ là ngon." },
    { jp: "A: SAMSUNGのテレビについてどう思いますか。B: 画質が良いと思います。", vn: "A: Bạn nghĩ thế nào về tivi Samsung? B: Tôi nghĩ là chất lượng ảnh tốt." }
  ]},
  { pattern: "Mệnh đề + と言いました", meaning: "Đã nói rằng ～", note: "Trích dẫn lời nói trực tiếp (trong ngoặc kép) hoặc gián tiếp (đưa về thể thông thường).", examples: [
    { jp: "リーさんは「私はすしがたべたいです」と言いました。", vn: "Chị Ly đã nói trực tiếp: 'Tôi muốn ăn sushi'." },
    { jp: "リーさんは彼女はすしがたべたいと言いました。", vn: "Chị Ly đã nói gián tiếp rằng cô ấy muốn ăn sushi." },
    { jp: "A: たべるまえに何と言いますか。B: 「いただきます」と言います。", vn: "A: Trước khi ăn thì nói gì? B: Nói 'Itadakimasu'." },
    { jp: "A: たべたあとで何と言いますか。B: 「ごちそうさま」と言います。", vn: "A: Sau khi ăn xong thì nói gì? B: Nói 'Gochisousama'." },
    { jp: "A: ねるまえに何と言いますか。B: 「おやすみなさい」と言います。", vn: "A: Trước khi ngủ thì nói gì? B: Nói 'Oyasuminasai'." }
  ]},
  { pattern: "～でしょう？", meaning: "～ Phải không?", note: "Dùng để tìm kiếm sự đồng tình từ người nghe khi nghĩ họ cũng biết thông tin.", examples: [
    { jp: "すしはおいしいでしょう？", vn: "Sushi ngon đúng không nhỉ?" },
    { jp: "もくようびはテストでしょう？", vn: "Thứ Năm có bài kiểm tra đúng không?" },
    { jp: "もくようびはテストがあるでしょう？", vn: "Thứ Năm chắc chắn là có bài kiểm tra phải không?" },
    { jp: "かんじはむずかしいでしょう？", vn: "Chữ Hán khó đúng không nhỉ?" },
    { jp: "TRANGさんはかわいいでしょう？", vn: "Trang dễ thương đúng không nào?" }
  ]},
  { pattern: "Địa điểm で Danh từ があります", meaning: "Có tổ chức sự kiện / thiên tai tại địa điểm", note: "Trợ từ で chỉ nơi diễn ra sự kiện, lễ hội, tai nạn hoặc thiên tai bão lũ.", examples: [
    { jp: "ベトナムでアセアンがあります。", vn: "Hội nghị ASEAN được tổ chức tại Vietnam." },
    { jp: "QATARでワールドカップがあります。", vn: "World Cup được tổ chức tại Qatar." },
    { jp: "中部でたいふうがあります。", vn: "Ở miền Trung đang có bão xảy ra." },
    { jp: "がっこうのまえでじこがあります。", vn: "Vừa có tai nạn xảy ra ở trước cổng trường." },
    { jp: "ふるさとでけっこんしきがあります。", vn: "Ở quê tôi đang tổ chức lễ cưới." }
  ]}
];

dialogues21_25[21] = [
  { jp: "A: 日本のせいかつについてどう思いますか。B: 大変ですが、とてもべんりだと思います。物価が高いですね。", vn: "A: Bạn nghĩ thế nào về cuộc sống ở Nhật? B: Vất vả nhưng tôi nghĩ là rất tiện lợi. Có điều giá cả đắt đỏ quá nhỉ." },
  { jp: "A: リーさんは何と言いましたか。B: 彼女は「私はすしがたべたいです」と言いましたよ。一緒に行きましょう。", vn: "A: Chị Ly đã nói gì thế? B: Cô ấy nói là 'Tôi muốn ăn sushi' đấy. Chúng ta cùng đi thôi." },
  { jp: "A: もくようびは日本語のテストがあるでしょう？ B: ええ、たぶんあると思います。今晩勉強しなければなりません。", vn: "A: Thứ Năm có bài kiểm tra tiếng Nhật phải không? B: Vâng, tôi nghĩ là có đấy. Tối nay phải học bài thôi." }
];

quizzes21_25[21] = {
  p: [
    "あそこで事故___ありました。|が|で,を,へ", 
    "ビール___飲みませんか。|でも|が,に,を", 
    "日本___生活についてどう思いますか。|の|が,を,に", 
    "リーさんはすし___食べたいと言いました。|が|を,に,で", 
    "木曜日___テストでしょう？|は|が,を,に", 
    "日本の会社___ついてどう思いますか。|に|で,を,へ", 
    "プレゼントをあげるまえ___「どうぞ」と言います。|に|で,を,へ", 
    "ハノイ___アセアンがあります。|で|に,を,へ", 
    "たぶん明日___雨だと思います。|は|が,を,に", 
    "彼は何___言いましたか。|と|が,を,に"
  ],
  v: [
    "日本の生活はとても___だと思います。|便利|大変,意見,台風", 
    "自分の___を話します。|意見|意味,台風,準備", 
    "この漢字の___がわかりません。|意味|意見,台風,橋", 
    "ベトナムで大きな___がありました。|台風|意見,意味,準備", 
    "明日パーティーの___をします。|準備|意見,意味,台風", 
    "お腹がすいた. すきやき___食べない？|でも|から,tại,と", 
    "木曜日は___でしょう？|テスト|台風,意味,意見", 
    "QATARで___があります。|ワールドカップ|台風,意味,意見", 
    "___すしが好きだと思います。|たぶん|đại khái,全然,よく", 
    "入るまえに「___」と言います。|しつれいします|いただきます,どうぞ,ありがとう"
  ],
  g: [
    "明日、雨がふると___。|思います|言いました,でしょう,あります", 
    "リーさんはすしが食べたいと___。|言いました|思います,でしょう,あります", 
    "バンミーはおいしい___？|でしょう|思います,と言いました,があります", 
    "ふるさとで結婚式が___。|あります|思います,言いました,でしょう", 
    "いいえ、休みじゃないと___。|思います|言いました,でしょう,あります", 
    "食べる前に何と___か。|言います|思います,でしょう,あります", 
    "はい、飲むことができると___。|思います|言いました,でしょう,あります", 
    "TRANGさんはかわいい___？|でしょう|だと思います,と言いました,があります", 
    "学校の前で事故が___。|ありました|思いました,でしょう,言いました", 
    "つまらないね。映画でも見に___？|行かない|行きます,行きました,行って"
  ]
};

// --- BÀI 22 ---
grammar21_25[22] = [
  { pattern: "Mệnh đề bổ ngữ + Danh từ (Định ngữ)", meaning: "Danh từ mang đặc điểm hành động...", note: "Động từ trong mệnh đề phụ chia về thể thông thường, chủ ngữ mệnh đề phụ dùng trợ từ が.", examples: [
    { jp: "これは私がつくった料理だ。", vn: "Đây là món ăn do tự tay tôi nấu nướng." },
    { jp: "レストランでたべた料理だ。", vn: "Đây là món ăn mà chúng ta đã thưởng thức ở nhà hàng." },
    { jp: "おしょうがつにたべる料理だ。", vn: "Đây là món ăn truyền thống ăn vào dịp Tết." },
    { jp: "きょねんかったカメラだ。", vn: "Đây là chiếc máy ảnh tôi đã mua từ năm ngoái." },
    { jp: "日本でとった写真だ。", vn: "Đây là bức ảnh tôi đã chụp khi ở bên Nhật." }
  ]},
  { pattern: "Vる + じかん / やくそく / 用事", meaning: "Thời gian / Hẹn / Việc bận để làm V", note: "Mệnh đề bổ nghĩa định ngữ trực tiếp cho nhóm danh từ kế hoạch, thời gian biểu.", examples: [
    { jp: "A: 朝ご飯を食べる時間がありますか。B: いいえ、ねるじかんがない。", vn: "A: Có thời gian ăn sáng không? B: Không, đến thời gian ngủ tôi còn đang thiếu đây." },
    { jp: "ぎんこうにいくようじがある。", vn: "Tôi có việc bận phải đi ra ngân hàng giải quyết." },
    { jp: "友達のプレゼントをかうようじがある。", vn: "Tôi có việc riêng phải đi mua quà tặng cho bạn." },
    { jp: "ともだちとりょこうにいくやくそくがある。", vn: "Tôi đã có cuộc hẹn đi du lịch xa cùng với nhóm bạn." },
    { jp: "かれとえいがをみるやくそくがある。", vn: "Tôi có cái hẹn đi xem phim rạp với anh ấy." }
  ]},
  { pattern: "スーツをきている人", meaning: "Người đang...", note: "Mệnh đề định ngữ làm thành phần chủ ngữ chính đứng trước trợ từ は của câu.", examples: [
    { jp: "A: ダルシャンさんはどの人ですか。B: スーツをきている人はダルシャンさんだ。", vn: "A: Anh Darshan là người nào vậy? B: Người đang mặc bộ vest là anh Darshan đấy." },
    { jp: "シャツをきている人はさとうさんだ。", vn: "Người đang mặc chiếc áo sơ mi là chị Sato." },
    { jp: "めがねをかけている人はソフィアさんだ。", vn: "Người đang đeo cặp kính cận là chị Sophia." },
    { jp: "ぼうしをかぶっている人はゲイトさんだ。", vn: "Người đang đội chiếc mũ lưỡi trai là anh Gates." },
    { jp: "あそこでえをかいている人はメイさんです。", vn: "Người đang vẽ tranh ở đằng kia là chị May." }
  ]},
  { pattern: "Mệnh đề bổ ngữ + Vị ngữ tính từ", meaning: "Cái danh từ mà... thì rất...", note: "Tính chất của danh từ được giới hạn rõ ràng bởi mệnh đề hành động bổ nghĩa đi kèm.", examples: [
    { jp: "よくいくとしょかんはしずかだ。", vn: "Ngôi thư viện mà tôi thường xuyên ghé tới rất yên tĩnh." },
    { jp: "きのうのんだワインはおいしかった。", vn: "Chai rượu vang mà chúng ta uống ngày hôm qua đã rất ngon." },
    { jp: "せんしゅういったこうえんはにぎやかだった。", vn: "Khu công viên tuần trước tôi đi dạo đã rất náo nhiệt." },
    { jp: "きのう見たえいがはよかった。", vn: "Bộ phim chiếu rạp hôm qua tôi xem thực sự rất hay." },
    { jp: "日本でかったきものはすごくたかかった。", vn: "Bộ đồ Kimono tôi mua ở bên Nhật đã vô cùng đắt đỏ." }
  ]}
];

dialogues21_25[22] = [
  { jp: "A: これはお正月につべる料理ですか。とても美味しいですね。B: ありがとうございます。これは私が昨日つくった料理です。", vn: "A: Đây là món ăn ăn vào dịp Tết phải không ạ? Ngon tuyệt vời luôn. B: Cảm ơn bạn nhiều. Đây là món do tự tay tôi làm ngày hôm qua đó." },
  { jp: "A: 広い庭があるうちがほしいですね。B: そうですね. ゴルフができるにわがあるうちは私の夢です。", vn: "A: Thèm có một ngôi nhà có sân vườn rộng rãi quá đi mất. B: Đúng vậy nhỉ. Nhà có vườn chơi được cả golf là ước mơ đời tôi đó." },
  { jp: "A: あのシャツをきている人はだれですか。B: ああ、あそこにいる人はさとうさんですよ。私の友達です。", vn: "A: Cái người đang mặc áo sơ mi kia là ai thế nhỉ? B: À, người đứng ở đằng kia là chị Sato đấy. Là bạn của tôi." }
];

quizzes21_25[22] = {
  p: [
    "これ___私が作った料理です。|は|が,を,に", 
    "プール___あるうちがほしい。|が|を,に,で", 
    "父___もらった時計を毎日使う。|に|が,を,で", 
    "朝ご飯を食べる時間___ない。|が|を,に,で", 
    "シャツを着ている人___さとうさんだ。|は|が,を,に", 
    "友達___会う約束がある。|に|が,を,で", 
    "メガネ___かけている人は誰ですか。|を|が,に,で", 
    "よく行く図書館___静かだ。|は|が,を,に", 
    "棚にある電話___見せてください。|を|が,に,で", 
    "日本___買った着物は高かった。|で|に,を,へ"
  ],
  v: [
    "これは子供が書いた___です。|絵|時間,約束,用事", 
    "あさごはんを食べる___がない。|時間|絵,約束,用事", 
    "友達に会う___がある。|約束|絵,時間,用事", 
    "病院に行く___がある。|用事|絵,時間,約束", 
    "___をきている人はすずきさんだ。|きもの|めがね,ぼうし,シャツ", 
    "___をかけている人はソフィアさんだ。|めがね|きもの,ぼうし,シャツ", 
    "___をかぶっている人はゲイトさんだ。|ぼうし|きもの,めがね,シャツ", 
    "いらない___を捨てました。|もの|時間,約束,用事", 
    "広い___があるうちがほしい。|にわ|時間,約束,用事", 
    "明日___で買うものは肉と卵だ。|スーパー|にわ,約束,用事"
  ],
  g: [
    "これは日本で___写真です。|とった|とる,とらない,とって", 
    "図書館で___本を読んだ。|かりた|かりる,かりない,かりて", 
    "いっしょに食事___か。|しましょう|します,しました,して", 
    "イタリアで___靴をよくはいている。|かった|かう,かわない,かって", 
    "彼と映画を___約束がある。|みる|みた,みない,みて", 
    "スーツを___人はダルシャンさんだ。|きている|きえている,きった,きて", 
    "昨日___ワインは美味しかった。|のんだ|のむ,のまない,のんで", 
    "タイで___くだものは安かった。|うっている|うった,うる,うって", 
    "あそこに___電話を見せてください。|ある|あった,ない,あって", 
    "銀行にいく用事___。|がある|がない,はあります,になります"
  ]
};

// --- BÀI 23 ---
grammar21_25[23] = [
  { pattern: "V普通形/Vた/A/N + とき", meaning: "Khi ～ / Vào lúc ～", note: "Xác định mốc thời điểm hành động. Tính từ な giữ な, Danh từ thêm の trước とき.", examples: [
    { jp: "がいこくにいくとき、パスポートがいります。", vn: "Khi đi ra nước ngoài, bạn cần có hộ chiếu." },
    { jp: "みちがわからないとき、GOOGLEMAPをつかってください。", vn: "Khi không biết đường, hãy mở ứng dụng Google Map lên dùng nhé." },
    { jp: "A: タクシーをおりるとき、なにをしますか。B: おかねをはらいます。", vn: "A: Khi xuống xe taxi thì làm gì? B: Thanh toán tiền." },
    { jp: "みちをわたるとき、くるまに気をつけます。", vn: "Khi băng qua đường, phải chú ý cẩn thận xe cộ." },
    { jp: "A: ねるとき、なにをしますか. B: でんきをけします。", vn: "A: Khi đi ngủ bạn làm gì? B: Tôi tắt đèn điện." }
  ]},
  { pattern: "Vる と、～", meaning: "Hễ làm V thì ngay lập tức ～ diễn ra tự nhiên", note: "Chỉ quy luật tự nhiên, hệ quả tất yếu hoặc dùng trong chỉ dẫn hướng đi giao thông.", examples: [
    { jp: "おさけをのむと顔があかくなります。", vn: "Hễ cứ uống rượu vào là mặt mũi đỏ gay lên." },
    { jp: "はるになると、さくらがさく。", vn: "Hễ mùa xuân gõ cửa là hoa anh đào lại đua nở." },
    { jp: "A: ボタンをおすとどうなりますか. B: ジュースがでます。", vn: "A: Ấn nút này thì sao? B: Nước trái cây tự động chảy ra." },
    { jp: "まっすぐ行くと、右に大きな銀行がある。", vn: "Cứ đi thẳng tắp là thấy ngân hàng lớn bên tay phải." },
    { jp: "交差点をみぎへまがると、左に図書館がある。", vn: "Rẽ phải ở ngã tư là thấy thư viện nằm ngay bên tay trái." }
  ]},
  { pattern: "N を わたる / さんぽする", meaning: "Băng qua N / Đi dạo ở phạm vi không gian N", note: "Trợ từ を đi liền với động từ di chuyển để vạch rõ hành trình không gian đi qua.", examples: [
    { jp: "はしをわたるとき、川を見ます。", vn: "Khi đi băng qua cầu, tôi thường ngắm nhìn dòng sông." },
    { jp: "みちをわたるとき、左右を確認します。", vn: "Khi qua đường, phải nhìn ngó bên trái bên phải." },
    { jp: "毎朝、近くのこうえんをさんぽする。", vn: "Mỗi sáng tôi đều đi dạo quanh khu công viên gần nhà." },
    { jp: "週末、きれいなうみをさんぽする。", vn: "Cuối tuần, tôi đi dạo mát dọc bờ biển tuyệt đẹp." },
    { jp: "交差点をみぎへまがります。", vn: "Rẽ phải ở ngay vị trí ngã tư." }
  ]}
];

dialogues21_25[23] = [
  { jp: "A: がいこくにいくとき、なにがいりますか。B: パスポートがいりますよ。忘れないでくださいね。", vn: "A: Khi đi ra nước ngoài cần có cái gì thế? B: Cần hộ chiếu đấy nhé. Xin đừng quên mang theo." },
  { jp: "A: おさけをのむと顔があかくなりますか。B: ええ、私は少しのむとすぐ赤くなります。恥ずかしいですよ。", vn: "A: Cứ uống rượu vào là mặt bạn bị đỏ lên hả? B: Vâng, tôi uống chút xíu thôi là mặt đỏ gay ngay. Ngại lắm cơ." },
  { jp: "A: すみません、図書館はどこですか。B: この道をまっすぐ行くと、右にありますよ。交差点の手前です。", vn: "A: Xin lỗi thư viện ở đâu thế ạ? B: Cứ đi thẳng con đường này là nó nằm ở bên phải đấy. Ngay trước ngã tư." }
];

quizzes21_25[23] = {
  p: [
    "外国に行く___、パスポートがいります。|とき|から,まで,と", 
    "橋___わたるとき、気をつけます。|を|が,に,で", 
    "お酒を飲む___顔が赤くなります。|と|から,まで,とき", 
    "春に成る___さくらが咲く。|と|から,まで,とき", 
    "まっすぐ行く___右に銀行があります。|と|から,まで,とき", 
    "ひまな時、本___読みます。|を|が,に,で", 
    "交差点を右___曲がると図書館がある。|へ|を,に,で", 
    "あつい時、エアコン___つけます。|を|が,に,で", 
    "タクシーを降りるとき、お金___払う。|を|が,に,で", 
    "病気の時、病院___行く。|へ|を,に,へ"
  ],
  v: [
    "___をわたるとき、気をつけます。|みち|台風,準備,意味", 
    "___をわたると右に銀行がある。|はし|みち,角,交差点", 
    "最初の___を右へ曲がります。|交差点|はし,みち,角", 
    "公園を___します。|さんぽ|曲がり,わたり,乗り", 
    "___行くと右に銀行がある。|まっすぐ|よく,đại khái,全然", 
    "二番目の角を左へ___。|曲がる|わたる,さんぽする,行く", 
    "___の時、病院へ行きます。|biểu kí|ひま,あつ,さむ", 
    "___時、セーターを着ます。|さむい|あつい,ひまな,biểu kí", 
    "財布を___時、どうしますか。|わすれた|おちた,なくした,おわった", 
    "ボタンを押すと___が出る。|ジュース|はし,みち,交差点"
  ],
  g: [
    "道が___とき、GOOGLEMAPを使いなさい。|わからない|わかります,わかった,わかって", 
    "寝るとき、電気を___。|消します|消した,消さない,消して", 
    "出かけるとき、「行ってきます」と___。|言う|言った,言わない,行って", 
    "帰ったとき、「ただいま」と___。|言う|言った,言わない,行って", 
    "食べたとき、「ごちそうさま」と___。|言う|言った,言わない,行って", 
    "頭が痛い時、どう___か。|します|した,しない,して", 
    "秋になると___なる。|すずしく|すずしい,すずしくて,すずしそう", 
    "夏になると___なる。|あつく|あつい,あつくて,あつそう", 
    "日本人が話すと日本語が上手に___。|なる|なります,なった,なって", 
    "交差点を右へ曲がって100メートル___行くと喫茶店がある。|ぐらい|から,まで,とき"
  ]
};

// --- BÀI 24 ---
grammar21_25[24] = [
  { pattern: "Người が (私に) N をくれます", meaning: "Ai đó tặng / cho tôi cái gì", note: "Chỉ dùng khi ngôi vị người nhận là bản thân tôi hoặc các thành viên trong gia đình tôi.", examples: [
    { jp: "ガーさんがすてきなプレゼントをくれました。", vn: "Chị Nga đã chủ động tặng cho tôi một món quà tuyệt vời." },
    { jp: "ははが美味しいお菓子をくれました。", vn: "Mẹ đã gửi cho tôi những chiếc bánh kẹo ăn vặt rất ngon." },
    { jp: "ナタリーさんは私に長い手紙をくれました。", vn: "Natalee đã viết và gửi cho tôi một bức thư dài." },
    { jp: "リーさんは私にかばんをくれました。", vn: "Chị Lee đã cho tôi một chiếc cặp sách." },
    { jp: "ワンさんは私に時計をくれた。", vn: "Anh Wan đã tặng cho tôi chiếc đồng hồ đeo tay này." }
  ]},
  { pattern: "Vて あげます / もらいます / くれます", meaning: "Mối quan hệ cho và nhận hành vi giúp đỡ", note: "あげます: làm cho ai, もらいます: được ai làm cho, くれます: ai chủ động làm cho mình.", examples: [
    { jp: "私はワンさんに地図を書いてあげました。", vn: "Tôi đã vẽ hộ một tấm bản đồ dễ hiểu giúp cho anh Wan." },
    { jp: "私はワンさんに見せてもらいました。", vn: "Tôi đã được anh Wan cho xem hành trình." },
    { jp: "カリナさんが美味しい料理をつくってくれました。", vn: "Chị Karina đã chủ động nấu món ăn ngon giúp cho tôi." },
    { jp: "さとうさんが難しい日本語を教えてくれました。", vn: "Chị Sato đã tận tình giảng giải tiếng Nhật khó giúp tôi." },
    { jp: "たなかさんに引っ越しを手伝ってもらいました。", vn: "Tôi đã được anh Tanaka đến hỗ trợ dọn nhà giúp." }
  ]}
];

dialogues21_25[24] = [
  { jp: "A: その時計はとても素敵ですね。どこで買いましたか。B: いいえ、これは誕生日にワンさんがくれた時計ですよ。", vn: "A: Chiếc đồng hồ đeo tay kia trông đẹp quá ta! Mua ở đâu thế bạn? B: Không, đây là chiếc đồng hồ anh Wan tặng cho tôi dịp sinh nhật đó." },
  { jp: "A: 引っ越しは大変でしたね。だれか手伝ってくれましたか。B: ええ、たなかさんに手伝ってもらいました。とても助かりました。", vn: "A: Việc dọn nhà vất vả ghê nhỉ. Có ai phụ giúp bạn không vậy? B: Có chứ, tôi được anh Tanaka qua phụ dọn giúp. Đỡ biết bao nhiêu." },
  { jp: "A: おじいさんは毎日新聞を読みますか。B: いいえ、目が悪いですから、私がいつも読んであげるんですよ。", vn: "A: Ông cụ có đọc báo hằng ngày không bạn? B: Không, mắt ông yếu rồi nên tôi luôn là người ngồi đọc báo hộ giúp ông đấy." }
];

quizzes21_25[24] = {
  p: [
    "ガーさんがプレゼント___くれました。|を|が,に,で", 
    "私はワンさん___地図を書いてあげました。|に|が,を,で", 
    "私はおじいさん___新聞を読んであげました。|に|が,を,で", 
    "私はワンさん___見せてもらいました。|に|が,を,で", 
    "ラン先生___日本語を教えてもらいます。|に|が,を,で", 
    "カリナさんが料理___作ってくれました。|を|が,に,で", 
    "ミラーさんが空港___送ってくれました。|まで|から,に,を", 
    "母は誕生日___服をくれます。|に|が,を,で", 
    "私は家族にお金___もらいます。|を|が,に,で", 
    "両親に会いに子供___連れてきます。|を|が,に,で"
  ],
  v: [
    "宿題を___します。|なおし|đổi,giải,bán", 
    "みなさんにアンさんを___します。|紹介|sửa,đọc,gửi", 
    "友達に問題を___します。|説明|sửa,đọc,gửi", 
    "日本人の友達にハノイを___します。|案内|gửi,sửa,bán", 
    "学校へ子供を___行きます。|つれて|sửa,đọc,gửi", 
    "母が___をくれました。|お菓子|ông cụ,bà cụ,ba", 
    "私は来月から___をします。|ホームステイ|bánh kẹo,ông,bà", 
    "___自分で料理を作ります。|ほかに|hết luôn,nhiều,thường", 
    "お金がたくさんありますから___買います。|ぜんぶ|khác,một chút,không hề", 
    "あした、___を手伝ってくれませんか。|引っ越し|bánh kẹo,chơi,ông cụ"
  ],
  g: [
    "ワンさんは時計を___。|くれました|あげました,もらいました,した", 
    "私はワンさんに電話番号を教えて___。|あげました|もらいました,くれました,した", 
    "たなかさんに手伝って___。|もらいました|あげました,くれました,した", 
    "さとうさんが日本語を教えて___。|くれました|あげました,もらいました,した", 
    "私は山田さんにごはんを作って___。|あげました|もらいました,くれました,した", 
    "私は父に電話を買って___。|もらいました|あげました,くれました,した", 
    "友達は空港まで送って___。|くれました|あげました,もらいました,した", 
    "リーさんはカンさんに本を___。|あげました|もらいました,くれました,した", 
    "リンさんはカンさんに本を___. |もらいました|あげました,くれました,した", 
    "ワンさんは私に時計を___。|くれました|あげました,もらいました,した"
  ]
};

// --- BÀI 25 ---
grammar21_25[25] = [
  { pattern: "Vたら / Aかったら / N・Aなだったら", meaning: "Nếu... thì...", note: "Thể giả định điều kiện quá khứ. Động từ chia thể た thêm ら, phủ định dùng なかったら.", examples: [
    { jp: "もしお金がたくさんあったら何をしますか。B: 広い家を買う。", vn: "A: Nếu có thật nhiều tiền bạn làm gì? B: Tôi sẽ mua một ngôi nhà rộng lớn." },
    { jp: "もし明日雨がふらなかったら、一緒に買い物する。", vn: "Nếu ngày mai trời không đổ mưa, chúng ta cùng đi mua sắm nhé." },
    { jp: "A: 部屋が暑かったらどうしますか。B: まどをあける。", vn: "A: Nếu phòng nóng quá thì làm sao? B: Mở cửa sổ ra." },
    { jp: "A: 明日、雨だったらどうしますか。B: でかけない。", vn: "A: Mai nếu trời đổ mưa thì làm thế nào? B: Tôi ở nhà không đi ra ngoài." },
    { jp: "今日のべんきょうがおわったら、すぐ家へかえる。", vn: "Sau khi việc học hành ngày hôm nay kết thúc, tôi sẽ vọt về nhà ngay." }
  ]},
  { pattern: "Vても / Aくても / N・Aなでも", meaning: "Dù cho... đi chăng nữa thì vẫn cứ...", note: "Mẫu câu giả định tương phản đối lập, hay đi kèm phó từいくら để tăng mức độ.", examples: [
    { jp: "あめが激しくふっても、約束だからいく。", vn: "Dù trời có mưa to như trút nước tôi vẫn quyết đi vì đã có hẹn." },
    { jp: "いくらあつくても、エアコンをつけないでがんばる。", vn: "Dù thời tiết có nóng nực cỡ nào đi nữa tôi vẫn cố chịu không bật điều hòa." },
    { jp: "いくらさむくても、毎朝冷たい水でかおをあらう。", vn: "Dù trời có lạnh buốt giá thế nào đi nữa, mỗi sáng tôi vẫn rửa mặt bằng nước lạnh." },
    { jp: "A: 日曜日でも働かなければなりませんか。B: はい、仕事がありますから。", vn: "A: Dù là chủ nhật vẫn phải làm việc à? B: Vâng, vì có việc bận." },
    { jp: "いくら高い薬をのんでも、病気が全然よくならない。", vn: "Dù có uống thuốc đắt tiền cỡ nào đi nữa, bệnh tình vẫn hoàn toàn không đỡ lên." }
  ]}
];

dialogues21_25[25] = [
  { jp: "A: もしお金が1億円あったら、何をしたいですか。B: 世界旅行をしたいですね。広い庭がある家も買いたいです。", vn: "A: Giả sử nếu có hẳn 100 triệu Yên trong tay bạn muốn làm gì nhất? B: Tôi muốn đi du lịch vòng quanh thế giới này. Ngoài ra muốn tậu cả nhà có sân vườn rộng nữa." },
  { jp: "A: 明日雨がふったら, 旅行に行きますか。B: ええ、いくら雨がふっても、絶対に行きますよ。楽しみにしていますから。", vn: "A: Ngày mai nếu trời đổ mưa thì bạn có đi du lịch nữa không thế? B: Có chứ, dù mưa bão cỡ nào tôi cũng quyết đi bằng được. Vì tôi đã mong chờ bấy lâu nay rồi." },
  { jp: "A: この漢字の意味が分かりません。B: いくら辞書でしらべても分からないときは、いつでも私に聞いてくださいね。", vn: "A: Em không hiểu nghĩa của chữ Hán này ạ. B: Những lúc dù có tra từ điển cỡ nào vẫn chịu chết không ra thì bất cứ lúc nào cũng cứ hỏi thầy nhé." }
];

quizzes21_25[25] = {
  p: [
    "もしお金___あったら、家を買う。|が|を,に,で", 
    "雨___ふったら、サッカーをしない。|が|を,に,で", 
    "7時___なったら、ごはんを食べる。|に|が,を,で", 
    "子供___病気のとき、病院へ連れていく。|が|を,に,で", 
    "雨___ふっても、行きます。|が|を,に,で", 
    "いくらお金___あっても、結婚しない。|が|を,に,で", 
    "日曜日___働かなければならない。|đơn giản|từ,cho đến,và", 
    "ご主人___出かけるまえに、何と言う？|が|を,に,で", 
    "学校___出たら、会社で働く。|を|が,に,で", 
    "誕生日にお腹___痛かったら、どうしますか。|が|を,に,で"
  ],
  v: [
    "もし明日___だったら、カラオケへ行く。|ひま|đẹp trời,mưa,lạnh", 
    "もし明日___だったら、公園を散歩する。|いい天気|rảnh,mưa,lạnh", 
    "___だったら、出かけない。|雨|rảnh,đẹp trời,lạnh", 
    "嫌いだったら、___なくてもいい。|飲ま|rảnh,đẹp trời,lạnh", 
    "___かったら、顔を洗います。|ねむ|nóng,rảnh,mưa", 
    "___かったら、エアコンをつけます。|あつ|buồn ngủ,rảnh,mưa", 
    "家へ帰ったら、___をあびる。|シャワー|cơm,sách,xe", 
    "なんさいになったら車を___ことができますか。|運転する|lên xe,đi bộ,đi", 
    "いくら___ても、買わない。|やすく|đắt,tiện,rảnh", 
    "いくら___ても、わからない。|しらべ|nhìn,nghe,đọc"
  ],
  g: [
    "時間があったら、本を___。|読む|読んで,読まない,読んだ", 
    "安かったら、___。|買う|買わない,買った,買って", 
    "勉強が終わったら、家へ___。|帰る|帰った,帰らない,帰って", 
    "薬を飲んでも、よく___。|ならない|なります,なった,なって", 
    "眠くても、勉強しなければ___。|ならない|なります,なった,なって", 
    "もし雨が___たら、買い物をする。|ふらなかっ|ふる,ふった,ふって", 
    "お腹が痛かったら、薬を___。|飲む|飲まない,読んだ,飲んで", 
    "パスポートをなくしたら、大使館へ___。|行く|行った,行かない,行って", 
    "いくら便利___、行かない。|でも|から,まで,とき", 
    "妻が病気に___、どうしますか。|なったら|なります,なった,なって"
  ]
};
