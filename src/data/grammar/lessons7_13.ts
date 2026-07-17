import { GrammarPoint, Dialogue, LessonQuizRaw } from "../grammarN5Data";

export const grammar7_13: Record<number, GrammarPoint[]> = {};
export const dialogues7_13: Record<number, Dialogue[]> = {};
export const quizzes7_13: Record<number, LessonQuizRaw> = {};

// --- BÀI 7 ---
grammar7_13[7] = [
  { pattern: "N(công cụ) で V", meaning: "Làm V bằng N", note: "Trợ từ で chỉ công cụ, phương tiện, phương thức hoặc ngôn ngữ thực hiện.", examples: [
    { jp: "箸でご飯を食べます。", vn: "Ăn cơm bằng đũa." },
    { jp: "スプーンでカレーを食べます。", vn: "Ăn cà-ri bằng thìa." },
    { jp: "手でおにぎりを食べます。", vn: "Ăn cơm nắm bằng tay." },
    { jp: "鋏で紙を切ります。", vn: "Cắt giấy bằng kéo." },
    { jp: "A: 日本語でレポートを書きますか。B: いいえ、英語で書きます。", vn: "A: Bạn viết báo cáo bằng tiếng Nhật à? B: Không, tôi viết bằng tiếng Anh." }
  ]},
  { pattern: "「Từ/Câu」は ～語で ～です", meaning: "Từ/Câu ~ trong tiếng ~ là ~", note: "Dùng để dịch hoặc giải thích ý nghĩa từ ngữ qua một ngôn ngữ khác.", examples: [
    { jp: "『ありがとう』はベトナム語で『Cảm ơn』です。", vn: "Arigatou tiếng Việt là Cảm ơn." },
    { jp: "『すみません』はベトナム語で『Xin lỗi』です。", vn: "Sumimasen tiếng Việt là Xin lỗi." },
    { jp: "A: これは日本語で何ですか。B: 『パソコン』です。", vn: "A: Cái này tiếng Nhật là gì? B: Là 'Pasokon'." },
    { jp: "A: 『本』は英語で何ですか。B: 『Book』です。", vn: "A: 'Sách' tiếng Anh là gì? B: Là 'Book'." },
    { jp: "『Goodbye』は日本語で『さようなら』です。", vn: "Goodbye tiếng Nhật là Sayounara." }
  ]},
  { pattern: "N1 に N2 を あげます", meaning: "Cho/Tặng N1 cái N2", note: "Hành động xuất phát từ phía chủ ngữ hướng tới người nhận N1 (đi với に).", examples: [
    { jp: "私は友達に本をあげます。", vn: "Tôi tặng sách cho bạn." },
    { jp: "私は母に時計をあげます。", vn: "Tôi tặng đồng hồ cho mẹ." },
    { jp: "私は友達にお金を貸します。", vn: "Tôi cho bạn mượn tiền." },
    { jp: "私は妹に英語を教えます。", vn: "Tôi dạy tiếng Anh cho em gái." },
    { jp: "A: 誰に手紙を送りますか。B: 彼女に送ります。", vn: "A: Bạn gửi thư cho ai thế? B: Tôi gửi cho bạn gái." }
  ]},
  { pattern: "N1 に N2 を もらいます", meaning: "Nhận N2 từ N1", note: "Chủ ngữ nhận đồ vật từ N1. Có thể thay に bằng から khi đối tượng là cơ quan, tổ chức.", examples: [
    { jp: "私は友達に本をもらいました。", vn: "Tôi đã nhận sách từ bạn." },
    { jp: "私はサントスさんに靴をもらいます。", vn: "Tôi nhận giày từ anh Santos." },
    { jp: "私は父にネクタイをもらいました。", vn: "Tôi đã nhận cà vạt từ bố." },
    { jp: "図書館に本を借ります。", vn: "Tôi mượn sách từ thư viện." },
    { jp: "A: 誰に日本語を習いますか。B: ラン先生に習います。", vn: "A: Bạn học tiếng Nhật từ ai? B: Tôi học từ cô Lan." }
  ]},
  { pattern: "もう Vましたか / まだです", meaning: "Đã làm V chưa? / Chưa làm.", note: "もう kết hợp động từ quá khứ hỏi sự hoàn thành. Trả lời chưa xong bắt buộc dùng まだです.", examples: [
    { jp: "A: もうご飯を食べましたか。B: はい、もう食べました。", vn: "A: Bạn đã ăn cơm chưa? B: Vâng, tôi ăn rồi." },
    { jp: "A: もうご飯を食べましたか。 B: いいえ、まだです。", vn: "A: Bạn đã ăn cơm chưa? B: Chưa, tôi vẫn chưa ăn." },
    { jp: "A: もう手紙を送りましたか。B: はい、さっき送りました。", vn: "A: Bạn đã gửi thư chưa? B: Vâng, tôi gửi lúc nãy rồi." },
    { jp: "A: もう荷物を送りましたか。B: いいえ、まだです。これから送ります。", vn: "A: Bạn đã gửi hành lý chưa? B: Chưa, vẫn chưa. Bây giờ tôi sẽ gửi." },
    { jp: "A: もう日本語のテストをしましたか。B: はい、もうしました。", vn: "A: Bạn đã làm bài kiểm tra tiếng Nhật chưa? B: Vâng, tôi làm rồi." }
  ]}
];

dialogues7_13[7] = [
  { jp: "A: 『ありがとう』は英語で何ですか。B: 『Thank you』です。A: じゃ、これはベトナム語で何ですか。B: それは『Hoa』です。", vn: "A: 'Arigatou' tiếng Anh là gì? B: Là 'Thank you'. A: Vậy cái này tiếng Việt là gì? B: Cái đó là 'Hoa'." },
  { jp: "A: もう山田さんに誕生日のプレゼントをあげましたか。B: はい、昨日時計をあげました。とても喜びましたよ。", vn: "A: Bạn đã tặng quà sinh nhật cho anh Yamada chưa? B: Rồi, hôm qua tôi tặng cái đồng hồ. Anh ấy đã rất vui đấy." },
  { jp: "A: すみません、その本は誰にもらいましたか。B: これは木村さんにもらいました。A: もう読みましたか。B: いいえ、まだです。", vn: "A: Xin lỗi, cuốn sách đó bạn nhận từ ai thế? B: Tôi nhận từ chị Kimura. A: Đã đọc chưa? B: Chưa, tôi vẫn chưa đọc." }
];

