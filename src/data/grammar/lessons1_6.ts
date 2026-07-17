import { GrammarPoint, Dialogue, LessonQuizRaw } from "../grammarN5Data";

export const grammar1_6: Record<number, GrammarPoint[]> = {};
export const dialogues1_6: Record<number, Dialogue[]> = {};
export const quizzes1_6: Record<number, LessonQuizRaw> = {};

// --- BÀI 1 ---
grammar1_6[1] = [
  { pattern: "S は N です", meaning: "S là N", note: "Khẳng định danh tính, nghề nghiệp, quốc tịch của chủ ngữ.", examples: [
    { jp: "私はマイクです。", vn: "Tôi là Mike." },
    { jp: "私は学生です。", vn: "Tôi là học sinh." },
    { jp: "山田さんは先生です。", vn: "Anh Yamada là giáo viên." },
    { jp: "私はいまベトナム人です。", vn: "Tôi là người Việt Nam." },
    { jp: "私は19歳です。", vn: "Tôi 19 tuổi." }
  ]},
  { pattern: "S は N じゃありません", meaning: "S không phải là N", note: "Phủ định của danh từ trong câu lịch sự.", examples: [
    { jp: "私は医者じゃありません。", vn: "Tôi không phải là bác sĩ." },
    { jp: "あの人は学生じゃありません。", vn: "Người kia không phải là học sinh." },
    { jp: "リーさんは29歳じゃありません。", vn: "Chị Lee không phải 29 tuổi." },
    { jp: "私は中国人じゃありません。", vn: "Tôi không phải người Trung Quốc." },
    { jp: "山田さんは教師じゃありません。", vn: "Anh Yamada không phải giáo viên." }
  ]},
  { pattern: "S は N ですか", meaning: "S là N phải không?", note: "Mẫu câu hỏi xác nhận thông tin đúng hoặc sai.", examples: [
    { jp: "A: あなたは学生ですか。B: はい、私は学生です。", vn: "Hỏi: Bạn là học sinh phải không? Đáp: Vâng, tôi là học sinh." },
    { jp: "A: あの人は先生ですか。B: いいえ、先生じゃありません。", vn: "Hỏi: Người kia là giáo viên phải không? Đáp: Không, không phải giáo viên." },
    { jp: "A: リーさんは中国人ですか。B: はい、そうです。", vn: "Hỏi: Chị Lee là người Trung Quốc phải không? Đáp: Vâng, đúng vậy." },
    { jp: "A: 山田さんは33歳ですか。B: いいえ、35歳です。", vn: "Hỏi: Anh Yamada 33 tuổi phải không? Đáp: Không, anh ấy 35 tuổi." },
    { jp: "A: あの人は医者ですか。B: はい、医者です。", vn: "Hỏi: Người kia là bác sĩ phải không? Đáp: Vâng, là bác sĩ." }
  ]},
  { pattern: "N1 の N2", meaning: "N2 của N1 / N2 thuộc N1", note: "Nối hai danh từ, chỉ sự sở hữu hoặc cơ quan trực thuộc.", examples: [
    { jp: "私はIMCの社員です。", vn: "Tôi là nhân viên của IMC." },
    { jp: "ミーさんはABSセンターの学生です。", vn: "My là học sinh trung tâm ABS." },
    { jp: "山田さんはYamahaの社員です。", vn: "Anh Yamada là nhân viên của Yamaha." },
    { jp: "キムさんはSamsungの社員です。", vn: "Anh Kim là nhân viên công ty Samsung." },
    { jp: "私は桜大学の学生です。", vn: "Tôi là sinh viên đại học Sakura." }
  ]},
  { pattern: "S も N です", meaning: "S cũng là N", note: "Trợ từ も thay thế cho は khi thông tin đồng nhất với vế trước.", examples: [
    { jp: "私も学生です。", vn: "Tôi cũng là học sinh." },
    { jp: "山田さんも会社員です。", vn: "Anh Yamada cũng là nhân viên công ty." },
    { jp: "あの人も日本人です。", vn: "Người kia cũng là người Nhật." },
    { jp: "リーさんも28歳です。", vn: "Chị Lee cũng 28 tuổi." },
    { jp: "私もベトナム人です。", vn: "Tôi cũng là người Việt Nam." }
  ]}
];

dialogues1_6[1] = [
  { jp: "A: 初めまして。私はマイクです。ベトナム人です。どうぞよろしく。", vn: "A: Rất hân hạnh được gặp bạn. Tôi là Mike. Tôi là người Việt Nam. Rất mong được giúp đỡ." },
  { jp: "B: 初めまして。山田です。マイクさんは学生ですか。", vn: "B: Rất hân hạnh. Tôi là Yamada. Anh Mike là học sinh phải không?" },
  { jp: "A: いいえ、私は学生じゃありません。IMCの会社員です。", vn: "A: Không, tôi không phải là học sinh. Tôi là nhân viên công ty IMC." }
];

