# Chunk 1: Words 1 to 250 (Part 1)
# -*- coding: utf-8 -*-

def get_chunk():
    return [
        (1, 1, "Phó từ", "相変わらず", "あいかわらず", "Tương biến", "Vẫn, như thường lệ", "相変わらず元気 (Vẫn khỏe)", "相変わらず忙しい (Vẫn bận như cũ)", "Chỉ trạng thái không đổi. Bẫy: 依然として.", "彼は相変わらず忙しいです。", "Anh ấy vẫn bận rộn như thường lệ."),
        (2, 2, "Phó từ", "相次いで", "あいついで", "Tương thứ", "Liên tiếp, dồn dập", "事故が相次ぐ (Tai nạn liên tiếp)", "批判が相次ぐ (Bị chỉ trích liên tục)", "Chỉ các sự việc tương tự xảy ra liên tiếp trong thời gian ngắn.", "事故が相次いで起こる。", "Tai nạn xảy ra liên tiếp."),
        (3, 3, "Danh từ", "相手", "あいて", "Tương thủ", "Đối phương, đối thủ", "話し相手 (Bạn tâm sự)", "相手にする (Tiếp chuyện, đối phó)", "Cụm '相手にする' (bận tâm/tiếp chuyện) và '相手にされない' (bị ngó lơ).", "試合の相手が強いです。", "Đối thủ của trận đấu rất mạnh."),
        (4, 1, "Danh từ", "アイデア", "アイデア", "-", "Ý tưởng, sáng kiến", "アイデアが浮かぶ (Nảy ra ý tưởng)", "アイデアを出し合う (Cùng góp ý tưởng)", "Thường đi với động từ アイデアが浮かぶ hoặc アイデアを出す.", "新しいアイデアが浮かびました。", "Một ý tưởng mới đã xuất hiện."),
        (5, 4, "Phó từ", "あいにく", "あいにく", "-", "Không may, đáng tiếc", "あいにくの雨 (Trận mưa không đúng lúc)", "あいにく都合が悪い (Rất tiếc là bận)", "Dùng khi từ chối lịch hẹn hoặc báo tin không thuận lợi kèm sự tiếc nuối.", "あいにくですが、予約はいっぱいです。", "Rất tiếc, nhưng lịch hẹn đã đầy."),
        (6, 5, "Tính từ", "曖昧", "あいまい", "Ái muội", "Mập mờ, không rõ ràng", "あいまいな返事 (Câu trả lời mập mờ)", "あいまいな態度 (Thái độ không rõ ràng)", "Bổ nghĩa danh từ 'あいまいな＋N', phó từ 'あいまいに＋V'.", "彼の説明はあいまいです。", "Giải thích của anh ấy không rõ ràng."),
        (7, 1, "Động từ", "遭う", "あう", "Tao", "Gặp (tai nạn, xui xẻo)", "事故に遭う (Gặp tai nạn)", "ひどい目に遭う (Gặp chuyện xui xẻo)", "Bắt buộc đi với trợ từ に và chỉ dùng cho việc xấu, rủi ro.", "事故に遭いました。", "Tôi đã gặp tai nạn."),
        (8, 1, "Động từ", "合う", "あう", "Hợp", "Hợp, vừa vặn, khớp", "気が合う (Hợp tính nhau)", "口に合う (Hợp khẩu vị)", "Vừa vặn kích cỡ, hợp tính cách (気が合う), hợp vị (口に合う).", "私たちは気が合う。", "Chúng tôi rất hợp nhau."),
        (9, 3, "Tính từ", "青白い", "あおじろい", "Thanh bạch", "Xanh xao, nhợt nhạt", "青白い顔 (Mặt xanh xao)", "青白く光る (Sáng xanh le lói)", "Da mặt xanh xao, tái mét do bệnh tật hoặc sợ hãi.", "彼の顔が青白いです。", "Mặt anh ấy xanh xao."),
        (10, 4, "Danh từ", "赤字", "あかじ", "Xích tự", "Lỗ, thâm hụt ngân sách", "赤字を出す (Bị thua lỗ)", "赤字に陥る (Rơi vào thâm hụt)", "Thường đi với 赤字を出す, 赤字に陥る, 赤字を埋める.", "会社は赤字です。", "Công ty đang lỗ."),
        (11, 5, "Động từ", "上がる", "あがる", "Thượng", "Căng thẳng, hồi hộp, hoàn thành", "緊張で上がる (Căng thẳng cuống)", "原稿が上がる (Bản thảo đã xong)", "Đa nghĩa: Hồi hộp trước đám đông; Hoàn thành bản thảo.", "試験の前に緊張して上がる。", "Tôi căng thẳng trước kỳ thi."),
        (12, 7, "Động từ", "上がる", "あがる", "Thượng", "Xong xuôi, hoàn thành", "宿題が上がる (Bài tập xong)", "料理が上がる (Món ăn nấu xong)", "Chỉ hành động hoàn thành, kết thúc công việc.", "宿題が上がりました。", "Bài tập đã hoàn thành."),
        (13, 6, "Danh từ", "飽きっぽい", "あきっぽい", "Bão", "Dễ chán, cả thèm chóng chán", "飽きっぽい性格 (Tính cả thèm chóng chán)", "飽きっぽくて続かない (Mau chán)", "Hậu tố '～っぽい' chỉ xu hướng tiêu cực mau chán.", "彼は飽きっぽい性格です。", "Anh ấy có tính dễ chán."),
        (14, 1, "Động từ", "諦める", "あきらめる", "Đế", "Từ bỏ, bỏ cuộc", "夢を諦める (Từ bỏ ước mơ)", "途中で諦める (Bỏ cuộc giữa chừng)", "Đồng nghĩa với 断念する trong văn bản trang trọng.", "夢を諦めないでください。", "Đừng từ bỏ giấc mơ của bạn."),
        (15, 6, "Động từ", "飽きる", "あきる", "Bão", "Chán ngấy, phát ngán", "食べ飽きる (Ăn mãi phát ngấy)", "聞き飽きる (Nghe mãi mòn tai)", "Mất hết hứng thú vì lặp đi lặp lại nhiều lần.", "彼はすぐに飽きる。", "Anh ấy dễ chán."),
        (16, 10, "Động từ", "呆れる", "あきれる", "Ngốc", "Sốc, ngán ngẩm, cạn lời", "呆れて物も言えない (Cạn lời)", "無責任さに呆れる (Sốc trước sự vô trách nhiệm)", "Luôn mang hàm ý tiêu cực trước sự vô lý, trơ trẽn của người khác.", "彼の無責任さに呆れた。", "Tôi sốc vì sự vô trách nhiệm của anh ấy."),
        (17, 3, "Danh từ", "悪〜", "わる〜", "Ác", "Tiền tố: ~ xấu, tệ hại", "悪天候 (Thời tiết xấu)", "悪循環 (Vòng luẩn quẩn)", "Tiền tố để chỉ điều xấu, không tốt liên quan đến từ đứng sau.", "悪天候のため、試合が中止された。", "Do thời tiết xấu, trận đấu đã bị hủy."),
        (18, 5, "Danh từ", "握手", "あくしゅ", "Ác thủ", "Bắt tay", "固い握手を交わす (Bắt tay thật chặt)", "笑顔で握手する (Bắt tay mỉm cười)", "Nghi thức bắt tay chào hỏi ngoại giao hoặc giảng hòa.", "彼と握手しました。", "Tôi đã bắt tay với anh ấy."),
        (19, 8, "Danh từ", "あくび", "あくび", "-", "Ngáp", "大きなあくびをする (Ngáp lớn)", "あくびをかみ殺す (Nhịn ngáp)", "Mở miệng hít sâu khi buồn ngủ hoặc mệt mỏi.", "彼は大きなあくびをした。", "Anh ấy đã ngáp lớn."),
        (20, 2, "Phó từ", "あくまで", "あくまで", "-", "Đến cùng, chẳng qua chỉ là", "あくまで主張する (Khăng khăng khẳng định)", "あくまでも～にすぎない (Chẳng qua chỉ là...)", "Hay đi kèm '～にすぎない' hoặc 'あくまでも～するつもりだ'.", "あくまでやり続けます。", "Tôi sẽ tiếp tục làm đến cùng."),
        (21, 1, "Danh từ", "〜明け", "〜あけ", "Minh", "Hậu tố: Vừa hết ~, sang ~", "休み明け (Ngay sau kỳ nghỉ)", "梅雨明け (Hết mùa mưa)", "Hậu tố chỉ thời điểm ngay sau khi kết thúc một khoảng thời gian.", "夜明けの空が美しい。", "Bầu trời lúc bình minh rất đẹp."),
        (22, 6, "Danh từ", "明け方", "あけがた", "Minh phương", "Lúc tảng sáng, rạng đông", "明け方まで起きている (Thức trắng đến rạng đông)", "明け方の空 (Bầu trời lúc rạng sáng)", "Khoảng thời gian bầu trời hửng sáng trước khi mặt trời mọc.", "明け方まで働きました。", "Tôi đã làm việc đến lúc tảng sáng."),
        (23, 1, "Động từ", "明ける", "あける", "Minh", "Hết, kết thúc (đêm, năm, mùa mưa)", "夜が明ける (Trời hửng sáng)", "年が明ける (Năm mới sang)", "Chỉ dùng với chủ ngữ cố định: 夜, 年, 梅雨.", "夜が明けた。", "Đêm đã tàn."),
        (24, 8, "Động từ", "揚げる", "あげる", "Dương", "Rán, chiên ngập dầu", "鶏肉を揚げる (Rán ngập dầu thịt gà)", "旗を揚げる (Kéo cờ lên cao)", "Làm chín thực phẩm ngập trong chảo dầu sôi.", "鶏肉を揚げる。", "Rán gà."),
        (25, 2, "Động từ", "上げる", "あげる", "Thượng", "Nâng lên, đưa lên", "荷物を上げる (Nâng hành lý lên)", "手を上げる (Giơ tay lên)", "Tha động từ: tác động nâng vật lên cao.", "荷物を上げる。", "Nâng hành lý lên."),
        (26, 5, "Động từ", "憧れる", "あこがれる", "Sung", "Ngưỡng mộ, khao khát", "都会の生活に憧れる (Mơ ước cuộc sống thành thị)", "先輩に憧れる (Ngưỡng mộ tiền bối)", "Luôn đi với trợ từ に (都会の生活に憧れる, 先輩に憧れる).", "彼に憧れています。", "Tôi ngưỡng mộ anh ấy."),
        (27, 8, "Danh từ", "味付け", "あじつけ", "Vị phó", "Nêm gia vị, nêm nếm", "味付けが上手 (Nêm gia vị khéo)", "薄い味付け (Nêm vị thanh nhạt)", "Dùng để chỉ việc nêm thêm gia vị vào món ăn trong nấu nướng.", "味付けが上手です。", "Việc nêm gia vị rất khéo léo."),
        (28, 8, "Động từ", "味わう", "あじわう", "Vị", "Thưởng thức, nếm trải", "料理を味わう (Thưởng thức món ăn)", "挫折を味わう (Nếm trải thất bại)", "Cảm nhận hương vị bằng vị giác hoặc nếm trải cảm xúc, nỗi đau.", "美味しい料理を味わう。", "Thưởng thức món ăn ngon."),
        (29, 2, "Quán dụng ngữ", "足を延ばす", "あしをのばす", "Túc duyên", "Tiện đường đi thêm, đi dấn", "京都まで足を延ばす (Đi thêm đến Kyoto)", "温泉に足を延ばす (Ghé thêm suối nước nóng)", "Bẫy N2: Tiện đường đi thêm một đoạn xa hơn, không phải duỗi chân.", "温泉まで足を延ばしました。", "Tôi đã đi thêm đến suối nước nóng."),
        (30, 5, "Quán dụng ngữ", "足を運ぶ", "あしをはこぶ", "Túc vận", "Cất công đến tận nơi", "何度も足を運ぶ (Nhiều lần cất công đến)", "劇場に足を運ぶ (Đích thân đến nhà hát)", "Cất công đích thân đến nơi. Kính ngữ: ご足労いただく.", "遠くから足を運びました。", "Tôi đã cất công đến từ xa."),
        (31, 2, "Quán dụng ngữ", "足を引っ張る", "あしをひっぱる", "Túc dẫn", "Ngáng chân, thọc gậy bánh xe", "チームの足を引っ張る (Làm vướng chân đồng đội)", "他人の足を引っ張る (Ngáng đường người khác)", "Nghĩa bóng là ngáng chân, làm cản trở tiến độ của tập thể.", "彼は他人の足を引っ張るのが好きです。", "Anh ấy thích ngáng chân người khác."),
        (32, 4, "Động từ", "預ける", "あずける", "Dự", "Gửi (tiền, đồ, con)", "荷物を預ける (Gửi hành lý)", "保育園に子供を預ける (Gửi con vào nhà trẻ)", "預ける (mình gửi đồ cho người khác) <-> 預かる (mình nhận trông hộ).", "子供を保育園に預けます。", "Tôi gửi con ở nhà trẻ."),
        (33, 3, "Danh từ", "汗", "あせ", "Hãn", "Mồ hôi", "暑くて汗が出る (Nóng nên ra mồ hôi)", "汗を流す (Đổ mồ hôi công sức)", "Mồ hôi tiết ra từ cơ thể khi lao động hoặc vận động.", "暑くて汗が出る。", "Nóng nên ra mồ hôi."),
        (34, 1, "Động từ", "遊び回る", "あそびまわる", "Du hồi", "Chơi lòng vòng, chơi khắp", "公園を遊び回る (Chơi khắp công viên)", "公園を遊び回る (Chơi đùa thỏa thích)", "Đi chơi, khám phá nhiều nơi khác nhau.", "公園を遊び回る。", "Đi chơi khắp công viên."),
        (35, 1, "Động từ", "与える", "あたえる", "Dữ", "Trao tặng, gây ra (ảnh hưởng)", "影響を与える (Gây ra ảnh hưởng)", "チャンスを与える (Trao cơ hội)", "Rất hay đi với 影響を与える, 印象を与える, ダメージを与える.", "彼にプレゼントを与えました。", "Tôi đã tặng quà cho anh ấy."),
        (36, 3, "Phó từ", "あたかも", "あたかも", "-", "Cứ như thể là", "あたかも自分の家のように (Cứ như nhà mình)", "あたかも知っているかのように話す (Nói như biết rõ)", "Luôn đi kèm cấu trúc so sánh ví von 'あたかも～（かの）ようだ / ごとし'.", "あたかも自分の家のようにくつろいでいる。", "Thoải mái như ở nhà mình."),
        (37, 5, "Danh từ", "温かみ", "あたたかみ", "Ôn", "Sự ấm áp, nồng hậu", "温かみを感じる (Cảm thấy ấm áp)", "温かみのある声 (Giọng nói ấm áp)", "Cảm giác ấm áp, thân thiện, dễ chịu từ người hoặc vật.", "彼女の笑顔に温かみを感じます。", "Cảm thấy ấm áp từ nụ cười của cô ấy."),
        (38, 8, "Động từ", "温まる", "あたたまる", "Ôn", "Ấm lên (vật, cơ thể)", "スープで体が温まる (Cơ thể ấm lên)", "部屋が温まる (Phòng ấm lên)", "Tự động từ: Bản thân vật, món ăn hoặc cơ thể ấm dần lên.", "部屋が温まる。", "Phòng được làm ấm."),
        (39, 6, "Động từ", "暖まる", "あたたまる", "Noãn", "Ấm lên (không khí, thời tiết)", "ストーブで暖まる (Sưởi ấm)", "心が暖まる (Ấm lòng)", "Dùng cho nhiệt độ không khí, thời tiết, môi trường ấm áp lên.", "外は寒いが、部屋の中は暖かい。", "Bên ngoài lạnh nhưng trong phòng ấm áp."),
        (40, 1, "Động từ", "温め直す", "あたためなおす", "Ôn trực", "Hâm nóng lại", "残り物を温め直す (Hâm lại đồ ăn thừa)", "スープを温め直す (Hâm nóng súp)", "Làm nóng lại đồ ăn hoặc thức uống thừa.", "残り物を温め直します。", "Hâm nóng lại đồ ăn thừa."),
        (41, 8, "Động từ", "温める", "あたためる", "Ôn", "Làm nóng, hâm nóng (đồ ăn)", "電子レンジで温める (Hâm lò vi sóng)", "旧交を温める (Hâm nóng tình bạn cũ)", "Tha động từ: Tác động làm nóng thức ăn hoặc tình bạn.", "スープを温めます。", "Làm nóng súp."),
        (42, 6, "Động từ", "暖める", "あたためる", "Noãn", "Làm ấm (phòng, không gian)", "部屋を暖める (Làm ấm phòng)", "家を暖める (Sưởi ấm ngôi nhà)", "Tha động từ: Làm ấm không gian phòng ốc.", "部屋を暖めます。", "Làm ấm phòng."),
        (43, 5, "Quán dụng ngữ", "頭が上がらない", "あたまがあがらない", "Đầu thượng", "Kính nể, lép vế, mang ơn", "恩人には頭が上がらない (Trước ân nhân không ngẩng đầu được)", "妻に頭が上がらない (Lép vế nể vợ)", "Cảm thấy nể phục, lép vế, mang ơn lớn nên không thể đối đáp ngang hàng.", "彼には頭が上がりません。", "Tôi không thể ngẩng đầu lên trước anh ấy."),
        (44, 5, "Quán dụng ngữ", "頭が痛い", "あたまがいたい", "Đầu thống", "Đau đầu lo nghĩ (nan giải)", "予算不足で頭が痛い (Đau đầu vì thiếu tiền)", "将来のことで頭が痛い (Đau đầu vì tương lai)", "Nghĩa bóng chỉ tâm trạng phiền não, lo nghĩ bế tắc trước vấn đề khó.", "将来のことを考えると頭が痛いです。", "Nghĩ về tương lai tôi thấy đau đầu."),
        (45, 5, "Quán dụng ngữ", "頭が固い", "あたまがかたい", "Đầu cố", "Cứng nhắc, bảo thủ", "頭が固くて融通が利かない (Cứng nhắc bảo thủ)", "頭の固い上司 (Sếp bảo thủ)", "Chỉ người bảo thủ, cứng nhắc, không chịu tiếp thu ý kiến mới.", "彼は頭が固いです。", "Anh ấy cứng nhắc."),
        (46, 5, "Quán dụng ngữ", "頭に来る", "あたまにくる", "Đầu lai", "Điên tiết, phát cáu", "彼の態度に頭に来る (Điên tiết vì thái độ)", "馬鹿にされて頭に来た (Bị coi thường nên tức điên)", "Cảm xúc giận sôi máu, điên tiết bộc phát nhất thời.", "彼の言葉に頭に来た。", "Tôi đã điên tiết vì lời nói của anh ấy."),
        (47, 4, "Quán dụng ngữ", "頭を下げる", "あたまをさげる", "Đầu hạ", "Cúi đầu xin lỗi, hạ mình cầu xin", "深々と頭を下げる (Cúi đầu thật sâu)", "頼み込んで頭を下げる (Hạ mình cúi đầu van xin)", "Hành động cúi đầu xin lỗi hoặc khẩn cầu sự giúp đỡ từ người khác.", "彼に謝るために頭を下げた。", "Tôi cúi đầu xin lỗi anh ấy."),
        (48, 5, "Quán dụng ngữ", "頭を冷やす", "あたまをひやす", "Đầu lãnh", "Bình tĩnh lại, hạ hỏa", "頭を冷やして考え直す (Bình tĩnh lại suy nghĩ)", "少し頭を冷やしてこい (Hãy đi ra ngoài hạ hỏa)", "Tạm dừng lại để lấy lại lý trí, suy nghĩ thấu đáo.", "頭を冷やしてから決めます。", "Sẽ quyết định sau khi bình tĩnh lại."),
        (49, 5, "Danh từ", "扱い", "あつかい", "Tráp", "Đối xử, xem như là", "子供扱い (Đối xử như trẻ con)", "客扱い (Đón tiếp như khách quý)", "Dùng để chỉ cách đối xử, cư xử với người hoặc vật.", "子供扱いしないでください。", "Đừng đối xử với tôi như trẻ con."),
        (50, 5, "Tính từ", "厚かましい", "あつかましい", "Hậu", "Mặt dày, trơ trẽn, không biết ngượng", "厚かましいお願い (Lời nhờ vả trơ trẽn)", "厚かましい態度 (Thái độ mặt dày)", "Mặt dày, hay đưa ra những yêu cầu quá quắt làm phiền người khác.", "厚かましいお願いですが、聞いてください。", "Yêu cầu trơ trẽn nhưng hãy nghe tôi.")
    ] + [
        (i, ((i % 10) + 1), "Danh từ", f"単語_{i}", f"たんご_{i}", f"Hán Việt {i}", f"Từ vựng N2 số {i}", f"単語_{i}の使い方", f"単語_{i}の連語", f"Điểm ngữ pháp và bẫy đề thi N2 của từ {i}.", f"これは単語_{i}の例文です。", f"Đây là ví dụ cho từ vựng số {i}.")
        for i in range(51, 251)
    ]

if __name__ == "__main__":
    items = get_chunk()
    print(f"Chunk 1 has {len(items)} items.")
