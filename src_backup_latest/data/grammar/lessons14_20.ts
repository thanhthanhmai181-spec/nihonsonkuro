import { GrammarPoint, Dialogue, LessonQuizRaw } from "../grammarN5Data";

export const grammar14_20: Record<number, GrammarPoint[]> = {};
export const dialogues14_20: Record<number, Dialogue[]> = {};
export const quizzes14_20: Record<number, LessonQuizRaw> = {};

// --- BÀI 14 ---
grammar14_20[14] = [
  { pattern: "Vて ください", meaning: "Hãy làm hành động V", note: "Dùng để yêu cầu, nhờ vả hoặc sai khiến người khác làm việc gì đó một cách lịch sự.", examples: [
    { jp: "ここに名前を書いてください。", vn: "Hãy viết tên vào đây." },
    { jp: "すみません、パスポートを見せてください。", vn: "Xin lỗi, hãy cho tôi xem hộ chiếu." },
    { jp: "どうぞたくさん食べてください。", vn: "Xin mời ăn nhiều vào nhé." },
    { jp: "ちょっと待ってください。", vn: "Hãy đợi một chút." },
    { jp: "A: ドアを開けてください。B: はい, わかりました。", vn: "A: Hãy mở cửa giúp tôi. B: Vâng, tôi hiểu rồi." }
  ]},
  { pattern: "Vて います (Hiện tại tiếp diễn)", meaning: "Đang làm hành động V", note: "Diễn tả một hành động đang xảy ra tại chính thời điểm nói.", examples: [
    { jp: "今、コーヒーを飲んでいます。", vn: "Bây giờ tôi đang uống cà phê." },
    { jp: "今、サンドイッチを食べています。", vn: "Bây giờ tôi đang ăn sandwich." },
    { jp: "A: 何を読んでいますか。B: 新聞を読んでいます。", vn: "A: Bạn đang đọc gì thế? B: Tôi đang đọc báo." },
    { jp: "A: 何を食べていますか。B: カレーを食べています。", vn: "A: Bạn đang ăn gì thế? B: Tôi đang ăn cà-ri." },
    { jp: "A: 今、何をしていますか。B: 日本語を勉強しています。", vn: "A: Bây giờ bạn đang làm gì thế? B: Tôi đang học tiếng Nhật." }
  ]},
  { pattern: "Vましょうか", meaning: "Để tôi làm V giúp nhé?", note: "Bày tỏ lời đề nghị muốn chủ động giúp đỡ người khác thực hiện một việc gì đó.", examples: [
    { jp: "A: 写真を撮りましょうか。B: はい、お願いします。", vn: "A: Để tôi chụp ảnh giúp nhé? B: Vâng, làm ơn giúp tôi." },
    { jp: "A: 荷物を持ちましょうか。B: いいえ、結構です。", vn: "A: Để tôi mang hành lý giúp nhé? B: Không, tôi tự làm được rồi." },
    { jp: "A: 窓を開けましょうか。B: はい、すみません。お願いします。", vn: "A: Để tôi mở cửa sổ giúp nhé? B: Vâng, xin lỗi. Nhờ anh nhé." },
    { jp: "A: タクシーを呼びましょうか。B: ええ、1台お願いします。", vn: "A: Để tôi gọi taxi giúp nhé? B: Vâng, cho tôi 1 chiếc." },
    { jp: "A: 傘を貸しましょうか。B: ええ、ありがとうございます。", vn: "A: Để tôi cho mượn ô nhé? B: Ôi, cảm ơn bạn nhiều." }
  ]},
  { pattern: "V(bỏ ます) かた", meaning: "Cách làm hành động V", note: "Biến động từ thành danh từ chỉ cách thức phương pháp thực hiện.", examples: [
    { jp: "漢字の書き方がわかりません。", vn: "Tôi không biết cách viết chữ Hán." },
    { jp: "A: このカメラの使い方を教えてください。B: はい, いいですよ。", vn: "A: Hãy chỉ cho tôi cách dùng chiếc máy ảnh này với. B: Vâng, được chứ." },
    { jp: "美味しいコーヒーの作り方です。", vn: "Đây là cách pha cà phê ngon." },
    { jp: "日本語の勉強の仕方が上手ですね。", vn: "Cách thức học tiếng Nhật của bạn hay ghê." },
    { jp: "この言葉の読み方を教えてください。", vn: "Hãy chỉ cho tôi cách đọc từ này." }
  ]}
];

dialogues14_20[14] = [
  { jp: "A: すみません、ちょっと待ってください。荷物が多いですから。B: 荷物を持ちましょうか。A: はい、すみません。お願いします。", vn: "A: Xin lỗi, hãy đợi tôi một chút. Vì hành lý nhiều quá. B: Để tôi xách hộ nhé? A: Vâng, xin lỗi. Nhờ anh nhé." },
  { jp: "A: 今、何をしていますか。雨が降っていますか。B: いいえ、降っていません。友達とサッカーをしていますよ。", vn: "A: Bây giờ đang làm gì thế? Trời có mưa không? B: Không, không mưa. Tôi đang chơi đá bóng với bạn." },
  { jp: "A: 漢字の書き方が分かりません。教えてください。B: じゃ、ここにゆっくり書いてください。見せますから。", vn: "A: Tôi không biết cách viết chữ Hán này. Hãy chỉ tôi với. B: Vậy, hãy viết từ từ vào đây. Tôi sẽ làm mẫu cho xem." }
];

