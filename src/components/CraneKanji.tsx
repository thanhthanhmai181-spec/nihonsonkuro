import React, { useEffect, useRef, useState } from "react";
import { playSound } from "../utils/audio";
import { UserProgress } from "../types";
import { Home, Play, RefreshCw, Volume2, VolumeX, Award } from "lucide-react";

interface CraneKanjiProps {
  onGoBack: () => void;
  progress: UserProgress;
  updateProgress: (updated: Partial<UserProgress>) => void;
}

interface KanjiVocab {
  prompt: string;
  correct: string;
  wrong: string;
}

interface StageConfig {
  level: number;
  name: string;
  bgColor: { start: string; mid: string; end: string };
  moonOrSun: "sun" | "moon" | "sakurasun";
  vocab: KanjiVocab[];
}

// Fixed spelling/content typos from original dataset
const stagesData: StageConfig[] = [
  {
    level: 1,
    name: "Màn 1: Số đếm & Thời gian",
    bgColor: { start: "#fbf1da", mid: "#fdd49e", end: "#f6a76c" }, 
    moonOrSun: "sun",
    vocab: [
      { prompt: "いち (Một)", correct: "一", wrong: "二" },
      { prompt: "いちじ (Một giờ)", correct: "一時", wrong: "一寺" },
      { prompt: "いっぷん (Một phút)", correct: "一分", wrong: "一刀" },
      { prompt: "ひとつ (Một cái)", correct: "一つ", wrong: "一っ" },
      { prompt: "ひとり (Một người)", correct: "一人", wrong: "一入" },
      { prompt: "にじ (Hai giờ)", correct: "二時", wrong: "二寺" },
      { prompt: "にがつ (Tháng hai)", correct: "二月", wrong: "二日" },
      { prompt: "じなん (Con trai thứ hai)", correct: "二男", wrong: "二女" },
      { prompt: "ふたつ (Hai cái)", correct: "二つ", wrong: "二っ" },
      { prompt: "ふたり (Hai người)", correct: "二人", wrong: "二入" },
      { prompt: "ふつか (Ngày mùng hai)", correct: "二日", wrong: "二月" },
      { prompt: "さん (Ba)", correct: "三", wrong: "川" },
      { prompt: "さんじ (Ba giờ)", correct: "三時", wrong: "三寺" },
      { prompt: "さんにん (Ba người)", correct: "三人", wrong: "三入" },
      { prompt: "みっつ (Ba cái)", correct: "三つ", wrong: "三っ" },
      { prompt: "みっか (Ngày mùng ba)", correct: "三日", wrong: "三月" },
      { prompt: "しがつ (Tháng tư)", correct: "四月", wrong: "四日" },
      { prompt: "しこく (Đảo Shikoku)", correct: "四国", wrong: "西国" },
      { prompt: "し / よん (Bốn)", correct: "四", wrong: "西" },
      { prompt: "よにん (Bốn người)", correct: "四人", wrong: "四入" },
      { prompt: "よっつ (Bốn cái)", correct: "四つ", wrong: "四っ" },
      { prompt: "ご (Năm)", correct: "五", wrong: "吾" },
      { prompt: "ごねん (Năm năm)", correct: "五年", wrong: "五手" },
      { prompt: "ごじ (Năm giờ)", correct: "五時", wrong: "五寺" },
      { prompt: "いつつ (Năm cái)", correct: "五つ", wrong: "五っ" },
      { prompt: "いつか (Ngày mùng năm)", correct: "五日", wrong: "五月" },
      { prompt: "ろく (Sáu)", correct: "六", wrong: "介" },
      { prompt: "じゅうろく (Mười sáu)", correct: "十六", wrong: "十介" },
      { prompt: "ろくじゅう (Sáu mươi)", correct: "六十", wrong: "介十" },
      { prompt: "むっつ (Sáu cái)", correct: "六つ", wrong: "六っ" },
      { prompt: "むいか (Ngày mùng sáu)", correct: "六日", wrong: "六月" },
      { prompt: "しchじ (Bảy giờ)", correct: "七時", wrong: "七寺" },
      { prompt: "しちがつ (Tháng bảy)", correct: "七月", wrong: "七日" },
      { prompt: "しちじはん (Bảy giờ rưỡi)", correct: "七時半", wrong: "七寺半" },
      { prompt: "ななつ (Bảy cái)", correct: "七つ", wrong: "七っ" },
      { prompt: "なのか (Ngày mùng bảy)", correct: "七日", wrong: "七月" },
      { prompt: "はち (Tám)", correct: "八", wrong: "人" },
      { prompt: "はちがつ (Tháng tám)", correct: "八月", wrong: "八日" },
      { prompt: "はちにん (Tám người)", correct: "八人", wrong: "八入" },
      { prompt: "やっつ (Tám cái)", correct: "八つ", wrong: "八っ" },
      { prompt: "ようか (Ngày mùng tám)", correct: "八日", wrong: "八月" },
      { prompt: "く / きゅう (Chín)", correct: "九", wrong: "丸" },
      { prompt: "きゅうにん (Chín người)", correct: "九人", wrong: "九入" },
      { prompt: "くがつ (Tháng chín)", correct: "九月", wrong: "九日" },
      { prompt: "ここのつ (Chín cái)", correct: "九つ", wrong: "九っ" },
      { prompt: "ここのか (Ngày mùng chín)", correct: "九日", wrong: "九月" },
      { prompt: "さんじゅう (Ba mươi)", correct: "三十", wrong: "川十" },
      { prompt: "じゅっぷん (Mười phút/Đầy đủ)", correct: "十分", wrong: "十刀" },
      { prompt: "じっぷん (Mười phút)", correct: "十分", wrong: "十人" },
      { prompt: "とお (Mười cái)", correct: "十", wrong: "千" },
      { prompt: "とおか (Ngày mùng mười)", correct: "十日", wrong: "十月" },
      { prompt: "ひゃく (Một trăm)", correct: "百", wrong: "白" },
      { prompt: "さんびゃく (Ba trăm)", correct: "三百", wrong: "川百" },
      { prompt: "ろっぴゃく (Sáu trăm)", correct: "六百", wrong: "介百" },
      { prompt: "せん (Một nghìn)", correct: "千", wrong: "干" },
      { prompt: "さんぜん (Ba nghìn)", correct: "三千", wrong: "川千" },
      { prompt: "ちば (Tỉnh Chiba)", correct: "千葉", wrong: "干葉" },
      { prompt: "いちまん (Mười nghìn)", correct: "一万", wrong: "一方" },
      { prompt: "まんいち (Nếu lỡ)", correct: "万一", wrong: "方一" },
      { prompt: "ばんじ (Vạn sự)", correct: "万事", wrong: "方事" },
      { prompt: "えn (Yên Nhật/Tròn)", correct: "円", wrong: "同" },
      { prompt: "えんだか (Yên lên giá)", correct: "円高", wrong: "同高" },
      { prompt: "じんこう (Dân số)", correct: "人口", wrong: "人品" },
      { prompt: "くでん (Truyền khẩu)", correct: "口伝", wrong: "日伝" },
      { prompt: "くち (Miệng)", correct: "口", wrong: "日" },
      { prompt: "deぐち (Lối ra)", correct: "出口", wrong: "出日" },
      { prompt: "もくてき (Mục đích)", correct: "目的", wrong: "耳的" },
      { prompt: "めんもく (Thể diện)", correct: "面目", wrong: "面耳" },
      { prompt: "め (Mắt)", correct: "目", wrong: "耳" },
      { prompt: "まぶた (Mí mắt)", correct: "目蓋", wrong: "耳蓋" },
      { prompt: "なんにち (Ngày mấy)", correct: "何日", wrong: "向日" },
      { prompt: "にほん (Nhật Bản)", correct: "日本", wrong: "日木" },
      { prompt: "きゅうじつ (Ngày nghỉ)", correct: "休日", wrong: "休目" },
      { prompt: "ははのひ (Ngày của Mẹ)", correct: "母の日", wrong: "毎の日" },
      { prompt: "げつようび (Thứ hai)", correct: "月曜日", wrong: "目曜日" },
      { prompt: "よっか (Ngày mùng bốn)", correct: "四日", wrong: "四目" },
      { prompt: "らいげつ (Tháng sau)", correct: "来月", wrong: "来目" },
      { prompt: "いっかげつ (Một tháng)", correct: "一ヶ月", wrong: "一ヶ目" },
      { prompt: "つき (Mặt trăng/Tháng)", correct: "月", wrong: "目" },
      { prompt: "まいつき (Mỗi tháng)", correct: "毎月", wrong: "毎目" },
      { prompt: "かじ (Hỏa hoạn)", correct: "火事", wrong: "大事" },
      { prompt: "かようび (Thứ ba)", correct: "火曜日", wrong: "人曜日" },
      { prompt: "かざん (Núi lửa)", correct: "火山", wrong: "火出" },
      { prompt: "ひ (Lửa)", correct: "火", wrong: "人" },
      { prompt: "はなび (Pháo hoa)", correct: "花火", wrong: "花人" },
      { prompt: "すいようび (Thứ tư)", correct: "水曜日", wrong: "氷曜日" },
      { prompt: "すいどう (Nước máy)", correct: "水道", wrong: "氷道" },
      { prompt: "すいえい (Bơi lội)", correct: "水泳", wrong: "永泳" },
      { prompt: "みず (Nước)", correct: "水", wrong: "氷" },
      { prompt: "はなみず (Nước mũi)", correct: "鼻水", wrong: "鼻氷" },
      { prompt: "もくようび (Thứ năm)", correct: "木曜日", wrong: "本曜日" },
      { prompt: "たいぼく (Cây lớn)", correct: "大木", wrong: "大本" },
      { prompt: "き (Cây)", correct: "木", wrong: "本" },
      { prompt: "きむら (Họ Kimura)", correct: "木村", wrong: "本村" },
      { prompt: "きんようび (Thứ sáu)", correct: "金曜日", wrong: "全曜日" },
      { prompt: "げんきん (Tiền mặt)", correct: "現金", wrong: "現全" },
      { prompt: "おかね (Tiền)", correct: "お金", wrong: "お全" },
      { prompt: "かねけ (Vị sắt/Kim loại)", correct: "金気", wrong: "全気" },
      { prompt: "どようび (Thứ bảy)", correct: "土曜日", wrong: "士曜日" },
      { prompt: "どじん (Thổ dân)", correct: "土人", wrong: "士人" },
      { prompt: "とち (Đất đai)", correct: "土地", wrong: "士地" },
      { prompt: "つち (Đất)", correct: "土", wrong: "士" },
      { prompt: "おみяげ (Quà lưu niệm)", correct: "お土産", wrong: "お土屋" },
      { prompt: "ようび (Thứ trong tuần)", correct: "曜日", wrong: "曜目" },
      { prompt: "ほん (Sách)", correct: "本", wrong: "木" },
      { prompt: "ほんじつ (Hôm nay)", correct: "本日", wrong: "本目" },
      { prompt: "まつもと (Họ Matsumoto)", correct: "松本", wrong: "松木" },
      { prompt: "なんにん (Mấy người)", correct: "何人", wrong: "何入" },
      { prompt: "ベトナムじん (Người VN)", correct: "ベトナム人", wrong: "ベトナム入" },
      { prompt: "ひと (Người)", correct: "人", wrong: "入" },
      { prompt: "ひとびと (Mọi người)", correct: "人々", wrong: "入々" },
      { prompt: "こんしゅう (Tuần này)", correct: "今週", wrong: "介週" },
      { prompt: "こんげつ (Tháng này)", correct: "今月", wrong: "今目" },
      { prompt: "いま (Bây giờ)", correct: "今", wrong: "介" },
      { prompt: "ことし (Năm nay)", correct: "今年", wrong: "今手" },
      { prompt: "きょう (Hôm nay)", correct: "今日", wrong: "今目" },
      { prompt: "～じ (Chùa...)", correct: "～寺", wrong: "～侍" },
      { prompt: "おてら (Chùa)", correct: "お寺", wrong: "お侍" },
      { prompt: "じ (Giờ)", correct: "時", wrong: "待" },
      { prompt: "じかん (Thời gian)", correct: "時間", wrong: "時門" },
      { prompt: "じだい (Thời đại)", correct: "時代", wrong: "待代" }
    ]
  },
  {
    level: 2,
    name: "Màn 2: Vị trí & Thiên nhiên",
    bgColor: { start: "#3a506b", mid: "#1c2541", end: "#0b132b" }, 
    moonOrSun: "moon",
    vocab: [
      { prompt: "とき (Khi/Lúc)", correct: "時", wrong: "特" },
      { prompt: "ときどき (Thỉnh thoảng)", correct: "時々", wrong: "待々" },
      { prompt: "とけい (Đồng hồ)", correct: "時計", wrong: "待計" },
      { prompt: "はんぶん (Một nửa)", correct: "半分", wrong: "平分" },
      { prompt: "はんとし (Nửa năm)", correct: "半年", wrong: "平年" },
      { prompt: "さんじはん (3 giờ rưỡi)", correct: "3時半", wrong: "3時平" },
      { prompt: "たんとう (Đoản đao)", correct: "短刀", wrong: "短力" },
      { prompt: "かたな (Thanh kiếm)", correct: "刀", wrong: "力" },
      { prompt: "ふん/ぶん (Phút/Phần)", correct: "分", wrong: "介" },
      { prompt: "わかる (Hiểu)", correct: "分かる", wrong: "介かる" },
      { prompt: "わける (Chia ra)", correct: "分ける", wrong: "介ける" },
      { prompt: "わかれる (Bị chia rẽ)", correct: "分かれる", wrong: "介かれる" },
      { prompt: "じょうず (Giỏi)", correct: "上手", wrong: "下手" },
      { prompt: "じょうひん (Tao nhã)", correct: "上品", wrong: "下品" },
      { prompt: "あげる (Nâng lên/Cho)", correct: "上げる", wrong: "下げる" },
      { prompt: "あがる (Tăng lên)", correct: "上がる", wrong: "下がる" },
      { prompt: "うえ (Bên trên)", correct: "上", wrong: "下" },
      { prompt: "ぶか (Cấp dưới)", correct: "部下", wrong: "部上" },
      { prompt: "げひん (Tầm thường)", correct: "下品", wrong: "上品" },
      { prompt: "げしゃ (Xuống xe)", correct: "下車", wrong: "上車" },
      { prompt: "さげる (Hạ xuống)", correct: "下げる", wrong: "上げる" },
      { prompt: "さがる (Hạ xuống/Giảm)", correct: "下がる", wrong: "上げる" },
      { prompt: "した (Bên dưới)", correct: "下", wrong: "上" },
      { prompt: "きゅうけいちゅう (Đang nghỉ)", correct: "休憩中", wrong: "休憩内" },
      { prompt: "ちゅうごく (Trung Quốc)", correct: "中国", wrong: "内国" },
      { prompt: "こくじゅう (Khắp cả nước)", correct: "国中", wrong: "国内" },
      { prompt: "なか (Bên trong)", correct: "中", wrong: "内" },
      { prompt: "たなかさん (Họ Tanaka)", correct: "田中", wrong: "田内" },
      { prompt: "がいこく (Nước ngoài)", correct: "外国", wrong: "処国" },
      { prompt: "いがい (Ngoài ra)", correct: "以外", wrong: "以処" },
      { prompt: "げか (Ngoại khoa)", correct: "外科", wrong: "処科" },
      { prompt: "そと (Bên ngoài)", correct: "外", wrong: "処" },
      { prompt: "はずれる (Tuột ra)", correct: "外れる", wrong: "処れる" },
      { prompt: "とざま (Người ngoài)", correct: "外様", wrong: "処様" },
      { prompt: "うせつ (Rẽ phải)", correct: "右折", wrong: "石折" },
      { prompt: "さゆう (Trái phải)", correct: "左右", wrong: "左石" },
      { prompt: "みぎ (Phía bên phải)", correct: "右", wrong: "石" },
      { prompt: "みぎて (Tay phải)", correct: "右手", wrong: "石手" },
      { prompt: "みぎあし (Chân phải)", correct: "右足", wrong: "石足" },
      { prompt: "こうじょう (Nhà máy)", correct: "工場", wrong: "土場" },
      { prompt: "こうじ (Công trình)", correct: "工事", wrong: "土事" },
      { prompt: "くふう (Công phu/Mày mò)", correct: "工夫", wrong: "土夫" },
      { prompt: "させつ (Rẽ trái)", correct: "左折", wrong: "在折" },
      { prompt: "ひだり (Phía bên trái)", correct: "左", wrong: "在" },
      { prompt: "ひだりめ (Mắt trái)", correct: "左目", wrong: "在目" },
      { prompt: "ごぜん (Sáng/AM)", correct: "午前", wrong: "午煎" },
      { prompt: "じぜん (Trước tiên)", correct: "事前", wrong: "事煎" },
      { prompt: "まえ (Phía trước)", correct: "前", wrong: "揃" },
      { prompt: "なまえ (Tên)", correct: "名前", wrong: "名揃" },
      { prompt: "おまえ (Mày/Cậu)", correct: "お前", wrong: "お揃" },
      { prompt: "ごご (Chiều/PM)", correct: "午後", wrong: "午役" },
      { prompt: "sanねんご (3 năm sau)", correct: "３年後", wrong: "３年役" },
      { prompt: "こうhai (Hậu bối/Cấp dưới)", correct: "後輩", wrong: "役輩" },
      { prompt: "うしろ (Phía sau)", correct: "後ろ", wrong: "役ろ" },
      { prompt: "あとで (Để sau)", correct: "後で", wrong: "役で" },
      { prompt: "うま (Giờ ngọ)", correct: "午", wrong: "牛" },
      { prompt: "うまどし (Năm Ngọ)", correct: "午年", wrong: "牛年" },
      { prompt: "もん (Cổng)", correct: "門", wrong: "問" },
      { prompt: "にゅうもん (Nhập môn)", correct: "入門", wrong: "入問" },
      { prompt: "せんもん (Chuyên môn)", correct: "専門", wrong: "専問" },
      { prompt: "かどぐち (Lối ra vào)", correct: "門口", wrong: "問口" },
      { prompt: "しゅうかん (Số tuần)", correct: "週間", wrong: "週問" },
      { prompt: "にんげん (Con người)", correct: "人間", wrong: "人問" },
      { prompt: "あいだ (Ở giữa)", correct: "間", wrong: "門" },
      { prompt: "まにあう (Kịp thời)", correct: "間に合う", wrong: "門に合う" },
      { prompt: "とうなんアジア (Đông Nam Á)", correct: "東南アジア", wrong: "車南アジア" },
      { prompt: "とうきょう (Tokyo)", correct: "東京", wrong: "車京" },
      { prompt: "ひがし (Phía Đông)", correct: "東", wrong: "車" },
      { prompt: "ひがしぐち (Cửa Đông)", correct: "東口", wrong: "車口" },
      { prompt: "ひがしがわ (Phía bên Đông)", correct: "東側", wrong: "車側" },
      { prompt: "せいよう (Phương Tây)", correct: "西洋", wrong: "四洋" },
      { prompt: "かんさい (Vùng Kansai)", correct: "関西", wrong: "関四" },
      { prompt: "にし (Phía Tây)", correct: "西", wrong: "四" },
      { prompt: "にしぐち (Cửa Tây)", correct: "西口", wrong: "四口" },
      { prompt: "にしがわ (Phía bên Tây)", correct: "西側", wrong: "四側" },
      { prompt: "なんぶ (Phía Nam)", correct: "南部", wrong: "楠部" },
      { prompt: "みなみ (Phía Nam)", correct: "南", wrong: "楠" },
      { prompt: "みなみぐち (Cửa Nam)", correct: "南口", wrong: "楠口" },
      { prompt: "みなみがわ (Phía bên Nam)", correct: "南側", wrong: "楠側" },
      { prompt: "ほくぶ (Phía Bắc)", correct: "北部", wrong: "比部" },
      { prompt: "とうざいnanぼく (Đông Tây Nam Bắc)", correct: "東西南北", wrong: "車西南北" },
      { prompt: "ほっかいどう (Hokkaido)", correct: "北海道", wrong: "比海道" },
      { prompt: "きた (Phía Bắc)", correct: "北", wrong: "比" },
      { prompt: "きたぐち (Cửa Bắc)", correct: "北口", wrong: "比口" },
      { prompt: "きたく (Quận Bắc)", correct: "北区", wrong: "比区" },
      { prompt: "ほんださん (Họ Honda)", correct: "本田", wrong: "木田" },
      { prompt: "すいでん (Ruộng nước)", correct: "水田", wrong: "氷田" },
      { prompt: "いなか (Nông thôn)", correct: "田舎", wrong: "由舎" },
      { prompt: "のうりょく (Năng lực)", correct: "能力", wrong: "能刀" },
      { prompt: "きょうりょく (Hợp tác)", correct: "協力", wrong: "協刀" },
      { prompt: "りきし (Đô vật Sumo)", correct: "力士", wrong: "刀士" },
      { prompt: "ちから (Sức lực)", correct: "力", wrong: "刀" },
      { prompt: "だんせい (Nam giới)", correct: "男性", wrong: "由性" },
      { prompt: "びなん (Mỹ nam)", correct: "美男", wrong: "美田" },
      { prompt: "おtoこ (Đàn ông)", correct: "男", wrong: "田" },
      { prompt: "おとこのひと (Người đàn ông)", correct: "男の人", wrong: "田の人" },
      { prompt: "じょせい (Nữ giới)", correct: "女性", wrong: "汝性" },
      { prompt: "せんにょ (Tiên nữ)", correct: "仙女", wrong: "仙好" },
      { prompt: "にょうぼう (Vợ)", correct: "女房", wrong: "好房" },
      { prompt: "おんな (Phụ nữ)", correct: "女", wrong: "好" },
      { prompt: "おんなのひと (Người phụ nữ)", correct: "女の人", wrong: "好の人" },
      { prompt: "めがみ (Nữ thần)", correct: "女神", wrong: "好神" },
      { prompt: "だんし (Con trai)", correct: "男子", wrong: "男了" },
      { prompt: "でんし (Điện tử)", correct: "電子", wrong: "電了" },
      { prompt: "いす (Cái ghế)", correct: "椅子", wrong: "椅了" },
      { prompt: "こども (Trẻ em)", correct: "子供", wrong: "了供" },
      { prompt: "おんなのこ (Bé gái)", correct: "女の子", wrong: "女の了" },
      { prompt: "こいぬ (Chó con)", correct: "子犬", wrong: "了犬" },
      { prompt: "がくせい (Học sinh)", correct: "学生", wrong: "学先" },
      { prompt: "がっこう (Trường học)", correct: "学校", wrong: "学枚" },
      { prompt: "だいがく (Đại học)", correct: "大学", wrong: "大字" },
      { prompt: "まなぶ (Học tập)", correct: "学ぶ", wrong: "字ぶ" },
      { prompt: "うむ (Sinh ra/Đẻ)", correct: "生む", wrong: "先む" },
      { prompt: "いきる (Sống)", correct: "生きる", wrong: "先きる" },
      { prompt: "はえる (Mọc tóc/cỏ)", correct: "生える", wrong: "先える" },
      { prompt: "なまにえru (Chưa chín hẳn)", correct: "生煮える", wrong: "先煮える" },
      { prompt: "せんせい (Giáo viên)", correct: "先生", wrong: "先先" },
      { prompt: "しょうが (Gừng)", correct: "生姜", wrong: "先姜" }
    ]
  },
  {
    level: 3,
    name: "Màn 3: Động từ & Tính từ",
    bgColor: { start: "#3d2635", mid: "#2c1a2d", end: "#1a0f22" }, 
    moonOrSun: "sakurasun",
    vocab: [
      { prompt: "せんぱい (Tiền bối)", correct: "先輩", wrong: "生輩" },
      { prompt: "せんげつ (Tháng trước)", correct: "先月", wrong: "生月" },
      { prompt: "せんしゅう (Tuần trước)", correct: "先週", wrong: "生週" },
      { prompt: "さきに (Làm trước)", correct: "先に", wrong: "生に" },
      { prompt: "まず (Trước hết)", correct: "先ず", wrong: "生ず" },
      { prompt: "なんがつ (Tháng mấy)", correct: "何月", wrong: "向月" },
      { prompt: "なんようび (Thứ mấy)", correct: "何曜日", wrong: "向曜日" },
      { prompt: "なに (Cái gì)", correct: "何", wrong: "向" },
      { prompt: "fushi (Bố con)", correct: "父子", wrong: "交子" },
      { prompt: "そふ (Ông nội/ngoại)", correct: "祖父", wrong: "祖交" },
      { prompt: "ちち (Bố của mình)", correct: "父", wrong: "交" },
      { prompt: "ちちおや (Người bố)", correct: "父親", wrong: "交親" },
      { prompt: "おとうさん (Bố lịch sự)", correct: "お父さん", wrong: "お交さん" },
      { prompt: "そぼ (Bà nội/ngoại)", correct: "祖母", wrong: "祖毎" },
      { prompt: "ぼこく (Mẫu quốc)", correct: "母国", wrong: "毎国" },
      { prompt: "ぼご (Tiếng mẹ đẻ)", correct: "母語", wrong: "毎語" },
      { prompt: "はは (Mẹ của mình)", correct: "母", wrong: "毎" },
      { prompt: "ははおや (Người mẹ)", correct: "母親", wrong: "毎親" },
      { prompt: "おかあさん (Mẹ lịch sự)", correct: "お母さん", wrong: "お毎さん" },
      { prompt: "ねん (Năm)", correct: "年", wrong: "手" },
      { prompt: "ねんきん (Lương hưu)", correct: "年金", wrong: "手金" },
      { prompt: "としうえ (Lớn tuổi hơn)", correct: "年上", wrong: "手上" },
      { prompt: "まいとし (Hàng năm)", correct: "毎年", wrong: "毎手" },
      { prompt: "かこ (Quá khứ)", correct: "過去", wrong: "過法" },
      { prompt: "きょねん (Năm ngoái)", correct: "去年", wrong: "去手" },
      { prompt: "さる (Rời khỏi/Qua)", correct: "去る", wrong: "法る" },
      { prompt: "まいにち (Mỗi ngày)", correct: "毎日", wrong: "毎目" },
      { prompt: "まいあさ (Mỗi sáng)", correct: "毎朝", wrong: "毎廟" },
      { prompt: "まいかい (Mỗi lần)", correct: "毎回", wrong: "毎国" },
      { prompt: "ごとに (Mỗi khi)", correct: "毎に", wrong: "無に" },
      { prompt: "こくおう (Quốc vương)", correct: "国王", wrong: "国玉" },
      { prompt: "おうさま (Đức vua)", correct: "王様", wrong: "玉様" },
      { prompt: "じょおう (Nữ hoàng)", correct: "女王", wrong: "女玉" },
      { prompt: "こくない (Trong nước)", correct: "国内", wrong: "国中" },
      { prompt: "くに (Đất nước)", correct: "国", wrong: "玉" },
      { prompt: "くにぐに (Các nước)", correct: "国々", wrong: "玉々" },
      { prompt: "いけん (Ý kiến)", correct: "意見", wrong: "意貝" },
      { prompt: "けんがく (Kiến tập)", correct: "見学", wrong: "貝学" },
      { prompt: "みる (Nhìn/Xem)", correct: "見る", wrong: "貝る" },
      { prompt: "みせる (Cho xem)", correct: "見せる", wrong: "貝せる" },
      { prompt: "みえる (Nhìn thấy)", correct: "見える", wrong: "貝える" },
      { prompt: "りょこう (Du lịch)", correct: "旅行", wrong: "旅術" },
      { prompt: "こうどう (Hành động)", correct: "行動", wrong: "術動" },
      { prompt: "giょう (Hàng/Dòng)", correct: "行", wrong: "術" },
      { prompt: "いく (Đi)", correct: "行く", wrong: "行り" },
      { prompt: "つれていく (Dẫn đi)", correct: "連れて行く", wrong: "連れて行り" },
      { prompt: "おこなう (Tiến hành)", correct: "行う", wrong: "行りう" },
      { prompt: "べいか (Giá gạo)", correct: "米価", wrong: "来価" },
      { prompt: "しんまい (Người mới)", correct: "新米", wrong: "新来" },
      { prompt: "こめ (Gạo)", correct: "米", wrong: "来" },
      { prompt: "もちこめ (Gạo nếp)", correct: "もち米", wrong: "もち来" },
      { prompt: "らいしゅう (Tuần sau)", correct: "来週", wrong: "米週" },
      { prompt: "らいねん (Năm sau)", correct: "来年", wrong: "米年" },
      { prompt: "らいにち (Đến Nhật)", correct: "来日", wrong: "米日" },
      { prompt: "くる (Đến)", correct: "来る", wrong: "米る" },
      { prompt: "もってくる (Mang đến)", correct: "持って来る", wrong: "持って米る" },
      { prompt: "りょうしん (Lương tâm)", correct: "良心", wrong: "食心" },
      { prompt: "ふりょう (Bất lương/Hỏng)", correct: "不良", wrong: "不食" },
      { prompt: "いい/よい (Tốt)", correct: "良い", wrong: "食い" },
      { prompt: "しょくどう (Nhà ăn)", correct: "食堂", wrong: "良堂" },
      { prompt: "しょくじ (Bữa ăn)", correct: "食事", wrong: "良事" },
      { prompt: "ゆうしょく (Bữa tối)", correct: "夕食", wrong: "夕良" },
      { prompt: "たべる (Ăn)", correct: "食べる", wrong: "外べる" },
      { prompt: "くう (Ăn suồng sã)", correct: "食u", wrong: "良う" },
      { prompt: "いんしょく (Ăn uống)", correct: "飲食", wrong: "飲良" },
      { prompt: "いんしゅ (Uống rượu)", correct: "飲酒", wrong: "飲酒っ" },
      { prompt: "のむ (Uống)", correct: "飲む", wrong: "飲むっ" },
      { prompt: "のみもの (Đồ uống)", correct: "飲み物", wrong: "飲物っ" },
      { prompt: "かいしゃ (Công ty)", correct: "会社", wrong: "会杜" },
      { prompt: "かいわ (Hội thoại)", correct: "会話", wrong: "会活" },
      { prompt: "ぼうねんkai (Tiệc tất niên)", correct: "忘年会", wrong: "忘年会社" },
      { prompt: "あう (Gặp gỡ)", correct: "会う", wrong: "合う" },
      { prompt: "ないじ (Tai trong)", correct: "内耳", wrong: "内目" },
      { prompt: "がいじ (Tai ngoài)", correct: "外耳", wrong: "外目" },
      { prompt: "じびか (Tai mũi họng)", correct: "耳鼻科", wrong: "目鼻科" },
      { prompt: "みみ (Tai)", correct: "耳", wrong: "目" },
      { prompt: "しんぶん (Báo chí)", correct: "新聞", wrong: "新問" },
      { prompt: "でんぶん (Tin đồn)", correct: "伝聞", wrong: "伝問" },
      { prompt: "きく (Nghe/Hỏi)", correct: "聞く", wrong: "開く" },
      { prompt: "きこえる (Nghe thấy)", correct: "聞こえる", wrong: "開こえる" },
      { prompt: "げんご (Ngôn ngữ)", correct: "言語", wrong: "吉語" },
      { prompt: "ほうげん (Tiếng địa phương)", correct: "方言", wrong: "方吉" },
      { prompt: "でんごん (Lời nhắn)", correct: "伝言", wrong: "伝吉" },
      { prompt: "いう (Nói)", correct: "言う", wrong: "吉う" },
      { prompt: "いいわけ (Biện bạch)", correct: "言い訳", wrong: "吉い訳" },
      { prompt: "でんわ (Điện thoại)", correct: "電話", wrong: "電活" },
      { prompt: "はなす (Nói chuyện)", correct: "話す", wrong: "活す" },
      { prompt: "はなし (Câu chuyện)", correct: "話", wrong: "活" },
      { prompt: "きりつ (Đứng lên)", correct: "起立", wrong: "起位" },
      { prompt: "こんりゅう (Kiến lập)", correct: "建立", wrong: "建位" },
      { prompt: "たつ (Đứng)", correct: "立つ", wrong: "位つ" },
      { prompt: "たてる (Dựng lên)", correct: "立てる", wrong: "位てる" },
      { prompt: "役に立つ (Có ích)", correct: "役に立つ", wrong: "役に位つ" },
      { prompt: "きたい (Kỳ vọng)", correct: "期待", wrong: "期特" },
      { prompt: "しょうたい (Mời chiêu đãi)", correct: "招待", wrong: "招特" },
      { prompt: "まつ (Chờ đợi)", correct: "待つ", wrong: "特つ" },
      { prompt: "まちあわせ (Hẹn gặp)", correct: "待ち合わせ", wrong: "特合わせ" },
      { prompt: "しゅうへん (Xung quanh)", correct: "周辺", wrong: "同辺" },
      { prompt: "しゅうき (Chu kỳ)", correct: "周期", wrong: "同期" },
      { prompt: "まわり (Xung quanh)", correct: "周り", wrong: "同り" },
      { prompt: "まいしゅう (Hàng tuần)", correct: "毎週", wrong: "毎同" },
      { prompt: "だいすき (Rất thích)", correct: "大好き", wrong: "犬好き" },
      { prompt: "たいせつ (Quan trọng)", correct: "大切", wrong: "犬切" },
      { prompt: "おおきい (To lớn)", correct: "大きい", wrong: "犬きい" },
      { prompt: "おとな (Người lớn)", correct: "大人", wrong: "犬人" },
      { prompt: "しょうがっこう (Trường tiểu học)", correct: "小学校", wrong: "少学校" },
      { prompt: "しょう가くせい (Học sinh tiểu học)", correct: "小学生", wrong: "少学生" },
      { prompt: "ちいさい (Nhỏ bé)", correct: "小さい", wrong: "少さい" },
      { prompt: "こびと (Người lùn)", correct: "小人", wrong: "少人" },
      { prompt: "お가わ (Dòng suối)", correct: "小川", wrong: "少川" },
      { prompt: "さいこう (Cao nhất)", correct: "最高", wrong: "最喬" },
      { prompt: "こうこう (Trường THPT)", correct: "高校", wrong: "喬校" },
      { prompt: "たかい (Cao/Đắt)", correct: "高い", wrong: "喬い" },
      { prompt: "たかめる (Nâng cao)", correct: "高める", wrong: "喬める" },
      { prompt: "たかはしさん (Họ Takahashi)", correct: "高橋", wrong: "喬橋" },
      { prompt: "あんぜん (An toàn)", correct: "安全", wrong: "安金" },
      { prompt: "あんしん (An tâm)", correct: "安心", wrong: "安親" },
      { prompt: "ふあん (Bất an)", correct: "不安", wrong: "不案" },
      { prompt: "やすい (Rẻ)", correct: "安い", wrong: "案い" },
      { prompt: "しんねん (Năm mới)", correct: "新年", wrong: "親年" },
      { prompt: "あたらしい (Mới)", correct: "新しい", wrong: "親しい" },
      { prompt: "ちゅうこ (Đồ cũ)", correct: "中古", wrong: "Chất" },
      { prompt: "こだい (Cổ đại)", correct: "古代", wrong: "舌代" },
      { prompt: "ふるい (Cũ)", correct: "古い", wrong: "舌い" }
    ]
  }
];