quizzes7_13[7] = {
  p: [
    "箸___ご飯を食べます。|で|に,を,へ", 
    "友達___プレゼントをあげます。|に|で,を,へ", 
    "父___時計をもらいました。|に|で,を,へ", 
    "「ありがとう」___英語で？|は|が,を,に", 
    "鋏___紙を切ります。|で|に,を,へ", 
    "日本語___レポートを書きます。|で|に,を,へ", 
    "誰___手紙を送りますか。|に|で,を,へ", 
    "サントスさん___靴をもらいます。|に|で,を,へ", 
    "図書館___本を借ります。|に|で,を,へ", 
    "先生___日本語を習います。|に|で,を,へ"
  ],
  v: [
    "紙を___で切ります。|鋏|パソコン,先生,お金", 
    "手紙を___で送ります。|パソコン|鋏,先生,お金", 
    "___を貸します。|お金|鋏,パソコン,先生", 
    "___に習います。|先生|鋏,パソコン,お金", 
    "___でご飯を食べます。|箸|鋏,パソコン,先生", 
    "___でカレーを食べます。|スプーン|鋏,パソコン,先生", 
    "___でおにぎりを食べます。|手|鋏,パソコン,先生", 
    "「ありがとう」は___で『Cảm ơn』です。|ベトナム語|鋏,パソコン,先生", 
    "___に英語を教えます。|妹|鋏,パソコン,先生", 
    "___に時計をあげます。|母|鋏,パソコン,先生"
  ],
  g: [
    "もう___。|食べました|食べます,食べません,食べて", 
    "いいえ、___。|まだです|食べました,食べません,食べて", 
    "これから___。|食べます|食べました,食べません,食べて", 
    "手紙を___。|送りましたか|送りますか,送りませんか,送って", 
    "日本語 của テストを___。|しましたか|しますか,しませんか,して", 
    "友達に本を___。|あげます|あげました,あげません,あげて", 
    "母に時計を___。|あげます|あげました,あげません,あげて", 
    "友達にお金を___。|貸します|貸しました,貸しません,貸して", 
    "妹に英語を___。|教えます|教えました,教えません,教えて", 
    "先生に日本語を___。|習います|習いました,習いません,習って"
  ]
};

// --- BÀI 8 ---
grammar7_13[8] = [
  { pattern: "N は Aい / Aな です", meaning: "N thì tính chất A", note: "Mô tả tính chất, trạng thái của danh từ ở hiện tại khẳng định. Tính từ đuôi な bỏ な thêm です.", examples: [
    { jp: "この時計は高いです。", vn: "Cái đồng hồ này đắt." },
    { jp: "あの靴は新しいです。", vn: "Đôi giày kia mới." },
    { jp: "桜はきれいです。", vn: "Hoa anh đào đẹp." },
    { jp: "この部屋は静かです。", vn: "Căn phòng này yên tĩnh." },
    { jp: "あの人は親切です。", vn: "Người kia tốt bụng." }
  ]},
  { pattern: "N は Aくない / Aじゃありません", meaning: "N không tính chất A", note: "Phủ định tính từ hiện tại. Tính từ đuôi い bỏ い thêm くない. Tính từ đuôi な thêm じゃありません.", examples: [
    { jp: "この時計は高くないです。", vn: "Cái đồng hồ này không đắt." },
    { jp: "このカメラは新しくないです。", vn: "Máy ảnh này không mới." },
    { jp: "この部屋はきれいじゃありません。", vn: "Căn phòng này không sạch đẹp." },
    { jp: "昨日のテストは簡単じゃありませんでした。", vn: "Bài kiểm tra hôm qua không dễ." },
    { jp: "あの人は親切じゃありません。", vn: "Người kia không tốt bụng." }
  ]},
  { pattern: "Aい N / Aな な N", meaning: "Danh từ N mang tính chất A", note: "Tính từ đứng trước danh từ bổ nghĩa trực tiếp. Tính từ đuôi な giữ nguyên な.", examples: [
    { jp: "高い時計です。", vn: "Là chiếc đồng hồ đắt tiền." },
    { jp: "良い人です。", vn: "Là người tốt." },
    { jp: "親切な人です。", vn: "Là người tốt bụng." },
    { jp: "静かな所です。", vn: "Là một nơi yên tĩnh." },
    { jp: "有名な町です。", vn: "Là thị trấn nổi tiếng." }
  ]},
  { pattern: "N は どう / どんなN ですか", meaning: "N thế nào? / Là loại N thế nào?", note: "どう hỏi cảm tưởng chung. どんな hỏi tính chất chi tiết và phải đi kèm danh từ ngay sau.", examples: [
    { jp: "A: この時計はどうですか。B: とても良いです。", vn: "Hỏi: Cái đồng hồ này thế nào? Đáp: Rất tốt." },
    { jp: "A: 日本の生活はどうですか。B: 忙しいですが, 楽しいです。", vn: "Hỏi: Cuộc sống ở Nhật thế nào? Đáp: Bận rộn nhưng vui." },
    { jp: "A: トゥンさんはどんな人ですか。 B: 親切な人です。", vn: "Hỏi: Tùng là người như thế nào? Đáp: Là người tốt bụng." },
    { jp: "A: あなたの部屋はどんな所ですか. B: 静かな所です。", vn: "Hỏi: Phòng bạn là nơi thế nào? Đáp: Là nơi yên tĩnh." },
    { jp: "A: ハノイはどんな町ですか. B: 賑やかな町です。", vn: "Hỏi: Hà Nội là thành phố thế nào? Đáp: Là thành phố náo nhiệt." }
  ]},
  { pattern: "とても / あまり / ～が", meaning: "Rất / Không... lắm / Nhưng...", note: "とても bổ nghĩa câu khẳng định. あまり đi với câu phủ định. が nối hai vế tương phản.", examples: [
    { jp: "この時計はとても高いです。", vn: "Đồng hồ này rất đắt." },
    { jp: "この部屋はあまり静かじゃありません。", vn: "Phòng này không yên tĩnh lắm." },
    { jp: "この時計はきれいですが、高いです。", vn: "Đồng hồ này đẹp nhưng đắt." },
    { jp: "日本の食べ物はおいしいですが、高いです。", vn: "Đồ ăn Nhật ngon nhưng đắt." },
    { jp: "この漢字は難しいですが、面白いです。", vn: "Chữ Hán này khó nhưng thú vị." }
  ]}
];

dialogues7_13[8] = [
  { jp: "A: 日本の生活はどうですか。楽しいですか。B: はい、とても楽しいです。đúng, 少し物価が高いです。", vn: "A: Cuộc sống ở Nhật thế nào? Vui không? B: Vâng, vui lắm. Nhưng giá cả hơi đắt một chút." },
  { jp: "A: 山田先生はどんな人ですか。厳しいですか。B: いいえ、厳しくないです。とても親切な先生ですよ。", vn: "A: Thầy Yamada là người thế nào? Nghiêm khắc không? B: Không, không nghiêm khắc đâu. Là một giáo viên rất tốt bụng đấy." },
  { jp: "A: ハノイは静かな町ですか。B: いいえ、静かじゃありません。とても賑やかな町ですが, 面白くて好きです。", vn: "A: Hà Nội là thành phố yên tĩnh phải không? B: Không, không yên tĩnh đâu. Là thành phố rất náo nhiệt nhưng thú vị nên tôi thích." }
];