quizzes1_6[1] = {
  p: [
    "私___マイクです。|は|が,を,に", 
    "私___学生です。|も|を,が,の", 
    "山田さん___先生です。|は|で,を,に", 
    "IMC___社員です。|の|が,は,と", 
    "あなた___学生ですか。|は|が,の,も", 
    "私___ベトナム人です。|は|に,で,を", 
    "桜大学___学生です。|の|が,に,へ", 
    "あの人___木村さんです。|は|が,の,も", 
    "リーさん___28歳です。|は|が,で,を", 
    "あの人___先生ですか。|も|の,を,に"
  ],
  v: [
    "私はベトナム___です。|人|語,歳,さん", 
    "あの人は___ですか。|誰|何,どこ,いつ", 
    "山田さんは33___です。|歳|人,年,番", 
    "私は___です。IMCで働きます。|会社員|医者,学生,先生", 
    "病院にいます。私は___です。|医者|教師,学生,銀行員", 
    "あの人は佐藤___です。|さん|人,歳,先生", 
    "初めまして。___はマイクです。|私|あなた,あの人,誰", 
    "学校で勉強します。私は___です。|学生|医者,銀行員,会社員", 
    "教えます。私は___です。|教師|学生,医者,銀行員", 
    "お金を数えます。私は___です。|銀行員|教師,医者,学生"
  ],
  g: [
    "私は医者___。|じゃありません|です,でした,じゃありませんでした", 
    "あの人は先生___。|ですか|です,じゃありませんか,でしたか", 
    "私は学生___。大学で勉強します。|です|じゃありません,でした,じゃありませんでした", 
    "サントスさんはブラジル人___。|です|じゃありません,でした,じゃありませんでした", 
    "いいえ、学生___。|じゃありません|です,ですか,でした", 
    "はい、会社員___。|です|じゃありません,でした,じゃありませんでした", 
    "リーさんは中国人___。|ですか|です,じゃありませんか,でしたか", 
    "私も学生___。|です|じゃありません,でした,じゃありませんでした", 
    "IMCの社員___。|です|じゃありません,でした,じゃありませんでした", 
    "あの人は誰___。|ですか|です,じゃありませんか,でしたか"
  ]
};

// --- BÀI 2 ---
grammar1_6[2] = [
  { pattern: "これ/それ/あれ は N です", meaning: "Cái này/đó/kia là N", note: "Đại từ chỉ định đồ vật. これ gần người nói, それ gần người nghe, あれ xa cả hai.", examples: [
    { jp: "これは本です。", vn: "Đây là quyển sách." },
    { jp: "それは時計です。", vn: "Đó là cái đồng hồ." },
    { jp: "あれは車です。", vn: "Kia là chiếc xe hơi." },
    { jp: "これは辞書です。", vn: "Đây là quyển từ điển." },
    { jp: "それは手帳です。", vn: "Đó là cuốn sổ tay." }
  ]},
  { pattern: "これ は なん ですか", meaning: "Cái này là cái gì?", note: "Dùng để hỏi nội dung hoặc tên đồ vật.", examples: [
    { jp: "A: これは何ですか。B: それは本です。", vn: "Hỏi: Đây là cái gì? Đáp: Đó là quyển sách." },
    { jp: "A: それは何ですか。B: これは名刺です。", vn: "Hỏi: Đó là cái gì? Đáp: Đây là danh thiếp." },
    { jp: "A: あれは何ですか。B: あれは車です。", vn: "Hỏi: Kia là cái gì? Đáp: Kia là xe hơi." },
    { jp: "A: これは何の雑誌ですか。B: 自動車の雑誌です。", vn: "Hỏi: Đây là tạp chí về cái gì? Đáp: Tạp chí về ô tô." },
    { jp: "A: それは何の本ですか。B: 日本語の本です。", vn: "Hỏi: Đó là sách gì? Đáp: Sách tiếng Nhật." }
  ]},
  { pattern: "N1 ですか、N2 ですか", meaning: "Là N1 hay là N2?", note: "Câu hỏi chọn lựa, người nghe chọn một trong hai phương án.", examples: [
    { jp: "A: これは本ですか、ノートですか。B: ノートです。", vn: "Hỏi: Đây là sách hay vở? Đáp: Là vở." },
    { jp: "A: それは辞書ですか、雑誌ですか。B: 辞書です。", vn: "Hỏi: Đó là từ điển hay tạp chí? Đáp: Là từ điển." },
    { jp: "A: あれはボールペンですか、鉛筆ですか。B: 鉛筆です。", vn: "Hỏi: Kia là bút bi hay bút chì? Đáp: Là bút chì." },
    { jp: "A: これは『9』ですか、『7』ですか。B: 『9』です。", vn: "Hỏi: Đây là số 9 hay số 7? Đáp: Số 9." },
    { jp: "A: それは時計ですか、カメラですか。B: 時計です。", vn: "Hỏi: Đó là đồng hồ hay máy ảnh? Đáp: Là đồng hồ." }
  ]},
  { pattern: "N1 の N2 (Sở hữu)", meaning: "N2 của N1", note: "Chỉ quyền sở hữu. N2 có thể lược bỏ nếu đã rõ nghĩa ở trước.", examples: [
    { jp: "これは私の本です。", vn: "Đây là quyển sách của tôi." },
    { jp: "それは佐藤さんの傘です。", vn: "Đó là cái ô của chị Sato." },
    { jp: "あれは会社の手帳です。", vn: "Kia là cuốn sổ tay của công ty." },
    { jp: "この本は私のです。", vn: "Quyển sách này là của tôi." },
    { jp: "その時計は山田さんのです。", vn: "Chiếc đồng hồ đó là của anh Yamada." }
  ]},
  { pattern: "この/その/あの N", meaning: "N này/đó/kia", note: "Từ chỉ định bổ nghĩa trực tiếp cho danh từ đi kèm ngay sau.", examples: [
    { jp: "この時計は高いです。", vn: "Chiếc đồng hồ này đắt." },
    { jp: "そのカメラは新しいです。", vn: "Chiếc máy ảnh đó mới." },
    { jp: "あの車は会社のです。", vn: "Chiếc xe kia là của công ty." },
    { jp: "この人は誰ですか。", vn: "Người này là ai?" },
    { jp: "その傘は佐藤さんのです。", vn: "Chiếc ô đó là của chị Sato." }
  ]}
];

