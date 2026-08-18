export interface GrammarN3Item {
  id: number;
  title: string;
  vi: string;
  form: string;
  usage: string;
  examples: {
    j: string;
    v: string;
  }[];
}

export const GRAMMAR_N3_DATA: GrammarN3Item[] = [
  {
    id: 1,
    title: "うちに",
    vi: "Nhân lúc, trong khi",
    form: "Vている/Vない/Aい/Aな/Nの+うちに",
    usage: "Tranh thủ làm V2 trước khi trạng thái thay đổi.",
    examples: [
      { j: "暗くならないうちに、山を下ります。", v: "Tranh thủ lúc trời chưa tối, chúng ta xuống núi thôi。" },
      { j: "母が寝ているうちに、ゲームをします。", v: "Nhân lúc mẹ đang ngủ, tôi chơi game。" }
    ]
  },
  {
    id: 2,
    title: "あいだ",
    vi: "Trong khi (song song)",
    form: "Vている/Vない/Aい/Aな/Nの+あいだ",
    usage: "2 hành động diễn ra song song và xuyên suốt.",
    examples: [
      { j: "食事のあいだ、よく話しました。", v: "Trong suốt bữa ăn, chúng tôi đã nói chuyện rất nhiều。" },
      { j: "母が寝ているあいだ、テレビを見ていました。", v: "Trong suốt thời gian mẹ ngủ, tôi đã xem tivi。" }
    ]
  },
  {
    id: 3,
    title: "あいだに",
    vi: "Trong khi (khoảnh khắc)",
    form: "Vている/Vない/Aい/Aな/Nの+あいだに",
    usage: "1 hành động đang diễn ra thì 1 hành động khác cắt ngang.",
    examples: [
      { j: "休みのあいだに旅行に行きました。", v: "Trong kỳ nghỉ, tôi đã đi du lịch。" },
      { j: "私が勉強しているあいだに兄はゲームをします。", v: "Trong lúc tôi đang học thì anh trai chơi game。" }
    ]
  },
  {
    id: 4,
    title: "てからでないと",
    vi: "Nếu không... thì không thể",
    form: "Vて+からでないと/からでなければ+V phủ định",
    usage: "Nếu không làm hành động 1 thì không thể làm hành động 2.",
    examples: [
      { j: "病気が治ってからでないとお酒が飲めない。", v: "Nếu bệnh chưa khỏi thì không thể uống rượu được。" },
      { j: "歯を磨いてからでなければキスしたくない。", v: "Nếu không đánh răng thì tôi không muốn hôn。" }
    ]
  },
  {
    id: 5,
    title: "ところ",
    vi: "Đúng lúc",
    form: "Vる/Vている/Vた+ところ",
    usage: "Nhấn mạnh thời điểm, lúc xảy ra hành động.",
    examples: [
      { j: "ちょうど今から、やるところ。", v: "Đúng lúc bây giờ chuẩn bị làm đây。" },
      { j: "バスが出発したところに来た。", v: "Đến đúng lúc xe buýt vừa xuất phát。" }
    ]
  },
  {
    id: 6,
    title: "とおり",
    vi: "Đúng theo như",
    form: "Vる/Vた/Nの+とおりに / N+どおりに",
    usage: "Làm theo đúng kế hoạch, chỉ thị, mẫu.",
    examples: [
      { j: "this絵のとおりに書いて下さい。", v: "Hãy vẽ đúng theo như bức tranh này。" },
      { j: "予定どおり、明日日本へ出張する。", v: "Đúng như dự định, mai tôi đi công tác。" }
    ]
  },
  {
    id: 7,
    title: "によって",
    vi: "Tùy theo / Bởi",
    form: "N+によって/によっては",
    usage: "Tùy thuộc vào N mà khác nhau, hoặc chỉ nguyên nhân/tác nhân.",
    examples: [
      { j: "国によって習慣が違う。", v: "Tùy theo quốc gia mà tập quán khác nhau。" },
      { j: "電話はベルによって発明された。", v: "Điện thoại được phát minh bởi Bell。" }
    ]
  },
  {
    id: 8,
    title: "たびに",
    vi: "Cứ mỗi lần",
    form: "Vる/Nの+たびに",
    usage: "Cứ mỗi lần thì cùng một sự việc xảy ra.",
    examples: [
      { j: "この曲を聴くたびに、学生だった頃を思い出す。", v: "Cứ mỗi lần nghe khúc nhạc này lại nhớ thời học sinh。" },
      { j: "人は失敗のたびに、成長していく。", v: "Con người cứ mỗi lần thất bại là một lần trưởng thành。" }
    ]
  },
  {
    id: 9,
    title: "〜れば〜ほど",
    vi: "Càng... càng...",
    form: "VればVるほど / AければAいほど",
    usage: "Biểu thị mức độ tăng tiến tỉ lệ thuận.",
    examples: [
      { j: "漢字がたくさんあればあるほど、文章を読みやすくなる。", v: "Càng nhiều Kanji bài viết càng dễ đọc。" },
      { j: "家賃は駅から近ければ近いほど高くなります。", v: "Giá nhà càng gần ga càng cao。" }
    ]
  },
  {
    id: 10,
    title: "ついでに",
    vi: "Nhân tiện",
    form: "Vる/Vた/Nの+ついでに",
    usage: "Nhân tiện làm V1 thì làm luôn V2.",
    examples: [
      { j: "買い物のついでに銀行でお金をおろした。", v: "Tiện đi mua sắm, tôi đã rút tiền ngân hàng。" },
      { j: "郵便局へ行ったついでにはがきを買ってきた。", v: "Nhân tiện đi bưu điện, đã mua bưu thiếp。" }
    ]
  },
  {
    id: 11,
    title: "くらい / ほど",
    vi: "Đến mức độ",
    form: "V/A/N + くらい / ほど",
    usage: "So sánh mức độ của trạng thái.",
    examples: [
      { j: "彼女の声は天使ほどきれいだ。", v: "Giọng cô ấy đẹp đến mức như thiên thần。" },
      { j: "骨が折れるときは、死ぬくらい痛かった。", v: "Lúc gãy xương, đau đến mức tưởng chết。" }
    ]
  },
  {
    id: 12,
    title: "ほど〜はない",
    vi: "Không có... bằng (So sánh nhất)",
    form: "N+ほど...はない/いない",
    usage: "Nhấn mạnh mức độ cao nhất.",
    examples: [
      { j: "あの人ほど真面目な人はいない。", v: "Không có ai chăm chỉ bằng người đó。" },
      { j: "人前に出ることほど嫌なことはない。", v: "Không có gì ghét bằng việc ra trước đám đông。" }
    ]
  },
  {
    id: 13,
    title: "くらいなら",
    vi: "Nếu phải... thì thà...",
    form: "Vる+くらいなら",
    usage: "So với việc phải làm A thì làm B còn hơn.",
    examples: [
      { j: "あの人と結婚するくらいなら、一生独身でいい。", v: "Nếu phải kết hôn with người đó thì thà độc thân cả đời。" },
      { j: "お金を借りるくらいなら、買わない。", v: "Thà không mua còn hơn phải mượn tiền。" }
    ]
  },
  {
    id: 14,
    title: "に限る",
    vi: "Là nhất, chẳng có gì bằng",
    form: "Vる/Vない/N+に限る",
    usage: "Khẳng định A là cách tốt nhất, tuyệt vời nhất.",
    examples: [
      { j: "暑い夏の仕事終わりはやっぱりビールに限る。", v: "Kết thúc công việc mùa hè nóng bức thì bia là nhất。" },
      { j: "ストレスがたまったときは、カラオケに行くに限る。", v: "Khi stress thì đi karaoke là nhất。" }
    ]
  },
  {
    id: 15,
    title: "に対して",
    vi: "Trái ngược với / Đối với",
    form: "Mệnh đề+の/N+に対して",
    usage: "Trái ngược với A thì B... hoặc thể hiện thái độ với đối tượng.",
    examples: [
      { j: "静かなAさんに対して、Bさんはうるさい。", v: "Trái ngược với A trầm tính thì B lại ồn ào。" },
      { j: "先生に対する態度は大切だ。", v: "Thái độ đối với giáo viên là quan trọng。" }
    ]
  },
  {
    id: 16,
    title: "反面",
    vi: "Nhưng mặt khác",
    form: "Mệnh đề+反面",
    usage: "Hai mặt có tính chất trái ngược nhau trong cùng 1 sự vật.",
    examples: [
      { j: "彼は優れた学者である反面、精神的に弱い人間だ。", v: "Anh ấy là học giả xuất sắc, nhưng mặt khác tinh thần lại yếu đuối。" },
      { j: "この車は速い反面、値段が高い。", v: "Xe này nhanh nhưng mặt khác giá lại cao。" }
    ]
  },
  {
    id: 17,
    title: "一方で",
    vi: "Mặt khác, song song đó",
    form: "Mệnh đề+一方で",
    usage: "Một mặt thì..., mặt khác lại...",
    examples: [
      { j: "地球上には豊かな人がいる一方で、明日食べ物もない人がいる。", v: "Trên TĐ có người giàu, mặt khác lại có người mai không có gì ăn。" },
      { j: "子供が生まれて嬉しかった一方で、重い責任も感じた。", v: "Một mặt vui vì có con, mặt khác lại cảm thấy trách nhiệm nặng nề。" }
    ]
  },
  {
    id: 18,
    title: "というより",
    vi: "Nói đúng hơn là",
    form: "Mệnh đề+というより",
    usage: "So sánh 2 vế, vế sau thì đúng hơn vế trước.",
    examples: [
      { j: "あの学生はできないというよりやる気がないでしょう。", v: "Học sinh đó nói không làm được thì đúng hơn là không có hứng thú。" },
      { j: "彼女は節約というよりケチだよ。", v: "Cô ấy nói là tiết kiệm thì đúng hơn là keo kiệt。" }
    ]
  },
  {
    id: 19,
    title: "かわりに",
    vi: "Thay vì / Bù lại",
    form: "V/A/Nの+かわりに",
    usage: "Trái ngược với A thì B... hoặc dùng cái này thay cái kia.",
    examples: [
      { j: "現金のかわりに、電子マネーでお金を払う人が増えてきた。", v: "Thay vì tiền mặt, người trả bằng tiền điện tử tăng lên。" },
      { j: "彼女は仕事が早いかわりに、ミスが多いです。", v: "Cô ấy làm việc nhanh bù lại lỗi rất nhiều。" }
    ]
  },
  {
    id: 20,
    title: "ため(に/だ)",
    vi: "Vì, bởi, do",
    form: "V/A/Nの+tâm(e) / ため(に)",
    usage: "Vì, bởi, do (Thường dẫn đến kết quả không tốt).",
    examples: [
      { j: "大雪のために、旅行が中止になった。", v: "Do tuyết rơi dày, chuyến du lịch bị hủy。" },
      { j: "会議が延期されたのは、社長の体調が悪いためだ。", v: "Cuộc họp bị hoãn là do sức khỏe giám đốc không tốt。" }
    ]
  },
  {
    id: 21,
    title: "by/によって/による",
    vi: "Do, vì (nguyên nhân)",
    form: "N+によって/によるN",
    usage: "Diễn tả nguyên nhân, lý do.",
    examples: [
      { j: "円安が進んだことによって、海外からの観光客が増加しました。", v: "Do đồng Yên giảm giá, khách du lịch ngoài tăng lên。" },
      { j: "最近、災害による被害が多い。", v: "Gần đây thiệt hại do thảm họa nhiều。" }
    ]
  },
  {
    id: 22,
    title: "から/ことから",
    vi: "Vì, từ việc (phán đoán)",
    form: "Mệnh đề+から/ことから",
    usage: "Từ lý do/thực tế đó dẫn đến kết quả/phán đoán.",
    examples: [
      { j: "二人はよく似ていることから、兄弟だとすぐにわかった。", v: "Từ việc 2 người rất giống nhau, tôi hiểu ngay là anh em。" },
      { j: "わずかな誤解から、友達との関係が悪くなってしまった。", v: "Từ một hiểu lầm nhỏ, quan hệ bạn bè trở nên tồi tệ。" }
    ]
  },
  {
    id: 23,
    title: "おかげで/せいで",
    vi: "Nhờ có (tốt) / Tại vì (xấu)",
    form: "V/A/Nho+おかげで/せいで",
    usage: "Nhờ (kết quả tốt) / Tại (kết quả xấu).",
    examples: [
      { j: "天気が良かったおかげで、ピクニックを楽しめました。", v: "Nhờ thời tiết đẹp mà tận hưởng được buổi picnic。" },
      { j: "雨のせいで、試合が中止になりました。", v: "Tại trời mưa nên trận đấu bị hủy。" }
    ]
  },
  {
    id: 24,
    title: "のだから",
    vi: "Vì là... nên (đương nhiên)",
    form: "V/A/Nな+のだから",
    usage: "Người nghe/nói đều hiểu lý do, nhấn mạnh sự tất yếu.",
    examples: [
      { j: "笑わないでください。真剣にやっているのだから。", v: "Xin đừng cười. Vì tôi đang làm rất nghiêm túc mà。" },
      { j: "世界は広いのだから、いろいろな習慣がある。", v: "Vì thế giới rộng lớn nên đương nhiên có nhiều tập quán。" }
    ]
  },
  {
    id: 25,
    title: "なら",
    vi: "Nếu... thì",
    form: "V/A/N+なら",
    usage: "Đưa ra lời khuyên, nhận định dựa trên thông tin biết được.",
    examples: [
      { j: "旅行ならニャーチャンがいいと思います。", v: "Nếu đi du lịch thì tôi nghĩ Nha Trang là tuyệt nhất。" },
      { j: "彼女が忙しいなら、後で電話します。", v: "Nếu cô ấy bận thì tôi sẽ gọi lại sau。" }
    ]
  },
  {
    id: 26,
    title: "ては/のでは",
    vi: "Nếu... thì (kết quả không hay)",
    form: "Vては/のでは",
    usage: "Nếu sự thật/giả định như thế thì sẽ đem lại kết quả xấu.",
    examples: [
      { j: "そんなに食べてはお腹を壊しちゃうよ！", v: "Nếu ăn nhiều thế thì sẽ đau bụng mất！" },
      { j: "お金がないのでは、旅行に行けません。", v: "Nếu không có tiền thì không thể đi du lịch。" }
    ]
  },
  {
    id: 27,
    title: "さえ〜ば",
    vi: "Chỉ cần... là đủ",
    form: "Vます/て+さえいれば / Nさえあれば",
    usage: "Chỉ cần điều kiện đó là đủ, miễn là... thì...",
    examples: [
      { j: "お金さえあれば、何でもできる。", v: "Chỉ cần có tiền là làm được mọi thứ。" },
      { j: "薬を飲みさえすれば、治ります。", v: "Chỉ cần uống thuốc là sẽ khỏi。" }
    ]
  },
  {
    id: 28,
    title: "たとえ〜ても",
    vi: "Cho dù... đi chăng nữa",
    form: "たとえ+Vても/Aくても/Ndem(o)",
    usage: "Giả định nhượng bộ mạnh mẽ.",
    examples: [
      { j: "たとえ親に反対されても、彼女と結婚するんだ。", v: "Cho dù bị bố mẹ phản đối, tôi vẫn sẽ kết hôn với cô ấy。" },
      { j: "たとえ雨でも、試合は行われます。", v: "Cho dù trời mưa, trận đấu vẫn được diễn ra。" }
    ]
  },
  {
    id: 29,
    title: "ば/たら/なら",
    vi: "Nếu (giả định ngược)",
    form: "Vば/Vたら/Nなら",
    usage: "Nếu... thì đã (thực tế không phải vậy).",
    examples: [
      { j: "もう少し早く来れば、それが買えたのに。", v: "Nếu đến sớm một chút thì đã mua được nó rồi。" },
      { j: "ちゃんと勉強しなかったら、良い点を取れないよ。", v: "Nếu không học đàng hoàng thì không lấy được điểm cao đâu。" }
    ]
  },
  {
    id: 30,
    title: "ということだ/とのことだ",
    vi: "Nghe nói, có nghĩa là",
    form: "Mệnh đề+ということだ",
    usage: "Truyền đạt thông tin trang trọng / Giải thích ý nghĩa.",
    examples: [
      { j: "新しい先生はやさしいということだ。", v: "Nghe nói giáo viên mới rất hiền。" },
      { j: "お金はいりません。無料ということですね。", v: "Không cần tiền. Nghĩa là miễn phí nhỉ。" }
    ]
  },
  {
    id: 31,
    title: "と言われている",
    vi: "Người ta nói rằng, được cho là",
    form: "Mệnh đề+と言われている",
    usage: "Sự đánh giá chung của dư luận, lời đồn.",
    examples: [
      { j: "あの会社はもうすぐ倒産すると言われている。", v: "Người ta đồn công ty đó sắp phá sản。" },
      { j: "東京は世界で一番安全な都市だと言われている。", v: "Tokyo được cho là thành phố an toàn nhất thế giới。" }
    ]
  },
  {
    id: 32,
    title: "とか",
    vi: "Nghe nói là, hình như là",
    form: "Mệnh đề+とか",
    usage: "Nghe tin đồn không chắc chắn.",
    examples: [
      { j: "彼女はテニスの試合で優勝したとか。", v: "Nghe nói cô ấy vô địch giải tennis。" },
      { j: "来週からずっと雨だとか。", v: "Hình như từ tuần sau mưa suốt。" }
    ]
  },
  {
    id: 33,
    title: "って",
    vi: "Nghe nói, nói rằng",
    form: "Mệnh đề+って",
    usage: "Văn nói thân mật của と言っている/と聞いた.",
    examples: [
      { j: "彼はしらないって言ってた。", v: "Anh ấy nói là không biết。" },
      { j: "Bさんの恋人は人気アイドルだって。", v: "Nghe nói người yêu của B là idol nổi tiếng。" }
    ]
  },
  {
    id: 34,
    title: "という",
    vi: "Nghe nói",
    form: "Mệnh đề+という",
    usage: "Văn viết, truyền đạt thông tin trang trọng.",
    examples: [
      { j: "あの事件の犯人は捕まったという。", v: "Nghe nói hung thủ vụ án đó đã bị bắt。" },
      { j: "この辺りは、昔は海だったという。", v: "Nghe nói khu vực này ngày xưa là biển。" }
    ]
  },
  {
    id: 35,
    title: "はずがない/わけがない",
    vi: "Chắc chắn không, làm gì có chuyện",
    form: "V/A/Nの+はずがない",
    usage: "Phủ định mạnh mẽ, tuyệt đối không có khả năng.",
    examples: [
      { j: "彼がそんなことをするはずがない。", v: "Chắc chắn anh ấy không làm chuyện như vậy。" },
      { j: "this問題が易しいはずがない。", v: "Bài toán này làm gì có chuyện dễ。" }
    ]
  },
  {
    id: 36,
    title: "とは限らない",
    vi: "Chưa chắc đã, không hẳn là",
    form: "Mệnh đề+とは限らない",
    usage: "Phủ định một phần, hầu hết là thế nhưng có ngoại lệ.",
    examples: [
      { j: "日本語が上手な人は日本語を教えられるとは限らない。", v: "Người giỏi tiếng Nhật chưa chắc đã dạy được tiếng Nhật。" },
      { j: "高いものが良いとは限らない。", v: "Đồ đắt tiền chưa chắc đã tốt。" }
    ]
  },
  {
    id: 37,
    title: "わけではない",
    vi: "Không hẳn là, không có nghĩa là",
    form: "Mệnh đề+わけではない",
    usage: "Phủ định 1 phần chứ không phải phủ định hoàn toàn.",
    examples: [
      { j: "彼ができないわけではないが、時間がかかる。", v: "Không phải anh ấy không làm được, mà là tốn thời gian。" },
      { j: "彼が嫌いなわけではないが、あまり話さない。", v: "Không hẳn là ghét anh ấy nhưng ít nói chuyện。" }
    ]
  },
  {
    id: 38,
    title: "ないことはない",
    vi: "Không phải là không... mà là",
    form: "Vないことはない",
    usage: "Được thì được đấy nhưng mà...",
    examples: [
      { j: "この問題が解けないことはない。", v: "Không phải là không giải được bài này (chỉ là khó thôi)。" },
      { j: "彼がしたくないことはない。", v: "Không phải là anh ấy không muốn làm。" }
    ]
  },
  {
    id: 39,
    title: "AことはAが",
    vi: "A thì A nhưng mà...",
    form: "V/A+ことは+V/A+が",
    usage: "Công nhận vế trước nhưng nhấn mạnh vế sau.",
    examples: [
      { j: "行くことは行くが、時間がかかる。", v: "Đi thì có đi nhưng tốn thời gian。" },
      { j: "高いことは高いが、品質がいい。", v: "Đắt thì đắt thật nhưng chất lượng tốt。" }
    ]
  },
  {
    id: 40,
    title: "ていただきたい/てもらいたい",
    vi: "Muốn ai đó làm",
    form: "Vていただきたい",
    usage: "Thể hiện mong muốn người khác làm gì cho mình (lịch sự).",
    examples: [
      { j: "この書類、ちょっと見ていただきたいですが。", v: "Tôi muốn bạn xem qua tài liệu này một chút。" },
      { j: "彼に自分の悩みを聞いてもらいたい。", v: "Tôi muốn anh ấy lắng nghe nỗi niềm của tôi。" }
    ]
  },
  {
    id: 41,
    title: "させてほしい/させてもらいたい",
    vi: "Muốn được làm",
    form: "Vさせて+ほしい",
    usage: "Mong muốn người khác cho phép mình làm.",
    examples: [
      { j: "文化祭のポスターは私が作らせていただきたいです。", v: "Tôi muốn được làm poster cho lễ hội văn hóa。" },
      { j: "パーティーに参加させてもらいたいです。", v: "Tôi muốn được tham gia bữa tiệc。" }
    ]
  },
  {
    id: 42,
    title: "といい/ばいい/たらいい",
    vi: "Ước gì, giá mà... thì tốt",
    form: "V/Aばいい",
    usage: "Thể hiện mong ước, hy vọng.",
    examples: [
      { j: "明日はゆっくり休むといいですよ。", v: "Ngày mai giá mà được nghỉ ngơi thoải mái thì tốt。" },
      { j: "今年の試験に合格すればいいけど。", v: "Ước gì đỗ kỳ thi năm nay。" }
    ]
  },
  {
    id: 43,
    title: "こと",
    vi: "Nên / Không nên / Cần",
    form: "Vる/Vない+こと",
    usage: "Dùng trong quy định, nội quy, nhắc nhở.",
    examples: [
      { j: "病院で大きな声で話さないこと。", v: "Không được nói chuyện to tiếng trong bệnh viện。" },
      { j: "痩せたければ、お酒をやめること。", v: "Nếu muốn ốm, cần phải bỏ rượu。" }
    ]
  },
  {
    id: 44,
    title: "べきだ/べきではない",
    vi: "Nên / Không nên (quan điểm cá nhân)",
    form: "Vる+べきだ",
    usage: "Khuyên răn mạnh mẽ dựa trên đạo đức, lẽ thường.",
    examples: [
      { j: "野菜は毎日食べるべきだ。", v: "Mỗi ngày nên ăn rau。" },
      { j: "人の悪口を言うべきではない。", v: "Không nên nói xấu người khác。" }
    ]
  },
  {
    id: 45,
    title: "たらどうか",
    vi: "Thử... thì sao? / Tại sao không?",
    form: "Vたらどうか",
    usage: "Đưa ra lời khuyên, gợi ý nhẹ nhàng.",
    examples: [
      { j: "たまに運動したらどうですか。", v: "Thỉnh thoảng thử vận động xem sao？" },
      { j: "疲れているみたいですね。少し休んだらどうですか。", v: "Có vẻ mệt, sao không nghỉ ngơi chút？" }
    ]
  },
  {
    id: 46,
    title: "することにする",
    vi: "Tôi quyết định",
    form: "Vる/Vない+ことにする",
    usage: "Bản thân quyết tâm, quyết định làm gì.",
    examples: [
      { j: "彼のために、友達との遊ぶ約束を断ることにする。", v: "Vì anh ấy, tôi quyết định từ chối hẹn chơi với bạn。" },
      { j: "毎朝、５時に起きることにしている。", v: "Tôi quyết định thói quen dậy lúc 5h sáng。" }
    ]
  },
  {
    id: 47,
    title: "ようにする",
    vi: "Cố gắng",
    form: "Vる/Vない+ようにする",
    usage: "Cố gắng tạo thói quen làm/không làm gì.",
    examples: [
      { j: "これから毎日１５分ぐらい運動するようにする。", v: "Từ giờ tôi cố gắng vận động 15p mỗi ngày。" },
      { j: "忘れないようにちゃんとメモするようにしています。", v: "Tôi luôn cố gắng ghi chú cẩn thận để không quên。" }
    ]
  },
  {
    id: 48,
    title: "ようとする",
    vi: "Định / Cố gắng làm",
    form: "Vよう+とする",
    usage: "Định làm gì thì có việc xen vào, hoặc nỗ lực làm.",
    examples: [
      { j: "ご飯を食べようとする時、友達が遊びに来た。", v: "Đúng lúc định ăn cơm thì bạn đến chơi。" },
      { j: "あの子は手を伸ばして、テーブルの上のおもちゃを取ろうとしている。", v: "Đứa bé đang vươn tay định lấy đồ chơi。" }
    ]
  },
  {
    id: 49,
    title: "つもりだ",
    vi: "Cứ ngỡ là... nhưng",
    form: "Vた/Vている/A/N+つもりだ",
    usage: "Bản thân nghĩ vậy nhưng thực tế khác.",
    examples: [
      { j: "秘密にしていたつもりだが、バレていた。", v: "Cứ ngỡ đã giữ bí mật nhưng đã bị lộ。" },
      { j: "試験は簡単なつもりだったが、思ったより難しかった。", v: "Cứ ngỡ kỳ thi dễ, nhưng khó hơn tôi tưởng。" }
    ]
  },
  {
    id: 50,
    title: "Kính ngữ bị động",
    vi: "Kính ngữ chia ở dạng bị động",
    form: "Vれる/られる",
    usage: "Tôn kính ngữ (dùng cho hành động của người trên).",
    examples: [
      { j: "部長はコーヒーを飲まれますか。", v: "Trưởng phòng có uống cafe không ạ？" },
      { j: "先生は本をかかれます。", v: "Thầy giáo viết sách。" }
    ]
  },
  {
    id: 51,
    title: "おVになる",
    vi: "Tôn kính ngữ (hành động người trên)",
    form: "お/ご+V+ngu(yên) / お/ご+V+になる",
    usage: "Kính ngữ thể hiện sự tôn trọng.",
    examples: [
      { j: "社長はワインをお飲みになりますか。", v: "Giám đốc có uống rượu vang không ạ？" },
      { j: "先生はこの本をお読みになりましたか。", v: "Thầy đã đọc sách này chưa ạ？" }
    ]
  },
  {
    id: 52,
    title: "Tôn kính ngữ đặc biệt",
    vi: "Từ đặc biệt",
    form: "いらっしゃいます / 召し上がります / なさいます",
    usage: "Kính ngữ dạng từ vựng đặc biệt.",
    examples: [
      { j: "先生は教室にいらっしゃいます。", v: "Thầy giáo đang ở trong phòng học。" },
      { j: "課長はコーヒーを召し上がっています。", v: "Tổ trưởng đang dùng cafe。" }
    ]
  },
  {
    id: 53,
    title: "おVください",
    vi: "Hãy... (Kính ngữ)",
    form: "お/ご+V+ください",
    usage: "Yêu cầu lịch sự.",
    examples: [
      { j: "少々お待ちください。", v: "Xin vui lòng chờ một chút。" },
      { j: "こちらのお椅子におかけください。", v: "Xin mời ngồi vào ghế này。" }
    ]
  },
  {
    id: 54,
    title: "おVする",
    vi: "Khiêm nhường ngữ (hành động của mình)",
    form: "お/ご+V+する",
    usage: "Hạ mình xuống để tôn trọng đối phương.",
    examples: [
      { j: "私がお持ちします。", v: "Để tôi cầm giúp cho。" },
      { j: "私が金閣寺をご案内します。", v: "Tôi xin phép hướng dẫn chùa Kinkakuji。" }
    ]
  },
  {
    id: 55,
    title: "Khiêm nhường ngữ đặc biệt",
    vi: "Từ đặc biệt",
    form: "伺います / 申します / 参ります / 拝見します",
    usage: "Hạ mình bằng từ vựng đặc biệt.",
    examples: [
      { j: "私はフォンと申します。", v: "Tôi tên là Phong。" },
      { j: "私はベトナムから参りました。", v: "Tôi đến từ Việt Nam。" }
    ]
  },
  {
    id: 56,
    title: "こそ",
    vi: "Chính là, nhất định là",
    form: "N+こそ",
    usage: "Nhấn mạnh tuyệt đối.",
    examples: [
      { j: "この本こそ、私がずっと探していたものです。", v: "Cuốn sách này chính là thứ tôi tìm kiếm bấy lâu。" },
      { j: "愛するからこそ、辛くなる。", v: "Chính vì yêu nên mới đau khổ。" }
    ]
  },
  {
    id: 57,
    title: "even/đến cả/như là",
    vi: "Ngay cả, ví dụ như...",
    form: "N+でも",
    usage: "Đưa ra ví dụ hoặc nhấn mạnh điều hiển nhiên.",
    examples: [
      { j: "そんなことは子供でも知っている。", v: "Chuyện đó đến trẻ con cũng biết。" },
      { j: "ジュース death/でも/飲みましょうか。", v: "Uống nước hoa quả hay gì đó nhé？" }
    ]
  },
  {
    id: 58,
    title: "も",
    vi: "Đến tận, những...",
    form: "Số lượng/N+も",
    usage: "Nhấn mạnh số lượng nhiều hoặc mức độ kinh ngạc.",
    examples: [
      { j: "一日も休まないで、学校に通った。", v: "Tôi đi học không nghỉ đến một ngày nào。" },
      { j: "彼はビールを10本も飲んだ。", v: "Anh ta uống đến tận 10 chai bia。" }
    ]
  },
  {
    id: 59,
    title: "さえ",
    vi: "Đến ngay cả, thậm chí",
    form: "N+さえ",
    usage: "Nhấn mạnh mức độ cực đoan.",
    examples: [
      { j: "this問題は小学生さえ分かる。", v: "Bài này đến học sinh tiểu học cũng hiểu。" },
      { j: "山田さんは私に会ってさえくれなかった。", v: "Anh Yamada thậm chí còn không thèm gặp tôi。" }
    ]
  },
  {
    id: 60,
    title: "まで",
    vi: "Đến mức, cho đến tận",
    form: "N/Vて+まで",
    usage: "Nhấn mạnh giới hạn, phạm vi xa xôi.",
    examples: [
      { j: "疲れて倒れるまで働きました。", v: "Làm việc đến mức mệt lả đi。" },
      { j: "このバスは駅まで行きますか。", v: "Xe buýt này đi đến tận ga không？" }
    ]
  },
  {
    id: 61,
    title: "など/なんか/なんて",
    vi: "Ví dụ như là, mấy thứ như...",
    form: "N+など / なんか / なんて",
    usage: "Đưa ra ví dụ (đôi khi mang hàm ý hạ thấp).",
    examples: [
      { j: "この服などいかがですか？", v: "Bộ đồ này thì sao ạ？" },
      { j: "寿司やラーメンなどが好きです。", v: "Tôi thích sushi, ramen và mấy thứ tương tự。" }
    ]
  },
  {
    id: 62,
    title: "だけ",
    vi: "Chỉ, duy nhất",
    form: "N/V/A+だけ",
    usage: "Giới hạn phạm vi.",
    examples: [
      { j: "私は動物が好きだが、蛇だけはいやだ。", v: "Tôi thích động vật nhưng chỉ ghét mỗi rắn。" },
      { j: "ただの友達だけです。", v: "Chỉ là bạn bè bình thường thôi。" }
    ]
  },
  {
    id: 63,
    title: "について",
    vi: "Về vấn đề...",
    form: "N+について",
    usage: "Biểu thị chủ đề nói đến (đi với nghĩ, nói, điều tra).",
    examples: [
      { j: "図書館で日本文化について調べた。", v: "Tôi đã tìm hiểu về văn hóa Nhật ở thư viện。" },
      { j: "留学について親に相談した。", v: "Tôi đã thảo luận với bố mẹ về việc du học。" }
    ]
  },
  {
    id: 64,
    title: "に対して(2)",
    vi: "Đối với...",
    form: "N+に対して",
    usage: "Thái độ, hành động hướng tới đối tượng nào đó.",
    examples: [
      { j: "自分が言ったことに対して、ちゃんと責任を持ちなさいよ。", v: "Hãy có trách nhiệm đối với những lời mình nói ra。" },
      { j: "彼女は私の告白に対して何も言わなかった。", v: "Cô ấy không nói gì đối với lời tỏ tình của tôi。" }
    ]
  },
  {
    id: 65,
    title: "によって(Bị động)",
    vi: "Bởi...",
    form: "N+によって+Vbị động",
    usage: "Chủ thể của hành động bị động (phát minh, viết, thiết kế).",
    examples: [
      { j: "電話はベル兄弟によって発明された。", v: "Điện thoại được phát minh bởi anh em nhà Bell。" },
      { j: "thisバッグは人気歌手によってデザインされた。", v: "Túi này được thiết kế bởi ca sĩ nổi tiếng。" }
    ]
  },
  {
    id: 66,
    title: "にとって",
    vi: "Đối với... (Đứng trên lập trường)",
    form: "N+にとって",
    usage: "Đứng từ góc độ của N để đánh giá.",
    examples: [
      { j: "私にとって彼女は全てだ。", v: "Đối với tôi cô ấy là tất cả。" },
      { j: "体にとって一番重要なものは水だ。", v: "Đối với cơ thể, quan trọng nhất là nước。" }
    ]
  },
  {
    id: 67,
    title: "として",
    vi: "Với tư cách là, với vai trò là",
    form: "N+として",
    usage: "Nói về danh nghĩa, tư cách, vị trí.",
    examples: [
      { j: "私は実習生として日本に来ました。", v: "Tôi đến Nhật với tư cách là thực tập sinh。" },
      { j: "友達としてちょっと君にアドバイスしたい。", v: "Với tư cách là bạn, tôi muốn khuyên cậu chút。" }
    ]
  },
  {
    id: 68,
    title: "こと(danh từ)",
    vi: "Việc (Danh từ hóa)",
    form: "Vる/A/N+こと",
    usage: "Biến động từ, tính từ thành cụm danh từ để làm chủ ngữ/tân ngữ.",
    examples: [
      { j: "私の趣味は本を読むことと釣りをすることです。", v: "Sở thích của tôi là việc đọc sách và câu cá。" },
      { j: "先生の仕事は学生の能力を引き出すことだ。", v: "Công việc của giáo viên là phát huy năng lực học sinh。" }
    ]
  },
  {
    id: 69,
    title: "ことがある",
    vi: "Thỉnh thoảng có lúc...",
    form: "Vる/Vない+ことがある",
    usage: "Thi thoảng xảy ra việc gì đó.",
    examples: [
      { j: "卒業後も、リンちゃんに会うことがある。", v: "Sau khi tốt nghiệp, thỉnh thoảng vẫn gặp bé Lin。" },
      { j: "最近、寝られないことがある。", v: "Gần đây có lúc tôi không ngủ được。" }
    ]
  },
  {
    id: 70,
    title: "ことはない",
    vi: "Không cần thiết phải...",
    form: "Vる+ことはない",
    usage: "Khuyên giải, không cần làm vậy đâu.",
    examples: [
      { j: "まだ時間が十分あるから、急ぐことはない。", v: "Vẫn còn thời gian, không cần vội đâu。" },
      { j: "服がたくさんあるから、新しいのを買うことはない。", v: "Nhiều quần áo rồi, không cần mua mới。" }
    ]
  },
  {
    id: 71,
    title: "の",
    vi: "Việc (Danh từ hóa miêu tả)",
    form: "V/A+の",
    usage: "Danh từ hóa để miêu tả, thường đi với động từ cảm giác/cụ thể.",
    examples: [
      { j: "映画を見るのを楽しみにしています。", v: "Tôi đang mong đợi việc xem phim。" },
      { j: "彼が話すのが好きです。", v: "Tôi thích việc anh ấy nói chuyện。" }
    ]
  },
  {
    id: 72,
    title: "のに",
    vi: "Để... (Mục đích, công dụng)",
    form: "Vる+のに+使う/便利/役に立つ",
    usage: "Mục đích sử dụng, công cụ.",
    examples: [
      { j: "このアプリは日本語を勉強するのに便利です。", v: "App này tiện cho việc học tiếng Nhật。" },
      { j: "ティックトックは商売するのに役に立つ。", v: "Tiktok có ích cho việc buôn bán。" }
    ]
  },
  {
    id: 73,
    title: "のは〜だ",
    vi: "Cái mà... chính là...",
    form: "Mệnh đề+のは+N+だ",
    usage: "Nhấn mạnh thông tin vế sau.",
    examples: [
      { j: "社長が帰ったのは6時ごろです。", v: "Lúc giám đốc về là khoảng 6h。" },
      { j: "一番幸せなのは好きな人のそばにいることです。", v: "Điều hạnh phúc nhất là ở cạnh người mình thích。" }
    ]
  },
  {
    id: 74,
    title: "というのは",
    vi: "Cái gọi là... nghĩa là...",
    form: "N+というのは",
    usage: "Định nghĩa hoặc giải thích một khái niệm.",
    examples: [
      { j: "「こんにちは」というのは「Xin chào」という意味だ。", v: "Konnichiwa nghĩa là Xin chào。" },
      { j: "「マック」というのは「マクドナルド」だよ。", v: "Mac nghĩa là McDonald đó。" }
    ]
  },
  {
    id: 75,
    title: "のではないか",
    vi: "Phải chăng là...",
    form: "Mệnh đề+のではないか/のではないだろうか",
    usage: "Nêu ý kiến cá nhân một cách e dè, nhẹ nhàng.",
    examples: [
      { j: "頑張れば合格するのではないか。", v: "Phải chăng nỗ lực thì sẽ đỗ？" },
      { j: "家族は一番大切なのではないだろうか。", v: "Phải chăng gia đình là điều quan trọng nhất？" }
    ]
  },
  {
    id: 76,
    title: "まるで〜ようだ",
    vi: "Cứ như thể là...",
    form: "まるで+Nの/V+ようだ",
    usage: "So sánh ví von một điều không có thật.",
    examples: [
      { j: "4月なのにすごく寒くて、まるで冬のようだ。", v: "Tháng 4 mà lạnh cứ như mùa đông vậy。" },
      { j: "彼女はまるで天使のように優しかった。", v: "Cô ấy hiền cứ như thiên thần。" }
    ]
  },
  {
    id: 77,
    title: "まるで〜かのように",
    vi: "Cứ như thể là...",
    form: "まるで+Mệnh đề+かのように",
    usage: "So sánh mạnh hơn ようだ.",
    examples: [
      { j: "今日は暖かくて、まるで春が来たかのようだ。", v: "Hôm nay ấm áp, cứ như thể mùa xuân đã đến。" },
      { j: "彼はいつも社長であるかのように他人に命令する。", v: "Anh ta ra lệnh cho người khác cứ như thể mình là giám đốc。" }
    ]
  },
  {
    id: 78,
    title: "みたいだ",
    vi: "Giống như là, có vẻ như",
    form: "N/V+みたいだ",
    usage: "So sánh, suy đoán (văn nói của ようだ).",
    examples: [
      { j: "彼は子供みたいです。", v: "Anh ấy cứ như trẻ con。" },
      { j: "彼女は疲れているみたいです。", v: "Có vẻ như cô ấy đang mệt。" }
    ]
  },
  {
    id: 79,
    title: "ように",
    vi: "Đúng như, giống như",
    form: "Vる/Vた/Nの+ように",
    usage: "Giống như đã nói, như đã biết...",
    examples: [
      { j: "教えてもらったようにやってみたけど、うまくいかなかったよ。", v: "Đã làm giống như được dạy nhưng không suôn sẻ。" },
      { j: "ご存知のように、日本は台風が多い国です。", v: "Như các bạn đã biết, Nhật Bản nhiều bão。" }
    ]
  },
  {
    id: 80,
    title: "わけだ",
    vi: "Hèn chi, thảo nào, nghĩa là",
    form: "Mệnh đề+わけだ",
    usage: "Đúc kết lý do dẫn đến kết quả đương nhiên.",
    examples: [
      { j: "夜中に雪が降ったんですね。それで、昨日の夜あんなに寒かったわけですね。", v: "Tuyết rơi giữa đêm. Hèn chi tối qua lạnh thế。" },
      { j: "今年台風が多いですから、野菜の値段が上がっているわけだ。", v: "Năm nay nhiều bão nên giá rau tăng là phải。" }
    ]
  },
  {
    id: 81,
    title: "わけにはいかない",
    vi: "Không thể...",
    form: "Vる+わけにはいかない",
    usage: "Vì lý do khách quan/đạo đức nên không thể làm.",
    examples: [
      { j: "今日は大事な会議があるので、風邪をひいても会社を休むわけにはいかない。", v: "Hôm nay họp quan trọng nên dù cảm cũng không thể nghỉ。" },
      { j: "上司はまだ残業中だ。私が先に帰るわけにはいかない。", v: "Sếp đang OT, tôi không thể về trước。" }
    ]
  },
  {
    id: 82,
    title: "ないわけにはいかない",
    vi: "Không thể không...",
    form: "Vない+わけにはいかない",
    usage: "Vì lý do khách quan/đạo đức nên bắt buộc phải làm.",
    examples: [
      { j: "お年寄りが電車に乗ってきたら、席を譲らないわけにはいかない。", v: "Người già lên tàu thì không thể không nhường ghế。" },
      { j: "彼女が作ってくれた料理なのだから、食べないわけにはいかない。", v: "Cô ấy đã nấu cho thì không thể không ăn。" }
    ]
  },
  {
    id: 83,
    title: "ばかり",
    vi: "Toàn là, chỉ toàn",
    form: "N/Vて+ばかり",
    usage: "Chỉ toàn làm việc gì đó (thường mang ý chê trách).",
    examples: [
      { j: "うちの子は友達とばかり遊んでいて、全く勉強してくれない。", v: "Con nhà tôi chỉ toàn chơi với bạn, chả học gì。" },
      { j: "お父さんは休みの日は寝てばかりいる。", v: "Bố ngày nghỉ chỉ toàn ngủ。" }
    ]
  },
  {
    id: 84,
    title: "ばかりでなく",
    vi: "Không chỉ... mà còn",
    form: "Mệnh đề+ばかりでなく",
    usage: "Cấu trúc tương đương だけでなく.",
    examples: [
      { j: "ラン先生の説明は分かりやすいばかりでなく、面白い。", v: "Cô Lan giải thích không chỉ dễ hiểu mà còn thú vị。" },
      { j: "彼は町を案内してくれたばかりでなく、料理もご馳走してくれた。", v: "Anh ấy không chỉ dẫn đường mà còn đãi ăn。" }
    ]
  },
  {
    id: 85,
    title: "ばかりだ(1)",
    vi: "Càng ngày càng...",
    form: "Vる(biến đổi)+ばかりだ",
    usage: "Xu hướng thay đổi xấu đi theo 1 chiều.",
    examples: [
      { j: "最近仕事は増えるばかりだ。", v: "Gần đây công việc cứ ngày càng tăng。" },
      { j: "物価は上がるばかりだ。", v: "Vật giá cứ ngày càng tăng。" }
    ]
  },
  {
    id: 86,
    title: "ばかりだ(2)",
    vi: "Chỉ còn đợi... là xong",
    form: "Vる+ばかりだ",
    usage: "Đã chuẩn bị xong, chỉ chờ hành động cuối.",
    examples: [
      { j: "必要なものは全部準備したので、後は出かけるばかりだ。", v: "Chuẩn bị xong hết rồi, chỉ còn chờ xuất phát thôi。" },
      { j: "料理ができた。あとは食べるばかりだ。", v: "Nấu xong rồi, giờ chỉ việc ăn。" }
    ]
  },
  {
    id: 87,
    title: "たばかり",
    vi: "Vừa mới... xong",
    form: "Vた+ばかり",
    usage: "Hành động vừa mới xảy ra theo cảm nhận người nói.",
    examples: [
      { j: "日本に来たばかりで、まだ日本語がわかりません。", v: "Vừa mới đến Nhật nên chưa hiểu tiếng Nhật。" },
      { j: "さっきご飯を食べたばかりなのにもうお腹がすいた。", v: "Vừa ăn lúc nãy xong mà đã đói。" }
    ]
  },
  {
    id: 88,
    title: "ことにしている",
    vi: "Đang quyết tâm duy trì",
    form: "Vる/Vない+ことにしている",
    usage: "Duy trì thói quen do bản thân quyết định.",
    examples: [
      { j: "朝起きたら、水をいっぱい飲むことにしている。", v: "Tôi duy trì thói quen uống nhiều nước khi dậy。" },
      { j: "健康のために、タバコを吸わないことにしている。", v: "Để khỏe mạnh, tôi duy trì việc không hút thuốc。" }
    ]
  },
  {
    id: 89,
    title: "ことになる",
    vi: "Được quyết định là",
    form: "Vる/Vない+ことになる",
    usage: "Quyết định không do bản thân (khách quan, công ty, tổ chức).",
    examples: [
      { j: "僕たちは今年の11月に結婚することになった。", v: "Chúng tôi đã được quyết định sẽ cưới vào tháng 11。" },
      { j: "来月から東京へ転勤することになりました。", v: "Tôi đã có quyết định chuyển công tác tới Tokyo tháng sau。" }
    ]
  },
  {
    id: 90,
    title: "ことになっている",
    vi: "Đã được quy định là",
    form: "Vる/Vない+ことになっている",
    usage: "Quy tắc, luật lệ, lịch trình đã định sẵn.",
    examples: [
      { j: "教室ではタバコを吸わないことになっている。", v: "Được quy định là không hút thuốc trong lớp。" },
      { j: "ゴミは火曜日と金曜日に出すことになっている。", v: "Quy định đổ rác vào thứ 3 và thứ 6。" }
    ]
  },
  {
    id: 91,
    title: "ようになる",
    vi: "Trở nên có thể",
    form: "Vる(khả năng)+ようになる",
    usage: "Biến đổi trạng thái từ không thể thành có thể.",
    examples: [
      { j: "漢字が読めるようになった。", v: "Tôi đã trở nên có thể đọc chữ Hán。" },
      { j: "子供は家事を手伝ってくれるようになった。", v: "Con tôi đã bắt đầu biết giúp việc nhà。" }
    ]
  },
  {
    id: 92,
    title: "ようになっている",
    vi: "Được thiết kế để...",
    form: "Vる/Vない+ようになっている",
    usage: "Chức năng của máy móc, hệ thống.",
    examples: [
      { j: "この時計は水中でも壊れないようになっている。", v: "Đồng hồ này được chế tạo để không hỏng dưới nước。" },
      { j: "このドアは閉めると自動的に鍵がかかるようになっている。", v: "Cửa này được thiết kế để tự khóa khi đóng。" }
    ]
  },
  {
    id: 93,
    title: "と...た",
    vi: "Sau khi... thì nhận ra (bất ngờ)",
    form: "Vると...Vた",
    usage: "Làm vế 1 thì phát hiện ra vế 2 (vế 2 bất ngờ).",
    examples: [
      { j: "会議室に入ると、社長もいた。", v: "Vừa vào phòng họp thì thấy có cả giám đốc。" },
      { j: "窓を開けると、雪が降っていた。", v: "Mở cửa sổ ra thì thấy tuyết đang rơi。" }
    ]
  },
  {
    id: 94,
    title: "たら...た",
    vi: "Sau khi... thì (kết quả)",
    form: "Vたら...Vた",
    usage: "Làm A xong thì B xảy ra, hoặc dẫn tới kết quả B.",
    examples: [
      { j: "先生の覚え方をしてみると、すぐ効果が出る。", v: "Thử cách nhớ của thầy thì có hiệu quả ngay。" },
      { j: "駅員に聞いたら、「次の電車が30分後」と答えた。", v: "Hỏi nhân viên ga thì được trả lời là 30p nữa。" }
    ]
  },
  {
    id: 95,
    title: "もいれば...もいる",
    vi: "Có A, cũng có cả B",
    form: "NもVば...NもVる",
    usage: "Liệt kê đa dạng các thành phần.",
    examples: [
      { j: "どこの国の人でもいい人もいれば、悪い人もいる。", v: "Nước nào cũng có người tốt người xấu。" },
      { j: "日本料理は美味しいものもあれば、まずいものもある。", v: "Món Nhật có món ngon cũng có món dở。" }
    ]
  },
  {
    id: 96,
    title: "全く...ない",
    vi: "Hoàn toàn không",
    form: "全く+V/A phủ định",
    usage: "Phủ định tuyệt đối.",
    examples: [
      { j: "あの説明は全くわからない。", v: "Lời giải thích đó hoàn toàn không hiểu gì。" },
      { j: "彼はスポーツに全く興味がない。", v: "Anh ta hoàn toàn không hứng thú thể thao。" }
    ]
  },
  {
    id: 97,
    title: "少しも...ない",
    vi: "Một chút cũng không",
    form: "少しも+V/A phủ định",
    usage: "Phủ định nhấn mạnh dù một chút cũng không.",
    examples: [
      { j: "昨日運動しても少しも疲れない。", v: "Hôm qua vận động mà chả mệt chút nào。" },
      { j: "その話は少しもわからない。", v: "Câu chuyện đó tôi một chút cũng không hiểu。" }
    ]
  },
  {
    id: 98,
    title: "そんなに...ない",
    vi: "Không... đến thế đâu",
    form: "そんなに+V/A phủ định",
    usage: "Mức độ không như tưởng tượng.",
    examples: [
      { j: "thisテストはそんなに難しくない。", v: "Bài test này không khó đến mức đó đâu。" },
      { j: "この店の価格はそんなに高くない。", v: "Giá tiệm này không đắt đến thế。" }
    ]
  },
  {
    id: 99,
    title: "決して...ない",
    vi: "Tuyệt đối không",
    form: "決して+V/A phủ định",
    usage: "Quyết tâm hoặc cấm đoán mạnh.",
    examples: [
      { j: "彼は決して諦めない。", v: "Anh ấy tuyệt đối không bỏ cuộc。" },
      { j: "私はその日を決して忘れない。", v: "Tôi tuyệt đối không quên ngày hôm đó。" }
    ]
  },
  {
    id: 100,
    title: "めったに...ない",
    vi: "Hiếm khi, ít khi",
    form: "めったに+Vない",
    usage: "Tần suất xảy ra cực kỳ thấp.",
    examples: [
      { j: "彼とはめったに会わない。", v: "Tôi rất hiếm khi gặp anh ta。" },
      { j: "この部屋はめったに使わない。", v: "Phòng này hiếm khi được dùng tới。" }
    ]
  },
  {
    id: 101,
    title: "すでに",
    vi: "Đã... rồi (Formal)",
    form: "すでに+Vた/Vている/Vてある",
    usage: "Trạng thái đã hoàn tất từ trước (văn viết của もう).",
    examples: [
      { j: "桜はすでに咲いた。", v: "Hoa anh đào đã nở rồi。" },
      { j: "この事件はすでに新聞に載ってある。", v: "Vụ án đã được đăng trên báo rồi。" }
    ]
  },
  {
    id: 102,
    title: "少しずつ",
    vi: "Từng chút một",
    form: "少しずつ+V",
    usage: "Sự thay đổi diễn ra từ từ, dần dần.",
    examples: [
      { j: "彼の日本語は少しずつ進んでいる。", v: "Tiếng Nhật của anh ấy đang tiến bộ từng chút một。" },
      { j: "体重が少しずつ減っています。", v: "Cân nặng đang giảm từng chút một。" }
    ]
  },
  {
    id: 103,
    title: "次第に",
    vi: "Dần dần, từ từ",
    form: "次第に+V(thay đổi)",
    usage: "Quá trình biến đổi theo thời gian (văn viết của だんだん).",
    examples: [
      { j: "病気は次第に良くなっています。", v: "Bệnh đang dần dần tốt lên。" },
      { j: "参加者の数が次第に増えています。", v: "Số lượng người tham gia đang dần tăng lên。" }
    ]
  },
  {
    id: 104,
    title: "ますます",
    vi: "Ngày càng...",
    form: "ますます+V/A",
    usage: "Mức độ tăng lên mạnh mẽ hơn trước.",
    examples: [
      { j: "彼は運動してますます元気になった。", v: "Anh ấy tập thể thao nên ngày càng khỏe。" },
      { j: "この問題はますます難しくなっている。", v: "Vấn đề này ngày càng trở nên phức tạp。" }
    ]
  },
  {
    id: 105,
    title: "そのうち",
    vi: "Sớm muộn gì cũng, chẳng mấy chốc",
    form: "そのうち+V",
    usage: "Trong thời gian ngắn sắp tới sẽ xảy ra.",
    examples: [
      { j: "この意味はそのうちわかるでしょう。", v: "Ý nghĩa này rồi sớm muộn cậu cũng hiểu thôi。" },
      { j: "新しい仕事にはそのうち慣れるよ。", v: "Công việc mới chẳng mấy chốc sẽ quen thôi。" }
    ]
  },
  {
    id: 106,
    title: "今に",
    vi: "Sắp, chẳng mấy chốc",
    form: "今に+V",
    usage: "Dự đoán sự việc sắp xảy ra trong tương lai gần.",
    examples: [
      { j: "君も今にわかるだろう。", v: "Rồi cậu cũng sẽ sớm hiểu ra thôi。" },
      { j: "彼は今に来るでしょう。", v: "Anh ấy chắc sắp đến rồi。" }
    ]
  },
  {
    id: 107,
    title: "もしかすると/もしかしたら",
    vi: "Biết đâu, có thể là",
    form: "もしかすると+Mệnh đề+かもしれない",
    usage: "Suy đoán với độ xác suất thấp (khoảng 30-50%).",
    examples: [
      { j: "空が暗くなってきた。もしかすると雨が降るかもしれない。", v: "Trời tối rồi. Biết đâu có thể sẽ mưa。" },
      { j: "もしかしたら彼は来るのではないか。", v: "Biết đâu có thể anh ấy sẽ đến？" }
    ]
  },
  {
    id: 108,
    title: "おそらく",
    vi: "Có lẽ, e rằng",
    form: "おそらく+Mệnh đề+だろう",
    usage: "Suy đoán với xác suất khá cao (70-80%).",
    examples: [
      { j: "天気がいいから、おそらく彼は来るだろう。", v: "Thời tiết đẹp nên có lẽ anh ấy sẽ đến。" },
      { j: "おそらくそれは間違いだと思う。", v: "Có lẽ cái đó là sai sót rồi。" }
    ]
  },
  {
    id: 109,
    title: "どうも",
    vi: "Hình như, có vẻ",
    form: "どうも+Mệnh đề+ようだ/らしい",
    usage: "Cảm giác, linh cảm của người nói nhưng chưa chắc chắn.",
    examples: [
      { j: "電話もないし、どうも彼は来ないようだ。", v: "Không thấy gọi, có vẻ anh ta không đến rồi。" },
      { j: "どうも計算が間違っているようだ。", v: "Hình như tính toán bị sai ở đâu đó。" }
    ]
  },
  {
    id: 110,
    title: "今にも...そうだ",
    vi: "Sắp sửa... đến nơi",
    form: "今にも+Vます bỏ ます+そうだ",
    usage: "Trạng thái sắp xảy ra ngay lập tức trước mắt.",
    examples: [
      { j: "空が暗くなってきた。今にも雨が降りそうだ。", v: "Trời tối. Trông có vẻ sắp mưa đến nơi rồi。" },
      { j: "彼は疲れていて、今にも倒れそうだ。", v: "Anh ta mệt, trông sắp ngất đến nơi rồi。" }
    ]
  },
  {
    id: 111,
    title: "まるで...ようだ",
    vi: "Cứ như là...",
    form: "まるで+Nの/V+ようだ",
    usage: "Ví von, so sánh 2 vật khác nhau.",
    examples: [
      { j: "その景色はまるで夢のようだ。", v: "Cảnh sắc đó đẹp cứ như một giấc mơ。" },
      { j: "彼はまるで子供のように遊んでいる。", v: "Anh ta đang chơi cứ như một đứa trẻ。" }
    ]
  },
  {
    id: 112,
    title: "ちょうど",
    vi: "Vừa vặn, vừa đúng",
    form: "ちょうど+A/N",
    usage: "Khớp hoàn hảo về thời gian, kích thước.",
    examples: [
      { j: "thisシャツはちょうどいいサイズだ。", v: "Cái áo này size vừa khít。" },
      { j: "ちょうどいい時間みたいだから、今出発しましょう。", v: "Thời gian vừa đẹp đấy, xuất phát thôi。" }
    ]
  },
  {
    id: 113,
    title: "ぜひ/なんとかして",
    vi: "Nhất định, bằng mọi giá",
    form: "ぜひ/なんとかして+Vてほしい/たい",
    usage: "Mong muốn mạnh mẽ, nhờ vả khẩn thiết.",
    examples: [
      { j: "ぜひ私に電話してください。", v: "Nhất định hãy gọi điện cho tôi nhé。" },
      { j: "なんとかしてこの人を探して欲しい。", v: "Bằng mọi giá tôi muốn tìm được người này。" }
    ]
  },
  {
    id: 114,
    title: "どうか",
    vi: "Làm ơn, mong rằng",
    form: "どうか+Vて/Vないでください",
    usage: "Cầu xin tha thiết, mong mỏi.",
    examples: [
      { j: "どうか私の失敗を許してください。", v: "Làm ơn hãy tha thứ cho lỗi lầm của tôi。" },
      { j: "いい方法があるなら、どうか教えて欲しい。", v: "Nếu có cách tốt, xin làm ơn chỉ cho tôi。" }
    ]
  },
  {
    id: 115,
    title: "もししも/万一",
    vi: "Giả sử, nhỡ chả may",
    form: "もしも/万一+Vば/たら",
    usage: "Đưa ra tình huống giả định (đặc biệt là tình huống xấu).",
    examples: [
      { j: "もしも雨が降ったら、ピクニックは中止です。", v: "Nhỡ mà trời mưa thì hủy picnic。" },
      { j: "万一事故が起きたら、すぐに警察に連絡してください。", v: "Chả may có tai nạn thì hãy gọi cảnh sát ngay。" }
    ]
  },
  {
    id: 116,
    title: "どんなに/いくら/たとえ",
    vi: "Dù... đến mức nào",
    form: "どんなに/いくら+Vても",
    usage: "Giả định nhượng bộ dù mức độ/số lượng có cao đến đâu.",
    examples: [
      { j: "どんなに頑張っても、結果が変わらない。", v: "Dù cố gắng đến đâu kết quả cũng không đổi。" },
      { j: "いくら好きでも、もう会えない。", v: "Dù thích đến mấy cũng không thể gặp nữa。" }
    ]
  },
  {
    id: 117,
    title: "せっかく",
    vi: "Đã cất công, đã trót",
    form: "せっかく+Vたのに/Vたから",
    usage: "Sự tiếc nuối khi nỗ lực bị uổng phí, hoặc tranh thủ cơ hội hiếm.",
    examples: [
      { j: "せっかく来たのに、彼は家にいなかった。", v: "Cất công đến tận nơi mà anh ta không có nhà。" },
      { j: "せっかく作っても、誰も食べなかった。", v: "Cất công nấu mà chả ai ăn。" }
    ]
  },
  {
    id: 118,
    title: "ただ...だけ",
    vi: "Chỉ, đơn thuần chỉ là",
    form: "ただ+N/V+だけ",
    usage: "Giới hạn, không có gì khác ngoài điều đó.",
    examples: [
      { j: "医者は「ただの風邪です」と言った。", v: "Bác sĩ bảo chỉ là cảm cúm thông thường thôi。" },
      { j: "店内を見ている客に「ただ見ているだけです」と言われた。", v: "Khách bảo 'tôi chỉ đang xem thôi'。" }
    ]
  },
  {
    id: 119,
    title: "Vかけ",
    vi: "Đang làm dở...",
    form: "Vます bỏ ます+かけ/かける",
    usage: "Hành động đang diễn ra giữa chừng, chưa hoàn tất.",
    examples: [
      { j: "お風呂に入りかけた時に電話が鳴った。", v: "Đúng lúc đang dở tắm thì điện thoại reo。" },
      { j: "母に食べかけのりんごを捨てられてしまった。", v: "Mẹ vứt mất quả táo tôi đang ăn dở。" }
    ]
  },
  {
    id: 120,
    title: "Vきる",
    vi: "Làm hết sạch, hoàn tất",
    form: "Vます bỏ ます+きる/きれる",
    usage: "Hoàn thành trọn vẹn, không còn sót lại.",
    examples: [
      { j: "この本は2日間で読み切った。", v: "Tôi đã đọc xong sạch cuốn sách này trong 2 ngày。" },
      { j: "お金を使いきってしまった。", v: "Tiêu sạch sành sanh tiền rồi。" }
    ]
  },
  {
    id: 121,
    title: "Vとおす",
    vi: "Làm đến cùng",
    form: "Vます bỏ ます+とおす",
    usage: "Nỗ lực thực hiện việc gì đó từ đầu đến cuối không bỏ cuộc.",
    examples: [
      { j: "やると決めたことは最後までやり通す。", v: "Đã quyết định làm thì sẽ làm đến cùng。" },
      { j: "諦めないで、ゴールまで走り通した。", v: "Không bỏ cuộc, tôi đã chạy một mạch tới đích。" }
    ]
  },
  {
    id: 122,
    title: "Vだす",
    vi: "Bắt đầu, đột nhiên",
    form: "Vます bỏ ます+だす",
    usage: "Hành động diễn ra một cách bất ngờ, đột ngột.",
    examples: [
      { j: "赤ちゃんが急に泣き出した。", v: "Em bé đột nhiên khóc òa lên。" },
      { j: "急に空が暗くなって、雨が降り出した。", v: "Trời đột nhiên tối sầm và bắt đầu đổ mưa。" }
    ]
  },
  {
    id: 123,
    title: "Vづらい",
    vi: "Khó (cảm giác)",
    form: "Vます bỏ ます+づらい",
    usage: "Cảm thấy khó khăn về mặt tâm lý hoặc thể chất.",
    examples: [
      { j: "個人的なことだから、同僚に頼みづらい。", v: "Vì là việc cá nhân nên rất khó nhờ đồng nghiệp。" },
      { j: "歯が痛くて、食べづらい。", v: "Đau răng quá nên khó ăn。" }
    ]
  },
  {
    id: 124,
    title: "だらけ",
    vi: "Toàn là (nghĩa tiêu cực)",
    form: "N+だらけ",
    usage: "Phủ đầy bề mặt bởi những thứ không tốt (rác, bùn, nợ).",
    examples: [
      { j: "彼の部屋はゴミだらけだ。", v: "Phòng của anh ta toàn là rác。" },
      { j: "私は借金だらけだ。", v: "Tôi ngập đầu trong nợ nần toàn là nợ。" }
    ]
  }
];