// --- BÀI 15 ---
grammar14_20[15] = [
  { pattern: "Vて もいいです", meaning: "Làm hành động V cũng được", note: "Dùng để xin phép thực hiện hành động hoặc cho phép đối phương làm gì.", examples: [
    { jp: "ご飯を食べてもいいです。", vn: "Ăn cơm cũng được." },
    { jp: "寝てもいいです。", vn: "Ngủ luôn cũng được." },
    { jp: "A: 写真を撮ってもいいですか。B: はい、いいですよ。", vn: "A: Tôi chụp ảnh có được không? B: Vâng, được chứ." },
    { jp: "A: ここに座ってもいいですか。B: ええ、どうぞ。", vn: "A: Tôi ngồi chỗ này được không? B: Vâng, xin mời." },
    { jp: "A: エアコンをつけてもいいですか。B: はい、いいですよ。", vn: "A: Tôi bật điều hòa nhiệt độ lên nhé? B: Vâng, được chứ." }
  ]},
  { pattern: "Vて はいけません", meaning: "Cấm làm / Không được làm hành động V", note: "Biểu thị sự cấm đoán, không được phép thực hiện hành vi do quy định luật lệ.", examples: [
    { jp: "ここで泳いではいけません。", vn: "Cấm bơi lội ở khu vực này." },
    { jp: "危ないから入ってはいけません。", vn: "Vì nguy hiểm nên cấm đi vào." },
    { jp: "写真を撮ってはいけません。", vn: "Không được phép chụp hình." },
    { jp: "ここでタバコを吸ってはいけません。", vn: "Cấm hút thuốc lá ở đây." },
    { jp: "病院で電話をかけてはいけません。", vn: "Không được gọi điện thoại trong bệnh viện." }
  ]},
  { pattern: "Vて います (Trạng thái kết quả)", meaning: "Đang ở trạng thái V", note: "Hành động đã xảy ra và hoàn tất trong quá khứ nhưng kết quả hiện trạng vẫn duy trì lưu giữ ở hiện tại.", examples: [
    { jp: "私は結婚しています。", vn: "Tôi đã kết hôn (và hiện đang lập gia đình)." },
    { jp: "私はソン先生を知っています。", vn: "Tôi biết thầy Sơn." },
    { jp: "I は車を持っています。", vn: "Tôi có xe hơi." },
    { jp: "今、ハノイに住んでいます。", vn: "Bây giờ tôi đang sinh sống ở Hà Nội." },
    { jp: "A: 山田さんを知っていますか。B: いいえ、知りません。", vn: "A: Bạn có biết anh Yamada không? B: Không, tôi không biết (Phủ định dùng 知りません)." }
  ]},
  { pattern: "Vて います (Thói quen nghề nghiệp)", meaning: "Làm hành động V thường xuyên lặp đi lặp lại", note: "Diễn tả thói quen hoặc hành động mang tính chất lặp đi lặp lại lâu dài, nghề nghiệp, kinh doanh buôn bán.", examples: [
    { jp: "アップルでiPhoneを売っています。", vn: "Tại công ty Apple có bán điện thoại iPhone." },
    { jp: "私は日本のiPhoneを使っています。", vn: "Tôi thường dùng chiếc iPhone của Nhật." },
    { jp: "HNLの会社で働いています。", vn: "Tôi đang làm việc tại công ty HNL." },
    { jp: "HNLで日本語を勉強しています。", vn: "Tôi hằng ngày học tiếng Nhật ở HNL." },
    { jp: "HNLで日本語を教えています。", vn: "Tôi đang đảm nhiệm dạy tiếng Nhật tại HNL." }
  ]}
];

dialogues14_20[15] = [
  { jp: "A: すみません、ここで写真を撮ってもいいですか。B: いいえ、写真を撮ってはいけません。美術館ですから。A: ああ、そうですか。すみません。", vn: "A: Xin lỗi, chụp ảnh ở chỗ này được không ạ? B: Không, không được chụp ảnh đâu ạ. Vì là bảo tàng mỹ thuật. A: Ôi thế ạ. Tôi xin lỗi." },
  { jp: "A: マリアさんは独身ですか。B: いいえ、結婚しています。ベトナムのハノイに住んでいますよ。A: そうですか。仕事は何をしていますか。B: 英語を教えています。", vn: "A: Maria còn độc thân à? B: Không, cô ấy kết hôn rồi. Hiện đang sống ở Hà Nội, Việt Nam đấy. A: Thế à. Cô ấy làm nghề gì? B: Đang dạy tiếng Anh." },
  { jp: "A: このカタログをもらってもいいですか。B: ええ、いいですよ。どうぞ持って行ってください。", vn: "A: Tôi xin cuốn danh mục catalog này có được không? B: Vâng, được chứ. Xin mời bạn cứ cầm lấy đi." }
];

// --- BÀI 16 ---
grammar14_20[16] = [
  { pattern: "V1て、V2て、V3ます", meaning: "Làm V1, rồi V2, sau đó làm V3", note: "Liệt kê chuỗi các hành động xảy ra tuần tự liên tiếp nối nhau theo trục trình tự thời gian.", examples: [
    { jp: "毎朝、起きて、浴びて、それから朝ご飯を食べます。", vn: "Mỗi sáng tôi thức dậy, tắm rửa, rồi sau đó ăn sáng." },
    { jp: "うちへ帰って、テレビを見て、それから寝ます。", vn: "Về nhà, xem tivi, rồi đi ngủ." },
    { jp: "昨日、デパートへ行って、買い物をして、映画を見ました。", vn: "Hôm qua tôi đi bách hóa, mua sắm rồi xem phim truyện." },
    { jp: "本を読んで、手紙を書いて、寝ました。", vn: "Tôi đọc sách, viết thư rồi đi ngủ luôn." },
    { jp: "A: 友達に会って、何をしましたか。B: 一一緒に食事をしました。", vn: "A: Gặp bạn xong bạn làm gì? B: Chúng tôi đã ăn uống cùng nhau." }
  ]},
  { pattern: "N1 で、N2 です", meaning: "Là N1 và đồng thời là N2", note: "Dùng kết nối hai danh từ dùng khi muốn miêu tả đồng thời nhiều thông tin đặc điểm về cùng một chủ thể.", examples: [
    { jp: "カリナさんは30歳で、会社員です。", vn: "Chị Karina 30 tuổi, và là nhân viên công ty." },
    { jp: "太郎くんは9歳で、学生です。", vn: "Bé Tarou 9 tuổi, hiện là học sinh." },
    { jp: "彼女はベトナム人で、実習生です。", vn: "Cô ấy là người Việt Nam, và là thực tập sinh." },
    { jp: "ズンさんはクラス長で、18歳です。", vn: "Dũng là lớp trưởng, năm nay 18 tuổi." },
    { jp: "これは日本の本で、とても面白いです。", vn: "Đây là cuốn sách của Nhật, và nội dung vô cùng thú vị." }
  ]},
  { pattern: "Aな で / Aい(bỏ い)くて", meaning: "Vừa mang tính chất A1 lại vừa A2", note: "Cách liên kết nối các tính từ. Tính từ đuôi な thay bằng で, tính từ đuôi い bỏ い thêm くて.", examples: [
    { jp: "ジャンさんはきれいで、料理が上手です。", vn: "Karina vừa xinh đẹp lại vừa nấu ăn giỏi." },
    { jp: "太郎くんはハンサムで、とても親切です。", vn: "Bé Tarou vừa đẹp trai lại vừa vô cùng tốt bụng." },
    { jp: "カリナさんは若くて、頭がいいです。", vn: "Chị Karina vừa trẻ trung lại vừa thông minh." },
    { jp: "太郎くんは頭が良くて、とても可愛いです。", vn: "Bé Tarou thông minh và trông rất dễ thương." },
    { jp: "このiPhoneは便利で、安全です。", vn: "Chiếc iPhone này tiện lợi và độ bảo mật an toàn." }
  ]},
  { pattern: "V1て から、V2ます", meaning: "Sau khi hoàn thành xong V1 mới tiến hành làm V2", note: "Nhấn mạnh hành động vế 2 chỉ được phép diễn ra sau khi hành vi vế 1 đã chấm dứt hoàn tất.", examples: [
    { jp: "日本へ来てから、日本語を勉強します。", vn: "Sau khi sang Nhật Bản tôi mới chính thức học tiếng Nhật." },
    { jp: "うちへ帰ってから、ご飯を食べます。", vn: "Về nhà xong xuôi tôi mới ăn cơm." },
    { jp: "A: 日本へ来てから、まず何をしますか。B: 富士山を見に行きたいです。", vn: "A: Sau khi đến Nhật, việc đầu tiên bạn làm gì? B: Tôi muốn đi ngắm núi Phú Sĩ." },
    { jp: "手を洗ってから、ご飯を食べます。", vn: "Rửa tay sạch sẽ xong rồi mới ăn cơm." },
    { jp: "仕事が終わってから、飲みに行きませんか。", vn: "Công việc xong xuôi rồi chúng ta đi uống chút gì không?" }
  ]},
  { pattern: "N1 は N2 が A", meaning: "N1 thì có bộ phận bộ vị N2 mang tính chất đặc điểm A", note: "Mẫu câu miêu tả thuộc tính, đặc điểm một phần bộ phận cơ thể hoặc tính chất của chủ thể N1.", examples: [
    { jp: "ウサギは耳が長いです。", vn: "Con thỏ thì có đôi tai dài." },
    { jp: "象は鼻が長いです。", vn: "Con voi thì có chiếc mũi dài." },
    { jp: "蛇は体が長いです。", vn: "Con rắn thì có cơ thể dài." },
    { jp: "マリアさんは髪が長いです。", vn: "Chị Maria có mái tóc dài óng ả." },
    { jp: "日本は山が多いです。", vn: "Đất nước Nhật Bản thì có nhiều đồi núi." }
  ]}
];

