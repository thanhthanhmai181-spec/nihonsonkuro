import { N3ExamData } from "./examN3_2024";

export const EXAM_DATA_N3_2022_12: N3ExamData = {
  goi: [
    { id: 'g1', instruction: '問題1 ______の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。', question: 'この店では、いろいろな<b>容器</b>を売っています。', options: ['ようぎ', 'ようき', 'どうぐ', 'どうく'], correct: 1, explanation: '容器 (ようき): Đồ chứa, hộp chứa.' },
    { id: 'g2', question: '山本さんは何と何を<b>比べた</b>んですか。', options: ['くらべた', 'ならべた', 'しらべた', 'えらべた'], correct: 0, explanation: '比べる (くらべる): So sánh.' },
    { id: 'g3', question: '書類が<b>複数</b>あるので、間違えないでください。', options: ['ふくす', 'ふうすう', 'ふくすう', 'ふうす'], correct: 2, explanation: '複数 (ふくすう): Số nhiều, phức số.' },
    { id: 'g4', question: '昨日病院で<b>血圧</b>を計りました。', options: ['けつあつ', 'けつやつ', 'ちあつ', 'ちやつ'], correct: 0, explanation: '血圧 (けつあつ): Huyết áp.' },
    { id: 'g5', question: 'ここから見る<b>夕日</b>はきれいだ。', options: ['ゆび', 'ゆひ', 'ゆうび', 'ゆうひ'], correct: 3, explanation: '夕日 (ゆうひ): Hoàng hôn, mặt trời lặn.' },
    { id: 'g6', question: 'そこに一人で行くのは<b>難しい</b>と思います。', options: ['きびしい', 'めずらしい', 'さびしい', 'むずかしい'], correct: 3, explanation: '難しい (むずかしい): Khó khăn.' },
    { id: 'g7', question: '中村さんから出張の<b>件</b>でお電話がありました。', options: ['けい', 'よう', 'けん', 'よん'], correct: 2, explanation: '件 (けん): Vụ việc, vấn đề.' },
    { id: 'g8', question: 'ここを<b>横断</b>するときは気をつけてください。', options: ['おうざん', 'おうだん', 'きだん', 'きざん'], correct: 1, explanation: '横断 (おうだん): Băng qua.' },

    { id: 'g9', instruction: '問題2 ______のことばを漢字で書くとき、最もよいものを、1・2・3・4から一つえらびなさい。', question: '車から出て、外の空気を<b>すった</b>。', options: ['吹った', '呼った', '吸った', '叫った'], correct: 2, explanation: '吸う (すう): Hít vào, hút.' },
    { id: 'g10', question: 'あしたのアルバイトは、いつもより時間が<b>みじかい</b>。', options: ['早い', '長い', '短い', '遅い'], correct: 2, explanation: '短い (みじかい): Ngắn.' },
    { id: 'g11', question: '今日は少し、<b>い</b>の調子がよくない。', options: ['肩', '胃', '腰', '肌'], correct: 1, explanation: '胃 (い): Dạ dày.' },
    { id: 'g12', question: 'その話を聞いて、みんなが<b>えがお</b>になった。', options: ['楽顔', '悲顏', '泣顏', '笑顔'], correct: 3, explanation: '笑顔 (えがお): Khuôn mặt tươi cười.' },
    { id: 'g13', question: '<b>こくばん</b>を見てください。', options: ['黒板', '黒坂', '告板', '告坂'], correct: 0, explanation: '黒板 (こくばん): Bảng đen.' },
    { id: 'g14', question: 'それは<b>いっぱんてき</b>なことだと思う。', options: ['一段的', '一般的', '一役的', '一設的'], correct: 1, explanation: '一般的 (いっぱんてき): Thông thường, phổ biến.' },

    { id: 'g15', instruction: '問題3 （ ）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。', question: '田中さんは私のめいと結婚したので、私たちは( )になりました。', options: ['主人', '家内', '親戚', '兄弟'], correct: 2, explanation: '親戚 (しんせき): Họ hàng.' },
    { id: 'g16', question: '昨日は駅で、学生時代の友達に( )会って、びっくりした。', options: ['ついでに', '当然', 'たまに', '偶然'], correct: 3, explanation: '偶然 (ぐうぜん): Ngẫu nhiên, tình cờ.' },
    { id: 'g17', question: '洗剤は種類が多いので、どれを買おうか( )しまう。', options: ['迷って', '騒いで', '疑って', '飽きて'], correct: 0, explanation: '迷う (まよう): Phân vân, do dự.' },
    { id: 'g18', question: '足に( )合う靴がなかなか見つからない。', options: ['はっきり', 'ぴったり', 'うっかり', 'がっかり'], correct: 1, explanation: 'ぴったり: Vừa vặn, khớp.' },
    { id: 'g19', question: '天気がいいので、庭に洗濯物を( )。', options: ['混ぜた', '揚げた', '干した', 'こぼした'], correct: 2, explanation: '干す (ほす): Phơi (quần áo).' },
    { id: 'g20', question: '今日の晩ご飯は、森さんが教えてくれた日本料理の( )を見て作りました。', options: ['メッセージ', 'レシピ', 'サイン', 'アナウンス'], correct: 1, explanation: 'レシピ: Công thức nấu ăn.' },
    { id: 'g21', question: '映画の中に( )する男性が、父にそっくりだった。', options: ['発生', '支出', '掲示', '登場'], correct: 3, explanation: '登場 (とうじょう): Xuất hiện, tung ra.' },
    { id: 'g22', question: '大勢の前で歌うのは初めてだったので、( )した。', options: ['どきどき', 'だぶだぶ', 'ぐうぐう', 'ざあざあ'], correct: 0, explanation: 'どきどき: Hồi hộp, tim đập thình thịch.' },
    { id: 'g23', question: 'ホテルで海側の部屋を( )したが、空いていなかった。', options: ['納得', '承知', '希望', '準備'], correct: 2, explanation: '希望 (きぼう): Mong muốn, nguyện vọng.' },
    { id: 'g24', question: '夜になると、隣の家の犬が( )ので、うるさくてなかなか眠れない。', options: ['ほえる', 'ひびく', 'しゃべる', 'どなる'], correct: 0, explanation: 'ほえる: Sủa (chó).' },
    { id: 'g25', question: 'この道は狭いので、前の車を( )のは危険ですよ。', options: ['飛び出す', '追い越す', '押し込む', '取り替える'], correct: 1, explanation: '追い越す (おいこす): Vượt qua (xe khác).' },

    { id: 'g26', instruction: '問題4 ＿＿に意味が最も近いものを、1・2・3・4から一つえらびなさい。', question: 'もう少し時間を<u>あたえよう</u>と思う。', options: ['あげよう', 'もらおう', '作ろう', '使おう'], correct: 0, explanation: '与える (あたえる) = あげる: Cho, ban tặng.' },
    { id: 'g27', question: 'ここは車が<u>ずいぶん</u>多いですね。', options: ['最も', '非常に', 'まあまあ', 'やっぱり'], correct: 1, explanation: 'ずいぶん = 非常に: Rất, cực kỳ.' },
    { id: 'g28', question: '荷物は、<u>指定の</u>場所に置いてください。', options: ['決められた', '空いている', '近くの', 'ほかの'], correct: 0, explanation: '指定 (してい) = 決められた: Được chỉ định, được quyết định.' },
    { id: 'g29', question: '山田さんの話を聞くまでは<u>不安だった</u>。', options: ['賛成', '大変', '心配', '反対'], correct: 2, explanation: '不安 (ふあん) = 心配 (しんぱい): Bất an, lo lắng.' },
    { id: 'g30', question: '<u>スケジュール</u>は川井さんに聞いてください。', options: ['行き方', '理由', 'やり方', '予定'], correct: 3, explanation: 'スケジュール = 予定 (よてい): Lịch trình, dự định.' },

    { id: 'g31', instruction: '問題5 つぎのことばの使い方として最もよいものを、1・2・3・4から一つえらびなさい。', question: '発展', options: ['毎朝ジョギングを続けたら、健康が発展するだろう。', 'テレビで紹介されてから、この店は客の数が発展した。', '林さんは中学校のとき、成績が急に発展したそうだ。', 'この町は歴史的な建物が多く、観光地として発展してきた。'], correct: 3, explanation: '発展 (はってん): Phát triển (thường dùng cho quốc gia, thành phố, kinh tế, du lịch).' },
    { id: 'g32', question: 'だく', options: ['朝作ったお弁当を大きめのハンカチでだいてかばんに入れた。', '生まれた子を初めてだいたとき、とても小さくて軽いと感じた。', 'けがをしないように、包丁をしっかりだいて魚を切った。', '引っ越しのとき運びやすいように、本や雑誌をひもでだいた。'], correct: 1, explanation: '抱く (だく): Ôm, bế (trẻ em, thú cưng).' },
    { id: 'g33', question: '原料', options: ['ここから見える景色を原料にして、抽象的な絵をかくつもりだ。', '大学を卒業したら、留学の経験を原料にして仕事がしたい。', 'このドラマは、海外の小説を原料にしたそうです。', '牛乳を原料にして、チーズやバターが作られます。'], correct: 3, explanation: '原料 (げんりょう): Nguyên liệu (sản xuất).' },
    { id: 'g34', question: '異常', options: ['今年の夏は異常な暑さで、エアコンがよく売れたそうだ。', 'その色は見えにくいので、赤などの異常な色を使ってください。', '妹の作文は上手に書けていたが、異常な漢字が一つあった。', '姉の靴は、私とは異常なサイズなので、借りることができない。'], correct: 0, explanation: '異常 (いじょう): Bất thường, dị thường. "Nắng nóng bất thường"' },
    { id: 'g35', question: '重なる', options: ['A銀行とB銀行が重なって、新しい銀行ができました。', '私たちの研究会に、来月から新しい仲間が重なります。', '子どもの運動会が大切な会議と重なった、見に行けない。', '貯金がたくさん重なったら、車を買おうと思っている。'], correct: 2, explanation: '重なる (かさなる): Trùng lặp (thời gian, lịch trình).' }
  ],
  bunpou: [
    { id: 'b1', instruction: '問題1 つぎの文 của （ ）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。', question: 'アン「先生、スピーチ大会の申込書を書いてきました。ここの書き方はこれ( ) 大丈夫でしょうか。」', options: ['で', 'から', 'に', 'を'], correct: 0, explanation: 'これ「で」大丈夫でしょうか: Hỏi sự xác nhận về phương pháp, cách thức, trạng thái. "Viết như thế này có được không ạ?"' },
    { id: 'b2', question: '7月25日と26日の2日間、北山公園( )夏祭りが行われました。', options: ['に', 'で', 'と', 'が'], correct: 1, explanation: 'N + で + Sự kiện diễn ra: Tại (địa điểm tổ chức sự kiện).' },
    { id: 'b3', question: '私は、誰( ) 親切で優しい兄をとても尊敬している。', options: ['において', 'にとって', 'に対して', 'について'], correct: 2, explanation: 'N + に対して: Đối với N (chỉ thái độ, hành động hướng tới đối tượng).' },
    { id: 'b4', question: '先生「来週の授業でこのプリントを使いますから、( )持ってきてください。」', options: ['全く', '非常に', '決して', '必ず'], correct: 3, explanation: '必ず (かならず): Nhất định, chắc chắn (dùng cho yêu cầu, lời khuyên).' },
    { id: 'b5', question: '友達の結婚式に招待されたが、出張があって( )行けない。', options: ['どうしても', 'それほど', 'せっかく', 'つい'], correct: 0, explanation: 'どうしても + Phủ định: Dù thế nào cũng không thể.' },
    { id: 'b6', question: '私の応援している野球選手が、肩のけがの( )、しばらく試合に出られなくなった。', options: ['途中で', '一方で', 'ように', 'ために'], correct: 3, explanation: 'N + の + ために: Bởi vì, do (chỉ nguyên nhân).' },
    { id: 'b7', question: '歯医者「歯を( ) 寝てしまうと、虫歯になりやすくなります。」', options: ['磨いて', '磨かずに', '磨くたび', '磨かなくて'], correct: 1, explanation: 'Vない(bỏ ない) + ずに: Mà không làm V. "Ngủ mà không đánh răng"' },
    { id: 'b8', question: '林「あ、ごめん。これから( )、あとでこっちから電話するね。」', options: ['出かけるところなのに', '出かけているところなのに', '出かけるところだから', '出かけているところだから'], correct: 2, explanation: 'Vる + ところだから: Đúng lúc tôi đang chuẩn bị làm V nên...' },
    { id: 'b9', question: 'B「ああ、東図書館ですね。この坂を( ) 郵便局がありますから、その角を右に曲がってください。」', options: ['のぼっていくと', 'のぼっていきながら', 'のぼってくるには', 'のぼってくるとき'], correct: 0, explanation: 'Vていくと: Cứ đi (lên) tiếp thì sẽ thấy... (Dùng khi chỉ đường)' },
    { id: 'b10', question: 'A「さくら駅の近くに新しくできたラーメン屋、( )?」<br>B「ううん、知らない。」', options: ['知っとく', '知っちゃう', '知ってく', '知ってる'], correct: 3, explanation: '知ってる？: Dạng nói tắt của 知っている (Bạn có biết không?)' },
    { id: 'b11', question: '山下「はい、中川が( )ので、今、代わります。」', options: ['いたします', 'おります', 'いただきます', 'ございます'], correct: 1, explanation: 'おります: Khiêm nhường ngữ của います. Trung Nakagawa đang ở đây' },
    { id: 'b12', question: '私は美術館が好きで、今までいろいろなs美術館に行った。国内の美術館が多いが、海外の美術館に( )。', options: ['行ったこともある', '行ったことはない', '行くこともできる', '行くこともできない'], correct: 0, explanation: 'Vた + こともある: Cũng đã từng có việc làm V. (Trong nước thì nhiều nhưng cũng đã từng đi bảo tàng nước ngoài)' },
    { id: 'b13', question: '(靴屋で) 客「すみません。この靴、( )」', options: ['履いてもらえませんか', '履かないんですか', '履いてみてもいいですか', '履くことになりますか'], correct: 2, explanation: 'Vてみてもいいですか: Thử làm V có được không? (Tôi đi thử đôi giày này được không?)' },

    { id: 'b14', instruction: '問題2 次の文の ★ に入る最もよいものを、1・2・3・4から一つ選びなさい。', question: '留学している息子 ＿＿ ＿＿ ★ ＿＿ 毎日楽しく過ごしていると書かれていて安心した。', options: ['メール', 'から', 'に', 'の'], correct: 2, explanation: 'Thứ tự đúng: 息子の(4) メール(1) に(3) から(2). ★ là số 3 (ni). Câu hoàn chỉnh: 息子のメールに、毎日楽しく過ごしていると書かれていて安心した.' },
    { id: 'b15', question: '来週から1か月間、出張で東京に行く。東京には ＿＿ ＿＿ ★ ＿＿ 食事でもしたいと思う。', options: ['いるので', 'いる間に', '友達が', '東京に'], correct: 1, explanation: 'Thứ tự đúng: 東京には 友達が(3) いるので(1) 東京に(4) いる間に(2). ★ là số 4 (東京に)' },
    { id: 'b16', question: 'バイオリンが ＿＿ ＿＿ ★ ＿＿ こんなに面白い楽器はないと感じる。', options: ['1年前に習い始めたのだが', '弾くほど', '弾けば', '弾けるようになりたくて'], correct: 2, explanation: 'Thứ tự đúng: バイオリンが 弾けるようになりたくて(4) 1年前に習い始めたのだが(1) 弾けば(3) 弾くほど(2). ★ là số 3 (弾けば)' },
    { id: 'b17', question: 'A「お誕生日おめでとう...」<br>B「わあ、かばんだ。ちょうど ＿＿ ＿＿ ★ ＿＿ んだ。ありがとう。」', options: ['こういう色の', '欲しい', 'と思っていた', 'かばんが'], correct: 1, explanation: 'Thứ tự đúng: ちょうど こういう色の(1) かばんが(4) 欲しい(2) と思っていた(3). ★ là số 2 (欲しい)' },
    { id: 'b18', question: '都会と田舎には違うところも多いが、どちらも、人が働き、 ＿＿ ＿＿ ★ ＿＿ という点で違いはない。', options: ['お互いに', '違いは', '生活している', 'ない'], correct: 1, explanation: 'Thứ tự đúng: 人が働き、生活している(3) という点で お互いに(1) 違いは(2) ない(4)。 ★ là số 2 (違いは)' },

    { id: 'b19', instruction: '問題3 つぎの文章を読んで、(19)から(22)の中に入る最もよいものをえらびなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">私は夏休みに京都を旅行しました。日本で旅行するとき、普段はホテルに泊まりますが、京都では温泉のある旅館に泊まりました。畳の部屋に入るのは初めてでした。<b>(19)</b>にも初めて入りました。夕食もおいしかったです。<br><br>次の日、部屋で出発の準備をしていたら、腕時計 <b>(20)</b> ないことに気がつきました。かばんの中を探しても見つからなくて、腕時計が落ちていなかったかフロントで聞きましたが、ありませんでした。...<br><br>やはり部屋にはなく、泣きそうになっていたとき、フロントの人が私の時計を見つけて、部屋に持ってきてくれました。温泉の入り口のところに<b>(21)</b>。朝、温泉に入ったときに、落としてしまったようです。...<br><br>京都旅行の一番の思い出は、時計が見つかったことを一緒に喜んでくれた旅館の人たちの笑顔です。旅行では観光地や食べ物だけではなく、人の優しさもいい思い出に<b>(22)</b>。</div>', question: '(19)に入る言葉は？', options: ['温泉', 'あの温泉', 'そんな温泉', 'これらの温泉'], correct: 0, explanation: 'Lần đầu tiên vào phòng chiếu tatami, lần đầu tiên vào "suối nước nóng" -> 温泉.' },
    { id: 'b20', question: '(20)に入る言葉は？', options: ['まで', 'しか', 'は', 'が'], correct: 3, explanation: 'Nhận ra (đồng hồ) không có ở đó -> 腕時計がないことに... (Dùng trợ từ が cho chủ ngữ của mệnh đề phụ)' },
    { id: 'b21', question: '(21)に入る言葉は？', options: ['落ちたままです', '落ちたばかりです', '落ちていたそうです', '落ちていたことです'], correct: 2, explanation: 'Truyền đạt lại lời lễ tân: "Nghe nói là nó bị rơi ở cửa" -> 落ちていたそうです.' },
    { id: 'b22', question: '(22)に入る言葉は？', options: ['なっただろうと思います', 'なるのだと感じました', 'なったのではないでしょうか', 'なるでしょうか'], correct: 1, explanation: 'Tác giả cảm nhận được/nhận ra rằng lòng tốt của con người cũng trở thành kỷ niệm đẹp -> なるのだと感じました.' }
  ],
  dokkai: [
    { id: 'd23', instruction: '問題4 つぎの(1)から(4) の文章を読んで、質問に答えなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">営業課の皆さんへ<br>営業課のコピー機は今、故障していて使えません。修理を頼んでいますが、明日の午後まで来られないそうです。急ぎでないコピーは、明日まで待ってください。<br>今日中にコピーしなければならない書類がある場合は、会計課のコピー機を使用してください。50枚以上コピーをする場合は、先に会計課に連絡をしておく必要がありますので、コピーをする前に中島に知らせてください。</div>', question: '営業課のホンさんは、明日の朝の会議で使う資料を今日中に5枚コピーしたいと考えている。どうしなければならないか。', options: ['営業課でコピーをする。中島さんに言う必要はない。', '会計課でコピーをする。中島さんに言う必要はない。', '中島さんに言ってから、営業課でコピーをする。', '中島さんに言ってから、会計課でコピーをする。'], correct: 1, explanation: 'Tài liệu cần gấp trong ngày nên phải sang phòng Kế toán. Vì số lượng < 50 tờ nên không cần báo trước cho anh Nakajima.' },
    { id: 'd24', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">6歳の娘がボールを上手に投げられるようになりたいと言う。私は娘の投げ方の悪い点をいろいろと説明して、何回もボールを投げさせているが、娘はなかなかうまくならない。<br>昨日、あるテレビ番組でボール投げについて取り上げていた。番組では、子供に大きさや重さの違うさまざまなボールを投げさせたり、紙飛行機を飛ばさせたりして、ちょうどいい力の入れ方を体で覚えさせていた。娘に必要なのは、これかもしれない。次は、このやり方を娘にやらせてみようと思う。</div>', question: 'テレビ番組を見て、「私」は娘のボール投げがうまくならないのは、なぜだと思ったか。', options: ['上手な投げ方についての「私」の説明が下手だったから。', '繰り返し同じ投げ方で投げる練習をさせていなかったから。', '実際に「私」が上手に投げているところを見せていなかったから。', 'ちょうどいい力の入れ方を体で覚える練習をさせていなかったから。'], correct: 3, explanation: 'Tác giả nhận ra điều con gái cần là "tự cơ thể ghi nhớ cách dùng lực" thay vì chỉ nghe giải thích suông.' },
    { id: 'd25', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">寺坂ゆき様<br>いつもご利用いただき、ありがとうございます。<br>2月4日にいただいたご注文についてのご連絡です。寺坂様がホームページからご注文になった革製財布(茶色)ですが、直前の電話注文で品切れになっておりました。大変申し訳ございません。お届けできるのは3月上旬になってしまいますが、いかがいたしましょうか。キャンセルもお受けいたしますので、ご希望をお聞かせください。<br>なお、同じ商品の違う色でしたら、すぐにお送りできます。あわせてご検討ください。</div>', question: 'このメールで言いたいこととして、合っているのはどれか。', options: ['商品が品切れになったから、3月上旬になります。', '商品が品切れになったから、3月上旬にもう一度注文してほしい。', '商品が品切れで、届けるまでに時間がかかるから、どうしたいか知らせてほしい。', '注文と違う色の商品を送ってしまったから、正しい色のものをすぐに送る。'], correct: 2, explanation: 'Hàng đã hết, phải đến đầu tháng 3 mới giao được, cửa hàng viết mail hỏi khách muốn chờ, hủy đơn, hay đổi màu.' },
    { id: 'd26', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">私の家には、履かなくなった古い靴がたくさんある。捨てようかと思っていたとき、ある靴屋のちらしを見た。いらない靴を店に持っていけば、その店で使える割引券と交換してくれるそうだ。回収した靴を燃やすときに出る熱が、電気を作るためのエネルギーに利用できて、環境にいいとも書かれていた。私一人が持っていっても、環境にそんなに大きい影響はないと思うが、新しい靴が安く買えるなら、古い靴は捨てないで店に持っていこうと思った。</div>', question: '「私」が古い靴を店に持っていこうと思った理由の中で、最も大きいものはどれか。', options: ['古い靴を割引券と交換して、新しい靴を買うときに使いたいと思ったから。', '古い靴を売ってお金をもらい、そのお金で新しい靴を買いたいと思ったから。', '古い靴をきれいに直してもらって、もう一度履きたいと思ったから。', '古い靴を利用してもらって、環境をよくしたいと思ったから。'], correct: 0, explanation: 'Lý do chính là vì muốn lấy phiếu giảm giá để mua giày mới rẻ hơn (新しい靴が安く買えるなら).' },

    { id: 'd27', instruction: '問題5 つぎの (1) と (2) の文章を読んで、質問に答えなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">先日、押し入れから父の古いラジオが出てきた。スイッチを入れてみたら、①懐かしい声が流れてきた。高校生のころ、大好きだったラジオの音楽番組のアナウンサーだった。私はつい番組を聞き続けてしまった。<br><br>あのころ私はよくラジオを聞いていた。ラジオのおかげで、勉強をしながらでも、ニュースや最新の音楽などさまざまな情報を知ることができた。今考えると、私にとってラジオはテレビよりも身近で便利なものだった。<br><br>今はラジオを聞く人が減っているそうだ。インターネットなどで、好きなときに知りたいニュースが見られるし、聞きたい音楽も聞けるようになったのだから、当然だ。<br><br>しかし、考えてみれば、車を運転する人や一人で仕事をする人などは、今でもよくラジオを聞いている。ほかのことをしながらでも、さまざまな情報が手に入るというラジオにしかない良さ、便利さがあるのだ。私も掃除や料理をするようなときには、②また、ラジオを聞こうと思った。</div>', question: '① 懐かしい声とあるが、何か。', options: ['「私」が高校生のころの父の声。', '「私」 高校生のころの自分の声。', '「私」が高校生のころ大好きだった歌手の声。', '「私」が高校生のころ聞いていたアナウンサーの声。'], correct: 3, explanation: 'Đó là giọng của phát thanh viên chương trình âm nhạc mà tác giả rất thích thời cấp 3.' },
    { id: 'd28', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (1) để trả lời câu hỏi.</div>', question: '② また、ラジオを聞こうと思ったのはどうしてか。', options: ['ラジオは、テレビより小さくて身近に置くことができるから', 'ラジオは、インターネットより多くのことを教えてくれるから', 'ラジオは、新しいことだけでなく古いことも伝えてくれるから', 'ラジオは、何かをしながらでも、いろいろなことを知ることができるから'], correct: 3, explanation: 'Radio có ưu điểm riêng biệt là có thể vừa làm việc khác vừa nắm bắt được thông tin.' },
    { id: 'd29', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (1) để trả lời câu hỏi.</div>', question: 'この文章のテーマは何か。', options: ['ラジオ番組の楽しさ。', 'ラジオの良さ。', 'ラジオの歴史の長さ。', 'ラジオの使い方の工夫。'], correct: 1, explanation: 'Toàn bộ bài viết nhấn mạnh vào điểm tốt, sự tiện lợi đặc thù của Radio.' },
    { id: 'd30', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">私たちの夢は、田舎に引っ越して農業を始めることです。<br><br>そこで先日、ある町が東京で開いた① 説明会に参加してみました。その町では人口が減ったので、町民を募集するために説明会を開いています。もう100人以上が移り住んでいて、多くの人は楽しく生活しています。しかし、うまくいかなかった例もあるそうです。<br><br>そのような例には② 共通点があると思いました。ある人は、田舎の生活にあこがれて引っ越して来ましたが、すぐに退屈な毎日が嫌になったそうです。農業がしたくて来たのにあまりにも大変で、都会に戻ってしまった例もありました。毎月の町内の掃除など、都会では経験したことがなかったことが意外にめんどうくさいと感じる人もいるそうです。説明会では、このような例も知ってから検討してほしいと言っていました。<br><br>成功例ばかり見ていた私たちは、考えが甘かったようです。でも、夢はあきらめたくないので、よく調べて、計画を立てて、実行できるように頑張りたいと思います。</div>', question: '町が① 説明会を開いた目的は何か。', options: ['町に引っ越して来てくれる人を募集すること。', '町に引っ越して来る人を助けてくれる町民を募集すること。', '町の農業について、アドバイスをしてくれる専門家を募集すること。', '町の人口を増やすにはどうしたらいいか、考えてくれる人を募集すること。'], correct: 0, explanation: 'Thị trấn mở buổi thuyết trình vì dân số giảm nên muốn thu hút thêm người dân.' },
    { id: 'd31', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (2) để trả lời câu hỏi.</div>', question: '② 共通点とあるが、それはどのような点だと考えられるか。', options: ['期待していた生活ができていないが、我慢して生活している点。', '期待していた生活ができるようになり、楽しく生活ができている点。', '期待していた生活と実際の生活が同じではなかったが、満足している点。', '期待していた生活と実際の生活が違い、不満を感じた点。'], correct: 3, explanation: 'Điểm chung của người thất bại là thực tế ở quê khác xa so với kỳ vọng (nhàm chán, vất vả, rắc rối) gây bất mãn.' },
    { id: 'd32', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (2) để trả lời câu hỏi.</div>', question: '説明会に行ってから、自分の夢について、「私」はどう思うようになったか。', options: ['失敗例が多すぎるから、実行するのはあきらめたほうがよさそうだ。', '失敗例を知ったので、実行するかしないかを検討したい。', '失敗例のことも考えて、しっかり計画を立てて実行したい。', '失敗例より成功例がたくさんあるから、失敗例は気にせずにすぐ実行したい。'], correct: 2, explanation: 'Biết được thất bại, tác giả không từ bỏ mà sẽ nghiên cứu kỹ, lên kế hoạch cẩn thận rồi mới thực hiện.' },

    { id: 'd33', instruction: '問題6 つぎの文章を読んで、質問に答えなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">最近、私は布団に入ってもしばらく眠れなくて、悩んでいる。...それで、体が疲れるまで運動をすれば、布団に入ってすぐに眠くなるだろうと考えて、寝る1時間前に走ることにした。だが、2週間続けてみても、①全然変わらない。<br><br>そこで、どうやったら眠れるようになるか調べてみた。すると、②体の中心の温度の変化が重要だということがわかった。例えば、寝る2、3時間前に軽く走ったり、ぬるめの風呂にゆっくり入ったりするといいそうだ。こうすることで、体が中心まで温まる。すると、体は表面から熱を出そうとする。表面から熱が出ていくと、中心の温度が下がっていく。このようにして、中心の温度が下がる状態を作ると、人は眠りやすくなるのだそうだ。<br><br>注意したほうがいいこととして、こんなことも書いてあった。寝る直前に運動しすぎたり、熱い風呂に入ったりするのは、体は温まるが、頭がはっきりして眠くなくなってしまうので、逆効果らしい。つまり、私のやっていたことは③ 間違いだったのだ。<br><br>眠るために頑張っていたが、夜に一人で走るのは少し怖いと思っていたし、実は走るのも好きではない。走る以外の良い方法があると知ってうれしくなった。これからは、(    )と思う。</div>', question: '① 全然変わらないとあるが、何が変わらないのか。', options: ['布団に入ってもしばらく眠れないこと。', '運動しないと眠れないこと。', '朝、決まった時間に起きられないこと。', '1時間も走り続けられないこと。'], correct: 0, explanation: 'Chạy bộ 1 tiếng trước ngủ nhưng tình trạng "vào chăn một lúc lâu vẫn không ngủ được" không thay đổi.' },
    { id: 'd34', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Giấc ngủ" để trả lời câu hỏi.</div>', question: '② 体の中心の温度の変化が重要だとあるが、この変化を起こすためには、どうすればいいか。', options: ['体の中心の温度をまず下げることで、中心の温度が上がる状態を作る。', '体の中心の温度をまず上げることで、中心の温度が下がる状態を作る。', '体の中心の温度を上げて、中心の温度が決まった温度から下がらない状態を作る。', '体の中心の温度を上げたり下げたりして、中心の温度が変化し続ける状態を作る。'], correct: 1, explanation: 'Làm ấm cơ thể trước (nhiệt độ trung tâm tăng), sau đó cơ thể sẽ tỏa nhiệt ra ngoài khiến nhiệt độ trung tâm giảm xuống.' },
    { id: 'd35', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Giấc ngủ" để trả lời câu hỏi.</div>', question: '③ 間違いとあるが、「私」が間違えて、していたことは何か。', options: ['寝る1時間前に体が疲れるまで運動をすること。', '寝る1時間前に軽い運動をすること。', '寝る2、3時間前に体が疲れるまで運動をすること。', '寝る2、3時間前に軽い運動をすること。'], correct: 0, explanation: 'Tác giả đã tập luyện tới khi mệt lử ngay 1 tiếng trước khi ngủ gây phản tác dụng.' },
    { id: 'd36', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Giấc ngủ" để trả lời câu hỏi.</div>', question: '( )に入れるのに最もよいものはどれか。', options: ['起きる時間を遅くしよう。', '布団に入って自然に眠くなるのを待おう。', 'ぬるめの風呂にゆっくり入ってから寝よう。', '軽く走ってから寝よう。'], correct: 2, explanation: 'Không thích chạy bộ, tác giả sẽ chọn phương pháp thứ hai: Ngâm bồn nước ấm từ từ trước khi ngủ.' },

    { id: 'd37', instruction: '問題7 右のページの図書館のお知らせを読んで、質問に答えなさい。', passage: '<div class="border border-gray-400 p-4 rounded bg-white text-gray-800 text-sm mb-4"><h3 class="text-xl font-bold text-center text-blue-700 mb-4 border-b pb-2">秋の日帰りバス旅行のご案内</h3><ul class="space-y-3 mb-4"><li><b>①川中市内観光と川中東温泉</b><br>出発日:10月6日(土)、11月12日(月)<br>料金:平日7,500円/土・日8,500円<br>食事: ついていません</li><li><b>②大岩チーズ場見学と川中美術館</b><br>出発日:10月30日(火)、11月10日(土)<br>料金:平日8,500円/土・日9,500円<br>食事:昼食</li><li><b>③北森市立博物館と花丸温泉</b><br>出発日:10月29日(月)、11月11日(日)<br>料金:平日11,000円/土・日12,000円<br>食事:昼食</li><li><b>④空石山ハイキングと空石温泉</b><br>出発日:10月25日(木)、11月3日(土)<br>料金:平日10,000円/土・日11,000円<br>食事: 昼食</li></ul><div class="bg-gray-100 p-3 text-xs leading-relaxed">※料金は大人一人分です。小学生は、大人の半分の料金になります (5歳以下は無料)。<br>【キャンセル料】出発日の10日前~8日前までは料金の20%、出発日の7日前~2日前までは30%、出発日の前日は40%、当日の出発前までは50%、出発後は100%になります。<br>ゆうやけ観光 電話06-6012-3456 受付時間 7:30~18:00</div></div>', question: '田中さんは、出発日が土曜日のパス旅行に申し込みたいと思っている。昼食がついていて、温泉に行けるものがいい。田中さんの希望に合うのはどれか。', options: ['①', '②', '③', '④'], correct: 3, explanation: 'Chỉ có Tour ④ là hội đủ điều kiện: Có Onsen, có ăn trưa, có xuất phát vào thứ 7 (11月3日).' },
    { id: 'd38', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại tờ quảng cáo ở câu trước để trả lời.</div>', question: 'ロパートさんは、出発日が明日10月6日(土)の「①川中市内観光と川中東温泉」に申し込んでいたが、行けなくなった。今日の受付時間のうちにキャンセルする場合、キャンセル料はどうなるか。', options: ['7,500円の40%を払う。', '8,500円の40%を払う。', '7,500円の50%を払う。', '8,500円 of 50%を払う。'], correct: 1, explanation: 'Hủy ngày hôm nay cho tour ngày mai -> "Trước ngày khởi hành" (前日) -> Phí hủy 40%. Tour ① đi thứ 7 giá 8,500円.' }
  ],
  choukai: [
    { id: 'c0', type: 'audio_player', link: '1DuJVQ7rKdI1g3a6RyLLW-s0vC5Nf9wiA' },
    { 
      id: 'c1', 
      instruction: '問題1 では、まず質問を聞いてください。それから話を聞いて、最もよいものを一つえらんでください。', 
      question: '1番. 女の学生は何をしなければなりませんか。', 
      options: ['チケット売り場にチケットを買いに行く', 'インターネットでチケットを買う', '川野さんにお金をわたす', 'わりびきけんをもらいに行く'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      おとこの がくせい と おんなの がくせい が はなして います。おんなの がくせい は なに を しなければ なりませんか。\n\n● 男：佐藤さん、らいしゅう みんなで いくる ゆうえんち の チケット って まだ かってないよね。\n● 女：うん、まだ だよ。とうじつ みんな いりぐち の チケット うりば で かう って いってたよね。\n● 男：うん、でも とうじつ あさ は たぶん こむし、さきに インターネット で かっておいたほう が いい ね って はなし に なったんだ。いっしょに いく 川野さんが みんなの ぶん も かってくれる って。\n● 女：そうなんだ。\n● 男：チケットだい は 川野さんが はらっておいて くれる から、ちょくせつ わたしてくれる？\n● 女：うん、わかった。\n● 男：川野さん、ゆうえんち の チケット を やすく かえる わりびきけん を もらったんだって。なんにん でも つかえる らしい よ。\n● 女：そうなんだ。よかった。\n\nおんなの がくせい は なに を しなければ なりませんか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nam báo rằng Kawano sẽ mua vé trước trên mạng và đã có phiếu giảm giá. Người nữ chỉ cần trực tiếp đưa tiền vé cho Kawano. => Đáp án 3: Đưa tiền cho Kawano.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c2', 
      question: '2番. 男の留学生はこのあとまず何をしなければなりませんか。', 
      options: ['しょるいをいんさつする', '先生にメールでしょるいを送る', '先生のメールにへんしんする', '先生に会いに行く時間を決める'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      だいがく で おとこの りゅうがくせい と おんなの せんせい が はなして います。おとこの りゅうがくせい は このあと まず なに を しなければ なりませんか。\n\n● 男：せんせい、すみません。わたし、しょうがくきん の しんせい を したい と おもっていて、じゅんび してるんです。しんせい の りゆう を かく しょるい が あって、かいてみたんですけど、にほんご が ちょっと しんぱい なので みていただけないでしょうか。\n● 女：いいですよ。いま みましょうか。\n● 男：あ、パソコン で かいたんですが、まず おねがい を してから と おもっていたので、いんさつ してきてないんです。\n● 女：そう。じゃあ、あとで メール で おくって ください。チェック して へんしん しますね。\n● 男：ありがとうございます。よろしく おねがいします。\n● 女：それを みて、もし ききたい こと が あったら、また れんらく を ください。ちょくせつ しつもん に こたえます から、あう じかん を きめましょう。\n● 男：わかりました。\n\nおとこの りゅうがくせい は このあと まず なに を しなければ なりませんか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Nam sinh viên chưa in hồ sơ, nên giáo viên yêu cầu hãy gửi qua email trước để cô kiểm tra. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c3', 
      question: '3番. 女の人はいつもの仕事のほかに、今日何をしなければなりませんか。', 
      image: '1wy9RXULg_ENrDYhrMr1xhftPfN3cDAN1', 
      options: ['アイ', 'アエ', 'イウ', 'ウエ'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ケーキや で おとこの てんちょう と アルバイト の おんなの ひと が はなして います。おんなの ひと は いつもの しごと の ほかに、きょう なに を しなければ なりませんか。\n\n● てんちょう：山下さん、きょう いつもの しごと いがいに おねがい したい こと が あるんだけど。おきゃくさん から けっこんしき の おいわい で しょうたいきゃく に くばる おかし の よやく が はいっているんだ。クッキー を はこ に いれて、５０ぱこ じゅんび するの を てつだってもらえる？\n● 山下：はい。\n● てんちょう：クッキー は もう できてる から、それを はこ に つめてもらいたいんだ。みほん が ある から、それを みて つめていって。あ、そのまえに はこ を まず くみたててから つめてくれる？\n● 山下：わかりました。そのあと はこ を つつつみますか。わたし じしん が ないんですけど。\n● てんちょう：あ、それは ほかの ひと に たのむ よ。リボン は できる？\n● 山下：やった こと ないんですが。\n● てんちょう：あ、そうか。わかった。また こんど おしえる よ。\n● 山下：おねがいします。\n\nおんなの ひと は いつもの しごと の ほかに、きょう なに を しなければ なりませんか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Cửa hàng trưởng nhờ xếp bánh vào hộp, nhưng dặn "trước tiên hãy lắp/gấp hộp lại rồi mới xếp bánh vào". Việc bọc hộp và thắt nơ sẽ do người khác làm. => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c4', 
      question: '4番. おんなのひとはこのあとまずなにをしなければなりませんか。', 
      options: ['だいひょうしゃの名前を書く', 'メンバーぜんいんに住所を聞く', '利用の注意点をかくにんする', '使用料をはらう'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      しみんセンター で おんなの ひと が うけつけ の おとこの ひと と はなして います。おんなの ひと は このあと まず なに を しなければ なりませんか。\n\n● 女：あの、らいげつ こちらの セミナールーム を かりて、１０めい の ダンス の グループ で れんしゅう したいんですけど、もうしこみようし かいてきました。\n● 男：はい。あ、だいひょうしゃ の おなまえ が ないですね。\n● 女：あ、すみません。はい、かきました。\n● 男：ありがとうございます。ごりよう は はじめて ですか。\n● 女：はい。\n● 男：では、グループ の メンバー ぜんいん の おなまえ と じゅうしょ の リスト を いただく ひつよう が あるんですが。こちら、その ようし です。\n● 女：あ、そうなんですか。なまえ は わかるんですが、じゅうしょ は みんな に きかないと。\n● 男：では、そうして いただけますか。リスト を だして いただきましたら、だいひょう の かた に りよう の ちゅういてん と しようりょう に ついて ごせつめい いたします。\n● 女：わかりました。また 来ます。\n\nおんなの ひと は このあと まず なに を しなければ なりませんか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Nhân viên yêu cầu danh sách tên và địa chỉ của tất cả thành viên. Người nữ biết tên nhưng chưa biết địa chỉ, nên cần phải đi hỏi mọi người. => Đáp án 2: Hỏi địa chỉ tất cả thành viên.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c5', 
      question: '5番. 男の学生はこのあとまず何をしますか。', 
      options: ['ほかの大学のとしょかんに行く', '本のゆうそうをしんせいする', '本のコピーをしんせいする', 'ぶんがくぶのしりょうしつに行く'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      だいがく の としょかん で おとこの がくせい と としょかん の ひと が はなして います。おとこの がくせい は このあと まず なに を しますか。\n\n● がくせい：すみません。「２０せいき の ぶんがく」っていう ほん を さがしているんですけど、ここ には ない みたい で。しらべたら、ほかの だいがく の としょかん には ある みたい なんですけど、ここ で しんせい して おくって もらう こと は できますか。\n● としょかんのひと：はい、できますよ。ひつような ページ が わかっていれば、そこだけ コピー を おくって もらえる ばあい も あります。\n● がくせい：あ、そうですか。ぜんたい を よみたいので ほん を かりたいんですが、とどくまで に どのくらい じかん が かかるんでしょうか。\n● としょかんのひと：はっきり なんじつ とは いえないんですが、１しゅうかん くらい かかる こと が おおいですね。\n● がくせい：１しゅうかん も かかるんですね。\n● としょかんのひと：あの、ぶんがく の ほん なら、もしかしたら ぶんがくぶ の しりょうしつ に あるかも しれません。こちら では しらべられないので、いって きいて みるのは どうですか。ほかの だいがく の としょかん に しんせい する ばあい は また こちら に きて ください。\n● がくせい：わかりました。そうします。\n\nおとこの がくせい は このあと まず なに を しますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Gửi yêu cầu mượn trường khác mất 1 tuần, nên nhân viên thư viện khuyên sinh viên hãy thử đến phòng tư liệu của khoa Văn học tìm trước xem sao. => Đáp án 4.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c6', 
      question: '6番. ていいんはこれからまずなにをしますか。', 
      options: ['テーブルを動かす', 'いすを運ぶ', 'かびんをかたづける', 'ゆかをそうじする'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      レストラン で てんちょう が ていいん に はなして います。ていいん は これから まず なに を しますか。\n\n● てんちょう：みなさん、きょう は ごご ６じ から パーティー の よやく が はいっていますので、いま から テーブル の いち を かえます。いす は つかわない ので、ぜんいん で そうこ に ぜんぶ はこんで ください。そのあと、テーブル の かびん を かたづけてから、テーブル を かべ まで うごかして、ゆか を そうじ しましょう。そうじ が おわったら、テーブル は かべ に はった ず を みて ならべて ください。では、はじめて ください。\n\nていいん は これから まず なに を しますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Trình tự công việc: Cất hết ghế vào kho -> Dọn lọ hoa trên bàn -> Kéo bàn vào tường -> Quét sàn. Việc đầu tiên là dọn ghế. => Đáp án 2: いすを運ぶ.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    { 
      id: 'c7', 
      instruction: '問題2 では、まず質問を聞いてください。そのあと、問題用紙を見てください。読む時間があります。', 
      question: '1番. せんせいはこんかい男の学生にどんなアドバイスをしていますか。', 
      options: ['前を見て話す', 'もう少しゆっくり話す', '決められた時間内に話し終える', '発表を短くする'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      にほんごがっこう の せんせい と おとこの りゅうがくせい が はなして います。せんせい は こんかい おとこの りゅうがくせい に どんな アドバイス を して いますか。\n\n● せんせい：ジョンさん、スピーチたいかい の れんしゅう、よかったですよ。ぜんかい、スピーチ の かみ を みずに まえ を みて はなす ように と いいましたが、きょう は よく できていましたね。\n● りゅうがくせい：ありがとうございます。\n● せんせい：ただ、いそいで はなしていて、すこし わかりにくかったです。もうちょっと ゆっくり の ほう が ききやすいですよ。\n● りゅうがくせい：じかんない に はなしおわる か しんぱい で。\n● せんせい：れんしゅう して じょうず に なりましたし、いま の ながさ なら だいじょうぶですよ。がんばって ください。\n● りゅうがくせい：わかりました。ありがとうございます。\n\nせんせい は こんかい おとこの りゅうがくせい に どんな アドバイス を して いますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Giáo viên nhận xét bài nói hơi vội và khó nghe, khuyên nên nói chậm lại một chút. => Đáp án 2: もう少しゆっくり話す.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c8', 
      question: '2番. おんなのひとはこのどうぶつえんのいいところはなんだといっていますか。', 
      options: ['広くてきれいなところ', '動物とあそべる場所がある', 'めずらしい動物がいる', '動物のしゅるいが多いところ'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      おんなの ひと と おとこの ひと が はなして います。おんなの ひと は この どうぶつえん の いい ところ は なんだ と いって いますか。\n\n● 女：せんげつ できた 「さくらどうぶつえん」、わたし きのう かぞく で いってきたんだ。\n● 男：ひろくて きれいなんだってね。たのしかった？\n● 女：うん。こがた の どうぶつ と じゆう に あそべる ところ が あって、ちかく で みられたり、さわれたり、すごく よかったよ。\n● 男：そう、たのしめて よかったね。\n● 女：３さい の むすこ も よろこんでたけど、わたし も たのしんじゃった。めずらしい どうぶつ が いる とか、たくさんの しゅるい の どうぶつ が みられる とか じゃ ないんだけどね。\n● 男：そうなんだ。\n\nおんなの ひと は この どうぶつえん の いい ところ は なんだ と いって いますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Sở thú không có thú lạ hay nhiều loại, nhưng có khu vực để tự do vui chơi, chạm vào các động vật nhỏ. Đó là điểm tốt nhất. => Đáp án 2: 動物とあそべる場所がある.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c9', 
      question: '3番. 男の学生は女の学生にどんなアドバイスをしていますか。', 
      options: ['毎日れんしゅうする', '基本の練習を増やす', '1日のれんしゅう時間をへらす', '週1日はれんしゅうを休む'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      だいがく で テニスクラブ の おんなの がくせい と おとこの がくせい が はなして います。おとこの がくせい は おんなの がくせい に どんな アドバイス を していますか。\n\n● 女：せんぱい、こんど はじめて しあい に でる ので、がんばらなくちゃ と おもって、クラブ が ない ひ も だいがく に きて まいにち れんしゅう してるんです。でも、うまくなってる ように おもえなくて。\n● 男：しあい、２かげつご だったよね。\n● 女：はい。きほん の れんしゅう を もっと ふやした ほう が いいでしょうか。\n● 男：れんしゅう の ないよう は いま の ままで いい と おもう よ。ただ、やすまずに まいにち れんしゅう すると つかれ が たまって れんしゅう の こうか が でにくい よ。\n● 女：じゃあ、１にち の れんしゅう じかん を みじかく して みます。れんしゅう しない ひ が ある のは ふあん なので。\n● 男：いや、しゅうに １にち は テニス の こと を わすれて しっかり やすまなきゃ。れんしゅう しすぎて ひじ や かた を わるく する ひと も いるからね。\n● 女：わかりました。ありがとうございます。\n\nおとこの がくせい は おんなの がくせい に どんな アドバイス を していますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nam khuyên không nên giảm thời gian hay đổi nội dung, mà bắt buộc một tuần phải có 1 ngày nghỉ ngơi hoàn toàn không tập tennis. => Đáp án 4: 週1日はれんしゅうを休む.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c10', 
      question: '4番. よやくしたふねがしゅっぱつするかどうか、いつはっぴょうされますか。', 
      options: ['出発の前日の午後6時', '出発の前日の午後8時', '出発の日の午前6時', '出発の日の午前8時'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      でんわ の じどううけつけ で ふね の よやく を した あと、あんない を きいて います。よやく した ふね が しゅっぱつ するか どうか、いつ はっぴょう されますか。\n\n● あんない：みなみおおしま いき の ふね の ごよやく、ありがとうございます。ふね は てんき や なみ の じょうたい により、しゅっぱつ が ちゅうし に なる ばあい が ございます。すべての ふね の しゅっぱつ は、とうじつ の ごぜん ６じ いこう、ホームページ または おでんわ で かくにん して いただけます。でんわばんごう は ０３－４５６７－８９０１ です。ごぜん ６じ から ごぜん ８じ まで は じどうおうとう で、ごぜん ８じ から ごご ８じ まで は かかりいん が おこたえ いたします。\n\nよやく した ふね が しゅっぱつ するか どうか、いつ はっぴょう されますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Thông báo nói rõ "tất cả tàu xuất phát sẽ được xác nhận từ 6 giờ sáng của ngày hôm đó". => Đáp án 3: 出発の日の午前6時.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c11', 
      question: '5番. おんなのひとはどうしてむすこにすいえいをならわせることにしましたか。', 
      options: ['むすこがやりたいと言ったから', '体力をつけさせたかったから', 'じしんをつけさせたかったから', '勉強をがんばるようになると聞いたから'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      おとこの ひと と おんなの ひと が はなして います。おんなの ひと は どうして むすこ に すいえい を ならわせる こと に しましたか。\n\n● 男：むすこさん、すいえい を ならってる そうですね。うちの こ にも なにか ならわせたいと おもってるんですけど、どうですか。\n● 女：たのしそうに やってますよ。いま しょうがくせい なんですけが、ようちえん の とき から やってます。\n● 男：むすこさん が やりたい って いったんですか。\n● 女：そうでは なかったんですが、すいえい は たいりょく が つく と おもって かよわせ はじめたんです。\n● 男：そうなんですか。\n● 女：すいえい を はじめて から、あまり かぜ を ひかなく なりましたね。それから、はじめて から きがついたんですが、じぶん に じしん が ついたみたい です。どんどん およげるようになって。\n● 男：なるほど。\n● 女：すいえい を はじめてから べんきょう も がんばるようになった っていう はなし も、ほかの おかあさんたち から さいきん ききました。うちの こ は あいかわらず ですけど。\n\nおんなの ひと は どうして むすこ に すいえい を ならわせる こと に しましたか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Lúc đầu không phải do con muốn học, mà người mẹ nghĩ rằng bơi lội sẽ giúp tăng cường thể lực nên đã cho đi học. => Đáp án 2: 体力をつけさせたかったから.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c12', 
      question: '6番. どのグループも店で必ずきかなければならないことはなんですか。', 
      options: ['商品を売るための工夫', '店でいちばん売れているもの', '開店前にじゅんびすること', '店を始めた年'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      にほんごがっこう の せんせい が はなして います。どの グループ も インタビュー で かならず きかなければ ならない こと は なんですか。\n\n● せんせい：この まち の みせ を しょうかい する かつどう ですが、らいしゅう は グループ に わかれて、せんしゅう きめた みせ に インタビュー に いきます。しょうひん を うる ために それぞれ の みせ で かんがえて やっている こと を わすれずに きいて ください。そのほかの しつもん は せんしゅう グループ で きめましたね。みせ で いちばん うれている しょうひん とか、かいてんまえ の じゅんび など、それぞれ ようい した しつもん を しましょう。いつ みせ を はじめたか という しつもん を かんがえた グループ も ありました が、ふるい みせ も おおいので、びっくり するような こたえ が かえってくるかも しれませんね。\n\nどの グループ も インタビュー で かならず きかなければ ならない こと は なんですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Giáo viên dặn các nhóm không được quên hỏi về "những việc cửa hàng đang suy nghĩ/làm để bán được sản phẩm". => Đáp án 1: しょうひんを売るためのくふう.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    { 
      id: 'c13', 
      instruction: '問題3 では、問題用紙に何もいんさつされていません。全体としてどんな内容かを聞く問題です。', 
      question: '1番', 
      options: ['べんきょう する のに いい ばしょ', 'えいご を ならう もくてき', 'はやおき を して かんじた こうか', 'あさ いちばん はじめ に する しごと'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      かいしゃ で おとこの ひと と おんなの ひと が はなして います。\n\n● 男：さいきん、しゅっきんまえ に かいしゃ の ちかく の カフェ で えいご を べんきょう してるんだ。\n● 女：しゅっきんまえ に ですか。\n● 男：そう。こんでる でんしゃ に のりたくなくて、はやく おきて、まえ より １じかん はやく いえ を でる ように したんだ。じかん も あるし、あさ は きぶん が いいから、カフェ で なにか べんきょう しよう と おもってね。しゅうちゅう できて いいよ。\n● 女：なるほど。でも、はやく おきる のも たいへん なんじゃ ないですか。\n● 男：うん、さいしょ はね。でも、なれてきたら からだ の ちょうし が まえ より いいような きがする。そのあと の しごと でも いい アイデア が でてくるんだ。\n● 女：そうなんですね。わたし も あさ、なにか やってみよう。\n\nおとこの ひと は なに に ついて はなして いますか。\n\n1. べんきょう する のに いい ばしょ\n2. えいご を ならう もくてき\n3. はやおき を して かんじた こうか\n4. あさ いちばん はじめ に する しごと\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nam chia sẻ việc anh dậy sớm để tránh kẹt xe và học tiếng Anh ở quán cafe, qua đó nhận thấy sức khỏe tốt hơn và có nhiều ý tưởng công việc. => Đáp án 3: はやおきをしてかんじたこうか.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c14', 
      question: '2番', 
      options: ['スーパー に かいもの に いかない りゆう', 'たべもの の かいすぎ を ふせぐ くふう', 'ごみ の ただしき すてかた', 'おやつ に たべる と いい もの'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ラジオ で おんなの ひと が はなして います。\n\n● 女：おなか が すいた じょうたい で、わたし は スーパー に かいもの に いかない ように しているんです。なぜって、コロッケ とか ケーキ とか め に はいる たべもの が どれも おいしそうに みえて、つい たくさん かってしまうんです。かいすぎても ぜんぶ たべられる なら いいんですよ。けど、けっきょく のこして しまって、そのまま ごみばこ へ という しっぱい を なんども したんです。たべずに すてられて しまう しょくりょうひん の こと が もんだい に なってますけど、かいもの に いく まえ に おなか が すいていたら おやつ を たべる。こうやって わたし は きをつけて います。\n\nおんなの ひと は なに に ついて はなして いますか。\n\n1. スーパー に かいもの に いかない りゆう\n2. たべもの の かいすぎ を ふせぐ くふう\n3. ごみ の ただしき すてかた\n4. おやつ に たべる と いい もの\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người phụ nữ kể về thói quen ăn nhẹ trước khi đi siêu thị lúc đói, để tránh việc nhìn gì cũng muốn mua rồi mua quá nhiều đồ ăn. => Đáp án 2: 食べ物の買いすぎを防ぐ工夫.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c15', 
      question: '3番', 
      options: ['もうしこみ ほうほう', 'じゅぎょう の ないよう', 'じゅぎょう を えらぶ とき の ちゅういてん', 'おしえる せんせい の じょうほう'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      だいがく で せんせい が はなして います。\n\n● せんせい：らいしゅう から せんもんかもく の もうしこみ が はじまります。しりょう に かかれている それぞれ の じゅぎょう の もくてき や ないよう を しっかり よんで、じぶん の きょうみ に ちかい じゅぎょう を せんたく して ください。じゅぎょう の なまえ だけ を みて こんな ないよう だろう と そうぞう して えらぶ と、じゅぎょう が はじまってから おもっていた のと ちがった という こと が よく あります。また、ないよう が やさしそう だという りゆう で せんたく する のも よく ありません。きょうみ を もった じゅぎょう の せんせい と はなしたり、せんぱい の けいけん を きいたり して、じょうほう を あつめる のも いいと おもいますよ。\n\nせんせい は せんもんかもく の なに に ついて はなして いますか。\n\n1. もうしこみ ほうほう\n2. じゅぎょう の ないよう\n3. じゅぎょう を えらぶ とき の ちゅういてん\n4. おしえる せんせい の じょうほう\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Giáo viên lưu ý học sinh về việc chọn môn học chuyên ngành: phải đọc kỹ nội dung, không nên chỉ nhìn tên môn rồi đoán... => Đáp án 3: じゅぎょうをえらぶときのちゅういてん.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    { 
      id: 'c16', 
      instruction: '問題4 では、絵を見ながら質問を聞いてください。矢印（→）の人は何と言いますか。', 
      question: '1番. 先輩の家に遊びに来て、今帰ります。先輩に帰る前の挨拶をします。何と言いますか。', 
      image: '1G38UQBOug9-m2RSMPTRrJIHW4BqYKYRB', 
      options: ['いってまいります。', 'おじゃましました。', 'おきをつけて おかえりください。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      せんぱい の いえ に あそび に きて、いま かえります。せんぱい に かえるまえ の あいさつ を します。なんと いいますか。\n\n1. いってまいります。\n2. おじゃましました。\n3. おきをつけて おかえりください。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Khi kết thúc chuyến đến chơi nhà người khác và ra về, câu chào tiêu chuẩn là お邪魔しました (Tôi đã làm phiền rồi ạ) => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c17', 
      question: '2番. 荷物を持っていて手が使えません。部屋に入りたいです。何と言いますか。', 
      image: '1zUetNjfsDUYNG0XOTujJZsYp40hFje3H', 
      options: ['あ、ドア、ちょっと おさえてて くれる？', 'あ、ドア、しめて くれない？', 'あ、ドア、あけようか？'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      にもつ を もっていて て が つかえません。へや に はいりたい です。なんと いいますか。\n\n1. あ、ドア、ちょっと おさえてて くれる？\n2. あ、ドア、しめて くれない？\n3. あ、ドア、あけようか？\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Đang bê đồ nặng không mở được cửa. Cách nhờ vả hợp lý nhất là nhờ người bên trong giữ hộ cánh cửa để mình đi vào (ちょっと押さえててくれる？) => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c18', 
      question: '3番. 用事があるので自分だけ早く店を出ます。友達に何と言いますか。', 
      image: '1JQT4pA-QKlT0IClO-FuBrJP-URq2FA7r', 
      options: ['さきに いっても いいよ。', 'ゆっくり していって いい？', 'ごめん、もう いかなきゃ。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ようじ が あるので じぶん だけ はやく みせ を でます。ともだち に なんと いいますか。\n\n1. さきに いっても いいよ。\n2. ゆっくり していって いい？\n3. ごめん、もう いかなきゃ。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Có việc bận nên phải về trước. Xin lỗi và cáo lui bằng câu: Xin lỗi, tớ phải đi bây giờ (ごめん、もう行かなきゃ) => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c19', 
      question: '4番. スポーツクラブの会員になりたいと思っています。その前に見学したいです。何と言いますか。', 
      image: '17AXsEblZV39a8CtsLfXGlWxfflfsc92c', 
      options: ['けんがく して いただけますか。', 'けんがく させて ほしいんですが。', 'けんがく すれば いいですか。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      スポーツクラブ の かいいん に なりたい と おもって います。そのまえ に けんがく したい です。なんと いいますか。\n\n1. けんがく して いただけますか。\n2. けんがく させて ほしいんですが。\n3. けんがく すれば いいですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Muốn bày tỏ nguyện vọng được đi xem trước câu lạc bộ. Dùng cấu trúc: Vさせてほしい (Tôi muốn được phép làm V) => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    { 
      id: 'c20', 
      instruction: '問題5 では、短い言葉を聞いて、それに答えてください。', 
      question: '1番', 
      options: ['けっこう いろんな とこ いったよ。', 'そこは まだ いってないんだ。', 'じゃあ、おんせん は どう？'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      リーさん、にほん に きてから どっか りょこう に いった？\n\n1. けっこう いろんな とこ いったよ。\n2. そこは まだ いってないんだ。\n3. じゃあ、おんせん は どう？\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Câu hỏi: Từ lúc đến Nhật đã đi du lịch đâu chưa? Trả lời tự nhiên nhất: Tớ đã đi được khá nhiều nơi rồi đó. => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c21', 
      question: '2番', 
      options: ['みんな の おうえん が あったからだよ。', 'さいご まで はしれなくて くやしいよ。', 'おめでとう、がんばったね。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      西野さん、西野さん マラソン はじめて だったのに、よく さいご まで はしったね。\n\n1. みんな の おうえん が あったからだよ。\n2. さいご まで はしれなくて くやしいよ。\n3. おめでとう、がんばったね。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Được khen vì đã nỗ lực chạy hết quãng đường, câu trả lời khiêm tốn: Đó là nhờ có sự cổ vũ của mọi người đấy. => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c22', 
      question: '3番', 
      options: ['おかし は いやなの？', 'あ、チョコレート あるよ。', 'ありがとう、たべたい。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ちょっと おなか すいたなー。おかし か なにか もってない？\n\n1. おかし は いやなの？\n2. あ、チョコレート あるよ。\n3. ありがとう、たべたい。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Hỏi: Tớ hơi đói, cậu có kẹo bánh gì không? Trả lời tự nhiên nhất: À, tớ có sô cô la này. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c23', 
      question: '4番', 
      options: ['こちらこそ、また おあいしましょう。', 'ぜひ おめに かかりたいです。', 'もう みたんですか。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      林さん、きょう は おめに かかれて ほんとうに よかったです。\n\n1. こちらこそ、また おあいしましょう。\n2. ぜひ おめに かかりたいです。\n3. もう みたんですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người kia nói: Hôm nay thực sự rất vui vì được gặp chị. Đáp lại lịch sự: Chính tôi mới là người phải nói vậy, hẹn gặp lại chị nhé (こちらこそ). => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c24', 
      question: '5番', 
      options: ['ぜひ おしえて ください。', 'どんな こと ですか。', 'いただいた こと が ありますよ。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      森さん、しゅっちょう の しょるい の こと で ちょっと おしえて いただきたい こと が あるんですが。\n\n1. ぜひ おしえて ください。\n2. どんな こと ですか。\n3. いただいた こと が ありますよ。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Đồng nghiệp nói: Có chút chuyện liên quan đến tài liệu đi công tác tôi muốn nhờ anh chỉ cho. Trả lời: Là chuyện gì vậy? => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c25', 
      question: '6番', 
      options: ['あさって は だめなんだね。', 'あした に かえて くれるの？ ありがとう。', 'あさって？ だいじょうぶだよ。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      和田さん、あした の えいが の やくそく、できれば あさって に かえて もらいたいんだけど。\n\n1. あさって は だめなんだね。\n2. あした に かえて くれるの？ ありがとう。\n3. あさって？ だいじょうぶだよ。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Bạn nhờ: Lịch xem phim ngày mai cậu đổi sang ngày kia cho tớ có được không? Trả lời đồng ý: Ngày kia à? Ok không sao đâu. => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c26', 
      question: '7番', 
      options: ['え、さめてから の ほう が いいですか。', 'じゃ、さっそく いただきます。', 'あつい の にがて だから よかったです。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      トムさん、ひるごはん できたよ。さめない うちに どうぞ。\n\n1. え、さめてから の ほう が いいですか。\n2. じゃ、さっそく いただきます。\n3. あつい の にがて だから よかったです。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Bạn mời ăn: Cơm trưa xong rồi, ăn ngay lúc còn nóng đi. Trả lời: Vậy tớ không khách sáo nhé (ăn luôn đây). => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c27', 
      question: '8番', 
      options: ['あ、はい。すぐ いきます。', 'ここ で おまちすれば いいんですね。', 'じゃ、しゃちょう に そう おつたえします。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      山本さん、しゃちょう が しゃちょうしつ に くる ようにって。\n\n1. あ、はい。すぐ いきます。\n2. ここ で おまちすれば いいんですね。\n3. じゃ、しゃちょう に そう おつたえします。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Được dồng nghiệp chuyển lời: Anh Yamamoto, giám đốc gọi anh lên phòng giám đốc đấy. Trả lời: À vâng, tôi đi ngay đây. => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c28', 
      question: '9番', 
      options: ['しりょう、おうけとり に なったんですね。', 'ぶちょう に わたして くださったんですか。', 'あ、こちら の しりょう です。どうぞ。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      村上さん、ぶちょう から しりょう あずかって くれているよね。\n\n1. しりょう、おうけとり に なったんですね。\n2. ぶちょう に わたして くださったんですか。\n3. あ、こちら の しりょう です。どうぞ。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Hỏi: Chị Murakami, chị đang cầm tài liệu của trưởng phòng giữ hộ đúng không? Trả lời: A, là tài liệu này đây ạ. Xin mời lấy. => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    }
  ]
};