class Crane {
  x = 0;
  y = 0;
  vy = 0;
  radius = 12;
  angle = 0;
  gravity = 0.13;
  jumpStrength = -3.7;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth * 0.22;
    this.y = canvasHeight * 0.5;
  }

  update(canvasHeight: number) {
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.vy > 4.2) this.vy = 4.2;
    this.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 8, this.vy * 0.08));

    if (this.y + this.radius > canvasHeight) {
      this.y = canvasHeight - this.radius;
      return true; // Game Over hit floor
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy = 0;
    }
    return false;
  }

  jump() {
    this.vy = this.jumpStrength;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#e63946";
    ctx.lineWidth = 1.8;

    // Body Triangle / Origami style
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.lineTo(-5, -28);
    ctx.lineTo(5, -5);
    ctx.closePath();
    ctx.fillStyle = "#fceade";
    ctx.fill();
    ctx.stroke();

    // Wings
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.lineTo(-5, 8);
    ctx.lineTo(20, -5);
    ctx.lineTo(26, -3);
    ctx.lineTo(18, 5);
    ctx.lineTo(-5, 10);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();

    // Tail/Head structure
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(5, -35);
    ctx.lineTo(12, 2);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();

    // Red Crown of Crane
    ctx.beginPath();
    ctx.arc(3, -24, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = "#e63946";
    ctx.fill();

    ctx.restore();
  }
}