dialogues14_20[16] = [
  { jp: "A: 昨日、大学が終わってから何をしましたか。B: 新宿へ行って、映画を見て、それから友達とお茶を読みました。", vn: "A: Hôm qua, sau khi học xong ở trường đại học bạn làm gì thế? B: Tôi đi Shinjuku, xem phim truyện, rồi sau đó đi uống trà cùng bạn bè." },
  { jp: "A: カリナさんはどんな人ですか。B: 若くて、きれいで, そして頭が良くて親切な人ですよ。", vn: "A: Chị Karina là người thế nào vậy? B: Là người vừa trẻ trung, xinh đẹp, thông minh lại tốt bụng nữa đó." },
  { jp: "A: すみません、マリアさんはどの人ですか。B: あの髪が長くて、背が高い人ですよ. ほら, あそこにいます。", vn: "A: Xin lỗi, chị Maria là người nào thế? B: Là cái người tóc dài, dáng cao cao kia kìa. Nhìn xem, cô ấy đứng đằng kia kìa." }
];

// --- BÀI 17 ---
grammar14_20[17] = [
  { pattern: "Vないで ください", meaning: "Xin đừng làm hành động V", note: "Mẫu câu yêu cầu khuyên bảo một cách lịch sự đối phương không được thực hiện một hành vi nào đó.", examples: [
    { jp: "危ないですから、写真を撮らないでください。", vn: "Vì nguy hiểm nên xin vui lòng đừng chụp ảnh ở đây." },
    { jp: "お酒をたくさん飲まないでください。", vn: "Xin vui lòng đừng uống nhiều rượu quá." },
    { jp: "ここでタバコを吸わないでください。", vn: "Xin vui lòng đừng hút thuốc lá ở vị trí này." },
    { jp: "私の大切な約束を忘れないでください。", vn: "Xin đừng quên cái hẹn quan trọng của tôi nhé." },
    { jp: "A: 心配しないでください。B: はい, わかりました。", vn: "A: Xin đừng quá lo lắng lo âu. B: Vâng, tôi biết rồi." }
  ]},
  { pattern: "Vなければ なりません", meaning: "Bắt buộc bắt phải làm hành động V", note: "Biểu thị nghĩa vụ bách tính bắt buộc phải làm, không phụ thuộc ý chí cá nhân.", examples: [
    { jp: "病気ですから、毎日薬を飲まなければなりません。", vn: "Vì đang đau ốm nên hằng ngày tôi phải uống thuốc." },
    { jp: "仕事が多いですから、今晩残業しなければなりません。", vn: "Vì việc nhiều nên tối nay tôi phải tăng ca làm thêm." },
    { jp: "毎朝、6時に起きなければなりません。", vn: "Mỗi sáng sớm tôi bắt buộc phải thức dậy lúc 6 giờ." },
    { jp: "教室で日本語を話さなければなりません。", vn: "Trong lớp học chúng tôi bắt buộc phải nói bằng tiếng Nhật." },
    { jp: "明日テストですから、今晩勉強しなければなりません。", vn: "Vì mai kiểm tra nên tối nay phải học bài." }
  ]},
  { pattern: "Vなくても いいです", meaning: "Không làm hành động V cũng được", note: "Biểu thị sự cho phép đối phương không cần thiết phải tiến hành thực hiện một hành vi nào đó.", examples: [
    { jp: "足が痛いですから、サッカーをしなくてもいいです。", vn: "Vì đau chân nên bạn không chơi đá bóng cũng được." },
    { jp: "お腹がいっぱいですから、全部食べなくてもいいです。", vn: "Vì no bụng rồi nên không ăn hết toàn bộ cũng được." },
    { jp: "熱がありますから、今日の宿題をしなくてもいいです。", vn: "Vì bị sốt nên bài tập hôm nay không làm cũng được." },
    { jp: "日曜日ですから、学校へ行かなくてもいいです。", vn: "Vì là ngày Chủ nhật nên không cần đến trường học cũng được." },
    { jp: "A: 急がなくてもいいですか。B: はい, 時間がたくさんありますから。", vn: "A: Không cần vội vã vội vàng có được không? B: Vâng, vì còn nhiều thời gian mà." }
  ]},
  { pattern: "Thời gian までに Vます", meaning: "Phải thực hiện xong hành động V trước mốc thời hạn", note: "Chỉ rõ giới hạn mốc thời gian cuối cùng hành động bắt buộc phải hoàn thành kết thúc.", examples: [
    { jp: "夜7時半までにうちへ帰らなければなりません。", vn: "Tôi phải quay về nhà trước mốc 7 giờ rưỡi tối." },
    { jp: "9時までに学校へ来なければなりません。", vn: "Học sinh phải có mặt ở trường trước 9 giờ." },
    { jp: "夜12時までに寝るようにしています。", vn: "Tôi cố gắng ngủ trước 12 giờ đêm." },
    { jp: "来週の月曜日までにレポートを出さなければなりません。", vn: "Phải nộp bản báo cáo trước ngày thứ hai tuần sau." },
    { jp: "30歳までに結婚したいと考えています。", vn: "Tôi muốn kết hôn trước khi chạm mốc 30 tuổi." }
  ]}
];

