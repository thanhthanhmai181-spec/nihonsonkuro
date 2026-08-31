import { GrammarN2Item } from "./grammarN2Data";

export const FULL_GRAMMAR_N2_DATA: GrammarN2Item[] = [
  // ==================== BÀI 1 (1〜5) ====================
  {
    id: 1,
    pattern: "〜際（に）",
    meaning: "Khi... / Lúc... / Nhân dịp...",
    topicId: 1,
    topicName: "Bài 1: 〜とき・〜直後に",
    connection: [
      "N ＋ の ＋ 際（に）",
      "V（辞書形 / た形） ＋ 際（に）"
    ],
    nuance: "Dùng để diễn tả thời điểm hoặc hoàn cảnh xảy ra một hành động, sự việc. Chủ yếu dùng trong giấy tờ, thủ tục, thông báo chính thức hoặc gắn liền với các hành động, sự kiện đặc biệt (như thực hiện, đăng ký, sử dụng...). Không dùng cho các hành động sinh hoạt bình thường hàng ngày.",
    ruleConstraints: [
      "[Cấu trúc tương đương]: Tương tự như 〜とき (Khi...), nhưng mang sắc thái trang trọng, trang nghiêm hơn (硬い言い方).",
      "[Lưu ý sử dụng]: Tránh dùng cấu trúc này trong giao tiếp hội thoại thân mật hàng ngày."
    ],
    examples: [
      {
        jp: "この書類は、カード作成の際、必要です。",
        vn: "Giấy tờ này cần thiết khi làm thẻ."
      },
      {
        jp: "こちらの会議室をご利用になる際は、受付にご記入ください。",
        vn: "Khi quý khách sử dụng phòng họp này, xin vui lòng điền thông tin tại bàn lễ tân."
      },
      {
        jp: "アメリカの大統領が来日した際、わたしたちの大学でスピーチを行った。",
        vn: "Khi Tổng thống Mỹ đến thăm Nhật Bản, ông đã có bài phát biểu tại trường đại học của chúng tôi."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "パスポートを申請する（　　）、写真と戸籍謄本が必要です。",
        options: ["際", "最中に", "うちに", "ばかりに"],
        correctIndex: 0,
        explanation: "Thủ tục xin cấp hộ chiếu mang tính hành chính, chính thức -> dùng 〜際."
      }
    ]
  },
  {
    id: 2,
    pattern: "〜に際して・〜にあたって",
    meaning: "Khi... / Nhân dịp... / Nhân cơ hội...",
    topicId: 1,
    topicName: "Bài 1: 〜とき・〜直後に",
    connection: [
      "N ＋ に際して / にあたって",
      "V（辞書形） ＋ に際して / にあたって",
      "Dạng bổ nghĩa cho N: 〜に際しての N / 〜にあたっての N"
    ],
    nuance: "Dùng khi bắt đầu hoặc thực hiện một sự kiện, thời điểm quan trọng, đặc biệt hoặc công việc lớn (như kết hôn, nhập học, mở cửa hàng, bắt đầu dự án...). Diễn tả ý nghĩa 'nhân dịp/trước khi thực hiện sự kiện đó thì làm hành động chuẩn bị, chào hỏi hoặc xác nhận'. Thường mang tính trang trọng (硬い言い方), dùng trong văn viết, phát biểu hoặc thông báo chính thức.",
    ruleConstraints: [
      "[Điểm khác biệt của 〜にあたって]: Ngữ pháp này mang sắc thái tích cực, chủ động nên KHÔNG dùng cho các sự kiện mang tính tiêu cực/âm tính (như nhập viện, thất bại, ly hôn...).",
      "[Dạng bổ nghĩa cho danh từ]: Sử dụng dạng 〜に際しての ＋ N hoặc 〜にあたっての ＋ N."
    ],
    examples: [
      {
        jp: "工事開始に際しまして、近隣の皆様にごあいさつをして回った。",
        vn: "Khi bắt đầu thi công, chúng tôi đã đi chào hỏi các hộ gia đình xung quanh."
      },
      {
        jp: "当ショッピングサイトのご利用に際して、以下のご利用条件をよくお読みください。",
        vn: "Khi/Trước khi sử dụng trang web mua sắm này, xin vui lòng đọc kỹ các điều khoản sử dụng dưới đây."
      },
      {
        jp: "新しく事業を始めるにあたって、しっかりと準備をしようと思っている。",
        vn: "Nhân dịp/Khi bắt đầu sự nghiệp kinh doanh mới, tôi định sẽ chuẩn bị thật kỹ lưỡng."
      },
      {
        jp: "お二人の門出にあたりまして、一言お祝いを申し上げます。",
        vn: "Nhân dịp khởi đầu cuộc sống mới của hai bạn, tôi xin có đôi lời chúc mừng."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "新工場の建設を始める（　　）、周辺住民への説明会を開いた。",
        options: ["にあたって", "つつ", "ばかりに", "どころか"],
        correctIndex: 0,
        explanation: "Bắt đầu dự án lớn (xây nhà máy mới) mang tính trang trọng -> dùng にあたって / に際して."
      }
    ]
  },
  {
    id: 3,
    pattern: "〜たとたん（に）",
    meaning: "Ngay khi... / Vừa mới... thì ngay lập tức...",
    topicId: 1,
    topicName: "Bài 1: 〜とき・〜直後に",
    connection: [
      "V（た形） ＋ とたん（に）"
    ],
    nuance: "Diễn tả một sự việc, hành động xảy ra ngay lập tức sau khi hành động vế trước vừa hoàn thành. Sự việc ở vế sau thường mang tính bất ngờ, ngoài dự đoán đối với người nói.",
    ruleConstraints: [
      "[Động từ vế trước]: Thường đi liền với các động từ thể hiện hành động hoặc sự biến đổi khoảnh khắc (như đứng dậy, mở cửa, kết thúc...).",
      "[Hạn chế vế sau]: Không đi kèm với câu thể hiện ý chí, nguyện vọng, mong muốn của người nói (〜よう) hay câu mệnh lệnh, rủ rê (〜てください, 〜ませんか).",
      "[Chủ ngữ]: Không dùng vế sau để diễn tả hành động cố ý của chính bản thân người nói."
    ],
    examples: [
      {
        jp: "山の頂上でワインを一口飲んだとたん、めまいがした。",
        vn: "Vừa mới uống một ngụm rượu vang trên đỉnh núi thì ngay lập tức tôi bị chóng mặt."
      },
      {
        jp: "夫は結婚前は優しかったが、結婚したとたん、態度が変わった。",
        vn: "Chồng tôi trước khi kết hôn rất dịu dàng, nhưng vừa mới kết hôn xong thì thái độ thay đổi ngay."
      },
      {
        jp: "国の母に電話をかけた。声を聞いたとたん、涙があふれてきた。",
        vn: "Tôi gọi điện cho mẹ ở quê. Vừa nghe thấy giọng mẹ một cái là nước mắt lập tức trào ra."
      },
      {
        jp: "僕が「さようなら」と言ったとたん、彼女は走っていってしまった。",
        vn: "Ngay khi tôi vừa nói 'Tạm biệt' thì cô ấy liền chạy vụt đi mất."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "窓を開けた（　　）、強い風が吹き込んできて書類が飛んでしまった。",
        options: ["とたん", "うちに", "次第", "末に"],
        correctIndex: 0,
        explanation: "Vừa mở cửa sổ thì gió lập tức thổi vào gây bất ngờ -> V-た + とたん."
      }
    ]
  },
  {
    id: 4,
    pattern: "〜（か）と思うと・〜（か）と思ったら",
    meaning: "Vừa mới... mà đã... / Vừa thấy... thì ngay lập tức...",
    topicId: 1,
    topicName: "Bài 1: 〜とき・〜直後に",
    connection: [
      "V（た形） ＋ （か）と思うと / （か）と思ったら"
    ],
    nuance: "Diễn tả một sự việc hoặc một sự thay đổi lớn diễn ra tiếp nối ngay lập tức sau sự việc trước đó. Thường thể hiện sự ngạc nhiên, bất ngờ của người nói trước tốc độ chuyển biến nhanh chóng của hành động/sự việc.",
    ruleConstraints: [
      "[Chủ ngữ]: Không dùng cho hành động chủ ý của chính bản thân người nói ở vế sau.",
      "[Hạn chế vế sau]: Không dùng kèm câu thể hiện ý chí, nguyện vọng, rủ rê hay mệnh lệnh của người nói."
    ],
    examples: [
      {
        jp: "林さんは部屋に入ってきたかと思うと、いきなり窓を全部開けた。",
        vn: "Anh Hayashi vừa mới bước vào phòng thì lập tức mở toang tất cả cửa sổ."
      },
      {
        jp: "赤ちゃんは今泣いたかと思うと、もう笑っている。",
        vn: "Đứa bé vừa mới khóc đó mà đã lại đang cười ngay được."
      },
      {
        jp: "やっと部屋が片付いたかと思ったら、子供たちがすぐまた散らかした。",
        vn: "Vừa mới dọn dẹp xong cái phòng thì đám trẻ lại làm bừa bãi ra ngay."
      },
      {
        jp: "このごろは気温の差が大きい。昨日は暑くなったかと思ったら、今日は涼しい。",
        vn: "Dạo này chênh lệch nhiệt độ lớn thật. Mới hôm qua vừa thấy nóng lên mà hôm nay đã mát mẻ rồi."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "雷がピカッと光った（　　）、ものすごい音が鳴り響いた。",
        options: ["かと思うと", "うちに", "ばかりに", "反面"],
        correctIndex: 0,
        explanation: "Sấm vừa lóe sáng thì ngay sau đó tiếng nổ vang lên nhanh bất ngờ -> V-た + かと思うと."
      }
    ]
  },
  {
    id: 5,
    pattern: "〜か〜ないかのうちに",
    meaning: "Chưa kịp... thì đã... / Vừa mới... xong thì đồng thời...",
    topicId: 1,
    topicName: "Bài 1: 〜とき・〜直後に",
    connection: [
      "V（辞書形 / た形） ＋ か ＋ V（ない形） ＋ かのうちに"
    ],
    nuance: "Diễn tả hai sự việc xảy ra gần như đồng thời — khi hành động trước còn chưa biết đã hoàn toàn xong hay chưa thì hành động sau đã lập tức diễn ra. Cảm giác 'gần như cùng một lúc' diễn ra mạnh mẽ hơn so với 〜（か）と思うと.",
    ruleConstraints: [
      "[Động từ lặp lại]: Động từ ở hai vế thường là cùng một động từ (dạng Khẳng định ＋ か ＋ Phủ định ＋ かのうちに).",
      "[Động từ vế trước]: Thường gắn với các động từ chỉ khoảnh khắc hoặc sự biến đổi (như đến, kết thúc, trời sáng...).",
      "[Hạn chế vế sau]: Không dùng vế sau ở dạng thể hiện ý chí, nguyện vọng hay cầu khiến của người nói."
    ],
    examples: [
      {
        jp: "一郎はベッドに横になるか横にならないのうちに、ぐっすり眠ってしまった。",
        vn: "Ichiro vừa mới nằm xuống giường chưa kịp ấm chỗ thì đã ngủ khì mất rồi."
      },
      {
        jp: "わたしは夜が明けたか明けないかのうちに家を出て、空港へ向かった。",
        vn: "Tôi vừa chớm hửng sáng chưa kịp rõ mặt người thì đã rời khỏi nhà để đi ra sân bay."
      },
      {
        jp: "あの作家は今売れっ子だ。話題作を発表したかしないかのうちに、もう次の作品に取りかかっているそうだ。",
        vn: "Tác giả đó dạo này đang rất ăn khách. Nghe nói vừa mới phát hành tác phẩm gây chú ý xong thì đã bắt tay ngay vào tác phẩm tiếp theo."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "授業が終わるか（　　）かのうちに、学生たちは教室を飛び出した。",
        options: ["終わらない", "終わった", "終わる", "終わらなくて"],
        correctIndex: 0,
        explanation: "Cấu trúc: V(辞書形/た形) + か + V(ない形) + かのうちに -> 終わるか終わらないかのうちに."
      }
    ]
  },

  // ==================== BÀI 2 (6〜11) ====================
  {
    id: 6,
    pattern: "〜最中に",
    meaning: "Đúng lúc đang... thì (có sự việc bất ngờ chen vào)",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（て形）＋ いる ＋ 最中に",
      "N ＋ の ＋ 最中に"
    ],
    nuance: "Diễn tả một sự việc hay hành động bất ngờ xảy ra đúng vào thời điểm người nói đang thực hiện một hành động khác. Thường mang sắc thái sự việc chen vào gây cản trở, gián đoạn hoặc làm phiền.",
    ruleConstraints: [
      "[Đặc điểm vế trước]: Hành động vế trước thường diễn ra trong khoảng thời gian ngắn.",
      "[Đặc điểm vế sau]: Vế sau là một sự việc ngoài dự kiến xen vào (gây cản trở, phiền toái, gián đoạn)."
    ],
    examples: [
      {
        jp: "田中さんは今考え事をしている最中だから、じゃましないほうがいい。",
        vn: "Anh Tanaka đang đúng lúc suy nghĩ nên tốt nhất không nên làm phiền."
      },
      {
        jp: "浜辺でバーベキューをしている最中に、急に雨が降り出した。",
        vn: "Đúng lúc đang nướng thịt ngoài bãi biển thì đột nhiên trời đổ mưa."
      },
      {
        jp: "スピーチの最中に、突然電源が切れた。",
        vn: "Đúng lúc đang phát biểu thì đột nhiên mất điện."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "食事の（　　）に客が訪ねてきて、対応に追われた。",
        options: ["最中", "うち", "ばかり", "一方"],
        correctIndex: 0,
        explanation: "N + の最中に: Đúng lúc đang trong bữa ăn thì khách đến làm gián đoạn -> 最中."
      }
    ]
  },
  {
    id: 7,
    pattern: "〜うちに",
    meaning: "Nhóm A: Tranh thủ lúc còn... / Nhóm B: Trong lúc đang... thì nhận ra sự thay đổi",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（辞書形 / て形 / ない形）＋ うちに",
      "い形 / な形-な ＋ うちに",
      "N ＋ の ＋ うちに"
    ],
    nuance: "• Nhóm A (Tranh thủ thời điểm): Nhân lúc trạng thái hiện tại chưa bị thay đổi (khi còn trẻ, khi còn nóng, trước khi quên...), tranh thủ thực hiện một hành động mang tính ý chí.\n• Nhóm B (Biến đổi tự nhiên): Trong quá trình đang làm một việc gì đó kéo dài thì có một sự thay đổi diễn ra tự nhiên mà bản thân không nhận ra mốc bắt đầu.",
    ruleConstraints: [
      "[Nhóm A]: Vế trước thể hiện trạng thái kéo dài, vế sau là câu mang ý chí / hành động tranh thủ.",
      "[Nhóm B]: Vế trước là động từ chỉ quá trình kéo dài, vế sau là biến đổi tự nhiên (không đi kèm ý chí hay câu cầu khiến)."
    ],
    examples: [
      {
        jp: "日本にいるうちに、一度富士山に登ってみたい。",
        vn: "Trong lúc còn ở Nhật, tôi muốn tranh thủ leo núi Phú Sĩ một lần. (Nhóm A)"
      },
      {
        jp: "忘れないうちに、カレンダーにメモしておこう。",
        vn: "Trong lúc chưa quên, hãy ghi chú lại vào lịch. (Nhóm A)"
      },
      {
        jp: "熱いうちに、どうぞお召し上がりください。",
        vn: "Xin mời ăn lúc còn nóng. (Nhóm A)"
      },
      {
        jp: "インターネットで調べているうちに、いろいろなことがわかってきた。",
        vn: "Trong lúc tìm kiếm trên mạng, tôi dần hiểu ra nhiều điều. (Nhóm B)"
      },
      {
        jp: "この教科書は、長い間使っているうちに、もう自分の体の一部のようになった。",
        vn: "Cuốn giáo trình này dùng trong thời gian dài, dần dần đã trở thành như một phần cơ thể. (Nhóm B)"
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "スープが冷めない（　　）、早く飲んでください。",
        options: ["うちに", "最中に", "ばかりに", "ところで"],
        correctIndex: 0,
        explanation: "Tranh thủ lúc súp chưa nguội -> V-ない + うちに."
      }
    ]
  },
  {
    id: 8,
    pattern: "〜ばかりだ・〜一方だ",
    meaning: "Ngày càng... / Có xu hướng liên tục...",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（辞書形）＋ ばかりだ / 一方だ"
    ],
    nuance: "Diễn tả một sự thay đổi đang tiếp tục tiến triển theo một chiều hướng nhất định.\n• 〜ばかりだ: Thường dùng đặc biệt cho các biến đổi theo chiều hướng không tốt, xấu đi.\n• 〜一方だ: Dùng cho sự thay đổi liên tục theo một hướng (có thể là xấu hoặc tốt).",
    ruleConstraints: [
      "[Động từ đi kèm]: Bắt buộc đi kèm với các động từ thể hiện sự biến đổi (như 増える, 悪くなる, 複雑になる, 減る...)."
    ],
    examples: [
      {
        jp: "このごろは仕事が多くて、ストレスが溜まるばかりだ。",
        vn: "Dạo này công việc nhiều, áp lực chỉ có ngày càng gia tăng."
      },
      {
        jp: "東京の交通機関は複雑になるばかりで、わたしはよくわからなくなってきた。",
        vn: "Giao thông ở Tokyo chỉ ngày càng phức tạp thêm, tôi dần trở nên không hiểu nổi."
      },
      {
        jp: "一度問題が起きてから、彼との人間関係は悪くなる一方だ。",
        vn: "Từ sau khi nảy sinh sự cố, mối quan hệ với anh ấy chỉ ngày càng xấu đi."
      },
      {
        jp: "牛や豚の病気が広がる一方なので、国中の人が心配している。",
        vn: "Bệnh dịch ở bò và lợn liên tục lan rộng nên người dân cả nước đều lo lắng."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "不景気の影響で、失業率は上がる（　　）だ。",
        options: ["一方", "最中", "次第", "きり"],
        correctIndex: 0,
        explanation: "Tỷ lệ thất nghiệp liên tục tăng theo một hướng -> V-辞書形 + 一方だ."
      }
    ]
  },
  {
    id: 9,
    pattern: "〜（よう）としている",
    meaning: "Sắp... / Chuẩn bị... (khoảnh khắc ngay trước khi bắt đầu/kết thúc)",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（意向形 - Thể ý chí）＋ としている"
    ],
    nuance: "Diễn tả một sự việc, sự thay đổi sắp sửa diễn ra trong khoảnh khắc ngắn (ngay trước khi bắt đầu hoặc hoàn thành). Mang phong cách văn viết hoặc tường thuật trang trọng (硬い言い方).",
    ruleConstraints: [
      "[Động từ đi kèm]: Thường đi cùng các động từ diễn tả sự biến đổi khoảnh khắc ngắn (như 始まろう, 完成しよう, 暮れよう, 開こう...)."
    ],
    examples: [
      {
        jp: "さあ、決勝戦が今、始まろうとしています。みんな緊張しています。",
        vn: "Nào, trận chung kết sắp sửa bắt đầu ngay bây giờ. Mọi người đều đang rất căng thẳng."
      },
      {
        jp: "駅前に30階建ての高級マンションが完成しようとしている。",
        vn: "Tòa chung cư cao cấp 30 tầng trước nhà ga sắp sửa được hoàn thành."
      },
      {
        jp: "桜が満開になろうとしているとき、雪が降った。",
        vn: "Đúng lúc hoa anh đào sắp sửa nở rộ thì tuyết lại rơi."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "日が西の空に沈（　　）としている。",
        options: ["もう", "む", "んだ", "ま"],
        correctIndex: 0,
        explanation: "沈む -> Thể ý chí là 沈もう -> 沈もうとしている (mặt trời sắp sửa lặn)."
      }
    ]
  },
  {
    id: 10,
    pattern: "〜つつある",
    meaning: "Dần dần đang... / Đang trong quá trình...",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（ます形 - bỏ ます）＋ つつある"
    ],
    nuance: "Diễn tả một sự thay đổi đang tiến hành từng bước một theo thời gian. Mang sắc thái câu văn trang trọng, văn viết (硬い言い方).",
    ruleConstraints: [
      "[Động từ đi kèm]: Thường đi liền với các động từ thể hiện sự biến đổi (như 暖かくなる, 広がる, 発展する, 回復する...)."
    ],
    examples: [
      {
        jp: "次第に暖かくなりつつあります。春はもうすぐです。",
        vn: "Trời đang dần dần ấm lên. Mùa xuân đã đến rất gần rồi."
      },
      {
        jp: "この会社は現在発展しつつあり、将来が期待される。",
        vn: "Công ty này hiện đang trong quá trình phát triển và được kỳ vọng lớn trong tương lai."
      },
      {
        jp: "明治時代の初め、日本は急速に近代化しつつあった。",
        vn: "Vào đầu thời kỳ Meiji, Nhật Bản đang tiến hành hiện đại hóa một cách nhanh chóng."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "医療技術の進歩により、難病の治療法が解明され（　　）。",
        options: ["つつある", "つつ", "最中だ", "ばかりだ"],
        correctIndex: 0,
        explanation: "Đang dần dần trong quá trình được làm sáng tỏ (biến đổi từng bước) -> V-ます + つつある."
      }
    ]
  },
  {
    id: 11,
    pattern: "〜つつ",
    meaning: "Vừa... vừa...",
    topicId: 2,
    topicName: "Bài 2: 〜している・進行中",
    connection: [
      "V（ます形 - bỏ ます）＋ つつ"
    ],
    nuance: "Diễn tả hai hành động diễn ra song song cùng một lúc. Là cách nói trang trọng, mang tính văn viết (硬い言い方).",
    ruleConstraints: [
      "[Cấu trúc tương đương]: Giống với 〜ながら, nhưng mang phong cách viết và trang trọng hơn.",
      "[Chủ ngữ & Động từ]: Động từ đi kèm phải thể hiện hành động kéo dài. Chủ ngữ của hai hành động trước và sau 〜つつ bắt buộc phải là CÙNG MỘT CHỦ NGỮ."
    ],
    examples: [
      {
        jp: "この空き地をどうするかについては、住民と話し合いつつ、計画を立てていきたい。",
        vn: "Về việc xử lý khu đất trống này, tôi muốn vừa thảo luận với người dân vừa lập kế hoạch."
      },
      {
        jp: "将来の仕事のこと、お金のことなどを考えつつ、進路を選ばなければならない。",
        vn: "Vừa phải suy nghĩ về công việc, tiền bạc trong tương lai, vừa phải đưa ra lựa chọn con đường đi."
      },
      {
        jp: "いろいろな体験を楽しみつつ、日本の生活に慣れていった。",
        vn: "Vừa tận hưởng nhiều trải nghiệm khác nhau, tôi vừa dần quen với cuộc sống tại Nhật."
      }
    ],
    quizzes: [
      {
        type: "fill",
        question: "環境保護の重要性を訴え（　　）、新しい製品の開発を進めている。",
        options: ["つつ", "つつある", "最中に", "うちに"],
        correctIndex: 0,
        explanation: "Vừa kêu gọi tầm quan trọng vừa tiến hành phát triển sản phẩm -> V-ます + つつ."
      }
    ]
  }
];
