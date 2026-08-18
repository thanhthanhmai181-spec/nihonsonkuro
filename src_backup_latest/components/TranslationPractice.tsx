import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  BookOpen,
  Check,
  AlertCircle
} from "lucide-react";
import { playSound } from "../utils/audio";

interface TranslationPracticeProps {
  onGoBack: () => void;
}

interface TranslationItem {
  jp: string;
  vi: string;
  module: string;
}

// Corrected translation exercises with typos fixed and spelling/grammar corrected
const TRANSLATION_DATA: TranslationItem[] = [
  // Từ ghép
  { jp: "私の仕事", vi: "Công việc của tôi", module: "Từ ghép" },
  { jp: "A大学の学生", vi: "Sinh viên trường đại học A", module: "Từ ghép" },
  { jp: "日本の電話", vi: "Điện thoại Nhật Bản", module: "Từ ghép" },
  { jp: "あなたの国", vi: "Đất nước của bạn", module: "Từ ghép" },
  { jp: "日本語の先生", vi: "Giáo viên tiếng Nhật", module: "Từ ghép" },
  { jp: "可愛い女の子", vi: "Cô gái dễ thương", module: "Từ ghép" },
  { jp: "静かな場所", vi: "Nơi yên tĩnh", module: "Từ ghép" },
  { jp: "素敵な時計", vi: "Đồng hồ đẹp", module: "Từ ghép" },
  { jp: "簡単な問題", vi: "Bài toán dễ", module: "Từ ghép" },
  { jp: "美味しい食べ物", vi: "Thức ăn ngon", module: "Từ ghép" },
  { jp: "使った物", vi: "Đồ đã dùng", module: "Từ ghép" },
  { jp: "住んでいる所", vi: "Nơi đang sống", module: "Từ ghép" },
  { jp: "あそこに立っている人", vi: "Người đứng đằng kia", module: "Từ ghép" },
  { jp: "彼女と見たい映画", vi: "Bộ phim muốn xem cùng cô ấy", module: "Từ ghép" },
  { jp: "東京に行く電車", vi: "Chuyến tàu đi Tokyo", module: "Từ ghép" },
  { jp: "早くしてください。", vi: "Làm ơn hãy nhanh lên.", module: "Từ ghép" },
  { jp: "きれいに掃除して。", vi: "Lau dọn sạch sẽ.", module: "Từ ghép" },
  { jp: "元気になりましたね。", vi: "Bạn đã khỏe hơn nhỉ.", module: "Từ ghép" },
  { jp: "遅くなりました。", vi: "Tôi đến muộn.", module: "Từ ghép" },
  { jp: "細かく切って。", vi: "Cắt nhỏ ra.", module: "Từ ghép" },

  // Câu đơn
  { jp: "私は学生です。", vi: "Tôi là học sinh.", module: "Câu đơn" },
  { jp: "こちらは私の家です。", vi: "Đây là nhà tôi.", module: "Câu đơn" },
  { jp: "あの人は私の姉の友達です。", vi: "Người đó là bạn của chị tôi.", module: "Câu đơn" },
  { jp: "これはあなたのじゃない？", vi: "Cái này không phải của bạn à?", module: "Câu đơn" },
  { jp: "あの人は誰？", vi: "Người đó là ai?", module: "Câu đơn" },
  { jp: "ミーさんはご飯を食べています。", vi: "My đang ăn cơm.", module: "Câu đơn" },
  { jp: "田中さんはABC会社の部長と話しています。", vi: "Anh Tanaka đang nói chuyện với trưởng phòng công ty ABC.", module: "Câu đơn" },
  { jp: "私は友達と日本へ行きたいです。", vi: "Tôi muốn đi Nhật với bạn bè.", module: "Câu đơn" },
  { jp: "あなたはどこへ行きましたか。", vi: "Bạn đã đi đâu?", module: "Câu đơn" },
  { jp: "チーさんは庭で花の写真を撮っています。", vi: "Chi đang chụp ảnh hoa ở vườn.", module: "Câu đơn" },
  { jp: "（私は）料理をつくっている。", vi: "Đang nấu ăn.", module: "Câu đơn" },
  { jp: "（あなたは）何をたべたい？", vi: "Muốn ăn gì?", module: "Câu đơn" },
  { jp: "（私は）食堂でご飯を食べた。", vi: "Đã ăn cơm ở nhà ăn.", module: "Câu đơn" },
  { jp: "（私は）3月15日に飛行機で日本に来た。", vi: "Đã đến Nhật bằng máy bay vào ngày 15 tháng 3.", module: "Câu đơn" },
  { jp: "（あなたは）床を掃除して。", vi: "Lau sàn đi.", module: "Câu đơn" },
  { jp: "今日の天気はいいですね。", vi: "Hôm nay thời tiết đẹp nhỉ.", module: "Câu đơn" },
  { jp: "今日は休みですか。", vi: "Hôm nay bạn nghỉ à?", module: "Câu đơn" },
  { jp: "私は友達と用事がありますから。", vi: "Vì tôi có việc với bạn.", module: "Câu đơn" },
  { jp: "私はお金が欲しいです。", vi: "Tôi muốn có tiền.", module: "Câu đơn" },
  { jp: "私は金曜日までにレポートを出さなければなりません。", vi: "Tôi phải nộp báo cáo trước thứ Sáu.", module: "Câu đơn" },
  { jp: "はやくやってください。", vi: "Hãy làm nhanh lên.", module: "Câu đơn" },
  { jp: "出来ないと思う。", vi: "Tôi nghĩ là không thể.", module: "Câu đơn" },
  { jp: "他の意見がある？", vi: "Có ý kiến khác không?", module: "Câu đơn" },
  { jp: "分かった？ - 全部分かった。", vi: "Hiểu chưa? - Hiểu tất cả.", module: "Câu đơn" },
  { jp: "あなたが好きだ。", vi: "Tôi thích bạn.", module: "Câu đơn" },
  { jp: "ここでたばこを吸ってはいけない。", vi: "Không được hút thuốc ở đây.", module: "Câu đơn" },
  { jp: "私の趣味は本を読むことです。", vi: "Sở thích của tôi là đọc sách.", module: "Câu đơn" },
  { jp: "日本に来たことがあります。", vi: "Tôi đã từng đến Nhật.", module: "Câu đơn" },
  { jp: "どうしたんですか。", vi: "Có chuyện gì vậy?", module: "Câu đơn" },
  { jp: "ここに触らないでください。", vi: "Xin đừng chạm vào đây.", module: "Câu đơn" },

  // Câu đơn đầy đủ
  { jp: "来月、私は家族と日本へ行きます。", vi: "Tháng sau, tôi đi Nhật với gia đình.", module: "Câu đơn đầy đủ" },
  { jp: "今、何が一番欲しいですか。", vi: "Bây giờ, bạn muốn nhất cái gì?", module: "Câu đơn đầy đủ" },
  { jp: "今晩、９時に駅で友達に会いましょうね。", vi: "Tối nay, gặp bạn ở ga lúc 9 giờ nhé.", module: "Câu đơn đầy đủ" },
  { jp: "将来、何か予定がありますか。", vi: "Tương lai, bạn có dự định gì không?", module: "Câu đơn đầy đủ" },
  { jp: "3年後、日本に帰りたいです。", vi: "3 năm sau, tôi muốn về Nhật Bản.", module: "Câu đơn đầy đủ" },
  { jp: "あした、林さんと新幹線で東京に行きます。", vi: "Ngày mai, tôi đi Tokyo với anh Lâm bằng tàu Shinkansen.", module: "Câu đơn đầy đủ" },
  { jp: "まいあさ、６時に起きます。", vi: "Mỗi sáng, tôi dậy lúc 6 giờ.", module: "Câu đơn đầy đủ" },
  { jp: "昼、食堂で皆さんとご飯を食べます。", vi: "Buổi trưa, tôi ăn cơm ở nhà ăn cùng mọi người.", module: "Câu đơn đầy đủ" },
  { jp: "この紙は日本語で書いてください。", vi: "Hãy viết tờ giấy này bằng tiếng Nhật.", module: "Câu đơn đầy đủ" },
  { jp: "これは小林さんに渡して。", vi: "Hãy đưa cái này cho anh Kobayashi.", module: "Câu đơn đầy đủ" },
  { jp: "来年、旧正月にベトナムへ帰るつもりです。", vi: "Năm tới, tôi dự định về Việt Nam vào dịp Tết Nguyên đán.", module: "Câu đơn đầy đủ" },
  { jp: "来月、三日間箱根へ旅行に行きます。", vi: "Tháng sau, tôi đi du lịch Hakone trong ba ngày.", module: "Câu đơn đầy đủ" },
  { jp: "私は日本語が少し分かります。", vi: "Tôi hiểu một chút tiếng Nhật.", module: "Câu đơn đầy đủ" },
  { jp: "夏休み、レストランでアルバイトをします。", vi: "Kỳ nghỉ hè, tôi làm thêm ở nhà hàng.", module: "Câu đơn đầy đủ" },
  { jp: "将来、どんなことをしたいですか。", vi: "Tương lai, bạn muốn làm điều gì?", module: "Câu đơn đầy đủ" },

  // Câu hỏi
  { jp: "どうして昨日あなたは店に来なかったんですか。", vi: "Tại sao hôm qua bạn không đến cửa hàng?", module: "Câu hỏi" },
  { jp: "どうやってこの魚を焼きますか。", vi: "Làm thế nào để nướng con cá này?", module: "Câu hỏi" },
  { jp: "だれがこれをやったの？", vi: "Ai là người đã làm cái này?", module: "Câu hỏi" },
  { jp: "いつ国へ帰りますか。", vi: "Khi nào bạn về nước?", module: "Câu hỏi" },
  { jp: "どうしてお金が無くなりましたか。", vi: "Tại sao lại hết tiền?", module: "Câu hỏi" },
  { jp: "あなたはだれとどこに行きましたか。", vi: "Bạn đã đi đâu và với ai?", module: "Câu hỏi" },
  { jp: "今晩、何を食べるかな？", vi: "Tối nay, ăn gì nhỉ?", module: "Câu hỏi" },
  { jp: "次は何をしたらいいですか。", vi: "Tiếp theo nên làm gì?", module: "Câu hỏi" },
  { jp: "田中さん、包丁はどこですか。", vi: "Anh Tanaka, dao ở đâu?", module: "Câu hỏi" },
  { jp: "何時に来ますか。", vi: "Mấy giờ bạn sẽ đến?", module: "Câu hỏi" },
  { jp: "どうして遅れましたか。", vi: "Tại sao bạn đến muộn?", module: "Câu hỏi" },
  { jp: "どうして私に電話しなかったんですか。", vi: "Tại sao bạn không gọi điện cho tôi?", module: "Câu hỏi" },
  { jp: "きのう、あなたはだれとどこで何をしましたか。", vi: "Hôm qua bạn đã làm gì, ở đâu, với ai?", module: "Câu hỏi" },
  { jp: "あなたの住所はどこですか。", vi: "Địa chỉ của bạn ở đâu?", module: "Câu hỏi" },
  { jp: "これはいくらですか。", vi: "Cái này bao nhiêu tiền?", module: "Câu hỏi" },
  { jp: "すみません、トイレはどこですか。", vi: "Xin lỗi, nhà vệ sinh ở đâu?", module: "Câu hỏi" },
  { jp: "いま、何をしたらいいですか。", vi: "Bây giờ nên làm gì?", module: "Câu hỏi" },
  { jp: "どのくらい日本語を勉強しましたか。", vi: "Bạn đã học tiếng Nhật bao lâu?", module: "Câu hỏi" },
  { jp: "誕生日はいつですか。", vi: "Sinh nhật của bạn khi nào?", module: "Câu hỏi" },
  { jp: "明日、どこで何時に会いますか。", vi: "Ngày mai, chúng ta gặp nhau ở đâu và lúc mấy giờ?", module: "Câu hỏi" },

  // Câu đơn 2 chủ thể
  { jp: "私は妹が図書館で借りた本を返したいんですが。", vi: "Tôi muốn trả cuốn sách em gái mượn ở thư viện.", module: "Câu đơn 2 chủ thể" },
  { jp: "これは私が家族と日本で撮った写真だよ。", vi: "Đây là ảnh tôi chụp ở Nhật với gia đình.", module: "Câu đơn 2 chủ thể" },
  { jp: "明日はあなたたちが日本語能力試験を受ける日でしょう？", vi: "Mai là ngày các bạn thi kỳ thi năng lực tiếng Nhật đúng không?", module: "Câu đơn 2 chủ thể" },
  { jp: "あなたはトゥさんが住んでいる住所を知っていますか。", vi: "Bạn có biết địa chỉ mà Thư đang sống không?", module: "Câu đơn 2 chủ thể" },
  { jp: "これをやった人はだれ？", vi: "Người làm cái này là ai?", module: "Câu đơn 2 chủ thể" },
  { jp: "先週、私が図書館で借りた本はとても厚い。", vi: "Cuốn sách tôi mượn ở thư viện tuần trước rất dày.", module: "Câu đơn 2 chủ thể" },
  { jp: "彼が会議中にずっと見ていた資料はどこへ行ったの？", vi: "Tài liệu mà anh ấy đã xem suốt trong cuộc họp đã đi đâu?", module: "Câu đơn 2 chủ thể" },
  { jp: "私は父が若い頃に毎日飲んでいたコーヒーを飲んでみたい。", vi: "Tôi muốn thử uống loại cà phê mà bố tôi đã uống hằng ngày khi ông còn trẻ.", module: "Câu đơn 2 chủ thể" },
  { jp: "彼女は友達からもらった大切なピアスをうっかり失くしてしまった。", vi: "Cô ấy đã lỡ làm mất đôi bông tai quan trọng mà người bạn đã tặng.", module: "Câu đơn 2 chủ thể" },
  { jp: "私たちは先生が勧めてくれたレストランで夕食にした。", vi: "Chúng tôi đã dùng bữa tối tại nhà hàng mà thầy đã giới thiệu.", module: "Câu đơn 2 chủ thể" },
  { jp: "これは私があなたに伝えたかった本当のことです。", vi: "Đây là sự thật mà tôi muốn nói với bạn.", module: "Câu đơn 2 chủ thể" },
  { jp: "私が一番好きな食べ物は母が作ってくれる食べ物です。", vi: "Món ăn tôi thích nhất là món mẹ nấu.", module: "Câu đơn 2 chủ thể" },
  { jp: "彼が昨日ネットで注文していた本はもう届いたそうだ。", vi: "Nghe nói cuốn sách anh ấy đã đặt trên mạng hôm qua đã đến rồi.", module: "Câu đơn 2 chủ thể" },
  { jp: "彼が先週病院でもらった薬は全然効かないみたいだ。", vi: "Có vẻ như thuốc anh ấy nhận ở bệnh viện tuần trước không có hiệu quả chút nào.", module: "Câu đơn 2 chủ thể" },

  // Câu theo ngữ pháp
  { jp: "私は日本で桜を見たことがあります。", vi: "Tôi đã từng ngắm hoa anh đào ở Nhật.", module: "Câu theo ngữ pháp" },
  { jp: "ビールと酒とどちらが飲みたいですか。", vi: "Bia và rượu thì thích uống cái nào hơn?", module: "Câu theo ngữ pháp" },
  { jp: "毎日勉強したり、掃除したり、寝たりしました。", vi: "Ngày nào tôi cũng học, dọn dẹp, ngủ...", module: "Câu theo ngữ pháp" },
  { jp: "私は日本語がうまく話せるように毎日日本人と会話しています。", vi: "Tôi nói chuyện với người Nhật mỗi ngày để có thể nói tiếng Nhật trôi chảy.", module: "Câu theo ngữ pháp" },
  { jp: "僕が好きかどうか言って。", vi: "Nói xem có thích tôi hay không.", module: "Câu theo ngữ pháp" },
  { jp: "私は毎朝コーヒーを飲みながら、新聞を読むのが好きです。", vi: "Tôi thích vừa uống cà phê vừa đọc báo mỗi sáng.", module: "Câu theo ngữ pháp" },
  { jp: "来週の日曜日、もし天気が良かったら、公園でピクニックをしませんか。", vi: "Chủ nhật tuần sau, nếu thời tiết đẹp, chúng mình đi dã ngoại ở công viên nhé?", module: "Câu theo ngữ pháp" },
  { jp: "日本語の勉強は難しいですが、先生の説明はとても分かりやすいです。", vi: "Việc học tiếng Nhật khó nhưng lời giải thích của thầy rất dễ hiểu.", module: "Câu theo ngữ pháp" },
  { jp: "田中さんは毎日電車で会社に行く前に、コンビニでお茶を買います。", vi: "Anh Tanaka mua trà ở cửa hàng tiện lợi trước khi đi tàu đến công ty mỗi ngày.", module: "Câu theo ngữ pháp" },
  { jp: "このレストランは値段が高いのに、いつも混んでいるので驚きました。", vi: "Tôi ngạc nhiên vì nhà hàng này giá đắt mà lúc nào cũng đông.", module: "Câu theo ngữ pháp" },
  { jp: "来月京都へ旅行に行くために、今週中にホテルを予約するつもりです。", vi: "Tôi dự định đặt khách sạn trong tuần này để đi du lịch Kyoto vào tháng sau.", module: "Câu theo ngữ pháp" },
  { jp: "電車の中で大きい声で電話している人がいて、本当に迷惑でした。", vi: "Có người nói chuyện điện thoại to trong tàu điện, thật là phiền phức.", module: "Câu theo ngữ pháp" },
  { jp: "もし時間があったら、一緒にショッピングに行きませんか。", vi: "Nếu có thời gian, bạn có muốn đi mua sắm cùng không?", module: "Câu theo ngữ pháp" },
  { jp: "新しいパソコンを買いたいですが、まだどれがいいか決めていません。", vi: "Tôi muốn mua máy tính mới nhưng chưa quyết định được cái nào tốt.", module: "Câu theo ngữ pháp" },
  { jp: "今、雨が降っているので、傘を持って出かけたほうがいいですよ。", vi: "Bây giờ đang mưa, nên mang ô khi ra ngoài.", module: "Câu theo ngữ pháp" },
  { jp: "来年から日本語を教える仕事を始める予定です。", vi: "Tôi dự định sẽ bắt đầu công việc dạy tiếng Nhật từ năm tới.", module: "Câu theo ngữ pháp" },
  { jp: "この漢字の読み方が分からないんですが、教えていただけませんか。", vi: "Tôi không biết cách đọc chữ Hán này, bạn có thể chỉ cho tôi không?", module: "Câu theo ngữ pháp" },
  { jp: "健康のために、毎日30分くらい歩くようにしています。", vi: "Tôi cố gắng đi bộ khoảng 30 phút mỗi ngày vì sức khỏe.", module: "Câu theo ngữ pháp" },
  { jp: "昨日、財布を忘れてしまって、友達にお金を借りました。", vi: "Hôm qua tôi quên ví, nên đã mượn tiền bạn.", module: "Câu theo ngữ pháp" },
  { jp: "この問題は難しすぎて、誰も答えられませんでした。", vi: "Bài toán này quá khó, không ai trả lời được.", module: "Câu theo ngữ pháp" },

  // Câu ghép
  { 
    jp: "昨日は朝早く起きて、ジョギングをしてからシャワーを浴びて、朝ごはんを食べた後でニュースをチェックして、それから会社に行って、午前中は会議が三つあって、午後はお客さんと打ち合わせをして、夜は同僚と食事に行って、帰ってから日記を書いて、12時に寝ました。", 
    vi: "Hôm qua tôi dậy sớm, chạy bộ rồi tắm vòi sen, sau khi ăn sáng thì xem tin tức, rồi đi làm, buổi sáng có ba cuộc họp, buổi chiều gặp đối tác, tối đi ăn với đồng nghiệp, về nhà viết nhật ký, và đi ngủ lúc 12 giờ.", 
    module: "Câu ghép" 
  },
  { 
    jp: "このレストランは値段は少し高いですが、雰囲気がとても良くて、店員のサービスも丁寧で、料理はどれも美味しくて、特にデザートのケーキは絶品なので、誕生日や記念日などの特別な日にまた来たいと思います。", 
    vi: "Nhà hàng này giá hơi cao, nhưng không khí rất tốt, phục vụ của nhân viên cũng chu đáo, món nào cũng ngon, đặc biệt bánh ngọt tráng miệng là tuyệt hảo, nên tôi nghĩ sẽ muốn quay lại vào những ngày đặc biệt như sinh nhật hay ngày kỷ niệm.", 
    module: "Câu ghép" 
  },
  { 
    jp: "昨日雨がすごく降っていて、風も強かったので、傘をさしても服がびしょびしょになってしまい、タクシーを拾おうと思ったけど、どこも満車で捕まえられず、仕方なく駅まで歩いて行ったら、電車も遅れていて、会社に着いた時にはもう三十分も遅刻していました。", 
    vi: "Hôm qua mưa rất to, gió cũng mạnh, nên dù có che ô thì quần áo vẫn ướt sũng, tôi định bắt taxi nhưng chỗ nào cũng đầy không bắt được, đành phải đi bộ ra ga, thế mà tàu cũng bị chậm, khi đến công ty thì đã trễ mất ba mươi phút.", 
    module: "Câu ghép" 
  },
  { 
    jp: "彼は学生の時から日本語を独学で勉強していて、大学を卒業した後で日本へ行って、最初の二年間は日本語学校に通って、その後はIT会社に就職して、今はもう五年間東京で働いていて、日本語もペラペラになったので、日本人の同僚とも何の問題もなくコミュニケーションができます。", 
    vi: "Anh ấy từ khi còn là sinh viên đã tự học tiếng Nhật, sau khi tốt nghiệp đại học thì sang Nhật, hai năm đầu theo học trường tiếng Nhật, sau đó làm việc tại công ty IT, hiện tại đã làm việc ở Tokyo được năm năm, tiếng Nhật cũng đã thành thạo nên có thể giao tiếp với đồng nghiệp người Nhật mà không gặp vấn đề gì.", 
    module: "Câu ghép" 
  },
  { 
    jp: "将来は自分の家を持ちたいと思っていて、それのために毎月給料の三分の一を貯金して、休みの日には不動産屋を見て回って、場所や広さや値段などを調べていて、できれば庭付きの一戸建てが欲しいですが、都内では予算が足りないので、もう少し郊外に住むことを考えています。", 
    vi: "Tôi nghĩ muốn có nhà riêng trong tương lai, vì vậy mỗi tháng tôi tiết kiệm một phần ba tiền lương, vào ngày nghỉ tôi đi xem các cửa hàng bất động sản, tìm hiểu về vị trí, diện tích, giá cả,... nếu có thể thì muốn nhà riêng có sân vườn, nhưng ở nội thành thì không đủ ngân sách nên tôi đang cân nhắc sống ở ngoại ô một chút.", 
    module: "Câu ghép" 
  },
  { 
    jp: "先週の日曜日は天気がとても良かったので、友達を誘って公園にピクニックに行き、お弁当やお菓子をたくさん持っていって、芝生の上にシートを広げて、おしゃべりをしながら食事をして、そのあとはバドミントンをしたり、散歩をしたりして、夕方までゆっくり過ごして、とても楽しい一日になりました。", 
    vi: "Chủ nhật tuần trước thời tiết rất đẹp, tôi rủ bạn bè đi picnic ở công viên, mang theo nhiều cơm hộp và đồ ăn vặt, trải bạt lên bãi cỏ, vừa trò chuyện vừa ăn uống, sau đó chúng tôi chơi cầu lông và đi dạo, thư giãn đến chiều tối, đó là một ngày rất vui.", 
    module: "Câu ghép" 
  },
  { 
    jp: "引っ越しをする前は、駅から徒歩１５分の古いアパートに住んでいて、周りは静かだったけれど、スーパーまで遠くて不便だったし、お風呂も小さくて、冬はとても寒かったので、新しい部屋を探すときに、絶対に駅近で、スーパーが近くにあって、お風呂とトイレが別で、エアコンと床暖房がついている部屋にしようと決めました。", 
    vi: "Trước khi chuyển nhà, tôi sống trong một căn hộ cũ cách ga 15 phút đi bộ, xung quanh yên tĩnh nhưng xa siêu thị nên bất tiện, bồn tắm cũng nhỏ, mùa đông rất lạnh, vì vậy khi tìm phòng mới, tôi quyết định chọn phòng gần ga, gần siêu thị, phòng tắm và toilet riêng biệt, có điều hòa và sưởi sàn.", 
    module: "Câu ghép" 
  },
  { 
    jp: "夏休みに北海道へ旅行に行ったとき、飛行機で行って、レンタカーを借りて、富良野のラベンダー畑を見て、美瑛の丘をドライブして、旭山動物園でペンギンの散歩を見て、夕張でメロンを食べて、小樽の運河を散歩して、最後に札幌でジンギスカンを食べて、とても充実した旅行だったので、また来年も違う季節に行ってみたいと思います。", 
    vi: "Khi tôi đi du lịch Hokkaido vào kỳ nghỉ hè, tôi đi máy bay, thuê xe ô tô, ngắm cánh đồng hoa oải hương ở Furano, lái xe ngắm đồi Biei, xem chim cánh cụt đi dạo ở vườn thú Asahiyama, ăn dưa ở Yubari, đi dạo dọc kênh Otaru, và cuối cùng ăn thịt cừu nướng Genghis Khan ở Sapporo, đó là một chuyến đi rất bổ ích, nên tôi muốn đến lại vào mùa khác năm sau.", 
    module: "Câu ghép" 
  }
];