quizzes7_13[8] = {
  p: [
    "桜___きれいです。|は|が,を,に", 
    "日本の生活___どうですか。|は|が,を,に", 
    "コーヒー___紅茶。|と|は,が,を", 
    "ハノイ___どんな町ですか。|は|が,を,に", 
    "この時計___高いです。|は|が,を,に", 
    "あの靴___新しいです。|は|が,を,に", 
    "この部屋___静かです。|は|が,を,に", 
    "あの人___親切です。|は|が,を,に", 
    "この時計はきれい___、高いです。|ですが|から,と,で", 
    "日本の食べ物はおいしい___、高いです。|ですが|から,と,で"
  ],
  v: [
    "この時計は___です。|高い|有名,親切,静かな", 
    "富士山は___です。|有名|高い,親切,静かな", 
    "先生は___です。|親切|高い,有名,静かな", 
    "___町です。|静かな|高い,有名,親切", 
    "この靴は___です。|新しい|有名,親切,静かな", 
    "この部屋は___です。|きれい|高い,有名,親切", 
    "日本の生活は___ですか。|どう|どんな,何,誰", 
    "トゥンさんは___人ですか。|どんな|どう,何,誰", 
    "ハノイはどんな___ですか. |町|どう,何,誰", 
    "この時計は___高いです。|とても|あまり,どんな,どう"
  ],
  g: [
    "高い___。|です|じゃありません,でした,じゃありませんでした", 
    "寒く___。|ないです|じゃありません,でした,じゃありませんでした", 
    "きれい___。|じゃありません|ないです,でした,じゃありませんでした", 
    "元気___。|でした|じゃありません,ないです,じゃありませんでした", 
    "この時計は高く___。|ないです|じゃありません,でした,じゃありませんでした", 
    "このカメラは新しく___。|ないです|じゃありません,でした,じゃありませんでした", 
    "この部屋はきれい___。|じゃありません|ないです,でした,じゃありませんでした", 
    "昨日のテストは簡単___。|じゃありませんでした|ないです,でした,じゃありません", 
    "あの人は親切___。|じゃありません|ないです,でした,じゃありませんでした", 
    "この部屋はあまり静か___。|じゃありません|ないです,でした,じゃありませんでした"
  ]
};

// --- BÀI 9 ---
grammar7_13[9] = [
  { pattern: "N が あります / わかります", meaning: "Có N / Hiểu N", note: "Đi với đối tượng sở hữu hoặc năng lực, trạng thái. Bắt buộc dùng trợ từ が thay cho を.", examples: [
    { jp: "私は車があります。", vn: "Tôi có xe hơi." },
    { jp: "私はお金があります。", vn: "Tôi có tiền." },
    { jp: "私は日本語が分かります。", vn: "Tôi hiểu tiếng Nhật." },
    { jp: "A: 英語が分かりますか。B: いいえ、分かりません。", vn: "A: Bạn hiểu tiếng Anh không? B: Không, tôi không hiểu." },
    { jp: "私は時間がありませんから, TVを見ません。", vn: "Tôi không có thời gian nên không xem tivi." }
  ]},
  { pattern: "N が 好き / 嫌い / 上手 / 下手です", meaning: "Thích / Ghét / Giỏi / Kém N", note: "Tính từ biểu thị tâm lý, cảm xúc hoặc năng lực luôn đi kèm trợ từ が đối với tân ngữ.", examples: [
    { jp: "私は車が好きです。", vn: "Tôi thích xe hơi." },
    { jp: "私はタバコが嫌いです。", vn: "Tôi ghét thuốc lá." },
    { jp: "山田さんは料理が上手です。", vn: "Anh Yamada nấu ăn giỏi." },
    { jp: "私はスポーツが下手です。", vn: "Tôi chơi thể thao kém." },
    { jp: "A: 日本語が上手ですね。B: いいえ、まだまだです。", vn: "A: Bạn giỏi tiếng Nhật nhỉ. B: Không, tôi còn kém lắm." }
  ]},
  { pattern: "どんな N が 好きですか", meaning: "Thích loại N nào?", note: "Dùng để hỏi sở thích chi tiết trong một phạm vi cụ thể rộng lớn.", examples: [
    { jp: "A: どんなスポーツが好きですか。B: サッカーが好きです。", vn: "Hỏi: Bạn thích môn thể thao nào? Đáp: Tôi thích bóng đá." },
    { jp: "A: どんな食べ物が好きですか。B: 日本料理が好きです。", vn: "Hỏi: Bạn thích đồ ăn nào? Đáp: Tôi thích món ăn Nhật." },
    { jp: "A: どんな音楽が好きですか。 B: ポップスが好きです。", vn: "Hỏi: Bạn thích loại nhạc nào? Đáp: Tôi thích nhạc Pop." },
    { jp: "A: どんな映画が好きですか. B: アクション映画が好きです。", vn: "Hỏi: Bạn thích phim gì? Đáp: Tôi thích phim hành động." },
    { jp: "A: どんな飲み物が好きですか. B: ビールが好きです。", vn: "Hỏi: Bạn thích đồ uống gì? Đáp: Tôi thích bia." }
  ]},
  { pattern: "よく / だいたい / たくさん / 少し / 全然", meaning: "Các phó từ mức độ và số lượng", note: "よく, だいたい, 全然 đi với động từ chỉ năng lực. たくさん, 少し đi với danh từ số lượng.", examples: [
    { jp: "日本語がよく分かります。", vn: "Tôi hiểu rõ tiếng Nhật." },
    { jp: "英語がだいたい分かります。", vn: "Tôi hiểu đại khái tiếng Anh." },
    { jp: "お金がたくさんあります。", vn: "Tôi có nhiều tiền." },
    { jp: "日本語が少し分かります。", vn: "Tôi hiểu chút ít tiếng Nhật." },
    { jp: "英語が全然分かりません。", vn: "Tôi hoàn toàn không hiểu tiếng Anh." }
  ]},
  { pattern: "Mệnh đề 1 から、Mệnh đề 2", meaning: "Vì Mệnh đề 1, nên Mệnh đề 2", note: "から đứng sau mệnh đề nguyên nhân để dẫn giải kết quả ở mệnh đề sau.", examples: [
    { jp: "お金がありませんから、買いません。", vn: "Vì không có tiền nên không mua." },
    { jp: "野菜が嫌いですから、食べません。", vn: "Vì ghét rau nên tôi không ăn." },
    { jp: "日本語が好きですから、毎日勉強します。", vn: "Vì thích tiếng Nhật nên ngày nào tôi cũng học." },
    { jp: "時間がありませんから、映画を見ません。", vn: "Vì không có thời gian nên tôi không xem phim." },
    { jp: "用事がありますから、早く帰ります。", vn: "Vì có việc bận nên tôi đi về sớm." }
  ]}
];