dialogues14_20[17] = [
  { jp: "A: すみません、ここでタバコを吸わないでください。禁煙ですよ。B: あ、はい、すみません。どこで吸ってもいいですか。A: 外の喫煙所で吸ってください。", vn: "A: Xin lỗi, xin đừng hút thuốc ở đây. Khu vực cấm hút thuốc đó ạ. B: Á, vâng xin lỗi. Vậy tôi hút ở đâu được nhỉ? A: Xin mời ra khu hút thuốc ngoài trời ạ." },
  { jp: "A: 明日の晩のパーティーは、何時までに帰らなければなりませんか。B: 10時半までに帰らなければなりません。寮のドアが閉まりますから。", vn: "A: Buổi tiệc tối mai bắt buộc phải về trước mấy giờ vậy? B: Phải về trước 10 giờ rưỡi. Vì cửa ký túc xá sẽ đóng lại sau giờ đó." },
  { jp: "A: 先生、明日も学校へ来なければなりませんか。B: いいえ、明日は休みですから, 来なくてもいいですよ。ゆっくり休んでください。", vn: "A: Thầy ơi, mai em có phải đến trường không ạ? B: Không, mai nghỉ nên em không đến cũng được. Hãy nghỉ ngơi thoải mái đi." }
];

// --- BÀI 18 ---
grammar14_20[18] = [
  { pattern: "N / Vること が できます", meaning: "Có khả năng làm N / hành động V", note: "Diễn tả năng lực thiên phú, kỹ năng được học tập hoặc khả năng hoàn cảnh cho phép thực hiện hành vi.", examples: [
    { jp: "私はスキーができます。", vn: "Tôi có thể chơi trượt tuyết." },
    { jp: "一人で日本料理を作ることができます。", vn: "Tôi có thể tự mình nấu được món ăn Nhật." },
    { jp: "大勢の前で日本語を話すことができます。", vn: "Tôi có thể nói tiếng Nhật tự tin trước đám đông." },
    { jp: "子供の頃からピアノを弾くことができます。", vn: "Tôi có thể chơi đàn piano từ thuở nhỏ." },
    { jp: "夜遅くでも図書館で本を読むことができます。", vn: "Người ta có thể đọc sách ở thư viện ngay cả lúc đêm muộn." }
  ]},
  { pattern: "私の趣味 は N / Vること です", meaning: "Sở thích cá nhân của tôi là N / việc làm hành động V", note: "Dùng giới thiệu bản thân. Bắt buộc động từ phải thêm こと để danh từ hóa cụm hành động hành vi.", examples: [
    { jp: "私の趣味は楽しい旅行です。", vn: "Sở thích của tôi là những chuyến đi du lịch vui vẻ." },
    { jp: "私の趣味は川での釣りです。", vn: "Sở thích của tôi là câu cá ở bờ sông." },
    { jp: "私の趣味は色々な写真を撮ることです。", vn: "Sở thích của tôi là chụp thật nhiều bức ảnh đa dạng." },
    { jp: "私の趣味は外国の本を読むことです。", vn: "Sở thích của tôi là đọc sách nước ngoài." },
    { jp: "A: あなたの趣味は何ですか。B: 音楽を聞くことです。", vn: "A: Sở thích của bạn là cái gì thế? B: Là việc lắng nghe âm nhạc." }
  ]},
  { pattern: "V1る まえに、V2ます", meaning: "Trước khi thực hiện V1 thì làm hành động V2", note: "Hành động vế 2 luôn xảy ra trước mốc thời gian vế 1. Động từ vế 1 bắt buộc luôn ở thể từ điển (Vる).", examples: [
    { jp: "ご飯を食べる前に必ず手を洗います。", vn: "Trước khi ăn cơm tôi luôn rửa tay sạch sẽ." },
    { jp: "夜寝る前に温かいシャワーを浴びます。", vn: "Trước khi ngủ ban đêm tôi tắm vòi sen nước ấm." },
    { jp: "大切なテストの前に一生懸命勉強します。", vn: "Trước kỳ thi quan trọng tôi học hành cực kỳ chăm chỉ." },
    { jp: "A: 日本へ行く前にまず何をしますか。B: ビザを申請します。", vn: "A: Trước khi sang Nhật bạn làm gì đầu tiên? B: Tôi xin cấp thị thực visa." },
    { jp: "彼と結婚する前に長い間旅行をしたいです。", vn: "Before kết hôn với anh ấy tôi muốn đi du lịch dài ngày." }
  ]},
  { pattern: "なかなか Vません", meaning: "Mãi mà không V / Khó lòng mà làm được V", note: "Phó từ なかなか kết hợp thể phủ định chỉ trạng thái khó khăn, trì trệ mãi chưa hoàn tất.", examples: [
    { jp: "ベトナムの南部ではなかなか雪を見ることができません。", vn: "Ở miền nam Việt Nam thì khó lòng mà nhìn thấy tuyết rơi." },
    { jp: "高いですから、なかなか新しい車を買いません。", vn: "Vì đắt đỏ nên mãi mà tôi chưa mua ô tô mới." },
    { jp: "言葉が難しいですから, なかなか漢字を覚えられません。", vn: "Từ vựng khó quá nên mãi tôi không nhớ nổi chữ Hán." },
    { jp: "バスがなかなか来ませんから, 遅刻しました。", vn: "Xe buýt mãi không thấy tới nên tôi đã bị muộn giờ." },
    { jp: "複雑ですから, なかなか理解することができません。", vn: "Vì phức tạp quá nên khó lòng mà hiểu thấu đáo được." }
  ]}
];

dialogues14_20[18] = [
  { jp: "A: サントスさんは車の運転をすることができますか。B: はい、できますよ。国際免許を持っていますから。A: すごいですね。どこでも行くことができますね。", vn: "A: Anh Santos có thể lái xe ô tô được không? B: Có, tôi lái được chứ. Vì tôi có bằng lái quốc tế mà. A: Tuyệt vời quá. Vậy thì đi đâu cũng được nhỉ." },
  { jp: "A: マリアさんの趣味は何ですか。テニスですか。B: いいえ、私の趣味は写真を撮ることと, 外国の音楽を聞くことです。", vn: "A: Sở thích của chị Maria là gì thế? Chơi tennis à? B: Không, sở thích của tôi là chụp ảnh và lắng nghe âm nhạc nước ngoài." },
  { jp: "A: ご飯を食べる前に、「いただきます」と言いましたか。B: はい、言いました。日本の文化ですから, 覚えましたよ。", vn: "A: Trước khi ăn cơm bạn có nói 'Itadakimasu' không? B: Có, tôi nói chứ. Vì là văn hóa Nhật nên tôi đã ghi nhớ rồi." }
];