// Deduplicate exercises in TRANSLATION_DATA that have duplicate jp strings
const deduplicatedData = TRANSLATION_DATA.filter((item, index, self) => {
  return self.findIndex(t => t.jp === item.jp) === index;
});

const THEORY_DATA: Record<string, string> = {
  "Từ ghép": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Dịch <strong>ngược từ phải qua trái</strong> đối với các cụm danh từ hoặc tính từ bổ nghĩa. Hãy luôn xác định <strong>Danh từ trung tâm (đứng ở cuối cùng)</strong> trước tiên, sau đó dịch ngược dần về phía trước.
        </p>
      </div>

      <div class="space-y-4">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">📚 3 Cấu trúc định ngữ phổ biến</h4>
        
        <div class="p-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-2">
          <span class="inline-block px-2 py-0.5 bg-[#8B0000]/10 text-[#8B0000] text-[10px] font-black rounded uppercase">N1 の N2 (Cụm danh từ sở hữu/bổ nghĩa)</span>
          <p class="text-xs text-gray-600">Công thức dịch: <strong>N2 + (của/về/ở) + N1</strong></p>
          <div class="flex items-center gap-1.5 font-mono text-xs text-gray-800">
            <span class="font-bold text-[#0b3b5c]">私の仕事</span>
            <span>➔</span>
            <span>Công việc của tôi</span>
          </div>
        </div>

        <div class="p-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-2">
          <span class="inline-block px-2 py-0.5 bg-[#8B0000]/10 text-[#8B0000] text-[10px] font-black rounded uppercase">A + N (Tính từ bổ nghĩa danh từ)</span>
          <p class="text-xs text-gray-600">Công thức dịch: <strong>Danh từ + Tính chất (hoặc dịch xuôi tính từ trước)</strong></p>
          <div class="flex items-center gap-1.5 font-mono text-xs text-gray-800">
            <span class="font-bold text-[#0b3b5c]">静かな場所</span>
            <span>➔</span>
            <span>Nơi yên tĩnh</span>
          </div>
        </div>

        <div class="p-3.5 bg-gray-50 border border-dashed border-gray-200 rounded-xl space-y-2">
          <span class="inline-block px-2 py-0.5 bg-[#8B0000]/10 text-[#8B0000] text-[10px] font-black rounded uppercase">V + N (Mệnh đề động từ bổ nghĩa)</span>
          <p class="text-xs text-gray-600">Công thức dịch: <strong>Danh từ + [mà / được / đã] + Động từ</strong></p>
          <div class="flex items-center gap-1.5 font-mono text-xs text-gray-800">
            <span class="font-bold text-[#0b3b5c]">住んでいる所</span>
            <span>➔</span>
            <span>Nơi đang sống</span>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. 日本語の先生 (Giáo viên tiếng Nhật)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Danh từ trung tâm là <strong class="text-gray-700">先生</strong> (giáo viên). Trợ từ <strong class="text-[#8B0000]">の</strong> ở đây đóng vai trò bổ nghĩa chuyên môn, không dịch cứng nhắc là "của".
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. 美味しい食べ物 (Thức ăn ngon)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Danh từ trung tâm là <strong class="text-gray-700">食べ物</strong> (thức ăn). Tính từ đuôi i <strong class="text-emerald-700">美味しい</strong> (ngon) đứng trước bổ nghĩa trực tiếp.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. 使った物 (Đồ đã dùng)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Động từ thể quá khứ <strong class="text-gray-700">使った</strong> (đã dùng) bổ nghĩa cho danh từ <strong class="text-gray-700">物</strong> (đồ vật/đồ dùng).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. あそこに立っている人 (Người đứng đằng kia)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Danh từ trung tâm là <strong class="text-gray-700">人</strong> (người). Cụm động từ <strong class="text-gray-700">あそこに立っている</strong> (đang đứng ở đằng kia) bổ nghĩa phía trước.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. 彼女と見たい映画 (Bộ phim muốn xem cùng cô ấy)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Danh từ trung tâm là <strong class="text-gray-700">映画</strong> (bộ phim). Định ngữ bổ trợ biểu thị ý muốn: <strong class="text-gray-700">彼女と見たい</strong> (muốn xem cùng cô ấy).
          </p>
        </div>
      </div>

      <div class="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
        <strong class="text-amber-900 block mb-1">⚠️ Mẹo dịch từ thầy Sơn:</strong>
        Trợ từ <strong>の</strong> cực kỳ linh hoạt! Tùy trường hợp mà dịch là "của", "về", "ở", "bằng", "dành cho" hoặc hoàn toàn có thể lược bỏ đi để bản dịch tiếng Việt trôi chảy nhất.
      </div>
    </div>
  `,
  "Câu đơn": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Xác định và dịch <strong>Chủ ngữ (marked by は hoặc が)</strong> trước, sau đó tìm <strong>Vị ngữ ở cuối câu (V / A / です)</strong> rồi dịch ngược từ cuối lên đầu.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">🧭 3 Bước dịch thần thánh</h4>
        <ol class="list-decimal list-inside text-xs text-gray-600 space-y-1.5 leading-relaxed">
          <li>Tìm trợ từ <strong>は</strong> để ngắt câu, dịch thành phần chủ ngữ chính trước.</li>
          <li>Nhảy ngay xuống cuối câu tìm <strong>Vị ngữ chính</strong> (hành động, trạng thái) để dịch tiếp theo.</li>
          <li>Dịch ngược từ phải qua trái các thành phần còn lại (Tân ngữ, địa điểm, phương tiện...).</li>
        </ol>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. 私は学生です。 (Tôi là học sinh.)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Chủ ngữ là <strong class="text-gray-700">私は</strong> (Tôi). Vị ngữ chính đứng cuối là <strong class="text-gray-700">学生です</strong> (là học sinh).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. あの人は私の姉の友達です。 (Người đó là bạn của chị tôi.)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Chủ ngữ <strong class="text-gray-700">あの人は</strong> (Người đó). Vị ngữ là cụm danh từ bổ nghĩa phức tạp phía sau: <strong class="text-gray-700">私の姉の友達です</strong> (là bạn của chị tôi).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. ミーさんはご飯を食べています。 (My đang ăn cơm.)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Chủ ngữ <strong class="text-gray-700">ミーさんは</strong>. Vị ngữ hành động ở cuối câu <strong class="text-gray-700">食べています</strong> (đang ăn) tác động lên tân ngữ <strong class="text-gray-700">ご飯を</strong> (cơm).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. 今日の天気はいいですね。 (Hôm nay thời tiết đẹp nhỉ.)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Chủ ngữ <strong class="text-gray-700">今日の天気は</strong> (Thời tiết của ngày hôm nay). Tính từ vị ngữ ở cuối câu <strong class="text-emerald-700">いいですね</strong> (đẹp/tốt nhỉ).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. （私は）料理をつくっている。 (Tôi đang nấu ăn.)</div>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Chủ ngữ <strong class="text-gray-700">私は</strong> đã bị lược bỏ trong câu gốc tiếng Nhật. Khi dịch sang tiếng Việt, cần chủ động khôi phục chủ từ phù hợp với ngữ cảnh để câu được tự nhiên.
          </p>
        </div>
      </div>

      <div class="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
        <strong class="text-amber-900 block mb-1">⚠️ Lưu ý lược bỏ chủ từ:</strong>
        Tiếng Nhật giao tiếp cực kỳ hay ẩn "Tôi", "Bạn". Do đó khi tự luyện dịch, nếu thấy thiếu chủ ngữ, bạn hãy luôn tự hỏi "Ai đang thực hiện hành động này?" và bổ sung vào bản dịch nhé!
      </div>
    </div>
  `,
  "Câu đơn đầy đủ": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Dịch theo trình tự tự nhiên trong tiếng Việt: <strong>Thời gian ➔ Chủ ngữ ➔ Dịch ngược từ cuối câu lên (Động từ ➔ Tân ngữ ➔ Địa điểm, phương tiện, đồng hành)</strong>.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">🧭 Trình tự lắp ghép câu dịch</h4>
        <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-700 leading-relaxed">
          <div class="text-center font-bold text-[#8B0000] mb-1.5">Mô hình câu Nhật - Việt</div>
          <p class="mb-1"><strong>Tiếng Nhật:</strong> [Thời gian] + [Sは] + [Đối tácと] + [Phương tiệnで] + [Nơi chốnで] + [Oを] + V</p>
          <p class="text-emerald-700"><strong>Tiếng Việt:</strong> [Thời gian], [S] + V + [O] + [ở Địa điểm] + [bằng Phương tiện] + [cùng Đối tác]</p>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. 来月、私は家族と日本へ行きます。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tháng sau, tôi đi Nhật với gia đình.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Thời gian <strong class="text-gray-700">来月</strong> (tháng sau) và Chủ ngữ <strong class="text-gray-700">私は</strong> (tôi) dịch trước. Tiếp theo dịch động từ cuối <strong class="text-gray-700">行きます</strong> (đi) rồi đến các thành phần bổ trợ.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. 今晩、９時に駅で友達に会いましょうね。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tối nay, gặp bạn ở ga lúc 9 giờ nhé.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Mốc thời gian kép <strong class="text-gray-700">今晩、９時に</strong> được xếp lên đầu câu. Hành động gặp gỡ <strong class="text-gray-700">会いましょう</strong> rủ rê dịch tiếp theo kèm đối tượng <strong class="text-gray-700">友達に</strong>.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. あした、林さんと新幹線で東京に行きます。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Ngày mai, tôi đi Tokyo với anh Lâm bằng tàu Shinkansen.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Cấu trúc chỉ rõ hành động di chuyển đi kèm với đối tác <strong class="text-gray-700">林さんと</strong> (với anh Lâm) và phương tiện <strong class="text-gray-700">新幹線で</strong> (bằng tàu siêu tốc).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. 昼、食堂で皆さんとご飯を食べます。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Buổi trưa, tôi ăn cơm ở nhà ăn cùng mọi người.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Thời gian <strong class="text-gray-700">昼</strong> (buổi trưa). Trợ từ nơi chốn <strong class="text-gray-700">食堂で</strong> (tại nhà ăn) và trợ từ đối tác <strong class="text-gray-700">皆さんと</strong> (cùng mọi người) bổ nghĩa cho hành động ăn cơm.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. この紙は日本語で書いてください。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Hãy viết tờ giấy này bằng tiếng Nhật.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Tân ngữ <strong class="text-gray-700">この紙</strong> (tờ giấy này) được đưa lên đầu làm chủ đề câu nhờ trợ từ <strong class="text-[#8B0000]">は</strong>. Trợ từ <strong class="text-[#8B0000]">で</strong> ở đây chỉ phương thức (bằng tiếng Nhật).
          </p>
        </div>
      </div>
    </div>
  `,
  "Câu hỏi": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Ưu tiên xác định và dịch <strong>Nghi vấn từ (Who, What, Where, When, Why, How)</strong> lên vị trí thích hợp trong tiếng Việt (thường đặt ở đầu hoặc cuối câu tùy cấu trúc) để tạo ngữ khí hỏi tự nhiên.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">🔑 Nghi vấn từ cốt lõi cần nhớ</h4>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">だれ / どなた:</strong> Ai</div>
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">何 (なに/なん):</strong> Cái gì</div>
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">どこ:</strong> Ở đâu</div>
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">いつ:</strong> Khi nào</div>
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">どうして / なぜ:</strong> Tại sao</div>
          <div class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-[#0b3b5c]">どうやって:</strong> Làm thế nào</div>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. どうして昨日あなたは店に来なかったんですか。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tại sao hôm qua bạn không đến cửa hàng?</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nghi vấn từ nguyên nhân <strong class="text-gray-700">どうして</strong> (Tại sao) được đưa lên đầu câu tiếng Việt để thể hiện sắc thái hỏi nguyên nhân rõ ràng.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. どうやってこの魚を焼きますか。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Làm thế nào để nướng con cá này?</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Hỏi về phương pháp hành động <strong class="text-gray-700">どうやって</strong> (Làm thế nào / Bằng cách nào).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. いつ国へ帰りますか。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Khi nào bạn về nước?</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nghi vấn từ chỉ thời gian <strong class="text-gray-700">いつ</strong> (Khi nào) đặt ở vị trí đầu hoặc giữa câu tiếng Việt cho mượt mà.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. 田中さん、包丁はどこですか。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Anh Tanaka, dao ở đâu?</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Hỏi địa điểm của đồ vật với nghi vấn từ <strong class="text-gray-700">どこですか</strong> (ở đâu).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. だれがこれをやったの？</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Ai là người đã làm cái này?</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nghi vấn từ chỉ đối tượng làm chủ ngữ <strong class="text-gray-700">だれが</strong> (Ai). Sắc thái câu hỏi thân mật kết thúc bằng trợ từ <strong class="text-[#8B0000]">の</strong>.
          </p>
        </div>
      </div>
    </div>
  `,
  "Câu đơn 2 chủ thể": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Nhận diện mệnh đề định ngữ (chứa chủ ngữ phụ đi kèm trợ từ <strong>が</strong>). Dịch danh từ trung tâm chính trước, sau đó dùng từ <strong>"mà"</strong> hoặc <strong>"do"</strong> để kết nối dịch mệnh đề phụ.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">🔬 Phương pháp bóc tách cấu trúc</h4>
        <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 space-y-1.5 leading-relaxed">
          <p><strong>Bước 1:</strong> Xác định cụm bổ nghĩa <span class="text-[#8B0000] font-bold">[S_phụ が + V_phụ]</span> đứng trước một <span class="text-[#0b3b5c] font-bold">Danh từ</span>.</p>
          <p><strong>Bước 2:</strong> Dịch khung câu chính trước.</p>
          <p><strong>Bước 3:</strong> Dịch cụm bổ nghĩa thành: <strong class="text-emerald-700">"Danh từ" + MÀ + "S_phụ" + "V_phụ"</strong>.</p>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. これは私が家族と日本で撮った写真だよ。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Đây là ảnh tôi chụp ở Nhật với gia đình.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Danh từ chính là <strong class="text-gray-700">写真</strong> (bức ảnh). Mệnh đề bổ nghĩa <strong class="text-gray-700">私が...撮った</strong> (Tôi chụp...) có chủ từ phụ đi với <strong class="text-[#8B0000]">が</strong>.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. 私は妹が図書館で借りた本を返したいんですが。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tôi muốn trả cuốn sách em gái mượn ở thư viện.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Khung chính: Tôi muốn trả cuốn sách (<strong class="text-gray-700">本を返したい</strong>). Sách gì? Sách mà em gái mượn ở thư viện (<strong class="text-gray-700">妹が図書館で借りた</strong>).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. 先週、私が図書館で借りた本はとても厚い。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Cuốn sách tôi mượn ở thư viện tuần trước rất dày.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Cụm chủ ngữ lớn của câu là cả cụm định ngữ dài <strong class="text-gray-700">私が図書館で借りた本</strong>. Vị ngữ chính là <strong class="text-[#8B0000]">とても厚い</strong> (rất dày).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. 彼が昨日ネットで注文していた本はもう届いたそうだ。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Nghe nói cuốn sách anh ấy đã đặt trên mạng hôm qua đã đến rồi.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Mệnh đề định ngữ <strong class="text-gray-700">彼が昨日ネットで注文していた</strong> bổ nghĩa cho danh từ <strong class="text-gray-700">本</strong>. Đuôi câu kết thúc bằng cấu trúc truyền đạt thông tin <strong class="text-[#8B0000]">〜そうだ</strong> (nghe nói).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. 私が一番好きな食べ物は母が作ってくれる料理です。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Món ăn tôi thích nhất là món ăn mẹ nấu cho.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Câu chứa đồng thời hai mệnh đề định ngữ: <strong class="text-gray-700">私が一番好きな</strong> bổ nghĩa cho <strong class="text-gray-700">食べ物</strong>; và <strong class="text-gray-700">母が作ってくれる</strong> bổ nghĩa cho <strong class="text-gray-700">料理</strong>.
          </p>
        </div>
      </div>
    </div>
  `,
  "Câu theo ngữ pháp": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Nhận diện các mẫu ngữ pháp đặc trưng (như <em>〜ながら, 〜ために, 〜のに, 〜たことがある, 〜ほうがいい</em>) ở giữa hoặc cuối câu, dịch thoát ý theo chức năng biểu đạt của mẫu đó thay vì dịch từng từ riêng lẻ.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">📋 Nhận diện cấu trúc ngữ pháp phổ biến</h4>
        <div class="grid grid-cols-1 gap-2 text-xs text-gray-600">
          <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-150">
            <strong class="text-[#0b3b5c] font-bold">V-ます + ながら:</strong> Vừa làm V1 vừa làm V2 (V2 là chính)
          </div>
          <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-150">
            <strong class="text-[#0b3b5c] font-bold">V-る / Nの + ために:</strong> Để làm mục đích / Vì nguyên nhân
          </div>
          <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-150">
            <strong class="text-[#0b3b5c] font-bold">Thể thông thường + のに:</strong> Mặc dù... thế mà (bất ngờ, thất vọng)
          </div>
          <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-150">
            <strong class="text-[#0b3b5c] font-bold">V-た + ことがある:</strong> Đã từng trải qua kinh nghiệm làm việc gì
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 5 Ví dụ phân tích thực tế</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">1. 私は日本で桜を見たことがあります。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tôi đã từng ngắm hoa anh đào ở Nhật.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nhận diện mẫu <strong class="text-[#8B0000]">〜たことがある</strong> diễn tả một kinh nghiệm trong quá khứ ➔ dịch là "Đã từng...".
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">2. 私は毎朝コーヒーを飲みながら、新聞を読むのが好きです。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tôi thích vừa uống cà phê vừa đọc báo mỗi sáng.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nhận diện mẫu hành động song song <strong class="text-[#8B0000]">〜ながら</strong> ➔ dịch là "vừa [hành động 1] vừa [hành động 2]".
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">3. 健康のために、毎日30分くらい歩くようにしています。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tôi cố gắng đi bộ khoảng 30 phút mỗi ngày vì sức khỏe.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nhận diện hai cấu trúc: <strong class="text-gray-700">〜ために</strong> (vì lợi ích/sức khỏe) và <strong class="text-gray-700">〜ようにしている</strong> (cố gắng duy trì một thói quen tốt).
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">4. このレストランは値段が高いのに、いつも混んでいるので驚きました。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Tôi ngạc nhiên vì nhà hàng này giá đắt mà lúc nào cũng đông.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nhận diện mẫu <strong class="text-[#8B0000]">〜のに</strong> biểu thị sự tương phản phi lý, bất mãn hoặc ngạc nhiên ➔ dịch là "Mặc dù... thế mà...".
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono">5. 昨日、財布を忘れてしまって、友達にお金を借りました。</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Hôm qua tôi lỡ quên ví, nên đã mượn tiền bạn.</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            Nhận diện mẫu chia động từ thể <strong class="text-[#8B0000]">〜てしまう</strong> biểu thị sự lỡ làng, tiếc nuối hoặc đã hoàn thành một hành động ngoài ý muốn ➔ dịch kèm chữ "lỡ...".
          </p>
        </div>
      </div>
    </div>
  `,
  "Câu ghép": `
    <div class="space-y-6">
      <div class="p-4 bg-[#8B0000]/5 border-l-4 border-[#8B0000] rounded-r-xl">
        <strong class="text-[#8B0000] block text-base font-bold mb-1">📌 Quy tắc cốt lõi:</strong>
        <p class="text-sm text-gray-700 leading-relaxed">
          Đừng hoảng sợ trước câu siêu dài! Hãy tìm các điểm ngắt câu (dấu phẩy <strong>、</strong> hoặc các liên từ nối như <em>〜て, 〜から, 〜ので, 〜が, 〜けれど</em>) để chia nhỏ câu thành các vế độc lập, dịch tuần tự từng vế rồi liên kết lại bằng từ nối tiếng Việt phù hợp.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">🛠️ Quy trình chinh phục câu ghép dài</h4>
        <ul class="list-disc list-inside text-xs text-gray-600 space-y-1.5 leading-relaxed">
          <li><strong>Bước 1:</strong> Quét từ trái sang phải, tìm các liên từ, dấu phẩy để ngắt vế câu.</li>
          <li><strong>Bước 2:</strong> Phân tích mối liên hệ logic giữa các vế (Thứ tự thời gian, Nhân - Quả, Đối lập).</li>
          <li><strong>Bước 3:</strong> Dịch độc lập từng vế nhỏ như các câu đơn bình thường.</li>
          <li><strong>Bước 4:</strong> Lắp ráp bằng cách thêm các từ nối tự nhiên trong tiếng Việt ("rồi thì", "bởi vì... nên", "tuy nhiên... nhưng").</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">💡 3 Ví dụ thực tế siêu chi tiết</h4>
        
        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono leading-relaxed">1. 昨日は朝早く起きて、ジョギングをしてからシャワーを浴びて、朝ごはんを食べた後でニュースをチェックして...</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Hôm qua tôi dậy sớm, chạy bộ rồi tắm vòi sen, sau khi ăn sáng thì xem tin tức...</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            <strong>Phân tích:</strong> Đây là chuỗi hành động nối tiếp theo thời gian. Ta tách câu tại các điểm chia thể <strong class="text-gray-700">て (起きて)</strong>, <strong class="text-gray-700">てから (ジョギングをしてから)</strong> và mẫu <strong class="text-gray-700">た後で (食べた後で)</strong> để dịch mượt mà.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono leading-relaxed">2. 先週の日曜日は天気がとても良かったので、友達を誘って公園にピクニックに行き、お弁当をたくさん持っていって...</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Chủ nhật tuần trước thời tiết rất đẹp, tôi rủ bạn bè đi picnic ở công viên, mang theo nhiều cơm hộp...</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            <strong>Phân tích:</strong> Vế 1 chứa cấu trúc chỉ nguyên nhân <strong class="text-gray-700">良かったので</strong> (vì thời tiết đẹp) làm tiền đề cho một chuỗi hành động tiếp diễn phía sau.
          </p>
        </div>

        <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-1.5">
          <div class="font-bold text-[#0b3b5c] text-xs font-mono leading-relaxed">3. 引っ越しをする前は、駅から徒歩１５分の古いアパートに住んでいて、周りは静かだったけれど、スーパーまで遠くて不便だったし...</div>
          <p class="text-xs text-emerald-800 font-medium">➔ Trước khi chuyển nhà, tôi sống trong một căn hộ cũ cách ga 15 phút đi bộ, xung quanh yên tĩnh nhưng xa siêu thị nên bất tiện...</p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            <strong>Phân tích:</strong> Câu dài chứa sự tương phản giữa ưu điểm <strong class="text-gray-700">静かだったけれど</strong> (yên tĩnh nhưng...) và khuyết điểm <strong class="text-gray-700">遠くて不便だったし</strong> (xa nên bất tiện và...) của căn hộ cũ để dẫn tới quyết định chọn nhà mới.
          </p>
        </div>
      </div>
    </div>
  `
};