dialogues7_13[9] = [
  { jp: "A: どんなスポーツが好きですか。よくしますか。B: サッカーが好きです。đúng, するのは下手ですからよく見ます。", vn: "A: Bạn thích môn thể thao nào? Có hay chơi không? B: Tôi thích bóng đá. Nhưng chơi kém nên tôi hay xem hơn." },
  { jp: "A: 今日は一緒に飲みに行きませんか。B: すみません。今日は用事がありますから, 早く帰ります。", vn: "A: Hôm nay cùng đi uống chút gì không? B: Xin lỗi. Hôm nay tôi có việc bận nên phải về sớm mất rồi." },
  { jp: "A: 英語がよく分かりますか。B: いいえ、だいたい分かりますが, 難しい言葉は全然分かりません。", vn: "A: Bạn có hiểu rõ tiếng Anh không? B: Không, tôi hiểu đại khái thôi, còn từ khó thì hoàn toàn chịu chết." }
];

quizzes7_13[9] = {
  p: [
    "車___好きです。|が|を,に,で", 
    "料理___上手です。|が|を,に,で", 
    "時間___ありません。|が|を,に,で", 
    "忙しい___、行きません。|から|まで,と,で", 
    "日本語___分かります。|が|を,に,で", 
    "タバコ___嫌いです。|が|を,に,で", 
    "スポーツ___下手です。|が|を,に,で", 
    "どんなスポーツ___好きですか。|が|を,に,で", 
    "お金___ありませんから、買いません。|が|を,に,で", 
    "野菜___嫌いですから、食べません。|が|を,に,で"
  ],
  v: [
    "___がわかります。|日本語|約束,だいたい,全然", 
    "___があります。|約束|日本語,だいたい,全然", 
    "___わかります。|だいたい|日本語,約束,全然", 
    "___ありません。|全然|日本語,約束,だいたい", 
    "___が好きですか。|どんな|どう,何,誰", 
    "___が上手です。|料理|約束,だいたい,全然", 
    "___が下手です。|スポーツ|約束,だいたい,全然", 
    "___がよく分かります。|日本語|約束,だいたい,全然", 
    "お金が___あります。|たくさん|だいたい,全然,約束", 
    "日本語が___分かります。|少し|だいたい,全然,約束"
  ],
  g: [
    "好き___。|es|じゃありません,でした,じゃありませんでした", 
    "上手___。|じゃありません|ないes,でした,nhà mới", 
    "わかり___。|ます|です,でした,じゃありません", 
    "日本語が好きですから、毎日___。|勉強します|勉強しました,勉強しませんでした,勉強して", 
    "時間がありませんから、映画を___。|見ません|見ます,見ました,見て", 
    "用事がありますから、早く___。|帰ります|帰りました,帰りません,帰って", 
    "英語が分かり___。|ますか|です,でしたか,じゃありませんか", 
    "お金が___。|あります|です,でした,nhà mới", 
    "タバコが___。|嫌いです|じゃありません,でした,じゃありませんでした", 
    "料理が上手___。|ですね|です,でした,nhà mới"
  ]
};

// --- BÀI 10 ---
grammar7_13[10] = [
  { pattern: "N(địa điểm) に N(vật/người) が あります/います", meaning: "Ở địa điểm N có vật/người", note: "あります dùng cho vật, cây cối, sự kiện đứng yên. います dùng cho thực thể cử động như người và động vật.", examples: [
    { jp: "教室に学生がいます。", vn: "Trong lớp học có học sinh." },
    { jp: "公園に犬がいます。", vn: "Trong công viên có con chó." },
    { jp: "教室に机があります。", vn: "Trong lớp học có cái bàn." },
    { jp: "部屋にテレビがあります。", vn: "Trong phòng có cái tivi." },
    { jp: "冷蔵庫の中にビールがあります。", vn: "Trong tủ lạnh có bia." }
  ]},
  { pattern: "N は どこ に ありますか / いますか", meaning: "N ở đâu vậy?", note: "Dùng để hỏi vị trí tồn tại hiện hữu của một chủ thể xác định.", examples: [
    { jp: "A: 山田さんはどこにいますか。B: 事務所にいます。", vn: "Hỏi: Anh Yamada ở đâu vậy? Đáp: Ở văn phòng." },
    { jp: "A: 犬はどこにいますか。B: 庭にいます。", vn: "Hỏi: Con chó ở đâu vậy? Đáp: Ở ngoài sân." },
    { jp: "A: 電話はどこにありますか。 B: 受付にあります。", vn: "Hỏi: Điện thoại ở đâu vậy? Đáp: Ở quầy lễ tân." },
    { jp: "A: 私の傘はどこにありますか. B: ドアのところにあります。", vn: "Hỏi: Ô của tôi ở đâu vậy? Đáp: Ở chỗ cửa ra vào." },
    { jp: "A: 佐藤さんはどこにいますか. B: 会議室にいます。", vn: "Hỏi: Chị Sato ở đâu vậy? Đáp: Ở phòng họp." }
  ]},
  { pattern: "N1 は N2(địa điểm) に あります / います", meaning: "N1 ở tại địa điểm N2", note: "Đưa danh từ cần miêu tả vị trí lên làm chủ ngữ đứng trước trợ từ は.", examples: [
    { jp: "山田さんは事務所にいます。", vn: "Anh Yamada ở văn phòng." },
    { jp: "佐藤さんは部屋にいます。", vn: "Chị Sato ở trong phòng." },
    { jp: "電話は教室にあります。", vn: "Điện thoại ở trong lớp học." },
    { jp: "本は机の上にあります。", vn: "Quyển sách ở trên bàn." },
    { jp: "犬は庭にいます。", vn: "Con chó ở ngoài sân." }
  ]},
  { pattern: "N1 の N2(vị trí)", meaning: "N2 (vị trí tương đối) của N1", note: "N2 là các danh từ không gian: 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong), 外 (ngoài).", examples: [
    { jp: "机の上に本があります。", vn: "Trên bàn có quyển sách." },
    { jp: "箱の中に時計があります。", vn: "Trong hộp có đồng hồ." },
    { jp: "駅の近くに銀行があります。", vn: "Gần nhà ga có ngân hàng." },
    { jp: "私の隣に山田さんがいます。", vn: "Bên cạnh tôi có anh Yamada." },
    { jp: "家の後ろに公園があります。", vn: "Phía sau nhà có công viên." }
  ]},
  { pattern: "N1 や N2 [など]", meaning: "N1 và N2 [chẳng hạn, vân vân]", note: "Dùng để liệt kê không đại diện hoàn toàn, chỉ đưa ra một vài đối tượng tiêu biểu.", examples: [
    { jp: "箱の中に手紙や写真があります。", vn: "Trong hộp có thư và ảnh (vân vân)." },
    { jp: "机の上に本や辞書があります。", vn: "Trên bàn có sách và từ điển." },
    { jp: "部屋にベッドや机などがあります。", vn: "Trong phòng có giường, bàn, v.v..." },
    { jp: "カバンの中に鉛筆やノートがあります。", vn: "Trong cặp có bút chì và vở." },
    { jp: "冷蔵庫の中に肉や野菜などがあります。", vn: "Trong tủ lạnh có thịt, rau, v.v..." }
  ]}
];

