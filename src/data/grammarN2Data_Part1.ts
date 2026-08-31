import { GrammarN2Item } from "./grammarN2Data";

export const GRAMMAR_N2_PART1: GrammarN2Item[] = [
  // ========== BÀI 1 (1〜5) ==========
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
      { jp: "この書類は、カード作成の際、必要です。", vn: "Giấy tờ này cần thiết khi làm thẻ." },
      { jp: "こちらの会議室をご利用になる際は、受付にご記入ください。", vn: "Khi quý khách sử dụng phòng họp này, xin vui lòng điền thông tin tại bàn lễ tân." },
      { jp: "アメリカの大統領が来日した際、わたしたちの大学でスピーチを行った。", vn: "Khi Tổng thống Mỹ đến thăm Nhật Bản, ông đã có bài phát biểu tại trường đại học của chúng tôi." }
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
      "Dạng bổ nghĩa cho danh từ: 〜に際しての N / 〜にあたっての N"
    ],
    nuance: "Dùng khi bắt đầu hoặc thực hiện một sự kiện, thời điểm quan trọng, đặc biệt hoặc công việc lớn (như kết hôn, nhập học, mở cửa hàng, bắt đầu dự án...). Diễn tả ý nghĩa 'nhân dịp/trước khi thực hiện sự kiện đó thì làm hành động chuẩn bị, chào hỏi hoặc xác nhận'. Thường mang tính trang trọng (硬い言い方), dùng trong văn viết, phát biểu hoặc thông báo chính thức.",
    ruleConstraints: [
      "[Điểm khác biệt của 〜にあたって]: Ngữ pháp này mang sắc thái tích cực, chủ động nên KHÔNG dùng cho các sự kiện mang tính tiêu cực/âm tính (như nhập viện, thất bại, ly hôn...).",
      "[Dạng bổ nghĩa cho danh từ]: Sử dụng dạng 〜に際しての ＋ N hoặc 〜にあたっての ＋ N."
    ],
    examples: [
      { jp: "工事開始に際しまして、近隣の皆様にごあいさつをして回った。", vn: "Khi bắt đầu thi công, chúng tôi đã đi chào hỏi các hộ gia đình xung quanh." },
      { jp: "当ショッピングサイトのご利用に際して、以下のご利用条件をよくお読みください。", vn: "Khi/Trước khi sử dụng trang web mua sắm này, xin vui lòng đọc kỹ các điều khoản sử dụng dưới đây." },
      { jp: "新しく事業を始めるにあたって、しっかりと準備をしようと思っている。", vn: "Nhân dịp/Khi bắt đầu sự nghiệp kinh doanh mới, tôi định sẽ chuẩn bị thật kỹ lưỡng." },
      { jp: "お二人の門出にあたりまして、一言お祝いを申し上げます。", vn: "Nhân dịp khởi đầu cuộc sống mới của hai bạn, tôi xin có đôi lời chúc mừng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "新工場の建設を始める（　　）、周辺住民への説明会を開いた。",
        options: ["にあたって", "つつ", "ばかりに", "どころか"],
        correctIndex: 0,
        explanation: "Bắt đầu sự án lớn (xây nhà máy) trang trọng -> dùng にあたって / に際して."
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
      "[Hạn chế vế sau]: Không đi kèm với câu thể hiện ý chí, nguyện vọng, mong muốn của người nói hay câu mệnh lệnh, rủ rê.",
      "[Chủ ngữ]: Không dùng vế sau để diễn tả hành động cố ý của chính bản thân người nói."
    ],
    examples: [
      { jp: "山の頂上でワインを一口飲んだとたん、めまいがした。", vn: "Vừa mới uống một ngụm rượu vang trên đỉnh núi thì ngay lập tức tôi bị chóng mặt." },
      { jp: "夫は結婚前は優しかったが、結婚したとたん、態度が変わった。", vn: "Chồng tôi trước khi kết hôn rất dịu dàng, nhưng vừa mới kết hôn xong thì thái độ thay đổi ngay." },
      { jp: "国の母に電話をかけた。声を聞いたとたん、涙があふれてきた。", vn: "Tôi gọi điện cho mẹ ở quê. Vừa nghe thấy giọng mẹ một cái là nước mắt lập tức trào ra." },
      { jp: "僕が「さようなら」と言ったとたん、彼女は走っていってしまった。", vn: "Ngay khi tôi vừa nói 'Tạm biệt' thì cô ấy liền chạy vụt đi mất." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "窓を開けた（　　）、強い風が吹き込んできた。",
        options: ["とたん", "うちに", "次第", "末に"],
        correctIndex: 0,
        explanation: "Vừa mở cửa sổ thì ngay lập tức gió thổi ào vào -> V-た + とたん."
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
      { jp: "林さんは部屋に入ってきたかと思うと、いきなり窓を全部開けた。", vn: "Anh Hayashi vừa mới bước vào phòng thì lập tức mở toang tất cả cửa sổ." },
      { jp: "赤ちゃんは今泣いたかと思うと、もう笑っている。", vn: "Đứa bé vừa mới khóc đó mà đã lại đang cười ngay được." },
      { jp: "やっと部屋が片付いたかと思ったら、子供たちがすぐまた散らかした。", vn: "Vừa mới dọn dẹp xong cái phòng thì đám trẻ lại làm bừa bãi ra ngay." },
      { jp: "このごろは気温の差が大きい。昨日は暑くなったかと思ったら、今日は涼しい。", vn: "Dạo này chênh lệch nhiệt độ lớn thật. Mới hôm qua vừa thấy nóng lên mà hôm nay đã mát mẻ rồi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "雷がピカッと光った（　　）、ものすごい音が鳴り響いた。",
        options: ["かと思うと", "うちに", "ばかりに", "反面"],
        correctIndex: 0,
        explanation: "Vừa lóe sáng thì tức thì có tiếng nổ vang lên -> V-た + かと思うと."
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
      { jp: "一郎はベッドに横になるか横にならないのうちに、ぐっすり眠ってしまった。", vn: "Ichiro vừa mới nằm xuống giường chưa kịp ấm chỗ thì đã ngủ khì mất rồi." },
      { jp: "わたしは夜が明けたか明けないかのうちに家を出て、空港へ向かった。", vn: "Tôi vừa chớm hửng sáng chưa kịp rõ mặt người thì đã rời khỏi nhà để đi ra sân bay." },
      { jp: "あの作家は今売れっ子だ。話題作を発表したかしないかのうちに、もう次の作品に取りかかっているそうだ。", vn: "Tác giả đó dạo này đang rất ăn khách. Nghe nói vừa mới phát hành tác phẩm gây chú ý xong thì đã bắt tay ngay vào tác phẩm tiếp theo." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "授業が終わるか（　　）かのうちに、学生たちは教室を飛び出した。",
        options: ["終わらない", "終わった", "終わる", "終わらなくて"],
        correctIndex: 0,
        explanation: "Cấu trúc: V-る/た + か + V-ない + かのうちに -> 終わらない."
      }
    ]
  },

  // ========== BÀI 2 (6〜11) ==========
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
      { jp: "田中さんは今考え事をしている最中だから、じゃましないほうがいい。", vn: "Anh Tanaka đang đúng lúc suy nghĩ nên tốt nhất không nên làm phiền." },
      { jp: "浜辺でバーベキューをしている最中に、急に雨が降り出した。", vn: "Đúng lúc đang nướng thịt ngoài bãi biển thì đột nhiên trời đổ mưa." },
      { jp: "スピーチの最中に、突然電源が切れた。", vn: "Đúng lúc đang phát biểu thì đột nhiên mất điện." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "会議の（　　）に携帯電話が鳴ってしまい、恥ずかしかった。",
        options: ["最中", "うち", "ばかり", "一方"],
        correctIndex: 0,
        explanation: "Đúng lúc đang họp thì chuông reo cắt ngang -> N + の最中に."
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
      { jp: "日本にいるうちに、一度富士山に登ってみたい。", vn: "Trong lúc còn ở Nhật, tôi muốn tranh thủ leo núi Phú Sĩ một lần. (Nhóm A)" },
      { jp: "忘れないうちに、カレンダーにメモしておこう。", vn: "Trong lúc chưa quên, hãy ghi chú lại vào lịch. (Nhóm A)" },
      { jp: "熱いうちに、どうぞお召し上がりください。", vn: "Xin mời ăn lúc còn nóng. (Nhóm A)" },
      { jp: "インターネットで調べているうちに、いろいろなことがわかってきた。", vn: "Trong lúc tìm kiếm trên mạng, tôi dần hiểu ra nhiều điều. (Nhóm B)" },
      { jp: "この教科書は、長い間使っているうちに、もう自分の体の一部のようになった。", vn: "Cuốn giáo trình này dùng trong thời gian dài, dần dần đã trở thành như một phần cơ thể. (Nhóm B)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "明るい（　　）に、庭の掃除を終わらせてしまおう。",
        options: ["うちに", "最中に", "ばかりに", "ところで"],
        correctIndex: 0,
        explanation: "Tranh thủ lúc trời còn sáng -> A-い + うちに."
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
      { jp: "このごろは仕事が多くて、ストレスが溜まるばかりだ。", vn: "Dạo này công việc nhiều, áp lực chỉ có ngày càng gia tăng." },
      { jp: "東京の交通機関は複雑になるばかりで、わたしはよくわからなくなってきた。", vn: "Giao thông ở Tokyo chỉ ngày càng phức tạp thêm, tôi dần trở nên không hiểu nổi." },
      { jp: "一度問題が起きてから、彼との人間関係は悪くなる一方だ。", vn: "Từ sau khi nảy sinh sự cố, mối quan hệ với anh ấy chỉ ngày càng xấu đi." },
      { jp: "牛や豚の病気が広がる一方なので、国中の人が心配している。", vn: "Bệnh dịch ở bò và lợn liên tục lan rộng nên người dân cả nước đều lo lắng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "物価は上がる（　　）で、生活が苦しくなってきた。",
        options: ["一方", "最中", "次第", "きり"],
        correctIndex: 0,
        explanation: "Giá cả ngày càng leo thang liên tục -> V-辞書形 + 一方だ."
      }
    ]
  },
  {
    id: 9,
    pattern: "〜（よう）としている",
    meaning: "Sắp... / Chuẩn bị... (khoảnh khắc trước khi bắt đầu/kết thúc)",
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
      { jp: "さあ、決勝戦が今、始まろうとしています。みんな緊張しています。", vn: "Nào, trận chung kết sắp sửa bắt đầu ngay bây giờ. Mọi người đều đang rất căng thẳng." },
      { jp: "駅前に30階建ての高級マンションが完成しようとしている。", vn: "Tòa chung cư cao cấp 30 tầng trước nhà ga sắp sửa được hoàn thành." },
      { jp: "桜が満開になろうとしているとき、雪が降った。", vn: "Đúng lúc hoa anh đào sắp sửa nở rộ thì tuyết lại rơi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "コンサートが幕を閉じ（　　）としている。",
        options: ["よう", "る", "た", "ない"],
        correctIndex: 0,
        explanation: "V-意向形 + としている -> 閉じようとしている (sắp sửa hạ màn)."
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
      { jp: "次第に暖かくなりつつあります。春はもうすぐです。", vn: "Trời đang dần dần ấm lên. Mùa xuân đã đến rất gần rồi." },
      { jp: "この会社は現在発展しつつあり、将来が期待される。", vn: "Công ty này hiện đang trong quá trình phát triển và được kỳ vọng lớn trong tương lai." },
      { jp: "明治時代の初め、日本は急速に近代化しつつあった。", vn: "Vào đầu thời kỳ Meiji, Nhật Bản đang tiến hành hiện đại hóa một cách nhanh chóng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "景気は少しずつ回復し（　　）。",
        options: ["つつある", "つつ", "最中だ", "ばかりだ"],
        correctIndex: 0,
        explanation: "Kinh tế đang từng bước dần hồi phục -> V-ます + つつある."
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
      { jp: "この空き地をどうするかについては、住民と話し合いつつ、計画を立てていきたい。", vn: "Về việc xử lý khu đất trống này, tôi muốn vừa thảo luận với người dân vừa lập kế hoạch." },
      { jp: "将来の仕事のこと、お金のことなどを考えつつ、進路を選ばなければならない。", vn: "Vừa phải suy nghĩ về công việc, tiền bạc trong tương lai, vừa phải đưa ra lựa chọn con đường đi." },
      { jp: "いろいろな体験を楽しみつつ、日本の生活に慣れていった。", vn: "Vừa tận hưởng nhiều trải nghiệm khác nhau, tôi vừa dần quen với cuộc sống tại Nhật." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "健康に気を配り（　　）、毎日ジョギングをしている。",
        options: ["つつ", "つつある", "最中に", "うちに"],
        correctIndex: 0,
        explanation: "Vừa chú ý giữ gìn sức khỏe vừa chạy bộ -> V-ます + つつ."
      }
    ]
  },

  // ========== BÀI 3 (12〜16) ==========
  {
    id: 12,
    pattern: "〜てはじめて",
    meaning: "Chỉ sau khi... thì mới... / Cho đến khi... thì mới nhận ra...",
    topicId: 3,
    topicName: "Bài 3: 〜後で",
    connection: [
      "V（て形） ＋ はじめて"
    ],
    nuance: "Diễn tả sau khi trải qua/thực hiện một hành động hoặc trạng thái vế trước, người nói mới nhận ra điều gì đó hoặc bước sang một trạng thái mới mà trước đây chưa từng có. Vế sau thường mang ý nghĩa: nhận ra (気づく), hiểu ra (わかる), hoặc xuất hiện trạng thái mới.",
    ruleConstraints: [
      "[Hạn chế vế sau]: Không dùng với các câu thể hiện ý chí, mệnh lệnh hay cầu khiến của người nói.",
      "[Trọng tâm ý nghĩa]: Vế sau tập trung vào việc thể hiện sự nhận thức mới hoặc sự biến đổi trạng thái xảy ra lần đầu tiên."
    ],
    examples: [
      { jp: "実際に現地の様子を見てはじめて、事態の深刻さを知った。", vn: "Chỉ sau khi nhìn tận mắt tình hình thực tế ở hiện trường, tôi mới biết được mức độ nghiêm trọng của sự việc." },
      { jp: "相手の話の途中で口をはさむと、人に嫌われてはじめて気がついた。", vn: "Cho đến khi bị mọi người ghét, tôi mới nhận ra rằng ngắt lời người khác giữa chừng là không tốt." },
      { jp: "歌舞伎の本当の面白さを知ってはじめて、伝統芸能の価値がわかるようになった。", vn: "Chỉ sau khi hiểu được cái hay thực sự của Kabuki, tôi mới bắt đầu nhận ra giá trị của nghệ thuật truyền thống." },
      { jp: "チャンスがあってはじめて、才能が生きてくるのではないだろうか。", vn: "Chỉ sau khi có cơ hội thì tài năng mới phát huy được chứ nhỉ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "病気になっ（　　）、健康の大切さに気がついた。",
        options: ["てはじめて", "た上で", "次第", "て以来"],
        correctIndex: 0,
        explanation: "Chỉ sau khi bị bệnh mới nhận thức được sự quý giá của sức khỏe -> V-て + はじめて."
      }
    ]
  },
  {
    id: 13,
    pattern: "〜上で",
    meaning: "Sau khi... thì mới... / Trên cơ sở...",
    topicId: 3,
    topicName: "Bài 3: 〜後で",
    connection: [
      "V（た形） ＋ 上で（は） / 上の / 上での",
      "N ＋ の ＋ 上で（は） / 上の / 上での"
    ],
    nuance: "Diễn tả thứ tự hành động: thực hiện xong hành động A, lấy đó làm bước chuẩn bị hoặc căn cứ rồi mới tiến hành hành động B. Vế sau là một hành động mang tính ý chí và có chủ đích của người nói (như quyết định, liên lạc, thực hiện bước tiếp theo). Cả hai vế A và B đều phải do CÙNG MỘT CHỦ NGỮ thực hiện.",
    ruleConstraints: [
      "[So sánh với 〜てから]: 「〜てから」 chỉ thứ tự thời gian đơn thuần (làm A rồi làm B), trong khi 「〜上で」 nhấn mạnh hành động A là chuẩn bị / điều kiện bắt buộc để làm B.",
      "[Phân biệt cấu trúc]: Tránh nhầm lẫn với 「V-辞書形 ＋ 上で」 (mang nghĩa 'trong quá trình làm / để làm việc gì đó')."
    ],
    examples: [
      { jp: "文書が保存されていることを確かめた上で、パソコンの電源を切ってください。", vn: "Sau khi xác nhận tài liệu đã được lưu, xin vui lòng tắt nguồn máy tính." },
      { jp: "自分の進路のことをよく考えた上で、結論を出したいと思う。", vn: "Sau khi suy nghĩ kỹ về định hướng của bản thân, tôi mới muốn đưa ra kết luận." },
      { jp: "今回は一人では決められませんので、家族と相談した上で、お返事をいたします。", vn: "Lần này tôi không thể tự mình quyết định nên sau khi bàn bạc với gia đình, tôi sẽ trả lời sau." },
      { jp: "この列車には特急券が必要です。あらかじめ特急券をお買い求めの上、ご乗車ください。", vn: "Chuyến tàu này yêu cầu phải có vé tàu nhanh. Quý khách vui lòng mua vé trước rồi mới lên tàu." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "担当者と相談し（　　）、後日改めてご連絡いたします。",
        options: ["た上で", "てはじめて", "次第", "て以来"],
        correctIndex: 0,
        explanation: "Sau khi bàn bạc xong với người phụ trách làm căn cứ rồi sẽ liên lạc lại -> V-た + 上で."
      }
    ]
  },
  {
    id: 14,
    pattern: "〜次第",
    meaning: "Ngay sau khi... (sẽ làm ngay)",
    topicId: 3,
    topicName: "Bài 3: 〜後で",
    connection: [
      "V（ます形 - bỏ ます） ＋ 次第"
    ],
    nuance: "Diễn tả ý nghĩa: 'Ngay khi sự việc/hành động A xảy ra hoặc hoàn thành, lập tức sẽ thực hiện ngay hành động B'. Thường dùng trong giao tiếp công việc, thông báo, thương mại để thể hiện sự khẩn trương, chuyên nghiệp. Vế sau luôn thể hiện hành động ý chí của người nói (thông báo, yêu cầu, hứa hẹn...).",
    ruleConstraints: [
      "[Thời điểm]: Chỉ đi với những sự việc chưa xảy ra (trong tương lai).",
      "[Đặc điểm câu]: Là cách nói trang trọng (硬い言い方), vế sau KHÔNG dùng thể quá khứ."
    ],
    examples: [
      { jp: "詳しいことがわかり次第、ご連絡いたします。", vn: "Ngay sau khi biết thông tin chi tiết, tôi sẽ liên lạc ngay." },
      { jp: "定員になり次第、締め切らせていただきます。", vn: "Ngay sau khi đủ số lượng quy định, chúng tôi xin phép đóng đăng ký." },
      { jp: "会場の準備ができ次第、ご案内いたします。もうしばらくお待ちください。", vn: "Ngay sau khi chuẩn bị xong hội trường, chúng tôi sẽ hướng dẫn quý vị vào. Xin vui lòng chờ thêm một chút." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "品物が届き（　　）、代金をお支払いください。",
        options: ["次第", "上で", "とたん", "うちに"],
        correctIndex: 0,
        explanation: "V-ます (bỏ ます) + 次第: Ngay khi hàng đến nơi thì thanh toán -> 次第."
      }
    ]
  },
  {
    id: 15,
    pattern: "〜て以来・〜てこのかた",
    meaning: "Kể từ sau khi... (đến nay vẫn liên tục tiếp diễn)",
    topicId: 3,
    topicName: "Bài 3: 〜後で",
    connection: [
      "V（て形） ＋ 以来 / このかた"
    ],
    nuance: "Diễn tả từ sau một mốc thời điểm/sự việc trong quá khứ, một trạng thái hoặc hành động vẫn tiếp tục kéo dài liên tục cho đến hiện tại. 「〜てこのかた」 mang sắc thái trang trọng, cổ xưa hơn so với 「〜て以来」.",
    ruleConstraints: [
      "[Mốc thời gian]: Không dùng cho các mốc thời gian quá gần trong quá khứ (như vừa sáng nay, mới hôm qua).",
      "[Vế sau]: Biểu thị trạng thái kéo dài đến hiện tại, KHÔNG dùng để nói về sự việc trong tương lai."
    ],
    examples: [
      { jp: "1年前にけがをして以来、体の調子がどうも良くない。", vn: "Kể từ sau khi bị thương 1 năm trước đến nay, tình trạng sức khỏe của tôi không được tốt lắm." },
      { jp: "あの山の写真を見て以来、いつかは登ってみたいとずっと思い続けてきた。", vn: "Kể từ sau khi xem bức ảnh ngọn núi đó, tôi vẫn luôn mong muốn một ngày nào đó sẽ leo thử." },
      { jp: "子供が生まれて以来、外でお酒を飲んでいない。", vn: "Kể từ khi con ra đời đến nay, tôi không uống rượu ở ngoài nữa." },
      { jp: "日本から帰国してこのかた、毎日日本のことを思い出している。", vn: "Kể từ sau khi về nước từ Nhật Bản đến nay, ngày nào tôi cũng nhớ về Nhật Bản." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "卒業し（　　）、一度も彼に会っていません。",
        options: ["て以来", "た上で", "てはじめて", "次第"],
        correctIndex: 0,
        explanation: "Kể từ sau khi tốt nghiệp đến nay chưa từng gặp lại -> V-て + 以来."
      }
    ]
  },
  {
    id: 16,
    pattern: "〜てからでないと・〜てからでなければ",
    meaning: "Nếu chưa... thì không thể... / Phải sau khi... thì mới có thể...",
    topicId: 3,
    topicName: "Bài 3: 〜後で",
    connection: [
      "V（て形） ＋ からでないと / からでなければ"
    ],
    nuance: "Diễn tả điều kiện bắt buộc: Nếu không thực hiện xong hành động A trước thì hành động/sự việc B ở vế sau không thể diễn ra hoặc không thể thực hiện được. Vế sau luôn mang ý nghĩa phủ định hoặc bất khả năng.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Luôn đi kèm với các biểu hiện mang tính phủ định hoặc tiêu cực như 〜できない (không thể), 〜無理だ (không thể/quá sức), 〜いけない (không được)."
    ],
    examples: [
      { jp: "この果物は赤くなってからでないと、酸っぱくて食べられません。", vn: "Quả này nếu chưa chín đỏ thì chua không ăn được." },
      { jp: "もっと情報を集めてからでないと、その話が本当かどうか判断できない。", vn: "Nếu chưa thu thập thêm thông tin thì không thể phán đoán tin đó có thật hay không." },
      { jp: "この電車は車内の清掃が終わってからでないと、ご乗車になれません。", vn: "Chuyến tàu này nếu chưa dọn dẹp xong bên trong khoang thì quý khách chưa thể lên tàu." },
      { jp: "退院したばかりなんですから、十分に体力がついてからでなければ、運動は無理ですよ。", vn: "Vì mới xuất viện nên nếu chưa hồi phục đủ thể lực thì vận động là quá sức đấy." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "契約書をよく読ん（　　）、サインはできません。",
        options: ["でからでないと", "だ上で", "で以来", "で次第"],
        correctIndex: 0,
        explanation: "Nếu chưa đọc kỹ hợp đồng thì không thể ký tên -> V-て + からでないと."
      }
    ]
  },

  // ========== BÀI 4 (17〜22) ==========
  {
    id: 17,
    pattern: "〜をはじめ（として）",
    meaning: "Tiêu biểu là... / Trước hết phải kể đến...",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "N ＋ をはじめ（として）",
      "N ＋ をはじめとする ＋ N"
    ],
    nuance: "Dùng khi đưa ra một ví dụ đại diện, tiêu biểu nhất cho một tập hợp, và sau đó đề cập thêm nhiều đối tượng/ví dụ khác thuộc cùng tập hợp đó.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Theo sau vế ngữ pháp này thường là danh từ dạng số nhiều hoặc cụm từ biểu thị tập hợp (như いろいろな, 多くの...)."
    ],
    examples: [
      { jp: "この体育館では水泳をはじめ、いろいろなスポーツが楽しめる。", vn: "Ở nhà thi đấu này, tiêu biểu là bơi lội, bạn có thể trải nghiệm nhiều môn thể thao khác nhau." },
      { jp: "日本には「桃太郎」をはじめとして、おじいさん、おばあさんが出てくる昔話が多い。", vn: "Ở Nhật Bản, tiêu biểu như truyện 'Momotaro', có rất nhiều truyện cổ tích xuất hiện ông lão và bà lão." },
      { jp: "このあたりには、市役所をはじめとする県の公的機関が多い。", vn: "Quanh khu vực này có nhiều cơ quan công cộng của tỉnh, tiêu biểu là tòa thị chính." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "富士山（　　）、日本には美しい山がたくさんある。",
        options: ["をはじめ", "からして", "にわたって", "かぎり"],
        correctIndex: 0,
        explanation: "Núi Phú Sĩ là ví dụ tiêu biểu nhất của các ngọn núi Nhật Bản -> をはじめ."
      }
    ]
  },
  {
    id: 18,
    pattern: "〜からして",
    meaning: "Ngay từ... / Ngay cả... (đã thế rồi)",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "N ＋ からして"
    ],
    nuance: "Dùng khi đưa ra một ví dụ nhỏ, chi tiết hoặc điểm khởi đầu chưa phải cốt lõi để nhấn mạnh rằng: ngay cả góc độ/chi tiết nhỏ đó đã như vậy rồi thì toàn bộ cái chung chắc chắn cũng sẽ như thế.",
    ruleConstraints: [
      "[Sắc thái biểu đạt]: Thường dùng để thể hiện đánh giá tiêu cực, không hài lòng hoặc sự ngạc nhiên, ấn tượng đặc biệt."
    ],
    examples: [
      { jp: "この旅行の計画には無理がある。出発時間からして早すぎる。", vn: "Kế hoạch chuyến đi này có chỗ không hợp lý. Ngay từ thời gian xuất phát đã quá sớm rồi." },
      { jp: "わたしはどうも彼が苦手だ。あの見る目つきからして何となく怖い感じがする。", vn: "Tôi thực sự không hợp với anh ta. Ngay từ ánh mắt nhìn của anh ta đã cảm thấy có gì đó đáng sợ rồi." },
      { jp: "わたしと弟は似ているところが少ない。第一、食べ物の好みからして全然違う。", vn: "Tôi và em trai có rất ít điểm giống nhau. Đầu tiên, ngay từ sở thích ăn uống đã hoàn toàn khác nhau rồi." },
      { jp: "さすがプロの選手は走り方からしてわたしたちとは違う。", vn: "Quả đúng là vận động viên chuyên nghiệp, ngay từ dáng chạy đã khác chúng tôi rồi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "タイトル（　　）面白そうだから、この本を買ってみよう。",
        options: ["からして", "をはじめ", "にわたって", "かぎり"],
        correctIndex: 0,
        explanation: "Ngay từ cái tiêu đề đã thấy hay -> N + からして."
      }
    ]
  },
  {
    id: 19,
    pattern: "〜にわたって",
    meaning: "Suốt... / Trải suốt... / Kéo dài trên diện rộng...",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "N ＋ にわたって / にわたり",
      "N ＋ にわたる ＋ N"
    ],
    nuance: "Diễn tả một trạng thái, hành động hay sự việc diễn ra, lan rộng trên toàn bộ một phạm vi lớn (thời gian, không gian, số lần, địa điểm, lĩnh vực).",
    ruleConstraints: [
      "[Danh từ đi kèm]: Danh từ đi trước 〜にわたって là các từ chỉ khoảng thời gian, địa điểm, số lần hoặc phạm vi rộng lớn (như 数キロ, 7日間, 長年...)."
    ],
    examples: [
      { jp: "道路の工事は、約数キロにわたって作業が続いた。", vn: "Công trình làm đường đã tiếp tục thi công kéo dài suốt mấy kilômét." },
      { jp: "彼はいろいろなジャンルにおよび、たくさんの本を読んでいる。", vn: "Anh ấy đọc rất nhiều sách trải rộng trên nhiều thể loại khác nhau." },
      { jp: "7日間にわたる厳しい修業が、無事終了しました。", vn: "Khóa tu luyện nghiêm khắc kéo dài suốt 7 ngày đã kết thúc tốt đẹp." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "台風は3日間（　　）列島に被害をもたらした。",
        options: ["にわたって", "からして", "をはじめ", "のもとで"],
        correctIndex: 0,
        explanation: "Kéo dài liên tục suốt 3 ngày -> N (khoảng thời gian) + にわたって."
      }
    ]
  },
  {
    id: 20,
    pattern: "〜を通じて・〜を通して",
    meaning: "Nhóm A: Xuyên suốt... / Nhóm B: Thông qua (trung gian, phương tiện)...",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "N ＋ を通じて / を通して",
      "N ＋ を通じての / を通しての ＋ N"
    ],
    nuance: "• Nhóm A (Thời gian): Diễn tả một trạng thái kéo dài liên tục không đổi trong suốt một khoảng thời gian.\n• Nhóm B (Trung gian): Diễn tả việc thực hiện một hành động/mục đích thông qua một phương tiện gián tiếp, một mối quan hệ trung gian hay kênh thông tin.",
    ruleConstraints: [
      "[Khi mang nghĩa A (Thời gian)]: Danh từ đi kèm là từ chỉ khoảng thời gian dài (như 四季, 年間, 一生...).",
      "[Khi mang nghĩa B (Trung gian)]: KHÔNG dùng cho phương tiện/công cụ trực tiếp, cụ thể (như バス, ナイフ), mà dùng cho các phương tiện gián tiếp như Internet, mối quan hệ, mạng lưới, tin tức..."
    ],
    examples: [
      { jp: "この町には四季を通じて観光客が訪れる。", vn: "Thành phố này có khách du lịch ghé thăm xuyên suốt cả bốn mùa. (Nhóm A)" },
      { jp: "在職期間を通して皆様には大変お世話になりました。", vn: "Trong suốt thời gian tại chức, tôi đã nhận được sự giúp đỡ rất nhiều từ quý vị. (Nhóm A)" },
      { jp: "今日では、インターネットを通じて世界中の情報が手に入る。", vn: "Ngày nay, thông qua Internet con người có thể có được thông tin trên toàn thế giới. (Nhóm B)" },
      { jp: "わたしたちは、ボランティア活動を通していろいろな国の人たちと交流を深めている。", vn: "Chúng tôi làm sâu sắc thêm giao lưu với mọi người ở nhiều quốc gia thông qua hoạt động tình nguyện. (Nhóm B)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "友人（　　）、彼と知り合いました。",
        options: ["を通じて", "にわたって", "からして", "に限り"],
        correctIndex: 0,
        explanation: "Thông qua người bạn (trung gian) để quen biết anh ấy -> N + を通じて / を通して."
      }
    ]
  },
  {
    id: 21,
    pattern: "〜限り",
    meaning: "Trong giới hạn... / Chừng nào còn... / Hết mức...",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "N ＋ の ＋ 限り",
      "V（辞書形 / ている形） ＋ 限り"
    ],
    nuance: "Diễn tả việc thực hiện hành động hoặc duy trì trạng thái ở mức toàn bộ, tối đa trong giới hạn phạm vi năng lực, quyền hạn, hiểu biết hay thời gian có được.",
    ruleConstraints: [
      "[Dạng động từ]: Động từ thường đi ở thể 辞書形, ている形 hoặc thể khả năng (〜できる限り, 〜知っている限り, 〜力の限り...)."
    ],
    examples: [
      { jp: "環境を守るためにわたしもできる限りのことをしたい。", vn: "Để bảo vệ môi trường, tôi muốn làm tất cả những gì có thể trong khả năng của mình." },
      { jp: "君が知っている限りのことを全部わたしに話してほしい。", vn: "Tôi muốn bạn nói cho tôi tất cả những gì bạn biết trong phạm vi hiểu biết của bạn." },
      { jp: "あしたいよいよ試合だ。力の限り頑張ろう。", vn: "Ngày mai rốt cuộc cũng đến trận đấu rồi. Hãy cố gắng hết sức lực có thể nhé." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "私の知っている（　　）、彼は決して嘘をつくような人ではない。",
        options: ["限り", "ばかり", "一方", "最中"],
        correctIndex: 0,
        explanation: "Trong phạm vi hiểu biết của tôi -> 知っている限り."
      }
    ]
  },
  {
    id: 22,
    pattern: "〜だけ",
    meaning: "Đến mức tối đa... / Bao nhiêu tùy thích... / Hết mức có thể...",
    topicId: 4,
    topicName: "Bài 4: 範囲の始まりと終わり・その間",
    connection: [
      "V（辞書形 / たい形 / 好きな） ＋ だけ"
    ],
    nuance: "Diễn tả việc thực hiện một hành động đến giới hạn tối đa của khả năng hoặc mong muốn.",
    ruleConstraints: [
      "[Cụm hay gặp]: Thường đi với động từ thể khả năng (〜できるだけ), động từ biểu thị mong muốn/sở thích (〜食べたいだけ, 〜好きなだけ) hoặc lặp lại cùng một động từ ở hai vế (〜言いたいだけ言った, 〜働くだけ働いた).",
      "[Hạn chế]: Không dùng cho các động từ chỉ khoảnh khắc ngắn."
    ],
    examples: [
      { jp: "ここにあるダンボールを、車に積めるだけ積んで持って帰ってください。", vn: "Hãy chất thùng carton ở đây lên xe nhiều nhất có thể rồi chở về nhé." },
      { jp: "父は働くだけ働いて、定年前に退職してしまった。", vn: "Bố tôi đã làm việc hết sức có thể rồi nghỉ hưu trước tuổi." },
      { jp: "今日は部長に言いたいだけの不満を全部言えて、すっきりした。", vn: "Hôm nay tôi đã nói hết tất cả những bất mãn muốn nói với trưởng phòng, thật là nhẹ nhõm." },
      { jp: "バイキング形式の食事ですから、好きなものを好きなだけ取ってお召し上がりください。", vn: "Vì là bữa ăn buffet nên xin mời quý khách tự lấy những món mình thích với số lượng bao nhiêu tùy thích." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "食べたい（　　）食べていいですよ。",
        options: ["だけ", "限り", "ばかり", "一方"],
        correctIndex: 0,
        explanation: "Muốn ăn bao nhiêu tùy thích -> 食べたいだけ."
      }
    ]
  },

  // ========== BÀI 5 (23〜26) ==========
  {
    id: 23,
    pattern: "〜に限り",
    meaning: "Chỉ riêng... / Chỉ trong trường hợp...",
    topicId: 5,
    topicName: "Bài 5: 〜だけ・限定と例外",
    connection: [
      "N ＋ に限り"
    ],
    nuance: "Dùng khi biểu thị sự ngoại lệ hoặc điều kiện ưu đãi đặc biệt chỉ áp dụng cho một đối tượng, trường hợp cụ thể. Thường xuất hiện trong các thông báo, quy định, giấy tờ chính thức hoặc dịch vụ khách hàng (硬い言い方).",
    ruleConstraints: [
      "[Đối tượng đi kèm]: Danh từ đi kèm là đối tượng được xử lý ngoại lệ/ưu đãi.",
      "[Hạn chế vế sau]: Thường không dùng các câu biểu thị ý chí hay sự kêu gọi/cầu khiến của người nói."
    ],
    examples: [
      { jp: "このチラシをご持参のお客様に限り、すべての商品を1割引きでお買い求めいただけます。", vn: "Chỉ riêng những khách hàng mang theo tờ rơi này mới được giảm giá 10% cho tất cả các sản phẩm." },
      { jp: "欠席理由が正当な場合に限り追試験にいたしますが、それ以外の欠席は認めません。", vn: "Chỉ trường hợp có lý do nghỉ học chính đáng mới được thi bổ sung, ngoài ra các trường hợp nghỉ khác sẽ không được chấp nhận." },
      { jp: "この病院は午後6時までですが、急を要する患者さんに限り、時間外でも診療いたします。", vn: "Bệnh viện này làm việc đến 6 giờ tối, nhưng chỉ riêng những bệnh nhân cấp cứu mới được khám ngoài giờ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "女性のお客様（　　）、デザートを無料でサービスいたします。",
        options: ["に限り", "を限りに", "限りでは", "に限って"],
        correctIndex: 0,
        explanation: "Chỉ riêng đối tượng khách nữ mới được ưu đãi -> N + に限り."
      }
    ]
  },
  {
    id: 24,
    pattern: "〜限り（は）",
    meaning: "Chừng nào còn... / Miễn là...",
    topicId: 5,
    topicName: "Bài 5: 〜だけ・限定と例外",
    connection: [
      "V（普通形） ＋ 限り（は）",
      "い形 / な形（-な / -である） ＋ 限り（は）",
      "N ＋ である ＋ 限り（は）"
    ],
    nuance: "Diễn tả ý nghĩa: Chừng nào trạng thái hay điều kiện ở vế trước còn tiếp tục duy trì thì trạng thái ở vế sau cũng vẫn diễn ra không đổi.",
    ruleConstraints: [
      "[Trạng thái kéo dài]: Cả hai vế trước và sau đều phải biểu thị trạng thái kéo dài.",
      "[Đặc điểm thì]: Vì mang tính chất điều kiện tiếp diễn nên vế sau KHÔNG dùng thể quá khứ."
    ],
    examples: [
      { jp: "この町に住んでいる限り、いつでも新鮮な魚が手に入る。", vn: "Chừng nào còn sống ở thị trấn này thì lúc nào cũng có thể mua được cá tươi." },
      { jp: "社長が考え方を変えない限り、この会社は何も変わらないのではないか。", vn: "Chừng nào giám đốc chưa thay đổi suy nghĩ thì công ty này chẳng thể thay đổi được gì." },
      { jp: "体の丈夫な限り、まだまだ山登りが楽しめるだろう。", vn: "Chừng nào cơ thể còn khỏe mạnh thì vẫn còn có thể tận hưởng việc leo núi." },
      { jp: "親である限り、子供に対する責任があると思う。", vn: "Chừng nào còn là cha mẹ thì tôi nghĩ vẫn có trách nhiệm đối với con cái." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "生きている（　　）、夢をあきらめたくない。",
        options: ["限り", "ばかり", "最中", "一方"],
        correctIndex: 0,
        explanation: "Chừng nào còn sống thì không từ bỏ ước mơ -> V-ている + 限り."
      }
    ]
  },
  {
    id: 25,
    pattern: "〜限りでは",
    meaning: "Theo như (thông tin, phạm vi)... / Trong phạm vi...",
    topicId: 5,
    topicName: "Bài 5: 〜だけ・限定と例外",
    connection: [
      "V（辞書形 / た形 / ている形） ＋ 限りでは",
      "N ＋ の ＋ 限りでは"
    ],
    nuance: "Dùng khi đưa ra phán đoán, nhận định hoặc thông tin dựa trên giới hạn của một nguồn thông tin, sự điều tra, quan sát hay hiểu biết nhất định.",
    ruleConstraints: [
      "[Động từ hay gặp]: Thường gắn liền với các động từ thu thập/xác nhận thông tin như 見る, 聞く, 調べる, 知っている, 調査する...",
      "[Vế sau]: Là câu biểu thị phán đoán hoặc thông tin rút ra từ nguồn đó."
    ],
    examples: [
      { jp: "今回の調査の限りでは、書類にミスはなかった。", vn: "Theo như cuộc điều tra lần này, không có lỗi sai nào trong hồ sơ." },
      { jp: "ちょっと見た限りでは、こちらの商品とあちらの商品では違いがないと思うのですが、どうして値段が違うんですか。", vn: "Theo như nhìn qua một chút thì tôi thấy sản phẩm này và sản phẩm kia không khác gì nhau, tại sao giá lại khác nhau?" },
      { jp: "わたしが知っている限りでは、この近所に本屋はありません。", vn: "Theo như phạm vi những gì tôi biết thì quanh đây không có hiệu sách nào." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "ニュースで見た（　　）、大きな被害はなかったようだ。",
        options: ["限りでは", "に限り", "に限って", "ばかりに"],
        correctIndex: 0,
        explanation: "Theo như những gì thấy trên thời sự -> V-た + 限りでは."
      }
    ]
  },
  {
    id: 26,
    pattern: "〜に限って",
    meaning: "Nghĩa A: Đúng vào... (khác thường lệ) / Nghĩa B: Đúng vào lúc... thì lại... (xui xẻo) / Nghĩa C: Riêng đối tượng... thì chắc chắn không có chuyện xấu đó",
    topicId: 5,
    topicName: "Bài 5: 〜だけ・限定と例外",
    connection: [
      "N ＋ に限って"
    ],
    nuance: "• Trường hợp A (Khác thường lệ): Nhấn mạnh sự việc xảy ra vào thời điểm/đối tượng đặc biệt, khác hẳn thói quen hay quy luật bình thường.\n• Trường hợp B (Trùng hợp xui xẻo): Diễn tả sự việc không may đột ngột xảy ra trùng đúng lúc quan trọng, thể hiện sự bất mãn của người nói.\n• Trường hợp C (Tin tưởng tuyệt đối): Thể hiện niềm tin đặc biệt vào đối tượng, khẳng định chắc chắn đối tượng không làm điều xấu.",
    ruleConstraints: [
      "[Ở trường hợp A]: Vế sau đi kèm câu mang nghĩa 'khác với mọi khi, rất đặc biệt'.",
      "[Ở trường hợp B]: Vế sau là tình huống xấu xảy ra, toàn bộ câu thể hiện sự bất mãn / xui xẻo.",
      "[Ở trường hợp C]: Vế sau luôn dùng câu phủ định (〜ないはずだ, 〜ないと思う) để khẳng định niềm tin tuyệt đối."
    ],
    examples: [
      { jp: "ふだん酒などあまり飲まない彼が、今日に限ってかなり飲んだ。何かあったのだろうか。", vn: "Anh ấy bình thường ít khi uống rượu, đúng hôm nay lại uống khá nhiều. Không biết có chuyện gì chăng? (Trường hợp A)" },
      { jp: "庭の手入れをしようと思っている日に限って雨が降る。", vn: "Đúng vào những ngày định dọn dẹp sân vườn thì trời lại mưa. (Trường hợp B)" },
      { jp: "今日は大切な用事があったのに、こんな時に限って子供が熱を出してしまった。", vn: "Hôm nay có việc quan trọng, thế mà đúng lúc này con lại bị sốt. (Trường hợp B)" },
      { jp: "うちの子に限って、そんな悪事をするはずがありません。", vn: "Riêng con nhà tôi thì chắc chắn không bao giờ làm điều xấu xa như thế. (Trường hợp C)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "傘を持ってこなかった日（　　）、雨が降る。",
        options: ["に限って", "に限り", "限りでは", "を限りに"],
        correctIndex: 0,
        explanation: "Đúng vào hôm không mang ô thì trời lại đổ mưa (xui xẻo) -> N + に限って."
      }
    ]
  },

  // ========== BÀI 6 (27〜31) ==========
  {
    id: 27,
    pattern: "〜に限らず",
    meaning: "Không chỉ... mà còn... / Không giới hạn ở...",
    topicId: 6,
    topicName: "Bài 6: 〜だけではなく・それに加えて",
    connection: [
      "N ＋ に限らず"
    ],
    nuance: "Diễn tả phạm vi sự việc không chỉ dừng lại ở đối tượng hay thời điểm được nêu ra, mà còn mở rộng ra phạm vi rộng lớn hơn.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau thường đi kèm trợ từ 「も」 hoặc các từ biểu thị phạm vi rộng lớn hơn (như みんな, さまざまな, いつも...)."
    ],
    examples: [
      { jp: "この水族館は、休日に限らず、平日も入館者が多い。", vn: "Thủy cung này không chỉ ngày lễ mà ngày thường người vào tham quan cũng đông." },
      { jp: "うちの畑に限らず近所の農園はみんな夜中のバイクの音に悩まされている。", vn: "Không chỉ ruộng nhà tôi mà các trang trại lân cận đều bị phiền nhiễu bởi tiếng xe máy ban đêm." },
      { jp: "近年、地方の町に限らず大都市でも方言の言語が衰えている。", vn: "Những năm gần đây, không chỉ các thị trấn địa phương mà ngay cả các đô thị lớn tiếng địa phương cũng đang mai một." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "最近は女性（　　）、男性も化粧品を使う人が増えている。",
        options: ["に限らず", "に限り", "限りでは", "に限って"],
        correctIndex: 0,
        explanation: "Không chỉ phụ nữ mà cả nam giới -> N + に限らず."
      }
    ]
  },
  {
    id: 28,
    pattern: "〜のみならず",
    meaning: "Không chỉ... mà còn...",
    topicId: 6,
    topicName: "Bài 6: 〜だけではなく・それに加えて",
    connection: [
      "N ＋ のみならず",
      "V / い形 / な形 / N（普通形） ＋ のみならず",
      "※ Lưu ý: な形-である / N-である"
    ],
    nuance: "Diễn tả ý nghĩa 'không chỉ dừng lại ở A, mà còn có thêm B nữa' (A và B thường là các đối tượng/sự việc ở cùng cấp độ). Mang tính chất văn viết, phát biểu trang trọng (硬い言い方).",
    ruleConstraints: [
      "[So sánh]: Tương tự như 「〜だけでなく」, nhưng dùng trong hoàn cảnh trang trọng hơn (硬い言い方).",
      "[Đặc điểm vế sau]: Thường đi kèm trợ từ 「も」 để nhấn mạnh sự bổ sung."
    ],
    examples: [
      { jp: "電気代のみならず、ガス代や水道代も値上がりするようだ。", vn: "Không chỉ tiền điện mà có vẻ cả tiền gas và tiền nước cũng tăng giá." },
      { jp: "大雨のみならず、台風も被害の拡大に拍車をかけた。", vn: "Không chỉ mưa lớn mà bão cũng làm gia tăng thêm thiệt hại." },
      { jp: "川本さんは、高度な技術を習得したのみならず、それについて自慢することもなかった。", vn: "Anh Kawamoto không chỉ tiếp thu kỹ thuật cao mà còn chưa từng tự mãn về điều đó." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼は日本語（　　）、英語や中国語も流暢に話せる。",
        options: ["のみならず", "に限り", "ばかりに", "反面"],
        correctIndex: 0,
        explanation: "Không chỉ tiếng Nhật mà còn cả tiếng Anh, tiếng Trung -> N + のみならず."
      }
    ]
  },
  {
    id: 29,
    pattern: "〜ばかりか",
    meaning: "Không chỉ... mà còn... / Chẳng những... mà lại còn...",
    topicId: 6,
    topicName: "Bài 6: 〜だけではなく・それに加えて",
    connection: [
      "V / い形 / な形 / N（普通形） ＋ ばかりか",
      "※ Lưu ý: な形-な / -である; N-である"
    ],
    nuance: "Diễn tả ý nghĩa: Sự việc ở vế A đã đủ/đã nhiều rồi, vậy mà còn cộng thêm/xảy ra tiếp sự việc B nữa. Cả hai vế A và B thường cùng một chiều hướng (cùng là việc tốt hoặc cùng là việc xấu/tiêu cực).",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Thường đi kèm trợ từ 「も」.",
      "[Hạn chế vế sau]: Không dùng cho các câu biểu thị mong muốn, cầu khiến, mệnh lệnh hay ý chí của người nói."
    ],
    examples: [
      { jp: "朋子さんは遅れたばかりか約束もすっかり忘れていたので、みんなの機嫌を悪くしてしまった。", vn: "Tomoko không chỉ đến muộn mà còn quên khuấy mất hẹn, làm mọi người đều bực mình." },
      { jp: "林先生の指導は、子供にもわかりやすいばかりか、非常におもしろくてためになる。", vn: "Sự hướng dẫn của thầy Hayashi không chỉ dễ hiểu đối với trẻ em mà còn rất thú vị và bổ ích." },
      { jp: "Aコースの山道は、初心者には危険なばかりか、途中の景色もあまり良くない。", vn: "Con đường núi của tuyến A không chỉ nguy hiểm cho người mới bắt đầu mà cảnh quan trên đường cũng không đẹp lắm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼は親切に教えてくれた（　　）、ノートまで貸してくれた。",
        options: ["ばかりか", "ばかりに", "だけに", "反面"],
        correctIndex: 0,
        explanation: "Không chỉ dạy bảo ân cần mà lại còn cho mượn cả vở ghi -> ばかりか."
      }
    ]
  },
  {
    id: 30,
    pattern: "〜はもとより",
    meaning: "...thì là lẽ đương nhiên, ngoài ra còn... / Không chỉ... mà ngay cả...",
    topicId: 6,
    topicName: "Bài 6: 〜だけではなく・それに加えて",
    connection: [
      "N（＋Trợ từ） ＋ はもとより"
    ],
    nuance: "Dùng khi đưa ra một đối tượng/ví dụ A mà người nói coi là hiển nhiên, đương nhiên; sau đó bổ sung thêm đối tượng/ví dụ B ở vế sau. Mang phong cách trang trọng, văn viết (硬い言い方).",
    ruleConstraints: [
      "[So sánh]: Tương đương với 「〜はもちろん」 nhưng mang sắc thái văn phong viết/trang trọng hơn.",
      "[Đặc điểm vế sau]: Rất hay đi kèm trợ từ 「も」 (ほかにも〜も)."
    ],
    examples: [
      { jp: "たばこは本人はもとより、周りの人にも害を及ぼす。", vn: "Thuốc lá thì người hút chịu hại là đương nhiên rồi, nhưng còn gây hại cho cả những người xung quanh nữa." },
      { jp: "家族で外国に滞在している人は、自分の健康管理はもとより家族の心身の健康にも気を配ったほうがいい。", vn: "Những người sống cùng gia đình ở nước ngoài thì việc quản lý sức khỏe bản thân là hiển nhiên, nhưng cũng nên chú ý đến sức khỏe thể chất và tinh thần của gia đình nữa." },
      { jp: "地元の住民はもとより、周辺の地域に住む人たちも原子力発電所に不安を感じている。", vn: "Cư dân địa phương đương nhiên là lo lắng rồi, nhưng ngay cả những người sống ở các khu vực lân cận cũng cảm thấy bất an về nhà máy điện hạt nhân." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "この車はデザイン（　　）、性能も素晴らしい。",
        options: ["はもとより", "ばかりに", "だけに", "からして"],
        correctIndex: 0,
        explanation: "Về kiểu dáng là đương nhiên đẹp rồi, ngoài ra tính năng cũng tuyệt vời -> はもとより."
      }
    ]
  },
  {
    id: 31,
    pattern: "〜上に",
    meaning: "Không chỉ... mà còn... / Đã... lại còn...",
    topicId: 6,
    topicName: "Bài 6: 〜だけではなく・それに加えて",
    connection: [
      "V / い形 / な形 / N（普通形） ＋ 上に",
      "※ Lưu ý: な形-な / -である; N-の / -である"
    ],
    nuance: "Diễn tả sự xếp chồng/mở rộng: Thêm một trạng thái, tính chất hoặc sự việc nữa vào trạng thái đã có trước đó. Thường diễn tả việc 'đã tốt lại còn tốt hơn' (cộng thêm điểm tích cực) hoặc 'đã xấu lại còn xấu hơn' (họa vô đơn chí, cộng thêm điểm tiêu cực).",
    ruleConstraints: [
      "[Đồng nhất đánh giá]: Hai vế trước và sau 「〜上に」 phải CÙNG MỘT HƯỚNG ĐÁNH GIÁ (cùng là điểm tốt/tích cực hoặc cùng là điểm xấu/tiêu cực). Không kết hợp một vế tốt và một vế xấu.",
      "[Hạn chế vế sau]: Không dùng câu mang tính tác động, kêu gọi hay ý chí ở vế sau."
    ],
    examples: [
      { jp: "田中さんには仕事を手伝ってもらった上に、仕事の後、ごちそうになった。", vn: "Anh Tanaka không chỉ phụ giúp tôi công việc mà sau khi xong việc tôi còn được anh ấy khao ăn nữa." },
      { jp: "森田先生は、毎日医師として忙しく仕事をしている上、週末も学会や講演で飛び回っている。", vn: "Bác sĩ Morita không chỉ bận rộn công việc bác sĩ hàng ngày mà cuối tuần còn tất bật với các hội thảo và bài phát biểu." },
      { jp: "このテキストは用語が難しい上に、内容も良くない。", vn: "Cuốn giáo trình này không chỉ thuật ngữ khó mà nội dung cũng không hay." },
      { jp: "ここは空気がきれいな上、近くに明るいところがないので星がよく見える。", vn: "Ở đây không khí trong lành, lại thêm gần đây không có chỗ sáng nên ngắm sao rất rõ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "この店は料理がおいしい（　　）、値段も安くてサービスもいい。",
        options: ["上に", "ばかりに", "だけに", "反面"],
        correctIndex: 0,
        explanation: "Đã ngon lại còn rẻ và phục vụ tốt (cùng hướng tích cực) -> 上に."
      }
    ]
  },

  // ========== BÀI 7 (32〜36) ==========
  {
    id: 32,
    pattern: "〜に関して",
    meaning: "Về... / Liên quan đến...",
    topicId: 7,
    topicName: "Bài 7: 〜について・〜を相手にして",
    connection: [
      "N ＋ に関して / に関しては / に関しても",
      "N ＋ に関する ＋ N"
    ],
    nuance: "Dùng khi trình bày, tìm hiểu, điều tra hoặc phát biểu về một chủ đề, nội dung nào đó. Mang tính chất trang trọng, lịch sự (硬い言い方). Thường dùng khi đề cập đến các chủ đề lớn, mang tính khái quát hoặc nghiên cứu/thông tin.",
    ruleConstraints: [
      "[Cấu trúc tương đương]: Tương tự như 〜について (Về...), nhưng 〜に関して mang sắc thái trang trọng hơn và phạm vi bao quát rộng hơn.",
      "[Động từ vế sau]: Thường đi kèm với các động từ thu thập/truyền đạt thông tin như 調べる, 発表する, 調査する, アンケート..."
    ],
    examples: [
      { jp: "午前の条件に関して何か詳しいことがわかりましたか。", vn: "Về các điều kiện buổi sáng, bạn đã biết thêm chi tiết gì chưa?" },
      { jp: "ごみ処理の問題に関しましては、環境省の発表をご確認ください。", vn: "Về vấn đề xử lý rác thải, xin vui lòng kiểm tra thông báo của Bộ Môi trường." },
      { jp: "警察では、事件の損害に関し、新しい調査を開始した。", vn: "Cảnh sát đã bắt đầu cuộc điều tra mới liên quan đến thiệt hại của vụ án." },
      { jp: "霊長類の研究に関するアンケートにご協力ください。", vn: "Xin vui lòng hợp tác làm bảng khảo sát liên quan đến nghiên cứu động vật linh trưởng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "環境問題（　　）本を何冊か読んだ。",
        options: ["に関する", "に沿った", "をもとにした", "にこたえた"],
        correctIndex: 0,
        explanation: "Sách liên quan đến vấn đề môi trường -> N + に関する + N."
      }
    ]
  },
  {
    id: 33,
    pattern: "〜をめぐって",
    meaning: "Xoay quanh (vấn đề/tranh cãi)...",
    topicId: 7,
    topicName: "Bài 7: 〜について・〜を相手にして",
    connection: [
      "N ＋ をめぐって / をめぐり",
      "N ＋ をめぐる ＋ N"
    ],
    nuance: "Dùng khi nói về việc có nhiều ý kiến, sự tranh luận, đối lập, đồn đoán hoặc hành động của NHIỀU NGƯỜI xoay quanh một chủ đề/vấn đề chung (như tài sản, kế hoạch, tin đồn...).",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Phải là các động từ/danh từ thể hiện sự tranh cãi, bàn tán, đối lập của số đông (như 議論する, 対立する, 争う, うわさ...).",
      "[Chủ ngữ]: Chủ ngữ thực hiện hành động ở vế sau thường là tập thể, nhiều người."
    ],
    examples: [
      { jp: "親の遺産をめぐって兄弟が争っている。", vn: "Anh em đang tranh chấp xoay quanh tài sản thừa kế của bố mẹ." },
      { jp: "再開発の計画をめぐり、両者は大きく対立した。", vn: "Xoay quanh kế hoạch tái phát triển, hai bên đã đối lập gay gắt." },
      { jp: "彼女の行動をめぐるうわさはたちまち広まった。", vn: "Lời đồn xoay quanh hành động của cô ấy đã nhanh chóng lan rộng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "消費税の増税（　　）、国会で激しい議論が行われた。",
        options: ["をめぐって", "にかけては", "に対して", "にこたえて"],
        correctIndex: 0,
        explanation: "Nhiều người tranh luận xoay quanh việc tăng thuế -> N + をめぐって."
      }
    ]
  },
  {
    id: 34,
    pattern: "〜にかけては",
    meaning: "Nếu nói về... (thì là giỏi nhất/không thua ai)",
    topicId: 7,
    topicName: "Bài 7: 〜について・〜を相手にして",
    connection: [
      "N ＋ にかけては"
    ],
    nuance: "Dùng để đánh giá cao một kỹ năng, năng lực, phẩm chất hay kỹ thuật trong một lĩnh vực cụ thể nào đó. Vế sau luôn mang ý nghĩa khẳng định đối tượng đó là xuất sắc nhất, giỏi nhất, hoặc không chịu thua bất kỳ ai.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Luôn đi kèm với các cụm từ thể hiện sự khen ngợi, năng lực giỏi vượt trội như 一番だ (nhất), 負けない (không thua), 腕がいい (tay nghề giỏi), 右に出る者はいない (không ai vượt qua)...",
      "[Hạn chế]: Không dùng để chê bai hay nói về điểm yếu, hạn chế."
    ],
    examples: [
      { jp: "あの製品は技術にかけては最高のレベルだ。", vn: "Sản phẩm đó nếu nói về kỹ thuật thì đạt mức độ cao nhất." },
      { jp: "わたしは安い材料でおいしい料理を作ることにかけてはだれにも負けませんよ。", vn: "Nếu nói về việc nấu món ăn ngon từ nguyên liệu rẻ tiền thì tôi không thua bất kỳ ai đâu." },
      { jp: "ボール選びのうまさにかけては田中君の右に出るものはいない。", vn: "Nếu nói về sự tinh tường trong việc chọn bóng thì không ai vượt qua được Tanaka." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "足の速さ（　　）、クラスで彼にかなう者はいない。",
        options: ["にかけては", "をめぐって", "に対して", "にこたえて"],
        correctIndex: 0,
        explanation: "Nếu nói về tốc độ chạy thì không ai bằng anh ấy -> N + にかけては."
      }
    ]
  },
  {
    id: 35,
    pattern: "〜に対して",
    meaning: "Trường hợp A: Đối với... / Hướng về... | Trường hợp B: Trái ngược với... / Trong khi...",
    topicId: 7,
    topicName: "Bài 7: 〜について・〜を相手にして",
    connection: [
      "Trường hợp A (Thái độ/Đối tượng): N ＋ に対して / に対しては / に対しても, N ＋ に対する ＋ N",
      "Trường hợp B (So sánh đối lập): N / V-普通形 / い形 / な形-な（-である） / N-な（-である） ＋ の ＋ に対して"
    ],
    nuance: "• Trường hợp A (Thái độ/Hành vi): Bày tỏ thái độ, hành vi, tình cảm hay tác động trực tiếp hướng tới một người, đoàn thể, vấn đề cụ thể.\n• Trường hợp B (So sánh đối lập): So sánh, đối chiếu hai vế có đặc điểm, tính chất hoặc số liệu hoàn toàn trái ngược nhau.",
    ruleConstraints: [
      "[Ở Trường hợp A]: Vế sau là hành động, thái độ tác động trực tiếp đến đối tượng đi trước 〜に対して.",
      "[Ở Trường hợp B]: Giữa hai vế luôn có sự khác biệt hoặc tương phản rõ rệt về đặc điểm, tính chất hoặc số liệu."
    ],
    examples: [
      { jp: "目上の人に対してそんな乱暴な言い方をしてはいけません。", vn: "Đối với người cấp trên thì không được nói năng thô lỗ như thế. (Trường hợp A)" },
      { jp: "桜井氏の発言は県民に対して失礼だと思う。", vn: "Tôi nghĩ phát ngôn của ông Sakurai là thất lễ đối với người dân trong tỉnh. (Trường hợp A)" },
      { jp: "政府の案に対して住民は大反対した。", vn: "Người dân phản đối gay gắt đối với đề án của chính phủ. (Trường hợp A)" },
      { jp: "やる気がなかった前の会長に対して、新しい会長は素晴らしい行動力がある。", vn: "Trái ngược với vị chủ tịch trước không có động lực, vị chủ tịch mới có năng lực hành động tuyệt vời. (Trường hợp B)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "お客様（　　）失礼な態度をとってはいけません。",
        options: ["に対して", "にかけては", "をめぐって", "にこたえて"],
        correctIndex: 0,
        explanation: "Thái độ hướng tới đối tượng khách hàng -> N + に対して."
      }
    ]
  },
  {
    id: 36,
    pattern: "〜にこたえて",
    meaning: "Đáp lại... / Theo như... (kỳ vọng, yêu cầu)",
    topicId: 7,
    topicName: "Bài 7: 〜について・〜を相手にして",
    connection: [
      "N ＋ にこたえて / にこたえ",
      "N ＋ にこたえる ＋ N"
    ],
    nuance: "Diễn tả việc cố gắng thực hiện một hành động nhằm đáp ứng, đáp lại sự kỳ vọng, mong mỏi, nguyện vọng, tiếng cổ vũ, tràng pháo tay... từ người khác.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Chỉ giới hạn với một số danh từ mang nghĩa kỳ vọng/yêu cầu như 期待 (kỳ vọng), 要望 (nguyện vọng), 希望 (hy vọng), アンコール (yêu cầu diễn lại), 声援 (tiếng cổ vũ)...",
      "[Động từ vế sau]: Vế sau là động từ thể hiện hành động cố gắng đáp ứng mong muốn đó."
    ],
    examples: [
      { jp: "応援してくれる人の気持ちにこたえて立派な試合をしよう。", vn: "Để đáp lại tình cảm của những người cổ vũ, hãy thi đấu một trận thật tuyệt vời." },
      { jp: "その歌手は、会場の人々のアンコールにこたえて再び舞台に出てきた。", vn: "Ca sĩ đó đã quay lại sân khấu để đáp lại lời yêu cầu hát lại của khán giả trong hội trường." },
      { jp: "国民の皆様のご要望にこたえる政治を行いたいと思います。", vn: "Tôi muốn thực hiện một nền chính trị đáp lại nguyện vọng của toàn thể nhân dân." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "ファンの熱い期待（　　）、見事に優勝を果たした。",
        options: ["にこたえて", "に対して", "にかけては", "をめぐって"],
        correctIndex: 0,
        explanation: "Đáp lại sự kỳ vọng nồng nhiệt của người hâm mộ -> N (期待) + にこたえて."
      }
    ]
  }
];
