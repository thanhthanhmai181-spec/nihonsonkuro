import { N3ExamData } from "./examN3_2024";

export const EXAM_DATA_N3_2021_07: N3ExamData = {
  goi: [
    // 問題1
    { id: 'g1', instruction: '問題1 ______の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。', question: 'このビルの<b>裏</b>に小さなレストランがあります。', options: ['そば', 'よこ', 'かげ', 'うら'], correct: 3, explanation: '裏 (うら): Phía sau, mặt sau.' },
    { id: 'g2', question: 'それではゆっくり<b>呼吸</b>をしてください。', options: ['こぎゅう', 'こきゅう', 'よぎゅう', 'よきゅう'], correct: 1, explanation: '呼吸 (こきゅう): Hô hấp, hít thở.' },
    { id: 'g3', question: 'あの少年の<b>悲しそう</b>な顔が忘れられない。', options: ['やさしそう', 'かなしそう', 'きびしそう', 'さびしそう'], correct: 1, explanation: '悲しそう (かなしそう): Trông có vẻ buồn bã.' },
    { id: 'g4', question: 'このあたりに<b>駐車</b>しましょう。', options: ['しゅしゃ', 'しゅうしゃ', 'ちゅしゃ', 'ちゅうしゃ'], correct: 3, explanation: '駐車 (ちゅうしゃ): Đỗ xe.' },
    { id: 'g5', question: 'もう<b>逃げて</b>しまったようだ。', options: ['にげて', 'なげて', 'ぬげて', 'あげて'], correct: 0, explanation: '逃げる (にげる): Chạy trốn, tẩu thoát.' },
    { id: 'g6', question: '<b>努力</b>することは大切だと思います。', options: ['どうりょく', 'とうりょく', 'どりょく', 'とりょく'], correct: 2, explanation: '努力 (どりょく): Nỗ lực.' },
    { id: 'g7', question: 'それは<b>過去</b>のことです。', options: ['かこ', 'かこう', 'かきよ', 'かきよう'], correct: 0, explanation: '過去 (かこ): Quá khứ.' },
    { id: 'g8', question: '彼は話し方も<b>動作</b>もゆっくりしている。', options: ['とうさ', 'とうさく', 'どうさ', 'どうさく'], correct: 2, explanation: '動作 (どうさ): Động tác, cử chỉ.' },

    // 問題2
    { id: 'g9', instruction: '問題2 ______のことばを漢字で書くとき、最もよいものを、1・2・3・4から一つえらびなさい。', question: '昨日、友達が家に<b>とまり</b>にきた。', options: ['停まり', '留まり', '泊まり', '止まり'], correct: 2, explanation: '泊まる (とまる): Trọ lại, ngủ lại.' },
    { id: 'g10', question: '書類にはこの学校の<b>きそく</b>が書かれていた。', options: ['現販', '規則', '規販', '現則'], correct: 1, explanation: '規則 (きそく): Quy tắc, nội quy.' },
    { id: 'g11', question: 'ここは<b>あたたかい</b>ですね。', options: ['明るい', '暑かい', '暖かい', '熱い'], correct: 2, explanation: '暖かい (あたたかい): Ấm áp (thời tiết, khí hậu).' },
    { id: 'g12', question: '<b>やっきょく</b>がなかなか見つかりません。', options: ['薬局', '楽曲', '楽局', '楽曲'], correct: 0, explanation: '薬局 (やっきょく): Hiệu thuốc.' },
    { id: 'g13', question: 'お皿は<b>かさねて</b>その棚にしましてください。', options: ['整れて', '列れて', '階ねて', '重ねて'], correct: 3, explanation: '重ねる (かさねる): Chồng lên, xếp lên nhau.' },
    { id: 'g14', question: '机の上に<b>でんごん</b>のメモがあった。', options: ['伝記', '伝言', '転記', '転勤'], correct: 1, explanation: '伝言 (でんごん): Lời nhắn.' },
    
    // 問題3
    { id: 'g15', instruction: '問題3 （ ）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。', question: 'マラソン大会は台風で( ) されることになりました。', options: ['遅刻', '連休', '延期', '早退'], correct: 2, explanation: '延期 (えんき): Trì hoãn, dời lịch.' },
    { id: 'g16', question: '毎日水をやらないと、花が( )しまう。', options: ['とけて', 'さめて', 'やせて', 'かれて'], correct: 3, explanation: '枯れる (かれる): Héo, úa.' },
    { id: 'g17', question: 'この犬は、子犬のころから( ) されているので、人が大勢いてもおとなしい。', options: ['工夫', '用意', '訓練', '計画'], correct: 2, explanation: '訓練 (くんれん): Huấn luyện.' },
    { id: 'g18', question: '明日は7時に出かけるので、目覚まし時計を6時に ( )した。', options: ['スタート', 'セット', 'ストップ', 'マーク'], correct: 1, explanation: 'セット (Set): Cài đặt (đồng hồ báo thức).' },
    { id: 'g19', question: '忙しいのに、こんなに待たされて時間が( )。', options: ['だらしない', 'しょうがない', 'なさけない', 'もったいない'], correct: 3, explanation: 'もったいない: Lãng phí, uổng phí (thời gian).' },
    { id: 'g20', question: '友人の家で食べたケーキがおいしかったので、( )と作り方を教えてもらった。', options: ['資源', '材料', '部品', '原因'], correct: 1, explanation: '材料 (ざいりょう): Nguyên liệu (nấu ăn).' },
    { id: 'g21', question: 'このソファーの愛用( )にアンケートをした。', options: ['生', '人', '者', '員'], correct: 2, explanation: '愛用者 (あいようしゃ): Người yêu thích sử dụng.' },
    { id: 'g22', question: '工事のせいで道路が ( ) していて、車がなかなか前に進まない。', options: ['渋滞', '故障', '增加', '応援'], correct: 0, explanation: '渋滞 (じゅうたい): Tắc đường, kẹt xe.' },
    { id: 'g23', question: 'くすりの( )が出て、少し具合がよくなりました。', options: ['成績', '効果', '集合', '価値'], correct: 1, explanation: '効果 (こうか): Hiệu quả (của thuốc).' },
    { id: 'g24', question: '彼は日本にまだ一年しか住んでいないのに、日本語が( )だ。', options: ['さらさら', 'ばらばら', 'ふらふら', 'ペラペラ'], correct: 3, explanation: 'ペラペラ: Trôi chảy, lưu loát.' },
    { id: 'g25', question: 'この学校で一生懸命に勉強して、知識や技術を ( ) 思っている。', options: ['身につけたい', '気に入りたい', '押し込みたい', '取りあげたい'], correct: 0, explanation: '身につける (みにつける): Trang bị (kiến thức, kỹ năng) cho bản thân.' },

    // 問題4
    { id: 'g26', instruction: '問題4 ＿＿に意味が最も近いものを、1・2・3・4から一つえらびなさい。', question: '今日の会議では<u>さまざまな</u>意見が出た。', options: ['とくべつな', 'すばらしい', 'いろいろな', 'あたらしい'], correct: 2, explanation: '様々 (さまざま) = 色々 (いろいろ): Nhiều, đa dạng.' },
    { id: 'g27', question: 'できるだけ早めに<u>報告して</u>ください。', options: ['頼んで', '知らせて', '尋ねて', '探して'], correct: 1, explanation: '報告する (ほうこくする) = 知らせる (しらせる): Báo cáo, thông báo.' },
    { id: 'g28', question: '山田さんは<u>絶対に</u>来ると思います。', options: ['あとで', 'すぐに', 'たぶん', 'かならず'], correct: 3, explanation: '絶対 (ぜったい) = 必ず (かならず): Chắc chắn, tuyệt đối.' },
    { id: 'g29', question: 'この話は<u>おしまい</u>です。', options: ['おわり', 'すごい', 'はじめて', 'おもしろい'], correct: 0, explanation: 'おしまい = 終わり: Kết thúc.' },
    { id: 'g30', question: '先週、学校を<u>サボってしまった</u>。', options: ['病気になって学校をやめてしまった。', '病気になって学校を休んでしまった。', 'あそびたくて学校をやめてしまった。', 'あそびたくて学校を休んでしまった。'], correct: 3, explanation: 'サボる = 遊びたくて休む: Trốn học/trốn việc để đi chơi.' },

    // 問題5
    { id: 'g31', instruction: '問題5 つぎのことばの使い方として最もよいものを、1・2・3・4から一つえらびなさい。', question: 'オーバー', options: ['飛行機の出発時間がオーバーになった。', '安いのがなくて、1万円もオーバーしてしまった。', '考えすぎて、頭がオーバーになった。', '料理がオーバーして、もう食べられない。'], correct: 1, explanation: 'オーバー (Over): Vượt quá (mức tiền, giới hạn). "Vượt quá 1 vạn yên"' },
    { id: 'g32', question: '欠点', options: ['ここは景色のいい場所だが、駅から遠いという欠点がある。', '栄養に欠点が出ないように、食事のメニューを考えている。', 'ガードレールにぶつけて、車に欠点がついてしまった。', 'メールを送る前に、メールアドレスに欠点がないか確認した。'], correct: 0, explanation: '欠点 (けってん): Khuyết điểm, nhược điểm.' },
    { id: 'g33', question: '親しい', options: ['私は学生のころ、数学より理科の方が親しかった。', '彼女はとても親しい道を教えてくれた。', '久しぶりに友達と会って、親しかった。', '引っ越してきたばかりで、近くにまだ親しい人はいない。'], correct: 3, explanation: '親しい (したしい): Thân thiết, gần gũi. "Chưa có người quen thân nào"' },
    { id: 'g34', question: '詰める', options: ['明日帰国するので、かばんに洋服やお土産を詰めた。', 'テーブルに食器を2枚詰めて、朝食の準備をした。', '忘れないように、大切なことをノートに詰めた。', 'ジャケットのポケットに手を詰めて、切符を出した。'], correct: 0, explanation: '詰める (つめる): Nhồi, nhét vào (hành lý, hộp).' },
    { id: 'g35', question: '支給', options: ['母の誕生日に、何かプレゼントを支給しようと思う。', 'これから先生にレポートを支給しに行くつもりだ。', 'この会社は、家から会社までの交通費を支給してくれる。', '買い物のとき、お釣りを支給してもらいのを忘れた。'], correct: 2, explanation: '支給 (しきゅう): Cấp phát, chi trả (thường dùng cho công ty trả lương, trợ cấp).' }
  ],
  bunpou: [
    // 問題1
    { id: 'b1', instruction: '問題1 つぎの文の（ ）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。', question: '両親に買ってもらった着物 ( ) 大学の卒業式に出席した。', options: ['を', 'が', 'で', 'に'], correct: 2, explanation: 'N + で: Mặc N, bằng N (Chỉ phương tiện/trạng thái). "Mặc bộ kimono để tham dự..."' },
    { id: 'b2', question: '本を読んでいたら、( ) 5時間も経ってしまった。', options: ['そろそろ', 'だんだん', 'ようやく', 'いつのまにか'], correct: 3, explanation: 'いつのまにか: Không biết từ lúc nào.' },
    { id: 'b3', question: 'わたしに( )、今一番大切なものは、飼っている犬です。', options: ['対して', '比べて', 'おいて', 'とって'], correct: 3, explanation: 'Nにとって: Đối với N thì... (đưa ra quan điểm, đánh giá).' },
    { id: 'b4', question: 'A「部長の田中とお会いになるのは今日が初めてですか。」<br>B「はい。山下課長 ( ) お目にかかったことがございませんので。」', options: ['にだけ', 'にしか', 'でしか', 'でだけ'], correct: 1, explanation: 'N + にしか + Phủ định: Chỉ mới (gặp) mỗi...' },
    { id: 'b5', question: '図書館が閉まっている( )、本を返すことができる。', options: ['ときでも', 'まで', '間だから', 'ところなら'], correct: 0, explanation: 'ときでも: Ngay cả những lúc... (Ngay cả khi đóng cửa vẫn có thể trả sách)' },
    { id: 'b6', question: 'B「わあ、本当だ。( ) きれいなんだろう。」', options: ['ときでも', 'なんかく', 'なんて', 'なんでも'], correct: 2, explanation: 'なんて～んだろう: Cảm thán (Thật là... làm sao).' },
    { id: 'b7', question: '展覧会に知り合いの絵がかざられるので、わたしも見に( )と思う。', options: ['行こうか', '行かないか', '行くのか', '行ったか'], correct: 0, explanation: 'Vようかと思う: Tôi đang định sẽ làm V...' },
    { id: 'b8', question: '夏は食べ物が悪く ( ) ので、注意してください。', options: ['なりにくい', 'しやすい', 'しにくい', 'なりやすい'], correct: 3, explanation: 'Vます(bỏ masu) + やすい: Dễ trở nên... "Đồ ăn dễ bị hỏng/ôi thiu"' },
    { id: 'b9', question: '急に止まって、隣に立っていた人に新しい白い靴を( )。', options: ['踏んでしまった', '踏んでおいた', '踏まれてしまった', '踏させておいた'], correct: 2, explanation: 'Thể bị động: Bị người bên cạnh dẫm lên giày (踏まれる).' },
    { id: 'b10', question: '参加する8名は皆、優勝経験があり、今回の大会は誰が( )。', options: ['優勝しても不思議ではない。', '優勝したらいい。', '優勝けるに違いない', '優勝するのではないだろうか'], correct: 0, explanation: 'Vても不思議ではない: Cho dù... thì cũng không có gì lạ. "Ai vô địch cũng không có gì lạ"' },
    { id: 'b11', question: '妻「あ、もう10時だよ。急がないと新幹線が出発( )。」', options: ['してる', 'しとく', 'しちゃう', 'しなきゃなる'], correct: 2, explanation: 'Vてしまう nói tắt thành Vちゃう: Lỡ mất, mất tiêu (Sẽ xuất phát mất).' },
    { id: 'b12', question: '山田「昨日はどうもごちそうさまでした。おいしい物をたくさん( )。」', options: ['いただいていました', 'いただきました', 'めしあがっていました', 'めしあがりました'], correct: 1, explanation: 'いただきました: Thể khiêm nhường của もらいました / 食べました (Hôm qua tôi đã được ăn nhiều món ngon).' },
    { id: 'b13', question: '夫「じゃあ、11時過ぎに店に着けるように早めに家を ( )ね。」', options: ['出るつもりかもしれない', '出たほうがいいかもしれない', '出てはいけなそうだ', '出なくてもよさそうだ'], correct: 1, explanation: 'Vたほうがいいかもしれない: Có lẽ nên làm V thì hơn (Nên đi sớm thì hơn).' },

    // 問題2
    { id: 'b14', instruction: '問題2 次の文の★に入る最もよいものを、1・2・3・4から一つえらびなさい。', question: '先生「みなさんは、一度 ＿＿ ＿＿ ★ ＿＿ と思う人はいますか。」', options: ['会ってみたい', 'いい', 'で', 'から'], correct: 3, explanation: 'Thứ tự đúng: 一度 (3で) (2いい) (4から) (1会ってみたい) と思う... ★ là số 4 (から).' },
    { id: 'b15', question: 'B「おいしかったです。 ＿＿ ＿＿ ★ ＿＿ わかりませんが、お刺身がおいしかったです。」', options: ['という', '何', 'か', '魚'], correct: 3, explanation: 'Thứ tự đúng: (2何) (1という) (4魚) (3か) わかりませんが... ★ là số 4 (魚).' },
    { id: 'b16', question: 'B「送る ＿＿ ＿＿ ★ ＿＿ から、もう少し待って。」', options: ['選んでいる', '写真を', '今', 'ところだ'], correct: 0, explanation: 'Thứ tự đúng: 送る (2写真を) (3今) (1選んでいる) (4ところだ) から... ★ là số 1 (選んでいる).' },
    { id: 'b17', question: '私は料理が ＿＿ ＿＿ ★ ＿＿ ほとんどない。', options: ['苦手', '料理は', '作れる', 'レシピを見ずに'], correct: 2, explanation: 'Thứ tự đúng: 私は料理が (1苦手で) (4レシピを見ずに) (3作れる) (2料理は) ほとんどない。 ★ là số 3 (作れる).' },
    { id: 'b18', question: 'この島は、空から ＿＿ ＿＿ ★ ＿＿ 「耳島」と呼ばれています。', options: ['形', 'にみえることから', '人の耳のような', '見ると'], correct: 0, explanation: 'Thứ tự đúng: 空から (4見ると) (3人の耳のような) (1形) (2にみえることから)... ★ là số 1 (形).' },

    // 問題3
    { id: 'b19', instruction: '問題3 つぎの文章を読んで、文章全体の内容を考えて、(19) から (22)の中に入る最もよいものをえらびなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">日本各地にはおいしい食べ物がたくさんあるのだから、そこにしかない飲食店に行くほうがいいと思っていました。それで、旅行のときはずっと、その土地にしかない店で食事を<b>(19)</b>。<br><br>旅行先で、行ったことがない店に行くのは楽しいです。<b>(20)</b>、旅行を続けていると、途中で疲れきます。疲れているとき、慣れない店に行くのは少し大変です。そんなとき、家の近くにもあるファミレスや定食屋が旅行先にもあるのはいいことだと思うようになりました。メニューも注文方法も <b>(21)</b>。私は旅行中に疲れたとき、近所にもあるレストランに入るようになりました。<br><br>どこにでもある同じような店に行くことは、旅行先だけでできる特別な経験ではありませんが、安心感があります。<b>(22)</b>の、今まで知らなかったいいところを見つけることができました。</div>', question: '(19)に入る言葉は？', options: ['するだろうと思いました', 'させるだろうと思いました', 'するようにしていました', 'させるようにしていました'], correct: 2, explanation: 'Vするようにしている: Luôn cố gắng duy trì thói quen làm V. "Tôi luôn cố gắng ăn ở những quán chỉ vùng đó mới có"' },
    { id: 'b20', question: '(20)に入る言葉は？', options: ['ただ', 'そのうえ', 'つまり', 'やはり'], correct: 0, explanation: 'ただ: Thế nhưng, có điều là... (Nêu lên ngoại lệ, chuyển ý nhẹ).' },
    { id: 'b21', question: '(21)に入る言葉は？', options: ['わかってほしいのです', 'わかっているからです', 'わかりそうにありません', '分からなければなりません'], correct: 1, explanation: '~からです: Bởi vì. "Lý do thấy các quán quen thuộc rất tiện là VÌ đã biết rõ menu và cách gọi món"' },
    { id: 'b22', question: '(22)に入る言葉は？', options: ['店', 'この店', 'ある店', 'そういう店'], correct: 3, explanation: 'そういう店: Những cửa hàng như vậy (chỉ những quán ăn chuỗi, quen thuộc ở đoạn trên).' }
  ],
  dokkai: [
    // 問題4
    { id: 'd23', instruction: '問題4 つぎの(1)から(4) の文章を読んで、質問に答えなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">たかしへ<br>急な用事で、ちょっとおじいちゃんの所へ行かなければならなくなりました。7時までには帰れると思うけど、おなかがすいて待てなかったら、昨日のカレーの残りを温めて食べてください。<br>それから、洗濯物が干したままになっているから、取り込んでおいてね。時間があったら、たたんでおいてください。<br>おいしいケーキでも買って帰るね。<br>母</div>', question: 'このメモを読んで、たかしさんがしなければならないことは何か。', options: ['おじいちゃんの所へ行く。', '昨日のカレーの残りを温めて食べる。', '洗濯物を取り込む。', 'ケーキを買って帰る。'], correct: 2, explanation: 'Mẹ dặn đói thì hâm cà ri (không bắt buộc), và "hãy cất quần áo đang phơi giúp mẹ" (bắt buộc: 取り込んでおいてね).' },
    { id: 'd24', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">山田真二様<br>現在、東京ホテルでは、インターネット予約割引サービスを行っております。<br>インターネットで予約され、2月28日までにお泊まりの方は、1泊の料金を10%割引し、ご朝食を無料にいたします。<br>この割引をご利用になれるお部屋は一日10室だけですので、お早めにご予約ください。<br>なお、このサービスは、電話、ファックスでご予約の場合はご利用できません。</div>', question: 'このメールから、東京ホテルのサービスについて、どんなことがわかるか。', options: ['インターネットで予約すると、1泊料金と朝食が10%割引になる場合がある。', 'インターネットで2月中に予約すると、朝食が10%割引になる場合がある。', 'インターネットで予約し、2月中に泊まると、1泊料金が10%割引され、朝食が無料になる場合がある。', 'インターネット、電話、ファックスのどれで予約しても、2月中は朝食だけ無料になる場合がある。'], correct: 2, explanation: 'Nội dung: "Đặt qua internet và lưu trú trước 28/2 sẽ giảm 10% tiền phòng và miễn phí bữa sáng".' },
        { 
      id: 'd25', 
      passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">駅前の交差点の信号は赤になるのが早く、少し遅れると、途中から走って渡らなければならないことも多かった。しかし、一か月ぐらい前から歩行者用の信号の時間が長くなった。そのため、走って渡る必要がなくなり、お年寄りや子どもたちも安全に渡れるようになった。交差点の信号の時間が変わっただけで、ずいぶん歩きやすくなったと感じている。</div>', 
      question: '筆者は交差点の信号についてどのように感じているか。', 
      options: [
        '信号の時間が長くなり、誰でも安全に渡れるようになって、歩きやすくなった。', 
        '走って渡らなければならないので、お年寄りや子どもには危険だと感じている。', 
        '一か月ぐらい前から信号の時間が短くなり、不便になったと感じている。', 
        '信号の時間が変わっても、歩きやすさは以前と変わらないと感じている。'
      ], 
      correct: 0, 
      explanation: 'Nội dung đoạn văn: "Khoảng 1 tháng trước đèn giao thông dành cho người đi bộ đã kéo dài thời gian hơn. Nhờ đó không cần chạy nữa, người già trẻ em cũng qua đường an toàn. Chỉ cần thay đổi thời gian đèn tín hiệu mà cảm thấy dễ đi lại hơn rất nhiều".' 
    },
    { 
      id: 'd26', 
      passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">緑川美術館からのお知らせ<br>当館では、来月1日より「世界の風景画展」を開催いたします。これに伴い、展示室の準備のため、今月25日から30日まで臨時休館とさせていただきます。休館中、美術館の庭園には入ることができますが、本館内の施設やカフェはご利用いただけません。皆様にはご不便をおかけしますが、ご理解いただきますようお願い申し上げます。</div>', 
      question: 'このお知らせで最も伝えたいことは何か。', 
      options: [
        '来月から新しい展覧会が始まること。', 
        '今月の25日から30日まで、本館が休館になること。', 
        '休館中も庭園やカフェが利用できること。', 
        '臨時休館の理由が準備のためであること。'
      ], 
      correct: 1, 
      explanation: 'Thông báo ghi rõ: Từ ngày 25 đến 30 tháng này bảo tàng sẽ tạm thời đóng cửa để chuẩn bị cho triển lãm mới => Đáp án 2.' 
    },
    { 
      id: 'd27', 
      instruction: '問題5 つぎの文章を読んで、質問に答えなさい。', 
      passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">コミュニケーションにおいて、私たちは言葉だけでなく、表情や態度も大切にしなければならない。ある調査によると、人が誰かと話すとき、相手に大いに与える印象の半分以上は「見た目」や「しぐさ」などの非言語的な要素によって決まるという。<br><br>例えば、いくら「楽しみにしています」と口では言っていても、顔が全く笑っていなかったり、退屈そうな態度をとっていたりすると、相手は「本当に楽しみにしているのだろうか」と不安になってしまう。反対に、言葉は少なくても、笑顔でうなずきながら話を聞くことで、相手に安心感を与えることができる。<br><br>もちろん、話す内容や言葉遣いも重要だが、自分の気持ちを相手に正しく伝えるためには、言葉と表情が一致していることが何よりも必要なのである。</div>', 
      question: 'ある調査によると、人が相手に与える印象について、何が最も重要だとされているか。', 
      options: [
        '話す内容や使う言葉の種類。', 
        '表情や態度などの非言語的な要素。', 
        '相手とどのくらい長い時間話すか。', 
        '話すときの声の大きさ。'
      ], 
      correct: 1, 
      explanation: 'Theo khảo sát, hơn một nửa ấn tượng để lại cho đối phương khi nói chuyện được quyết định bởi các yếu tố phi ngôn ngữ như diện mạo và cử chỉ => Đáp án 2.' 
    },
    { 
      id: 'd28', 
      passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (1) để trả lời câu hỏi.</div>', 
      question: '「楽しみにしています」という言葉の例から、筆者はどのようなことを言いたいのか。', 
      options: [
        '言葉が正しくても、表情や態度が一致していなければ、気持ちがうまく伝わらないということ。', 
        '相手に楽しみにしてもらうためには、何度も同じ言葉を繰り返す必要があるということ。', 
        '言葉と表情が違っていても、相手はあまり気にしないということ。', 
        'いつでも笑顔でいることは、会話においては不自然であるということ。'
      ], 
      correct: 0, 
      explanation: 'Ví dụ chỉ ra nếu nói "rất mong đợi" nhưng mặt không cười, thái độ chán nản thì đối phương sẽ lo lắng. Tức là lời nói đúng nhưng biểu cảm và thái độ không khớp thì tình cảm không truyền đạt tốt => Đáp án 1.' 
    },
    { 
      id: 'd29', 
      passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (1) để trả lời câu hỏi.</div>', 
      question: '筆者がコミュニケーションにおいて最も必要だと考えていることは何か。', 
      options: [
        'できるだけ言葉を少なくして、しぐさだけで伝えること。', 
        '相手の言葉遣いを真似して、親しみやすさを持たせること。', 
        '自分の気持ちを伝えるために、言葉と表情を一致させること。', 
        '相手の表情をよく見て、何を考えているかを推測すること。'
      ], 
      correct: 2, 
      explanation: 'Tác giả kết luận: Để truyền đạt đúng cảm xúc của mình cho đối phương, việc lời nói và biểu cảm nhất quán/khớp nhau là cần thiết hơn cả => Đáp án 3.' 
    },
    { 
      id: 'd30', 
      passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">日本の夏はとても暑い。現代では、冷たい飲み物を飲んだり、エアコンを使ったりして、簡単に涼しくなることができる。しかし、エアコンも冷蔵庫もなかった大昔の時代、人々はどのようにして暑い夏を乗り越えていたのだろうか。<br><br>大昔の日本では、冬の間に山に降った雪やできた氷を、特別な穴に保存しておき、夏に取り出して使っていたそうだ。当然、これらは非常に貴重なものであったため、天皇や高い地位の貴族しか使うことができなかった。夏に氷を口にすることは、まさに「特別なごちそう」だったのである。<br><br>その後、時代が進むにつれて、一般の人々も氷を手に入れることができるようになったが、それでも夏に氷を食べることは贅沢なことであった。そのため、人々はうちわを使ったり、風鈴の音を聞いたり、庭に水をまいたりして、五感を使って涼しさを感じる工夫をしていたのである。</div>', 
      question: '現代と大昔とでは、夏の暑さに対する対策についてどのような違いがあるか。', 
      options: [
        '現代はエアコンなどで簡単に涼しくなれるが、大昔は氷などの貴重なものを使うしかなかった。', 
        '現代は大昔よりも暑いので、冷たい飲み物を多く飲むようになった。', 
        '現代は大昔のように氷を保存する特別な穴を作ることができなくなった。', 
        '大昔は誰もが簡単に氷を手に入れることができたが、現代は貴重になっている。'
      ], 
      correct: 0, 
      explanation: 'Thời nay có thể dễ dàng làm mát bằng điều hòa, nước lạnh. Thời xưa phải tích trữ tuyết, đá mùa đông trong hố đặc biệt để dùng cho mùa hè => Đáp án 1.' 
    },
    { 
      id: 'd31', 
      passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (2) để trả lời câu hỏi.</div>', 
      question: '「特別なごちそう」とあるが、なぜそのように言われているのか。', 
      options: [
        '冬の間に作った氷を夏まで保存することが難しかったから。', 
        '天皇や身分の高い貴族など、一部の限られた人しか氷を口にすることができなかったから。', 
        '氷がとても美味しく、他の食べ物よりも栄養があったから。', 
        '夏に氷を食べると、すぐに病気が治ると信じられていたから。'
      ], 
      correct: 1, 
      explanation: 'Bởi vì đá lạnh thời đó cực kỳ quý hiếm, chỉ có Thiên hoàng và giới quý tộc cao quý mới được sử dụng => Đáp án 2.' 
    },
    { 
      id: 'd32', 
      passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn (2) để trả lời câu hỏi.</div>', 
      question: 'この文章の内容に合っているものはどれか。', 
      options: [
        '大昔の日本人は、冬の間に雪や氷を保存することを嫌がっていた。', 
        '涼しくなるように氷を食べることは、そのころ人々がよくやっていたことだった。', 
        '暑い夏に氷を食べて涼しさを感じることは、日常的にできることではなかった。', 
        '現代の日本人は、大昔の人々よりも涼しさを感じる工夫が得意である。'
      ], 
      correct: 2, 
      explanation: '"Bữa tiệc đặc biệt" ý chỉ việc ăn đá lạnh vào mùa hè ngày xưa là một điều hiếm hoi, không phải chuyện diễn ra hàng ngày dễ dàng như bây giờ.' 
    },

// 問題6
    { id: 'd33', instruction: '問題6 つぎの文章を読んで、質問に答えなさい。', passage: '<div class="bg-gray-50 border p-4 rounded text-gray-800 leading-relaxed mb-4">10年近く前、①印象的なテレビのコマーシャル(CM)があった。ある洗濯洗剤「X」のCMなのだ、洗ったシーツの香りを女性が楽しんでいるだけなのだ。洗濯洗剤を使う目的は汚れを落とすことなのに、そのCMでは、香りのことばかり言っていて、汚れをよく落とすことは全く言っていなかった。この洗濯洗剤を作っている会社は、どうしてこんな変なCMにしたのだろうかと思ったが、最近ある本を読んで、その理由がわかった。<br><br>その本には、次のようなことが書かれていた。この会社には昔から汚れをよく落とす洗濯洗剤「A」という人気商品があったが、会社の売り上げをもっと伸ばすために、新しいタイプの洗濯洗剤を作ることになった。そうして作られたのが「X」で、汚れを落とすだけでなく、香りも楽しめるのが特長だった。<br><br>ところが、最初、「X」は期待していたようには売れなかった。初めのころに作ったCMでは、消費者に「X」の特長がうまく伝わらなかったのだ。そこで、この会社はそれまでのCMを大きく変えて、「この商品を使えば、いい香りが楽しめて、とてもいい気分で洗濯ができる」というメッセージを強く伝えることにした。そうして新しく作られたのが、②私が見たCMだったのだ。<br><br>そのCMによって、「X」の特長が多くの消費者に伝わったようで、それ以降、「X」もよく売れるようになったそうだ。私がちょっと変だと感じたあのCMは、実は十分に宣伝効果があったのだ。</div>', question: '①印象的なテレビのコマーシャル(CM) とあるが、どのような点が印象的だったのか。', options: ['洗濯洗剤のCMに女性が登場している点。', '洗濯洗剤なのに、いい香りがついている点。', '洗濯洗剤が汚れをよく落とすことを強く言っている点。', '洗濯洗剤なのに、汚れを落とすことについて全く言っていない点。'], correct: 3, explanation: 'Ấn tượng ở chỗ: Là quảng cáo bột giặt nhưng lại không hề nhắc một lời nào đến việc làm sạch vết bẩn.' },
    { id: 'd34', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Bột giặt" để trả lời.</div>', question: '洗濯洗剤「X」を作った会社が伝えたかった、「X」の特長は何か。', options: ['シーツを洗うための洗濯洗剤であること。', '洗濯洗剤「A」 より値段がとても安いこと。', 'どんな洗濯洗剤よりも汚れをよく落とすこと。', '香りを楽しめる洗濯洗剤であること。'], correct: 3, explanation: 'Công ty muốn truyền tải thông điệp: "Nếu dùng sản phẩm này, bạn có thể tận hưởng mùi hương thơm ngát và giặt giũ với tâm trạng thật tốt".' },
    { id: 'd35', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Bột giặt" để trả lời.</div>', question: '洗濯洗剤「X」は、どのように売れたか。', options: ['初めはあまり売れなかったが、よく売れるようになった。', '初めはよく売れたが、あまり売れなくなった。', '初めからずっとよく売れていた。', '初めからずっとあまり売れなかった。'], correct: 0, explanation: 'Lúc đầu bán không chạy (期待していたようには売れなかった), nhưng sau khi đổi CM thì bán rất chạy (yoku ureru you ni natta).' },
    { id: 'd36', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại đoạn văn về "Bột giặt" để trả lời.</div>', question: '②私が見たCMについて、「私」は今、どのようなことを考えているか。', options: ['「私」には意味がわからなかったし、多くの消費者にも宣伝効果がなかったのだ。', '「私」は変なCMだと思っていたが、多くの消費者には宣伝効果があったのだ。', '「私」は効果的なCMだと思っていたし、多くの消費者にも宣伝効果があったのだ。', '「私」には印象的だったが、多くの消費者には宣伝効果がなかったのだ。'], correct: 1, explanation: 'Tuy tác giả thấy quảng cáo đó có vẻ kỳ quặc, nhưng thực chất nó lại mang hiệu quả tuyên truyền rất tốt tới người tiêu dùng.' },

    // 問題7
    { id: 'd37', instruction: '問題7 右のページの案内を読んで、つぎの質問に答えなさい。', passage: '<div class="border border-gray-400 p-4 rounded bg-white text-gray-800 text-sm mb-4"><h3 class="text-xl font-bold text-center text-blue-700 mb-4 border-b pb-2">さくらまつりの協力者募集</h3><p class="mb-2">日時: 4月4日(土) 午前10時~午後8時 / 4月5日(日) 午前10時~午後7時</p><table class="w-full border mt-2 mb-4 text-xs text-center"><tr><th class="border bg-gray-100 p-1">係の名前</th><th class="border bg-gray-100 p-1">時間</th></tr><tr><td class="border p-1" rowspan="3">1. 案内係</td><td class="border p-1">① 4/4(土) 午前9時~午後1時</td></tr><tr><td class="border p-1">② 4/4(土) 午後1時~午後6時</td></tr><tr><td class="border p-1">③ 4/4(土) 午後6時~午後9時</td></tr><tr><td class="border p-1" rowspan="3">2. 会場係</td><td class="border p-1">④ 4/5(日) 午前9時~午後1時</td></tr><tr><td class="border p-1">⑤ 4/5(日) 午後1時~午後6時</td></tr><tr><td class="border p-1">⑥ 4/5(日) 午後6時~午後8時</td></tr></table><ul class="list-disc ml-5 space-y-1"><li>応募資格: 市内に住んでいる16歳以上で、2回以上参加が可能な方。(③と⑥は20歳以上の方だけです)</li><li>応募しめ切り: 3月27日(金) 午後5時</li><li>申し込み方法: 別紙の応募用紙に必要なことを記入して、ファックスまたは郵送してください。</li></ul></div>', question: '太郎君は山中市に住む17歳の高校生で、さくらまつりの協力者になりたいと思っている。土曜日はいつも朝から夕方までクラブ活動がある。太郎君が応募できるのはどれか。', options: ['①と②', '②と③', '④と⑤', '⑤と⑥'], correct: 2, explanation: 'Tarou 17 tuổi, thứ 7 bận cả ngày -> Chỉ làm được Chủ Nhật (④, ⑤, ⑥). Tuy nhiên ca ⑥ yêu cầu người trên 20 tuổi. Vậy Tarou chỉ có thể chọn ca ④ và ⑤.' },
    { id: 'd38', passage: '<div class="bg-gray-100 p-3 rounded mb-4 italic text-sm">Xem lại tờ quảng cáo ở câu trước để trả lời.</div>', question: 'さくらまつりの協力者になるためには、どうすればよいか。', options: ['3月27日までになるべく早く市役所に郵便かファックスで申し込む。', '3月27日までの平日の午前9時から午後5時の間に電話で申し込む。', 'できるだけ早く山中市役所の市民課広田さんにEメールで申し込む。', '市役所ホームページの応募用紙を使ってインターネットで申し込む。'], correct: 0, explanation: 'Cách thức đăng ký: Điền phiếu và gửi qua Đường bưu điện (郵送) hoặc Fax trước 5h chiều ngày 27/3.' }
  ],
  choukai: [
    // Audio Player
    { id: 'c0', type: 'audio_player', link: '1TWo2QqyKfPi3zoQlvSAlx3W4WJ5zagi4' },

    // 問題1
    { 
      id: 'c1', 
      instruction: '問題1 では、まず質問を聞いてください。それから話を聞いて、問題用紙の1から4の中から、最もよいものを一つえらんでください。', 
      question: '1番. 女の人は、どうやってドアを開けますか。', 
      options: ['社員に開けてもらう', 'あんしょうばんごうをおす', '人さし指できかいにふれる', 'カードをきかいにいれる'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      会社で、男の人と女の人が話しています。女の人は、どうやってドアを開けますか。\n\n● 男：佐藤さん、今日からお仕事をお願いすることになりました。よろしくお願いします。\n● 女：よろしくお願いします。\n● 男：まず、部屋の入り方を説明します。部屋の出入り口には、安全のために鍵がかけてあり、関係者以外は入れないようになってます。\n● 女：はい。\n● 男：私たち社員は、暗証番号を押すか、人差し指で機械に触れてドアを開けるんですが、佐藤さんはアルバイトですので、こちらのカードをお使いください。このカードを機械に入れると、「ピピッ」と音が鳴ってドアが開きますので。\n● 女：はい。\n\n女の人は、どうやってドアを開けますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Nhân viên công ty thì mở cửa bằng vân tay hoặc mật khẩu. Tuy nhiên người nữ là người làm thêm (Arubaito) nên được yêu cầu dùng thẻ nhét vào máy. => Đáp án 4.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c2', 
      question: '2番. 女の子は何を買いますか。', 
      options: ['キャベツとぶた肉', 'キャベツとたまご', 'ノートと白菜', 'ノートとたまご'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      女の子とお父さんが、台所で話しています。女の子は何を買いますか。\n\n● 女：今日のお昼、焼きそば？やったー！\n● 男：うん。材料は全部あるかなっと。豚肉、そば、にんじん……あ、キャベツがない。\n● 女：買ってこようか？これからノートを買いに行くところだから。\n● 男：じゃあ、頼むかな。あ、ちょっと待って。ここに白菜があるから、キャベツは買わなくてもいいよ。\n● 女：あ、そうだ。買い物に行くんなら、ついでに卵を頼んでもいいかな？\n● 女：うん、わかった。\n\n女の子は何を買いますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      \n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Nhà còn cải thảo nên bé gái không cần mua bắp cải nữa. Tuy nhiên bố nhờ mua thêm trứng. Ngoài ra bé phải đi mua vở từ trước. => Mua vở và trứng (ノートとたまご). Đáp án 4.\n    \n  \n\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c3', 
      question: '3番. 男の学生は何を手伝いますか。', 
      options: ['本だなを運ぶ', '本だなをえらぶ', '本だなをくみたてる', '本だなにペンキをぬる'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      女の学生と男の学生が話しています。男の学生は何を手伝いますか。\n\n● 女：今度の日曜日、新しい本棚を買いに行こうと思ってて。ちょっと手伝ってほしいんだけど。\n● 男：うん、いいよ。\n● 女：悪いんだけど、本棚を車に乗せて、うちまで送ってもらえない？もう買うものは決まってるから、店であれこれ選ぶ必要はないんだけど。\n● 男：でも、本棚、車に乗る？\n● 女：自分で組み立てるタイプだから、乗ると思うんだ。\n● 男：それならいいよ。組み立てるのも手伝おうか？\n● 女：ありがとう、それは大丈夫。そんなに難しくないみたいだから。組み立てた後、ペンキを塗ったりして、自分だけの本棚を作りたいんだ。\n● 男：そっか。\n● 女：じゃ、日曜日よろしくね。\n\n男の学生は何を手伝いますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Bạn nữ nhờ bạn nam chở tủ sách về nhà. Việc chọn đồ, lắp ráp hay sơn màu bạn nữ đều tự làm được. => Đáp án 1: 本だなを運ぶ.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c4', 
      question: '4番. 健康診断を受ける人は、この後、まず何をしますか。', 
      images: ['13M5BZje6fMs-sZh6PRy_GOS0vRO_2kr_', '1ZPrLQeB5iqSYF3STtlED5O9HKHWyLdUb', '19m4zNTrwCPwpPCSMMK7MulMiVyoSHLgr', '1uNLlZuLABZQp8BTmUpB8cet32oKzn-4g'], 
      options: ['Ảnh 1', 'Ảnh 2', 'Ảnh 3', 'Ảnh 4'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      学校の健康診断で、看護師が話しています。健康診断を受ける人は、この後、まず何をしますか。\n\n● 看護師：このグループの人は集まりましたね。皆さん、健康調査のアンケートを書いて持ってきましたか。はい。では、身長と体重を測ります。その前に、靴下は脱いでおいてください。次に、血圧を測って、内科 of 診察に進みますが、そこで医師に健康調査のアンケートを出してください。アンケートはそれまで自分で持っていてください。\n\n健康診断を受ける人は、この後、まず何をしますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Trình tự y tá phổ biến: Cởi tất -> Đo chiều cao, cân nặng -> Đo huyết áp -> Nộp giấy khám và vào nội khoa. Việc phải làm đầu tiên là cởi tất. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c5', 
      question: '5番. 男の人はこの後、まず何をしますか。', 
      options: ['しりょうを作りなおす。', 'おきゃくさんの所に行く。', 'しゅっちょうのほうこくを出す', 'もりかちょうにれんらくする'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      会社で、女の部長と男の人が話しています。男の人はこの後、まず何をしますか。\n\n● 女：おはよう。今、忙しい？ちょっと手伝ってほしいことがあるんだけど。\n● 男：はい、部長。\n● 女：急で悪いけど、午後の会議のこの資料、3 ページ目の表をグラフに変えてくれない？資料は本田さんに作ってもらってたんだけど、今、お客さんから電話があって、本田さん、お客さんのところに行かなくちゃいけなくなったんだって。\n● 男：あの、部長。実は森課長に出張の報告を午前中に出すように言われているんですが……\n● 女：そう。じゃあ、森課長には私から事情を説明しておくから、こっちの方を先にいい？\n● 男：わかりました。\n● 女：ありがとう。\n\n男の人はこの後、まず何をしますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Trưởng phòng ưu tiên sửa gấp báo cáo đổi bảng thành biểu đồ. Việc báo cáo chuyến công tác trưởng phòng sẽ giải thích giúp. => Đáp án 1: しりょうを作りなおす.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c6', 
      question: '6番. 男の人は、大学の卒業証明の書類をもらうために、この後、何を送りますか。', 
      options: ['200円分の切手', '自分の住所を書いた、ふうとう', 'もうしこみの用紙', 'めんきょしょうのコピー'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      電話で、男の人と大学の係の人が話しています。男の人は、大学の卒業証明の書類をもらうために、この後、何を送りますか。\n\n● 係：はい、もしもし。桜大学学生課の林と申します。先日、卒業証明の書類のお申し込みを郵送でいただきましたが、その申し込み書類についてご連絡いたしました。\n● 男：はい。\n● 係：あの、実は足りないものがありまして。\n● 男：えっ？申し込み料の 200 円分の切手と、返信用の切手も送りましたけど。\n● 係：いいえ、料金は大丈夫です。最近、やり方が変わりまして、以前はこちらで返信用の封筒を用意してたんですが、現在はそちらでご自宅の住所を書いた封筒を、その他の書類と一緒に送っていただくことになっております。\n● 男：あ、そうですか。はい、わかりました。\n● 係：申し込みの用紙と免許証のコピーは確認できてますので、それだけもう一度送っていただけますか。\n● 男：はい、すぐ送ります。\n\n男の人は、大学の卒業証明の書類をもらうために、この後、何を送りますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nam đã gửi đủ đơn đăng ký và giấy phép lái xe, nhưng thiếu phong bì có ghi sẵn địa chỉ nhà theo quy định mới. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    // 問題2
    { 
      id: 'c7', 
      instruction: '問題2 では、まず質問を聞いてください。そのあと、問題用紙を見てください。読む時間があります。', 
      question: '1番. 子供の誕生日に、何をすることにしましたか。', 
      options: ['食事に行く。', '本をかいに行く。', 'どうぶつえんに行く', 'サッカーを見に行く'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      うちで、男の人と女の人が話しています。子供の誕生日に、何をすることにしましたか。\n\n● 男：来月、拓也の誕生日だね。\n● 女：今年で 7 歳になるね。誕生日どうする？去年は食事に行ったけど。\n● 男：うん、あの子、喜んでたね。今年は本が欲しいって言ってたよ。\n● 女：うーん。誕生日、ちょうど日曜日よ。みんなで一緒にどこか出かけましょうよ。あ、あの子、動物が好きでしょ？動物園がいいんじゃない？\n● 男：そうだね、そうしよう。あ、でも、サッカーの試合を見に行くっていうのは？サッカー、ずいぶん上手になってきたからね。\n● 女：私、サッカーよくわからないから……\n● 男：そうだね。家族で楽しめるのがいいね。\n\n子供の誕生日に、何をすることにしましたか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Chồng rủ đi xem đá bóng nhưng vợ không hiểu về luật. Chồng đồng ý rằng nơi cả nhà đều tận hưởng được (sở thú) thì tốt hơn. => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c8', 
      question: '2番. 男の人は、どうして遅れましたか。', 
      options: ['起きるのがおそかったから', '乗る電車をまちがえたから', 'ほんとうは映画が見たくなかったから', 'やくそくをわすれていたから'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      男の人と女の人が話しています。男の人は、どうして遅れましたか。\n\n● 男：遅くなって、ごめん。\n● 女：遅い！映画、もう始まったよ。また寝坊？\n● 男：違うよ。急行電車に乗ったら、次の駅まで行っちゃって。今日はせっかく早く起きたのに。\n● 女：もう……あんなに約束したのに、遅れないでって。本当は映画見たくなかったんでしょ？\n● 男：そんなことないよ。ごめん、本当にごめん。\n● 女：もう。約束忘れたかと思ったよ。\n\n男の人は、どうして遅れましたか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Lý do đi muộn không phải do ngủ quên, mà do lên nhầm tàu tốc hành nên bị đi quá bến. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c9', 
      question: '3番. 女の人が散歩を始めた理由は何ですか。', 
      options: ['町のことを知りたかったから', '好きな歌手に会いたかったから', 'しせいをよくしたかったから', 'きせつをかんじたかったから'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      道で、男の人と女の人が話しています。女の人が散歩を始めた理由は何ですか。\n\n● 男：お、本田さん。おはようございます。散歩ですか？\n● 女：ええ。鈴木さんもですか？\n● 男：はい。引っ越してきたときに、町のことを知りたくて始めました。本田さんは健康のためですか？\n● 女：あ、健康のためではないんですけど、ええと……好きな歌手がこの町に住んでるって噂を聞いて、会えるかもって期待して歩き始めたんです。\n● 男：ああ、そうですか。それで、会えました？\n● 女：いいえ、もう諦めました。でも、散歩をするようになってから、姿勢もよくなったし、花や木を近くで見られて季節を感じるようになりました。\n● 男：そうですか。確かに、このあたりは緑が多くて、一年中花や木がきれいですよね。\n\n女の人が散歩を始めた理由は何ですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Mục đích gốc rễ ban đầu của việc tản bộ là vì nghe đồn ca sĩ yêu thích sống ở đây nên hy vọng sẽ vô tình gặp được. Sức khỏe tốt lên là kết quả phụ. => Đáp án 2.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c10', 
      question: '4番. 女の人は、この町の変化について、どう思っていますか。', 
      options: ['おしゃれな店がふえて便利だ', 'わかい人がたくさん来るのでいやだ', '古い店がなくなってさびしい。', 'まちに元気が出てきてよい'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      女の人がインタビューに答えています。女の人は、この町の変化について、どう思っていますか。\n\n● 女：このあたり、私が子供の頃は小さな店しかなくて、人も少なかったんですよ。でも、5 年ほど前からおしゃれな店が増えてねえ。若い人がたくさん来るようになりました。その分、昔からの店はどんどんなくなってしまって、寂しがる年寄りもいますけど、私はいいと思うんですよ。町に元気が出てきましたしね。でも、私はおしゃれな店なんか全然使わないんですけどね。\n\n女の人は、この町の変化について、どう思っていますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người phụ nữ đánh giá tốt sự thay đổi của khu phố vì nó mang lại sự sôi động, nhộn nhịp (元気が出てきました) => Đáp án 4.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c11', 
      question: '5番. 女の人が、ペットに鳥を選んだ理由は何ですか。', 
      options: ['世話が楽だから', '色がきれいだから。', '手に乗るから', 'かわいい声でなくから'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      男の人と女の人が話しています。女の人が、ペットに鳥を選んだ理由は何ですか。\n\n● 男：伊藤さん、鳥を飼ってるんだってね。犬が好きだって聞いたことはあったけど。\n● 女：うん。私、出張が多いから、犬や猫は難しくって。二、三日留守にしても大丈夫なペットがよかったんだ。毎日散歩に連れて行くのも大変だしね。\n● 男：そう。鳥なら、餌と水を入れておけば大丈夫だよね。散歩もいらないし。\n● 女：そうなんだ。よく知ってるね。\n● 男：僕も鳥を飼いたくて。色がきれいだよね。その鳥は手に乗ったりするの？\n● 女：手に乗ったりはしないんだけど、最近はコミュニケーションが取れるような気がする。朝、かわいい声で挨拶みたいなのしてくれるようになったんだ。\n● 男：へえ、いいね。\n\n女の人が、ペットに鳥を選んだ理由は何ですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nữ hay đi công tác, không dắt đi dạo được nên chọn nuôi chim vì chỉ cần để sẵn đồ ăn, nước là ổn. => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c12', 
      question: '6番. 市長は、この大会について、一番知ってもらいたいことは何だと言っていますか。', 
      options: ['子どももさんかできて楽しめる', 'さんかする外国人がふえている', 'しみんがこうりゅうする機会になっている', 'かんこうによいえいきょうをあたえている'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ラジオで、市長がマラソン大会について話しています。市長は、この大会について、一番知ってもらいたいことは何だと言っていますか。\n\n● 市長：来月、南市ではマラソン大会が開かれます。この大会は、子供から大人まで参加でき、楽しく走ることができます。また、たくさんの外国の方も参加しています。外国の方は、観光で訪問し大会に出る方もいますが、この町に住み、生活している方がほとんどです。この大会は、言葉や文化の壁を越え、市民の皆さんが交流する機会にもなっていて、特にこの点を皆さんに伝えたいと思います。これからも南市の方、国内、海外の観光客など、多くの方に興味を持っていただきたいです。\n\n市長は、この大会について、一番知ってもらいたいことは何だと言っていますか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Thị trưởng nhấn mạnh điểm muốn mọi người biết nhất là giải chạy giúp người dân vượt qua rào cản văn hóa để giao lưu. => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    // 問題3
    { 
      id: 'c13', 
      instruction: '問題3 では、問題用紙に何もいんさつされていません。全体としてどんな内容かを聞く問題です。', 
      question: '1番', 
      options: ['とても感動した。', '全く感動しなかった。', '思っていたより感動した。', '思っていたほど感動しなかった。'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      男の人と女の人が、映画について話しています。\n\n● 男：田中さん、昨日見に行った映画はどうだった？\n● 女：一緒に行った友達は、感動して涙が止まらないって言ってたけど、私はそれほどじゃなかったんだ。\n● 男：僕の友達も、あの映画を見るならハンカチが必要だったって言ってたけど？\n● 女：たぶん、人の話をたくさん聞いて、期待が大きくなりすぎたんだと思う。\n● 男：そっか。そういうこともあるよね。\n● 女：何も聞かないで見に行きたかったな。\n\n女の人は、映画はどうだったと言っていますか。\n\n1. とても感動した。\n2. 全く感動しなかった。\n3. 思っていたより感動した。\n4. 思っていたほど感動しなかった。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Người nữ xem phim nhưng không thấy cảm động rơi nước mắt như bạn bè, vì nghe review quá nhiều nên kỳ vọng bị đẩy lên cao. => Đáp án 4: 思っていたほど感動しなかった.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c14', 
      question: '2番', 
      options: ['お正月の挨拶', '引っ越しの挨拶', '新しい家に行く約束', '歓迎会へのご誘い'], 
      correct: 3, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      留守番電話のメッセージを聞いています。\n\n● 女：もしもし、田中です。あけましておめでとうございます。そちらにお引っ越しされて、もう 1 ヶ月になりますね。新しいお宅はいかがですか。ところで、来月、山田さんが日本に帰ってくるんで、うちで歓迎会をするんですが、よろしければいらっしゃいませんか。また明日（あした）にでもお電話いたします。\n\n主な用事は何でしたか。\n\n1. お正月の挨拶\n2. 引っ越しの挨拶\n3. 新しい家に行く約束\n4. 歓迎会へのご誘い\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Mở đầu là chúc mừng năm mới, hỏi thăm nhà cửa nhưng nội dung chính là mời đến dự tiệc chào mừng anh Yamada về nước. => Đáp án 4: 歓迎会へのご誘い.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c15', 
      question: '3番', 
      options: ['チョコレートの歴史', 'チョコレートの原料', 'チョコレートの種類', 'チョコレートの人気'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ラジオでアナウンサーが話しています。\n\n● アナウンサー：チョコレートには、いろいろな種類がありますが、実はチョコレートは長い間、飲み物として愛されていました。原料の豆に砂糖で甘い味をつけた、食べるチョコレートが作られたのは 19 世紀で、日本では 1879 年頃だそうです。初めは、日本にない色や味だったため、人気が出るまでに時間がかかったそうです。\n\nアナウンサーは、チョコレートの何について話していますか。\n\n1. チョコレートの歴史\n2. チョコレートの原料\n3. チョコレートの種類\n4. チョコレートの人気\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Phát thanh viên kể về nguồn gốc sô cô la: từng là thức uống, đến thế kỷ 19 mới ăn được, vào Nhật từ 1879... Đó là lịch sử (歴史) của sô cô la. => Đáp án 1: チョコレートの歴史.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    // 問題4
    { 
      id: 'c16', 
      instruction: '問題4 では、絵を見ながら質問を聞いてください。矢印（→）の人は何と言いますか。', 
      question: '1番. お世話になっていた先生に久しぶりに会いました。何と言いますか。', 
      image: '1-omBwJhTyC6IDfENd4musZCKAQo53V1B', 
      options: ['ご苦労様です。', 'お待ち遠様です。', 'ご無沙汰しております。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      お世話になっていた先生に久しぶりに会いました。何と言いますか。\n\n1. ご苦労様です。\n2. お待ち遠様です。\n3. ご無沙汰しております。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Khi kết thúc chuyến đến chơi nhà người khác và ra về, câu chào tiêu chuẩn là ご無沙汰しております。 (Đã lâu không gặp thầy ạ) => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c17', 
      question: '2番. 友達のジャケットのボタンがありません。何と言いますか。', 
      image: '1TShSF9RRs24OFPoCNatNgAa08iCS1K9M', 
      options: ['あれ？ボタン、取れてるよ。', 'あれ？ボタン、落ちそうだよ。', 'あれ？ボタン、取らないと。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      友達のジャケットのボタンがありません。何と言いますか。\n\n1. あれ？ボタン、取れてるよ。\n2. あれ？ボタン、落ちそうだよ。\n3. あれ？ボタン、取らないと。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Thấy khuy áo của bạn đã rụng mất tiêu. Nêu lên trạng thái cúc áo đã tuột: あれ？ ボタン、取れてるよ。 => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c18', 
      question: '3番. ここで写真を撮ってはいけません。友達に注意します。何と言いますか。', 
      image: '1CGjH4qoHZZAEgxBfTo5kgaPten56f28P', 
      options: ['撮るなって書いてあるよ。', '撮りなさいって言ってるよ。', '撮らなきゃいけないんだって。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      ここで写真を撮ってはいけません。友達に注意します。何と言いますか。\n\n1. 撮るなって書いてあるよ。\n2. 撮りなさいって言ってるよ。\n3. 撮らなきゃいけないんだって。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Cảnh báo bạn không được chụp ảnh vì có biển báo. 撮るな (Cấm chụp) => Biển ghi là cấm chụp kìa (撮るな) => Đáp án 1.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c19', 
      question: '4番. 部長から、明日ゴルフに行こうと誘われました。一緒に行きます。部長に何と言いますか。', 
      image: '1d1Kiuz0md6rUqITweGG3qcK5_kwGO5Je', 
      options: ['ぜひ、いらっしゃってください。', 'また誘っていただけますか。', 'ご一緒させてください。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      部長から、明日ゴルフに行こうと誘われました。一緒に行きます。部長に何と言いますか。\n\n1. ぜひ、いらっしゃってください。\n2. また誘っていただけますか。\n3. ご一緒させてください。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Tình huống: Sếp rủ đi đánh golf và mình đồng ý đi. Câu nói lịch sự: Hãy cho phép tôi được đi cùng ạ (ご一緒させてください) => Đáp án 3.\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },

    // 問題5
    { 
      id: 'c20', 
      instruction: '問題5 では、短い言葉を聞いて、それに答えてください。', 
      question: '1番', 
      options: ['お願いします。', 'こちらこそ。', '大丈夫です。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      いろいろお世話になりました。\n\n1. お願いします。\n2. こちらこそ。\n3. 大張夫です。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Khi người khác cảm ơn vì đã giúp đỡ, đáp lại: Chính tôi mới là người phải nói câu đó (Cảm ơn anh) => Đáp án 2: こちらこそ。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c21', 
      question: '2番', 
      options: ['本当に忙しい出張だったよ。', 'じゃあ、お土産買ってきてね。', '遊びじゃなくて仕事だから。'], 
      correct: 2, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      今度、出張で海外に行くんだって？いいな。\n\n1. 本当に忙しい出張だったよ。\n2. じゃあ、お土産買ってきてね。\n3. 遊びじゃなくて仕事だから。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Bạn trầm trồ vì được đi công tác nước ngoài. Trả lời thực tế: Là đi làm chứ có phải đi chơi đâu => Đáp án 3: 遊びじゃなくて仕事だから。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c22', 
      question: '3番', 
      options: ['また手伝うから、いつでも言って。', '手伝ってくれてありがとう。', '何から始めればいい？'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      佐藤くんのおかげで、会議の準備、早めに終わったよ。\n\n1. また手伝うから、いつでも言って。\n2. 手伝ってくれてありがとう。\n3. 何から始めればいい？\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Được đồng nghiệp cảm ơn nhờ mình mà cbi xong sớm. Đáp lại nhiệt tình: Tớ sẽ giúp tiếp nên cứ ới tớ bất cứ lúc nào nhé => Đáp án 1: また手伝うから、いつでも言って。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c23', 
      question: '4番', 
      options: ['後で食べるっていうことですか。', 'じゃあ、温かいうちに。ありがとうございます。', '冷めちゃったんですか。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      鈴木さん、ピザが届きましたよ。冷めないうちに食べませんか。\n\n1. 後で食べるっていうことですか。\n2. じゃあ、温かいうちに。ありがとうございます。\n3. 冷めちゃったんですか。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Được mời ăn pizza lúc còn đang nóng. Đáp: Vâng, ăn lúc nóng thôi, cảm ơn chị nhé => Đáp án 2: じゃあ、温かいうちに。ありがとうございます。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c24', 
      question: '5番', 
      options: ['雨、止んでよかったです。', 'ずっと降りそうですね。', '傘はいらないでしょうね。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      すごい雨だね。止みそうにないね。\n\n1. 雨、止んでよかったです。\n2. ずっと降りそうですね。\n3. 傘はいらないでしょうね。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Nhận xét mưa to chắc không tạnh đâu (止みそうにないね). Đáp đồng tình: Chắc cứ rơi suốt thế này thôi => Đáp án 2: ずっと降りそうですね。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c25', 
      question: '6番', 
      options: ['野菜は食べなくてもいいってこと？', '肉だけじゃなくて、野菜も食べてるよ。', '肉だけ食べなくちゃいけないの？'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      肉ばかり食べてないで、少しは野菜も食べなさい。\n\n1. 野菜は食べなくてもいいってこと？\n2. 肉だけじゃなくて、野菜も食べてるよ。\n3. 肉だけ食べなくちゃいけないの？\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Mẹ phàn nàn toàn ăn thịt, ăn tí rau đi. Con thanh minh: Con cũng đang ăn cả rau chứ đâu chỉ ăn thịt => Đáp án 2: 肉だけじゃなくて、野菜も食べてるよ。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c26', 
      question: '7番', 
      options: ['あ、うっかりしてました。すぐやります。', 'ホチキスはしなくてもいいんですか。', 'コピーだけだったんですね。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      リーさん、リーさんにこの書類、コピーだけじゃなくてホチキスで留めるのも頼んだよね。\n\n1. あ、うっかりしてました。すぐやります。\n2. ホチキスはしなくてもいいんですか。\n3. コピーだけだったんですね。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Đồng nghiệp trách mình dập ghim tài liệu mà sao chưa dập. Nhận lỗi: A, tôi lơ đãng quên mất. Tôi dập ngay đây => Đáp án 1: あ、うっかりしてました。すぐやります。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c27', 
      question: '8番', 
      options: ['そうですね。募集する方向で行きましょう。', 'じゃあ、募集をやめるってことですか。', '消費者からは募集しないんですね。'], 
      correct: 0, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      新しい商品のアイデアは、消費者から募集した方がいいのではないでしょうか。\n\n1. そうですね。募集する方向で行きましょう。\n2. じゃあ、募集をやめるってことですか。\n3. 消費者からは募集しないんですね。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Gợi ý nên chiêu mộ ý tưởng từ người tiêu dùng. Đáp lại đồng ý: Đúng vậy. Cứ tiến hành theo hướng thu thập đó đi => Đáp án 1: そうですね。募集する方向で行きましょう。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    },
    { 
      id: 'c28', 
      question: '9番', 
      options: ['じゃあ、すぐ作ってきて。', 'そこにあるんで、持ってって。', '机の上に置いておいて。'], 
      correct: 1, 
      explanation: '<div class="space-y-4">\n  <div class="space-y-2">\n    <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">\n      <span>📄 Script (Nội dung nghe):</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed whitespace-pre-line pl-1 font-medium text-sm">\n      電話でおねがいした資料、取りに来たんですけど。\n\n1. じゃあ、すぐ作ってきて。\n2. そこにあるんで、持ってって。\n3. 机の上に置いておいて。\n    </div>\n  </div>\n  <div class="border-t border-white/10 pt-4 space-y-2">\n    <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">\n      <span>💡 Giải thích tiếng Việt:</span>\n    </div>\n    <div class="text-gray-300 leading-relaxed pl-1 font-medium text-sm">\n      <b>\n  \n    \n      💡 Giải thích tiếng Việt:\n    \n    \n      Đồng nghiệp đến lấy tài liệu đã nhờ in. Chỉ tay bảo: Đang ở đằng kia kìa, cậu lấy mang đi đi => Đáp án 2: そこにあるんで、持ってって。\n    \n  \n</b>\n    </div>\n  </div>\n</div>' 
    }
  ]
};