dialogues7_13[10] = [
  { jp: "A: すみません、山田さんはどこにいますか。B: 山田さんは今会議室にいますよ。A: そうですか。ありがとうございます。", vn: "A: Xin lỗi, anh Yamada ở đâu thế ạ? B: Anh Yamada bây giờ đang ở phòng họp đấy. A: Vậy ạ. Tôi xin cảm ơn." },
  { jp: "A: カバンの中に何がありますか。B: 手紙や写真などがあります。本もありますよ。", vn: "A: Trong cặp có những cái gì thế? B: Có thư và ảnh chẳng hạn. Ngoài ra cũng có sách nữa đấy." },
  { jp: "A: この近くに郵便局がありますか。B: ええ、駅の前に大きな郵便局があります。銀行の隣ですよ。", vn: "A: Gần đây có bưu điện nào không? B: Có, trước nhà ga có cái bưu điện lớn lắm. Ngay cạnh ngân hàng đấy." }
];

quizzes7_13[10] = {
  p: [
    "部屋___机があります。|に|で,を,へ", 
    "公園に犬___います。|が|を,に,で", 
    "机___上に。|の|は,が,に", 
    "箱の中___あります。|に|で,を,へ", 
    "教室___学生がいます。|に|で,を,へ", 
    "教室___机があります。|に|で,を,へ", 
    "冷蔵庫の中___ビールがあります。|に|で,を,へ", 
    "駅の近く___銀行があります。|に|で,を,へ", 
    "私の隣___山田さんがいます。|に|で,を,へ", 
    "家の後ろ___公園があります。|に|で,を,へ"
  ],
  v: [
    "事務所に___。|います|あります,机,外", 
    "机の___に。|上|事務所,銀行,外", 
    "近くに___があります。|銀行|事務所,机,外", 
    "___に犬がいます。|外|事務所,机,銀行", 
    "___はどこにいますか。|山田さん|机,銀行,外", 
    "___はどこにいますか。|犬|机,銀行,外", 
    "___はどこにありますか。|電話|机,銀行,外", 
    "私の___はどこにありますか。|傘|机,銀行,外", 
    "___は事務所にいます。|山田さん|机,銀行,外", 
    "電話は___にあります。|教室|机,銀行,外"
  ],
  g: [
    "あそこに男の人が___。|います|あります,です,でした", 
    "ポストが___。|あります|います,です,でした", 
    "誰も___。|いません|ありません,です,でした", 
    "何も___。|ありません|いません,です,でした", 
    "教室に学生が___。|います|あります,です,でした", 
    "公園に犬が___。|います|あります,です,でした", 
    "教室に机が___。|あります|います,です,でした", 
    "部屋にテレビが___。|あります|います,です,でした", 
    "冷蔵庫の中にビールが___。|あります|います,です,でした", 
    "山田さんは事務所に___。|います|あります,です,でした"
  ]
};

// --- BÀI 11 ---
grammar7_13[11] = [
  { pattern: "Lượng từ (つ、枚、台、人)", meaning: "Các loại lượng từ đếm số lượng", note: "つ đếm vật chung, 枚 đếm vật mỏng, 台 đếm máy móc, xe cộ, 人 đếm người. Đứng trước động từ.", examples: [
    { jp: "みかんが一つあります。", vn: "Có một quả quýt." },
    { jp: "紙が一枚あります。", vn: "Có một tờ giấy." },
    { jp: "テレビが一台あります。", vn: "Có một cái tivi." },
    { jp: "学生が三人います。", vn: "Có ba học sinh." },
    { jp: "自転車が四台あります。", vn: "Có bốn chiếc xe đạp." }
  ]},
  { pattern: "いくつ / 何枚 / 何台 / 何人", meaning: "Bao nhiêu cái/tờ/máy/người?", note: "Từ để hỏi số lượng tương ứng với từng nhóm loại danh từ đồ vật.", examples: [
    { jp: "A: 教室にいすがいくつありますか。B: 15あります。", vn: "Hỏi: Lớp học có bao nhiêu cái ghế? Đáp: Có 15 cái." },
    { jp: "A: シャツが何枚ありますか。B: 3枚あります。", vn: "Hỏi: Có bao nhiêu chiếc áo sơ mi? Đáp: Có 3 chiếc." },
    { jp: "A: うちに自転車が何台ありますか。B: 2台あります。", vn: "Hỏi: Ở nhà có bao nhiêu chiếc xe đạp? Đáp: Có 2 chiếc." },
    { jp: "A: 教室に学生が何人いますか. B: 20人います。", vn: "Hỏi: Trong lớp có bao nhiêu học sinh? Đáp: Có 20 người." },
    { jp: "A: りんごがいくつありますか. B: 5つあります。", vn: "Hỏi: Có bao nhiêu quả táo? Đáp: Có 5 quả." }
  ]},
  { pattern: "N を [Số lượng] Vます", meaning: "Làm hành động V với số lượng đồ vật N", note: "Số lượng từ chỉ lượng đặt ngay trước hành động bổ nghĩa trực tiếp cho động từ, đứng sau trợ từ を.", examples: [
    { jp: "パンを二つ食べます。", vn: "Tôi ăn hai cái bánh mì." },
    { jp: "写真を二枚撮ります。", vn: "Tôi chụp hai tấm ảnh." },
    { jp: "テレビを一台買います。", vn: "Tôi mua một cái tivi." },
    { jp: "りんごを五つ買います。", vn: "Tôi mua năm quả táo." },
    { jp: "自転車を四台買います。", vn: "Tôi mua bốn chiếc xe đạp." }
  ]},
  { pattern: "どのくらい Vますか", meaning: "Làm V mất khoảng bao lâu?", note: "Hỏi thời lượng kéo dài của hành động (không đi kèm trợ từ に).", examples: [
    { jp: "A: 毎日どのくらい日本語を勉強しますか。B: 2時間勉強します。", vn: "Hỏi: Mỗi ngày học tiếng Nhật bao lâu? Đáp: Tôi học 2 tiếng." },
    { jp: "A: 毎日どのくらい寝ますか. B: 7時間寝ます。", vn: "Hỏi: Mỗi ngày bạn ngủ bao lâu? Đáp: Tôi ngủ 7 tiếng." },
    { jp: "旅行に三日行きます。", vn: "Tôi đi du lịch khoảng ba ngày." },
    { jp: "一週間休みます。", vn: "Tôi nghỉ ngơi một tuần." },
    { jp: "日本語を三か月勉強しました。", vn: "Tôi đã học tiếng Nhật được ba tháng." }
  ]},
  { pattern: "～かかります / [Thời gian] に ～回", meaning: "Mất phí/thời gian / Làm mấy lần trong khoảng thời gian", note: "かかります chỉ sự tiêu tốn. Trợ từ に chỉ hạn định tần suất chu kỳ.", examples: [
    { jp: "東京から大阪まで3000円かかります。", vn: "Từ Tokyo đến Osaka tốn 3000 Yên." },
    { jp: "バスで7時間かかります。", vn: "Tốn mất 7 tiếng bằng xe buýt." },
    { jp: "一日に三回ご飯を食べます。", vn: "Một ngày tôi ăn cơm ba lần." },
    { jp: "一週間に一回映画を見ます。", vn: "Một tuần tôi xem phim một lần." },
    { jp: "一年に二回お金をもらいます。", vn: "Một năm tôi nhận tiền hai lần." }
  ]}
];