dialogues1_6[2] = [
  { jp: "A: それは何ですか。時計ですか、カメラですか。", vn: "A: Đó là cái gì vậy? Đồng hồ hay là máy ảnh?" },
  { jp: "B: これは佐藤さんのカメラです。新しいですよ。", vn: "B: Đây là máy ảnh của chị Sato. Mới tinh luôn đấy." },
  { jp: "A: このカメラは佐藤さんのですか。いいですね。", vn: "A: Chiếc máy ảnh này là của chị Sato à? Thích thế nhỉ." }
];

quizzes1_6[2] = {
  p: [
    "これ___本です。|は|が,を,に", 
    "時計___雑誌です。|か|は,が,を", 
    "私___傘です。|の|は,が,に", 
    "誰___かばんですか。|の|が,は,を", 
    "この本___私のです。|は|が,を,に", 
    "それ___何ですか。|は|が,を,の", 
    "これ___ボールペンです。|は|が,を,の", 
    "あそこ___トイレです。|は|が,を,に", 
    "あの車___会社のです。|は|が,を,の", 
    "山田さん___辞書です。|の|は,が,を"
  ],
  v: [
    "これは___ですか。|何|誰,どこ,いつ", 
    "これは___ですか。|辞書|食べる,飲む,行く", 
    "それは___です。|手帳|寝る,起きる,買う", 
    "___の傘ですか。|誰|何,どこ,いつ", 
    "これは何の___ですか。|本|誰,どこ,いつ", 
    "あれは___です。|車|食べる,寝る,起きる", 
    "これは___です。|時計|誰,何,どこ", 
    "それは___です。|鉛筆|行く,来る,帰る", 
    "これは何の___ですか。|雑誌|誰,どこ,いつ", 
    "あれは___です。|カメラ|読む,書く,聞く"
  ],
  g: [
    "これは私の___。|です|ます,でした,じゃありませんか", 
    "あれは車___。|じゃありません|です,ですか,でしたか", 
    "その時計は私___。|のです|です,じゃありません,でした", 
    "これは本ですか、ノート___。|ですか|です,じゃありませんか,でしたか", 
    "それは誰の___。|ですか|です,じゃありません,でした", 
    "この本は私___。|のです|です,じゃありません,でした", 
    "あれはカメラ___。|ですか|です,じゃありませんか,でしたか", 
    "これは辞書___。|じゃありません|です,ですか,でした", 
    "それは時計___。|es|じゃありません,でした,じゃありませんでした", 
    "あの車は会社___。|のです|です,じゃありません,でした"
  ]
};