class DoubleWideGate {
  x = 0;
  width = 95;
  question: KanjiVocab;
  isCorrectOnTop = false;
  topText = "";
  bottomText = "";
  topY = 0;
  bottomY = 0;
  passed = false;

  constructor(x: number, canvasHeight: number, question: KanjiVocab) {
    this.x = x;
    this.question = question;
    this.isCorrectOnTop = Math.random() < 0.5;
    this.topText = this.isCorrectOnTop ? question.correct : question.wrong;
    this.bottomText = this.isCorrectOnTop ? question.wrong : question.correct;
    this.topY = canvasHeight * 0.28;
    this.bottomY = canvasHeight * 0.72;
  }

  update(speed: number) {
    this.x -= speed;
  }

  draw(ctx: CanvasRenderingContext2D, canvasHeight: number) {
    const dividerHeight = 14;
    const dividerY = canvasHeight * 0.5 - dividerHeight / 2;

    // Center bar barrier (Red Shinto style)
    ctx.fillStyle = "#b7094c"; 
    ctx.fillRect(this.x, dividerY, this.width, dividerHeight);
    
    ctx.fillStyle = "#111111";
    ctx.fillRect(this.x, dividerY - 1, 6, dividerHeight + 2);
    ctx.fillRect(this.x + this.width - 6, dividerY - 1, 6, dividerHeight + 2);

    // Ceiling and Floor barriers
    ctx.fillRect(this.x, 0, this.width, 6);
    ctx.fillRect(this.x, canvasHeight - 6, this.width, 6);

    this.drawOptionSign(ctx, this.topY, this.topText);
    this.drawOptionSign(ctx, this.bottomY, this.bottomText);
  }

