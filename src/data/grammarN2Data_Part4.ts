import { GrammarN2Item } from "./grammarN2Data";

export const GRAMMAR_N2_PART4: GrammarN2Item[] = [
  // ========== BÀI 21 (106〜111) ==========
  {
    id: 106,
    pattern: "〜ぐらい・〜くらい",
    meaning: "Khoảng... / Đến mức... / Ít nhất thì...",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "N / V（辞書形）/ い形 / な形-な ＋ くらい / ぐらい"
    ],
    nuance: "1. Biểu thị mức độ tương đương hoặc mức độ tối thiểu: Đến mức như vậy / Ít nhất thì cũng...\n2. Biểu thị sự coi nhẹ hoặc đưa ra ví dụ ở mức thấp.",
    ruleConstraints: [
      "[Mức độ tối thiểu]: Thường đi cùng câu khuyên nhủ hoặc phàn nàn 'ít nhất việc đơn giản thế này cũng phải làm được'."
    ],
    examples: [
      { jp: "もう動けないくらい疲れた。", vn: "Tôi mệt đến mức không thể nhúc nhích được nữa." },
      { jp: "挨拶くらい、自分からしなさい。", vn: "Ít nhất chuyện chào hỏi thì hãy tự mình làm đi." },
      { jp: "簡単な日常会話くらいなら日本語で話せます。", vn: "Nếu chỉ là mức hội thoại hàng ngày đơn giản thì tôi có thể nói được bằng tiếng Nhật." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "倒れる（　　）忙しい毎日が続いている。",
        options: ["くらい", "さえ", "まで", "など"],
        correctIndex: 0,
        explanation: "Bận rộn đến mức ngã quỵ -> V-辞書形 + くらい / ぐらい."
      }
    ]
  },
  {
    id: 107,
    pattern: "〜など・〜なんか・〜なんて",
    meaning: "Cỡ như... / Mấy thứ như... / Những chuyện như...",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "N / V（辞書形） ＋ など / なんか / なんて"
    ],
    nuance: "Dùng để đưa ra ví dụ hoặc thể hiện thái độ khiêm tốn, coi nhẹ, xem thường, hoặc bất ngờ/kinh ngạc trước một sự việc.",
    ruleConstraints: [
      "[Khẩu ngữ]: 〜なんか và 〜話し言葉 mang tính thân mật, giao tiếp hàng ngày."
    ],
    examples: [
      { jp: "私なんてまだまだ未熟です。", vn: "Cỡ như tôi thì vẫn còn non nớt lắm." },
      { jp: "お化けなんて本当にいるわけがない。", vn: "Mấy thứ như ma quỷ làm gì có thật trên đời." },
      { jp: "彼がプロの歌手になるなんて夢にも思わなかった。", vn: "Chuyện anh ấy trở thành ca sĩ chuyên nghiệp thì trong mơ tôi cũng không ngờ tới." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "こんな難しい仕事、私（　　）できません。",
        options: ["なんか", "さえ", "まで", "くらい"],
        correctIndex: 0,
        explanation: "Cỡ như tôi (khiêm tốn/tự hạ thấp) -> 私 + なんか / なんて."
      }
    ]
  },
  {
    id: 108,
    pattern: "〜まで・〜までして・〜てまで",
    meaning: "Đến cả... / Thậm chí đến mức phải... (làm điều cực đoan)",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "N ＋ まで（して）",
      "V-て ＋ まで"
    ],
    nuance: "Nhấn mạnh mức độ cao đến bất ngờ hoặc việc phải làm một hành động cực đoan, quá mức bình thường để đạt được mục đích.",
    ruleConstraints: [
      "[Hành động cực đoan]: Thường mang sắc thái ngạc nhiên, phê phán hoặc quyết tâm cao độ làm một việc vượt quá giới hạn."
    ],
    examples: [
      { jp: "借金をしてまで高いブランド品を買う人の気持ちがわからない。", vn: "Tôi không thể hiểu nổi tâm lý của người thậm chí đến mức phải vay nợ để mua hàng hiệu đắt tiền." },
      { jp: "親をだましてまで手に入れたいものなどない。", vn: "Không có thứ gì tôi muốn đạt được đến mức thậm chí phải lừa dối cả cha mẹ." },
      { jp: "休日まで出勤して働く必要はない。", vn: "Không cần thiết phải đi làm đến tận cả những ngày nghỉ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "体を壊して（　　）働く必要はない。",
        options: ["まで", "さえ", "など", "くらい"],
        correctIndex: 0,
        explanation: "Làm việc đến mức thậm chí phá hủy cả sức khỏe -> V-て + まで."
      }
    ]
  },
  {
    id: 109,
    pattern: "〜として〜ない",
    meaning: "Một... cũng không... / Tuyệt đối không...",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "Số từ 1 (一人, 一日, 一度...) ＋ として ＋ 〜ない"
    ],
    nuance: "Dùng để phủ định hoàn toàn: Nhấn mạnh rằng ngay cả đơn vị nhỏ nhất (1 người, 1 ngày, 1 lần...) cũng không tồn tại hoặc không xảy ra.",
    ruleConstraints: [
      "[Số từ 1]: Bắt buộc đi cùng các đơn vị đếm số 1 như 1人, 1日, 1つ, 1回, 1秒..."
    ],
    examples: [
      { jp: "誰一人として彼の本当の正体を知らない。", vn: "Không một ai biết được thân phận thực sự của anh ta." },
      { jp: "彼の提案に反対する者は一人としていなかった。", vn: "Người phản đối đề xuất của anh ấy thì không một ai cả." },
      { jp: "一日としてあなたのことを忘れたことはありません。", vn: "Chưa có một ngày nào mà tôi quên đi hình bóng của bạn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "無駄にしていい時間は一秒（　　）ない。",
        options: ["として", "にとって", "にしては", "わりに"],
        correctIndex: 0,
        explanation: "1 giây cũng không có -> 一秒 + として + ない."
      }
    ]
  },
  {
    id: 110,
    pattern: "〜さえ",
    meaning: "Ngay cả... / Thậm chí...",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "N（＋Trợ từ） ＋ さえ",
      "V-て ＋ さえ"
    ],
    nuance: "Đưa ra một ví dụ cực đoan, điển hình nhất để ngụ ý rằng những cái khác đương nhiên cũng như vậy.",
    ruleConstraints: [
      "[Trợ từ]: Có thể thay thế cho が, を hoặc đi sau các trợ từ に, で..."
    ],
    examples: [
      { jp: "この問題は専門家でさえ解くのが難しい。", vn: "Vấn đề này ngay cả các chuyên gia cũng khó mà giải được." },
      { jp: "忙しすぎて、昼ご飯を食べる時間さえない。", vn: "Quá bận rộn nên ngay cả thời gian ăn trưa cũng không có." },
      { jp: "自分の名前さえ書けない子供が増えているそうだ。", vn: "Nghe nói số trẻ em ngay cả tên mình cũng không viết được đang ngày một tăng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "平仮名（　　）読めないのに、漢字が読めるわけがない。",
        options: ["さえ", "まで", "など", "として"],
        correctIndex: 0,
        explanation: "Ngay cả Hiragana cũng không đọc được -> N + さえ."
      }
    ]
  },
  {
    id: 111,
    pattern: "〜さえ〜ば",
    meaning: "Chỉ cần... là đủ / Chỉ cần... thì...",
    topicId: 21,
    topicName: "Bài 21: 〜くらい・〜ほど・程度",
    connection: [
      "N ＋ さえ ＋ V-ば / A-ければ / な形-なら",
      "V-ます ＋ さえすれば"
    ],
    nuance: "Diễn tả điều kiện duy nhất cần thiết: Chỉ cần điều kiện đó được đáp ứng thì những việc khác đều ổn thỏa hoặc sẽ thành công.",
    ruleConstraints: [
      "[Cấu trúc]: Phổ biến dạng Nさえ...ば hoặc V-ます＋さえすれば."
    ],
    examples: [
      { jp: "お金さえあれば何でも買えると思っている人がいる。", vn: "Có những người nghĩ rằng chỉ cần có tiền là mua được tất cả mọi thứ." },
      { jp: "薬を飲みさえすれば、すぐに熱は下がります。", vn: "Chỉ cần uống thuốc thì cơn sốt sẽ lập tức hạ ngay." },
      { jp: "体さえ丈夫なら、どんな困難も乗り越えられる。", vn: "Chỉ cần cơ thể khỏe mạnh thì khó khăn nào cũng có thể vượt qua." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "時間（　　）あれば、もっと練習できたのに。",
        options: ["さえ", "まで", "など", "くらい"],
        correctIndex: 0,
        explanation: "Chỉ cần có thời gian -> N + さえ + ば."
      }
    ]
  },

  // ========== BÀI 22 (112〜117) ==========
  {
    id: 112,
    pattern: "〜に限定して・〜に限る／〜に限り／〜に限って",
    meaning: "〜に限る: Tốt nhất là... | 〜に限り: Chỉ riêng... | 〜に限って: Cứ đúng vào lúc... thì lại...",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "N ＋ に限り / に限って",
      "V（辞書形 / ない形）/ N ＋ に限る"
    ],
    nuance: "• 〜に限る: Đưa ra lời khuyên/lựa chọn tốt nhất theo quan điểm người nói.\n• 〜に限り: Giới hạn duy nhất (thường dùng trong thông báo quy định, ưu đãi).\n• 〜に限って: Trớ trêu thay, cứ đúng vào ngày/người đó thì sự việc xấu/khác thường lại xảy ra.",
    ruleConstraints: [
      "[Đặc thù]: 〜に限って hay dùng cho sự việc xui xẻo trớ trêu hoặc niềm tin tuyệt đối vào ai đó (うちの子に限ってそんなことはしない)."
    ],
    examples: [
      { jp: "夏はやっぱり冷たいビールを飲むに限る。", vn: "Mùa hè thì tốt nhất vẫn là uống bia lạnh." },
      { jp: "本日ご来店のお客様に限り、全品2割引とさせていただきます。", vn: "Chỉ riêng quý khách đến quán hôm nay sẽ được giảm giá toàn bộ 20%." },
      { jp: "傘を持っていない日に限って、雨が降る。", vn: "Cứ đúng vào cái ngày không mang ô thì trời lại đổ mưa." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "疲れた時は、ゆっくりお風呂に入って寝る（　　）。",
        options: ["に限る", "に限り", "に限って", "に限らず"],
        correctIndex: 0,
        explanation: "Khi mệt mỏi thì tốt nhất là ngâm bồn tắm rồi ngủ -> V-る + に限る."
      }
    ]
  },
  {
    id: 113,
    pattern: "〜に限りません・〜に限らず",
    meaning: "Không chỉ... mà còn... / Không giới hạn ở...",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "N ＋ に限らず"
    ],
    nuance: "Diễn tả phạm vi không chỉ giới hạn ở đối tượng N mà còn mở rộng ra nhiều đối tượng khác rộng lớn hơn.",
    ruleConstraints: [
      "[Phạm vi]: Vế sau thường đi kèm với も (cũng) hoặc từ chỉ tập hợp rộng hơn."
    ],
    examples: [
      { jp: "最近は女性に限らず、男性も化粧をする人が増えている。", vn: "Gần đây không chỉ phụ nữ mà nam giới trang điểm cũng đang tăng lên." },
      { jp: "このアニメは子供に限らず、大人にも大人気だ。", vn: "Bộ anime này không chỉ trẻ em mà cả người lớn cũng cực kỳ yêu thích." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "平日に（　　）、休日も図書館は開館しています。",
        options: ["限らず", "限って", "限り", "限る"],
        correctIndex: 0,
        explanation: "Không chỉ ngày thường mà cả ngày nghỉ -> N + に限らず."
      }
    ]
  },
  {
    id: 114,
    pattern: "〜のみならず",
    meaning: "Không chỉ... mà còn... (văn viết trang trọng)",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "N / 普通形（な形-である, N-である） ＋ のみならず"
    ],
    nuance: "Diễn tả sự mở rộng phạm vi: Không chỉ dừng lại ở sự việc/đối tượng A mà còn lan sang cả B. Là cách nói trang trọng trong văn viết.",
    ruleConstraints: [
      "[Văn phong]: Mang tính chất văn viết, báo chí (硬い言い方)."
    ],
    examples: [
      { jp: "この不況は日本のみならず、世界全体に深刻な影響を与えている。", vn: "Tình trạng suy thoái này không chỉ Nhật Bản mà còn đang gây ảnh hưởng nghiêm trọng đến toàn thế giới." },
      { jp: "彼は英語のみならず、中国語やフランス語も堪能だ。", vn: "Anh ấy không chỉ tiếng Anh mà cả tiếng Trung và tiếng Pháp cũng rất thành thạo." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "国内（　　）、海外市場への進出も目指している。",
        options: ["のみならず", "に限って", "ばかりか", "上に"],
        correctIndex: 0,
        explanation: "Không chỉ trong nước mà cả thị trường nước ngoài -> N + のみならず."
      }
    ]
  },
  {
    id: 115,
    pattern: "〜ばかりか",
    meaning: "Không những... mà còn... (thêm mức độ nghiêm trọng/tích cực)",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "N / 普通形（な形-な／-である, N-である） ＋ ばかりか / ばかりでなく"
    ],
    nuance: "Diễn tả ý nghĩa: Không chỉ dừng lại ở sự việc A mà vế sau còn cộng thêm sự việc B với mức độ nặng hơn hoặc quy mô lớn hơn nữa.",
    ruleConstraints: [
      "[Đồng hướng]: Hai vế phải cùng tính chất (cùng khen ngợi hoặc cùng chê trách/tiêu cực)."
    ],
    examples: [
      { jp: "彼は遅刻したばかりか、宿題もやってこなかった。", vn: "Cậu ta không những đến muộn mà còn không làm bài tập về nhà." },
      { jp: "彼女は親切にしてくれたばかりか、食事までごちそうしてくれた。", vn: "Cô ấy không những giúp đỡ tôi nhiệt tình mà thậm chí còn chiêu đãi tôi bữa ăn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "薬を飲んでも熱が下がらない（　　）、頭痛までひどくなってきた。",
        options: ["ばかりか", "に限って", "のみならず", "上に"],
        correctIndex: 0,
        explanation: "Không những không hạ sốt mà cơn đau đầu còn tệ hơn -> ばかりか."
      }
    ]
  },
  {
    id: 116,
    pattern: "〜はもちろん・〜はもとより",
    meaning: "...là đương nhiên, và ngay cả... cũng vậy",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "N ＋ はもちろん / はもとより"
    ],
    nuance: "Nêu ra A là điều hiển nhiên không cần bàn cãi, rồi mở rộng nhấn mạnh thêm B cũng tương tự. 「〜はもとより」 là văn phong viết trang trọng hơn.",
    ruleConstraints: [
      "[Trang trọng]: 〜はもとより mang tính văn phong trang trọng hơn 〜はもちろん."
    ],
    examples: [
      { jp: "復興には資金はもとより、多くのボランティアの協力が必要だ。", vn: "Để tái thiết thì kinh phí là đương nhiên, ngoài ra còn rất cần sự hợp tác của nhiều tình nguyện viên." },
      { jp: "日曜日はもちろん、平日も多くの観光客で賑わっている。", vn: "Chủ nhật là đương nhiên, ngay cả ngày thường cũng nhộn nhịp đông đảo du khách." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼は日本語（　　）、英語も流暢に話す。",
        options: ["はもちろん", "に限って", "ばかりか", "上に"],
        correctIndex: 0,
        explanation: "Tiếng Nhật là hiển nhiên, tiếng Anh anh ấy cũng nói lưu loát -> N + はもちろん."
      }
    ]
  },
  {
    id: 117,
    pattern: "〜上に",
    meaning: "Hơn nữa... / Thêm vào đó... / Không những... mà lại còn...",
    topicId: 22,
    topicName: "Bài 22: 〜だけ・限定・非限定",
    connection: [
      "V / い形 / な形-な（-である）/ N-の（-である）（普通形） ＋ 上に"
    ],
    nuance: "Dùng để bổ sung thêm một thông tin cùng chiều hướng (tốt cùng tốt, xấu cùng xấu) để tăng thêm mức độ đánh giá.",
    ruleConstraints: [
      "[Đồng nhất đánh giá]: Không dùng hai vế mang ý nghĩa trái ngược nhau (khen rồi lại chê)."
    ],
    examples: [
      { jp: "このアパートは駅に近い上に、家賃も安くて素晴らしい。", vn: "Căn hộ này vừa gần nhà ga, hơn nữa tiền thuê lại rẻ, thật tuyệt vời." },
      { jp: "昨日は道に迷った上に、雨にも降られて散々な目に遭った。", vn: "Hôm qua không những bị lạc đường mà thêm vào đó lại còn bị mắc mưa, chịu đủ cảnh khổ sở." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼女は頭がいい（　　）、スポーツも得意だ。",
        options: ["上に", "ばかりか", "に限って", "のみならず"],
        correctIndex: 0,
        explanation: "Thông minh, thêm vào đó thể thao cũng giỏi -> A-い + 上に."
      }
    ]
  },

  // ========== BÀI 23 (118〜122) ==========
  {
    id: 118,
    pattern: "〜に関して",
    meaning: "Liên quan đến... / Về vấn đề...",
    topicId: 23,
    topicName: "Bài 23: 〜について・対象",
    connection: [
      "N ＋ に関して / に関しては / に関しても",
      "N ＋ に関する ＋ N"
    ],
    nuance: "Dùng khi nêu ra chủ đề, đối tượng hoặc nội dung liên quan để nghiên cứu, điều tra, phát biểu, thảo luận. Trang trọng hơn 「〜について」.",
    ruleConstraints: [
      "[Văn phong]: Trang trọng hơn 「〜について」. Hay đi kèm 調べる, 研究する, 発表する..."
    ],
    examples: [
      { jp: "環境問題に関するレポートを作成してください。", vn: "Hãy làm một bài báo cáo liên quan đến vấn đề môi trường." },
      { jp: "事件の詳細に関しては、現在警察が捜査中です。", vn: "Liên quan đến chi tiết vụ án thì hiện tại cảnh sát đang điều tra." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "この件（　　）、何かご質問はございますか。",
        options: ["に関して", "をめぐって", "にかけては", "に対して"],
        correctIndex: 0,
        explanation: "Liên quan đến việc này -> N + に関して."
      }
    ]
  },
  {
    id: 119,
    pattern: "〜をめぐって",
    meaning: "Xoay quanh... (tranh luận, cạnh tranh, đối lập ý kiến)",
    topicId: 23,
    topicName: "Bài 23: 〜について・対象",
    connection: [
      "N ＋ をめぐって / をめぐる ＋ N"
    ],
    nuance: "Diễn tả việc có nhiều người, nhiều phe phái cùng tranh luận, đối lập ý kiến hoặc tranh giành xoay quanh một vấn đề/chủ đề cụ thể.",
    ruleConstraints: [
      "[Đa chủ thể & Tranh luận]: Thường đi kèm với các động từ tranh luận, đối đầu (議論する, 対立する, 争う...)."
    ],
    examples: [
      { jp: "親の遺産をめぐって、兄弟の間で激しい争いが起こった。", vn: "Xoay quanh tài sản thừa kế của cha mẹ, giữa các anh em đã xảy ra cuộc tranh giành gay gắt." },
      { jp: "新しい空港の建設をめぐり、住民と行政の間で対立が続いている。", vn: "Xoay quanh việc xây dựng sân bay mới, sự đối lập giữa người dân và chính quyền vẫn đang tiếp diễn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "憲法改正（　　）議論が白熱している。",
        options: ["をめぐって", "に関して", "にかけては", "に応えて"],
        correctIndex: 0,
        explanation: "Tranh luận sôi nổi xoay quanh việc sửa đổi hiến pháp -> N + をめぐって."
      }
    ]
  },
  {
    id: 120,
    pattern: "〜にかけては",
    meaning: "Riêng về mặt... thì (tự tin/xuất sắc nhất)",
    topicId: 23,
    topicName: "Bài 23: 〜について・対象",
    connection: [
      "N ＋ にかけては"
    ],
    nuance: "Dùng khi khẳng định đối tượng có năng lực, kỹ năng hay sự hiểu biết vượt trội nhất trong một lĩnh vực, phương diện cụ thể nào đó.",
    ruleConstraints: [
      "[Đánh giá cao]: Vế sau luôn là câu khen ngợi hoặc khẳng định không thua kém ai (誰にも負けない, 一番だ...)."
    ],
    examples: [
      { jp: "足の速さにかけては、クラスで彼に勝てる者はいない。", vn: "Riêng về mặt chạy nhanh thì trong lớp không ai thắng được anh ấy." },
      { jp: "料理の腕前について、魚をさばくことにかけてはプロ並みだ。", vn: "Về tay nghề nấu ăn, riêng ở khoản làm cá thì anh ấy giỏi ngang hàng đầu bếp chuyên nghiệp." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "パソコンの知識（　　）、彼が社内で一番詳しい。",
        options: ["にかけては", "に関して", "をめぐって", "に対して"],
        correctIndex: 0,
        explanation: "Riêng về mặt kiến thức máy tính thì anh ấy giỏi nhất -> N + にかけては."
      }
    ]
  },
  {
    id: 121,
    pattern: "〜に対して",
    meaning: "1. Đối với... (thái độ, hành động hướng tới ai) | 2. Trái ngược với... (so sánh tương phản)",
    topicId: 23,
    topicName: "Bài 23: 〜について・対象",
    connection: [
      "N ＋ に対して / に対し / に対する ＋ N",
      "普通形（な形-な／-である, N-な／-である） ＋ のに対して"
    ],
    nuance: "1. Thể hiện thái độ, hành động hướng vào đối tượng N.\n2. Đặt hai sự việc, hai đối tượng mang tính đối lập, tương phản ra để so sánh.",
    ruleConstraints: [
      "[Hai nét nghĩa]: Nét nghĩa 1 chỉ thái độ (目上の人に対して), nét nghĩa 2 chỉ sự tương phản đối lập giữa 2 vế."
    ],
    examples: [
      { jp: "お客様に対して失礼な態度をとってはいけません。", vn: "Không được có thái độ thất lễ đối với khách hàng." },
      { jp: "兄が社交的で友人が多いのに対して、弟は内向的で物静かだ。", vn: "Trái ngược với người anh hướng ngoại có nhiều bạn bè thì người em lại hướng nội trầm tính." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "店員の無礼な態度（　　）、客は激怒した。",
        options: ["に対して", "に関して", "にかけては", "をめぐって"],
        correctIndex: 0,
        explanation: "Đối với thái độ vô lễ của nhân viên -> N + に対して."
      }
    ]
  },
  {
    id: 122,
    pattern: "〜に応えて",
    meaning: "Đáp lại... (kỳ vọng, yêu cầu, tiếng cổ vũ...)",
    topicId: 23,
    topicName: "Bài 23: 〜について・対象",
    connection: [
      "N ＋ に応えて / にこたえ / にこたえる ＋ N"
    ],
    nuance: "Diễn tả việc thực hiện hành động nhằm đáp ứng lại kỳ vọng, yêu cầu, sự mong mỏi hay tiếng reo hò của người khác.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Luôn là các từ như 期待 (kỳ vọng), 要望 (nguyện vọng), 声援 (cổ vũ), アンコール (yêu cầu hát lại)..."
    ],
    examples: [
      { jp: "ファンの熱い声援に応えて、選手たちは全力でプレーした。", vn: "Đáp lại sự cổ vũ nồng nhiệt của người hâm mộ, các cầu thủ đã thi đấu hết mình." },
      { jp: "市民の強い要望に応えて、夜間バスの運行が決定した。", vn: "Đáp ứng nguyện vọng mạnh mẽ của người dân, việc chạy xe buýt đêm đã được quyết định." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "親の期待（　　）、見事に国立大学に合格した。",
        options: ["に応えて", "に対して", "に関して", "にかけては"],
        correctIndex: 0,
        explanation: "Đáp lại kỳ vọng của cha mẹ -> 期待 + に応えて."
      }
    ]
  },

  // ========== BÀI 24 (123〜127) ==========
  {
    id: 123,
    pattern: "〜をはじめ（として）",
    meaning: "Trước tiên phải kể đến là... / Tiêu biểu là...",
    topicId: 24,
    topicName: "Bài 24: 〜を最初にして・〜を例にして",
    connection: [
      "N ＋ をはじめ（として） / をはじめとする ＋ N"
    ],
    nuance: "Đưa ra một ví dụ tiêu biểu, nổi bật nhất đứng đầu, nhằm ngụ ý rằng phía sau vẫn còn rất nhiều ví dụ khác thuộc cùng nhóm.",
    ruleConstraints: [
      "[Ví dụ điển hình]: Danh từ đứng trước luôn là ví dụ tiêu biểu nhất của tập hợp."
    ],
    examples: [
      { jp: "日本には富士山をはじめ、美しい自然がたくさんあります。", vn: "Ở Nhật Bản có rất nhiều cảnh đẹp thiên nhiên, tiêu biểu trước hết phải kể đến là núi Phú Sĩ." },
      { jp: "校長先生をはじめ、先生方の熱心なご指導に感謝いたします。", vn: "Tôi xin cảm ơn sự chỉ bảo nhiệt tình của các thầy cô, trước hết là thầy hiệu trưởng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "東京（　　）主要都市で展覧会が開催される。",
        options: ["をはじめ", "からして", "にわたって", "を通して"],
        correctIndex: 0,
        explanation: "Đầu tiên phải kể đến Tokyo, rồi tới các thành phố lớn -> N + をはじめ."
      }
    ]
  },
  {
    id: 124,
    pattern: "〜からして",
    meaning: "Ngay từ... đã (thể hiện đánh giá toàn bộ từ một chi tiết nhỏ)",
    topicId: 24,
    topicName: "Bài 24: 〜を最初にして・〜を例にして",
    connection: [
      "N ＋ からして"
    ],
    nuance: "Lấy một chi tiết nhỏ, điểm ban đầu làm ví dụ để đưa ra phán đoán hoặc đánh giá tiêu cực/nghi ngờ về toàn thể sự việc.",
    ruleConstraints: [
      "[Đánh giá]: Thường mang sắc thái đánh giá tiêu cực hoặc không hài lòng."
    ],
    examples: [
      { jp: "彼の態度は挨拶の仕方からしてなっていない。", vn: "Thái độ của anh ta ngay từ cách chào hỏi đã không ra thể thống gì rồi." },
      { jp: "この本はタイトルからして難しそうで、読む気がしない。", vn: "Cuốn sách này ngay từ cái tựa đề trông đã có vẻ khó rồi, chẳng có hứng đọc." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "あのレストランは外観（　　）高級そうだ。",
        options: ["からして", "をはじめ", "にわたって", "を通して"],
        correctIndex: 0,
        explanation: "Ngay từ vẻ bên ngoài trông đã thấy sang trọng -> N + からして."
      }
    ]
  },
  {
    id: 125,
    pattern: "〜にわたって",
    meaning: "Suốt... / Trải suốt... (thời gian, không gian, phạm vi rộng lớn)",
    topicId: 24,
    topicName: "Bài 24: 〜を最初にして・〜を例にして",
    connection: [
      "N（Thời gian, Địa điểm, Số lần, Phạm vi） ＋ にわたって / にわたり / にわたる ＋ N"
    ],
    nuance: "Nhấn mạnh quy mô rộng lớn hoặc sự kéo dài liên tục trên toàn bộ không gian, khoảng thời gian hay lĩnh vực.",
    ruleConstraints: [
      "[Quy mô lớn]: Danh từ đi kèm luôn là từ chỉ quy mô lớn (3 năm, toàn quốc, 100km...)."
    ],
    examples: [
      { jp: "台風の影響で、関東全域にわたって大雨が降り続いた。", vn: "Do ảnh hưởng của bão, mưa lớn kéo dài trên khắp toàn bộ khu vực Kanto." },
      { jp: "会議は3日間にわたって行われ、熱い議論が交わされた。", vn: "Cuộc họp diễn ra kéo dài suốt 3 ngày và những cuộc tranh luận sôi nổi đã diễn ra." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "5年間（　　）研究の成果が実を結んだ。",
        options: ["にわたる", "をはじめとする", "からする", "を通す"],
        correctIndex: 0,
        explanation: "Thành quả của nghiên cứu kéo dài suốt 5 năm -> 5年間 + にわたる + N."
      }
    ]
  },
  {
    id: 126,
    pattern: "〜を通じて・〜を通して",
    meaning: "1. Thông qua... (trung gian, phương tiện) | 2. Suốt cả... (toàn bộ khoảng thời gian)",
    topicId: 24,
    topicName: "Bài 24: 〜を最初にして・〜を例にして",
    connection: [
      "N ＋ を通じて / を通して",
      "N ＋ を通じた / を通した ＋ N"
    ],
    nuance: "1. Dùng N làm cầu nối, trung gian hoặc phương tiện để thu được thông tin, trải nghiệm.\n2. Kéo dài suốt cả một giai đoạn, mùa, cả năm (一年を通じて).",
    ruleConstraints: [
      "[Hai nét nghĩa]: Phổ biến nghĩa 'thông qua' (友人を通じて) và 'suốt' (四季を通じて)."
    ],
    examples: [
      { jp: "友人の紹介を通じて、現在の妻と知り合いました。", vn: "Thông qua sự giới thiệu của một người bạn, tôi đã quen biết với người vợ hiện tại." },
      { jp: "この地域は年間を通じて温暖な気候が続きます。", vn: "Khu vực này suốt cả năm luôn duy trì khí hậu ấm áp." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "インターネット（　　）世界中のニュースを瞬時に知ることができる。",
        options: ["を通じて", "にわたって", "からして", "をはじめ"],
        correctIndex: 0,
        explanation: "Thông qua Internet có thể biết tin tức tức thì -> N + を通じて / を通して."
      }
    ]
  },
  {
    id: 127,
    pattern: "〜を〜として・〜を〜とする",
    meaning: "Lấy... làm... / Coi... là...",
    topicId: 24,
    topicName: "Bài 24: 〜を最初にして・〜を例にして",
    connection: [
      "N1 ＋ を ＋ N2 ＋ として / とした ＋ N3"
    ],
    nuance: "Biểu thị việc xác định, đặt N1 vào vị trí, mục tiêu, vai trò hoặc tiêu chuẩn là N2.",
    ruleConstraints: [
      "[Cấu trúc]: Luôn có dạng [N1 を N2 として]."
    ],
    examples: [
      { jp: "JLPT N2の合格を目標として、毎日3時間勉強している。", vn: "Lấy việc thi đỗ JLPT N2 làm mục tiêu, tôi học 3 tiếng mỗi ngày." },
      { jp: "彼をリーダーとする新しいプロジェクトチームが結成された。", vn: "Đội ngũ dự án mới lấy anh ấy làm trưởng nhóm đã được thành lập." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "環境保護（　　）テーマとして、ポスターを描いた。",
        options: ["を", "に", "で", "と"],
        correctIndex: 0,
        explanation: "Cấu trúc: N1 を N2 として (Lấy bảo vệ môi trường làm chủ đề) -> を."
      }
    ]
  },

  // ========== BÀI 25 (128〜132) ==========
  {
    id: 128,
    pattern: "〜ばかりだ・〜一方だ",
    meaning: "Càng ngày càng... / Có chiều hướng liên tục...",
    topicId: 25,
    topicName: "Bài 25: 変化・進行・感情の強調",
    connection: [
      "V（辞書形） ＋ ばかりだ / 一方だ"
    ],
    nuance: "Diễn tả một sự thay đổi đang tiếp tục tiến triển theo một chiều hướng liên tục không ngừng. 「〜ばかりだ」 thường dùng cho chiều hướng xấu/tiêu cực.",
    ruleConstraints: [
      "[Động từ biến đổi]: Luôn đi cùng động từ chỉ sự thay đổi như 増える, 減る, 悪化する..."
    ],
    examples: [
      { jp: "物価は上がる一方だし、給料は下がるばかりだ。", vn: "Giá cả thì cứ tăng liên tục, còn lương thì càng ngày càng giảm." },
      { jp: "祖父の病状は悪化するばかりで、とても心配です。", vn: "Bệnh tình của ông cứ ngày càng xấu đi, tôi vô cùng lo lắng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "スマートフォンの普及に伴い、利用者は増える（　　）だ。",
        options: ["一方", "つつある", "ようとしている", "たまらない"],
        correctIndex: 0,
        explanation: "Lượng người dùng cứ liên tục tăng lên -> 一方だ / ばかりだ."
      }
    ]
  },
  {
    id: 129,
    pattern: "〜（よ）うとしている",
    meaning: "Sắp sửa... / Đang chuẩn bị diễn ra ngay bây giờ",
    topicId: 25,
    topicName: "Bài 25: 変化・進行・感情の強調",
    connection: [
      "V（意向形） ＋ としている / とする"
    ],
    nuance: "Diễn tả một sự việc, biến chuyển trọng đại hoặc trạng thái sắp sửa xảy ra trong khoảnh khắc cận kề.",
    ruleConstraints: [
      "[Văn phong]: Mang tính trang trọng, văn học hoặc diễn đạt khoảnh khắc sát nút."
    ],
    examples: [
      { jp: "太陽が沈もうとしている。空が真っ赤に染まってきた。", vn: "Mặt trời sắp sửa lặn. Bầu trời đã nhuộm một màu đỏ rực." },
      { jp: "新しい一年が今まさに始まろうとしている。", vn: "Một năm mới ngay lúc này đây đang chuẩn bị bắt đầu." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "桜のつぼみが今にも咲（　　）としている。",
        options: ["こう", "く", "いた", "かない"],
        correctIndex: 0,
        explanation: "Thể ý chí: 咲こう + としている (Sắp sửa bung nở)."
      }
    ]
  },
  {
    id: 130,
    pattern: "〜つつある",
    meaning: "Dần dần đang... / Đang từng bước biến đổi...",
    topicId: 25,
    topicName: "Bài 25: 変化・進行・感情の強調",
    connection: [
      "V（ます形 - bỏ ます） ＋ つつある"
    ],
    nuance: "Diễn tả một quá trình thay đổi đang trong tiến trình diễn ra từng chút một theo thời gian. Văn viết trang trọng.",
    ruleConstraints: [
      "[Tiến trình]: Đi kèm với động từ chỉ sự thay đổi (回復する, 温暖化が進む, 忘れ去られる...)."
    ],
    examples: [
      { jp: "景気は少しずつ回復しつつある。", vn: "Nền kinh tế đang từng bước hồi phục dần." },
      { jp: "昔の伝統文化が失われつつあるのは寂しいことだ。", vn: "Việc văn hóa truyền thống ngày xưa đang dần bị mai một là điều rất đáng buồn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "地球温暖化の影響で、氷河が解け（　　）。",
        options: ["つつある", "一方だ", "ばかりだ", "てたまらない"],
        correctIndex: 0,
        explanation: "Băng đang trong tiến trình dần dần tan chảy -> V-ます + つつある."
      }
    ]
  },
  {
    id: 131,
    pattern: "〜つつ",
    meaning: "Vừa... vừa... (văn viết)",
    topicId: 25,
    topicName: "Bài 25: 変化・進行・感情の強調",
    connection: [
      "V（ます形 - bỏ ます） ＋ つつ"
    ],
    nuance: "Diễn tả hai hành động diễn ra đồng thời cùng lúc. Là dạng văn viết trang trọng tương đương với 「〜ながら」.",
    ruleConstraints: [
      "[Đồng chủ ngữ]: Hai hành động phải do cùng một chủ thể thực hiện."
    ],
    examples: [
      { jp: "将来の進路について悩みつつ、日々の勉強に励んでいる。", vn: "Vừa trăn trở về định hướng tương lai, tôi vừa nỗ lực học tập hàng ngày." },
      { jp: "健康に気を配りつつ、仕事を続けたい。", vn: "Tôi muốn tiếp tục công việc trong khi vẫn chú ý giữ gìn sức khỏe." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "車を運転し（　　）、景色を楽しんだ。",
        options: ["つつ", "つつある", "一方", "ばかり"],
        correctIndex: 0,
        explanation: "Vừa lái xe vừa ngắm cảnh (văn viết) -> V-ます + つつ."
      }
    ]
  },
  {
    id: 132,
    pattern: "〜てたまらない・〜てならない・〜てしょうがない",
    meaning: "...vô cùng / ...không chịu nổi / ...hết sức",
    topicId: 25,
    topicName: "Bài 25: 変化・進行・感情の強調",
    connection: [
      "V-て / A-くて / な形-で ＋ たまらない / ならない / しょうがない"
    ],
    nuance: "Nhấn mạnh cảm xúc, cảm giác sinh lý hoặc tâm trạng tự nhiên trào dâng mãnh liệt đến mức không thể kiềm chế được.",
    ruleConstraints: [
      "[Phân biệt]:\n• 〜てたまらない: Cảm giác sinh lý/cảm xúc (đói, khát, ngứa, vui, buồn).\n• 〜てならない: Cảm xúc tự phát, linh cảm (lo lắng, nhớ nhung, có cảm giác là...).\n• 〜てしょうがない: Tương đươngたまらない (văn nói)."
    ],
    examples: [
      { jp: "家族に会いたくてたまらない。", vn: "Tôi nhớ và muốn gặp gia đình đến mức không chịu nổi." },
      { jp: "合格できるかどうか、心配でならない。", vn: "Có đỗ được hay không, tôi lo lắng vô cùng." },
      { jp: "のどが渇いてしょうがない。", vn: "Khát nước không chịu nổi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "一人暮らしの夜は寂しく（　　）。",
        options: ["てたまらない", "つつある", "一方だ", "ばかりだ"],
        correctIndex: 0,
        explanation: "Cảm giác cô đơn tột độ -> A-くて + たまらない."
      }
    ]
  },

  // ========== BÀI 26 (133〜140) ==========
  {
    id: 133,
    pattern: "〜にほかならない",
    meaning: "Chính là... / Không gì khác ngoài...",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "N / 普通形 ＋ にほかならない"
    ],
    nuance: "Dùng khi khẳng định một cách dứt khoát rằng lý do, nguyên nhân hay bản chất chính là điều đó, không có khả năng nào khác.",
    ruleConstraints: [
      "[Khẳng định tuyệt đối]: Thể hiện sự khẳng định mạnh mẽ của người nói trong bài luận, diễn thuyết."
    ],
    examples: [
      { jp: "今回の成功は、チーム全員の努力の結果にほかならない。", vn: "Thành công lần này chính là kết quả từ sự nỗ lực của toàn thể các thành viên trong đội, không gì khác." },
      { jp: "彼が厳しいことを言うのは、あなたを心から心配しているからにほかならない。", vn: "Việc anh ấy nói những lời khắt khe chính là vì anh ấy thực lòng lo lắng cho bạn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "不合格になったのは、私の勉強不足（　　）。",
        options: ["にほかならない", "にすぎない", "ざるを得ない", "かねない"],
        correctIndex: 0,
        explanation: "Chính là do sự thiếu học của tôi chứ không gì khác -> N + にほかならない."
      }
    ]
  },
  {
    id: 134,
    pattern: "〜にすぎない",
    meaning: "Chỉ là... / Không quá...",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "N / 普通形（な形-である, N-である） ＋ にすぎない"
    ],
    nuance: "Diễn tả sự đánh giá khiêm tốn hoặc coi nhẹ: Sự việc chỉ dừng lại ở mức độ đó, không có gì to tát hay vượt trội hơn.",
    ruleConstraints: [
      "[Mức độ thấp]: Thường đi kèm với từ chỉ số lượng nhỏ hoặc đánh giá khiêm tốn."
    ],
    examples: [
      { jp: "私は単なる一社員にすぎませんから、決定権はありません。", vn: "Tôi chỉ là một nhân viên bình thường nên không có quyền quyết định." },
      { jp: "これは噂にすぎず、確かな証拠はありません。", vn: "Đây chỉ là tin đồn thôi, hoàn toàn chưa có chứng cứ xác thực." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "目標を立てた（　　）、実行しなければ意味がない。",
        options: ["にすぎず", "にほかならず", "ざるを得ず", "かねず"],
        correctIndex: 0,
        explanation: "Mới chỉ dừng lại ở việc lập mục tiêu -> V-た + にすぎない."
      }
    ]
  },
  {
    id: 135,
    pattern: "〜上（は）",
    meaning: "Về mặt... / Xét trên phương diện...",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "N ＋ 上（は） / 上の ＋ N"
    ],
    nuance: "Dùng để diễn tả góc độ, phương diện được xem xét (về mặt pháp luật, lý thuyết, công việc, sức khỏe...).",
    ruleConstraints: [
      "[Danh từ phổ biến]: 法律上 (về mặt luật pháp), 理論上 (về mặt lý thuyết), 健康上 (về mặt sức khỏe), 都合上 (vì lý do tiện lợi/hoàn cảnh)..."
    ],
    examples: [
      { jp: "理論上は可能だが、実際に実行するのは極めて難しい。", vn: "Về mặt lý thuyết thì khả thi, nhưng trên thực tế để thực hiện thì cực kỳ khó khăn." },
      { jp: "健康上の理由により、しばらく休養を取らせていただきます。", vn: "Vì lý do về mặt sức khỏe, tôi xin phép được nghỉ ngơi một thời gian." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "法律（　　）問題はありません。",
        options: ["上", "中", "下", "外"],
        correctIndex: 0,
        explanation: "Về mặt pháp luật -> 法律上."
      }
    ]
  },
  {
    id: 136,
    pattern: "〜ざるを得ない",
    meaning: "Đành phải... / Buộc phải... (dù không muốn)",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "V（ない形 - bỏ ない） ＋ ざるを得ない",
      "Ngoại lệ: する ➔ せざるを得ない"
    ],
    nuance: "Diễn tả tình thế bắt buộc: Dù bản thân không muốn nhưng vì hoàn cảnh, quy tắc ép buộc nên không còn cách nào khác ngoài việc phải làm.",
    ruleConstraints: [
      "[Động từ する]: Biến đổi thành せざるを得ない."
    ],
    examples: [
      { jp: "証拠が揃っている以上、罪を認めざるを得ない。", vn: "Một khi chứng cứ đã đầy đủ thì đành phải thừa nhận tội lỗi." },
      { jp: "台風が直撃するため、イベントは中止せざるを得ない。", vn: "Do bão đổ bộ trực tiếp nên đành phải hủy bỏ sự kiện." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "会社の命令である以上、転勤を受け入れ（　　）。",
        options: ["ざるを得ない", "っこない", "かねない", "にすぎない"],
        correctIndex: 0,
        explanation: "Đành phải chấp nhận chuyển công tác -> V-ざるを得ない."
      }
    ]
  },
  {
    id: 137,
    pattern: "〜かねない",
    meaning: "Có khả năng sẽ... (dẫn đến kết quả xấu, nguy hiểm)",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "V（ます形 - bỏ ます） ＋ かねない"
    ],
    nuance: "Cảnh báo một nguy cơ tiêu cực, hậu quả xấu có khả năng cao sẽ xảy ra nếu tiếp tục duy trì nguyên nhân hiện tại.",
    ruleConstraints: [
      "[Hậu quả xấu]: Luôn luôn dùng cho sự việc tiêu cực, tai nạn, tổn thất."
    ],
    examples: [
      { jp: "スピードを出しすぎると、大事故を起こしかねない。", vn: "Nếu phóng quá nhanh thì có khả năng sẽ gây ra tai nạn lớn." },
      { jp: "そんな乱暴な言葉を使うと、誤解を招きかねませんよ。", vn: "Nếu dùng lời lẽ thô lỗ như thế thì rất có thể sẽ chuốc lấy sự hiểu lầm đấy." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "このまま放置すると、事態は悪化し（　　）。",
        options: ["かねない", "っこない", "がたい", "かねる"],
        correctIndex: 0,
        explanation: "Có nguy cơ sẽ xấu đi -> 悪化しかねない."
      }
    ]
  },
  {
    id: 138,
    pattern: "〜っこない",
    meaning: "Tuyệt đối không thể nào... / Làm sao mà... được!",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "V（ます形 - bỏ ます） ＋ っこない"
    ],
    nuance: "Khẩu ngữ thể hiện sự phủ định tuyệt đối và chắc chắn của người nói: Việc đó là bất khả thi, tuyệt đối không thể nào thực hiện được.",
    ruleConstraints: [
      "[Khẩu ngữ]: Dùng nhiều trong văn nói hàng ngày giữa bạn bè, người thân."
    ],
    examples: [
      { jp: "こんな分厚い本、一日で読み切れっこないよ。", vn: "Cuốn sách dày cộp thế này làm sao mà đọc hết trong một ngày được!" },
      { jp: "宝くじなんて当たりっこないと思いつつ、つい買ってしまう。", vn: "Dù nghĩ là đời nào mà trúng xổ số được nhưng tôi vẫn cứ vô thức mua." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼に頼んだって、引き受け（　　）よ。",
        options: ["っこない", "かねない", "ざるを得ない", "にほかならない"],
        correctIndex: 0,
        explanation: "Có nhờ anh ta thì đời nào anh ta chịu nhận lời -> V-ます + っこない."
      }
    ]
  },
  {
    id: 139,
    pattern: "〜に決まっている・〜に相違ない・〜に違いない",
    meaning: "Chắc chắn là... / Nhất định là...",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "普通形（な形［だ］・N［だ］） ＋ に決まっている / に相違ない / に違いない"
    ],
    nuance: "Thể hiện niềm tin và phán đoán chắc chắn 100% của người nói dựa trên suy luận trực quan hoặc chứng cứ mạnh mẽ.",
    ruleConstraints: [
      "[Phân biệt phong cách]:\n• に決まっている: Văn nói, mang tính chủ quan cảm tính.\n• に違いない: Dùng phổ biến cả văn nói và viết.\n• に相違ない: Văn viết trang trọng, mang tính văn bản pháp lý, học thuật."
    ],
    examples: [
      { jp: "毎日あんなに努力しているんだから、合格するに決まっている。", vn: "Ngày nào cũng nỗ lực đến thế thì chắc chắn đỗ là cái chắc rồi." },
      { jp: "目撃者の証言から見て、彼が犯人に相違ない。", vn: "Nhìn từ lời khai của nhân chứng, anh ta chắc chắn là thủ phạm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "こんな夜遅くに電話してくるなんて、何か緊急の用事に（　　）。",
        options: ["違いない", "すぎない", "ほかならない", "得ない"],
        correctIndex: 0,
        explanation: "Chắc chắn là có việc khẩn cấp -> に違いない / に決まっている."
      }
    ]
  },
  {
    id: 140,
    pattern: "〜はずだ・〜わけだ",
    meaning: "〜はずだ: Chắc chắn là... (theo kế hoạch/quy luật) | 〜わけだ: Thảo nào... / Hóa ra là...",
    topicId: 26,
    topicName: "Bài 26: 確信・判断・当然",
    connection: [
      "普通形（な形-な, N-の） ＋ はずだ",
      "普通形（な形-な, N-の／-である） ＋ わけだ"
    ],
    nuance: "• 〜はずだ: Dựa trên kế hoạch, lịch trình hoặc logic tự nhiên để suy đoán chắc chắn sẽ như vậy.\n• 〜わけだ: Hiểu ra nguyên nhân lý do ('À, thảo nào...') hoặc tóm tắt lại kết luận hợp lý.",
    ruleConstraints: [
      "[Nét nghĩa わけだ]: Rất hay đi cùng cụm なるほど...わけだ (Thảo nào / Hóa ra là vậy)."
    ],
    examples: [
      { jp: "田中さんは昨日日本に着いたはずだから、今日は家にいるだろう。", vn: "Anh Tanaka chắc chắn hôm qua đã đến Nhật rồi nên hôm nay có lẽ đang ở nhà." },
      { jp: "A「彼、日本に5年も住んでいたんだって。」 B「なるほど、道理で日本語が上手なわけだ。」", vn: "A: 'Nghe nói anh ấy từng sống ở Nhật suốt 5 năm đấy.' - B: 'Hóa ra là vậy, thảo nào tiếng Nhật giỏi thế!'" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "クーラーが消えていたのか。部屋が暑い（　　）だ。",
        options: ["わけ", "はず", "もの", "こと"],
        correctIndex: 0,
        explanation: "Hóa ra là điều hòa tắt, thảo nào phòng nóng thế -> わけだ."
      }
    ]
  }
];