dialogues7_13[11] = [
  { jp: "A: すみません、りんごを五つください。B: はい、五つですね。500円です。A: あと, 切手を何枚かありますか。B: はい, 何枚ですか。A: 2枚ください。", vn: "A: Xin lỗi cho tôi 5 quả táo. B: Vâng, 5 quả giá 500 Yên. A: Có tem thư không? B: Có, bạn cần mấy tờ? A: Cho tôi 2 tờ." },
  { jp: "A: 東京から京都まで新幹線でどのくらいかかりますか。B: 2時間半ぐらいかかります。A: いくらですか。B: 13000円です。", vn: "A: Từ Tokyo đến Kyoto đi tàu Shinkansen mất bao lâu? B: Mất khoảng 2 tiếng rưỡi. A: Giá bao nhiêu tiền? B: Khoảng 13000 Yên." },
  { jp: "A: どのくらい日本語を勉強しましたか。B: 6か月勉強しました。A: そうですか。ベトナムのどこから来ましたか。B: ハノイから来ました。", vn: "A: Bạn đã học tiếng Nhật được bao lâu rồi? B: Tôi học được 6 tháng rồi. A: Vậy à. Bạn đến từ nơi nào của Việt Nam? B: Tôi đến từ Hà Nội." }
];

quizzes7_13[11] = {
  p: [
    "りんご___3つ買います。|を|が,に,で", 
    "会議室___学生がいます。|に|で,を,へ", 
    "日本___1年います。|に|で,を,へ", 
    "1週間___2回。|に|で,を,へ", 
    "みかん___一つあります。|が|を,に,で", 
    "紙___一枚あります。|が|を,に,で", 
    "テレビ___一台あります。|が|を,に,で", 
    "学生___三人います。|が|を,に,で", 
    "自転車___四台あります。|が|を,に,で", 
    "教室にいす___いくつありますか。|が|を,に,で"
  ],
  v: [
    "みかんを___買います。|いくつ|何人,何台,何枚", 
    "学生が___います。|何人|いくつ,何台,何枚", 
    "車が___あります。|何台|いくつ,何人,何枚", 
    "切手を___買います。|何枚|いくつ,何人,何台", 
    "旅行に___行きます。|三日|いくつ,何人,何台", 
    "___休みます。|一週間|いくつ,何人,何台", 
    "日本語を___勉強しました。|三か月|いくつ,何人,何台", 
    "東京から大阪まで3000円___。|かかります|いくつ,何人,何台", 
    "バスで7時間___。|かかります|いくつ,何人,何台", 
    "新幹線で2時間___。|かかります|いくつ,何人,何台"
  ],
  g: [
    "1時間___。|かかります|あります,います,です", 
    "3つ___。|あります|います,です,でした", 
    "1か月___。|休みます|あります,います,です", 
    "パンを二つ___。|食べます|あります,います,です", 
    "写真を二枚___。|撮ります|あります,います,です", 
    "テレビを一台___。|買います|あります,います,です", 
    "りんごを五つ___。|買います|あります,います,です", 
    "自転車を四台___。|買います|あります,います,です", 
    "一日に三回ご飯を___。|食べます|あります,います,です", 
    "一週間に一回映画を___。|見ます|あります,います,です"
  ]
};