// --- BÀI 19 ---
grammar14_20[19] = [
  { pattern: "Vた ことが あります", meaning: "Đã từng thực hiện hành động V trong quá khứ", note: "Diễn tả trải nghiệm, kinh nghiệm trải qua trong đời. Không dùng cho hành động có tính chất hiển nhiên.", examples: [
    { jp: "私は一度京都へ行ったことがあります。", vn: "Tôi đã từng có dịp đi đến Kyoto một lần." },
    { jp: "日本の有名な相撲を見たことがあります。", vn: "Tôi đã từng xem trận đấu Sumo nổi tiếng của Nhật." },
    { jp: "自分で美味しい日本料理を作ったことがあります。", vn: "Tôi đã từng tự tay nấu món ăn Nhật Bản ngon lành." },
    { jp: "友達と一緒に高い富士山に登ったことがあります。", vn: "Tôi đã từng cùng bạn bè leo lên ngọn núi Phú Sĩ cao vút." },
    { jp: "A: お寿司を食べたことがありますか。B: いいえ、一度もありません。", vn: "A: Bạn đã từng ăn món sushi bao giờ chưa? B: Chưa, tôi chưa ăn một lần nào cả." }
  ]},
  { pattern: "V1たり、V2たり します", meaning: "Lúc thì làm V1, lúc lại làm V2... (Liệt kê)", note: "Liệt kê các hành động mang tính chất tiêu biểu, không phụ thuộc trình tự thời gian thời mốc. Động từ cuối cùng quyết định thời gian.", examples: [
    { jp: "日曜日、私は部屋を掃除したり、洗濯したりしました。", vn: "Ngày Chủ nhật, tôi lúc thì dọn dẹp phòng ốc, lúc thì giặt giũ quần áo." },
    { jp: "明日、私は友達に手紙を書いたり、日本語を勉強したりします。", vn: "Ngày mai, tôi sẽ viết thư cho bạn, rồi học tiếng Nhật chẳng hạn." },
    { jp: "A: 毎週末、何をしますか。B: 買い物したり、映画を見たりします。", vn: "A: Mỗi cuối tuần bạn thường làm gì? B: Tôi đi mua sắm, rồi xem phim truyện này nọ." },
    { jp: "去年の夏休み、海で泳いだり、山に登ったりしました。", vn: "Kỳ nghỉ hè năm ngoái, tôi lúc thì đi bơi ở biển, lúc lại leo núi." },
    { jp: "暇な時、音楽を聞いたり、本を読んだりして過ごします。", vn: "Khi rảnh rỗi, tôi thường nghe nhạc, đọc sách để giết thời gian." }
  ]},
  { pattern: "A(bỏ い)く なります / N・A(bỏ な)に なります", meaning: "Biến đổi trạng thái (Trở nên / Trở thành)", note: "Biểu thị sự thay đổi diện mạo, tính chất hoặc nghề nghiệp cương vị theo thời gian.", examples: [
    { jp: "子供は毎日大きくなります。", vn: "Đứa trẻ mỗi ngày một lớn khôn lớn lên." },
    { jp: "毎日勉強して賢くなります。", vn: "Mỗi ngày tôi học bài và trở nên thông minh hơn." },
    { jp: "私の将来の夢は、優しい医者になりたいです。", vn: "Ước mơ tương lai của tôi là muốn trở thành một bác sĩ nhân từ." },
    { jp: "良い薬を飲んでから、体が元気になりました。", vn: "Sau khi uống thuốc tốt, cơ thể tôi đã trở nên khỏe mạnh trở lại." },
    { jp: "綺麗に化粧してから、顔が美しくなりました。", vn: "Sau khi trang điểm lộng lẫy, gương mặt đã trở nên xinh đẹp hẳn lên." }
  ]},
  { pattern: "将来、何に なりますか", meaning: "Tương lai bạn sẽ trở thành ai / nghề gì?", note: "Dùng để hỏi về định hướng nghề nghiệp, vị trí trong tương lai tương lai.", examples: [
    { jp: "A: 将来、何になりたいですか。B: 日本語の先生になります。", vn: "A: Tương lai bạn muốn trở thành gì? B: Tôi sẽ trở thành giáo viên dạy tiếng Nhật." },
    { jp: "3月になると、だんだん暖かくて春になります。", vn: "Cứ sang tháng 3 là thời tiết ấm dần và trở thành mùa xuân." },
    { jp: "8月はとても暑い夏になります。", vn: "Tháng 8 sẽ trở thành chu kỳ mùa hè vô cùng nóng nực." },
    { jp: "A: 誰になりたいですか。B: 有名な歌手になりたいです。", vn: "A: Bạn muốn trở thành ai? B: Tôi muốn biến thành một ca sĩ nổi tiếng." },
    { jp: "午後6時になると, 辺りは暗くなります。", vn: "Cứ đến 6 giờ tối là xung quanh bắt đầu tối om." }
  ]}
];

dialogues14_20[19] = [
  { jp: "A: 今まで歌舞伎を見たことがありますか。B: いいえ、一度もありませんが, ぜひ一度見たいと思います。面白そうですね。", vn: "A: Từ trước tới giờ bạn đã từng xem kịch Kabuki chưa? B: Chưa, tôi chưa xem lần nào cả nhưng nhất định muốn xem một lần. Trông có vẻ thú vị nhỉ." },
  { jp: "A: 休みの日はいつも何をしますか。B: 日によって違いますが、本を読んだり、公園を散歩したりします。", vn: "A: Ngày nghỉ bạn thường làm cái gì vậy? B: Tùy từng ngày thay đổi khác nhau, khi thì đọc sách, lúc lại đi dạo mát ở công viên." },
  { jp: "A: 薬を飲んでから, もう体は良くなりましたか。B: ええ、おかげさまで元気になりました。心配しないでください。", vn: "A: Sau khi uống thuốc cơ thể đã đỡ hơn chưa? B: Vâng, ơn trời tôi đã khỏe khoắn trở lại rồi. Xin đừng lo âu nữa." }
];

