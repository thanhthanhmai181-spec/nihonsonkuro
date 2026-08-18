export interface KanjiItem {
  id: number;
  kanji: string;
  on: string;
  kun: string;
  meaning: string;
  hanviet: string;
  strokes: number;
  radical: string;
  radicalMeaning: string;
  examples: string[];
  mnemonic: string;
}

export const KANJI_N5_DATA: KanjiItem[] = [
  {
    id: 1,
    kanji: "一",
    on: "イチ",
    kun: "ひと.つ",
    meaning: "Một",
    hanviet: "Nhất",
    strokes: 1,
    radical: "一",
    radicalMeaning: "Số một",
    examples: [
      "一人 (ひとり) - Một mình / Một người",
      "一月 (いちがつ) - Tháng một",
      "一度 (いちど) - Một lần",
      "一冊 (いっさつ) - Một cuốn (sách)"
    ],
    mnemonic: "Một nét ngang đơn giản tạo nên vạn vật."
  },
  {
    id: 2,
    kanji: "二",
    on: "ニ",
    kun: "ふた.つ",
    meaning: "Hai",
    hanviet: "Nhị",
    strokes: 2,
    radical: "二",
    radicalMeaning: "Hai",
    examples: [
      "二人 (ふたり) - Hai người",
      "二月 (にがつ) - Tháng hai",
      "二回 (にかい) - Hai lần",
      "二台 (にだい) - Hai chiếc (máy móc)"
    ],
    mnemonic: "Hai nét ngang đặt song song đại diện cho trời và đất."
  },
  {
    id: 3,
    kanji: "三",
    on: "サン",
    kun: "み.つ",
    meaning: "Ba",
    hanviet: "Tam",
    strokes: 3,
    radical: "一",
    radicalMeaning: "Một",
    examples: [
      "三月 (さんがつ) - Tháng ba",
      "三つ (みっつ) - Ba cái",
      "三人 (さんにん) - Ba người",
      "三回 (さんかい) - Ba lần"
    ],
    mnemonic: "Ba nét ngang xếp chồng, tượng trưng Thiên - Địa - Nhân."
  },
  {
    id: 4,
    kanji: "四",
    on: "シ",
    kun: "よ.つ / よん",
    meaning: "Bốn",
    hanviet: "Tứ",
    strokes: 5,
    radical: "囗",
    radicalMeaning: "Vây quanh (Vi)",
    examples: [
      "四月 (しがつ) - Tháng tư",
      "四つ (よっつ) - Bốn cái",
      "四回 (よんかい) - Bốn lần",
      "四角 (しかく) - Hình vuông / Bốn góc"
    ],
    mnemonic: "Chiếc xe có 4 bánh chạy trong khuôn viên khép kín."
  },
  {
    id: 5,
    kanji: "五",
    on: "ゴ",
    kun: "いつ.つ",
    meaning: "Năm",
    hanviet: "Ngũ",
    strokes: 4,
    radical: "二",
    radicalMeaning: "Hai",
    examples: [
      "五月 (ごがつ) - Tháng năm",
      "五つ (いつつ) - Năm cái",
      "五回 (ごかい) - Năm lần",
      "五千 (ごせん) - Năm ngàn"
    ],
    mnemonic: "Ngũ hành kết nối giữa trời và đất thành một thể thống nhất."
  },
  {
    id: 6,
    kanji: "六",
    on: "ロク",
    kun: "む.つ",
    meaning: "Sáu",
    hanviet: "Lục",
    strokes: 4,
    radical: "八",
    radicalMeaning: "Tám (Bát)",
    examples: [
      "六月 (ろくがつ) - Tháng sáu",
      "六つ (むっつ) - Sáu cái",
      "六回 (ろっかい) - Sáu lần",
      "六百 (ろっぴゃく) - Sáu trăm"
    ],
    mnemonic: "Chiếc mũ đội trên đầu một con quái vật có hai chân nâng đỡ."
  },
  {
    id: 7,
    kanji: "七",
    on: "シチ",
    kun: "なな.つ",
    meaning: "Bảy",
    hanviet: "Thất",
    strokes: 2,
    radical: "一",
    radicalMeaning: "Một",
    examples: [
      "七月 (しちがつ) - Tháng bảy",
      "七つ (ななつ) - Bảy cái",
      "七回 (ななかい) - Bảy lần",
      "七百 (ななひゃく) - Bảy trăm"
    ],
    mnemonic: "Cây súng có lưỡi lê chọc ngược lên trời."
  },
  {
    id: 8,
    kanji: "八",
    on: "ハチ",
    kun: "や.つ",
    meaning: "Tám",
    hanviet: "Bát",
    strokes: 2,
    radical: "八",
    radicalMeaning: "Tám",
    examples: [
      "八月 (はちがつ) - Tháng tám",
      "八つ (やっつ) - Tám cái",
      "八回 (はちかい) - Tám lần",
      "八百 (はっぴゃく) - Tám trăm"
    ],
    mnemonic: "Hai nét rẽ ra hai bên, mở rộng bờ cõi theo tám hướng."
  },
  {
    id: 9,
    kanji: "九",
    on: "キュウ / ク",
    kun: "ここの.つ",
    meaning: "Chín",
    hanviet: "Cửu",
    strokes: 2,
    radical: "乙",
    radicalMeaning: "Ất (vị trí thứ hai)",
    examples: [
      "九月 (くがつ) - Tháng chín",
      "九つ (ここ の つ) - Chín cái",
      "九回 (きゅうかい) - Chín lần",
      "九百 (きゅうひゃく) - Chín trăm"
    ],
    mnemonic: "Nét cong móc như cái đuôi chín đuôi của cửu vĩ hồ."
  },
  {
    id: 10,
    kanji: "十",
    on: "ジュウ",
    kun: "とお",
    meaning: "Mười",
    hanviet: "Thập",
    strokes: 2,
    radical: "十",
    radicalMeaning: "Mười",
    examples: [
      "十月 (じゅうがつ) - Tháng mười",
      "十回 (じゅっかい) - Mười lần",
      "十分 (じゅっぷん) - Mười phút",
      "十人 (じゅうにん) - Mười người"
    ],
    mnemonic: "Nét dọc cắt ngang nét hoành, biểu trưng cho sự trọn vẹn thập toàn."
  },
  {
    id: 11,
    kanji: "百",
    on: "ヒャク",
    kun: "もも",
    meaning: "Trăm",
    hanviet: "Bách",
    strokes: 6,
    radical: "白",
    radicalMeaning: "Trắng (Bạch)",
    examples: [
      "百円 (ひゃくえん) - Một trăm yên",
      "三百 (さんびゃく) - Ba trăm",
      "百人 (ひゃくにん) - Một trăm người",
      "百回 (ひゃっかい) - Một trăm lần"
    ],
    mnemonic: "Thêm một nét trên đầu chữ Bạch (trắng) là đủ một trăm."
  },
  {
    id: 12,
    kanji: "千",
    on: "セン",
    kun: "ち",
    meaning: "Nghìn",
    hanviet: "Thiên",
    strokes: 3,
    radical: "十",
    radicalMeaning: "Mười",
    examples: [
      "千円 (せんえん) - Một ngàn yên",
      "三千 (さんぜん) - Ba ngàn",
      "千人 (せんにん) - Một ngàn người",
      "千回 (せんかい) - Một ngàn lần"
    ],
    mnemonic: "Thêm một nét gạch xéo trên đầu chữ Thập là một nghìn."
  },
  {
    id: 13,
    kanji: "万",
    on: "マン / バン",
    kun: "よろず",
    meaning: "Vạn",
    hanviet: "Vạn",
    strokes: 3,
    radical: "一",
    radicalMeaning: "Một",
    examples: [
      "一万 (いちまん) - Mười ngàn (1 vạn)",
      "百万 (ひゃくまん) - Một triệu",
      "万円 (まんえん) - Vạn yên",
      "万国 (ばんこく) - Vạn quốc (tất cả quốc gia)"
    ],
    mnemonic: "Một nhát chém quét sạch vạn quân địch."
  },
  {
    id: 14,
    kanji: "円",
    on: "エン",
    kun: "まる.い",
    meaning: "Yên (tiền), Tròn",
    hanviet: "Viên",
    strokes: 4,
    radical: "冂",
    radicalMeaning: "Quynh (bao bọc vùng biên ngoại)",
    examples: [
      "百円 (ひゃくえん) - Trăm yên",
      "円い (まるい) - Tròn",
      "円高 (えんだか) - Đồng yên tăng giá",
      "楕円 (だえん) - Hình elip / hình bầu dục"
    ],
    mnemonic: "Khuôn viền bao bọc những đồng xu tròn trịa lấp lánh."
  },
  {
    id: 15,
    kanji: "年",
    on: "ネン",
    kun: "とし",
    meaning: "Năm",
    hanviet: "Niên",
    strokes: 6,
    radical: "干",
    radicalMeaning: "Can",
    examples: [
      "今年 (ことし) - Năm nay",
      "去年 (きょねん) - Năm ngoái",
      "来年 (らいねん) - Năm sau",
      "毎年 (まいとし / まいねん) - Hàng năm"
    ],
    mnemonic: "Người nông dân vác lúa sau một năm thu hoạch bội thu."
  },
  {
    id: 16,
    kanji: "月",
    on: "ゲツ / ガツ",
    kun: "つき",
    meaning: "Tháng, Mặt trăng",
    hanviet: "Nguyệt",
    strokes: 4,
    radical: "月",
    radicalMeaning: "Mặt trăng",
    examples: [
      "一月 (いちがつ) - Tháng một",
      "月曜日 (げつようび) - Thứ hai",
      "毎月 (まいつき) - Mỗi tháng",
      "月見 (つきみ) - Ngắm trăng"
    ],
    mnemonic: "Vầng trăng khuyết chiếu sáng màn đêm lung linh."
  },
  {
    id: 17,
    kanji: "日",
    on: "ニチ / ジツ",
    kun: "ひ / -び",
    meaning: "Ngày, Mặt trời",
    hanviet: "Nhật",
    strokes: 4,
    radical: "日",
    radicalMeaning: "Mặt trời",
    examples: [
      "日曜日 (にちようび) - Chủ nhật",
      "毎日 (まいにち) - Mỗi ngày",
      "休日 (きゅうじつ) - Ngày nghỉ",
      "日の出 (ひので) - Bình minh"
    ],
    mnemonic: "Mặt trời rực rỡ có một vệt đen ở giữa."
  },
  {
    id: 18,
    kanji: "時",
    on: "ジ",
    kun: "とき",
    meaning: "Thời gian, Giờ",
    hanviet: "Thời",
    strokes: 10,
    radical: "日",
    radicalMeaning: "Mặt trời",
    examples: [
      "時間 (じかん) - Thời gian",
      "時計 (とけい) - Đồng hồ",
      "一等時 (いっとうじ) - Thời điểm vàng",
      "時代 (じだい) - Thời đại"
    ],
    mnemonic: "Mặt trời mọc chiếu rọi ngôi chùa đo đếm thời gian trôi."
  },
  {
    id: 19,
    kanji: "分",
    on: "ブン / フン",
    kun: "わ.ける",
    meaning: "Phút, Chia sẻ",
    hanviet: "Phân",
    strokes: 4,
    radical: "刀",
    radicalMeaning: "Dao (Đao)",
    examples: [
      "十分 (じゅっぷん / じゅうぶん) - 10 phút / Đầy đủ",
      "半分 (はんぶん) - Một nửa",
      "自分 (じぶん) - Bản thân",
      "分ける (わける) - Phân chia"
    ],
    mnemonic: "Dùng con dao (Đao) sắc bén chia vật làm hai nửa (Bát)."
  },
  {
    id: 20,
    kanji: "半",
    on: "ハン",
    kun: "なか.ば",
    meaning: "Một nửa",
    hanviet: "Bán",
    strokes: 5,
    radical: "十",
    radicalMeaning: "Thập (Mười)",
    examples: [
      "半分 (はんぶん) - Một nửa",
      "半年 (はんとし) - Nửa năm",
      "半日 (はんにち) - Nửa ngày",
      "大半 (たいはん) - Phần lớn"
    ],
    mnemonic: "Nhìn thẳng vào tấm bia gỗ bị chia đôi làm hai phần đều nhau."
  },
  {
    id: 21,
    kanji: "毎",
    on: "マイ",
    kun: "ごと",
    meaning: "Mỗi",
    hanviet: "Mỗi",
    strokes: 6,
    radical: "毋",
    radicalMeaning: "Không nên / Người mẹ",
    examples: [
      "毎日 (まいにち) - Mỗi ngày",
      "毎月 (まいつき) - Mỗi tháng",
      "毎年 (まいとし) - Mỗi năm",
      "毎回 (まいかい) - Mỗi lần"
    ],
    mnemonic: "Người mẹ mỗi ngày đều đội mũ chăm lo gia đình."
  },
  {
    id: 22,
    kanji: "今",
    on: "コン",
    kun: "いま",
    meaning: "Bây giờ",
    hanviet: "Kim",
    strokes: 4,
    radical: "人",
    radicalMeaning: "Người",
    examples: [
      "今日 (きょう) - Hôm nay",
      "今週 (こんしゅう) - Tuần này",
      "今年 (ことし) - Năm nay",
      "今月 (こんげつ) - Tháng này"
    ],
    mnemonic: "Mái nhà che chở cho con người ngay tại thời điểm hiện tại."
  },
  {
    id: 23,
    kanji: "先",
    on: "セン",
    kun: "さき",
    meaning: "Trước, Tương lai",
    hanviet: "Tiên",
    strokes: 6,
    radical: "儿",
    radicalMeaning: "Nhân nhi (Đứa trẻ)",
    examples: [
      "先生 (せんせい) - Giáo viên / Thầy",
      "先週 (せんしゅう) - Tuần trước",
      "先月 (せんげつ) - Tháng trước",
      "先日 (せんじつ) - Hôm trước"
    ],
    mnemonic: "Người đi trước dẫn đường cho đứa trẻ chạy theo sau."
  },
  {
    id: 24,
    kanji: "来",
    on: "ライ",
    kun: "く.る",
    meaning: "Đến",
    hanviet: "Lai",
    strokes: 7,
    radical: "木",
    radicalMeaning: "Mộc (Cây)",
    examples: [
      "来年 (らいねん) - Năm sau",
      "来週 (らいしゅう) - Tuần sau",
      "来月 (らいげつ) - Tháng sau",
      "来る (くる) - Đến"
    ],
    mnemonic: "Cây lúa nảy mầm mang tương lai ấm no đến gần."
  },
  {
    id: 25,
    kanji: "前",
    on: "ゼン",
    kun: "まえ",
    meaning: "Trước",
    hanviet: "Tiền",
    strokes: 9,
    radical: "刀",
    radicalMeaning: "Đao (Dao)",
    examples: [
      "名前 (なまえ) - Tên",
      "前年 (ぜんねん) - Năm trước",
      "午前 (ごぜん) - Buổi sáng",
      "前回 (ぜんかい) - Lần trước"
    ],
    mnemonic: "Cầm dao chém đi hai cái sừng che chắn ở phía trước mặt."
  },
  {
    id: 26,
    kanji: "後",
    on: "ゴ / コウ",
    kun: "あと / うし.ろ",
    meaning: "Sau, Phía sau",
    hanviet: "Hậu",
    strokes: 9,
    radical: "彳",
    radicalMeaning: "Sách (Bước chân trái)",
    examples: [
      "午後 (ごご) - Buổi chiều (Sau ngọ)",
      "後で (あとで) - Lát nữa / Sau đó",
      "後ろ (うしろ) - Phía sau",
      "最後 (さいご) - Cuối cùng"
    ],
    mnemonic: "Người lính bước đi thong thả ở phía sau hàng ngũ."
  },
  {
    id: 27,
    kanji: "上",
    on: "ジョウ",
    kun: "うえ / あ.がる",
    meaning: "Trên",
    hanviet: "Thượng",
    strokes: 3,
    radical: "一",
    radicalMeaning: "Một",
    examples: [
      "上手 (じょうず) - Giỏi / Điêu luyện",
      "上着 (うわぎ) - Áo khoác",
      "上がる (あがる) - Lên / Tăng lên",
      "以上 (いじょう) - Trở lên"
    ],
    mnemonic: "Nét dọc vươn mình lên phía trên nét hoành."
  },
  {
    id: 28,
    kanji: "下",
    on: "カ / ゲ",
    kun: "した / さ.がる",
    meaning: "Dưới",
    hanviet: "Hạ",
    strokes: 3,
    radical: "一",
    radicalMeaning: "Một",
    examples: [
      "地下 (ちか) - Dưới mặt đất / Tàu điện ngầm",
      "下さい (ください) - Xin hãy cho tôi",
      "下がる (さがる) - Giảm xuống",
      "以下 (いか) - Trở xuống"
    ],
    mnemonic: "Nét xiên hướng chỉ xuống phía dưới mặt đất."
  },
  {
    id: 29,
    kanji: "中",
    on: "チュウ",
    kun: "なか",
    meaning: "Trong, Giữa",
    hanviet: "Trung",
    strokes: 4,
    radical: "丨",
    radicalMeaning: "Sổ (Nét dọc thẳng)",
    examples: [
      "中国 (ちゅうごく) - Trung Quốc",
      "中に (なかに) - Ở bên trong",
      "勉強中 (べんきょうちゅう) - Đang học bài",
      "一日中 (いちにちじゅう) - Suốt cả ngày"
    ],
    mnemonic: "Mũi tên đâm xuyên thẳng qua tâm điểm chính giữa cái bia."
  },
  {
    id: 30,
    kanji: "外",
    on: "ガイ",
    kun: "そと",
    meaning: "Ngoài",
    hanviet: "Ngoại",
    strokes: 5,
    radical: "夕",
    radicalMeaning: "Tịch (Buổi tối)",
    examples: [
      "外国 (がいこく) - Nước ngoài",
      "外で (そとで) - Ở bên ngoài",
      "以外 (いがい) - Ngoại trừ",
      "海外 (かいがい) - Hải ngoại"
    ],
    mnemonic: "Buổi tối (Tịch) cầm bùa bói toán (Bốc) ở ngoài sân."
  },
  {
    id: 31,
    kanji: "右",
    on: "ウ / ユウ",
    kun: "みぎ",
    meaning: "Phải",
    hanviet: "Hữu",
    strokes: 5,
    radical: "口",
    radicalMeaning: "Khẩu (Miệng)",
    examples: [
      "右手 (みぎて) - Tay phải",
      "右側 (みぎがわ) - Phía bên phải",
      "右折 (うせつ) - Rẽ phải",
      "左右 (さゆう) - Trái phải / Chi phối"
    ],
    mnemonic: "Tay mặt phụ trợ đưa cơm vào miệng (Khẩu)."
  },
  {
    id: 32,
    kanji: "左",
    on: "サ",
    kun: "ひだり",
    meaning: "Trái",
    hanviet: "Tả",
    strokes: 5,
    radical: "工",
    radicalMeaning: "Công (Công việc / Thợ)",
    examples: [
      "左手 (ひだりて) - Tay trái",
      "左側 (ひだりがわ) - Phía bên trái",
      "左折 (させつ) - Rẽ trái",
      "左利き (ひだりきき) - Thuận tay trái"
    ],
    mnemonic: "Tay trái cầm thước chữ công giúp người thợ làm việc."
  },
  {
    id: 33,
    kanji: "北",
    on: "ホク",
    kun: "きた",
    meaning: "Bắc",
    hanviet: "Bắc",
    strokes: 5,
    radical: "匕",
    radicalMeaning: "Chủy (Thìa)",
    examples: [
      "北海道 (ほっかいどう) - Hokkaido",
      "北口 (きたぐち) - Cửa bắc",
      "北国 (きたぐに) - Xứ lạnh phương bắc",
      "北風 (きたかぜ) - Gió bấc"
    ],
    mnemonic: "Hai người ngồi quay lưng vào nhau tránh gió lạnh từ phương Bắc."
  },
  {
    id: 34,
    kanji: "南",
    on: "ナン",
    kun: "みなみ",
    meaning: "Nam",
    hanviet: "Nam",
    strokes: 9,
    radical: "十",
    radicalMeaning: "Thập",
    examples: [
      "南口 (みなみぐち) - Cửa nam",
      "南国 (なんごく) - Đất nước phương nam",
      "南風 (みなみかぜ) - Gió nam",
      "東南 (とうなん) - Đông nam"
    ],
    mnemonic: "Dưới bóng râm thảo nguyên, mười người vác rương đi về hướng Nam."
  },
  {
    id: 35,
    kanji: "東",
    on: "トウ",
    kun: "ひがし",
    meaning: "Đông",
    hanviet: "Đông",
    strokes: 8,
    radical: "木",
    radicalMeaning: "Mộc",
    examples: [
      "東京 (とうきょう) - Tokyo",
      "東口 (ひがしぐち) - Cửa đông",
      "関東 (かんとう) - Vùng Kanto",
      "東洋 (とうよう) - Đông dương"
    ],
    mnemonic: "Mặt trời (Nhật) mọc lên xuyên qua ngọn cây (Mộc) ở phía Đông."
  },
  {
    id: 36,
    kanji: "西",
    on: "セイ / サイ",
    kun: "にし",
    meaning: "Tây",
    hanviet: "Tây",
    strokes: 6,
    radical: "襾",
    radicalMeaning: "Á (Che đậy / Tây)",
    examples: [
      "西口 (にしぐち) - Cửa tây",
      "関西 (かんさい) - Vùng Kansai",
      "西風 (にしかぜ) - Gió tây",
      "西洋 (せいよう) - Tây dương"
    ],
    mnemonic: "Con chim mỏi cánh bay về tổ ngủ khi mặt trời lặn hướng Tây."
  },
  {
    id: 37,
    kanji: "大",
    on: "ダイ / タイ",
    kun: "おお.きい",
    meaning: "Lớn, To",
    hanviet: "Đại",
    strokes: 3,
    radical: "大",
    radicalMeaning: "Lớn",
    examples: [
      "大人 (おとな) - Người lớn",
      "大きい (おおきい) - To lớn",
      "大学 (だいがく) - Đại học",
      "大好き (だいすき) - Rất thích"
    ],
    mnemonic: "Hình dáng một người dang rộng tay chân khẳng định mình to lớn."
  },
  {
    id: 38,
    kanji: "小",
    on: "ショウ",
    kun: "ちい.さい",
    meaning: "Nhỏ, Bé",
    hanviet: "Tiểu",
    strokes: 3,
    radical: "小",
    radicalMeaning: "Nhỏ",
    examples: [
      "小学校 (しょうがっこう) - Trường tiểu học",
      "小さい (ちいさい) - Nhỏ bé",
      "小鳥 (ことり) - Chim sẻ / chim nhỏ",
      "小説 (しょうせつ) - Tiểu thuyết"
    ],
    mnemonic: "Cắt vụn một vật to lớn thành ba mảnh nhỏ bé."
  },
  {
    id: 39,
    kanji: "高",
    on: "コウ",
    kun: "たか.い",
    meaning: "Cao, Đắt",
    hanviet: "Cao",
    strokes: 10,
    radical: "高",
    radicalMeaning: "Cao",
    examples: [
      "高校 (こうこう) - Trường cấp 3 (Trung học phổ thông)",
      "高い (たかい) - Cao / Đắt đỏ",
      "高級 (こうきゅう) - Cao cấp",
      "最高 (さいこう) - Tuyệt vời / Cao nhất"
    ],
    mnemonic: "Ngôi tháp lầu cao chót vót có hai tầng cửa sổ lộng gió."
  },
  {
    id: 40,
    kanji: "安",
    on: "アン",
    kun: "やす.い",
    meaning: "An tâm, Rẻ",
    hanviet: "An",
    strokes: 6,
    radical: "宀",
    radicalMeaning: "Miên (Mái nhà)",
    examples: [
      "安心 (あんしん) - Yên tâm",
      "安全 (あんぜん) - An toàn",
      "安い (やすい) - Rẻ",
      "不安 (ふあん) - Bất an / lo lắng"
    ],
    mnemonic: "Người phụ nữ (Nữ) ở dưới mái nhà (Miên) thì tâm mới an."
  },
  {
    id: 41,
    kanji: "新",
    on: "シン",
    kun: "あたら.しい",
    meaning: "Mới",
    hanviet: "Tân",
    strokes: 13,
    radical: "斤",
    radicalMeaning: "Cân (Cái rìu)",
    examples: [
      "新聞 (しんぶん) - Báo chí",
      "新しい (あたらしい) - Mới mẻ",
      "新幹線 (しんかんせん) - Tàu cao tốc",
      "新年 (しんねん) - Năm mới"
    ],
    mnemonic: "Dùng cây rìu (Cân) đốn gỗ cây thông để chế tạo công cụ mới."
  },
  {
    id: 42,
    kanji: "古",
    on: "コ",
    kun: "ふる.い",
    meaning: "Cũ",
    hanviet: "Cổ",
    strokes: 5,
    radical: "口",
    radicalMeaning: "Khẩu (Miệng)",
    examples: [
      "古い (ふるい) - Cũ kỹ",
      "中古 (ちゅうこ) - Hàng đã qua sử dụng / Đồ cũ",
      "古本 (ふるほん) - Sách cũ",
      "古代 (こだい) - Thời cổ đại"
    ],
    mnemonic: "Một câu chuyện truyền miệng (Khẩu) qua mười (Thập) thế hệ đã cũ."
  },
  {
    id: 43,
    kanji: "長",
    on: "チョウ",
    kun: "なが.い",
    meaning: "Dài, Trưởng",
    hanviet: "Trường",
    strokes: 8,
    radical: "長",
    radicalMeaning: "Dài / Trưởng",
    examples: [
      "長い (ながい) - Dài",
      "社長 (しゃちょう) - Giám đốc",
      "長男 (ちょうなん) - Con trai trưởng",
      "身長 (しんちょう) - Chiều cao cơ thể"
    ],
    mnemonic: "Vị bối trưởng lão có râu tóc dài thướt tha."
  },
  {
    id: 44,
    kanji: "人",
    on: "ジン / ニン",
    kun: "ひと",
    meaning: "Người",
    hanviet: "Nhân",
    strokes: 2,
    radical: "人",
    radicalMeaning: "Người",
    examples: [
      "日本人 (にほんじん) - Người Nhật Bản",
      "三人 (さんにん) - Ba người",
      "大人 (おとな) - Người lớn",
      "人生 (じんせい) - Nhân sinh / cuộc đời"
    ],
    mnemonic: "Hình dáng một người đang đứng vững bằng hai chân."
  },
  {
    id: 45,
    kanji: "子",
    on: "シ / ス",
    kun: "こ",
    meaning: "Trẻ con, Con",
    hanviet: "Tử",
    strokes: 3,
    radical: "子",
    radicalMeaning: "Trẻ con",
    examples: [
      "子供 (こども) - Trẻ em / con cái",
      "女の子 (おんなのこ) - Bé gái",
      "男の子 (おとこのこ) - Bé trai",
      "様子 (ようす) - Tình hình / vẻ bề ngoài"
    ],
    mnemonic: "Hình ảnh một đứa bé sơ sinh quấn tã vẫy hai tay nghịch ngợm."
  },
  {
    id: 46,
    kanji: "女",
    on: "ジョ / ニョ",
    kun: "おんな",
    meaning: "Phụ nữ",
    hanviet: "Nữ",
    strokes: 3,
    radical: "女",
    radicalMeaning: "Nữ",
    examples: [
      "女性 (じょせい) - Phụ nữ / Nữ giới",
      "女の子 (おんなのこ) - Bé gái",
      "彼女 (かのじょ) - Cô ấy / Bạn gái",
      "長女 (ちょうじょ) - Con gái trưởng"
    ],
    mnemonic: "Dáng một người phụ nữ ngồi chéo chân duyên dáng lịch thiệp."
  },
  {
    id: 47,
    kanji: "男",
    on: "ダン / ナン",
    kun: "おとこ",
    meaning: "Đàn ông, Nam",
    hanviet: "Nam",
    strokes: 7,
    radical: "田",
    radicalMeaning: "Điền (Ruộng)",
    examples: [
      "男性 (だんせい) - Nam giới / Đàn ông",
      "男の子 (おとこのこ) - Bé trai",
      "長男 (ちょうなん) - Con trai cả",
      "男らしい (おとこらしい) - Nam tính / Đàn ông"
    ],
    mnemonic: "Kẻ dùng sức lực (Lực) làm việc cày bừa trên đồng ruộng (Điền)."
  },
  {
    id: 48,
    kanji: "学",
    on: "ガク",
    kun: "まな.ぶ",
    meaning: "Học, Trường học",
    hanviet: "Học",
    strokes: 8,
    radical: "子",
    radicalMeaning: "Con trai / Con gái",
    examples: [
      "学校 (がっこう) - Trường học",
      "学生 (がくせい) - Học sinh / Sinh viên",
      "大学 (だいがく) - Đại học",
      "学ぶ (まなぶ) - Học tập / Nghiên cứu"
    ],
    mnemonic: "Đứa bé (Tử) trùm khăn đội mũ miệt mài học tập dưới mái trường."
  },
  {
    id: 49,
    kanji: "校",
    on: "コウ",
    kun: "",
    meaning: "Trường học",
    hanviet: "Hiệu",
    strokes: 10,
    radical: "木",
    radicalMeaning: "Mộc (Gỗ)",
    examples: [
      "学校 (がっこう) - Trường học",
      "高校 (こうこう) - Trung học phổ thông",
      "校長 (こうちょう) - Hiệu trưởng",
      "校庭 (こうてい) - Sân trường"
    ],
    mnemonic: "Trường học được dựng bằng gỗ (Mộc) nơi mọi người tụ họp (Giao)."
  },
  {
    id: 50,
    kanji: "生",
    on: "セイ / ショウ",
    kun: "い.きる / う.まれる",
    meaning: "Sống, Sinh ra, Học sinh",
    hanviet: "Sinh",
    strokes: 5,
    radical: "生",
    radicalMeaning: "Sinh",
    examples: [
      "先生 (せんせい) - Thầy giáo / cô giáo",
      "学生 (がくせい) - Học sinh / sinh viên",
      "生活 (せいかつ) - Đời sống / sinh hoạt",
      "生まれる (うまれる) - Được sinh ra"
    ],
    mnemonic: "Chồi non vươn mình đâm chồi nảy lộc từ đất ấm."
  }
];