// --- BÀI 3 ---
grammar1_6[3] = [
  { pattern: "ここ/そこ/あそこ は N です", meaning: "Chỗ này/đó/kia là N", note: "Đại từ chỉ địa điểm, vị trí không gian.", examples: [
    { jp: "ここは教室です。", vn: "Chỗ này là lớp học." },
    { jp: "そこは食堂です。", vn: "Chỗ đó là nhà ăn." },
    { jp: "あそこは会議室です。", vn: "Chỗ kia là phòng họp." },
    { jp: "ここは事務所です。", vn: "Chỗ này là văn phòng." },
    { jp: "あそこはトイレです。", vn: "Chỗ kia là nhà vệ sinh." }
  ]},
  { pattern: "N は どこ/どちら ですか", meaning: "N ở đâu/hướng nào?", note: "Hỏi vị trí địa điểm. どちら mang sắc thái lịch sự hơn.", examples: [
    { jp: "A: 教室はどこですか。B: あそこです。", vn: "Hỏi: Lớp học ở đâu? Đáp: Ở đằng kia." },
    { jp: "A: 受付はどこですか。B: 1階です。", vn: "Hỏi: Quầy lễ tân ở đâu? Đáp: Ở tầng 1." },
    { jp: "A: エレベーターはどちらですか。B: あちらです。", vn: "Hỏi: Thang máy ở hướng nào? Đáp: Hướng đằng kia." },
    { jp: "A: お国はどちらですか。B: ベトナムです。", vn: "Hỏi: Đất nước của bạn là nước nào? Đáp: Là Việt Nam." },
    { jp: "A: 会社はどちらですか。B: IMCです。", vn: "Hỏi: Công ty của bạn ở đâu? Đáp: Là công ty IMC." }
  ]},
  { pattern: "N1 の N2 (Xuất xứ)", meaning: "N2 của N1 / N2 sản xuất tại N1", note: "N1 chỉ quốc gia hoặc công ty sản xuất ra vật dụng N2.", examples: [
    { jp: "これは日本の車です。", vn: "Đây là xe hơi Nhật Bản." },
    { jp: "それは中国の靴です。", vn: "Đó là giày Trung Quốc." },
    { jp: "あれはアメリカの時計です。", vn: "Kia là đồng hồ Mỹ." },
    { jp: "これはどこのカメラですか。", vn: "Đây là máy ảnh của nước nào?" },
    { jp: "それはイタリア의 ワインです。", vn: "Đó là rượu vang Ý." }
  ]},
  { pattern: "N は いくら ですか", meaning: "N giá bao nhiêu tiền?", note: "Dùng để hỏi giá tiền của sản phẩm hàng hóa.", examples: [
    { jp: "A: この時計はいくらですか。B: 3000円です。", vn: "Hỏi: Chiếc đồng hồ này giá bao nhiêu? Đáp: 3000 Yên." },
    { jp: "A: そのカメラはいくらですか。B: 25000円です。", vn: "Hỏi: Cái máy ảnh đó giá bao nhiêu? Đáp: 25000 Yên." },
    { jp: "A: この靴はいくらですか。B: 5000円です。", vn: "Hỏi: Đôi giày này giá bao nhiêu? Đáp: 5000 Yên." },
    { jp: "A: これはいくらですか。B: 800円です。", vn: "Hỏi: Cái này bao nhiêu tiền? Đáp: 800 Yên." },
    { jp: "A: あれはいくらですか。B: 100万円です。", vn: "Hỏi: Kia giá bao nhiêu? Đáp: 1 triệu Yên." }
  ]},
  { pattern: "N は 何階 ですか", meaning: "N ở tầng mấy?", note: "Dùng hỏi số tầng vị trí cụ thể trong tòa nhà.", examples: [
    { jp: "食堂は何階ですか。", vn: "Nhà ăn ở tầng mấy?" },
    { jp: "事務所は何階ですか。", vn: "Văn phòng ở tầng mấy?" },
    { jp: "会議室は3階です。", vn: "Phòng họp ở tầng 3." },
    { jp: "トイレは1階です。", vn: "Nhà vệ sinh ở tầng 1." },
    { jp: "時計売り場は何階ですか。", vn: "Quầy bán đồng hồ ở tầng mấy?" }
  ]}
];

dialogues1_6[3] = [
  { jp: "A: すみません、受付はどこですか。どちらですか。", vn: "A: Xin lỗi, quầy lễ tân ở đâu vậy ạ? Hướng nào ạ?" },
  { jp: "B: 受ificitはあそこです。エスカレーターの隣ですよ。", vn: "B: Quầy lễ tân ở đằng kia. Cạnh thang cuốn đấy ạ." },
  { jp: "A: このネクタイはいくらですか。フランスのですか。B: はい、フランスのです。5000円です。", vn: "A: Cà vạt này bao nhiêu tiền vậy? Xuất xứ Pháp à? B: Vâng, đồ Pháp ạ. Giá 5000 Yên." }
];

quizzes1_6[3] = {
  p: [
    "ここ___教室です。|は|が,を,に", 
    "トイレ___どこですか。|は|が,を,に", 
    "ワイン___売り場はどこですか。|の|は,が,に", 
    "イタリア___ワインです。|の|は,が,を", 
    "あそこ___食堂です。|は|が,を,に", 
    "エレベーター___どちらですか。|は|が,を,に", 
    "事務所___3階です。|は|が,を,に", 
    "これ___どこのカメラですか。|は|が,を,の", 
    "日本___車です。|の|は,が,に", 
    "お国___どちらですか。|は|が,を,に"
  ],
  v: [
    "事務所は___ですか。|どこ|何,誰,いつ", 
    "トイレは___です。|あそこ|誰,何,いつ", 
    "エレベーターは___ですか。|どちら|誰,何,いつ", 
    "これは___のワインですか。|どこ|誰,何,いつ", 
    "___は3階です。|食堂|誰,何,いつ", 
    "受付は___ですか。|どこ|何,誰,いつ", 
    "ここは___です。|教室|誰,何,いつ", 
    "階段は___です。|あちら|誰,何,いつ", 
    "これは___のカメラですか。|どこ|誰,何,いつ", 
    "___は1階です。|トイレ|誰,何,いつ"
  ],
  g: [
    "ここは食堂___。|です|じゃありません,でした,じゃありませんでした", 
    "トイレはどこ___。|ですか|です,じゃありませんか,でしたか", 
    "エレベーターはあちら___。|es|じゃありません,でした,じゃありませんでした", 
    "会社はどちら___。|ですか|です,じゃありませんか,でしたか", 
    "あれは日本の車___。|es|じゃありません,でした,じゃありませんでした", 
    "ここは事務所___。|じゃありません|です,ですか,でした", 
    "受付はどこ___。|ですか|です,じゃありませんか,でしたか", 
    "階段はあちら___。|es|じゃありません,でした,じゃありませんでした", 
    "お国はどちら___。|ですか|です,じゃありませんか,でしたか", 
    "これはどこのカメラ___。|ですか|です,じゃありませんか,でしたか"
  ]
};