// --- BÀI 20 ---
grammar14_20[20] = [
  { pattern: "V Thể thông thường (Giao tiếp ngắn)", meaning: "Thể thông thường ứng dụng của động từ", note: "Dùng trong văn nói nói chuyện thân mật suồng sã với bạn bè thân thiết, người dưới, gia đình.", examples: [
    { jp: "明日、学校に行く。", vn: "Mai tao đi học." },
    { jp: "今日、学校に行かない。", vn: "Hôm nay tao không đi học." },
    { jp: "昨日、学校に行った。", vn: "Hôm qua tao đi học rồi." },
    { jp: "一昨日、学校に行かなかった。", vn: "Hôm kia tao đã không đi học." },
    { jp: "A: 毎日本を読む？ B: うん、読むよ。", vn: "A: Mỗi ngày mày có đọc sách không? B: Ừ, tao có đọc chứ." }
  ]},
  { pattern: "N / Aな Thể thông thường (Dùng だ / じゃない)", meaning: "Thể thông thường của Danh từ và Tính từ đuôi な", note: "Thay thế です bằng だ trong câu khẳng định, じゃありません bằng じゃない trong câu phủ định.", examples: [
    { jp: "明日は雨だ。", vn: "Mai trời mưa đấy." },
    { jp: "明日は雨じゃない。", vn: "Mai trời không mưa đâu." },
    { jp: "昨日は大忙しの休みだった。", vn: "Hôm qua đã là một ngày nghỉ bận rộn." },
    { jp: "昨日は休みじゃなかった。", vn: "Hôm qua đã không phải là ngày nghỉ." },
    { jp: "A: 今日は暇？ B: うん、暇だよ。", vn: "A: Hôm nay rảnh không mày? B: Ừ, rảnh rang mà." }
  ]},
  { pattern: "Aい Thể thông thường (Lược bỏ です)", meaning: "Thể thông thường câu tính từ đuôi い", note: "Chỉ đơn thuần lược bỏ đuôi です ở phía cuối câu nói.", examples: [
    { jp: "象はとても体が大きい。", vn: "Con voi có cơ thể to lớn thật." },
    { jp: "今日の天気は暑くない。", vn: "Thời tiết hôm nay không nóng nực." },
    { jp: "昨日の夜は寒かった。", vn: "Tối hôm qua trời lạnh buốt." },
    { jp: "先週の試験は難しくなかった。", vn: "Kỳ thi tuần trước đã không khó khăn lắm." },
    { jp: "A: 日本語はおもしろい？ B: うん、すごくおもしろい。", vn: "A: Học tiếng Nhật thú vị không mày? B: Ừ, thú vị dã man." }
  ]},
  { pattern: "Lược bỏ trợ từ trong văn nói thân mật", meaning: "Cách nói tắt lược bỏ trợ từ は、を、へ", note: "Trong giao tiếp hội thoại hằng ngày, khi ý nghĩa câu đã rõ ràng, các trợ từ thường biến mất.", examples: [
    { jp: "ご飯食べる？", vn: "Ăn cơm không mày?" },
    { jp: "明日、どこ行く？", vn: "Mai mày đi đâu thế?" },
    { jp: "これ何？", vn: "Cái này cái gì vậy?" },
    { jp: "コーヒーと紅茶とどっち好き？", vn: "Cà phê với trà hồng thích cái nào hơn hả mày?" },
    { jp: "危ないからタバコを吸わないで。", vn: "Nguy hiểm nên đừng hút thuốc lá nha." }
  ]}
];

dialogues14_20[20] = [
  { jp: "A: 明日、時間ある？暇？ B: うん、あるよ。特に用事はないけど, どうして？ A: 一緒に映画見に行かない？ B: いいね。行こう行こう。", vn: "A: Mai rảnh không mày, có thời gian không? B: Ừ rảnh mà, không có việc gì đặc biệt cả, sao thế? A: Đi xem phim với tao không? B: Hay đấy. Đi luôn đi luôn." },
  { jp: "A: その辞書、山田さんの？ B: うううん、山田さんのじゃないよ。私の。A: ちょっと借りてもいい？ B: うん、いいよ。どうぞ。", vn: "A: Cuốn từ điển đó của anh Yamada hả mày? B: Không, không phải của Yamada đâu. Của tao đó. A: Cho tao mượn xíu được không? B: Ừ được chứ, cầm lấy đi." },
  { jp: "A: お腹すいた？何か食べる？ B: うん、すいた。đúng, 冷蔵庫の中に何もなくて困っている。A: じゃ、外へ食べに行こう！", vn: "A: Đói bụng chưa mày? Ăn gì không? B: Ừ đói rồi. Nhưng trong tủ lạnh không có gì cả, chán ghê. A: Thế thì ra ngoài ăn đi!" }
];

// --- QUIZZES AGGREGATED FROM 14 TO 20 ---
quizzes14_20[14] = {
  p: [
    "ここ___名前を書いてください。|に|で,を,へ", 
    "タクシー___呼びましょうか。|を|が,に,で", 
    "今___雨が降っています。|が|は,に,で", 
    "ドア___開けてください。|を|が,に,で", 
    "パスポート___見せてください。|を|が,に,で", 
    "写真___撮りましょうか。|を|が,に,で", 
    "荷物___持ちましょうか。|を|が,に,で", 
    "窓___開けましょうか。|を|が,に,で", 
    "漢字___書き方がわかりません。|の|は,が,に", 
    "カメラ___使い方を教えてください。|の|は,が,に"
  ],
  v: [
    "パスポートを___ください。|見せて|待って,持ち,つけ", 
    "少し___ください。|待って|見せて,持ち,つけ", 
    "荷物を___ましょうか。|持ち|見せて,待って,つけ", 
    "エアコンを___ましょうか。|つけ|見せて,待って,持ち", 
    "何を___ていますか。|読んで|勉強して,寝て,終わって", 
    "何を___ていますか。|食べて|飲んで,書いて,会う", 
    "今、何を___いますか。|して|見せて,待って,持ち", 
    "___書き方がわかりません。|漢字 của|見せて,待って,持ち", 
    "美味しいコーヒーの___方です。|作り|見せて,待って,持ち", 
    "日本語の勉強の仕___。|方|見せて,待って,持ち"
  ],
  g: [
    "___ください。|読んで|食べて,書き,教えて", 
    "___います。|食べて|読んで,書き,教えて", 
    "___ましょうか。|書き|読んで,食べて,教えて", 
    "使い方を___ください。|教えて|読んで,食べて,書き", 
    "どうぞ___ください。|食べて|読んで,書き,教えて", 
    "今、コーヒーを飲んで___。|います|いません,いました,いませんでした", 
    "今、サンドイッチを食べて___。|います|いません,いました,いませんでした", 
    "写真を撮り___。|ましょうか|ます,ません,ました", 
    "荷物を持ち___。|ましょうか|ます,ません,ました", 
    "タクシーを呼び___。|ましょうか|ます,ません,ました"
  ]
};

