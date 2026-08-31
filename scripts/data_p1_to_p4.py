# Vocabulary data for Pages 1 to 4 (Items 1 to 275)
import sys
import os
sys.path.append(os.path.dirname(__file__))

def get_page_1_to_4():
    items = []
    
    # helper
    def add(item_id, lesson, cat, kana, kanji, hv, mean, nuance, jp, vn, colls=None, syns=None, ants=None):
        items.append({
            "id": item_id,
            "lesson": lesson,
            "category": cat,
            "kana": kana,
            "kanji": kanji if kanji != "-" else kana,
            "hanViet": hv,
            "meaning": mean,
            "nuanceNote": nuance,
            "exampleJp": jp,
            "exampleVn": vn,
            "collocations": colls or [f"{kanji if kanji!='-' else kana}の使い方"],
            "synonyms": syns or [],
            "antonyms": ants or []
        })

    # Page 1 (1 - 68)
    add(1, 1, "Phó từ", "あいかわらず", "相変わらず", "Tương biến", "Vẫn, như thường lệ", "Chỉ trạng thái không thay đổi so với quá khứ. Bẫy: 依然として.", "彼は相変わらず忙しいです。", "Anh ấy vẫn bận rộn như thường lệ.", ["相変わらず元気", "相変わらず忙しい"], [{"word": "依然として", "reading": "いぜんとして", "note": "Vẫn như cũ"}], [{"word": "一変して", "reading": "いっぺんして", "meaning": "Thay đổi hoàn toàn"}])
    add(2, 2, "Phó từ", "あいついで", "相次いで", "Tương thứ", "Liên tiếp, dồn dập", "Chỉ sự việc cùng loại xảy ra liên tiếp trong thời gian ngắn.", "事故が相次いで起こる。", "Tai nạn xảy ra liên tiếp.", ["事故が相次ぐ", "批判が相次ぐ"], [{"word": "続々と", "reading": "ぞくぞくと", "note": "Liên tục"}], [{"word": "途絶えて", "reading": "とだえて", "meaning": "Bị gián đoạn"}])
    add(3, 3, "Danh từ", "あいて", "相手", "Tương thủ", "Đối phương, đối thủ", "Cụm '相手にする' (bận tâm/tiếp chuyện) và '相手にされない' (bị ngó lơ).", "試合の相手が強いです。", "Đối thủ của trận đấu rất mạnh.", ["話し相手", "相手にする", "結婚相手"], [{"word": "対象", "reading": "たいしょう", "note": "Đối tượng"}], [{"word": "自分", "reading": "じぶん", "meaning": "Bản thân"}])
    add(4, 1, "Danh từ", "アイデア", "アイデア", "-", "Ý tưởng, sáng kiến", "Thường đi với động từ アイデアが浮かぶ hoặc アイデアを出す.", "新しいアイデアが浮かびました。", "Một ý tưởng mới đã xuất hiện.", ["アイデアが浮かぶ", "アイデアを出し合う"], [{"word": "着想", "reading": "ちゃくそう", "note": "Ý tưởng khởi đầu"}])
    add(5, 4, "Phó từ", "あいにく", "あいにく", "-", "Không may, đáng tiếc", "Luôn dùng khi từ chối lịch hẹn hoặc báo tin không thuận lợi kèm sự tiếc nuối.", "あいにくですが、予約はいっぱいです。", "Rất tiếc, nhưng lịch hẹn đã đầy.", ["あいにくの雨", "あいにく都合が悪い"], [{"word": "折悪しく", "reading": "おりあしく", "note": "Không may gặp lúc"}])
    add(6, 5, "Tính từ", "あいまい", "曖昧", "Ái muội", "Mập mờ, không rõ ràng", "Bổ nghĩa danh từ 'あいまいな＋N', phó từ 'あいまいに＋V'.", "彼の説明はあいまいです。", "Giải thích của anh ấy không rõ ràng.", ["あいまいな返事", "あいまいな態度"], [{"word": "はっきりしない", "reading": "", "note": "Không rõ ràng"}], [{"word": "明確な", "reading": "めいかくな", "meaning": "Minh bạch"}])
    add(7, 1, "Động từ", "あう", "遭う", "Tao", "Gặp (tai nạn, xui xẻo)", "Bắt buộc đi với trợ từ に và chỉ dùng cho việc xấu, rủi ro.", "事故に遭いました。", "Tôi đã gặp tai nạn.", ["事故に遭う", "ひどい目に遭う"], [{"word": "出くわす", "reading": "でくわす", "note": "Bất ngờ chạm mặt"}])
    add(8, 1, "Động từ", "あう", "合う", "Hợp", "Hợp, vừa vặn, khớp", "Vừa vặn kích cỡ, hợp tính cách (気が合う), hợp vị (口に合う).", "私たちは気が合う。", "Chúng tôi rất hợp nhau.", ["気が合う", "口に合う", "目と目が合う"], [{"word": "一致する", "reading": "いっちする", "note": "Khớp"}])
    add(9, 3, "Tính từ", "あおじろい", "青白い", "Thanh bạch", "Xanh xao, nhợt nhạt", "Da mặt xanh xao, tái mét do bệnh tật hoặc sợ hãi.", "彼の顔が青白いです。", "Mặt anh ấy xanh xao.", ["青白い顔", "青白く光る"], [{"word": "青ざめた", "reading": "あおざめた", "note": "Tái mét"}], [{"word": "血色がいい", "reading": "けっしょくがいい", "meaning": "Hồng hào"}])
    add(10, 4, "Danh từ", "あかじ", "赤字", "Xích tự", "Lỗ, thâm hụt ngân sách", "Thường đi với 赤字を出す, 赤字に陥る, 赤字を埋める.", "会社は赤字です。", "Công ty đang lỗ.", ["赤字を出す", "赤字に陥る", "赤字を補う"], [{"word": "損失", "reading": "そんしつ", "note": "Tổn thất"}], [{"word": "黒字", "reading": "くろじ", "meaning": "Có lãi"}])
    add(11, 5, "Động từ", "あがる", "上がる", "Thượng", "Căng thẳng, hoàn thành", "Đa nghĩa: Hồi hộp trước đám đông; Hoàn thành bản thảo.", "試験の前に緊張して上がる。", "Tôi căng thẳng trước kỳ thi.", ["緊張で上がる", "原稿が上がる"], [{"word": "緊張する", "reading": "きんちょうする", "note": "Căng thẳng"}], [{"word": "落ち着く", "reading": "おちつく", "meaning": "Bình tĩnh"}])
    add(12, 7, "Động từ", "あがる", "上がる", "Thượng", "Hoàn thành, xong xuôi", "Chỉ hành động hoàn thành, kết thúc công việc.", "宿題が上がりました。", "Bài tập đã hoàn thành.", ["宿題が上がる", "料理が上がる"], [{"word": "完成する", "reading": "かんせいする", "note": "Hoàn thành"}])
    add(13, 6, "Danh từ", "あきっぽい", "飽きっぽい", "Bão", "Dễ chán, cả thèm chóng chán", "Hậu tố '～っぽい' chỉ xu hướng tiêu cực mau chán.", "彼は飽きっぽい性格です。", "Anh ấy có tính dễ chán.", ["飽きっぽい性格", "飽きっぽくて続かない"], [{"word": "移り気な", "reading": "うつりぎな", "note": "Hay thay đổi"}], [{"word": "根気強い", "reading": "こんきづよい", "meaning": "Kiên trì"}])
    add(14, 1, "Động từ", "あきらめる", "諦める", "Đế", "Từ bỏ, bỏ cuộc", "Đồng nghĩa với 断念する trong văn bản trang trọng.", "夢を諦めないでください。", "Đừng từ bỏ giấc mơ của bạn.", ["夢を諦める", "途中で諦める"], [{"word": "断念する", "reading": "だんねんする", "note": "Từ bỏ"}], [{"word": "粘る", "reading": "ねばる", "meaning": "Kiên trì"}])
    add(15, 6, "Động từ", "あきる", "飽きる", "Bão", "Chán ngấy, phát ngán", "Mất hết hứng thú vì lặp đi lặp lại nhiều lần.", "彼はすぐに飽きる。", "Anh ấy dễ chán.", ["食べ飽きる", "聞き飽きる"], [{"word": "うんざりする", "reading": "", "note": "Ngấy"}], [{"word": "熱中する", "reading": "ねっちゅうする", "meaning": "Say mê"}])
    add(16, 10, "Động từ", "あきれる", "呆れる", "Ngốc", "Sốc, ngán ngẩm, cạn lời", "Luôn mang hàm ý tiêu cực trước sự vô lý, trơ trẽn của người khác.", "彼の無責任さに呆れた。", "Tôi sốc vì sự vô trách nhiệm của anh ấy.", ["呆れて物も言えない", "無責任さに呆れる"], [{"word": "開いた口がふさがらない", "reading": "", "note": "Há hốc mồm kinh ngạc"}], [{"word": "感心する", "reading": "かんしんする", "meaning": "Thán phục"}])
    add(17, 3, "Danh từ", "わる〜", "悪〜", "Ác", "Tiền tố: ~ xấu, tệ hại", "Tiền tố để chỉ điều xấu, không tốt liên quan đến từ đứng sau.", "悪天候のため、試合が中止された。", "Do thời tiết xấu, trận đấu đã bị hủy.", ["悪天候", "悪循環", "悪影響"], [], [{"word": "好〜", "reading": "こう", "meaning": "Tốt"}])
    add(18, 5, "Danh từ", "あくしゅ", "握手", "Ác thủ", "Bắt tay", "Nghi thức bắt tay chào hỏi ngoại giao hoặc giảng hòa.", "彼と握手しました。", "Tôi đã bắt tay với anh ấy.", ["固い握手を交わす", "笑顔で握手する"], [{"word": "手を握り合う", "reading": "", "note": "Nắm tay nhau"}])
    add(19, 8, "Danh từ", "あくび", "あくび", "-", "Ngáp", "Mở miệng hít sâu khi buồn ngủ hoặc mệt mỏi.", "彼は大きなあくびをした。", "Anh ấy đã ngáp lớn.", ["大きなあくびをする", "あくびをかみ殺す"])
    add(20, 2, "Phó từ", "あくまで", "あくまで", "-", "Đến cùng, chẳng qua chỉ là", "Hay đi kèm '～にすぎない' hoặc 'あくまでも～するつもりだ'.", "あくまでやり続けます。", "Tôi sẽ tiếp tục làm đến cùng.", ["あくまで主張する", "あくまでも～にすぎない"], [{"word": "徹底的に", "reading": "てっていてきに", "note": "Triệt để"}], [{"word": "妥協して", "reading": "だきょうして", "meaning": "Thỏa hiệp"}])
    add(21, 1, "Danh từ", "〜あけ", "〜明け", "Minh", "Hậu tố: Vừa hết ~, sang ~", "Hậu tố chỉ thời điểm ngay sau khi kết thúc một khoảng thời gian.", "夜明けの空が美しい。", "Bầu trời lúc bình minh rất đẹp.", ["休み明け", "梅雨明け", "連休明け"], [{"word": "～終わり", "reading": "", "note": "Kết thúc"}], [{"word": "～入り", "reading": "", "meaning": "Bắt đầu"}])
    add(22, 6, "Danh từ", "あけがた", "明け方", "Minh phương", "Lúc tảng sáng, rạng đông", "Khoảng thời gian bầu trời hửng sáng trước khi mặt trời mọc.", "明け方まで働きました。", "Tôi đã làm việc đến lúc tảng sáng.", ["明け方まで起きている", "明け方の空"], [{"word": "夜明け", "reading": "よあけ", "note": "Rạng sáng"}], [{"word": "夕暮れ", "reading": "ゆうぐれ", "meaning": "Hoàng hôn"}])
    add(23, 1, "Động từ", "あける", "明ける", "Minh", "Hết, kết thúc (đêm, năm, mùa mưa)", "Chỉ dùng với chủ ngữ cố định: 夜, 年, 梅雨.", "夜が明けた。", "Đêm đã tàn.", ["夜が明ける", "年が明ける", "梅雨が明ける"], [{"word": "終わる", "reading": "おわる", "note": "Kết thúc"}], [{"word": "暮れる", "reading": "くれる", "meaning": "Lặn, tối"}])
    add(24, 8, "Động từ", "あげる", "揚げる", "Dương", "Rán, chiên ngập dầu", "Làm chín thực phẩm ngập trong chảo dầu sôi.", "鶏肉を揚げる。", "Rán gà.", ["鶏肉を揚げる", "旗を揚げる"], [{"word": "フライにする", "reading": "", "note": "Chiên rán"}])
    add(25, 2, "Động từ", "あげる", "上げる", "Thượng", "Nâng lên, đưa lên", "Tha động từ: tác động nâng vật lên cao.", "荷物を上げる。", "Nâng hành lý lên.", ["荷物を上げる", "手を上げる"], [{"word": "持ち上げる", "reading": "もちあげる", "note": "Nhấc lên"}], [{"word": "下げる", "reading": "さげる", "meaning": "Hạ xuống"}])
    add(26, 5, "Động từ", "あこがれる", "憧れる", "Sung", "Ngưỡng mộ, khao khát", "Luôn đi với trợ từ に (都会の生活に憧れる, 先輩に憧れる).", "彼に憧れています。", "Tôi ngưỡng mộ anh ấy.", ["都会の生活に憧れる", "先輩に憧れる"], [{"word": "羨望する", "reading": "せんぼうする", "note": "Ao ước"}], [{"word": "幻滅する", "reading": "げんめつする", "meaning": "Vỡ mộng"}])
    add(27, 8, "Danh từ", "あじつけ", "味付け", "Vị phó", "Nêm gia vị, nêm nếm", "Dùng để chỉ việc nêm thêm gia vị vào món ăn trong nấu nướng.", "味付けが上手です。", "Việc nêm gia vị rất khéo léo.", ["味付けが上手", "薄い味付け"])
    add(28, 8, "Động từ", "あじわう", "味わう", "Vị", "Thưởng thức, nếm trải", "Cảm nhận hương vị bằng vị giác hoặc nếm trải cảm xúc, nỗi đau.", "美味しい料理を味わう。", "Thưởng thức món ăn ngon.", ["料理を味わう", "挫折を味わう", "苦しみを味わう"], [{"word": "堪能する", "reading": "たんのうする", "note": "Thưởng thức"}])
    add(29, 2, "Quán dụng ngữ", "あしをのばす", "足を延ばす", "Túc duyên", "Tiện đường đi thêm, đi dấn", "Bẫy N2: Tiện đường đi thêm một đoạn xa hơn, không phải duỗi chân.", "温泉まで足を延ばしました。", "Tôi đã đi thêm đến suối nước nóng.", ["京都まで足を延ばす", "温泉に足を延ばす"], [{"word": "ついでに行く", "reading": "", "note": "Nhân tiện đi"}], [{"word": "引き返す", "reading": "ひきかえす", "meaning": "Quay lại"}])
    add(30, 5, "Quán dụng ngữ", "あしをはこぶ", "足を運ぶ", "Túc vận", "Cất công đến tận nơi", "Cất công đích thân đến nơi. Kính ngữ: ご足労いただく.", "遠くから足を運びました。", "Tôi đã cất công đến từ xa.", ["何度も足を運ぶ", "劇場に足を運ぶ"], [{"word": "わざわざ行く", "reading": "", "note": "Cất công đi"}])
    add(31, 2, "Quán dụng ngữ", "あしをひっぱる", "足を引っ張る", "Túc dẫn", "Ngáng chân, thọc gậy bánh xe", "Nghĩa bóng là ngáng chân, làm cản trở tiến độ của tập thể.", "彼は他人の足を引っ張るのが好きです。", "Anh ấy thích ngáng chân người khác.", ["チームの足を引っ張る", "他人の足を引っ張る"], [{"word": "邪魔をする", "reading": "じゃまをする", "note": "Cản trở"}], [{"word": "後押しする", "reading": "あとおしする", "meaning": "Ủng hộ"}])
    add(32, 4, "Động từ", "あずける", "預ける", "Dự", "Gửi (tiền, đồ, con)", "預ける (mình gửi đồ cho người khác) <-> 預かる (mình nhận trông hộ).", "子供を保育園に預けます。", "Tôi gửi con ở nhà trẻ.", ["荷物を預ける", "保育園に子供を預ける", "銀行にお金を預ける"], [{"word": "委託する", "reading": "いたくする", "note": "Ủy thác"}], [{"word": "預かる", "reading": "あずかる", "meaning": "Trông nom"}])
    add(33, 3, "Danh từ", "あせ", "汗", "Hãn", "Mồ hôi", "Mồ hôi tiết ra từ cơ thể khi lao động hoặc vận động.", "暑くて汗が出る。", "Nóng nên ra mồ hôi.", ["暑くて汗が出る", "汗を流す"])
    add(34, 1, "Động từ", "あそびまわる", "遊び回る", "Du hồi", "Chơi lòng vòng, chơi khắp", "Đi chơi, khám phá nhiều nơi khác nhau.", "公園を遊び回る。", "Đi chơi khắp công viên.", ["公園を遊び回る"])
    add(35, 1, "Động từ", "あたえる", "与える", "Dữ", "Trao tặng, gây ra (ảnh hưởng)", "Rất hay đi với 影響を与える, 印象を与える, ダメージを与える.", "彼にプレゼントを与えました。", "Tôi đã tặng quà cho anh ấy.", ["影響を与える", "チャンスを与える", "損害を与える"], [{"word": "もたらす", "reading": "", "note": "Đem lại"}], [{"word": "奪う", "reading": "うばう", "meaning": "Cướp"}])
    add(36, 3, "Phó từ", "あたかも", "あたかも", "-", "Cứ như thể là", "Luôn đi kèm cấu trúc so sánh ví von 'あたかも～（かの）ようだ / ごとし'.", "あたかも自分の家のようにくつろいでいる。", "Thoải mái như ở nhà mình.", ["あたかも自分の家のように", "あたかも知っているかのように話す"], [{"word": "まるで", "reading": "", "note": "Như thể"}])
    add(37, 5, "Danh từ", "あたたかみ", "温かみ", "Ôn", "Sự ấm áp, nồng hậu", "Cảm giác ấm áp, thân thiện, dễ chịu từ người hoặc vật.", "彼女の笑顔に温かみを感じます。", "Cảm thấy ấm áp từ nụ cười của cô ấy.", ["温かみを感じる", "温かみのある声"])
    add(38, 8, "Động từ", "あたたまる", "温まる", "Ôn", "Ấm lên (vật, cơ thể)", "Tự động từ: Bản thân vật, món ăn hoặc cơ thể ấm dần lên.", "部屋が温まる。", "Phòng được làm ấm.", ["スープで体が温まる", "部屋が温まる"], [{"word": "ぬくもる", "reading": "", "note": "Ấm áp"}], [{"word": "冷える", "reading": "ひえる", "meaning": "Lạnh đi"}])
    add(39, 6, "Động từ", "あたたまる", "暖まる", "Noãn", "Ấm lên (không khí, thời tiết)", "Dùng cho nhiệt độ không khí, thời tiết, môi trường ấm áp lên.", "外は寒いが、部屋の中は暖かい。", "Bên ngoài lạnh nhưng trong phòng ấm áp.", ["ストーブで暖まる", "心が暖まる"], [], [{"word": "冷える", "reading": "ひえる", "meaning": "Lạnh đi"}])
    add(40, 1, "Động từ", "あたためなおす", "温め直す", "Ôn trực", "Hâm nóng lại", "Làm nóng lại đồ ăn hoặc thức uống thừa.", "残り物を温め直します。", "Hâm nóng lại đồ ăn thừa.", ["残り物を温め直す", "スープを温め直す"])
    add(41, 8, "Động từ", "あたためる", "温める", "Ôn", "Làm nóng, hâm nóng (đồ ăn)", "Tha động từ: Tác động làm nóng thức ăn hoặc hâm nóng tình bạn cũ (旧交を温める).", "スープを温めます。", "Làm nóng súp.", ["電子レンジで温める", "旧交を温める"], [{"word": "熱を加える", "reading": "", "note": "Gia nhiệt"}], [{"word": "冷やす", "reading": "ひやす", "meaning": "Làm lạnh"}])
    add(42, 6, "Động từ", "あたためる", "暖める", "Noãn", "Làm ấm (phòng, không gian)", "Tha động từ: Làm ấm không gian phòng ốc bằng lò sưởi.", "部屋を暖めます。", "Làm ấm phòng.", ["部屋を暖める", "家を暖める"], [], [{"word": "冷やす", "reading": "ひやす", "meaning": "Làm lạnh"}])
    add(43, 5, "Quán dụng ngữ", "あたまがあがらない", "頭が上がらない", "Đầu thượng", "Kính nể, lép vế, mang ơn", "Cảm thấy nể phục, lép vế, mang ơn lớn nên không thể đối đáp ngang hàng.", "彼には頭が上がりません。", "Tôi không thể ngẩng đầu lên trước anh ấy.", ["恩人には頭が上がらない", "妻に頭が上がらない"], [{"word": "頭が下がる", "reading": "あたまがさがる", "note": "Kính phục"}], [{"word": "見下す", "reading": "みくだす", "meaning": "Coi thường"}])
    add(44, 5, "Quán dụng ngữ", "あたまがいたい", "頭が痛い", "Đầu thống", "Đau đầu lo nghĩ (nan giải)", "Nghĩa bóng chỉ tâm trạng phiền não, lo nghĩ bế tắc trước vấn đề khó.", "将来のことを考えると頭が痛いです。", "Nghĩ về tương lai tôi thấy đau đầu.", ["予算不足で頭が痛い", "将来のことで頭が痛い"], [{"word": "悩ましい", "reading": "なやまかしい", "note": "Nan giải"}])
    add(45, 5, "Quán dụng ngữ", "あたまがかたい", "頭が固い", "Đầu cố", "Cứng nhắc, bảo thủ", "Chỉ người bảo thủ, cứng nhắc, không chịu tiếp thu ý kiến mới.", "彼は頭が固いです。", "Anh ấy cứng nhắc.", ["頭が固くて融通が利かない", "頭の固い上司"], [{"word": "頑固な", "reading": "がんこな", "note": "Ngoan cố"}], [{"word": "頭が柔らかい", "reading": "あたまがやわらかい", "meaning": "Linh hoạt"}])
    add(46, 5, "Quán dụng ngữ", "あたまにくる", "頭に来る", "Đầu lai", "Điên tiết, phát cáu", "Cảm xúc giận sôi máu, điên tiết bộc phát nhất thời.", "彼の言葉に頭に来た。", "Tôi đã điên tiết vì lời nói của anh ấy.", ["彼の態度に頭に来る", "馬鹿にされて頭に来た"], [{"word": "腹が立つ", "reading": "はらがたつ", "note": "Tức giận"}], [{"word": "気が静まる", "reading": "きがしずまる", "meaning": "Nguôi giận"}])
    add(47, 4, "Quán dụng ngữ", "あたまをさげる", "頭を下げる", "Đầu hạ", "Cúi đầu xin lỗi, hạ mình cầu xin", "Hành động cúi đầu xin lỗi hoặc khẩn cầu sự giúp đỡ từ người khác.", "彼に謝るために頭を下げた。", "Tôi cúi đầu xin lỗi anh ấy.", ["深々と頭を下げる", "頼み込んで頭を下げる"], [{"word": "謝罪する", "reading": "しゃざいする", "note": "Tạ lỗi"}], [{"word": "威張る", "reading": "いばる", "meaning": "Hống hách"}])
    add(48, 5, "Quán dụng ngữ", "あたまをひやす", "頭を冷やす", "Đầu lãnh", "Bình tĩnh lại, hạ hỏa", "Tạm dừng lại để lấy lại lý trí, suy nghĩ thấu đáo.", "頭を冷やしてから決めます。", "Sẽ quyết định sau khi bình tĩnh lại.", ["頭を冷やして考え直す", "少し頭を冷やしてこい"], [{"word": "冷静になる", "reading": "れいせいになる", "note": "Bình tĩnh"}], [{"word": "興奮する", "reading": "こうふんする", "meaning": "Kích động"}])
    add(49, 5, "Danh từ", "あつかい", "扱い", "Tráp", "Đối xử, xem như là", "Dùng để chỉ cách đối xử, cư xử với người hoặc vật.", "子供扱いしないでください。", "Đừng đối xử với tôi như trẻ con.", ["子供扱い", "客扱い", "乱暴な扱い"])
    add(50, 5, "Tính từ", "あつかましい", "厚かましい", "Hậu", "Mặt dày, trơ trẽn, không biết ngượng", "Mặt dày, hay đưa ra những yêu cầu quá quắt làm phiền người khác.", "厚かましいお願いですが、聞いてください。", "Yêu cầu trơ trẽn nhưng hãy nghe tôi.", ["厚かましいお願い", "厚かましい態度"], [{"word": "ずうずうしい", "reading": "", "note": "Trơ trẽn"}], [{"word": "奥ゆかしい", "reading": "おくゆかしい", "meaning": "Ý tứ"}])

    return items

if __name__ == "__main__":
    items = get_page_1_to_4()
    print(f"Loaded {len(items)} sample items from p1-p4")