// --- BÀI 4 ---
grammar1_6[4] = [
  { pattern: "今、～時～分です", meaning: "Bây giờ là ~ giờ ~ phút", note: "Cách diễn đạt mốc thời gian hiện tại trong tiếng Nhật.", examples: [
    { jp: "今、7時半です。", vn: "Bây giờ là 7 rưỡi." },
    { jp: "今、12時です。", vn: "Bây giờ là 12 giờ." },
    { jp: "今、午後3時です。", vn: "Bây giờ là 3 giờ chiều." },
    { jp: "今、何時ですか。", vn: "Bây giờ là mấy giờ?" },
    { jp: "今、午前9時です。", vn: "Bây giờ là 9 giờ sáng." }
  ]},
  { pattern: "Vます / Vません / Vました / Vませんでした", meaning: "Hành động khẳng định/phủ định (Hiện tại/Quá khứ)", note: "Đuôi động từ lịch sự thể hiện thời gian hành động.", examples: [
    { jp: "毎日勉強します。", vn: "Mỗi ngày tôi học bài." },
    { jp: "日曜日は働きません。", vn: "Chủ nhật tôi không làm việc." },
    { jp: "昨日休みました。", vn: "Hôm qua tôi đã nghỉ làm." },
    { jp: "一指定勉強しませんでした。", vn: "Hôm kia tôi đã không học bài." },
    { jp: "明日働きます。", vn: "Ngày mai tôi sẽ làm việc." }
  ]},
  { pattern: "S に Vます", meaning: "Làm hành động V vào lúc mốc thời gian S", note: "Trợ từ に đứng sau danh từ thời gian chứa số cụ thể.", examples: [
    { jp: "私は7時に起きます。", vn: "Tôi thức dậy lúc 7 giờ." },
    { jp: "毎晩11時に寝ます。", vn: "Mỗi tối tôi đi ngủ lúc 11 giờ." },
    { jp: "5時に終わります。", vn: "Kết thúc lúc 5 giờ." },
    { jp: "何時に起きますか。", vn: "Bạn thức dậy lúc mấy giờ?" },
    { jp: "日曜日、9時に起きました。", vn: "Chủ nhật tôi đã dậy lúc 9 giờ." }
  ]},
  { pattern: "N1 から N2 まで", meaning: "Từ N1 đến N2", note: "Biểu thị điểm bắt đầu và kết thúc của thời gian hoặc không gian.", examples: [
    { jp: "銀行は9時から3時までです。", vn: "Ngân hàng mở cửa từ 9 giờ đến 3 giờ." },
    { jp: "昼休みは12時から1時までです。", vn: "Giờ nghỉ trưa từ 12 giờ đến 1 giờ." },
    { jp: "私は8時から5時まで働きます。", vn: "Tôi làm việc từ 8 giờ đến 5 giờ." },
    { jp: "昨日、9時から10時半まで勉強しました。", vn: "Hôm qua tôi đã học từ 9 giờ đến 10 rưỡi." },
    { jp: "何時から何時まで働きますか。", vn: "Bạn làm việc từ mấy giờ đến mấy giờ?" }
  ]},
  { pattern: "N1 と N2", meaning: "N1 và N2", note: "Nối hai danh từ cùng loại, mang tính liệt kê toàn bộ.", examples: [
    { jp: "休みは土曜日と日曜日です。", vn: "Ngày nghỉ là Thứ bảy và Chủ nhật." },
    { jp: "銀行の休みは土曜日と日曜日です。", vn: "Ngày nghỉ của ngân hàng là thứ bảy và chủ nhật." },
    { jp: "私と友達は勉強します。", vn: "Tôi và bạn cùng học bài." },
    { jp: "鉛筆と時計を買います。", vn: "Tôi mua bút chì và đồng hồ." },
    { jp: "休みは木曜日と日曜日です。", vn: "Ngày nghỉ là Thứ năm và Chủ nhật." }
  ]}
];

dialogues1_6[4] = [
  { jp: "A: 今、何時ですか。B: 午後3時半です。A: 郵便局は何時から何時までですか。B: 9時から5時までです。", vn: "A: Bây giờ mấy giờ? B: 3 rưỡi chiều. A: Bưu điện từ mấy giờ đến mấy giờ? B: Từ 9 giờ đến 5 giờ." },
  { jp: "A: 毎日何時に起きますか。B: 朝6時半に起きます。それから学校へ行きます。", vn: "A: Hàng ngày thức dậy lúc mấy giờ? B: Sáng 6 rưỡi dậy. Sau đó đến trường." },
  { jp: "A: 昨日の晩、勉強しましたか。B: いいえ、勉強しませんでした。休みました。", vn: "A: Tối qua có học bài không? B: Không, tôi không học. Tôi đã nghỉ ngơi." }
];