// --- BÀI 12 ---
grammar7_13[12] = [
  { pattern: "N は N/Aな でした / じゃありませんでした", meaning: "Đã là / Đã không là", note: "Thể quá khứ của câu danh từ và tính từ đuôi な.", examples: [
    { jp: "昨日は雨でした。", vn: "Hôm qua trời đã mưa." },
    { jp: "昨日は休みじゃありませんでした。", vn: "Hôm qua đã không phải là ngày nghỉ." },
    { jp: "昨日は暇でした。", vn: "Hôm qua tôi đã rảnh rỗi." },
    { jp: "昨日のテストは簡単でした。", vn: "Bài kiểm tra hôm qua đã rất dễ." },
    { jp: "公園は静かじゃありませんでした。", vn: "Công viên đã không yên tĩnh." }
  ]},
  { pattern: "N は Aかった / Aくなかった です", meaning: "Đã mang/không mang tính chất A", note: "Thể quá khứ của tính từ đuôi い: bỏ い thêm かった hoặc くなかった.", examples: [
    { jp: "先週、寒かったです。", vn: "Tuần trước đã rất lạnh." },
    { jp: "先月、忙しかったです。", vn: "Tháng trước đã bận rộn." },
    { jp: "昨日の試験は優しかったです。", vn: "Bài kiểm tra hôm qua dễ." },
    { jp: "お祭りは人が多くなかったです。", vn: "Lễ hội đã không có nhiều người." },
    { jp: "昨日の天気は良くなかったです。", vn: "Thời tiết hôm qua đã không tốt lắm." }
  ]},
  { pattern: "N1 は N2 より A です", meaning: "N1 thì mang tính chất A hơn N2", note: "Cấu trúc câu so sánh hơn giữa hai chủ thể đối tượng.", examples: [
    { jp: "北海道は九州より大きいです。", vn: "Hokkaido lớn hơn Kyushu." },
    { jp: "今月は先月より忙しいです。", vn: "Tháng này bận rộn hơn tháng trước." },
    { jp: "ひらがなは漢字より簡単です。", vn: "Chữ Hiragana dễ hơn chữ Kanji." },
    { jp: "電車はバスより速いです。", vn: "Tàu điện nhanh hơn xe buýt." },
    { jp: "牛肉は鶏肉より高いです。", vn: "Thịt bò đắt hơn thịt gà." }
  ]},
  { pattern: "N1 は N2 ほど Aくない / じゃありません", meaning: "N1 không mang tính chất A bằng N2", note: "Câu so sánh kém phương thức phủ định hoàn toàn vế so sánh.", examples: [
    { jp: "九州は北海道ほど大きくないです。", vn: "Kyushu không lớn bằng Hokkaido." },
    { jp: "先月は今月ほど忙しくないです。", vn: "Tháng trước không bận bằng tháng này." },
    { jp: "ひらがなは漢字ほど難しくないです。", vn: "Chữ Hiragana không khó bằng chữ Kanji." },
    { jp: "バスは電車ほど速くないです。", vn: "Xe buýt không nhanh bằng tàu điện." },
    { jp: "牛肉は鶏肉ほど安くないです。", vn: "Thịt bò không rẻ bằng thịt gà." }
  ]},
  { pattern: "N1 と N2 と どちらが Aですか / [Phạm vi] で何が一番 Aですか", meaning: "So sánh lựa chọn và so sánh nhất", note: "Chọn giữa 2 vật dùng どちら, chọn nhất trong phạm vi dùng 一番.", examples: [
    { jp: "A: 犬と猫とどちらが好きですか。B: 犬の方が好きです。", vn: "Hỏi: Chó và mèo thích con nào hơn? Đáp: Tôi thích chó hơn." },
    { jp: "A: ワープロとパソコンとどちらが便利ですか。B: どちらも便利です。", vn: "Hỏi: Máy đánh chữ và máy tính cái nào tiện hơn? Đáp: Cả hai đều tiện." },
    { jp: "A: 日本料理の中で何が一番好きですか。B: 寿司が一番好きです。", vn: "Hỏi: Trong món ăn Nhật thích món nào nhất? Đáp: Thích sushi nhất." },
    { jp: "A: 一年の中でいつが一番寒いですか。B: 2月が一番寒いです。", vn: "Hỏi: Trong một năm khi nào lạnh nhất? Đáp: Tháng 2 lạnh nhất." },
    { jp: "A: スポーツで何が一番面白いですか。B: サッカーが一番面白いです。", vn: "Hỏi: Trong các môn thể thao môn nào thú vị nhất? Đáp: Bóng đá thú vị nhất." }
  ]}
];

dialogues7_13[12] = [
  { jp: "A: 昨日の京都のお祭りはどうでしたか。B: とても賑やかでした。天気が良かったですから, 人が多かったですよ。A: 寒くなかったですか。B: いいえ、全然寒くなかったです。", vn: "A: Lễ hội ở Kyoto hôm qua thế nào? B: Rất náo nhiệt. Vì thời tiết đẹp nên người đông lắm. A: Có lạnh không? B: Không, hoàn toàn không lạnh." },
  { jp: "A: ホンさんとランさんとどちらが背が高いですか。B: ホンさんの方が高いです。đúng, テニスはランさんの方が上手ですよ。", vn: "A: Hương và Lan ai cao hơn? B: Hương cao hơn. Nhưng tennis thì Lan giỏi hơn đấy." },
  { jp: "A: ベトナムの料理で何が一番おいしいですか。B: フォーが一番おいしいです. 毎日食べたいですよ。A: そうですか。私もフォーが好きです。", vn: "A: Trong món ăn Việt Nam món nào ngon nhất? B: Phở ngon nhất. Ngày nào tôi cũng muốn ăn. A: Vậy à. Tôi cũng thích phở." }
];

quizzes7_13[12] = {
  p: [
    "昨日___雨でした。|は|が,を,に", 
    "北海道___九州より。|は|が,を,に", 
    "車___電車とどちらが。|と|は,が,を", 
    "季節___中で。|の|は,が,に", 
    "昨日___休みじゃありませんでした。|は|が,を,に", 
    "昨日___暇でした。|は|が,を,に", 
    "昨日___暇じゃありませんでした。|は|が,を,に", 
    "お祭り___賑やかでした。|は|が,を,に", 
    "昨日のテスト___簡単でした。|は|が,を,に", 
    "公園___静かじゃありませんでした。|は|が,を,に"
  ],
  v: [
    "昨日の天気は___ですか。|どう|何,誰,いつ", 
    "何が___好きですか。|一番|どう,誰,いつ", 
    "___の方が好きです。|海|どう,一番,いつ", 
    "___より大きいです。|東京|どう,一番,いつ", 
    "チュエンさんはリンさんより___です。|高い|どう,一番,いつ", 
    "北海道は九州より___です。|大きい|どう,一番,いつ", 
    "今月は先月より___です。|忙しい|どう,一番,いつ", 
    "ひらがなは漢字より___です。|簡単|どう,一番,いつ", 
    "電車はバスより___です。|速い|どう,一番,いつ", 
    "ジエムさんはロアンさんより高く___です。|ない|どう,一番,いつ"
  ],
  g: [
    "昨日は___。|暇でした|暇です,暇じゃありません,暇じゃありませんでした", 
    "寒く___。|なかったです|ないです,じゃありません,でした", 
    "きれい___。|じゃありませんでした|じゃありません,ないes,でした", 
    "雨___。|でした|です,じゃありません,じゃありませんでした", 
    "九州は北海道ほど大きく___。|ないです|じゃありません,でした,じゃありませんでした", 
    "先月は今月ほど忙しく___。|ないです|じゃありません,でした,じゃありませんでした", 
    "ひらがなは漢字ほど難しく___。|ないです|じゃありません,でした,じゃありませんでした", 
    "バスは電車ほど速く___。|ないです|じゃありません,でした,じゃありませんでした", 
    "犬と猫とどちらが___。|好きですか|好きです,好きじゃありません,好きでした", 
    "犬の方が___。|好きです|好きですか,好きじゃありません,好きでした"
  ]
};

