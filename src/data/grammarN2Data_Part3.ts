import { GrammarN2Item } from "./grammarN2Data";

export const GRAMMAR_N2_PART3: GrammarN2Item[] = [
  // ========== BÀI 15 (72〜77) ==========
  {
    id: 72,
    pattern: "〜としたら・〜とすれば・〜とすると・〜となったら・〜となれば・〜となると",
    meaning: "Nếu giả sử là... / Nếu trường hợp đó xảy ra thì...",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "普通形 ＋ としたら / とすれば / とすると",
      "N / 普通形 ＋ となったら / となれば / となると"
    ],
    nuance: "Diễn tả giả định: Giả sử trường hợp/điều kiện đó xảy ra thì vế sau sẽ đưa ra suy luận, phán đoán hay cách xử lý tương ứng.",
    ruleConstraints: [
      "[Phân biệt]: 〜としたら・とすれば・とすると mang ý nghĩa giả định thuần túy. 〜となったら・となれば・となると dùng khi điều kiện có khả năng cao thành hiện thực.",
      "[Đặc điểm]: Vế sau của 〜とすると / 〜となると KHÔNG đi kèm câu biểu thị ý chí, hy vọng hay mệnh lệnh."
    ],
    examples: [
      { jp: "無人島に何か一つだけ持っていけるとしたら、何を持っていきたいですか。", vn: "Nếu giả sử chỉ được mang một thứ duy nhất lên đảo hoang thì bạn muốn mang theo thứ gì?" },
      { jp: "もし、あの飛行機に乗っていたとしたら、今ごろもうこの世にいなかった。", vn: "Nếu giả sử tôi mà lên chuyến bay đó thì có lẽ giờ này đã không còn trên đời nữa." },
      { jp: "彼が犯人ではないとすると、どこかに本物の犯人がいるはずだ。", vn: "Nếu giả sử anh ta không phải là thủ phạm thì chắc chắn phải có thủ phạm thực sự ở đâu đó." },
      { jp: "物価が上がるとすれば、今後の生活はますます大変になるだろう。", vn: "Nếu giá cả tăng lên thì cuộc sống từ nay về sau sẽ ngày càng vất vả hơn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "生まれ変われる（　　）、鳥になりたい。",
        options: ["としたら", "ものなら", "ことには", "としても"],
        correctIndex: 0,
        explanation: "Nếu giả sử được sinh ra một lần nữa -> としたら."
      }
    ]
  },
  {
    id: 73,
    pattern: "〜ものなら",
    meaning: "Nếu có thể... thì (rất muốn làm)",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "V（辞書形 - Thể khả năng） ＋ ものなら"
    ],
    nuance: "Giả định một việc khó hoặc gần như không thể thực hiện được để bày tỏ mong muốn tha thiết được thực hiện nó.",
    ruleConstraints: [
      "[Vế sau]: Thường là câu thể hiện mong muốn (〜たい) hay nguyện vọng tha thiết. Cũng có thể dùng mang sắc thái khiêu khích đối phương."
    ],
    examples: [
      { jp: "戻れるものなら20年前のわたしに戻って人生をやり直したい。", vn: "Nếu có thể quay trở lại thì tôi muốn quay lại là tôi của 20 năm trước để làm lại cuộc đời." },
      { jp: "あの日の出来事を忘れられるものなら忘れたいのに……。", vn: "Nếu có thể quên được sự việc ngày hôm đó thì tôi rất muốn quên, vậy mà..." },
      { jp: "やれるものならやってみろ。", vn: "Nếu làm được thì làm thử xem nào!" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "行ける（　　）、今すぐ宇宙旅行に行きたい。",
        options: ["ものなら", "としたら", "ことには", "抜きにしては"],
        correctIndex: 0,
        explanation: "V-khả năng + ものなら: Nếu mà có thể đi được thì rất muốn đi ngay -> ものなら."
      }
    ]
  },
  {
    id: 74,
    pattern: "〜（よう）ものなら",
    meaning: "Nếu lỡ... thì sẽ dẫn đến hậu quả nghiêm trọng",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "V（意向形 - Thể ý chí） ＋ ものなら"
    ],
    nuance: "Giả định nếu lỡ xảy ra một hành động/sự việc không tốt thì lập tức sẽ kéo theo một hậu quả rất xấu, nguy hiểm hoặc tai hại ở vế sau.",
    ruleConstraints: [
      "[Hậu quả]: Vế sau luôn diễn tả kết quả tiêu cực, tồi tệ hoặc cực kỳ nguy hiểm, nghiêm trọng."
    ],
    examples: [
      { jp: "わたしはアレルギー体質なので、合わない食べ物を食べようものなら、体があちこちかゆくなる。", vn: "Tôi có cơ địa dị ứng nên nếu lỡ ăn phải đồ ăn không hợp thì khắp cơ thể sẽ bị ngứa ngáy." },
      { jp: "手術の最中に少しでも手を滑らせようものなら、患者は命を落とす。", vn: "Trong lúc phẫu thuật nếu lỡ trượt tay dù chỉ một chút thì bệnh nhân sẽ mất mạng." },
      { jp: "山で道に迷おうものなら、命が危ない。", vn: "Nếu lỡ bị lạc đường trên núi thì tính mạng sẽ bị đe dọa." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "大事な秘密を漏ら（　　）ものなら、クビになる。",
        options: ["そう", "す", "した", "さない"],
        correctIndex: 0,
        explanation: "Thể ý chí: 漏らそう + ものなら (Nếu lỡ làm lộ bí mật thì sẽ bị đuổi việc)."
      }
    ]
  },
  {
    id: 75,
    pattern: "〜ないことには",
    meaning: "Nếu chưa... thì không thể...",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "V-ない ＋ ことには"
    ],
    nuance: "Diễn tả điều kiện bắt buộc: Phải thực hiện hành động ở vế trước thì mới có thể tiến hành hoặc đạt được kết quả ở vế sau.",
    ruleConstraints: [
      "[Vế sau]: Vế sau luôn đi kèm với câu mang ý nghĩa phủ định hoặc bất khả năng (〜言えない, 〜できない...)."
    ],
    examples: [
      { jp: "まず本人に会ってみよう。会ってみないことには何とも言えない。", vn: "Trước tiên hãy gặp trực tiếp người đó đã. Nếu chưa gặp thì chưa thể nói được điều gì." },
      { jp: "今はお金の余裕がない。お金がないことにはこの計画は実行できない。", vn: "Bây giờ không dư dả tiền bạc. Nếu không có tiền thì kế hoạch này không thể thực hiện được." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "実際に使ってみ（　　）、良さがわからない。",
        options: ["ないことには", "たものなら", "としたら", "としても"],
        correctIndex: 0,
        explanation: "Nếu chưa dùng thử thực tế thì không thể hiểu được cái hay -> V-ない + ことには."
      }
    ]
  },
  {
    id: 76,
    pattern: "〜を抜きにしては",
    meaning: "Nếu bỏ qua / không có... thì không thể...",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "N ＋ を抜きにしては"
    ],
    nuance: "Nhấn mạnh vai trò quan trọng của N: Nếu không có hoặc bỏ qua yếu tố N thì sự việc/kết quả ở vế sau hoàn toàn không thể thực hiện hay thành công.",
    ruleConstraints: [
      "[Vế sau]: Vế sau luôn là câu biểu thị sự phủ định hoặc khẳng định không thể diễn ra/không thể thành công."
    ],
    examples: [
      { jp: "田中さんは有能な協力者だ。田中さんを抜きにしては、この仕事は成功しない。", vn: "Anh Tanaka là một người hợp tác có năng lực. Nếu không có anh Tanaka thì công việc này không thể thành công." },
      { jp: "国の援助を打ち切られた。国の援助を抜きにしては、研究は進められない。", vn: "Sự viện trợ của nhà nước đã bị cắt. Nếu không có sự viện trợ của nhà nước thì nghiên cứu không thể tiến hành được." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "皆さんの協力（　　）、このイベントは成功しなかった。",
        options: ["を抜きにしては", "をめぐって", "に基づいて", "に沿って"],
        correctIndex: 0,
        explanation: "Nếu không có sự hợp tác của mọi người thì sự kiện không thể thành công -> N + を抜きにしては."
      }
    ]
  },
  {
    id: 77,
    pattern: "〜としても・〜にしても・〜にせよ・〜にしろ",
    meaning: "Cho dù... đi chăng nữa thì...",
    topicId: 15,
    topicName: "Bài 15: もしそうなら・たとえそうでも",
    connection: [
      "普通形 ＋ としても",
      "N / 普通形（な形［だ］・N［だ］） ＋ にしても / にせよ / にしろ"
    ],
    nuance: "Diễn tả sự nhượng bộ: Cho dù sự việc ở vế trước có là sự thật hay xảy ra đi chăng nữa thì đánh giá, cảm xúc hay phán đoán ở vế sau vẫn không thay đổi.",
    ruleConstraints: [
      "[Văn phong]: 〜にせよ / 〜にしろ mang tính chất văn phong viết, thể hiện sự nhượng bộ trang trọng (硬い言い方)."
    ],
    examples: [
      { jp: "この薬を信じている。完全に治るのは無理としても、今より良くなるだろう。", vn: "Tôi tin vào liều thuốc này. Cho dù việc chữa khỏi hoàn toàn là không thể đi chăng nữa thì chắc cũng sẽ tốt hơn bây giờ." },
      { jp: "彼が忙しいのはわかる。しかし、いくら忙しいにせよ、出欠の返事を出すくらいできるはずだ。", vn: "Tôi hiểu là anh ấy bận. Tuy nhiên, cho dù có bận đến mấy đi chăng nữa thì việc gửi thư phản hồi có mặt hay vắng mặt chắc chắn vẫn làm được chứ." },
      { jp: "あしたの天気はどうだろうか。雨が降るとしても、大雨ではないだろう。", vn: "Thời tiết ngày mai thế nào nhỉ? Cho dù có mưa đi chăng nữa thì chắc cũng không mưa to đâu." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "いくら忙しい（　　）、連絡くらいはすべきだ。",
        options: ["にせよ", "ものなら", "ことには", "抜きにしては"],
        correctIndex: 0,
        explanation: "Cho dù bận rộn đến đâu đi nữa thì ít nhất cũng phải liên lạc -> にせよ / にしても."
      }
    ]
  },

  // ========== BÀI 16 (78〜82) ==========
  {
    id: 78,
    pattern: "〜によって",
    meaning: "Do... / Vì... nên (dẫn đến kết quả/hậu quả)",
    topicId: 16,
    topicName: "Bài 16: 〜だから・理由①",
    connection: [
      "N ＋ によって / により",
      "N ＋ による ＋ N"
    ],
    nuance: "Dùng để diễn tả nguyên nhân, lý do trực tiếp gây ra một sự việc, biến cố hoặc hậu quả (thường mang tính khách quan). Là phong cách biểu đạt trang trọng, văn viết, báo chí hoặc thông báo.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Không đi kèm với các câu biểu thị mong muốn, ý chí hay mệnh lệnh của người nói ở vế sau."
    ],
    examples: [
      { jp: "今年のインフルエンザは、予防注射の普及によって、大流行は免れた。", vn: "Cúm năm nay do sự phổ biến của việc tiêm phòng nên đã tránh được trận dịch lớn." },
      { jp: "不注意によって引き起こされた事故の犠牲者は、かなりの数に上った。", vn: "Số lượng nạn nhân của tai nạn gây ra do sự bất chú ý đã lên tới một con số khá lớn." },
      { jp: "事故によってダイヤが大幅に乱れ、多くの通勤客に影響が出た。", vn: "Do tai nạn, lịch trình chạy tàu bị xáo trộn lớn, gây ảnh hưởng đến nhiều hành khách đi làm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "台風（　　）甚大な被害が出た。",
        options: ["によって", "のもとで", "に沿って", "をめぐって"],
        correctIndex: 0,
        explanation: "Do bão gây ra thiệt hại to lớn -> N + によって."
      }
    ]
  },
  {
    id: 79,
    pattern: "〜ものだから・〜もので・〜もの",
    meaning: "Vì... / Tại vì... (dùng khi viện lý do, bào chữa)",
    topicId: 16,
    topicName: "Bài 16: 〜だから・理由①",
    connection: [
      "V / い形 / な形-な / N-な（普通形） ＋ ものだから / もので",
      "V / い形 / な形-な / N-な（普通形） ＋ もの / もん (Giao tiếp)"
    ],
    nuance: "Dùng khi đưa ra lý do, phân bua, bào chữa hoặc giải thích cho một sự việc ngoài ý muốn, lỗi lầm hay sự chậm trễ của bản thân. Mang sắc thái thanh minh, mong đối phương cảm thông.",
    ruleConstraints: [
      "[Giao tiếp thân mật]: 「〜もの」 thường được nữ giới và trẻ em dùng ở cuối câu (có thể biến thành 「〜もん」).",
      "[Vế sau]: Không dùng câu thể hiện mệnh lệnh hay rủ rê."
    ],
    examples: [
      { jp: "すみません。途中で事故があったものだから、遅れてしまいました。", vn: "Xin lỗi anh. Tại vì giữa đường xảy ra tai nạn nên tôi mới bị đến muộn." },
      { jp: "この本、すごく面白かったもので、一気に読んじゃいました。", vn: "Tại vì cuốn sách này hay quá nên tôi đã đọc liền một mạch hết luôn." },
      { jp: "だって、知らなかったんだもの、仕方がないじゃない。", vn: "Nhưng mà tại em đâu có biết đâu, làm sao mà khác được cơ chứ!" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "道が混んでいた（　　）、遅刻してしまいました。",
        options: ["ものだから", "ばかりに", "だけに", "あまり"],
        correctIndex: 0,
        explanation: "Thanh minh lý do đi muộn do tắc đường -> ものだから."
      }
    ]
  },
  {
    id: 80,
    pattern: "〜おかげだ／〜せいだ",
    meaning: "おかげだ: Nhờ có... mà (kết quả tốt) | せいだ: Tại vì/Do... mà (kết quả xấu)",
    topicId: 16,
    topicName: "Bài 16: 〜だから・理由①",
    connection: [
      "V / い形 / な形-な / N-の（普通形） ＋ おかげだ / おかげで / おかげの",
      "V / い形 / な形-な / N-の（普通形） ＋ せいだ / せいで / せいの"
    ],
    nuance: "• おかげだ: Bày tỏ sự biết ơn, may mắn khi một nguyên nhân dẫn đến kết quả tích cực, tốt đẹp.\n• せいだ: Bày tỏ sự đổ lỗi, trách móc hay nuối tiếc khi một nguyên nhân dẫn đến kết quả tiêu cực, tồi tệ.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Cả hai vế sau đều không đi kèm với câu thể hiện ý chí, mệnh lệnh hay rủ rê của người nói."
    ],
    examples: [
      { jp: "わたしが東西大学に合格できたのは、山川先生のおかげです。ありがとうございました。", vn: "Tôi có thể đỗ vào đại học Tozai là nhờ có thầy Yamakawa. Xin cảm ơn thầy rất nhiều." },
      { jp: "佐藤さんが丁寧にチェックしてくださったおかげで、いいレポートができました。", vn: "Nhờ anh Sato kiểm tra giúp cẩn thận mà tôi đã hoàn thành một bài báo cáo tốt." },
      { jp: "いい天気が続いているおかげで、工事が思ったより早く進んでいます。", vn: "Nhờ thời tiết tốt kéo dài mà công trình đang tiến triển nhanh hơn dự tính." },
      { jp: "父は最近口数が少ない。疲れているせいかもしれない。", vn: "Bố dạo này ít nói. Có lẽ là do mệt mỏi cũng nên." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "先生のご指導の（　　）、無事に合格できました。",
        options: ["おかげで", "せいで", "あまり", "つき"],
        correctIndex: 0,
        explanation: "Nhờ sự chỉ bảo tận tình của thầy giáo mà đỗ (kết quả tốt) -> おかげで."
      }
    ]
  },
  {
    id: 81,
    pattern: "〜あまり・あまりの〜に",
    meaning: "Vì quá... nên (dẫn đến kết quả bất thường/không kiểm soát được)",
    topicId: 16,
    topicName: "Bài 16: 〜だから・理由①",
    connection: [
      "N-の / V（普通形肯定） / な形-な ＋ あまり",
      "あまりの ＋ N ＋ に / で"
    ],
    nuance: "Diễn tả trạng thái cảm xúc hoặc mức độ (lo lắng, vui mừng, tức giận, ngạc nhiên...) vượt quá giới hạn thông thường, dẫn đến một hành động hay kết quả không bình thường/ngoài dự tính.",
    ruleConstraints: [
      "[Cảm xúc & Vế sau]: Thường đi kèm với các danh từ hoặc động từ chỉ cảm xúc, tâm trạng. Vế sau không dùng câu thể hiện mong muốn hay tác động của người nói."
    ],
    examples: [
      { jp: "自分の番が近づいてきたとき、わたしは緊張のあまり頭の中が真っ白になってしまった。", vn: "Khi lượt của mình đến gần, vì quá căng thẳng mà đầu óc tôi trở nên trống rỗng." },
      { jp: "当然勝つと思っていた試合で最後に逆転負けし、悔しさのあまりぼろぼろ泣いた。", vn: "Trận đấu vốn nghĩ là đương nhiên thắng lại bị lội ngược dòng thua ở phút cuối, vì quá tiếc nuối mà tôi khóc nức nở." },
      { jp: "仕事を早く片付けようと急ぐあまり、いくつかミスをしてしまった。", vn: "Vì quá vội vã muốn giải quyết xong công việc sớm mà tôi đã mắc phải một vài lỗi sai." },
      { jp: "10年ぶりに兄に会った。兄のあまりの変化に言葉が出なかった。", vn: "Sau 10 năm mới gặp lại anh trai. Vì sự thay đổi quá lớn của anh mà tôi không thốt lên lời." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "驚きの（　　）、声も出なかった。",
        options: ["あまり", "せいで", "おかげで", "つき"],
        correctIndex: 0,
        explanation: "Vì quá đỗi kinh ngạc nên không thốt nên lời -> 緊張/驚きの + あまり."
      }
    ]
  },
  {
    id: 82,
    pattern: "〜につき",
    meaning: "Vì lý do... (thông báo / niêm yết)",
    topicId: 16,
    topicName: "Bài 16: 〜だから・理由①",
    connection: [
      "N ＋ につき"
    ],
    nuance: "Dùng trong các bảng thông báo, văn bản, biển hiệu chính thức để nêu rõ nguyên nhân, lý do của một trạng thái, quy định hay sự tạm dừng hoạt động.",
    ruleConstraints: [
      "[Văn phong]: Ngữ pháp mang tính văn phong viết, thông báo công khai (硬い言い方・書き言葉)."
    ],
    examples: [
      { jp: "トイレはただ今清掃中につき、ご利用になれません。", vn: "Nhà vệ sinh hiện do đang dọn dẹp nên không thể sử dụng." },
      { jp: "強風につき、この門は閉鎖中です。", vn: "Do gió mạnh nên cổng này hiện đang đóng." },
      { jp: "本日は祝日につき、閉鎖しております。", vn: "Hôm nay do là ngày lễ nên chúng tôi xin phép đóng cửa." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "工事中（　　）、通り抜けできません。",
        options: ["につき", "あまり", "せいで", "おかげで"],
        correctIndex: 0,
        explanation: "Biển báo thông báo lý do (Do đang thi công) -> N + につき."
      }
    ]
  },

  // ========== BÀI 17 (83〜87) ==========
  {
    id: 83,
    pattern: "〜ことだし",
    meaning: "Vì... (nên làm gì đó)",
    topicId: 17,
    topicName: "Bài 17: 〜だから・理由②",
    connection: [
      "普通形（な形-な／-である, N-の／-である） ＋ ことだし"
    ],
    nuance: "Diễn tả ý nghĩa: Đưa ra một lý do tiêu biểu trong số nhiều lý do để đưa ra phán đoán, đề xuất, rủ rê hay quyết định thực hiện hành động ở vế sau.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau thường là câu thể hiện sự rủ rê, đề xuất, ý chí hay mệnh lệnh nhẹ nhàng."
    ],
    examples: [
      { jp: "雨もやんだことだし、ちょっとジョギングしてこようかな。", vn: "Vì trời cũng đã tạnh mưa rồi nên chắc tôi đi chạy bộ một chút nhỉ." },
      { jp: "日曜日に友達が来ることだし、家の中の大掃除をしなくちゃ。", vn: "Vì chủ nhật bạn sẽ đến chơi nên phải tổng vệ sinh nhà cửa thôi." },
      { jp: "こちらはお値段も安いことですし、お一ついかがでしょうか。", vn: "Sản phẩm này giá cũng rẻ nữa, quý khách lấy thử một cái xem sao ạ?" },
      { jp: "あしたは佐藤さんも休みとのことだし、みんなで買い物でも行かない？", vn: "Nghe nói ngày mai anh Sato cũng được nghỉ nữa, hay mọi người cùng đi mua sắm nhé?" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "天気もいい（　　）、散歩にでも行きませんか。",
        options: ["ことだし", "ばかりに", "だけに", "からには"],
        correctIndex: 0,
        explanation: "Vì thời tiết cũng đẹp nên rủ rê đi dạo -> ことだし."
      }
    ]
  },
  {
    id: 84,
    pattern: "〜のことだから",
    meaning: "Vì là (người như)... nên chắc chắn...",
    topicId: 17,
    topicName: "Bài 17: 〜だから・理由②",
    connection: [
      "N（Danh từ chỉ người/đối tượng） ＋ のことだから / のことだ"
    ],
    nuance: "Dùng khi đưa ra phán đoán hoặc suy đoán về hành động/kết quả của một người dựa trên tính cách, thói quen hay thái độ đã biết rõ của người đó.",
    ruleConstraints: [
      "[Danh từ đi trước & Vế sau]: Danh từ đi trước luôn là từ chỉ người mà người nói hiểu rõ tính cách/đặc điểm. Vế sau là suy đoán (きっと〜だろう, 〜と思う)."
    ],
    examples: [
      { jp: "頑張り屋のミドリさんのことだから、きっと今度のテストでもいい点をとりますよ。", vn: "Vì là người luôn nỗ lực như cô Midori nên chắc chắn bài kiểm tra tới cô ấy cũng sẽ đạt điểm cao thôi." },
      { jp: "いつもみんなを笑わせているタンさんのことだから、国に帰ってもまた人気者になると思うよ。", vn: "Vì là người lúc nào cũng làm mọi người cười như anh Tan nên tôi nghĩ dù có về nước anh ấy lại trở thành người được yêu thích thôi." },
      { jp: "太郎の帰りが遅いね。でも、あの子のことだ。どこかの本屋で立ち読みでもして時間の経つのを忘れているんだろう。", vn: "Taro về muộn nhỉ. Nhưng vì là tính thằng bé đó nên chắc lại đang mải đọc cọp ở hiệu sách nào đó mà quên cả thời gian thôi." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "真面目な彼（　　）、きっと約束を守るはずだ。",
        options: ["のことだから", "だけに", "ばかりに", "からには"],
        correctIndex: 0,
        explanation: "Vì là người nghiêm túc như anh ấy -> N + のことだから."
      }
    ]
  },
  {
    id: 85,
    pattern: "〜だけに",
    meaning: "Chính vì... nên càng... / Do... nên mức độ lại càng...",
    topicId: 17,
    topicName: "Bài 17: 〜だから・理由②",
    connection: [
      "N / 普通形（な形-な／-である, N-である） ＋ だけに"
    ],
    nuance: "Diễn tả ý nghĩa: Chính vì có lý do/nguyên nhân đặc biệt ở vế trước nên kết quả hay cảm xúc ở vế sau lại càng trở nên tương ứng hoặc vượt hơn mức thông thường.",
    ruleConstraints: [
      "[Tỉ lệ thuận]: Vế sau diễn tả cảm xúc, phán đoán hay kết quả có mức độ tỉ lệ thuận hoặc càng sâu sắc hơn với vế trước."
    ],
    examples: [
      { jp: "あそこは有名レストランだけに、客に出した料理に虫が入っていたとなると大きなニュースになった。", vn: "Chính vì đó là nhà hàng nổi tiếng nên việc trong món ăn phục vụ khách có sâu đã trở thành một tin tức lớn." },
      { jp: "彼は絵が大好きなだけに、賞をもらうと大変喜ぶ。", vn: "Chính vì anh ấy rất thích vẽ tranh nên khi nhận được giải thưởng anh ấy cực kỳ vui mừng." },
      { jp: "彼はよく働く人だっただけに、いなくなった後、いっそう寂しさを感じる。", vn: "Chính vì anh ấy là người chăm chỉ nên sau khi anh ấy nghỉ việc, mọi người lại càng cảm thấy cô đơn hơn." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "期待が大きかった（　　）、不合格のショックも大きかった。",
        options: ["だけに", "ばかりに", "ことだし", "からには"],
        correctIndex: 0,
        explanation: "Chính vì kỳ vọng càng lớn nên cú sốc trượt lại càng nặng nề -> だけに."
      }
    ]
  },
  {
    id: 86,
    pattern: "〜ばかりに",
    meaning: "Trường hợp A: Chỉ vì... mà (kết quả xấu ngoài dự tính) | Trường hợp B: Chỉ vì muốn... mà (đã làm việc khác thường)",
    topicId: 17,
    topicName: "Bài 17: 〜だから・理由②",
    connection: [
      "普通形（な形-な／-である, N-である） ＋ ばかりに"
    ],
    nuance: "• Trường hợp A: Nhấn mạnh một nguyên nhân nhỏ, không đáng có dẫn đến một kết quả tiêu cực, tồi tệ hoặc hối hận.\n• Trường hợp B: Diễn tả vì có một mong muốn vô cùng tha thiết (〜たいばかりに) mà bản thân đã cố gắng hoặc làm một việc vượt quá bình thường.",
    ruleConstraints: [
      "[Ở trường hợp A]: Vế sau luôn là kết quả xấu, không đi kèm câu ý chí/mệnh lệnh của người nói.",
      "[Ở trường hợp B]: Vế trước đi với động từ thể mong muốn 〜たいばかりに."
    ],
    examples: [
      { jp: "ちょっと大工の経験があるばかりに、いろいろな仕事を頼まれてしまう。", vn: "Chỉ vì có một chút kinh nghiệm làm thợ mộc mà tôi bị nhờ vả đủ loại công việc. (Trường hợp A)" },
      { jp: "家のかぎを忘れて出かけたばかりに、家族が帰ってくるまで家に入れなかった。", vn: "Chỉ vì vội đi mà quên chìa khóa nhà nên tôi không thể vào nhà cho đến khi gia đình về. (Trường hợp A)" },
      { jp: "遅刻の回数がちょっと多かったばかりに、推薦状を書いてもらえなかった。", vn: "Chỉ vì số lần đi muộn hơi nhiều một chút mà tôi đã không được viết thư giới thiệu. (Trường hợp A)" },
      { jp: "山頂からご来光を見たいばかりに、暗いうちに山小屋を出て2時間も歩いたのだ。", vn: "Chỉ vì muốn ngắm bình minh từ đỉnh núi mà tôi đã rời lều từ lúc trời còn tối và đi bộ suốt 2 tiếng đồng hồ. (Trường hợp B)" }
    ],
    quizzes: [
      {
        type: "fill",
        question: "一言余計なことを言った（　　）、彼を怒らせてしまった。",
        options: ["ばかりに", "だけに", "ことだし", "からには"],
        correctIndex: 0,
        explanation: "Chỉ vì lỡ nói thừa một câu mà làm anh ấy giận dữ (kết quả xấu) -> ばかりに."
      }
    ]
  },
  {
    id: 87,
    pattern: "〜からには・〜以上（は）・〜上は",
    meaning: "Một khi đã... thì đương nhiên phải / định sẽ...",
    topicId: 17,
    topicName: "Bài 17: 〜だから・理由②",
    connection: [
      "普通形（な形-である, N-である） ＋ からには / 以上（は）",
      "V（辞書形 / た形） ＋ 上は"
    ],
    nuance: "Diễn tả thái độ, quyết tâm mạnh mẽ, nghĩa vụ hay lời khuyên: Một khi đã ở trong hoàn cảnh hoặc đã đưa ra quyết định ở vế trước thì vế sau đương nhiên phải thực hiện hành động tương ứng đến cùng.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau luôn là câu biểu thị nghĩa vụ, quyết tâm, lời khuyên, đề nghị hoặc mệnh lệnh (〜なければならない, 〜べきだ, 〜つもりだ, 〜てはいけない).",
      "[Văn phong]: 「〜上は」 là dạng mang tính chất văn phong viết, trang trọng nhất (硬い言い方)."
    ],
    examples: [
      { jp: "留学するからには、ちゃんと目的があるのでしょうね。", vn: "Một khi đã đi du học thì chắc chắn bạn phải có mục đích rõ ràng rồi nhỉ." },
      { jp: "高いお金を払って外国旅行をするからには、大いに楽しまなければ損だ。", vn: "Một khi đã bỏ ra số tiền lớn để đi du lịch nước ngoài thì nếu không tận hưởng hết mình thì thật là thiệt thòi." },
      { jp: "自分一人でやると言った以上、みんなに助けてもらうことはできない。", vn: "Một khi đã nói tự mình làm thì không thể nhờ mọi người giúp đỡ được." },
      { jp: "専門職である以上は、常に新しい知識を身につけなければならないと思う。", vn: "Một khi đã là người làm nghề chuyên môn thì tôi nghĩ lúc nào cũng phải trau dồi kiến thức mới." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "引き受けた（　　）、最後まで責任を持ってやり遂げるべきだ。",
        options: ["からには", "ばかりに", "だけに", "ことだし"],
        correctIndex: 0,
        explanation: "Một khi đã nhận lời thì phải chịu trách nhiệm làm đến cùng -> からには / 以上は."
      }
    ]
  },

  // ========== BÀI 18 (88〜93) ==========
  {
    id: 88,
    pattern: "〜がたい",
    meaning: "Khó mà... / Khó lòng... (về mặt tâm lý/cảm xúc)",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "V（ます形 - bỏ ます） ＋ がたい"
    ],
    nuance: "Diễn tả ý nghĩa: Rất khó thực hiện một hành động nào đó (chủ yếu do yếu tố cảm xúc, tâm lý hoặc niềm tin khiến người nói thấy khó mà làm được). Không dùng để diễn tả năng lực hay sự cản trở về mặt kỹ thuật, vật lý.",
    ruleConstraints: [
      "[Động từ đi kèm]: Thường đi kèm với các động từ thể hiện hoạt động tâm lý, phát ngôn như 信じる (tin), 理解する (hiểu), 許す (tha thứ), 言う (nói), 表す (bày tỏ)..."
    ],
    examples: [
      { jp: "あの優しい彼がそんなひどいことをしたとは信じがたい。", vn: "Thật khó lòng tin được rằng người dịu dàng như anh ấy lại làm một việc tồi tệ đến thế." },
      { jp: "この料理は言うに言われぬおいしさで、何とも言い難い味だ。", vn: "Món ăn này ngon không từ nào tả xiết, là một hương vị thật khó lòng diễn tả." },
      { jp: "長年、自分の国で住みがたい経験をたくさんした。", vn: "Nhiều năm qua, tôi đã trải qua rất nhiều trải nghiệm khó sống ngay tại chính đất nước của mình." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "親友の裏切りは許し（　　）行為だ。",
        options: ["がたい", "かねる", "ようがない", "得ない"],
        correctIndex: 0,
        explanation: "Về mặt tình cảm khó lòng tha thứ được -> 許しがたい."
      }
    ]
  },
  {
    id: 89,
    pattern: "〜わけにはいかない・〜わけにもいかない",
    meaning: "Không thể... (vì lý do đạo đức, xã hội, tâm lý)",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "V（辞書形） ＋ わけにはいかない / わけにもいかない"
    ],
    nuance: "Diễn tả việc bản thân muốn làm nhưng không thể làm được vì bị ràng buộc bởi chuẩn mực đạo đức, trách nhiệm xã hội, quy tắc hoặc sự chú ý xung quanh.",
    ruleConstraints: [
      "[Chủ ngữ & Ngữ cảnh]: Chủ ngữ thường là ngôi thứ nhất (người nói). Bối cảnh câu thể hiện nghĩa phủ định 'không thể làm' vì lý do luân lý/xã hội."
    ],
    examples: [
      { jp: "病気の子供を一人居置いて、仕事に行くわけにはいかない。", vn: "Tôi không thể nào bỏ lại đứa con đang bị bệnh một mình ở nhà để đi làm được." },
      { jp: "いくらお金に困っていても、そんなお金をあなたから借りるわけにはいかない。", vn: "Cho dù có túng thiếu tiền bạc đến đâu, tôi cũng không thể vay số tiền như thế từ bạn được." },
      { jp: "もう会議は終わってしまった。会社に止まるわけにもいかず、困っている。", vn: "Cuộc họp đã kết thúc rồi. Tôi không thể cứ ở lại công ty mãi được nên đang rất lúng túng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "大事な試験の前だから、遊んでいる（　　）。",
        options: ["わけにはいかない", "かねる", "ようがない", "得ない"],
        correctIndex: 0,
        explanation: "Trước kỳ thi quan trọng không thể nào mải chơi được (trách nhiệm) -> わけにはいかない."
      }
    ]
  },
  {
    id: 90,
    pattern: "〜かねる",
    meaning: "Khó có thể... / Không thể... (từ chối khéo/lịch sự)",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "V（ます形 - bỏ ます） ＋ かねる"
    ],
    nuance: "Diễn tả việc muốn làm hoặc được yêu cầu nhưng do hoàn cảnh, lập trường hay trách nhiệm nên không thể thực hiện được. Thường dùng để từ chối khéo léo, lịch sự trong giao tiếp công việc, dịch vụ khách hàng (硬い言い方).",
    ruleConstraints: [
      "[Văn phong công việc]: Mang tính chất từ chối lịch sự, tránh nói trực tiếp できない trong môi trường giao tiếp kinh doanh và dịch vụ."
    ],
    examples: [
      { jp: "メールでのご連絡だけでは判断しかねます。一度面談にいらっしゃってください。", vn: "Chỉ qua liên lạc bằng email thì chúng tôi khó có thể đưa ra phán đoán. Xin vui lòng đến gặp mặt trực tiếp một lần." },
      { jp: "あなたの気持ちも理解できますが、その案には賛成しかねます。", vn: "Tôi có thể hiểu được cảm xúc của bạn, nhưng tôi khó có thể đồng ý với đề án đó." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "申し訳ございませんが、そのご要望には応じ（　　）。",
        options: ["かねます", "がたいです", "ようがありません", "得ません"],
        correctIndex: 0,
        explanation: "Từ chối lịch sự trong giao tiếp công việc -> V-ます + かねます."
      }
    ]
  },
  {
    id: 91,
    pattern: "〜ようがない",
    meaning: "Không có cách nào để... / Hoàn toàn không thể...",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "V（ます形 - bỏ ます） ＋ ようがない / ようもない"
    ],
    nuance: "Diễn tả ý nghĩa: Dù có muốn làm đi chăng nữa thì do thiếu phương tiện, công cụ hay phương pháp nên hoàn toàn không thể thực hiện được.",
    ruleConstraints: [
      "[Phương tiện & Phương pháp]: Nhấn mạnh việc hoàn toàn không có bất kỳ phương pháp/phương tiện hay công cụ khả thi nào để thực hiện hành động."
    ],
    examples: [
      { jp: "ここから先は崖になっているので、道を進みようがない。", vn: "Từ đây trở đi là vách đá nên hoàn toàn không có cách nào tiếp tục đi đường được nữa." },
      { jp: "連絡先がわからないので、連絡しようがない。", vn: "Vì không biết địa chỉ liên lạc nên tôi hoàn toàn không có cách nào liên lạc được." },
      { jp: "台風で電車が止まってしまい、会社へ行きようがない。", vn: "Do bão nên tàu điện dừng hoạt động, tôi không có cách nào đến công ty được." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "携帯を失くしてしまい、連絡の（　　）。",
        options: ["取りようがない", "取りかねる", "取れないわけにはいかない", "取りがたい"],
        correctIndex: 0,
        explanation: "Mất điện thoại nên không còn cách nào liên lạc được -> 取りようがない."
      }
    ]
  },
  {
    id: 92,
    pattern: "〜どころではない",
    meaning: "Không phải lúc... / Không tâm trí nào mà...",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "N / V（辞書形） ＋ どころではない"
    ],
    nuance: "Diễn tả tình trạng vì có một hoàn cảnh, sự việc quan trọng/khẩn cấp xảy ra (như quá bận, ồn ào, ốm đau...) nên không có thời gian, dư dả hay tâm trí để thực hiện hành động vế sau.",
    ruleConstraints: [
      "[Phân biệt nét nghĩa]: Đã gặp ở Bài 12 với nét nghĩa 'không chỉ dừng ở mức đó/trái lại'. Ở Bài 18 tập trung vào nét nghĩa 'không thể làm do hoàn cảnh không cho phép'."
    ],
    examples: [
      { jp: "趣味はスキーだが、去年はずっと忙しくて、スキーどころではなかった。", vn: "Sở thích của tôi là trượt tuyết, nhưng năm ngoái suốt thời gian qua quá bận rộn nên không phải lúc nghĩ tới trượt tuyết." },
      { jp: "病気で横になっていて、仕事どころではない。", vn: "Đang nằm bẹp vì bệnh nên tâm trí đâu mà làm việc được." },
      { jp: "来客があって、この本を読むどころではなかった。", vn: "Vì có khách đến chơi nên tôi không có tâm trí đâu mà đọc cuốn sách này." },
      { jp: "のどが痛くて、カラオケで歌うどころではない。", vn: "Cổ họng đang đau rát nên không phải lúc để hát karaoke." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "仕事が山積みで、旅行（　　）。",
        options: ["どころではない", "かねる", "ようがない", "がたい"],
        correctIndex: 0,
        explanation: "Công việc chất như núi nên không tâm trí/thời gian đâu mà đi du lịch -> どころではない."
      }
    ]
  },
  {
    id: 93,
    pattern: "〜得る／〜得ない",
    meaning: "〜得る: Có khả năng... / Có thể xảy ra... | 〜得ない: Không có khả năng... / Không thể xảy ra...",
    topicId: 18,
    topicName: "Bài 18: 〜できない・困難だ・〜できる・易しい",
    connection: [
      "V（ます形 - bỏ ます） ＋ 得る（える／うる） / 得ない（えない）"
    ],
    nuance: "Diễn tả khả năng mang tính lý thuyết, tình huống có thể hoặc không thể xảy ra trên thực tế. Không dùng để nói về năng lực cá nhân hay kỹ năng của con người.",
    ruleConstraints: [
      "[Cách đọc]: Khi chia thể khẳng định hiện tại, có hai cách đọc là える hoặc うる. Nhưng khi chia thể phủ định hoặc quá khứ thì bắt buộc đọc là えない (không dùng ×うない), えた (không dùng ×うた)."
    ],
    examples: [
      { jp: "危機はチャンスにもなり得る。", vn: "Nguy cơ cũng có thể trở thành cơ hội." },
      { jp: "どんな場合でも事故は起こり得る。", vn: "Trong bất kỳ trường hợp nào, tai nạn đều có thể xảy ra." },
      { jp: "この子はまだ字を読み得ない。", vn: "Đứa trẻ này vẫn chưa có khả năng đọc chữ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "人間誰しも失敗することはあり（　　）。",
        options: ["得る", "かねる", "ようがない", "がたい"],
        correctIndex: 0,
        explanation: "Con người ai cũng có khả năng mắc sai lầm -> あり得る (ariuru / arieru)."
      }
    ]
  },

  // ========== BÀI 19 (94〜99) ==========
  {
    id: 94,
    pattern: "〜わりに（は）",
    meaning: "Tuy... nhưng... / So với... thì... (khác với mức tiêu chuẩn dự đoán)",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "V / い形 / な形-な（-である）/ N-の（-である）（普通形） ＋ わりに（は）"
    ],
    nuance: "Diễn tả sự chênh lệch: So với tiêu chuẩn/dự đoán thông thường rút ra từ danh từ hay tính từ ở vế trước thì kết quả hay đánh giá ở vế sau lại không tương xứng hoặc hoàn toàn bất ngờ.",
    ruleConstraints: [
      "[Phạm vi danh từ]: Vế trước thường là các từ có phạm vi/mức độ rộng như tuổi tác, giá cả, ngoại hình (年齢, 値段, 若い...)."
    ],
    examples: [
      { jp: "この歌手は人気のわりに仕事が少ない。", vn: "Ca sĩ này so với độ nổi tiếng thì lại có ít công việc." },
      { jp: "この料理は安い材料で簡単にできるわりにおいしく見える。", vn: "Món ăn này so với việc làm đơn giản từ nguyên liệu rẻ tiền thì trông lại có vẻ rất ngon." },
      { jp: "ゆき子さんは若いわりにはしっかりしている。", vn: "Yukiko so với độ tuổi còn trẻ thì lại rất chín chắn, vững vàng." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "この店は値段が高い（　　）、サービスが良くない。",
        options: ["わりに", "にしては", "だけに", "として"],
        correctIndex: 0,
        explanation: "So với mức giá đắt đỏ thì phục vụ lại không tốt -> わりに."
      }
    ]
  },
  {
    id: 95,
    pattern: "〜にしては",
    meaning: "Dù là... nhưng... / So với... thì... (khác với thực tế cụ thể)",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "N / 普通形（な形［だ］・N［だ］） ＋ にしては"
    ],
    nuance: "Diễn tả đánh giá trái với hình dung thông thường: Đi với một mốc/đối tượng cụ thể, thể hiện rằng kết quả vế sau không giống như những gì người ta tưởng tượng từ mốc/đối tượng đó.",
    ruleConstraints: [
      "[Phân biệt với 〜わりに]: 「〜にしては」 thường đi với con số hoặc thực tế cụ thể (2月, 1,000円, 子供が作った), vế sau biểu thị phán đoán/đánh giá ngạc nhiên."
    ],
    examples: [
      { jp: "今日は2月にしては暖かかった。", vn: "Hôm nay dù là tháng 2 nhưng trời lại khá ấm áp." },
      { jp: "このかばんは、1,000円にしては丈夫で、デザインもいい。", vn: "Chiếc cặp này dù chỉ có giá 1.000 yên nhưng lại rất bền và kiểu dáng cũng đẹp." },
      { jp: "このケーキ、子供が作ったにしてはおいしくできていますね。", vn: "Bánh ngọt này dù là do trẻ con làm nhưng làm ra ăn ngon đấy chứ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "初めて作った（　　）、とても上手にできている。",
        options: ["にしては", "わりに", "として", "にとって"],
        correctIndex: 0,
        explanation: "Dù là lần đầu làm (mốc cụ thể) nhưng làm rất khéo -> にしては."
      }
    ]
  },
  {
    id: 96,
    pattern: "〜だけ（のことは）ある",
    meaning: "Quả đúng là... (kết quả xứng đáng với lý do/năng lực)",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "V / い形 / な形-な / N-の（普通形） ＋ だけ（のことは）ある",
      "N ＋ だけあって"
    ],
    nuance: "Diễn tả lời khen ngợi hoặc đánh giá cao: Đúng như mong đợi, kết quả hay giá trị ở vế sau là hoàn toàn tương xứng, xứng đáng với nỗ lực, vị trí hay danh tiếng ở vế trước.",
    ruleConstraints: [
      "[Khen ngợi]: Vế sau thường khen ngợi, đánh giá cao. Không dùng cho kết quả tiêu cực hay các câu biểu thị sự suy đoán tương lai."
    ],
    examples: [
      { jp: "素晴らしいマンションだ。家賃が高いだけのことはある。", vn: "Căn hộ thật tuyệt vời. Quả đúng là xứng đáng với giá thuê đắt đỏ." },
      { jp: "彼は10年も日本に住んでいるだけあって、日本のことをよく知っている。", vn: "Anh ấy quả đúng là sống ở Nhật suốt 10 năm có khác, hiểu biết rất rõ về Nhật Bản." },
      { jp: "さすがオリンピックだけあって、見事な試合が見られた。", vn: "Quả đúng là tầm cỡ Olympic có khác, người ta đã được chứng kiến trận đấu tuyệt vời." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "毎日練習しただけの（　　）、見事に優勝した。",
        options: ["ことはある", "わりに", "にしては", "として"],
        correctIndex: 0,
        explanation: "Quả không uổng công luyện tập mỗi ngày -> だけのことはある."
      }
    ]
  },
  {
    id: 97,
    pattern: "〜として",
    meaning: "Với tư cách là... / Dưới danh nghĩa... / Với vai trò...",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "N ＋ として / としての / としては"
    ],
    nuance: "Dùng khi nêu ra lập trường, tư cách, vai trò, danh nghĩa hay tư cách pháp nhân để thực hiện một hành động hoặc đưa ra đánh giá.",
    ruleConstraints: [
      "[Vế sau]: Vế sau là hành động, trạng thái hoặc nhận định gắn liền với tư cách/vai trò đó."
    ],
    examples: [
      { jp: "彼は選手を引退した後、コーチとしてチームのために働いた。", vn: "Sau khi giải nghệ cầu thủ, anh ấy đã làm việc cho đội bóng với tư cách là huấn luyện viên." },
      { jp: "コーヒーはもともと薬として飲まれていた。", vn: "Cà phê vốn dĩ ban đầu được uống với vai trò như một vị thuốc." },
      { jp: "京都は日本の歴史的な古い町として知られている。", vn: "Kyoto được biết đến như một thành phố cổ mang tính lịch sử của Nhật Bản." },
      { jp: "子供の安全に気をつけることは親として当然だ。", vn: "Chú ý đến sự an toàn của con cái là điều đương nhiên với tư cách là cha mẹ." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "留学生（　　）日本に来ました。",
        options: ["として", "にとって", "にしては", "わりに"],
        correctIndex: 0,
        explanation: "Đến Nhật với tư cách là du học sinh -> N (留学生) + として."
      }
    ]
  },
  {
    id: 98,
    pattern: "〜にとって",
    meaning: "Đối với... (quan điểm, đánh giá cá nhân)",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "N（Danh từ chỉ người/đoàn thể） ＋ にとって / にとっても / にとっての"
    ],
    nuance: "Dùng khi đưa ra góc nhìn, quan điểm, đánh giá hay cảm nhận của một đối tượng cụ thể (người, đoàn thể) về một vấn đề.",
    ruleConstraints: [
      "[Tính chất đánh giá]: Vế sau là câu biểu thị đánh giá/tính chất (thường đi với tính từ 大切な, 必要な, 難しい...). KHÔNG dùng cho hành động trực tiếp."
    ],
    examples: [
      { jp: "今のわたしにとって一番大切なのは家族です。", vn: "Đối với tôi hiện tại, điều quan trọng nhất chính là gia đình." },
      { jp: "現代人にとってパソコンはなくはならない道具である。", vn: "Đối với con người hiện đại, máy tính là công cụ không thể thiếu." },
      { jp: "この小石はほかの人にとっては普通の石ですが、わたしにとっては宝物なのです。", vn: "Hòn đá nhỏ này đối với người khác là hòn đá bình thường, nhưng đối với tôi lại là báu vật." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "私（　　）、この写真はかけがえのない宝物です。",
        options: ["にとって", "として", "にしては", "わりに"],
        correctIndex: 0,
        explanation: "Đối với tôi (quan điểm/đánh giá) -> N + にとって."
      }
    ]
  },
  {
    id: 99,
    pattern: "〜にしたら・〜にすれば・〜にしてみれば・〜にしても",
    meaning: "Nếu đứng ở lập trường/vị trí của... thì...",
    topicId: 19,
    topicName: "Bài 19: 〜を見て評価すると・〜の場で評価すると",
    connection: [
      "N（Danh từ chỉ người） ＋ にしたら / にすれば / にしてみれば / にしても"
    ],
    nuance: "Diễn tả việc thử đặt mình vào vị trí, hoàn cảnh của người khác để suy đoán cảm xúc, tâm trạng hay suy nghĩ của họ.",
    ruleConstraints: [
      "[Người khác & Suy đoán]: Danh từ đi kèm luôn là người khác (không phải người nói). Vế sau là câu suy đoán suy nghĩ, cảm xúc của họ (〜だろう, 〜と思う, 〜ようだ)."
    ],
    examples: [
      { jp: "君もいろいろ言われて面倒だろうが、君のお母さんにしたら、君のことが心配なんだよ。", vn: "Cậu bị nói nhiều chắc cũng thấy phiền phức, nhưng nếu đứng ở vị trí của mẹ cậu thì là do bà lo lắng cho cậu đấy." },
      { jp: "たばこを吸う人にすれば、たばこの害についての話題は避けたいだろうと思う。", vn: "Nếu đứng ở lập trường của người hút thuốc thì tôi nghĩ họ sẽ muốn tránh các chủ đề về tác hại của thuốc lá." },
      { jp: "新しい高速道路ができて便利になったが、沿線の住民にしてみれば、あまりありがたくはないかもしれない。", vn: "Đường cao tốc mới hoàn thành rất tiện lợi, nhưng nếu đứng ở góc độ người dân sống dọc tuyến đường thì có lẽ lại không vui vẻ gì cho lắm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "親（　　）、子供の将来が一番心配なのだろう。",
        options: ["にすれば", "として", "にとって", "にしては"],
        correctIndex: 0,
        explanation: "Nếu đứng ở vị trí của cha mẹ mà suy nghĩ -> N + にすれば / にしたら."
      }
    ]
  },

  // ========== BÀI 20 (100〜105) ==========
  {
    id: 100,
    pattern: "〜ところ",
    meaning: "Sau khi thử làm... thì nhận được kết quả / nhận ra sự thật...",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（た形） ＋ ところ"
    ],
    nuance: "Diễn tả ý nghĩa: Sau khi thực hiện một hành động (thường là thử nghiệm, hỏi thăm, kiểm tra) thì thu được một kết quả hoặc nhận ra một sự thật/tình trạng nào đó.",
    ruleConstraints: [
      "[Đặc điểm vế sau]: Vế sau luôn là câu miêu tả kết quả hoặc sự thật đã xảy ra (dùng thể quá khứ). Nhấn mạnh vào nội dung kết quả thu được."
    ],
    examples: [
      { jp: "2、3日休みたいと婦長に相談したところ、2週間休んでもいいと言われた。", vn: "Sau khi tôi bàn với y tá trưởng rằng muốn nghỉ 2, 3 ngày thì được bảo là có thể nghỉ 2 tuần cũng được." },
      { jp: "痛みがとれないのでリーさんのうちへ行ってみたところ、病気で寝ていた。", vn: "Vì mãi không hết đau nên tôi thử đến nhà anh Lee thì thấy anh ấy đang nằm bẹp vì bệnh." },
      { jp: "この新製品を使ってみたいかどうか聞いてみたところ、80％の人が「使いたい」と答えた。", vn: "Sau khi thử hỏi xem có muốn dùng sản phẩm mới này không thì 80% số người đã trả lời là 'Muốn dùng'." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "病院で検査を受け（　　）、どこも異常はなかった。",
        options: ["たところ", "たきり", "たあげく", "た末に"],
        correctIndex: 0,
        explanation: "Sau khi kiểm tra ở bệnh viện thì nhận được kết quả -> V-た + ところ."
      }
    ]
  },
  {
    id: 101,
    pattern: "〜きり",
    meaning: "Kể từ sau khi... thì cứ thế mãi không... (không có sự thay đổi)",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（た形） ＋ きり",
      "Quán ngữ: それきり (Từ đó trở đi...)"
    ],
    nuance: "Diễn tả ý nghĩa: Sau lần thực hiện hành động đó cuối cùng trong quá khứ thì trạng thái đó cứ tiếp diễn liên tục, không có thêm hành động hay sự thay đổi nào khác diễn ra nữa.",
    ruleConstraints: [
      "[Phủ định vế sau]: Vế sau thường là câu phủ định diễn tả sự việc đáng lẽ phải xảy ra nhưng đã không xảy ra (〜ていない)."
    ],
    examples: [
      { jp: "その本は、子供のころ読んだきり、その後一度も読んでいない。", vn: "Cuốn sách đó kể từ sau khi đọc hồi còn nhỏ thì sau đó tôi chưa từng đọc lại một lần nào nữa." },
      { jp: "父は朝、出かけたきりなんです。まだ戻っていません。", vn: "Bố tôi kể từ lúc bước ra ngoài đi từ sáng thì cứ thế đi mất. Đến giờ vẫn chưa về." },
      { jp: "日本は貿易国だが、輸入きりの輸入の数も多い。", vn: "Nhật Bản là quốc gia thương mại, nhưng số lượng mặt hàng chỉ có nhập khẩu về mà không xuất đi cũng rất nhiều." },
      { jp: "彼に最後に会ったのは卒業式の時です。それきり、一度も会っていません。", vn: "Lần cuối cùng tôi gặp anh ấy là vào lễ tốt nghiệp. Từ đó trở đi, tôi chưa từng gặp lại lần nào nữa." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "朝出かけ（　　）、まだ連絡がない。",
        options: ["たきり", "たところ", "たあげく", "た末に"],
        correctIndex: 0,
        explanation: "Ra ngoài từ sáng rồi cứ thế bặt vô âm tín -> V-た + きり."
      }
    ]
  },
  {
    id: 102,
    pattern: "〜あげく",
    meaning: "Sau một hồi... rốt cuộc lại (kết quả xấu, đáng tiếc)",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（た形） ＋ あげく / あげくに",
      "N ＋ の ＋ あげく / あげくに"
    ],
    nuance: "Diễn tả việc sau khi trải qua một quá trình dài vất vả, tốn nhiều thời gian, suy nghĩ hay tranh luận thì rốt cuộc lại dẫn đến một kết quả tiêu cực, tồi tệ hoặc hối hận.",
    ruleConstraints: [
      "[Kết quả tiêu cực]: Vế sau hầu như luôn là một kết quả xấu, đáng tiếc, không như mong đợi."
    ],
    examples: [
      { jp: "5時間に及ぶ議論のあげく、結局、結論が出なかった。", vn: "Sau một hồi tranh luận kéo dài suốt 5 tiếng đồng hồ, rốt cuộc vẫn không đưa ra được kết luận." },
      { jp: "いろいろ文句を言ったあげく、その客は何も買わずに帰った。", vn: "Sau một hồi phàn nàn đủ điều, vị khách đó rốt cuộc chẳng mua gì mà đi về." },
      { jp: "さんざん悩んだあげく、国へ帰ることにした。", vn: "Sau một hồi trăn trở đủ đường, rốt cuộc tôi đã quyết định về nước." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "散々迷っ（　　）、何も買わなかった。",
        options: ["たあげく", "たところ", "たきり", "た末に"],
        correctIndex: 0,
        explanation: "Sau một hồi phân vân mãi rốt cuộc chẳng mua gì (kết cục thất vọng) -> V-た + あげく."
      }
    ]
  },
  {
    id: 103,
    pattern: "〜末（に）",
    meaning: "Sau một hồi... cuối cùng đã (đưa ra quyết định/kết quả cuối cùng)",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（た形） ＋ 末（に） / 末の ＋ N",
      "N ＋ の ＋ 末（に） / 末の ＋ N"
    ],
    nuance: "Diễn tả việc sau khi trải qua một khoảng thời gian dài vất vả, nỗ lực hay trăn trở thì cuối cùng đã đạt được một kết quả hoặc đưa ra một quyết định quan trọng.",
    ruleConstraints: [
      "[Phân biệt với 〜あげく]: Khác với 〜あげく (thường là kết quả xấu), 〜末に có thể dùng cho cả kết quả tốt lẫn xấu, nhấn mạnh vào kết cục/quyết định sau quá trình dài gian nan."
    ],
    examples: [
      { jp: "数回におよぶ議論の末、Aの案を採用することにした。", vn: "Sau một hồi thảo luận qua nhiều lần, cuối cùng chúng tôi đã quyết định chọn đề án A." },
      { jp: "長い戦いの末、ついに勝利を勝ち取った。", vn: "Sau một hồi chiến đấu dài kỳ, cuối cùng chúng tôi đã giành được chiến thắng." },
      { jp: "悩んだ末に、手術を受けようと決めた。", vn: "Sau một hồi trăn trở, cuối cùng tôi đã quyết định sẽ phẫu thuật." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "苦労の（　　）、ついに新薬の開発に成功した。",
        options: ["末に", "あげく", "きり", "ところ"],
        correctIndex: 0,
        explanation: "Sau bao gian nan vất vả, cuối cùng đã phát triển thành công thuốc mới (kết quả tốt) -> N (苦労) + の末に."
      }
    ]
  },
  {
    id: 104,
    pattern: "〜ところだった",
    meaning: "Suýt nữa thì... / Suýt chút nữa là...",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（辞書形 / ない形） ＋ ところだった"
    ],
    nuance: "Diễn tả một sự việc, tình huống đã ở ngay sát vách (suýt nữa xảy ra) nhưng thực tế đã may mắn hoặc không may không xảy ra.",
    ruleConstraints: [
      "[Phó từ đi kèm]: Thường đi cùng các phó từ như うっかり (lỡ/vô ý), 危なく (nguy hiểm quá), もう少しで (sắp sửa/sát nút)."
    ],
    examples: [
      { jp: "あ、今日は15日か。うっかり約束を忘れるところだった。", vn: "A, hôm nay là ngày 15 rồi à. Suýt nữa thì tôi quên mất cuộc hẹn." },
      { jp: "気をつけてくださいよ。気がつくのが遅かったら火事になるところでしたよ。", vn: "Hãy cẩn thận đấy nhé. Nếu nhận ra chậm một chút nữa là suýt nữa thành hỏa hoạn rồi đấy." },
      { jp: "朝寝坊して、危なく試験が受けられないところだった。", vn: "Vì ngủ quên buổi sáng nên nguy hiểm quá, suýt chút nữa là tôi không thể dự thi." },
      { jp: "ああ、残念だ。もう少しで100点取れるところだったのに、97点だった。", vn: "Ôi, tiếc quá. Suýt chút nữa là được 100 điểm rồi thế mà lại được 97 điểm." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "もう少しで電車に乗り遅れる（　　）。",
        options: ["ところだった", "あげくだった", "末だった", "きりだった"],
        correctIndex: 0,
        explanation: "Suýt chút nữa thì lỡ chuyến tàu -> ところだった."
      }
    ]
  },
  {
    id: 105,
    pattern: "〜ずじまいだ",
    meaning: "Rốt cuộc đành kết thúc mà chưa kịp/không làm được...",
    topicId: 20,
    topicName: "Bài 20: 結果はどうなったか",
    connection: [
      "V（ない形 - bỏ ない） ＋ ずじまいだ",
      "Ngoại lệ: する ➔ せずじまいだ"
    ],
    nuance: "Diễn tả sự tiếc nuối: Dù đã dự định hay có ý muốn làm một việc gì đó nhưng rốt cuộc do hết thời gian/hoàn cảnh mà thời kỳ trôi qua đành phải kết thúc mà không làm được.",
    ruleConstraints: [
      "[Sắc thái]: Mang sắc thái nuối tiếc, hối hận vì một cơ hội đã trôi qua. Thường chia ở thể quá khứ (〜ずじまいだった)."
    ],
    examples: [
      { jp: "いろんな人に聞いてみたが、結局山田さんの連絡先は分からずじまいだった。", vn: "Đã thử hỏi nhiều người nhưng rốt cuộc đành chịu mà không biết được địa chỉ liên lạc của anh Yamada." },
      { jp: "彼女にラブレターを書いたけれど、勇気がなくて出せずじまいだった。", vn: "Tôi đã viết thư tình cho cô ấy rồi nhưng vì không có dũng khí nên rốt cuộc đành để đó mà không gửi đi được." },
      { jp: "留学中に旅行したかったが、忙しくてどこへも行かずじまいで帰国した。", vn: "Trong thời gian du học tôi đã rất muốn đi du lịch, nhưng vì bận rộn nên rốt cuộc chưa đi đâu được đã phải về nước." }
    ],
    quizzes: [
      {
        type: "fill",
        question: "買った本を一度も読ま（　　）人に譲ってしまった。",
        options: ["ずじまいで", "ないところで", "たきりで", "たあげく"],
        correctIndex: 0,
        explanation: "Chưa kịp đọc lần nào đành để nguyên đem tặng -> V-ずじまいで."
      }
    ]
  }
];