quizzes1_6[4] = {
  p: [
    "7時___起きます。|に|で,を,へ", 
    "9時___5時まで。|から|に,で,を", 
    "銀行___休み。|の|は,が,に", 
    "月曜日___日曜日。|と|は,が,を", 
    "3時___終わります。|に|で,を,へ", 
    "昼休みは12時___1時まで。|から|に,で,を", 
    "明日___働きます。|は|が,を,に", 
    "昨日___休みました。|は|が,を,に", 
    "毎日___勉強します。|は|が,を,に", 
    "今___何時ですか。|は|が,を,に"
  ],
  v: [
    "今___時ですか。|何|誰,どこ,いつ", 
    "___休みましたか。|昨日|明日,毎日,来週", 
    "___働きます。|明日|昨日,一昨日,先週", 
    "毎日___時に起きます。|何|誰,どこ,いつ", 
    "今は___9時です。|午前|明日,昨日,毎日", 
    "銀行は___からですか。|何時|何曜日,何人,何枚", 
    "___は何時からですか。|昼休み|誰,どこ,いつ", 
    "毎晩11時に___。|寝ます|起きます,働きます,終わります", 
    "5時に___。|終わります|起きます,寝ます,始まります", 
    "今日は___ですか。|何曜日|何時,何人,何枚"
  ],
  g: [
    "毎日___。|勉強します|勉強しました,勉強しませんでした,勉強して", 
    "昨日___。|勉強しました|勉強します,勉強しません,勉強して", 
    "日曜日___。|働きません|働きます,働きました,働いて", 
    "一昨日___。|働きませんでした|働きます,働きません,働いて", 
    "明日___。|働きます|働きました,働きませんでした,働いて", 
    "昨日___。|休みました|休みます,休みません,休んで", 
    "毎晩___。|寝ます|寝ました,寝ません,寝て", 
    "5時に___。|終わります|終わりました,終わりません,終わって", 
    "今、何時___。|ですか|です,でしたか,じゃありませんか", 
    "明日は___。|休みます|休みました,休みませんでした,休んで"
  ]
};

// --- BÀI 5 ---
grammar1_6[5] = [
  { pattern: "Nへ いきます/きます/かえります", meaning: "Đi / Đến / Về địa điểm N", note: "Trợ từ へ chỉ phương hướng di chuyển di động hành động.", examples: [
    { jp: "私は学校へ行きます。", vn: "Tôi đi đến trường." },
    { jp: "昨日デパートへ行きました。", vn: "Hôm qua tôi đã đi bách hóa." },
    { jp: "明日うちへ帰ります。", vn: "Ngày mai tôi sẽ về nhà." },
    { jp: "どこへ行きますか。", vn: "Bạn đi đâu thế?" },
    { jp: "日本へ来ました。", vn: "Tôi đã đến Nhật Bản." }
  ]},
  { pattern: "どこ[へ]も いきません/いきませんでした", meaning: "Không đi đâu cả", note: "Phủ định hoàn toàn điểm đến di chuyển.", examples: [
    { jp: "私はどこへも行きません。", vn: "Tôi không đi đâu cả." },
    { jp: "昨日、どこも行きませんでした。", vn: "Hôm qua tôi đã không đi đâu cả." },
    { jp: "日曜日、どこも行きませんでした。", vn: "Chủ nhật tôi đã không đi đâu." },
    { jp: "休みの日、どこも行きません。", vn: "Ngày nghỉ tôi không đi đâu." },
    { jp: "一昨日どこも行きませんでした。", vn: "Hôm kia tôi đã không đi đâu cả." }
  ]},
  { pattern: "N(phương tiện) で V", meaning: "Đi bằng phương tiện N", note: "Trợ từ で chỉ công cụ phương tiện giao thông. Đi bộ là 歩いて không dùng で.", examples: [
    { jp: "電車で学校へ行きます。", vn: "Tôi đi học bằng tàu điện." },
    { jp: "バスで会社へ行きます。", vn: "Tôi đi làm bằng xe buýt." },
    { jp: "飛行機で日本へ行きます。", vn: "Tôi đi Nhật bằng máy bay." },
    { jp: "毎日歩いて学校へ行きます。", vn: "Mỗi ngày tôi đi bộ đến trường." },
    { jp: "何でスーパーへ行きますか。", vn: "Bạn đi siêu thị bằng gì?" }
  ]},
  { pattern: "N(người) と V", meaning: "Làm hành động V cùng người N", note: "Trợ từ と chỉ đối tượng cùng thực hiện hành vi. Một mình dùng 一人で.", examples: [
    { jp: "友達と京都へ行きます。", vn: "Tôi đi Kyoto cùng bạn bè." },
    { jp: "家族と日本へ来ました。", vn: "Tôi đã đến Nhật cùng gia đình." },
    { jp: "一人でスーパーへ行きます。", vn: "Tôi đi siêu thị một mình." },
    { jp: "誰と会社へ行きますか。", vn: "Bạn đi làm cùng với ai?" },
    { jp: "彼女と映画を見に行きます。", vn: "Tôi đi xem phim cùng bạn gái." }
  ]},
  { pattern: "いつ Vますか", meaning: "Khi nào thực hiện V?", note: "Từ để hỏi thời gian, tuyệt đối không dùng trợ từ に phía sau.", examples: [
    { jp: "いつ日本へ行きますか。", vn: "Khi nào bạn đi Nhật Bản?" },
    { jp: "いつうちへ帰りますか。", vn: "Khi nào bạn về nhà?" },
    { jp: "いつ病院へ行きますか。", vn: "Khi nào đi bệnh viện?" },
    { jp: "いつ大学へ行きましたか。", vn: "Bạn đã đi học đại học khi nào?" },
    { jp: "誕生日はいつですか。", vn: "Sinh nhật của bạn là bao giờ?" }
  ]}
];