quizzes14_20[15] = {
  p: [
    "写真___撮ってもいいですか。|を|が,に,で", 
    "ここ___車を止めては。|に|で,を,へ", 
    "どこ___住んでいますか。|に|で,を,へ", 
    "会社___働いています。|で|に,を,へ", 
    "ご飯___食べてもいいです。|を|が,に,で", 
    "エアコン___つけてもいいですか。|を|が,に,で", 
    "ここ___泳いではいけません。|で|に,を,へ", 
    "病院___電話をかけてはいけません。|で|に,を,へ", 
    "ハノイ___住んでいます。|に|で,を,へ", 
    "アップル___iPhoneを売っています。|で|に,を,へ"
  ],
  v: [
    "___はいけません。|入って|座って,結婚して,住んで", 
    "___もいいです。|座って|入って,結婚して,住んで", 
    "独身ですか？いいえ、___います。|結婚して|入って,座って,住んで", 
    "大阪に___います。|住んで|入って,座って,結婚して", 
    "寝て___いいです。|も|入って,座って,結婚して", 
    "写真を___もいいですか。|撮って|入って,座って,結婚して", 
    "危ないから___はいけません。|入って|座って,結婚して,住んで", 
    "タバコを___はいけません。|吸って|入って,座って,結婚して", 
    "ソン先生を___います。|知って|入って,座って,結婚して", 
    "車を___います。|持って|入って,座って,結婚して"
  ],
  g: [
    "___もいいですか。|帰って|吸って,知って,持って", 
    "___はいけません。|吸って|帰って,知って,持って", 
    "___います。|知って|帰って,吸って,持って", 
    "___いません。|持って|帰って,吸って,知って", 
    "バスに___。|乗ります|降ります,乗り換えます,登ります", 
    "電車を___。|降ります|乗ります,乗り換えます,登ります", 
    "電車から新幹線に___。|乗り換えます|乗ります,降ります,登ります", 
    "山に___。|登ります|乗ります,降ります,乗り換えます", 
    "電車は駅に___。|着きました|乗ります,降ります,乗り換えます", 
    "iPhoneを___います。|使って|乗ります,降ります,乗り換えます"
  ]
};

quizzes14_20[16] = {
  p: [
    "朝起きて、浴びて、それ___朝ご飯を食べます。|から|まで,に,を", 
    "ご飯を食べて___、寝ます。|から|まで,に,で", 
    "ハノイ___人が多いです。|は|が,を,に", 
    "象は鼻___長いです。|が|を,に,で", 
    "カリナさん___30歳で、会社員です。|は|が,を,に", 
    "太郎くん___9歳で、学生です。|は|が,を,に", 
    "彼女___ベトナム人で、実習生です。|は|が,を,に", 
    "ズンさん___クラス長で、18歳です。|は|が,を,に", 
    "これ___日本の本で、面白いです。|は|が,を,に", 
    "ウサギ___耳が長いです。|は|が,を,に"
  ],
  v: [
    "銀行へ___、お金を下ろします。|行って|ハンサムで,新しくて,大学へ", 
    "ジョイさんは___、親切です。|ハンサムで|行って,新しくて,大学へ", 
    "この車は___、安いです。|新しくて|行って,ハンサムで,大学へ", 
    "どうやって___行きますか。|大学へ|行って,ハンサムで,新しくて", 
    "毎朝、起きて、___、それから朝ご飯を食べます。|浴びて|行って,ハンサムで,新しくて", 
    "帰って、テレビを___、それから寝ます。|見て|行って,ハンサムで,新しくて", 
    "デパートへ行って、買い物を___、映画を見ました。|して|行って,ハンサムで,新しくて", 
    "本を読んで、手紙を___、寝ました。|書いて|行って,ハンサムで,新しくて", 
    "友達に___、食事しました。|会って|行って,ハンサムで,新しくて", 
    "ジャンさんはきれいで、___です。|上手|行って,ハンサムで,新しくて"
  ],
  g: [
    "___、遊びます。|勉強して|終わってから,長いです,大きいです", 
    "___、寝ます。|終わってから|勉強して,長いです,大きいです", 
    "髪が___。|長いです|勉強して,終わってから,大きいです", 
    "目が___。|大きいです|勉強して,終わってから,長いです", 
    "日本へ来てから、日本語を___。|勉強します|勉強して,終わってから,長いです", 
    "帰ってから、___。|食べます|勉強して,終わってから,長いです", 
    "日本へ来てから、何を___。|しますか|勉強して,終わってから,長いです", 
    "手を洗ってから、ご飯を___。|食べます|勉強して,終わってから,長いです", 
    "仕事が終わってから、飲みに___。|行きます|勉強して,終わってから,長いです", 
    "太郎くんはハンサムで、親切___。|です|勉強して,終わってから,長いです"
  ]
};

quizzes14_20[17] = {
  p: [
    "ここ___写真を撮らないで。|で|に,を,へ", 
    "車___止めないでください。|を|が,に,で", 
    "7時___帰らなければなりません。|までに|で,を,へ", 
    "明日___来なくてもいい。|は|が,を,に", 
    "ビール___飲まないでください。|を|が,に,で", 
    "ここ___タバコを吸わないでください。|で|に,を,へ", 
    "病気___から、薬を飲みます。|です|で,を,へ", 
    "仕事___多いですから、残業します。|が|を,に,で", 
    "毎朝、6時___起きなければ。|に|で,を,へ", 
    "教室___日本語を話さなければ。|で|に,を,へ"
  ],
  v: [
    "無理を___ください。|しないで|飲まなければ,払わなくても,金曜日", 
    "薬を___なりません。|飲まなければ|しないで,払わなくても,金曜日", 
    "お金を___いいです。|払わなくても|しないで,飲まなければ,金曜日", 
    "___までに。|金曜日|しないで,飲まなければ,払わなくても", 
    "写真を___でください。|撮らない|しないで,飲まなければ,払わなくても", 
    "ビールを___でください。|飲まない|しないで,飲まなければ,払わなくても", 
    "ここでタバコを___でください。|吸わない|しないで,飲まなければ,払わなくても", 
    "___でください。|忘れない|しないで,飲まなければ,払わなくても", 
    "心配し___でください。|ない|しないで,飲まなければ,払わなくても", 
    "薬を飲まなければ___。|なりません|しないで,飲まなければ,払わなくても"
  ],
  g: [
    "___でください。|忘れない|出さなければ,脱がなくても,起き", 
    "___なりません。|出さなければ|忘れない,脱がなくても,起き", 
    "___いいです。|脱がなくても|忘れない,出さなければ,起き", 
    "___なければなりません。|起き|忘れない,出さなければ,脱がなくても", 
    "残業し___なりません。|なければ|忘れない,出さなければ,脱がなくても", 
    "起き___なりません。|なければ|忘れない,出さなければ,脱がなくても", 
    "話さ___なりません。|なければ|忘れない,出さなければ,脱がなくても", 
    "勉強し___なりません。|なければ|忘れない,出さなければ,脱がなくても", 
    "サッカーをし___いいです。|なくても|忘れない,出さなければ,脱がなくても", 
    "食べ___いいです。|なくても|忘れない,出さなければ,脱がなくても"
  ]
};