export default function TranslationPractice({ onGoBack }: TranslationPracticeProps) {
  const modules = ["Từ ghép", "Câu đơn", "Câu đơn đầy đủ", "Câu hỏi", "Câu đơn 2 chủ thể", "Câu theo ngữ pháp", "Câu ghép"];
  const [currentModule, setCurrentModule] = useState<string>(modules[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInputText, setUserInputText] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    show: boolean;
    type: "correct" | "incorrect" | "answer";
    message: string;
    answer: string;
  }>({
    show: false,
    type: "correct",
    message: "",
    answer: ""
  });

  // Track progress locally by unique item ID / key
  const [progress, setProgress] = useState<Record<string, { userAnswer: string; isCorrect: boolean }>>({});

  // Filter translation data based on current module
  const filteredData = deduplicatedData.filter(item => item.module === currentModule);

  // Load progress if any on mount/change
  useEffect(() => {
    setUserInputText("");
    setFeedback({ show: false, type: "correct", message: "", answer: "" });
  }, [currentModule, currentIndex]);

  const handleSwitchModule = (moduleName: string) => {
    playSound.click();
    setCurrentModule(moduleName);
    setCurrentIndex(0);
  };

  const handleSpeak = (text: string) => {
    playSound.click();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ đọc giọng nói.");
    }
  };

  const handleCheckAnswer = () => {
    playSound.click();
    const item = filteredData[currentIndex];
    const userAns = userInputText.trim();
    if (!userAns) {
      setFeedback({
        show: true,
        type: "incorrect",
        message: "⚠️ Vui lòng nhập bản dịch của bạn trước khi kiểm tra.",
        answer: ""
      });
      return;
    }

    // Helper to normalize strings for comparison (Vietnamese accents, spacing, punctuation, and lowercase)
    const normalize = (str: string) => {
      return str
        .normalize("NFKC")
        .toLowerCase()
        // Replace typical punctuation
        .replace(/[.,!?;:()"']/g, "")
        // Replace Vietnamese tones variance if needed, but a standard comparison is safer
        .replace(/\s+/g, " ")
        .trim();
    };

    const isCorrect = normalize(userAns) === normalize(item.vi);
    const key = `${currentModule}-${currentIndex}`;

    setProgress(prev => ({
      ...prev,
      [key]: { userAnswer: userAns, isCorrect }
    }));

    if (isCorrect) {
      playSound.correct();
      setFeedback({
        show: true,
        type: "correct",
        message: "🎉 Chính xác! Bạn đã dịch rất chuẩn xác và tự nhiên.",
        answer: ""
      });
    } else {
      playSound.wrong();
      setFeedback({
        show: true,
        type: "incorrect",
        message: "❌ Chưa hoàn toàn chính xác. Hãy so sánh với đáp án tham khảo bên dưới nhé!",
        answer: `📖 Đáp án tham khảo: ${item.vi}`
      });
    }
  };

  const handleShowAnswer = () => {
    playSound.click();
    const item = filteredData[currentIndex];
    setFeedback({
      show: true,
      type: "answer",
      message: "💡 Đáp án mẫu từ thầy Sơn:",
      answer: item.vi
    });
  };

  const handleReset = () => {
    playSound.click();
    const key = `${currentModule}-${currentIndex}`;
    setProgress(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    setUserInputText("");
    setFeedback({ show: false, type: "correct", message: "", answer: "" });
  };

  const handlePrev = () => {
    playSound.click();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    playSound.click();
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFeedback({
        show: true,
        type: "correct",
        message: "🎉 Chúc mừng! Bạn đã hoàn thành tất cả câu luyện dịch trong chủ đề này!",
        answer: "Hãy tiếp tục chọn các chủ đề khác phía trên để thử sức nhé."
      });
    }
  };

  // Stats calculation
  const totalInModule = filteredData.length;
  const doneInModule = Object.keys(progress).filter(k => k.startsWith(currentModule)).length;
  const correctInModule = Object.keys(progress).filter(key => {
    return key.startsWith(currentModule) && progress[key]?.isCorrect;
  }).length;

  return (
    <div id="translation-practice-container" className="space-y-8 max-w-4xl mx-auto px-1">
      {/* Back Button and Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-dashed border-gray-200 pb-5">
        <button 
          onClick={onGoBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border-2 border-[#1A1A1A] rounded-xl text-sm font-black text-[#1A1A1A] transition-all hover:translate-y-[-2px] shadow-[3px_3px_0px_#1A1A1A] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
          <span>QUAY LẠI</span>
        </button>
        <div className="text-left sm:text-right">
          <div className="inline-flex items-center gap-1 bg-[#8B0000]/10 text-[#8B0000] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KỸ NĂNG CHUYỂN NGỮ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            Luyện Dịch Nhật - Việt
          </h1>
        </div>
      </div>

      {/* Horizontal Modules Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar border-b border-gray-200">
        {modules.map((mod) => (
          <button
            key={mod}
            onClick={() => handleSwitchModule(mod)}
            className={`px-4 py-2.5 rounded-full text-xs font-black tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 border-2 ${
              currentModule === mod
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#8B0000]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {mod}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F9F9FB] border-2 border-gray-200 rounded-2xl p-4 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Chủ đề hiện tại</span>
          <span className="text-sm font-extrabold text-[#1A1A1A] block">{currentModule}</span>
        </div>
        <div className="space-y-1 sm:border-x border-gray-200">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Tiến độ bài làm</span>
          <span className="text-sm font-extrabold text-[#1A1A1A] block">{doneInModule} / {totalInModule} câu</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Số câu đúng</span>
          <span className="text-sm font-extrabold text-emerald-600 block">✨ {correctInModule} câu đúng</span>
        </div>
      </div>

      {/* Grid: Theory (left) & Active Card (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Theory Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sparkles className="w-5 h-5 text-[#8B0000]" />
            <h3 className="text-base font-black text-[#1A1A1A] uppercase tracking-tight">Lý Thuyết & Cấu Trúc</h3>
          </div>
          <div 
            className="prose prose-sm leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: THEORY_DATA[currentModule] || "" }}
          />
        </div>

        {/* Practice Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_#8B0000] p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="px-3 py-1 bg-[#8B0000]/10 text-[#8B0000] rounded-full text-[10px] font-black uppercase tracking-wider">
              {currentModule}
            </span>
            <span className="text-xs font-black text-gray-400 font-mono">
              CÂU {currentIndex + 1} / {totalInModule}
            </span>
          </div>

          {/* Japanese Display and speech button */}
          {filteredData.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 relative group min-h-[100px] flex flex-col justify-between">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {filteredData[currentIndex].jp}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50">
                  <span className="text-xs text-gray-400 italic">Dịch câu trên sang tiếng Việt tự nhiên</span>
                  <button
                    onClick={() => handleSpeak(filteredData[currentIndex].jp)}
                    className="p-2 bg-white border border-gray-200 hover:border-[#1A1A1A] rounded-xl text-gray-600 hover:text-[#1A1A1A] transition-all cursor-pointer shadow-sm flex items-center gap-1.5 text-xs font-bold"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>NGHE</span>
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <textarea
                  value={userInputText}
                  onChange={(e) => setUserInputText(e.target.value)}
                  placeholder="Nhập bản dịch tiếng Việt của em ở đây..."
                  rows={3}
                  className="w-full border-2 border-gray-200 focus:border-[#1A1A1A] rounded-2xl p-4 text-sm font-semibold leading-relaxed focus:outline-none focus:ring-0 placeholder:text-gray-400 transition-all bg-gray-50/50 focus:bg-white"
                />

                {/* Control Actions Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleCheckAnswer}
                    className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>KIỂM TRA</span>
                  </button>
                  <button
                    onClick={handleShowAnswer}
                    className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-extrabold uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>XEM ĐÁP ÁN</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-700 rounded-xl transition-all cursor-pointer shadow-sm"
                    title="Làm lại câu này"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Feedback Card */}
              <AnimatePresence mode="wait">
                {feedback.show && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-4 rounded-xl border-l-4 leading-relaxed text-sm ${
                      feedback.type === "correct"
                        ? "bg-emerald-50/60 border-emerald-500 text-emerald-800"
                        : feedback.type === "incorrect"
                        ? "bg-rose-50/60 border-rose-500 text-rose-800"
                        : "bg-blue-50/60 border-blue-500 text-blue-800"
                    }`}
                  >
                    <div className="flex gap-2.5 items-start">
                      {feedback.type === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : feedback.type === "incorrect" ? (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1">
                        <p className="font-extrabold">{feedback.message}</p>
                        {feedback.answer && (
                          <p className="font-mono text-xs bg-white/60 p-2 rounded border border-gray-100 mt-2 text-gray-800 font-bold leading-normal">
                            {feedback.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Question Navigation footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-black text-gray-700 transition-all cursor-pointer"
                >
                  ← TRƯỚC
                </button>
                <span className="text-xs font-extrabold text-gray-400 font-mono">
                  {currentIndex + 1} / {totalInModule}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#8B0000] hover:bg-[#A30000] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{currentIndex === totalInModule - 1 ? "HOÀN THÀNH" : "TIẾP THEO"}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <HelpCircle className="w-12 h-12 mx-auto stroke-[1.5]" />
              <p className="font-bold">Không tìm thấy câu hỏi nào cho chủ đề này.</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] font-black text-gray-400 uppercase tracking-widest pt-8 border-t border-gray-100">
        Dựa trên giáo trình 「Dịch tiếng Nhật N5」 • Bản quyền thuộc về Lớp Học Thầy Sơn
      </div>
    </div>
  );
}