dialogues1_6[5] = [
  { jp: "A: 明後日、どこへ行きますか。B: 友達と京都へ行きます。A: 何で行きますか。B: 新幹線で行きます。", vn: "A: Ngày kia đi đâu? B: Đi Kyoto với bạn. A: Đi bằng gì? B: Đi bằng tàu siêu tốc Shinkansen." },
  { jp: "A: いつ日本へ来ましたか。B: 去年の10月に家族と来ました。", vn: "A: Đến Nhật khi nào thế? B: Đến cùng gia đình vào tháng 10 năm ngoái." },
  { jp: "A: 日曜日どこへ行きましたか。B: どこへも行きませんでした。一人で勉強しました。", vn: "A: Chủ nhật đi đâu không? B: Chẳng đi đâu cả. Tôi học bài một mình ở nhà." }
];

quizzes1_6[5] = {
  p: [
    "学校___行きます。|へ|に,で,を", 
    "電車___行きます。|で|に,へ,を", 
    "友達___行きます。|と|に,で,を", 
    "どこ___行きません。|も|が,を,に", 
    "日本___来ました。|へ|に,で,を", 
    "バス___会社へ行きます。|で|に,へ,を", 
    "家族___日本へ来ました。|と|に,で,を", 
    "一人___スーパーへ行きます。|で|に,へ,を", 
    "明日うち___帰ります。|へ|に,で,を", 
    "飛行機___日本へ行きます。|で|に,へ,を"
  ],
  v: [
    "___行きますか。|どこへ|誰,何,いつ", 
    "___帰りますか。|いつ|誰,何,どこ", 
    "___で行きますか。|何|誰,どこ,いつ", 
    "私は___で来ました。|飛行機|誰,何,いつ", 
    "毎日___学校へ行きます。|歩いて|飛行機,電車,バス", 
    "___と会社へ行きますか。|誰|何,どこ,いつ", 
    "彼女と___を見に行きます。|映画|誰,どこ,いつ", 
    "昨日___へ行きました。|デパート|誰,何,いつ", 
    "___日本へ来ました。|家族と|一人で,電車で,バスで", 
    "___スーパーへ行きます。|一人で|家族と,友達と,電車で"
  ],
  g: [
    "どこへも___。|行きません|行きます,行きました,行って", 
    "昨日デパートへ___。|行きました|行きます,行きません,行って", 
    "日曜日どこへも___。|行きませんでした|行きます,行きません,行って", 
    "明日うちへ___。|帰ります|帰りました,帰りません,帰って", 
    "日本へ___。|来ました|来ます,来ません,来て", 
    "毎日歩いて school へ___。|行きます|行きました,行きません,行って", 
    "誰と会社へ___。|行きますか|行きましたか,行きません,行って", 
    "彼女と映画を見に___。|行きます|行きました,行きません,行って", 
    "いつうちへ___。|帰りますか|帰りましたか,帰りません,帰って", 
    "誕生日はいつ___。|ですか|です,でしたか,じゃありませんか"
  ]
};