  drawOptionSign(ctx: CanvasRenderingContext2D, laneY: number, text: string) {
    ctx.save();
    ctx.fillStyle = "#fffdf9";
    ctx.strokeStyle = "#3e3d3c";
    ctx.lineWidth = 2.5;

    const boxW = 88;
    const boxH = 48;
    const boxX = this.x + (this.width - boxW) / 2;
    const boxY = laneY - boxH / 2;

    ctx.beginPath();
    // Rounded Rect
    ctx.roundRect(boxX, boxY, boxW, boxH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#111111";
    ctx.font = "bold 24px 'Noto Serif JP', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, this.x + this.width / 2, laneY + 1);
    ctx.restore();
  }

  checkDividerCollision(bird: Crane, canvasHeight: number) {
    const bLeft = bird.x - bird.radius + 3;
    const bRight = bird.x + bird.radius - 3;
    const bTop = bird.y - bird.radius + 3;
    const bBottom = bird.y + bird.radius - 3;

    const dividerHeight = 14;
    const dividerY = canvasHeight * 0.5 - dividerHeight / 2;

    if (bRight > this.x && bLeft < this.x + this.width) {
      if (bTop < 6) return true;
      if (bBottom > canvasHeight - 6) return true;
      if (bBottom > dividerY && bTop < dividerY + dividerHeight) return true;
    }
    return false;
  }

  getChosenLane(birdY: number, canvasHeight: number) {
    return birdY < canvasHeight * 0.5 ? "TOP" : "BOTTOM";
  }
}

class SakuraPetal {
  x = 0;
  y = 0;
  size = 0;
  speedX = 0;
  speedY = 0;
  angle = 0;
  spinSpeed = 0;