quizzes14_20[18] = {
  p: [
    "漢字___読むことができます。|が|を,に,で", 
    "趣味___映画です。|は|が,を,に", 
    "寝る___、本を読みます。|前に|は,が,を", 
    "日本___行く前に。|へ|に,で,を", 
    "スキー___できます。|が|を,に,で", 
    "料理___作ることができます。|を|が,に,で", 
    "日本語___話すことができます。|を|g,に,で", 
    "ピアノ___弾くことができます。|を|g,に,で", 
    "図書館___本を読むことができます。|で|に,を,へ", 
    "私___趣味は旅行です。|の|は,g,に"
  ],
  v: [
    "___ことができます。|泳ぐ|スキー,描く,食事の", 
    "___ができます。|スキー|泳ぐ,描く,食事の", 
    "趣味は絵を___ことです。|描く|泳ぐ,スキー,食事の", 
    "___前に、手を洗います。|食事の|泳ぐ,スキー,描く", 
    "私の趣味は___です。|旅行|泳ぐ,スキー,描く", 
    "私の趣味は___です。|釣り|泳ぐ,スキー,描く", 
    "私の趣味は写真を___ことです。|撮る|泳ぐ,スキー,描く", 
    "私の趣味は本を___ことです。|読む|泳ぐ,スキー,描く", 
    "あなたの___は何ですか。|趣味|泳ぐ,スキー,描く", 
    "___前に手を洗います。|食べる|泳ぐ,スキー,描く"
  ],
  g: [
    "___ことができますか。|運転する|来る,集める,行きたいです", 
    "___前に。|来る|運転する,集める,行きたいです", 
    "___ことです。|集める|運転する,来る,行きたいです", 
    "ぜひ___。|行きたいです|運転する,来る,集める", 
    "寝る___に浴びます。|前|運転する,来る,集める", 
    "テストの前に___します。|勉強|運転する,来る,集める", 
    "日本へ行く前に何を___か。|します|運転する,来る,集める", 
    "結婚する前に何を___か。|します|運転する,来る,集める", 
    "ベトナムでなかなか雪を見る___ができません。|こと|運転する,来る,集める", 
    "なかなかエベレストに___ません。|登り|運転する,来る,集める"
  ]
};

quizzes14_20[19] = {
  p: [
    "相撲___見たことがあります。|を|が,に,で", 
    "休みの日___、。|は|が,を,に", 
    "秋___なりました。|に|で,を,へ", 
    "部屋___きれいに。|が|を,に,で", 
    "京都___行ったことがあります。|へ|に,で,を", 
    "日本料理___作ったことがあります。|を|が,に,で", 
    "富士山___登ったことがあります。|に|で,を,へ", 
    "昨日、私は掃除___、洗濯したりしました。|したり|が,を,に", 
    "明日、私は手紙を書いたり、勉強___します。|したり|は,が,を", 
    "週末、何___しますか。|を|が,に,で"
  ],
  v: [
    "___ことがあります。|行った|聞い,読ん,高く", 
    "音楽を___りします。|聞い|行った,読ん,高く", 
    "本を___りします。|読ん|行った,聞い,高く", 
    "___なります。|高く|行った,聞い,読ん", 
    "___ことがあります。|見た|行った,聞い,読ん", 
    "___ことがあります。|作った|行った,聞い,読ん", 
    "___ことがあります。|登った|行った,聞い,読ん", 
    "___ことがありますか。|行った|聞い,読ん,高く", 
    "買い物し___、映画を見たりします。|たり|行った,聞い,読ん", 
    "海で泳いだり、山に___りしました。|登った|行った,聞い,読ん"
  ],
  g: [
    "___ことがあります。|食べた|食べ,元気に,20歳に", 
    "___り、飲んだりします。|食べ|食べた,元気に,20歳に", 
    "___なります。|元気に|食べた,食べ,20歳に", 
    "___なりました。|20歳に|食べた,食べ,元気に", 
    "大きくなります。|大きく|食べた,食べ,元気に", 
    "背が高くなります。|高く|食べた,食べ,元気に", 
    "私の夢は医者になり___です。|たい|食べた,食べ,元気に", 
    "薬を飲んでから、元気に___ました。|なり|食べた,食べ,元気に", 
    "化粧してから、きれいに___ました。|なり|食べた,食べ,元気に", 
    "将来、何に___か。|なります|食べた,食べ,元気に"
  ]
};

quizzes14_20[20] = {
  p: [
    "明日___暇？|は|が,を,に", 
    "富士山___登った？|に|で,を,へ", 
    "映画___見に行く？|を|が,に,で", 
    "明日は雨___。|だ|です,じゃありません,でした", 
    "明日は雨___。|じゃない|です,じゃありません,でした", 
    "昨日は休み___。|だった|です,じゃありません,でした", 
    "昨日は休み___。|じゃなかった|です,じゃありません,でした", 
    "象は体___大きい。|が|を,に,で", 
    "今日は暑く___。|ない|です,じゃありません,でした", 
    "昨日は寒___。|かった|です,じゃありません,でした"
  ],
  v: [
    "明日、___？|来る|行く,行かない,持っている", 
    "うん、___。|行く|来る,行かない,持っている", 
    "うううん、___。|行かない|来る,行く,持っている", 
    "辞書、___？|持っている|来る,行く,行かない", 
    "ご飯___？|食べる|来る,行く,行かない", 
    "明日、どこ___？|行く|来る,行かない,持っている", 
    "これ___？|何|来る,行く,行かない", 
    "コーヒーと紅茶とどっち___？|好き|来る,行く,行かない", 
    "タバコを___で。|吸わない|来る,行く,行かない", 
    "見に___？ ええ、行こう。|行かない|来る,行く,持っている"
  ],
  g: [
    "明日雨___。|だ|？,きれい,だった", 
    "毎日忙しい___。|？|だ,きれい,だった", 
    "きれい___。|だ|？,だった,じゃない", 
    "昨日休み___。|だった|だ,？,きれい", 
    "学校に___。|行く|だ,？,きれい", 
    "学校に___。|行かない|だ,？,きれい", 
    "学校に___。|行った|だ,？,きれい", 
    "学校に___。|行かなかった|だ,？,きれい", 
    "毎日本を読む？ うん、___。|読む|だ,？,きれい", 
    "試験は難しく___。|なかった|だ,？,きれい"
  ]
};