// --- BÀI 6 ---
grammar1_6[6] = [
  { pattern: "N を Vます", meaning: "Làm hành động V đối với danh từ N", note: "Trợ từ を chỉ đối tượng trực tiếp nhận tác động của ngoại động từ.", examples: [
    { jp: "パンを食べます。", vn: "Tôi ăn bánh mì." },
    { jp: "お茶を飲みます。", vn: "Tôi uống trà." },
    { jp: "新聞を読みます。", vn: "Tôi đọc báo." },
    { jp: "テレビを見ます。", vn: "Tôi xem tivi." },
    { jp: "手紙を書きます。", vn: "Tôi viết thư." }
  ]},
  { pattern: "なに を Vますか", meaning: "Làm cái gì?", note: "Dùng để hỏi về đối tượng chịu tác động của hành động.", examples: [
    { jp: "A: 明istは何をしますか。B: 友達に会います。", vn: "Hỏi: Ngày mai bạn làm gì? Đáp: Tôi đi gặp bạn bè." },
    { jp: "A: 昨日の晩、何をしましたか。B: テレビを見ました。", vn: "Hỏi: Tối qua bạn đã làm gì? Đáp: Tôi đã xem tivi." },
    { jp: "A: 毎朝何を飲みますか。B: 牛乳を飲みます。", vn: "Hỏi: Mỗi sáng uống gì? Đáp: Uống sữa bò." },
    { jp: "A: 日曜日、何か買いましたか。B: 何も買いませんでした。", vn: "Hỏi: Chủ nhật có mua gì không? Đáp: Không mua gì cả." },
    { jp: "A: 昨日、何か食べましたか。B: 何も食べませんでした。", vn: "Hỏi: Hôm qua có ăn gì không? Đáp: Chẳng ăn gì cả." }
  ]},
  { pattern: "N(địa điểm) で Vます", meaning: "Làm hành động V tại vị trí không gian N", note: "Trợ từ で chỉ nơi xảy ra hành động, hành vi (khác với に tồn tại).", examples: [
    { jp: "教室で日本語を勉強します。", vn: "Học tiếng Nhật ở trong lớp học." },
    { jp: "図書館で本を読みます。", vn: "Đọc sách ở thư viện." },
    { jp: "うちで手紙を書きます。", vn: "Viết thư ở nhà." },
    { jp: "食堂でご飯を食べます。", vn: "Ăn cơm ở nhà ăn." },
    { jp: "どこでその靴を買いましたか。", vn: "Bạn đã mua đôi giày đó ở đâu thế?" }
  ]},
  { pattern: "Vませんか / Vましょう", meaning: "Cùng làm V nhé? / Cùng làm V nào!", note: "Vませんか đưa ra lời mời tinh tế, Vましょう thể hiện ý chí đồng tình hô hào kéo theo hành động.", examples: [
    { jp: "A: 一緒にコーヒーを飲みませんか。B: ええ、いいですね。飲みましょう。", vn: "Hỏi: Cùng uống cà phê nhé? Đáp: Vâng, được đấy, cùng uống nào." },
    { jp: "A: 一緒にご飯を食べませんか。B: ええ、食べましょう。", vn: "Hỏi: Cùng ăn cơm nhé? Đáp: Vâng, cùng ăn nào." },
    { jp: "A: 一緒に映画を見に行きませんか。B: すみません、ちょっと...", vn: "Hỏi: Cùng đi xem phim nhé? Đáp: Xin lỗi, tôi bận mất rồi..." },
    { jp: "A: ロビーで少し休みませんか。B: ええ、休みましょう。", vn: "Hỏi: Nghỉ một chút ở sảnh nhé? Đáp: Vâng, cùng nghỉ thôi." },
    { jp: "A: テニスをしませんか。B: いいですね、しましょう。", vn: "Hỏi: Chơi tennis không? Đáp: Hay quá, chơi thôi." }
  ]},
  { pattern: "いつも / ときどき", meaning: "Luôn luôn / Thỉnh thoảng", note: "Các phó từ chỉ tần suất tần số đứng trước động từ hành động.", examples: [
    { jp: "私はいつもスーパーで肉を買います。", vn: "Tôi luôn luôn mua thịt ở siêu thị." },
    { jp: "時々デパートで服を買います。", vn: "Thỉnh thoảng tôi mua quần áo ở bách hóa." },
    { jp: "毎晩テレビを見ます。それから、本を読みます。", vn: "Mỗi tối tôi xem tivi. Sau đó, đọc sách." },
    { jp: "学校で勉強します。それから、うちで宿題をします。", vn: "Học ở trường. Sau đó làm bài tập ở nhà." },
    { jp: "いつも一人で勉強します。", vn: "Tôi luôn luôn tự học bài một mình." }
  ]}
];

dialogues1_6[6] = [
  { jp: "A: 日曜日、何をしましたか。B: 朝デパートで買い物しました。それから友達と映画を見ました。", vn: "A: Chủ nhật làm gì thế? B: Sáng mua sắm ở bách hóa. Sau đó đi xem phim với bạn." },
  { jp: "A: どこで映画を見ましたか。B: 新宿の映画館で見ました。とても面白かったですよ。", vn: "A: Xem phim ở đâu vậy? B: Xem ở rạp chiếu phim Shinjuku. Hay lắm đấy." },
  { jp: "A: 一緒にお茶を飲みませんか。B: ええ、いいですね。駅の前の喫茶店へ行きましょう。", vn: "A: Cùng đi uống trà chút không? B: Ôi hay quá. Cùng ra quán cà phê trước ga đi." }
];

quizzes1_6[6] = {
  p: [
    "パン___食べます。|を|が,に,で", 
    "教室___勉強します。|で|に,を,へ", 
    "友達___会います。|に|で,を,へ", 
    "コーヒー___飲みませんか。|を|が,に,で", 
    "手紙___書きます。|を|が,に,で", 
    "食堂___ご飯を食べます。|で|に,を,へ", 
    "デパート___肉を買います。|で|に,を,へ", 
    "テレビ___見ます。|を|が,に,で", 
    "新聞___読みます。|を|が,に,で", 
    "靴___買いましたか。|を|が,に,で"
  ],
  v: [
    "___を読みます。|新聞|映画,音楽,デパート", 
    "___を見ます。|映画|新聞,音楽,デパート", 
    "___を聞きます。|音楽|新聞,映画,デパート", 
    "___で買います。|デパート|新聞,映画,音楽", 
    "___を書きます。|手紙|新聞,映画,音楽", 
    "___を飲みます。|お茶|パン,新聞,映画", 
    "___を食べます。|パン|お茶,新聞,映画", 
    "___をします。|宿題|パン,お茶,新聞", 
    "___に会います。|友達|パン,お茶,新聞", 
    "___を撮ります。|写真|パン,お茶,新聞"
  ],
  g: [
    "一緒に___。|行きませんか|行きましょう,行きます,行きました", 
    "ええ、___。|行きましょう|行きませんか,行きます,行きました", 
    "何も___。|食べませんでした|食べます,食べません,食べて", 
    "明日何を___。|しますか|しましたか,しませんか,して", 
    "少し___。|休みましょう|休みませんか,休みます,休みました", 
    "一緒にご飯を___。|食べませんか|食べましょう,食べます,食べました", 
    "テレビを___。|見ます|見ました,見ません,見て", 
    "手紙を___。|書きます|書きました,書きません,書いて", 
    "靴を___。|買いましたか|買いますか,買いませんか,買って", 
    "友達に___。|会います|会いました,会いません,会って"
  ]
};
