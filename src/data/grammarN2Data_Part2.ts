import { GrammarN2Item } from "./grammarN2Data";

export const GRAMMAR_N2_PART2: GrammarN2Item[] = [
  // ========== BÀI 8 (37〜41) ==========
  {
    id: 37,
    pattern: "〜をもとに（して）",
    meaning: "Dựa trên... / Từ... (sự thật, trải nghiệm, ý tưởng để sáng tạo)",
    topicId: 8,
    topicName: "Bài 8: 〜を基準にして",
    connection: [
      "N ＋ をもとに（して）",
      "N ＋ をもとにした ＋ N"
    ],
    nuance: "Dùng khi lấy một sự thật, trải nghiệm, ý tưởng hay nền tảng làm cơ sở để sáng tạo hoặc tạo ra một cái mới (như viết tiểu thuyết, thiết kế, phát minh...). Không dùng cho các nguyên liệu vật chất thực tế (như làm bánh từ bột mì).",
    ruleConstraints: [
      "[Lưu ý quan trọng]: KHÔNG dùng cho nguyên liệu vật chất thực tế (bột mì, gỗ, sắt...).",
      "[Động từ đi kèm]: Thường đi kèm với các động từ mang ý nghĩa tạo ra/sáng tác cái mới như 作る, デザインする, 考え出す, できる..."
    ],
    examples: [
      { jp: "この小説は作者自身の個人的な体験をもとに書かれたものだそうだ。", vn: "Nghe nói cuốn tiểu thuyết này được viết dựa trên trải nghiệm cá nhân của chính tác giả." },
      { jp: "このシャツのマーク、面白いでしょう。「花」という漢字をもとにして作ったんだそうです。", vn: "Họa tiết trên chiếc áo sơ mi này thú vị nhỉ? Nghe nói được tạo ra dựa trên chữ Hán 'Hoa' đấy." },
      { jp: "あの飛行機事故をもとにした映画はこれだけじゃない。ほかにもある。", vn: "Bộ phim dựa trên vụ tai nạn máy bay đó không chỉ có bộ phim này. Vẫn còn những bộ khác nữa." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "史実（　　）映画が製作された。",
        options: ["をもとにした", "に沿った", "に基づいて", "をめぐって"],
        correctIndex: 0,
        explanation: "Bộ phim được sáng tác dựa trên sự thật lịch sử -> N + をもとにした + N."
      }
    ]
  },
  {
    id: 38,
    pattern: "〜に基づいて",
    meaning: "Dựa trên... / Căn cứ vào... (tiêu chuẩn, dữ liệu, pháp luật, kế hoạch)",
    topicId: 8,
    topicName: "Bài 8: 〜を基準にして",
    connection: [
      "N ＋ に基づいて / に基づき",
      "N ＋ に基づく / に基づいた ＋ N"
    ],
    nuance: "Dùng khi thực hiện một hành động dựa trên tiêu chuẩn, căn cứ, nguyên tắc hoặc dữ liệu chính xác (như luật pháp, số liệu, kế hoạch, phương châm, kết quả điều tra...).",
    ruleConstraints: [
      "[Danh từ đi trước]: Là các từ chỉ tiêu chuẩn, căn cứ thực tế: 法 (luật pháp), データ (dữ liệu), 計画 (kế hoạch), 方針 (phương châm), 調査結果 (kết quả điều tra)...",
      "[Vế sau]: Động từ chỉ hành động được thực hiện dựa trên căn cứ đó."
    ],
    examples: [
      { jp: "最新のデータに基づいて売り上げ計画を立てたいと思います。", vn: "Tôi muốn lập kế hoạch doanh thu dựa trên dữ liệu mới nhất." },
      { jp: "国の建築計画に基づいてあちこちに新しい道路ができ上がっていく。", vn: "Dựa trên kế hoạch xây dựng của nhà nước, nhiều con đường mới đang dần được hoàn thành ở khắp nơi." },
      { jp: "このジムでは、科学的な実験結果に基づいた筋肉トレーニングを行っている。", vn: "Ở phòng tập gym này, người ta tiến hành huấn luyện cơ bắp dựa trên kết quả thực nghiệm khoa học." },
      { jp: "今日の哲学説明会では、実験の論理に基づいた話を聞くことができた。", vn: "Tại buổi diễn thuyết triết học hôm nay, tôi đã được nghe câu chuyện dựa trên lý thuyết thực nghiệm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "法律（　　）、公平に裁判を行う。",
        options: ["に基づいて", "をもとにして", "に沿って", "のもとで"],
        correctIndex: 0,
        explanation: "Căn cứ theo pháp luật chính thức -> N (法律) + に基づいて."
      }
    ]
  },
  {
    id: 39,
    pattern: "〜に沿って",
    meaning: "Theo... / Tuân theo... / Bám sát...",
    topicId: 8,
    topicName: "Bài 8: 〜を基準にして",
    connection: [
      "N ＋ に沿って / に沿い",
      "N ＋ に沿う / に沿った ＋ N"
    ],
    nuance: "Diễn tả việc thực hiện hành động sao cho phù hợp, không lệch khỏi một phương châm, quy tắc, hướng dẫn, kịch bản, nguyện vọng hay tuyến đường/dòng chảy đã định sẵn.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Chỉ các từ mang nghĩa quy tắc, phương châm, hướng dẫn, nguyện vọng như ルール (quy tắc), 方針 (phương châm), マニュアル (sách hướng dẫn), 期待 (kỳ vọng), 意向 (ý đồ)...",
      "[Vế sau]: Là hành động diễn ra liên tục, bám sát theo tiến trình/dòng chảy đó."
    ],
    examples: [
      { jp: "今、線の基本方針に沿って今年度の予算案を作っている。", vn: "Hiện tại, chúng tôi đang lập bản dự thảo ngân sách năm nay theo đúng phương châm cơ bản." },
      { jp: "与えられたテーマに沿ってレポートを進めてください。", vn: "Hãy làm bài báo cáo bám sát theo chủ đề được giao." },
      { jp: "皆さんのご期待に沿った選択ができるように頑張ります。", vn: "Tôi sẽ cố gắng để có thể đưa ra lựa chọn đáp ứng/tuân theo đúng sự kỳ vọng của mọi người." },
      { jp: "建築家は注文する人の意向に沿う設計をしてほしい。", vn: "Kiến trúc sư nên thiết kế theo đúng ý đồ của người đặt hàng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "マニュアル（　　）、機械を操作してください。",
        options: ["に沿って", "をもとにして", "のもとで", "をめぐって"],
        correctIndex: 0,
        explanation: "Làm theo đúng sách hướng dẫn -> N + に沿って."
      }
    ]
  },
  {
    id: 40,
    pattern: "〜のもとで・〜のもとに",
    meaning: "Dưới... / Dưới sự (ảnh hưởng, hướng dẫn, điều kiện)...",
    topicId: 8,
    topicName: "Bài 8: 〜を基準にして",
    connection: [
      "N ＋ のもとで / のもとに"
    ],
    nuance: "• 〜のもとで: Thường đi với danh từ chỉ người (thầy cô, bố mẹ, HLV...) mang ý nghĩa 'dưới sự ảnh hưởng, bảo bọc, hướng dẫn của ai đó'. Vế sau là hành động/sự việc (học tập, sinh sống, rèn luyện...).\n• 〜のもとに: Thường đi với danh từ chỉ điều kiện, trạng thái, nguyên tắc (sự quản lý, sự hiểu biết, điều kiện nhiệt độ/áp suất...). Vế sau là hành động/trạng thái.",
    ruleConstraints: [
      "[〜のもとで]: Chủ yếu đi với người (先生, 両親, 監督...), vế sau chỉ hành động học tập, sinh sống (育つ, 暮らす, 勉強する...).",
      "[〜のもとに]: Chủ yếu đi với danh từ trạng thái/điều kiện (管理, 了解, 名, 条件...), vế sau chỉ trạng thái hoặc hành động được thực hiện dưới điều kiện đó."
    ],
    examples: [
      { jp: "チームは今、新しい監督のもとで練習に励んでいる。", vn: "Đội bóng hiện đang nỗ lực tập luyện dưới sự dẫn dắt của vị huấn luyện viên mới." },
      { jp: "わたしは生まれてからずっと、優しい祖母のもとで幸せに暮らしてきました。", vn: "Tôi từ khi sinh ra đến nay vẫn luôn sống hạnh phúc dưới sự yêu thương của người bà dịu dàng." },
      { jp: "この研究所では、一定の温度と湿度のもとで育てられた植物から新しい薬品を作り出した。", vn: "Tại viện nghiên cứu này, người ta đã chế tạo ra loại thuốc mới từ thực vật được trồng dưới điều kiện nhiệt độ và độ ẩm cố định." },
      { jp: "校庭でのキャンプファイヤーは夏の最大イベントで、周辺住民の了解のもとに10年も続いている。", vn: "Lửa trại ở sân trường là sự kiện lớn nhất mùa hè, diễn ra suốt 10 năm dưới sự đồng thuận của cư dân xung quanh." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "厳しい指導員（　　）、研修が行われた。",
        options: ["のもとで", "に基づいて", "をもとにして", "に沿って"],
        correctIndex: 0,
        explanation: "Dưới sự hướng dẫn của chỉ đạo viên (người) -> N + のもとで."
      }
    ]
  },
  {
    id: 41,
    pattern: "〜向けだ",
    meaning: "Dành cho... / Hướng tới... (đối tượng cụ thể)",
    topicId: 8,
    topicName: "Bài 8: 〜を基準にして",
    connection: [
      "N ＋ 向けだ / 向けに",
      "N ＋ 向けの ＋ N"
    ],
    nuance: "Diễn tả việc một sản phẩm, dịch vụ, thiết kế, sách báo... được làm ra/sản xuất ra nhằm mục đích phù hợp với một đối tượng người dùng cụ thể.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Chủ yếu là các từ chỉ người/đối tượng cụ thể (高齢者, 子供, 女性, 外国人, 個人, 初心者...).",
      "[Động từ đi kèm]: Thường đi kèm với các động từ như 作る (chế tạo), 設計する (thiết kế), デザインする (thiết kế kiểu dáng), 編集する (biên tập)..."
    ],
    examples: [
      { jp: "このマンションは一人暮らしの高齢者向けに設計されています。", vn: "Tòa chung cư này được thiết kế dành cho người cao tuổi sống một mình." },
      { jp: "これは理科が好きな子供向けに編集された雑誌です。", vn: "Đây là tạp chí được biên tập dành cho trẻ em yêu thích khoa học." },
      { jp: "独身男性向けの料理教室が開かれることになった。", vn: "Lớp học nấu ăn dành cho nam giới độc thân đã được tổ chức." },
      { jp: "この工場で生産されている発電機は個人向けだ。", vn: "Máy phát điện được sản xuất tại nhà máy này là dành cho cá nhân." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "この本は日本語の初心者（　　）書かれている。",
        options: ["向けに", "のもとで", "に沿って", "に基づいて"],
        correctIndex: 0,
        explanation: "Viết dành riêng cho đối tượng người mới bắt đầu -> N + 向けに."
      }
    ]
  },

  // ========== BÀI 9 (42〜46) ==========
  {
    id: 42,
    pattern: "〜につれて・〜にしたがって",
    meaning: "Càng... càng... / Cùng với sự biến đổi của... thì... cũng biến đổi theo",
    topicId: 9,
    topicName: "Bài 9: 〜に関連して・〜に対応して",
    connection: [
      "V（辞書形） ＋ につれて / にしたがって",
      "N（Danh từ chỉ sự biến đổi） ＋ につれて / にしたがって"
    ],
    nuance: "Diễn tả sự biến đổi tỉ lệ thuận hoặc kéo theo: Khi sự việc/trạng thái A tiến triển hoặc thay đổi thì kéo theo sự việc/trạng thái B cũng thay đổi theo.",
    ruleConstraints: [
      "[〜につれて]: Chỉ dùng cho sự biến đổi tỉ lệ thuận theo một chiều (tăng dần/giảm dần). Vế sau diễn tả sự thay đổi diễn ra tự nhiên, KHÔNG dùng với câu biểu thị hành động ý chí hay mệnh lệnh của người nói.",
      "[〜にしたがって]: Dùng được cả cho sự biến đổi một chiều hoặc các biến đổi phức tạp hơn. Vế sau cũng thường diễn tả sự biến đổi tự nhiên."
    ],
    examples: [
      { jp: "台風の接近につれて、雨や風が強くなってきた。", vn: "Càng tiến gần bão thì mưa và gió càng trở nên mạnh hơn." },
      { jp: "日本に来て日がたつにつれ、会話が上達してきた。", vn: "Càng ở Nhật nhiều ngày thì khả năng hội thoại của tôi càng tiến bộ." },
      { jp: "車のスピードが上がるにしたがって、事故の危険性も高くなる。", vn: "Tốc độ xe ô tô càng tăng lên thì nguy cơ tai nạn cũng càng cao." },
      { jp: "息子は成長するにしたがって、口数が少なくなった。", vn: "Con trai tôi càng trưởng thành thì càng ít nói đi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "山を登る（　　）、気温が下がってきた。",
        options: ["につれて", "次第で", "につけて", "のもとで"],
        correctIndex: 0,
        explanation: "Càng leo lên núi cao thì nhiệt độ càng giảm dần (tỉ lệ thuận) -> V-辞書形 + につれて."
      }
    ]
  },
  {
    id: 43,
    pattern: "〜に伴って・〜とともに",
    meaning: "Cùng với... / Đồng thời với... thì... cũng thay đổi",
    topicId: 9,
    topicName: "Bài 9: 〜に関連して・〜に対応して",
    connection: [
      "V（辞書形） ＋ に伴って / とともに",
      "N（Danh từ chỉ sự biến đổi） ＋ に伴って / とともに",
      "Dạng bổ nghĩa cho N: N ＋ に伴う ＋ N"
    ],
    nuance: "Diễn tả hai sự việc/sự thay đổi diễn ra đồng thời: Khi sự thay đổi A xảy ra thì đồng thời kéo theo sự thay đổi hoặc kết quả B. Thường dùng khi nhìn nhận tổng thể cả quá trình biến đổi thay vì nhấn mạnh nhịp độ tỉ lệ thuận từng bước.",
    ruleConstraints: [
      "[〜とともに]: Thường đi kèm với sự biến đổi theo một chiều hướng.",
      "[〜に伴って]: Dùng được cho sự biến đổi không nhất thiết phải theo một chiều hướng cố định."
    ],
    examples: [
      { jp: "入学する留学生数の変化に伴って、クラス数を変える必要がある。", vn: "Cùng với sự thay đổi về số lượng du học sinh nhập học, cần phải thay đổi số lượng lớp học." },
      { jp: "メールが普及するに伴い、コミュニケーションの方法も変わってきた。", vn: "Cùng với việc email trở nên phổ biến, phương thức giao tiếp cũng đã thay đổi theo." },
      { jp: "視力の低下に伴うさまざまな変化を観察したいと思っている。", vn: "Tôi muốn quan sát nhiều sự thay đổi đi kèm với sự suy giảm thị lực." },
      { jp: "ペットボトル飲料の売れ行きが伸びるとともに、リサイクルも真剣に考えられるようになった。", vn: "Cùng với lượng bán nước đóng chai tăng thì việc tái chế cũng được suy nghĩ nghiêm túc hơn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "人口の増加（　　）、ゴミの量も増えている。",
        options: ["に伴って", "につけて", "次第で", "をはじめ"],
        correctIndex: 0,
        explanation: "Cùng với sự gia tăng dân số thì lượng rác cũng tăng -> N + に伴って."
      }
    ]
  },
  {
    id: 44,
    pattern: "〜次第だ・〜次第で（は）",
    meaning: "Tùy thuộc vào... / Tùy vào... mà (thay đổi/được quyết định)",
    topicId: 9,
    topicName: "Bài 9: 〜に関連して・〜に対応して",
    connection: [
      "N（Danh từ có sự đa dạng/phạm vi biến đổi） ＋ 次第だ / 次第で / 次第では"
    ],
    nuance: "Diễn tả ý nghĩa: Kết quả, sự việc hay trạng thái ở vế sau sẽ thay đổi, biến chuyển hoặc được quyết định tùy thuộc vào yếu tố/điều kiện ở vế trước.",
    ruleConstraints: [
      "[Lưu ý dạng 〜次第では]: Vế sau thường đưa ra một trường hợp/khả năng cụ thể có thể xảy ra (như bị từ chối, thất bại...).",
      "[Phân biệt với Bài 3]: V-ます ＋ 次第 ở Bài 3 nghĩa là 'Ngay sau khi...', còn N ＋ 次第 ở Bài 9 nghĩa là 'Tùy thuộc vào...'."
    ],
    examples: [
      { jp: "人生が楽しいかどうかは考え方次第だ。", vn: "Cuộc đời có vui vẻ hay không là tùy thuộc vào cách suy nghĩ." },
      { jp: "この夏のトレーニング次第で秋の試合に勝てるかどうかが決まる。", vn: "Tùy thuộc vào việc luyện tập mùa hè này mà trận đấu mùa thu có thắng được hay không sẽ được quyết định." },
      { jp: "レストランは、雰囲気次第でお客が増えたり減ったりするのです。", vn: "Nhà hàng thì tùy thuộc vào bầu không khí mà lượng khách sẽ tăng lên hay giảm đi." },
      { jp: "あなたの言い方次第では、この話、断られるかもしれませんよ。", vn: "Tùy thuộc vào cách nói của bạn, câu chuyện này có thể sẽ bị từ chối đấy." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "合格できるかどうかは、本人の努力（　　）だ。",
        options: ["次第", "最中", "一方", "つつ"],
        correctIndex: 0,
        explanation: "Có đỗ hay không là tùy thuộc vào sự nỗ lực của bản thân -> N + 次第だ."
      }
    ]
  },
  {
    id: 45,
    pattern: "〜に応じて",
    meaning: "Ứng với... / Tương ứng với... / Phù hợp với...",
    topicId: 9,
    topicName: "Bài 9: 〜に関連して・〜に対応して",
    connection: [
      "N ＋ に応じて / に応じ",
      "N ＋ に応じた ＋ N"
    ],
    nuance: "Diễn tả việc điều chỉnh hành động, tình trạng vế sau sao cho thay đổi tương ứng, phù hợp với sự thay đổi, mức độ hay tình hình của danh từ ở vế trước.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Thường là những từ biểu thị sự biến động hoặc có nhiều mức độ như ngân sách (予算), độ tuổi (年齢), thể lực (体力), thu nhập (収入)..."
    ],
    examples: [
      { jp: "ご予算に応じてパーティーのメニューを決めます。", vn: "Chúng tôi sẽ quyết định thực đơn bữa tiệc tương ứng với ngân sách của quý khách." },
      { jp: "お子さんの年齢に応じて本を選んであげてください。", vn: "Hãy chọn sách cho trẻ tương ứng với độ tuổi của bé." },
      { jp: "収入に応じて取られる税金の額が変わる。", vn: "Số tiền thuế bị thu sẽ thay đổi tương ứng với thu nhập." },
      { jp: "無理をしないで体力に応じた運動をしましょう。", vn: "Đừng quá sức, hãy vận động sao cho tương ứng với thể lực của mình." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "レベル（　　）クラスを分けます。",
        options: ["に応じて", "につけて", "につれて", "に伴って"],
        correctIndex: 0,
        explanation: "Phân chia lớp học tương ứng với trình độ -> N + に応じて."
      }
    ]
  },
  {
    id: 46,
    pattern: "〜につけて",
    meaning: "Mỗi lần... / Cứ mỗi khi... thì luôn có cảm xúc...",
    topicId: 9,
    topicName: "Bài 9: 〜に関連して・〜に対応して",
    connection: [
      "V（辞書形） ＋ につけて",
      "Quán ngữ: 何かにつけて (Mỗi khi có chuyện gì / Bất cứ lúc nào)"
    ],
    nuance: "Diễn tả ý nghĩa: Cứ mỗi khi làm một hành động nào đó (nghe, nhìn, đọc...) thì lập tức trong lòng trào dâng một cảm xúc, suy nghĩ hay tâm trạng nhất định ở vế sau.",
    ruleConstraints: [
      "[Vế sau]: Luôn là câu biểu thị cảm xúc, tâm trạng (như lo lắng, hy vọng, tự kiểm điểm...).",
      "[Cụm từ cố định]: Riêng cụm 何かにつけて mang nghĩa 'mỗi khi có việc xảy ra / bất kể dịp gì', vế sau không bắt buộc phải là câu chỉ cảm xúc."
    ],
    examples: [
      { jp: "この歌を聞くにつけて、心に希望がわいてくる。", vn: "Mỗi lần nghe bài hát này, trong lòng tôi lại trào dâng hy vọng." },
      { jp: "彼女のうわさを聞くにつけて、心配になる。", vn: "Mỗi lần nghe tin đồn về cô ấy, tôi lại thấy lo lắng." },
      { jp: "この作家の本を読むにつけ、今の自分を反省しています。", vn: "Mỗi khi đọc sách của tác giả này, tôi lại tự kiểm điểm bản thân hiện tại." },
      { jp: "父は何かにつけて、若いころ外国で過ごした思い出を語る。", vn: "Bố tôi mỗi khi có dịp lại kể về những kỷ niệm sống ở nước ngoài thời trẻ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "写真を見る（　　）、楽しかった学生時代を思い出す。",
        options: ["につけて", "につれて", "次第で", "に伴って"],
        correctIndex: 0,
        explanation: "Mỗi lần nhìn ảnh lại nhớ về thời học sinh -> V-辞書形 + につけて."
      }
    ]
  },

  // ========== BÀI 10 (47〜50) ==========
  {
    id: 47,
    pattern: "〜やら〜やら",
    meaning: "Nào là... nào là... / Vừa... vừa...",
    topicId: 10,
    topicName: "Bài 10: 〜や〜など",
    connection: [
      "N / V（辞書形）/ い形 / な形 ＋ やら ＋ N / V（辞書形）/ い形 / な形 ＋ やら"
    ],
    nuance: "Dùng khi đưa ra nhiều ví dụ (thuộc cùng một nhóm) để diễn tả tình trạng hỗn độn, nhiều thứ xảy ra cùng lúc mà không thể sắp xếp trật tự. Thường thể hiện cảm xúc vất vả, ngạc nhiên, rối bời hoặc tâm trạng phức tạp của người nói trước nhiều sự việc.",
    ruleConstraints: [
      "[Sắc thái biểu đạt]: Nhấn mạnh sự hỗn loạn, chưa thể chốt lại hoặc tâm trạng rối bời, phức tạp của người nói trước nhiều sự việc diễn ra dồn dập."
    ],
    examples: [
      { jp: "勝ったチームの選手たちは、泣き出すやら飛び上がるやらさまざまな喜びを表した。", vn: "Cầu thủ của đội chiến thắng đã biểu lộ đủ loại niềm vui, nào là khóc òa ra, nào là nhảy hẫng lên." },
      { jp: "だまされたとわかったときは腹が立つやら情けないやらで、気持ちを抑えることができなかった。", vn: "Khi biết mình bị lừa, tôi vừa tức giận vừa cảm thấy tức tưởi cay đắng, không sao kìm nén được cảm xúc." },
      { jp: "娘の結婚式の日は、うれしいやら寂しいやら複雑な気持ちだった。", vn: "Vào ngày cưới của con gái, tâm trạng tôi rất phức tạp, vừa vui mừng lại vừa cảm thấy cô đơn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "引っ越しで荷物の整理（　　）手続き（　　）で大忙しだ。",
        options: ["やら／やら", "というか／というか", "にしても／にしても", "なり／なり"],
        correctIndex: 0,
        explanation: "Nào là dọn đồ đạc, nào là làm thủ tục bận rộn -> やら／やら."
      }
    ]
  },
  {
    id: 48,
    pattern: "〜というか〜というか",
    meaning: "Có thể nói là... mà cũng có thể nói là... / Vừa có vẻ... lại vừa có vẻ...",
    topicId: 10,
    topicName: "Bài 10: 〜や〜など",
    connection: [
      "普通形（な形・N bỏ だ） ＋ というか ＋ 普通形（な形・N bỏ だ） ＋ というか"
    ],
    nuance: "Dùng khi đưa ra hai góc nhìn/cách diễn đạt khác nhau cho cùng một tình huống vì người nói chưa thể khẳng định chính xác cách mô tả nào là chuẩn nhất.",
    ruleConstraints: [
      "[Mục đích sử dụng]: Dùng hai biểu hiện song song để giải thích, diễn tả cho một trạng thái chưa rõ ràng, khó gọi tên chính xác."
    ],
    examples: [
      { jp: "あの子は元気があるというか落ち着きがないというか、とにかくじっとしていない子です。", vn: "Đứa trẻ đó có thể nói là hiếu động mà cũng có thể nói là không điềm tĩnh, tóm lại là một đứa trẻ không chịu ngồi yên." },
      { jp: "この部屋は、仕事場というか物置というか、とにかく仕事に必要な物が全部置いてあるんです。", vn: "Căn phòng này có thể nói là nơi làm việc mà cũng có thể nói là kho chứa đồ, tóm lại là toàn bộ những đồ dùng cần thiết cho công việc đều được đặt ở đây." },
      { jp: "今のわたしの気持ちですか。そうですねえ。退職してほっとしたというか寂しいというか、複雑です。", vn: "Cảm xúc bây giờ của tôi ư? Để xem nào. Nghỉ hưu xong thấy nhẹ nhõm mà cũng thấy bùi ngùi, thật phức tạp." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼の態度は勇気がある（　　）無謀（　　）、判断に迷う。",
        options: ["というか／というか", "やら／やら", "にしても／にしても", "を問わず／を問わず"],
        correctIndex: 0,
        explanation: "Có thể gọi là dũng cảm mà cũng có thể gọi là liều lĩnh -> というか〜というか."
      }
    ]
  },
  {
    id: 49,
    pattern: "〜にしても〜にしても・〜にしろ〜にしろ・〜にせよ〜にせよ",
    meaning: "Cho dù là... hay là... / Dù... hay... thì đều...",
    topicId: 10,
    topicName: "Bài 10: 〜や〜など",
    connection: [
      "N / V（辞書形 / ない形） ＋ にしても〜にしても / にしろ〜にしろ / にせよ〜にせよ"
    ],
    nuance: "Nêu ra các ví dụ tiêu biểu (thuộc cùng nhóm hoặc mang tính đối lập) để nhấn mạnh rằng cho dù trường hợp nào xảy ra thì phán đoán, kết luận hay thái độ ở vế sau vẫn đúng và không thay đổi.",
    ruleConstraints: [
      "[Sắc thái văn phong]: 「〜にせよ〜にせよ」 mang sắc thái văn viết và trang trọng nhất (硬い言い方).",
      "[Vế sau]: Luôn là nhận định, phán đoán chung mang tính bao quát cho cả hai trường hợp."
    ],
    examples: [
      { jp: "野菜にしても魚にしても、料理の材料は新鮮さが第一です。", vn: "Cho dù là rau hay là cá thì nguyên liệu nấu ăn tươi ngon vẫn là quan trọng nhất." },
      { jp: "勉強をするにしても仕事をするにしても、計画を立ててからやったほうがいい。", vn: "Dù là học tập hay làm việc thì cũng nên lập kế hoạch rồi mới thực hiện." },
      { jp: "テレビにしろ新聞にしろ、ニュースには主観が入ってはいけない。", vn: "Dù là truyền hình hay báo chí thì tin tức không được phép chứa đựng ý kiến chủ quan." },
      { jp: "入院するにしろ通院するにしろ、かなりのお金がかかるかもしれない。", vn: "Dù là nhập viện điều trị hay điều trị ngoại trú thì có thể cũng sẽ tốn khá nhiều tiền." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "賛成（　　）反対（　　）、理由をはっきり言ってください。",
        options: ["にせよ／にせよ", "やら／やら", "というか／というか", "をめぐって／をめぐって"],
        correctIndex: 0,
        explanation: "Dù tán thành hay phản đối thì đều phải nói rõ lý do -> にせよ〜にせよ."
      }
    ]
  },
  {
    id: 50,
    pattern: "〜といった",
    meaning: "Những thứ như là... / Ví dụ như...",
    topicId: 10,
    topicName: "Bài 10: 〜や〜など",
    connection: [
      "N1, N2... ＋ といった ＋ N3 (Danh từ tổng quát)"
    ],
    nuance: "Dùng khi đưa ra các ví dụ cụ thể đứng trước để tóm tắt, giải thích cho danh từ bao quát đứng ở phía sau.",
    ruleConstraints: [
      "[Từ đi kèm]: Thường đi kèm với 「や」, 「とか」 ở vế liệt kê phía trước để đưa ra từ 2-3 ví dụ tiêu biểu."
    ],
    examples: [
      { jp: "わたしはケーキ、ポテトチップス、ハンバーガーといったカロリーの高いものが大好きなのです。", vn: "Tôi rất thích những đồ ăn chứa lượng calo cao ví dụ như bánh ngọt, khoai tây chiên, hamburger." },
      { jp: "にんじんやピーマンやかぼちゃといった色の濃い野菜は緑黄色野菜といって、体にとてもいいんですよ。", vn: "Những loại rau có màu đậm như cà rốt, ớt ngọt, bí đỏ được gọi là rau xanh vàng, rất tốt cho cơ thể đấy." },
      { jp: "京都とか奈良といった古い街には寺が多い。", vn: "Những thành phố cổ ví dụ như Kyoto hay Nara thì có rất nhiều chùa chiền." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "サッカーや野球（　　）スポーツが盛んだ。",
        options: ["といった", "に際して", "からして", "に限り"],
        correctIndex: 0,
        explanation: "Những môn thể thao như là bóng đá, bóng chày -> N1 や N2 + といった + N3."
      }
    ]
  },

  // ========== BÀI 11 (51〜55) ==========
  {
    id: 51,
    pattern: "〜を問わず",
    meaning: "Bất kể... / Không phân biệt...",
    topicId: 11,
    topicName: "Bài 11: 〜に関係なく・無視して",
    connection: [
      "N ＋ を問わず"
    ],
    nuance: "Diễn tả ý nghĩa: Trạng thái hay hành động ở vế sau không bị chi phối, phân biệt hay điều kiện hóa bởi các yếu tố ở vế trước (như tuổi tác, giới tính, thời gian, kinh nghiệm...).",
    ruleConstraints: [
      "[Danh từ đi kèm]: Thường bao gồm các cặp từ đối lập (男女, 昼夜, 内外) hoặc từ chứa phạm vi phân loại (年齢, 国籍, 経験, 季節...). Văn phong trang trọng (硬い言い方)."
    ],
    examples: [
      { jp: "このドキュメンタリー番組は、年齢・性別を問わず、多くの人に愛されている。", vn: "Chương trình tài liệu này được nhiều người yêu thích bất kể tuổi tác hay giới tính." },
      { jp: "このスポーツクラブは昼夜を問わず利用できる。", vn: "Câu lạc bộ thể thao này có thể sử dụng bất kể ngày hay đêm." },
      { jp: "経験の有無を問わず、意欲のある方を募集します。", vn: "Chúng tôi tuyển dụng những người có nhiệt huyết bất kể có kinh nghiệm hay không." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "国籍（　　）、だれでも応募できます。",
        options: ["を問わず", "もかまわず", "はともかく", "はさておき"],
        correctIndex: 0,
        explanation: "Bất kể quốc tịch nào ai cũng có thể ứng tuyển -> N (国籍) + を問わず."
      }
    ]
  },
  {
    id: 52,
    pattern: "〜にかかわらず・〜にかかわりなく",
    meaning: "Bất kể... / Cho dù... hay không thì...",
    topicId: 11,
    topicName: "Bài 11: 〜に関係なく・無視して",
    connection: [
      "N ＋ にかかわらず",
      "V（辞書形・ない形） ＋ にかかわらず",
      "A-い / A-くない ＋ にかかわらず"
    ],
    nuance: "Diễn tả ý nghĩa: Sự việc, kết quả ở vế sau hoàn toàn không bị ảnh hưởng bởi sự thay đổi của các yếu tố ở vế trước.",
    ruleConstraints: [
      "[Dạng kết hợp]: Thường đi cùng các cặp từ đối lập (行う・行わない, 好き・嫌い, ある・なし) hoặc danh từ có sự biến đổi lớn."
    ],
    examples: [
      { jp: "参加するしないにかかわらず、出席の有無を連絡してください。", vn: "Bất kể có tham gia hay không, xin vui lòng liên lạc cho biết có mặt hay vắng mặt." },
      { jp: "この路線バスは、乗った距離にかかわらず一律200円です。", vn: "Tuyến xe buýt này bất kể khoảng cách đi bao xa thì đồng giá 200 yên." },
      { jp: "理由のいかんに関わらず、遅刻は認められません。", vn: "Bất kể lý do là gì đi nữa, việc đến muộn sẽ không được chấp nhận." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "天候の良し悪し（　　）、試合は決行します。",
        options: ["にかかわらず", "もかまわず", "はさておき", "に限って"],
        correctIndex: 0,
        explanation: "Bất kể thời tiết tốt hay xấu -> N + にかかわらず."
      }
    ]
  },
  {
    id: 53,
    pattern: "〜もかまわず",
    meaning: "Mặc kệ... / Chẳng bận tâm đến... / Bất chấp...",
    topicId: 11,
    topicName: "Bài 11: 〜に関係なく・無視して",
    connection: [
      "N / 普通形（な形-な／-である, N-である）＋ の ＋ もかまわず"
    ],
    nuance: "Diễn tả một người thực hiện hành động mà hoàn toàn không để ý hay bận tâm đến ánh nhìn, sự làm phiền hay tình huống xung quanh (thường là điều đáng lẽ phải chú ý).",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Diễn tả hành động bất ngờ hoặc khiến người khác cảm thấy bất thường/phiền toái. KHÔNG dùng cho hành động mang ý chí hướng tới bản thân người nói."
    ],
    examples: [
      { jp: "彼女は人目もかまわず、泣き続けた。", vn: "Cô ấy cứ khóc liên tục bất chấp ánh nhìn của mọi người xung quanh." },
      { jp: "最近、電車の中で人目をはばからず、髪の手入れをする若者がいる。", vn: "Dạo này có những bạn trẻ thản nhiên trang điểm, làm tóc trên tàu điện bất chấp sự chú ý của người khác." },
      { jp: "服が汚れるのもかまわず、子供たちは泥遊びに夢中になっている。", vn: "Mặc kệ quần áo bị bẩn, đám trẻ vẫn mải mê chơi đùa với bùn đất." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "雨にぬれるの（　　）、彼は走り去った。",
        options: ["もかまわず", "を問わず", "はともかく", "はさておき"],
        correctIndex: 0,
        explanation: "Mặc kệ bị ướt mưa, anh ấy chạy vụt đi -> V-るの + もかまわず."
      }
    ]
  },
  {
    id: 54,
    pattern: "〜はともかく（として）",
    meaning: "Tạm thời chưa bàn đến... / Chưa tính đến...",
    topicId: 11,
    topicName: "Bài 11: 〜に関係なく・無視して",
    connection: [
      "N（＋Trợ từ） ＋ はともかく（として）",
      "普通形現在（な形-な, N-な）＋ の ＋ はともかく（として）"
    ],
    nuance: "Dùng khi muốn tạm gác yếu tố A sang một bên vì yếu tố B ở vế sau mới là điều quan trọng hơn hoặc cần được ưu tiên/nhấn mạnh hơn.",
    ruleConstraints: [
      "[Trọng tâm vế sau]: Vế sau chứa nội dung mà người nói muốn tập trung nhấn mạnh, ưu tiên hơn hẳn so với vế trước."
    ],
    examples: [
      { jp: "この店は、店の雰囲気はともかく、料理の味は最高だ。", vn: "Cửa hàng này chưa bàn đến bầu không khí, vị món ăn thì tuyệt hảo." },
      { jp: "外ではともかく、家の中でたばこを吸うのはやめて。", vn: "Ở bên ngoài thì tạm thời chưa tính đến, nhưng xin đừng hút thuốc ở trong nhà." },
      { jp: "受験するかどうかはともかく、願書だけはもらっておこう。", vn: "Chưa tính đến việc có dự thi hay không, cứ lấy đơn đăng ký về đã." },
      { jp: "アラビア語を習いたい。読むのはともかくとして、簡単な会話はできるようになりたい。", vn: "Tôi muốn học tiếng Ả Rập. Đọc thì tạm thời chưa bàn đến, tôi muốn có thể giao tiếp đơn giản được đã." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "値段（　　）、デザインがとても気に入った。",
        options: ["はともかく", "を問わず", "もかまわず", "に限り"],
        correctIndex: 0,
        explanation: "Giá cả tạm thời chưa bàn đến, kiểu dáng thì tôi cực kỳ thích -> N + はともかく."
      }
    ]
  },
  {
    id: 55,
    pattern: "〜はさておき",
    meaning: "Tạm gác lại... / Hãy gác... sang một bên",
    topicId: 11,
    topicName: "Bài 11: 〜に関係なく・無視して",
    connection: [
      "N（＋Trợ từ） ＋ はさておき"
    ],
    nuance: "Tách một chủ đề A ra khỏi cuộc thảo luận hiện tại để ưu tiên tập trung vào vấn đề chính, cốt lõi hơn ở vế B.",
    ruleConstraints: [
      "[Danh từ đi kèm]: Hay đi kèm với các danh từ chỉ chủ đề phụ như 冗談 (chuyện đùa), 細かいこと (chuyện chi tiết nhỏ)... để hướng sự tập trung vào vấn đề quan trọng hơn."
    ],
    examples: [
      { jp: "飲み会をするなら、細かいことはさておき、まずは場所と時間を決めなくては。", vn: "Nếu tổ chức buổi ăn uống thì gác lại những chuyện nhỏ nhặt sang một bên, trước tiên phải quyết định địa điểm và thời gian đã." },
      { jp: "どんな家がいいかはさておき、どんな地域に引っ越したいかを考えよう。", vn: "Tạm gác việc ngôi nhà thế nào sang một bên, hãy suy nghĩ xem muốn chuyển đến khu vực nào đã." },
      { jp: "冗談はさておき、次回のミーティングのテーマを決めておきたいと思います。", vn: "Tạm gác chuyện đùa sang một bên, tôi muốn quyết định chủ đề cho cuộc họp lần tới." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "冗談（　　）、本題に入りましょう。",
        options: ["はさておき", "を問わず", "もかまわず", "をめぐって"],
        correctIndex: 0,
        explanation: "Gác chuyện đùa sang một bên để vào việc chính -> 冗談 + はさておき."
      }
    ]
  },

  // ========== BÀI 12 (56〜60) ==========
  {
    id: 56,
    pattern: "〜わけがない",
    meaning: "Tuyệt đối không thể nào... / Làm gì có chuyện...",
    topicId: 12,
    topicName: "Bài 12: 強く否定する・強く否定しない",
    connection: [
      "V（普通形）/ い形 / な形-な / N-の（-である） ＋ わけがない"
    ],
    nuance: "Dùng khi người nói khẳng định chắc chắn một sự việc là không thể xảy ra dựa trên căn cứ, lý do rõ ràng.",
    ruleConstraints: [
      "[Sắc thái phán đoán]: Thể hiện phán đoán phủ định mang tính tuyệt đối dựa trên góc nhìn logic, căn cứ rõ ràng của người nói."
    ],
    examples: [
      { jp: "この仕事を今日中に仕上げるなんて、わたし一人でできるわけがありませんよ。", vn: "Hoàn thành công việc này trong ngày hôm nay thì một mình tôi làm sao mà có thể làm được chứ!" },
      { jp: "田中先生の試験がそんなに簡単なわけがない。厳しいことで有名な先生なのだ。", vn: "Bài kiểm tra của thầy Tanaka làm sao mà dễ như thế được. Thầy ấy là người nổi tiếng nghiêm khắc mà." },
      { jp: "この店は第一流のホテルのコックさんが開いたんだ。料理がおいしくないわけがない。", vn: "Cửa hàng này do đầu bếp khách sạn hàng đầu mở đấy. Món ăn làm sao mà không ngon cho được." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "あんなに練習したんだから、負ける（　　）。",
        options: ["わけがない", "ものか", "どころではない", "わけではない"],
        correctIndex: 0,
        explanation: "Luyện tập nhiều đến thế thì tuyệt đối không thể nào thua được -> わけがない."
      }
    ]
  },
  {
    id: 57,
    pattern: "〜どころではない・〜どころか",
    meaning: "どころではない: Không phải lúc... / Không thể nào... | どころか: Thay vì... thì trái lại... / Đừng nói tới... ngay cả...",
    topicId: 12,
    topicName: "Bài 12: 強く否定する・強く否定しない",
    connection: [
      "N / V（普通形）/ い形 / な形-な（-である）/ N-な（-である） ＋ どころではない / どころか"
    ],
    nuance: "• どころではない: Diễn tả trạng thái bận rộn, ồn ào hoặc hoàn cảnh không có dư dả thời gian/tâm trí để làm việc gì đó.\n• どころか: Nhấn mạnh một thực tế hoàn toàn trái ngược hoặc vượt xa mức độ dự đoán ban đầu.",
    ruleConstraints: [
      "[Chênh lệch mức độ]: Mức độ vế sau của 「どころか」 thường chênh lệch rất lớn hoặc hoàn toàn đối lập với dự đoán ở vế trước."
    ],
    examples: [
      { jp: "暑がりなので涼しいかなと思っていたが、涼しいどころではなく、寒かった。", vn: "Vì là người sợ nóng nên tôi nghĩ là sẽ mát mẻ, nhưng đâu chỉ mát mẻ, trái lại còn lạnh nữa." },
      { jp: "ねぶた祭りなのでちょっとは混むだろうと思っていたが、ちょっとどころではなかった。", vn: "Vì là lễ hội Nebuta nên tôi nghĩ chắc sẽ đông một chút, nhưng đâu chỉ đông một chút, thực tế đông nghẹt thở." },
      { jp: "マナーの悪い人をちょっと注意したら、謝るどころか、逆にわたしに怒鳴った。", vn: "Khi tôi nhắc nhở nhẹ người thiếu lịch sự, thay vì xin lỗi thì ngược lại hắn còn quát vào mặt tôi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "貯金する（　　）、借金が増える一方だ。",
        options: ["どころか", "ものか", "わけがない", "わけではない"],
        correctIndex: 0,
        explanation: "Đừng nói tới tiết kiệm, trái lại nợ nần còn tăng lên -> どころか."
      }
    ]
  },
  {
    id: 58,
    pattern: "〜ものか",
    meaning: "Tuyệt đối không... / Làm sao mà... được!",
    topicId: 12,
    topicName: "Bài 12: 強く否定する・強く否定しない",
    connection: [
      "V（普通形）/ い形 / な形-な / N-な ＋ ものか / もんか"
    ],
    nuance: "Thể hiện cảm xúc phủ định cực kỳ mạnh mẽ kèm theo sự bất mãn, bực bội hoặc quyết tâm không làm điều gì đó.",
    ruleConstraints: [
      "[Văn phong giao tiếp]: Trong văn nói thường dùng dạng 「〜もんか」. Nữ giới hay dùng dạng lịch sự hơn là 「〜ものですか / 〜もんですか」."
    ],
    examples: [
      { jp: "山田が時間どおりに来るものか。あいつはいつも遅刻なんだから。", vn: "Làm sao mà Yamada đến đúng giờ cho được! Cái thằng đó lúc nào chả đến muộn." },
      { jp: "駅から歩いて40分。バスもない。こんな不便な所に住めるものか。", vn: "Từ ga đi bộ mất 40 phút, xe buýt cũng không có. Nơi bất tiện thế này làm sao mà sống nổi chứ!" },
      { jp: "あの人が素直なもんか。嘘ばかり言うんだ。", vn: "Người đó làm sao mà thành thật cho được! Toàn nói dối thôi." },
      { jp: "わたしが真面目な人なんですか。コツコツ努力するのは苦手なんですよ。", vn: "Tôi mà là người nghiêm túc ư? Tôi vốn rất dở việc kiên trì nỗ lực từng chút một đấy." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "あんなまずい店、二度と行く（　　）！",
        options: ["ものか", "わけがない", "どころではない", "わけではない"],
        correctIndex: 0,
        explanation: "Quán dở thế kia tuyệt đối không bao giờ thèm đến lần 2 -> V-る + ものか."
      }
    ]
  },
  {
    id: 59,
    pattern: "〜わけではない・〜というわけではない",
    meaning: "Không hẳn là... / Không phải là...",
    topicId: 12,
    topicName: "Bài 12: 強く否定する・強く否定しない",
    connection: [
      "普通形（な形-な／-である, N-の／-な／-である） ＋ わけではない",
      "普通形（な形［だ］, N［だ］） ＋ というわけではない"
    ],
    nuance: "Dùng để phủ định một phần: Phủ định việc 'tất cả' hoặc 'luôn luôn' diễn ra theo một chiều hướng, nhằm làm rõ tình hình thực tế.",
    ruleConstraints: [
      "[Từ hay đi kèm]: Rất hay đi kèm với các phó từ chỉ sự toàn thể/tuyệt đối như 必ずしも (chưa chắc), いつも (luôn luôn), 全て (toàn bộ)... để phủ định một phần."
    ],
    examples: [
      { jp: "携帯電話を持っていれば、いつでも電話に出られるわけではない。", vn: "Không phải cứ mang theo điện thoại di động là lúc nào cũng nghe máy được." },
      { jp: "A「どうしたの？怒っているの？」 B「怒っているわけじゃないけど……あなたの気持ち、このごろよくわからない。」", vn: "A: 'Sao thế? Cậu đang giận à?' - B: 'Không hẳn là tớ giận, nhưng... dạo này tớ thật sự không hiểu suy nghĩ của cậu.'" },
      { jp: "親の気持ちもわからないわけではないが、自分の進路は自分で決めたい。", vn: "Không hẳn là tôi không hiểu tình cảm của cha mẹ, nhưng tôi muốn tự mình quyết định con đường tương lai." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "嫌いな（　　）、今日はお腹がいっぱいなだけです。",
        options: ["わけではなく", "ものか", "どころか", "っこない"],
        correctIndex: 0,
        explanation: "Không hẳn là ghét món này, chỉ là hôm nay no bụng rồi -> わけではない."
      }
    ]
  },
  {
    id: 60,
    pattern: "〜というものではない・〜というものでもない",
    meaning: "Không thể nói là... / Không hẳn cứ... là được",
    topicId: 12,
    topicName: "Bài 12: 強く否定する・強く否定しない",
    connection: [
      "普通形（な形［だ］, N［だ］） ＋ というものではない / というものでもない"
    ],
    nuance: "Đưa ra nhận định mang tính bản chất: Bày tỏ phán đoán cho rằng một điều kiện hay suy nghĩ nào đó không thể giải quyết vấn đề một cách đơn giản hay áp dụng cho mọi trường hợp.",
    ruleConstraints: [
      "[Sắc thái]: Dạng 「〜というものでもない」 mang sắc thái lập luận nhẹ nhàng, mềm mỏng hơn 「〜というものではない」."
    ],
    examples: [
      { jp: "医師の仕事は資格をとればできるというものではない。常に最新の治療法を研究する姿勢がなければいけない。", vn: "Công việc bác sĩ không thể nói là cứ lấy được bằng cấp là làm được. Phải luôn có thái độ nghiên cứu phương pháp điều trị mới nhất." },
      { jp: "自由だからといって、何をしてもいいというものではありません。", vn: "Không thể nói rằng vì tự do nên muốn làm gì thì làm được." },
      { jp: "練習問題は一度やれば終わりだというものではない。間違ったところをよく復習することが大切だ。", vn: "Bài tập luyện tập không phải cứ làm một lần là xong. Điều quan trọng là phải ôn tập lại những chỗ sai." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "お金があれば幸せになれる（　　）。",
        options: ["というものではない", "ものか", "どころではない", "わけがない"],
        correctIndex: 0,
        explanation: "Không thể nói cứ có tiền là sẽ hạnh phúc -> というものではない."
      }
    ]
  },

  // ========== BÀI 13 (61〜65) ==========
  {
    id: 61,
    pattern: "〜とは",
    meaning: "...có nghĩa là... / Khái niệm... là...",
    topicId: 13,
    topicName: "Bài 13: 〜（話題）は",
    connection: [
      "N ＋ とは"
    ],
    nuance: "Dùng khi đưa ra định nghĩa, giải thích bản chất hay ý nghĩa của một từ ngữ, thuật ngữ.",
    ruleConstraints: [
      "[Sắc thái & Kết thúc câu]: Là dạng trang trọng của 「〜というのは」. Vế sau câu thường kết thúc bằng các cụm từ định nghĩa như 〜ということだ, 〜という意味だ, 〜のことだ."
    ],
    examples: [
      { jp: "「起案」とはどういう意味ですか。", vn: "'Khởi án / Dự thảo' có nghĩa là gì?" },
      { jp: "「熟達」とは練習で、技術がもっと高くなることである。", vn: "'Thành thạo' là việc kỹ thuật trở nên cao hơn thông qua luyện tập." },
      { jp: "人生とは本人が主役のドラマみたいなものだ。", vn: "Cuộc đời là một thứ giống như vở drama mà bản thân là nhân vật chính." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "「デジタルトランスフォーメーション」（　　）、ITを活用して生活を変革することだ。",
        options: ["とは", "といえば", "というと", "となると"],
        correctIndex: 0,
        explanation: "Định nghĩa thuật ngữ -> N + とは."
      }
    ]
  },
  {
    id: 62,
    pattern: "〜といえば",
    meaning: "Nhóm A: Nhắc đến... thì nhớ ngay / gợi liên tưởng đến | Nhóm B: Nói là... thì đúng là... (nhưng...)",
    topicId: 13,
    topicName: "Bài 13: 〜（話題）は",
    connection: [
      "N / 普通形 ＋ といえば"
    ],
    nuance: "• Nhóm A: Lấy một từ ngữ vừa xuất hiện trong câu chuyện làm gợi ý để liên tưởng đến một thông tin/chủ đề liên quan.\n• Nhóm B: Tạm thời công nhận thực tế ở vế trước, nhưng vế sau bổ sung khía cạnh khác hoặc sự hạn chế.",
    ruleConstraints: [
      "[Ở nhóm B]: Từ ngữ ở vế trước được lặp lại ở vế sau dạng AといえばAだが... để vừa công nhận vừa bổ sung mặt trái."
    ],
    examples: [
      { jp: "このコーヒー、ハワイのお土産ですか。ハワイといえば、さち子さんが来月ハワイで結婚式をするそうですよ。", vn: "Cà phê này là quà du lịch Hawaii à? Nhắc đến Hawaii, nghe nói tháng sau Sachiko sẽ tổ chức đám cưới ở Hawaii đấy. (Nhóm A)" },
      { jp: "A「航空券の料金が安くなるみたいですね。」 B「そのようですね。安くなるといえば、格安航空のチケットが安く買えそうなんで、来月旅行しようと思っているんです。」", vn: "A: 'Hình như giá vé máy bay đang giảm thì phải.' - B: 'Đúng thế nhỉ. Nói đến giảm giá, vé của hãng hàng không giá rẻ có vẻ mua được rất rẻ nên tháng sau tớ đang định đi du lịch đây.' (Nhóm A)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "日本の春（　　）、やはり桜ですね。",
        options: ["といえば", "とは", "となると", "といったら"],
        correctIndex: 0,
        explanation: "Nhắc đến mùa xuân Nhật Bản thì liên tưởng ngay đến hoa anh đào -> といえば."
      }
    ]
  },
  {
    id: 63,
    pattern: "〜というと・〜といえば・〜といったら",
    meaning: "Nhóm A: Nói đến... thì liên tưởng ngay đến hình ảnh đặc trưng | Nhóm B: Nói như vậy có nghĩa là... đúng không?",
    topicId: 13,
    topicName: "Bài 13: 〜（話題）は",
    connection: [
      "N / 普通形 ＋ というと / といえば / といったら"
    ],
    nuance: "• Nhóm A: Diễn tả việc từ khóa được nhắc đến lập tức gợi lên trong đầu một biểu tượng, hình ảnh đại diện tiêu biểu.\n• Nhóm B: Dùng trong giao tiếp để hỏi lại, xác nhận ý đồ mà đối phương vừa phát ngôn.",
    ruleConstraints: [
      "[Ở nhóm B]: Cực kỳ hay kết hợp với các câu xác nhận như 「〜ということですか」 ở cuối câu."
    ],
    examples: [
      { jp: "これ、うちの畑でとれたトマトです。畑というと広い土地を想像するでしょうが、うちの畑は畳2枚くらいの狭さなんです。", vn: "Đây là cà chua thu hoạch từ ruộng nhà tôi. Nói đến ruộng chắc bạn sẽ tưởng tượng ra mảnh đất rộng lớn, nhưng ruộng nhà tôi hẹp chỉ bằng khoảng 2 chiếu tatami thôi." },
      { jp: "オーストラリアと言えば、すぐにコアラとかカンガルーを思い浮かべる。", vn: "Nói đến nước Úc là lập tức người ta nghĩ ngay đến gấu Koala hay chuột túi Kangaroo." },
      { jp: "くじらといったら、思いつくことは何でしょうか。", vn: "Nói đến cá voi thì điều bạn nghĩ tới ngay là gì?" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "来月から海外転勤ですか。（　　）、家族も一緒に行くのですか。",
        options: ["というと", "とは", "となると", "といったら"],
        correctIndex: 0,
        explanation: "Hỏi lại xác nhận ý đối phương (Nói thế có nghĩa là...) -> というと."
      }
    ]
  },
  {
    id: 64,
    pattern: "〜（の こと）となると",
    meaning: "Hễ cứ nói đến... / Cứ đụng tới... là (thái độ thay đổi ngay)",
    topicId: 13,
    topicName: "Bài 13: 〜（話題）は",
    connection: [
      "N（＋の こと） ＋ となると"
    ],
    nuance: "Diễn tả sự thay đổi thái độ, cảm xúc khác thường của một người mỗi khi chạm tới một chủ đề, lĩnh vực hay sở thích cụ thể nào đó.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau luôn là câu miêu tả thái độ hăng hái, bộc phát hoặc biến chuyển khác hẳn bình thường."
    ],
    examples: [
      { jp: "佐藤さんは、好きな歌手のこととなると話が止まらない。", vn: "Anh Sato hễ cứ nói đến ca sĩ yêu thích là nói không ngừng nghỉ." },
      { jp: "弟は、車のこととなると急に専門家みたいになる。", vn: "Em trai tôi cứ đụng tới chuyện xe hơi là bỗng nhiên biến thành như chuyên gia." },
      { jp: "酒好きだった父は、酒となると人が変わったように元気になった。", vn: "Người bố vốn thích rượu của tôi cứ thấy rượu là khỏe khoắn hẳn lên như biến thành người khác." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "彼はアニメのこと（　　）、目の色が変わる。",
        options: ["となると", "とは", "といえば", "といったら"],
        correctIndex: 0,
        explanation: "Cứ đụng đến chủ đề anime là mắt sáng lên hào hứng -> Nのこと + となると."
      }
    ]
  },
  {
    id: 65,
    pattern: "〜といったら",
    meaning: "Nói về mức độ của... thì (không thể nào diễn tả nổi)",
    topicId: 13,
    topicName: "Bài 13: 〜（話題）は",
    connection: [
      "N ＋ といったら"
    ],
    nuance: "Dùng để nhấn mạnh mức độ cực kỳ cao, phi thường của một sự việc, cảm xúc hay trạng thái (như sự bận rộn, nỗi sợ, sự kinh ngạc...).",
    ruleConstraints: [
      "[Ngữ điệu]: Có thể lược bỏ vế sau (〜といったら……) để nhấn mạnh mức độ vượt quá khả năng diễn đạt bằng lời nói."
    ],
    examples: [
      { jp: "締め切り前の仕事の忙しさといったら、君には想像もできないと思うよ。", vn: "Nói về sự bận rộn của công việc trước hạn nộp thì tôi nghĩ bạn không thể tưởng tượng nổi đâu." },
      { jp: "そのニュースを聞いたときの驚きといったら、しばらくは声も出ないほどだった。", vn: "Nói về sự kinh ngạc khi nghe tin đó thì đến mức tôi lặng người không thốt lên lời suốt một lúc." },
      { jp: "富士山の頂上から見た景色といったら、思い出すだけで感動する。", vn: "Nói về cảnh sắc nhìn từ đỉnh núi Phú Sĩ thì chỉ cần nhớ lại thôi đã thấy cảm động rồi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "その時の痛さ（　　）、声も出ないほどだった。",
        options: ["といったら", "とは", "といえば", "となると"],
        correctIndex: 0,
        explanation: "Nói về mức độ đau đớn lúc đó thì không diễn tả xiết -> N + といったら."
      }
    ]
  },

  // ========== BÀI 14 (66〜71) ==========
  {
    id: 66,
    pattern: "〜にもかかわらず",
    meaning: "Mặc dù... nhưng... / Cho dù... thì vẫn...",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "V / い形 / な形-な（-である）/ N-（-である）（普通形） ＋ にもかかわらず"
    ],
    nuance: "Diễn tả ý nghĩa: Mặc dù thực tế hay hoàn cảnh ở vế trước là như vậy, nhưng hành động, sự việc ở vế sau vẫn diễn ra mà hoàn toàn không bị chi phối hay ảnh hưởng bởi vế trước.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau KHÔNG dùng các câu biểu thị ý chí, hy vọng hay sự cầu khiến của người nói."
    ],
    examples: [
      { jp: "夜間工事の人たちは悪天候にもかかわらず、作業を続けている。", vn: "Những người công nhân làm việc ban đêm vẫn tiếp tục công việc mặc dù thời tiết xấu." },
      { jp: "中村先生はお忙しいにもかかわらず、快く私のレポートをチェックしてくださった。", vn: "Mặc dù thầy Nakamura rất bận rộn nhưng vẫn vui vẻ kiểm tra bài báo cáo giúp tôi." },
      { jp: "足を痛めたにもかかわらず、村田選手はマラソンコースを最後まで走った。", vn: "Mặc dù bị đau chân nhưng vận động viên Murata vẫn chạy hết chặng đường đua marathon." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "雨が激しく降っている（　　）、試合は続けられた。",
        options: ["にもかかわらず", "ものの", "つつも", "からといって"],
        correctIndex: 0,
        explanation: "Mặc dù mưa rơi rất lớn nhưng trận đấu vẫn tiếp tục -> にもかかわらず."
      }
    ]
  },
  {
    id: 67,
    pattern: "〜ものの・〜というものの",
    meaning: "Tuy... nhưng... / Mặc dù nói là... nhưng...",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "V / い形 / な形-な（-である）（普通形） ＋ ものの",
      "N / 普通形（な形［だ］・N［だ］） ＋ というものの"
    ],
    nuance: "Sự thật ở vế trước là đúng, nhưng điều được dự đoán đương nhiên từ sự thật đó lại không xảy ra ở vế sau, hoặc vế sau vẫn còn tồn tại vấn đề/chưa đạt được kỳ vọng.",
    ruleConstraints: [
      "[Thực tế]: Thường đi cùng với sự việc có thật hoặc khả năng thực tế cao. Vế sau không dùng với câu biểu thị tác động, cầu khiến hay ý chí."
    ],
    examples: [
      { jp: "明日の天気です。太平洋側は晴れるものの、風が強いため寒く感じられるでしょう。", vn: "Dự báo thời tiết ngày mai. Phía bờ Thái Bình Dương tuy trời nắng nhưng do gió mạnh nên sẽ cảm thấy lạnh." },
      { jp: "高価な着物を買ったものの、着るチャンスがない。", vn: "Tuy đã mua bộ Kimono đắt tiền nhưng tôi lại không có cơ hội mặc." },
      { jp: "不景気だというものの、人気の不動産は売れ行きがいい。", vn: "Mặc dù nói là kinh tế suy thoái nhưng các bất động sản được ưa chuộng vẫn bán rất chạy." },
      { jp: "手術は成功したというものの、まだ心配だ。", vn: "Mặc dù nói là ca phẫu thuật đã thành công nhưng tôi vẫn thấy lo lắng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "大学を卒業した（　　）、就職先がまだ決まらない。",
        options: ["ものの", "ながらも", "といっても", "からといって"],
        correctIndex: 0,
        explanation: "Tuy đã tốt nghiệp đại học nhưng vẫn chưa tìm được việc -> V-た + ものの."
      }
    ]
  },
  {
    id: 68,
    pattern: "〜ながら（も）",
    meaning: "Tuy... nhưng... / Dù... nhưng vẫn...",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "V-ます / い形 / な形-であり（-である）/ N-であり（-である） ＋ ながら（も）"
    ],
    nuance: "Diễn tả một sự việc, trạng thái ở vế sau khác với suy đoán thông thường rút ra từ trạng thái ở vế trước.",
    ruleConstraints: [
      "[Chủ ngữ & Trạng thái]: Thường đi kèm với các từ ngữ chỉ trạng thái. Chủ ngữ hai vế phải đồng nhất.",
      "[Đánh giá tiền đề]: Ở dạng Nながら, danh từ thường mang tính đánh giá hạn chế/yếu thế được thừa nhận làm tiền đề."
    ],
    examples: [
      { jp: "毎日この道を通っていながら、ここにこんなすてきな店があるとは気がつかなかった。", vn: "Mặc dù hàng ngày đều đi qua con đường này nhưng tôi lại không nhận ra ở đây có một cửa hàng tuyệt vời thế này." },
      { jp: "狭いながらも庭があるので、わたしは花を育てて楽しんでいます。", vn: "Tuy hẹp nhưng vì có sân vườn nên tôi vẫn vui vẻ trồng hoa." },
      { jp: "あの子は子供ながら、社会の動きをよく知っていますね。", vn: "Đứa trẻ đó tuy là trẻ con nhưng lại hiểu rất rõ tình hình xã hội nhỉ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "残念（　　）、今回の企画は見送ることになりました。",
        options: ["ながら", "ものの", "つつも", "といっても"],
        correctIndex: 0,
        explanation: "Tuy rất lấy làm tiếc (cụm từ 残念ながら) -> 残念ながら."
      }
    ]
  },
  {
    id: 69,
    pattern: "〜つつ（も）",
    meaning: "Dù biết/suy nghĩ... nhưng hành động lại trái ngược",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "V-ます ＋ つつ（も）"
    ],
    nuance: "Diễn tả sự mâu thuẫn, trái ngược giữa suy nghĩ/tâm lý ở vế trước và hành động thực tế diễn ra ở vế sau.",
    ruleConstraints: [
      "[Động từ tâm lý]: Thường đi liền với các động từ chỉ hoạt động tâm lý, ngôn ngữ như 思う, 知る, 言う...",
      "[Chủ ngữ & Vế sau]: Vế sau không đi kèm câu thể hiện nguyện vọng, ý chí, mệnh lệnh. Chủ ngữ ở hai vế phải giống nhau."
    ],
    examples: [
      { jp: "早く返事を書かなければと思いつつ、まだ書いていない。", vn: "Dù nghĩ là phải viết thư trả lời sớm nhưng tôi vẫn chưa viết." },
      { jp: "危険だと知りつつ、山道を登り続けた。", vn: "Dù biết là nguy hiểm nhưng họ vẫn tiếp tục leo đường núi." },
      { jp: "体に良くないと思いつつも、毎日インスタント食品ばかり食べています。", vn: "Dù biết là không tốt cho cơ thể nhưng ngày nào tôi cũng toàn ăn đồ ăn ăn liền." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "タバコは体に悪いと知り（　　）、やめられない。",
        options: ["つつも", "ものの", "ながら", "といっても"],
        correctIndex: 0,
        explanation: "Dù biết là hại sức khỏe nhưng trong thực tế lại không bỏ được -> V-ます + つつも."
      }
    ]
  },
  {
    id: 70,
    pattern: "〜といっても",
    meaning: "Nói là... nhưng thực ra... (không đến mức như hình dung)",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "N / 普通形 ＋ といっても"
    ],
    nuance: "Dùng để giải thích rằng thực tế vế sau không đến mức hoành tráng hay giống như hình ảnh mà người nghe có thể tưởng tượng ra từ từ ngữ ở vế trước.",
    ruleConstraints: [
      "[Thực tế]: Vế sau là câu biểu thị ý nghĩa khác biệt hoặc mức độ thấp hơn so với tưởng tượng/hình dung ban đầu."
    ],
    examples: [
      { jp: "わたしは今おばの家に住んでいる。おばといっても母のきょうだいではなく、祖母の妹にあたる人だ。", vn: "Bây giờ tôi đang sống ở nhà dì. Nói là dì nhưng không phải chị em ruột của mẹ mà là em gái của bà ngoại." },
      { jp: "料理ができるといっても、わたしが作れるのは簡単なものだけです。", vn: "Nói là biết nấu ăn nhưng những món tôi làm được chỉ là đồ đơn giản thôi." },
      { jp: "今もわたしの仕事はきつい。でも、きついといっても、前の会社にいたときほどではない。", vn: "Bây giờ công việc của tôi vẫn vất vả. Nhưng nói là vất vả thì cũng không đến mức như hồi ở công ty cũ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "家を買った（　　）、とても小さい中古住宅です。",
        options: ["といっても", "ものの", "ながらも", "からといって"],
        correctIndex: 0,
        explanation: "Nói là mua nhà nhưng thực ra chỉ là nhà cũ nhỏ thôi -> といっても."
      }
    ]
  },
  {
    id: 71,
    pattern: "〜からといって",
    meaning: "Chỉ vì... mà (phủ định)...",
    topicId: 14,
    topicName: "Bài 14: 〜けれど",
    connection: [
      "普通形 ＋ からといって"
    ],
    nuance: "Dùng để phủ định suy nghĩ thông thường: Chỉ dựa vào lý do ở vế trước thì không thể coi kết quả/hành động ở vế sau là đương nhiên hay hoàn toàn đúng.",
    ruleConstraints: [
      "[Phủ định một phần]: Vế sau rất hay đi kèm các biểu hiện phủ định một phần như 〜わけではない, 〜とは限らない, 〜とはいえない."
    ],
    examples: [
      { jp: "連休だからといって、デパートに勤めているわたしたちは休めるわけではない。", vn: "Chỉ vì là kỳ nghỉ dài không có nghĩa là những người làm ở bách hóa như chúng tôi được nghỉ." },
      { jp: "好きじゃないからといって、食べものをこんなにたくさん残してはいけませんよ。", vn: "Chỉ vì không thích mà lại bỏ thừa nhiều đồ ăn thế này là không được đâu đấy." },
      { jp: "忙しいからといって、睡眠をちゃんととらないと、体を壊しますよ。", vn: "Chỉ vì bận rộn mà không ngủ nghỉ đàng hoàng thì sẽ tàn phá cơ thể đấy." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "日本人だから（　　）、全員が敬語を正しく使えるわけではない。",
        options: ["といって", "としても", "ながら", "ものの"],
        correctIndex: 0,
        explanation: "Chỉ vì là người Nhật không có nghĩa là ai cũng dùng đúng kính ngữ -> からといって."
      }
    ]
  }
];