  constructor(canvasWidth: number, canvasHeight: number, isInitial = false) {
    this.x = isInitial ? Math.random() * canvasWidth : canvasWidth + Math.random() * 50;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 5 + 4;
    this.speedX = -(Math.random() * 0.55 + 0.3);
    this.speedY = Math.random() * 0.2 + 0.1;
    this.angle = Math.random() * Math.PI * 2;
    this.spinSpeed = Math.random() * 0.012 - 0.006;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.spinSpeed;

    if (this.x < -10 || this.y > canvasHeight + 10) {
      this.x = canvasWidth + Math.random() * 20;
      this.y = -10;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "rgba(255, 183, 197, 0.85)";
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function CraneKanji({ onGoBack, progress, updateProgress }: CraneKanjiProps) {
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "GAMEOVER">("START");
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<KanjiVocab | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // References for game loop values to avoid closure stale state
  const stateRef = useRef({
    gameState: "START",
    score: 0,
    currentStageIdx: 0,
    currentQuestion: null as KanjiVocab | null,
    canvasWidth: 500,
    canvasHeight: 500,
    gameSpeed: 1.2,
    nextGateSpawnCounter: 0,
  });

  const birdRef = useRef<Crane | null>(null);
  const gatesRef = useRef<DoubleWideGate[]>([]);
  const petalsRef = useRef<SakuraPetal[]>([]);

  // Update references on state changes
  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  useEffect(() => {
    stateRef.current.score = score;
  }, [score]);

  useEffect(() => {
    stateRef.current.currentStageIdx = currentStageIdx;
  }, [currentStageIdx]);

  useEffect(() => {
    stateRef.current.currentQuestion = currentQuestion;
  }, [currentQuestion]);

  // Handle local highscore loading
  useEffect(() => {
    const saved = localStorage.getItem("hac_tong_high_score");
    if (saved) {
      setHighScore(parseInt(saved));
    }
  }, []);

  const triggerSound = (type: "jump" | "score" | "hit") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "jump") {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "score") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); 
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); 
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context init failed or blocked:", e);
    }
  };

  const getQuestionForStage = (stageIdx: number): KanjiVocab => {
    const vocabList = stagesData[stageIdx].vocab;
    const randIndex = Math.floor(Math.random() * vocabList.length);
    return vocabList[randIndex];
  };

  const startGame = (stageIdx: number) => {
    playSound.click();
    setCurrentStageIdx(stageIdx);
    setScore(0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const firstQuestion = getQuestionForStage(stageIdx);
    setCurrentQuestion(firstQuestion);

    birdRef.current = new Crane(width, height);
    gatesRef.current = [new DoubleWideGate(width * 1.3, height, firstQuestion)];
    
    // Create Sakura Petals
    const pList: SakuraPetal[] = [];
    for (let i = 0; i < 15; i++) {
      pList.push(new SakuraPetal(width, height, true));
    }
    petalsRef.current = pList;

    stateRef.current.gameSpeed = 1.25;
    stateRef.current.nextGateSpawnCounter = 0;

    setGameState("PLAYING");
  };

  const handleJump = () => {
    if (gameState === "PLAYING" && birdRef.current) {
      birdRef.current.jump();
      triggerSound("jump");
    }
  };

  // Keyboard and click setup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width || 500;
      const h = rect?.height || 500;
      canvas.width = w;
      canvas.height = h;
      stateRef.current.canvasWidth = w;
      stateRef.current.canvasHeight = h;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawBackground = (stageIdx: number, w: number, h: number) => {
      const stage = stagesData[stageIdx];
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, stage.bgColor.start);
      skyGrad.addColorStop(0.55, stage.bgColor.mid);
      skyGrad.addColorStop(1, stage.bgColor.end);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Origami mountains in background
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      if (stage.level === 2) ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      if (stage.level === 3) ctx.fillStyle = "rgba(255, 183, 197, 0.06)";
      
      ctx.beginPath();
      ctx.moveTo(w * 0.05, h);
      ctx.lineTo(w * 0.5, h * 0.5);
      ctx.lineTo(w * 0.95, h);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
      ctx.beginPath();
      ctx.moveTo(w * 0.43, h * 0.57);
      ctx.lineTo(w * 0.5, h * 0.5);
      ctx.lineTo(w * 0.57, h * 0.57);
      ctx.lineTo(w * 0.5, h * 0.6);
      ctx.closePath();
      ctx.fill();

      // Sun or Moon
      if (stage.moonOrSun === "sun") {
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.68, 55, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230, 57, 70, 0.08)";
        ctx.fill();
      } else if (stage.moonOrSun === "moon") {
        ctx.save();
        ctx.translate(w * 0.75, h * 0.25);
        ctx.fillStyle = "#fffdf0";
        ctx.shadowColor = "#fffdf0";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = stage.bgColor.start;
        ctx.beginPath();
        ctx.arc(-8, -4, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Sakurasun (Warm gradient cherry blossom circle)
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.68, 60, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 183, 197, 0.05)";
        ctx.fill();
      }
    };

    const drawFlightGuides = (activeGate: DoubleWideGate, bird: Crane) => {
      ctx.save();
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);

      ctx.strokeStyle = "rgba(74, 144, 226, 0.45)";
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y);
      ctx.bezierCurveTo(
        bird.x + (activeGate.x - bird.x) * 0.4, bird.y,
        bird.x + (activeGate.x - bird.x) * 0.6, activeGate.topY,
        activeGate.x, activeGate.topY
      );
      ctx.stroke();

      ctx.strokeStyle = "rgba(74, 144, 226, 0.45)";
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y);
      ctx.bezierCurveTo(
        bird.x + (activeGate.x - bird.x) * 0.4, bird.y,
        bird.x + (activeGate.x - bird.x) * 0.6, activeGate.bottomY,
        activeGate.x, activeGate.bottomY
      );
      ctx.stroke();

      ctx.restore();
    };

    const loop = () => {
      const w = stateRef.current.canvasWidth;
      const h = stateRef.current.canvasHeight;
      const curState = stateRef.current.gameState;
      const curStage = stateRef.current.currentStageIdx;

      ctx.clearRect(0, 0, w, h);
      drawBackground(curStage, w, h);

      // Sakura petals
      petalsRef.current.forEach((petal) => {
        petal.update(w, h);
        petal.draw(ctx);
      });

      if (curState === "PLAYING" && birdRef.current) {
        const fellDown = birdRef.current.update(h);
        if (fellDown) {
          handleGameOver();
        }

        const activeGates = gatesRef.current;
        if (activeGates.length > 0) {
          drawFlightGuides(activeGates[0], birdRef.current);
        }

        // Gates update & drawing
        for (let i = activeGates.length - 1; i >= 0; i--) {
          const gate = activeGates[i];
          gate.update(stateRef.current.gameSpeed);
          gate.draw(ctx, h);

          if (gate.checkDividerCollision(birdRef.current, h)) {
            handleGameOver();
            break;
          }

          if (!gate.passed && gate.x + gate.width < birdRef.current.x) {
            gate.passed = true;
            
            const chosenLane = gate.getChosenLane(birdRef.current.y, h);
            const isTopCorrect = gate.isCorrectOnTop;
            const pickedCorrect = (chosenLane === "TOP" && isTopCorrect) || (chosenLane === "BOTTOM" && !isTopCorrect);

            if (pickedCorrect) {
              setScore((prev) => {
                const nextScore = prev + 1;
                // Add 5 XP for every correct answer
                updateProgress({ xp: progress.xp + 5 });
                triggerSound("score");
                return nextScore;
              });
              
              const nextQ = getQuestionForStage(curStage);
              setCurrentQuestion(nextQ);
              stateRef.current.nextGateSpawnCounter = -40; // Decrease delay for better engagement
            } else {
              handleGameOver();
              break;
            }
          }

          if (gate.x + gate.width < 0) {
            activeGates.splice(i, 1);
          }
        }

        if (activeGates.length === 0) {
          stateRef.current.nextGateSpawnCounter++;
          if (stateRef.current.nextGateSpawnCounter >= 50 && stateRef.current.currentQuestion) {
            activeGates.push(new DoubleWideGate(w * 1.15, h, stateRef.current.currentQuestion));
          }
        }
      } else {
        // Drawing stagnant gates on start/game over
        gatesRef.current.forEach((gate) => {
          gate.draw(ctx, h);
        });
      }

      if (birdRef.current) {
        birdRef.current.draw(ctx);
      }

      animId = requestAnimationFrame(loop);
    };

    const handleGameOver = () => {
      triggerSound("hit");
      setGameState("GAMEOVER");
      
      setScore((currentScore) => {
        // Save local highscore if surpassed
        const currentHigh = parseInt(localStorage.getItem("hac_tong_high_score") || "0");
        if (currentScore > currentHigh) {
          localStorage.setItem("hac_tong_high_score", currentScore.toString());
          setHighScore(currentScore);
        }
        return currentScore;
      });
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gameState, currentStageIdx, currentQuestion]);

  return (
    <div id="crane-kanji-container" className="fixed inset-0 bg-[#0f172a] z-50 flex items-center justify-center p-0 m-0 select-none">
      
      {/* Absolute Game Canvas Frame */}
      <div className="relative w-full sm:max-w-lg md:max-w-xl h-full sm:h-[90vh] sm:rounded-2xl sm:shadow-2xl overflow-hidden bg-[#fbf5ee] border-4 border-[#e63946]/15 flex flex-col">
        
        {/* Game Area */}
        <div 
          onClick={handleJump}
          onTouchStart={(e) => {
            e.preventDefault();
            handleJump();
          }}
          className="relative flex-grow w-full overflow-hidden bg-[#fbf5ee] cursor-pointer"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        </div>

        {/* Floating HUD Question Panel */}
        {gameState === "PLAYING" && currentQuestion && (
          <div id="crane-question-hud" className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-[#fffdf9] border-2 border-[#b7094c] rounded-xl shadow-lg p-3 text-center transition-all duration-300">
            <div className="flex justify-between items-center px-1 mb-1 border-b pb-1 border-gray-100">
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {stagesData[currentStageIdx].name}
              </span>
              <span className="text-[10px] font-bold text-gray-500">
                ĐIỂM: {score}
              </span>
            </div>
            <div className="text-[11px] text-gray-400 font-bold mb-0.5">Vượt qua cổng có Kanji đúng của:</div>
            <div className="text-xl sm:text-2xl font-black text-gray-800 tracking-wide">
              {currentQuestion.prompt}
            </div>
            <div className="text-[9px] text-red-500 font-semibold mt-1">
              [Bấm SPACE / Chạm Màn hình để Bay Lên]
            </div>
          </div>
        )}

        {/* Top left sound & exit utility HUD */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <button 
            onClick={() => {
              playSound.click();
              onGoBack();
            }}
            className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md border border-gray-200 transition active:scale-95"
          >
            <Home className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {
              playSound.click();
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md border border-gray-200 transition active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* START SCREEN & Stage Selector */}
        {gameState === "START" && (
          <div id="crane-start-screen" className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-4 text-center overflow-y-auto transition-all duration-300 z-50">
            <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-[360px] shadow-2xl flex flex-col items-center text-gray-800 my-auto border-2 border-red-500">
              
              {/* Traditional Torii gate decorative stamp */}
              <div className="w-12 h-12 rounded-full border-2 border-[#b7094c] flex items-center justify-center mb-1 bg-[#b7094c]/10 text-xl font-bold">
                ⛩️
              </div>
              
              <h1 className="text-3xl font-black text-[#b7094c] kanji-text mb-1 tracking-wider" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                HẠC TÔNG HÁN TỰ
              </h1>
              <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                Origami Crane Kanji Adventure
              </h2>

              <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-2.5 mb-4 text-xs font-semibold text-left space-y-1">
                <p className="font-bold">Cách chơi:</p>
                <p>• Nhấp chuột hoặc chạm vào màn hình để vỗ cánh bay lên.</p>
                <p>• Đọc nghĩa của từ trên HUD và bay vào làn đường (trên/dưới) có chữ Kanji chính xác.</p>
              </div>
              
              <p className="text-[11px] text-gray-500 font-bold mb-3 uppercase tracking-wider">
                👇 Chọn màn chơi để bắt đầu 👇
              </p>
              
              {/* Stage buttons with clean native styles */}
              <div className="w-full space-y-2.5 mb-4">
                {stagesData.map((stage, sIdx) => (
                  <button 
                    key={sIdx}
                    onClick={() => startGame(sIdx)}
                    className="w-full text-left p-3 rounded-xl border-2 border-red-100 hover:border-red-400 bg-red-50/40 hover:bg-red-50 active:scale-[0.98] transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-black text-[#b7094c] bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        MÀN {stage.level}
                      </span>
                      <div className="text-sm font-black text-gray-800 mt-1">{stage.name.split(":")[1]}</div>
                      <div className="text-[10px] text-gray-500">{stage.vocab.length} hán tự tuyển chọn</div>
                    </div>
                    <span className="text-xl">{stage.level === 1 ? "🌸" : stage.level === 2 ? "🌙" : "🍁"}</span>
                  </button>
                ))}
              </div>

              {highScore > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                  <Award className="w-4 h-4" />
                  KỶ LỤC: {highScore} Điểm
                </div>
              )}
            </div>
          </div>
        )}

        {/* GAME OVER Screen */}
        {gameState === "GAMEOVER" && (
          <div id="crane-gameover-screen" className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 text-white p-6 text-center z-40 transition-all duration-300">
            <div className="bg-white p-6 rounded-2xl w-full max-w-[340px] shadow-2xl flex flex-col items-center text-gray-800 border-2 border-red-600">
              
              <div className="w-12 h-12 bg-red-50 border border-red-200 text-red-600 rounded-full flex items-center justify-center text-xl mb-2">
                💔
              </div>

              <h2 className="text-2xl font-black text-red-600 kanji-text mb-2">
                Chưa Chính Xác
              </h2>
              
              {currentQuestion && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 w-full mb-5 text-center">
                  <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">
                    Đáp án đúng là:
                  </p>
                  <div className="text-4xl font-black text-[#b7094c] mb-1">
                    {currentQuestion.correct}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {currentQuestion.prompt}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 w-full mb-5">
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div className="text-[9px] text-gray-400 font-bold uppercase">Điểm số</div>
                  <div className="text-xl font-black text-emerald-600">{score}</div>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div className="text-[9px] text-gray-400 font-bold uppercase">Kỷ lục</div>
                  <div className="text-xl font-black text-amber-600">{Math.max(score, highScore)}</div>
                </div>
              </div>

              <div className="w-full space-y-2">
                <button 
                  onClick={() => startGame(currentStageIdx)}
                  className="w-full bg-[#b7094c] hover:bg-[#9d073e] text-white font-black py-3 px-6 rounded-xl shadow-md transition active:scale-95 transform duration-150 tracking-wider flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  CHƠI LẠI MÀN NÀY
                </button>
                <button 
                  onClick={() => setGameState("START")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded-xl transition active:scale-95 text-xs uppercase tracking-wider"
                >
                  Quay Lại Chọn Màn Chơi
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
