export interface VerbInfo {
  k: string; // Kanji
  h: string; // Hiragana
  r: string; // Romaji
  ex: string; // Example sentence
  exVi: string; // Example translation
  quiz: string; // Quiz sentence with ＿＿＿
}

export interface VerbPair {
  id: number;
  mean: string;
  auto: VerbInfo;
  trans: VerbInfo;
}

export const TRANSITIVE_VERBS: VerbPair[] = [
  {
    id: 1,
    mean: "Mở",
    auto: { k: "開く", h: "あく", r: "aku", ex: "ドアが開く。", exVi: "Cửa tự mở.", quiz: "風でドアが＿＿＿。" },
    trans: { k: "開ける", h: "あける", r: "akeru", ex: "ドアを開ける。", exVi: "Tôi mở cửa.", quiz: "私がドアを＿＿＿。" }
  },
  {
    id: 2,
    mean: "Đóng",
    auto: { k: "閉まる", h: "しまる", r: "shimaru", ex: "窓が閉まる。", exVi: "Cửa sổ tự đóng.", quiz: "勝手に窓が＿＿＿。" },
    trans: { k: "閉める", h: "しめる", r: "shimeru", ex: "窓を閉める。", exVi: "Tôi đóng cửa sổ.", quiz: "寒くて窓を＿＿＿。" }
  },
  {
    id: 3,
    mean: "Bật",
    auto: { k: "つく", h: "つく", r: "tsuku", ex: "電気がつく。", exVi: "Đèn tự bật.", quiz: "スイッチを入れて、電気が＿＿＿。" },
    trans: { k: "つける", h: "つける", r: "tsukeru", ex: "電気をつける。", exVi: "Tôi bật đèn.", quiz: "部屋が暗いので、電気を＿＿＿。" }
  },
  {
    id: 4,
    mean: "Tắt",
    auto: { k: "消える", h: "きえる", r: "kieru", ex: "明かりが消える。", exVi: "Ánh sáng tắt.", quiz: "停電で明かりが＿＿＿。" },
    trans: { k: "消す", h: "けす", r: "kesu", ex: "明かりを消す。", exVi: "Tôi tắt đèn.", quiz: "寝る前に明かりを＿＿＿。" }
  },
  {
    id: 5,
    mean: "Vào",
    auto: { k: "入る", h: "はいる", r: "hairu", ex: "部屋に入る。", exVi: "Tôi vào phòng.", quiz: "許可を得て部屋に＿＿＿。" },
    trans: { k: "入れる", h: "いれる", r: "ireru", ex: "かばんに本を入れる。", exVi: "Tôi cho sách vào cặp.", quiz: "かばんに本を＿＿＿。" }
  },
  {
    id: 6,
    mean: "Ra",
    auto: { k: "出る", h: "でる", r: "deru", ex: "家を出る。", exVi: "Tôi ra khỏi nhà.", quiz: "毎日7時に家を＿＿＿。" },
    trans: { k: "出す", h: "だす", r: "dasu", ex: "ゴミを出す。", exVi: "Tôi đem rác ra.", quiz: "朝、ゴミを＿＿＿。" }
  },
  {
    id: 7,
    mean: "Lên",
    auto: { k: "上がる", h: "あがる", r: "agaru", ex: "物価が上がる。", exVi: "Vật giá tăng lên.", quiz: "最近、物価が＿＿＿。" },
    trans: { k: "上げる", h: "あげる", r: "ageru", ex: "手を上げる。", exVi: "Tôi giơ tay lên.", quiz: "質問があるので手を＿＿＿。" }
  },
  {
    id: 8,
    mean: "Xuống",
    auto: { k: "下がる", h: "さがる", r: "sagaru", ex: "温度が下がる。", exVi: "Nhiệt độ giảm xuống.", quiz: "夜になると温度が＿＿＿。" },
    trans: { k: "下げる", h: "さげる", r: "sageru", ex: "音量を下げる。", exVi: "Tôi giảm âm lượng.", quiz: "うるさいので音量を＿＿＿。" }
  },
  {
    id: 9,
    mean: "Bắt đầu",
    auto: { k: "始まる", h: "はじまる", r: "hajimaru", ex: "会議が始まる。", exVi: "Cuộc họp bắt đầu.", quiz: "9時に会議が＿＿＿。" },
    trans: { k: "始める", h: "はじめる", r: "hajimeru", ex: "会議を始める。", exVi: "Tôi bắt đầu cuộc họp.", quiz: "そろそろ会議を＿＿＿。" }
  },
  {
    id: 10,
    mean: "Kết thúc",
    auto: { k: "終わる", h: "おわる", r: "owaru", ex: "授業が終わる。", exVi: "Tiết học kết thúc.", quiz: "5時に授業が＿＿＿。" },
    trans: { k: "終える", h: "おえる", r: "oeru", ex: "仕事を終える。", exVi: "Tôi kết thúc công việc.", quiz: "定時までに仕事を＿＿＿。" }
  },
  {
    id: 11,
    mean: "Hỏng",
    auto: { k: "壊れる", h: "こわれる", r: "kowareru", ex: "パソコンが壊れた。", exVi: "Máy tính bị hỏng.", quiz: "古くてパソコンが＿＿＿。" },
    trans: { k: "壊す", h: "こわす", r: "kowasu", ex: "おもちゃを壊した。", exVi: "Tôi làm hỏng đồ chơi.", quiz: "子供がおもちゃを＿＿＿。" }
  },
  {
    id: 12,
    mean: "Sửa",
    auto: { k: "直る", h: "なおる", r: "naoru", ex: "時計が直った。", exVi: "Đồng hồ đã được sửa.", quiz: "修理に出して時計が＿＿＿。" },
    trans: { k: "直す", h: "なおす", r: "naosu", ex: "時計を直す。", exVi: "Tôi sửa đồng hồ.", quiz: "壊れた時計を＿＿＿。" }
  },
  {
    id: 13,
    mean: "Thay đổi",
    auto: { k: "変わる", h: "かわる", r: "kawaru", ex: "天気が変わる。", exVi: "Thời tiết thay đổi.", quiz: "午後から天気が＿＿＿。" },
    trans: { k: "変える", h: "かえる", r: "kaeru", ex: "計画を変える。", exVi: "Tôi thay đổi kế hoạch.", quiz: "状況に合わせて計画を＿＿＿。" }
  },
  {
    id: 14,
    mean: "Cong",
    auto: { k: "曲がる", h: "まがる", r: "magaru", ex: "道が曲がる。", exVi: "Con đường uốn cong.", quiz: "ここで道が右に＿＿＿。" },
    trans: { k: "曲げる", h: "まげる", r: "mageru", ex: "足を曲げる。", exVi: "Tôi gập chân lại.", quiz: "膝を＿＿＿。" }
  },
  {
    id: 15,
    mean: "Dài ra",
    auto: { k: "伸びる", h: "のびる", r: "nobiru", ex: "髪が伸びる。", exVi: "Tóc dài ra.", quiz: "切らないで髪が＿＿＿。" },
    trans: { k: "伸ばす", h: "のばす", r: "nobasu", ex: "髪を伸ばす。", exVi: "Tôi để tóc dài.", quiz: "夏なので髪を＿＿＿。" }
  },
  {
    id: 16,
    mean: "Co lại",
    auto: { k: "縮む", h: "ちぢむ", r: "chijimu", ex: "服が縮む。", exVi: "Quần áo bị co lại.", quiz: "お湯で洗って服が＿＿＿。" },
    trans: { k: "縮める", h: "ちぢめる", r: "chijimeru", ex: "距離を縮める。", exVi: "Tôi rút ngắn khoảng cách.", quiz: "二人の距離を＿＿＿。" }
  },
  {
    id: 17,
    mean: "Tăng",
    auto: { k: "増える", h: "ふえる", r: "fueru", ex: "人口が増える。", exVi: "Dân số tăng lên.", quiz: "都市の人口が＿＿＿。" },
    trans: { k: "増やす", h: "ふやす", r: "fuyasu", ex: "貯金を増やす。", exVi: "Tôi làm tăng tiền tiết kiệm.", quiz: "頑張って貯金を＿＿＿。" }
  },
  {
    id: 18,
    mean: "Giảm",
    auto: { k: "減る", h: "へる", r: "heru", ex: "体重が減る。", exVi: "Cân nặng giảm đi.", quiz: "運動して体重が＿＿＿。" },
    trans: { k: "減らす", h: "へらす", r: "herasu", ex: "糖分を減らす。", exVi: "Tôi giảm lượng đường.", quiz: "健康のために糖分を＿＿＿。" }
  },
  {
    id: 19,
    mean: "Tập trung",
    auto: { k: "集まる", h: "あつまる", r: "atsumaru", ex: "人が集まる。", exVi: "Mọi người tập trung.", quiz: "広場に人が＿＿＿。" },
    trans: { k: "集める", h: "あつめる", r: "atsumeru", ex: "資料を集める。", exVi: "Tôi thu thập tài liệu.", quiz: "会議の前に資料を＿＿＿。" }
  },
  {
    id: 20,
    mean: "Rụng / Rải",
    auto: { k: "散る", h: "ちる", r: "chiru", ex: "桜が散る。", exVi: "Hoa anh đào rụng.", quiz: "春になって桜が＿＿＿。" },
    trans: { k: "散らす", h: "ちらす", r: "chirasu", ex: "部屋を散らす。", exVi: "Tôi làm phòng bừa bộn.", quiz: "子供がおもちゃを部屋に＿＿＿。" }
  },
  {
    id: 21,
    mean: "Xếp hàng",
    auto: { k: "並ぶ", h: "ならぶ", r: "narabu", ex: "本が並ぶ。", exVi: "Sách được xếp hàng.", quiz: "棚に本が綺麗に＿＿＿。" },
    trans: { k: "並べる", h: "ならべる", r: "naraberu", ex: "本を並べる。", exVi: "Tôi sắp xếp sách.", quiz: "棚に本を綺麗に＿＿＿。" }
  },
  {
    id: 22,
    mean: "Treo",
    auto: { k: "掛かる", h: "かかる", r: "kakaru", ex: "絵が壁に掛かる。", exVi: "Bức tranh treo trên tường.", quiz: "壁に大きな絵が＿＿＿。" },
    trans: { k: "掛ける", h: "かける", r: "kakeru", ex: "絵を壁に掛ける。", exVi: "Tôi treo bức tranh.", quiz: "壁に大きな絵を＿＿＿。" }
  },
  {
    id: 23,
    mean: "Dính / Gắn",
    auto: { k: "付く", h: "つく", r: "tsuku", ex: "汚れが付く。", exVi: "Vết bẩn dính vào.", quiz: "白いシャツに汚れが＿＿＿。" },
    trans: { k: "付ける", h: "つける", r: "tsukeru", ex: "切手を付ける。", exVi: "Tôi dán tem.", quiz: "はがきに切手を＿＿＿。" }
  },
  {
    id: 24,
    mean: "Rời / Tháo",
    auto: { k: "取れる", h: "とれる", r: "toreru", ex: "ボタンが取れる。", exVi: "Cúc áo bị bung ra.", quiz: "古くてボタンが＿＿＿。" },
    trans: { k: "取る", h: "とる", r: "toru", ex: "ボタンを取る。", exVi: "Tôi tháo cúc áo.", quiz: "新しい服に付け替えるためボタンを＿＿＿。" }
  },
  {
    id: 25,
    mean: "Rơi / Làm rơi",
    auto: { k: "落ちる", h: "おちる", r: "ochiru", ex: "リンゴが落ちる。", exVi: "Quả táo rơi xuống.", quiz: "木からリンゴが＿＿＿。" },
    trans: { k: "落とす", h: "おとす", r: "otosu", ex: "財布を落とす。", exVi: "Tôi làm rơi ví.", quiz: "歩いていて財布を＿＿＿。" }
  },
  {
    id: 26,
    mean: "Băng qua / Đưa",
    auto: { k: "渡る", h: "わたる", r: "wataru", ex: "橋を渡る。", exVi: "Tôi băng qua cầu.", quiz: "信号を待って橋を＿＿＿。" },
    trans: { k: "渡す", h: "わたす", r: "watasu", ex: "手紙を渡す。", exVi: "Tôi đưa thư.", quiz: "彼に直接手紙を＿＿＿。" }
  },
  {
    id: 27,
    mean: "Nhìn thấy / Cho xem",
    auto: { k: "見える", h: "みえる", r: "mieru", ex: "富士山が見える。", exVi: "Tôi nhìn thấy núi Phú Sĩ.", quiz: "天気の良い日に富士山が＿＿＿。" },
    trans: { k: "見せる", h: "みせる", r: "miseru", ex: "写真を見せる。", exVi: "Tôi cho xem ảnh.", quiz: "友達に旅行の写真を＿＿＿。" }
  },
  {
    id: 28,
    mean: "Nghe thấy / Cho nghe",
    auto: { k: "聞こえる", h: "きこえる", r: "kikoeru", ex: "音が聞こえる。", exVi: "Tôi nghe thấy âm thanh.", quiz: "隣の家から音楽が＿＿＿。" },
    trans: { k: "聞かせる", h: "きかせる", r: "kikaseru", ex: "音楽を聞かせる。", exVi: "Tôi cho nghe nhạc.", quiz: "子供に子守唄を＿＿＿。" }
  },
  {
    id: 29,
    mean: "Sôi / Đun sôi",
    auto: { k: "沸く", h: "わく", r: "waku", ex: "お湯が沸く。", exVi: "Nước sôi.", quiz: "やかんのお湯が＿＿＿。" },
    trans: { k: "沸かす", h: "わかす", r: "wakasu", ex: "お湯を沸かす。", exVi: "Tôi đun sôi nước.", quiz: "コーヒーを飲むためお湯を＿＿＿。" }
  },
  {
    id: 30,
    mean: "Nguội / Làm nguội",
    auto: { k: "冷める", h: "さめる", r: "sameru", ex: "コーヒーが冷める。", exVi: "Cà phê nguội đi.", quiz: "置いておくとコーヒーが＿＿＿。" },
    trans: { k: "冷ます", h: "さます", r: "samasu", ex: "コーヒーを冷ます。", exVi: "Tôi làm nguội cà phê.", quiz: "熱いのでコーヒーを＿＿＿。" }
  },
  {
    id: 31,
    mean: "Cháy / Đốt",
    auto: { k: "燃える", h: "もえる", r: "moeru", ex: "木が燃える。", exVi: "Cây cháy.", quiz: "暖炉で木が＿＿＿。" },
    trans: { k: "燃やす", h: "もやす", r: "moyasu", ex: "ゴミを燃やす。", exVi: "Tôi đốt rác.", quiz: "庭で落ち葉を＿＿＿。" }
  },
  {
    id: 32,
    mean: "Ẩn / Giấu",
    auto: { k: "隠れる", h: "かくれる", r: "kakureru", ex: "雲に隠れる。", exVi: "Ẩn sau đám mây.", quiz: "月が雲に＿＿＿。" },
    trans: { k: "隠す", h: "かくす", r: "kakusu", ex: "秘密を隠す。", exVi: "Tôi giấu bí mật.", quiz: "彼に真実を＿＿＿。" }
  },
  {
    id: 33,
    mean: "Còn lại / Để lại",
    auto: { k: "残る", h: "のこる", r: "nokoru", ex: "食べ物が残る。", exVi: "Thức ăn còn thừa.", quiz: "夕食の食べ物が＿＿＿。" },
    trans: { k: "残す", h: "のこす", r: "nokosu", ex: "名前を残す。", exVi: "Tôi để lại tên tuổi.", quiz: "歴史に偉大な名前を＿＿＿。" }
  },
  {
    id: 34,
    mean: "Rút / Nhổ",
    auto: { k: "抜ける", h: "ぬける", r: "nukeru", ex: "歯が抜ける。", exVi: "Răng bị rụng.", quiz: "子供が自然に歯が＿＿＿。" },
    trans: { k: "抜く", h: "ぬく", r: "nuku", ex: "歯を抜く。", exVi: "Tôi nhổ răng.", quiz: "虫歯なので歯を＿＿＿。" }
  },
  {
    id: 35,
    mean: "Đầy / Làm đầy",
    auto: { k: "満ちる", h: "みちる", r: "michiru", ex: "月が満ちる。", exVi: "Trăng tròn đầy.", quiz: "十五夜に月が＿＿＿。" },
    trans: { k: "満たす", h: "みたす", r: "mitasu", ex: "条件を満たす。", exVi: "Tôi đáp ứng điều kiện.", quiz: "応募の条件を＿＿＿。" }
  },
  {
    id: 36,
    mean: "Dừng / Làm dừng",
    auto: { k: "止まる", h: "とまる", r: "tomaru", ex: "車が止まる。", exVi: "Xe dừng lại.", quiz: "信号で車が＿＿＿。" },
    trans: { k: "止める", h: "とめる", r: "tomeru", ex: "車を止める。", exVi: "Tôi dừng xe.", quiz: "赤信号なので車を＿＿＿。" }
  },
  {
    id: 37,
    mean: "Chuyển động",
    auto: { k: "動く", h: "うごく", r: "ugoku", ex: "時計が動く。", exVi: "Đồng hồ chạy.", quiz: "電池を入れて時計が＿＿＿。" },
    trans: { k: "動かす", h: "うごかす", r: "ugokasu", ex: "体を動かす。", exVi: "Tôi vận động cơ thể.", quiz: "健康のために体を＿＿＿。" }
  },
  {
    id: 38,
    mean: "Xoay / Làm xoay",
    auto: { k: "回る", h: "まわる", r: "mawaru", ex: "ファンが回る。", exVi: "Quạt xoay.", quiz: "スイッチを入れるとファンが＿＿＿。" },
    trans: { k: "回す", h: "まわす", r: "mawasu", ex: "ハンドルを回す。", exVi: "Tôi xoay vô lăng.", quiz: "右にハンドルを＿＿＿。" }
  },
  {
    id: 39,
    mean: "Đổ / Làm đổ",
    auto: { k: "倒れる", h: "たおれる", r: "taoreru", ex: "木が倒れる。", exVi: "Cây đổ.", quiz: "強風で木が＿＿＿。" },
    trans: { k: "倒す", h: "たおす", r: "taosu", ex: "木を倒す。", exVi: "Tôi đốn cây.", quiz: "邪魔な木を＿＿＿。" }
  },
  {
    id: 40,
    mean: "Đứng / Dựng",
    auto: { k: "立つ", h: "たつ", r: "tatsu", ex: "ビルが立つ。", exVi: "Tòa nhà được dựng lên.", quiz: "ここに新しいビルが＿＿＿。" },
    trans: { k: "立てる", h: "たてる", r: "tateru", ex: "ビルを立てる。", exVi: "Tôi xây tòa nhà.", quiz: "新しいビルを＿＿＿。" }
  },
  {
    id: 41,
    mean: "Xuống (xe) / Hạ xuống",
    auto: { k: "下りる", h: "おりる", r: "oriru", ex: "電車から下りる。", exVi: "Tôi xuống tàu.", quiz: "次の駅で電車から＿＿＿。" },
    trans: { k: "下ろす", h: "おろす", r: "orosu", ex: "荷物を下ろす。", exVi: "Tôi hạ hành lý xuống.", quiz: "トラックから荷物を＿＿＿。" }
  },
  {
    id: 42,
    mean: "Đi qua / Cho qua",
    auto: { k: "通る", h: "とおる", r: "tooru", ex: "道が通る。", exVi: "Con đường đi qua.", quiz: "この道は駅前に＿＿＿。" },
    trans: { k: "通す", h: "とおす", r: "toosu", ex: "人を通す。", exVi: "Tôi cho người đi qua.", quiz: "針に糸を＿＿＿。" }
  },
  {
    id: 43,
    mean: "Tiếp tục",
    auto: { k: "続く", h: "つづく", r: "tsuzuku", ex: "道が続く。", exVi: "Con đường tiếp tục.", quiz: "山道はまだ＿＿＿。" },
    trans: { k: "続ける", h: "つづける", r: "tsuzukeru", ex: "仕事を続ける。", exVi: "Tôi tiếp tục công việc.", quiz: "明日もこの仕事を＿＿＿。" }
  },
  {
    id: 44,
    mean: "Cắt / Đứt",
    auto: { k: "切れる", h: "きれる", r: "kireru", ex: "糸が切れる。", exVi: "Sợi chỉ bị đứt.", quiz: "古くて糸が＿＿＿。" },
    trans: { k: "切る", h: "きる", r: "kiru", ex: "糸を切る。", exVi: "Tôi cắt sợi chỉ.", quiz: "ハサミで糸を＿＿＿。" }
  },
  {
    id: 45,
    mean: "Vỡ / Làm vỡ",
    auto: { k: "割れる", h: "われる", r: "wareru", ex: "ガラスが割れる。", exVi: "Kính bị vỡ.", quiz: "ボールが当たってガラスが＿＿＿。" },
    trans: { k: "割る", h: "わる", r: "waru", ex: "ガラスを割る。", exVi: "Tôi làm vỡ kính.", quiz: "子供がボールでガラスを＿＿＿。" }
  },
  {
    id: 46,
    mean: "Gãy / Làm gãy",
    auto: { k: "折れる", h: "おれる", r: "oreru", ex: "枝が折れる。", exVi: "Cành cây bị gãy.", quiz: "雪の重みで枝が＿＿＿。" },
    trans: { k: "折る", h: "おる", r: "oru", ex: "枝を折る。", exVi: "Tôi bẻ cành cây.", quiz: "子供が木の枝を＿＿＿。" }
  },
  {
    id: 47,
    mean: "Lỏng / Làm lỏng",
    auto: { k: "緩む", h: "ゆるむ", r: "yurumu", ex: "ネジが緩む。", exVi: "Ốc bị lỏng.", quiz: "振動でネジが＿＿＿。" },
    trans: { k: "緩める", h: "ゆるめる", r: "yurumeru", ex: "ネジを緩める。", exVi: "Tôi vặn lỏng ốc.", quiz: "ドライバーでネジを＿＿＿。" }
  },
  {
    id: 48,
    mean: "Thắt chặt / Đóng",
    auto: { k: "締まる", h: "しまる", r: "shimaru", ex: "ドアが締まる。", exVi: "Cửa được khép kín.", quiz: "風でドアがちゃんと＿＿＿。" },
    trans: { k: "締める", h: "しめる", r: "shimeru", ex: "ドアを締める。", exVi: "Tôi đóng cửa.", quiz: "出かける時にドアを＿＿＿。" }
  },
  {
    id: 49,
    mean: "Tan chảy",
    auto: { k: "溶ける", h: "とける", r: "tokeru", ex: "氷が溶ける。", exVi: "Băng tan chảy.", quiz: "暖かくなって氷が＿＿＿。" },
    trans: { k: "溶かす", h: "とかす", r: "tokasu", ex: "氷を溶かす。", exVi: "Tôi làm tan băng.", quiz: "お湯で氷を＿＿＿。" }
  },
  {
    id: 50,
    mean: "Đóng băng",
    auto: { k: "凍る", h: "こおる", r: "kooru", ex: "水が凍る。", exVi: "Nước đóng băng.", quiz: "冬になって水が＿＿＿。" },
    trans: { k: "凍らせる", h: "こおらせる", r: "kooraseru", ex: "水を凍らせる。", exVi: "Tôi làm đông lạnh nước.", quiz: "アイスを作るために水を＿＿＿。" }
  },
  {
    id: 51,
    mean: "Khô / Làm khô",
    auto: { k: "乾く", h: "かわく", r: "kawaku", ex: "服が乾く。", exVi: "Quần áo khô.", quiz: "天気が良くて服が＿＿＿。" },
    trans: { k: "乾かす", h: "かわかす", r: "kawakasu", ex: "服を乾かす。", exVi: "Tôi làm khô quần áo.", quiz: "ドライヤーで髪を＿＿＿。" }
  },
  {
    id: 52,
    mean: "Ướt / Làm ướt",
    auto: { k: "濡れる", h: "ぬれる", r: "nureru", ex: "服が濡れる。", exVi: "Quần áo bị ướt.", quiz: "雨で服が＿＿＿。" },
    trans: { k: "濡らす", h: "ぬらす", r: "nurasu", ex: "服を濡らす。", exVi: "Tôi làm ướt quần áo.", quiz: "子供が水で服を＿＿＿。" }
  },
  {
    id: 53,
    mean: "Bẩn / Làm bẩn",
    auto: { k: "汚れる", h: "よごれる", r: "yogoreru", ex: "シャツが汚れる。", exVi: "Áo sơ mi bị bẩn.", quiz: "泥でシャツが＿＿＿。" },
    trans: { k: "汚す", h: "よごす", r: "yogosu", ex: "シャツを汚す。", exVi: "Tôi làm bẩn áo sơ mi.", quiz: "子供が泥でシャツを＿＿＿。" }
  },
  {
    id: 54,
    mean: "Trộn lẫn / Trộn",
    auto: { k: "混ざる", h: "まざる", r: "mazaru", ex: "水と油が混ざる。", exVi: "Nước và dầu trộn lẫn.", quiz: "よく振ると水と油が＿＿＿。" },
    trans: { k: "混ぜる", h: "まぜる", r: "mazeru", ex: "水と油を混ぜる。", exVi: "Tôi trộn nước và dầu.", quiz: "ボウルで材料を＿＿＿。" }
  },
  {
    id: 55,
    mean: "Chồng lên",
    auto: { k: "重なる", h: "かさなる", r: "kasanaru", ex: "本が重なる。", exVi: "Sách chồng lên nhau.", quiz: "本が山のように＿＿＿。" },
    trans: { k: "重ねる", h: "かさねる", r: "kasaneru", ex: "本を重ねる。", exVi: "Tôi chồng sách lên.", quiz: "本を山のように＿＿＿。" }
  },
  {
    id: 56,
    mean: "Nổi / Làm nổi",
    auto: { k: "浮く", h: "うく", r: "uku", ex: "ボートが浮く。", exVi: "Thuyền nổi.", quiz: "水にボートが＿＿＿。" },
    trans: { k: "浮かべる", h: "うかべる", r: "ukaberu", ex: "ボートを浮かべる。", exVi: "Tôi thả thuyền nổi.", quiz: "池にボートを＿＿＿。" }
  },
  {
    id: 57,
    mean: "Chìm / Làm chìm",
    auto: { k: "沈む", h: "しずむ", r: "shizumu", ex: "船が沈む。", exVi: "Tàu chìm.", quiz: "台風で船が＿＿＿。" },
    trans: { k: "沈める", h: "しずめる", r: "shizumeru", ex: "船を沈める。", exVi: "Tôi đánh chìm tàu.", quiz: "敵の船を＿＿＿。" }
  },
  {
    id: 58,
    mean: "Bay / Làm bay",
    auto: { k: "飛ぶ", h: "とぶ", r: "tobu", ex: "鳥が飛ぶ。", exVi: "Chim bay.", quiz: "空を鳥が＿＿＿。" },
    trans: { k: "飛ばす", h: "とばす", r: "tobasu", ex: "紙飛行機を飛ばす。", exVi: "Tôi thả máy bay giấy.", quiz: "公園で紙飛行機を＿＿＿。" }
  },
  {
    id: 59,
    mean: "Tiến lên",
    auto: { k: "進む", h: "すすむ", r: "susumu", ex: "時計が進む。", exVi: "Đồng hồ chạy nhanh lên.", quiz: "私の時計は5分＿＿＿。" },
    trans: { k: "進める", h: "すすめる", r: "susumeru", ex: "計画を進める。", exVi: "Tôi tiến hành kế hoạch.", quiz: "会議で計画を＿＿＿。" }
  },
  {
    id: 60,
    mean: "Xuất hiện",
    auto: { k: "現れる", h: "あらわれる", r: "arawareru", ex: "星が現れる。", exVi: "Ngôi sao xuất hiện.", quiz: "夜になって星が＿＿＿。" },
    trans: { k: "現す", h: "あらわす", r: "arawasu", ex: "実力を現す。", exVi: "Tôi thể hiện thực lực.", quiz: "試合で自分の実力を＿＿＿。" }
  },
  {
    id: 61,
    mean: "Sinh ra",
    auto: { k: "生まれる", h: "うまれる", r: "umareru", ex: "赤ちゃんが生まれる。", exVi: "Em bé được sinh ra.", quiz: "春に子猫が＿＿＿。" },
    trans: { k: "生む", h: "うむ", r: "umu", ex: "赤ちゃんを産む。", exVi: "Tôi sinh em bé.", quiz: "病院で赤ちゃんを＿＿＿。" }
  },
  {
    id: 62,
    mean: "Lớn lên / Nuôi",
    auto: { k: "育つ", h: "そだつ", r: "sodatsu", ex: "子供が育つ。", exVi: "Trẻ em lớn lên.", quiz: "愛情を受けて子供が＿＿＿。" },
    trans: { k: "育てる", h: "そだてる", r: "sodateru", ex: "子供を育てる。", exVi: "Tôi nuôi dạy trẻ em.", quiz: "親が愛情を持って子供を＿＿＿。" }
  },
  {
    id: 63,
    mean: "Vang lên",
    auto: { k: "響く", h: "ひびく", r: "hibiku", ex: "音が響く。", exVi: "Âm thanh vang lên.", quiz: "教会でベルの音が＿＿＿。" },
    trans: { k: "響かせる", h: "ひびかせる", r: "hibikaseru", ex: "ベルを響かせる。", exVi: "Tôi làm chuông vang lên.", quiz: "力強くベルを＿＿＿。" }
  },
  {
    id: 64,
    mean: "Chạm / Áp vào",
    auto: { k: "当たる", h: "あたる", r: "ataru", ex: "ボールが壁に当たる。", exVi: "Bóng chạm vào tường.", quiz: "強く投げたらボールが壁に＿＿＿。" },
    trans: { k: "当てる", h: "あてる", r: "ateru", ex: "ボールを壁に当てる。", exVi: "Tôi ném bóng vào tường.", quiz: "子供がボールを壁に＿＿＿。" }
  },
  {
    id: 65,
    mean: "Tuột ra / Tháo ra",
    auto: { k: "外れる", h: "はずれる", r: "hazureru", ex: "ボタンが外れる。", exVi: "Cúc áo tuột ra.", quiz: "古くてボタンが＿＿＿。" },
    trans: { k: "外す", h: "はずす", r: "hazusu", ex: "ボタンを外す。", exVi: "Tôi tháo cúc áo.", quiz: "洗濯の前にボタンを＿＿＿。" }
  },
  {
    id: 66,
    mean: "Nối / Gắn kết",
    auto: { k: "繋がる", h: "つながる", r: "tsunagaru", ex: "道が繋がる。", exVi: "Con đường được nối.", quiz: "この道はメインストリートに＿＿＿。" },
    trans: { k: "繋ぐ", h: "つなぐ", r: "tsunagu", ex: "手を繋ぐ。", exVi: "Tôi nắm tay.", quiz: "子供と手を＿＿＿。" }
  },
  {
    id: 67,
    mean: "Tách ra / Tách",
    auto: { k: "離れる", h: "はなれる", r: "hanareru", ex: "二人が離れる。", exVi: "Hai người tách ra.", quiz: "電車で二人の席が＿＿＿。" },
    trans: { k: "離す", h: "はなす", r: "hanasu", ex: "手を離す。", exVi: "Tôi buông tay.", quiz: "危ないから子供の手を＿＿＿。" }
  },
  {
    id: 68,
    mean: "Tràn ra / Làm tràn",
    auto: { k: "溢れる", h: "あふれる", r: "afureru", ex: "水が溢れる。", exVi: "Nước tràn ra.", quiz: "コップに水が＿＿＿。" },
    trans: { k: "溢れさせる", h: "あふれさせる", r: "afuresaseru", ex: "水を溢れさせる。", exVi: "Tôi làm nước tràn ra.", quiz: "入れすぎて水を＿＿＿。" }
  },
  {
    id: 69,
    mean: "Đóng (khóa)",
    auto: { k: "閉まる", h: "しまる", r: "shimaru", ex: "鍵が閉まる。", exVi: "Khóa được đóng.", quiz: "ドアの鍵がちゃんと＿＿＿。" },
    trans: { k: "閉める", h: "しめる", r: "shimeru", ex: "鍵を閉める。", exVi: "Tôi khóa cửa.", quiz: "出かける時に鍵を＿＿＿。" }
  },
  {
    id: 70,
    mean: "Mở (khóa)",
    auto: { k: "開く", h: "あく", r: "aku", ex: "鍵が開く。", exVi: "Khóa được mở.", quiz: "パスワードを入力すると鍵が＿＿＿。" },
    trans: { k: "開ける", h: "あける", r: "akeru", ex: "鍵を開ける。", exVi: "Tôi mở khóa.", quiz: "合鍵でドアの鍵を＿＿＿。" }
  }
];