// --- BÀI 13 ---
grammar7_13[13] = [
  { pattern: "N が ほしいです", meaning: "Muốn có danh từ N", note: "Bày tỏ ước muốn sở hữu một vật gì đó. Không dùng cho người thứ ba hành động.", examples: [
    { jp: "私はパソコンがほしいです。", vn: "Tôi muốn có máy tính." },
    { jp: "うちがほしいです。", vn: "Tôi muốn có nhà riêng." },
    { jp: "お金が欲しいです。", vn: "Tôi muốn có tiền." },
    { jp: "カメラが欲しくないです。", vn: "Tôi không muốn có máy ảnh." },
    { jp: "A: あなたは今何が一番ほしいですか。B: 新しい車がほしいです。", vn: "A: Bây giờ bạn muốn có cái gì nhất? B: Tôi muốn có ô tô mới." }
  ]},
  { pattern: "Vたいです", meaning: "Muốn làm hành động V", note: "Động từ bỏ ます thêm たいです. Đối tượng chịu hành động có thể đi với が hoặc を.", examples: [
    { jp: "私はご飯を食べたいです。", vn: "Tôi muốn ăn cơm." },
    { jp: "私は水を飲みたいです。", vn: "Tôi muốn uống nước." },
    { jp: "寿司を食べたいです。", vn: "Tôi muốn ăn sushi." },
    { jp: "うちへ帰りたいです。", vn: "Tôi muốn về nhà." },
    { jp: "彼と結婚したいです。", vn: "Tôi muốn kết hôn với anh ấy." }
  ]},
  { pattern: "Vたくないです", meaning: "Không muốn làm hành động V", note: "Phủ định của Vtai. Đổi đuôi たい thành たくないです.", examples: [
    { jp: "寿司が食べたくないです。", vn: "Tôi không muốn ăn sushi." },
    { jp: "コーヒーが飲みたくないです。", vn: "Tôi không muốn uống cà phê." },
    { jp: "映画が見たくないです。", vn: "Tôi không muốn xem phim." },
    { jp: "うちへ帰りたくないです。", vn: "Tôi không muốn về nhà." },
    { jp: "彼と結婚したくないです。", vn: "Tôi không muốn kết hôn với anh ấy." }
  ]},
  { pattern: "N(địa điểm) へ V(bỏ ます)に 行きます/来ます/帰ります", meaning: "Đi/Đến/Về N để thực hiện mục đích V", note: "Danh từ đứng trước に có thể là danh từ mục đích hành động hoặc động từ bỏ ます.", examples: [
    { jp: "コーヒーを飲みに行きます。", vn: "Tôi đi uống cà phê." },
    { jp: "肉と野菜を買いに行きます。", vn: "Tôi đi mua thịt và rau." },
    { jp: "昨日、本を読みにいきました。", vn: "Hôm qua tôi đã đi đọc sách." },
    { jp: "週末、食事に行きます。", vn: "Cuối tuần tôi đi ăn uống." },
    { jp: "プールへ泳ぎに行きます。", vn: "Tôi đi đến hồ bơi để bơi." }
  ]},
  { pattern: "何か / 誰か / どこか", meaning: "Cái gì đó / Ai đó / Nơi nào đó", note: "Đại từ bất định. Khi đi kèm trợ từ を hoặc へ có thể lược bỏ trợ từ.", examples: [
    { jp: "A: 明日、休みですから、どこか行きませんか。B: ええ、行きましょう。", vn: "A: Ngày mai nghỉ, đi đâu đó chơi không? B: Vâng, đi nào." },
    { jp: "A: 寂しいですから、誰かと話したいです。B: 私と話しましょう。", vn: "A: Vì buồn nên tôi muốn nói chuyện with ai đó. B: Hãy nói chuyện với tôi đi." },
    { jp: "A: お腹がすきましたね。何か食べたいですか。B: ええ、おおにぎりを食べたいです。", vn: "A: Đói bụng rồi nhỉ. Có muốn ăn cái gì đó không? B: Có, tôi muốn ăn cơm nắm." },
    { jp: "喉が渇きましたから, 何か飲みたいです。", vn: "Vì khát nước nên tôi muốn uống cái gì đó." },
    { jp: "冬休みにどこかへ行きたいです。", vn: "Kỳ nghỉ đông tôi muốn đi đâu đó chơi." }
  ]}
];

dialogues7_13[13] = [
  { jp: "A: 今、何が一番欲しいですか。B: 新しい車が欲しいです。今の車は古いですから。A: そうですか。私は時間が欲しいです。", vn: "A: Bây giờ bạn muốn có cái gì nhất? B: Tôi muốn có ô tô mới. Vì ô tô bây giờ cũ rồi. A: Vậy à. Tôi thì muốn có thời gian." },
  { jp: "A: 週末は何かしましたか。B: ええ、神戸へインド料理を食べに行きました。とてもおいしかったですよ。A: そうですか。私も行きたいです。", vn: "A: Cuối tuần bạn có làm gì không? B: Có, tôi đã đi Kobe để ăn món Ấn Độ. Ngon lắm đấy. A: Thế à. Tôi cũng muốn đi." },
  { jp: "A: 暑いですね。どこかへ泳ぎに行きませんか。B: いいですね。じゃ、土曜日に一緒に行きましょう。", vn: "A: Nóng quá nhỉ. Đi đâu đó bơi không? B: Hay đấy. Vậy thứ bảy tuần này cùng đi nhé." }
];

quizzes7_13[13] = {
  p: [
    "お金___ほしいです。|が|を,に,で", 
    "水___飲みたいです。|を|が,に,で", 
    "デパート___行きます。|へ|に,で,を", 
    "買い物___行きます。|に|で,を,へ", 
    "パソコン___ほしいです。|が|を,に,で", 
    "うち___ほしいです. |が|を,に,で", 
    "カメラ___欲しくないです。|が|を,に,で", 
    "あなたは何___ほしいですか。|が|を,に,で", 
    "ご飯___食べたいです。|を|が,に,で", 
    "寿司___食べたいです。|を|が,に,で"
  ],
  v: [
    "___がほしいですか。|何|どこか,何か,誰か", 
    "___を食べたいですか。|何|どこか,何か,誰か", 
    "___に行きたいです。|どこか|何か,誰か,何", 
    "映画を___に行きます。|見|どこか,何か,誰か", 
    "コーヒーを___に行きます。|飲み|どこか,何か,誰か", 
    "肉と野菜を___に行きます。|買い|どこか,何か,誰か", 
    "本を___にいきました。|読み|どこか,何か,誰か", 
    "プールへ___に行きます。|泳ぎ|どこか,何か,誰か", 
    "公園へ___に行きます。|散歩|どこか,何か,誰か", 
    "日本へ___に行きます。|買い物|どこか,何か,誰か"
  ],
  g: [
    "ほしく___。|ないです|ありません,でした,じゃありませんでした", 
    "帰りたく___。|ないです|ありません,でした,じゃありませんでした", 
    "遊びに___。|行きます|行きました,行きません,行って", 
    "結婚し___。|たいです|たくないです,たかったです,たくなかったです", 
    "コーヒーが飲みたく___。|ないです|ありません,でした,じゃありませんでした", 
    "映画が見たく___。|ないです|ありません,でした,じゃありませんでした", 
    "彼と結婚したく___。|ないです|ありません,でした,じゃありませんでした", 
    "週末、食事に___。|行きます|行きました,行きません,行って", 
    "喫茶店へコーヒーを飲みに___。|いきます|いきました,いきません,いって", 
    "どこかへ行き___。|たいです|たくないです,たかったです,たくなかったです"
  ]
};
