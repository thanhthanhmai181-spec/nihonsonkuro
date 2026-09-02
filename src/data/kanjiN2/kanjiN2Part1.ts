import { LessonItem } from "./types";

export const KANJI_N2_DATA_PART1: LessonItem[] = [
  {
    id: 1,
    title: "Bài 1: Cấm chỉ, Biển báo & Hoạt động công cộng",
    description: "Các chữ Hán về cấm chỉ, thông báo, hoạt động đô thị và quản lý dịch vụ",
    kanjis: [
      {
        character: "禁",
        sino_vietnamese: "CẤM",
        meaning: "Cấm đoán, nghiêm cấm",
        kunyomi: "-",
        onyomi: "キン",
        vocabularies: [
          { word: "禁止", reading: "きんし", meaning: "Nghiêm cấm" },
          { word: "禁煙", reading: "きんえん", meaning: "Cấm hút thuốc" },
          { word: "厳禁", reading: "げんきん", meaning: "Nghiêm cấm tuyệt đối" }
        ]
      },
      {
        character: "煙",
        sino_vietnamese: "YÊN",
        meaning: "Khói, thuốc lá",
        kunyomi: "けむ・る、けむり、けむ・い",
        onyomi: "エン",
        vocabularies: [
          { word: "煙", reading: "けむり", meaning: "Khói" },
          { word: "煙い", reading: "けむい", meaning: "Cay mắt do khói" },
          { word: "煙る", reading: "けむる", meaning: "Mờ mịt khói sương" },
          { word: "禁煙", reading: "きんえん", meaning: "Cấm hút thuốc" },
          { word: "喫煙", reading: "きつえん", meaning: "Hút thuốc" },
          { word: "煙突", reading: "えんとつ", meaning: "Ống khói" }
        ]
      },
      {
        character: "静",
        sino_vietnamese: "TĨNH",
        meaning: "Yên tĩnh, tĩnh lặng, thanh bình",
        kunyomi: "しず・か、しず・まる、しず・める",
        onyomi: "セイ、ジョウ",
        vocabularies: [
          { word: "静かな", reading: "しずかな", meaning: "Yên tĩnh" },
          { word: "静まる", reading: "しずまる", meaning: "Lắng xuống, yên ắng" },
          { word: "静める", reading: "しずめる", meaning: "Trấn an, làm dịu" },
          { word: "冷静", reading: "れいせい", meaning: "Điềm tĩnh, bình tĩnh" },
          { word: "安静", reading: "あんせい", meaning: "Yên tĩnh tĩnh dưỡng" },
          { word: "静止", reading: "せいし", meaning: "Đứng yên, bất động" }
        ]
      },
      {
        character: "危",
        sino_vietnamese: "NGUY",
        meaning: "Nguy hiểm, nguy cấp",
        kunyomi: "あぶ・ない、あや・うい、あや・ぶむ",
        onyomi: "キ",
        vocabularies: [
          { word: "危ない", reading: "あぶない", meaning: "Nguy hiểm" },
          { word: "危うい", reading: "あやうい", meaning: "Nguy kịch, suýt nữa" },
          { word: "危ぶむ", reading: "あやぶむ", meaning: "Lo sợ, e ngại" },
          { word: "危険", reading: "きけん", meaning: "Sự nguy hiểm" },
          { word: "危機", reading: "きき", meaning: "Khủng hoảng" },
          { word: "危害", reading: "きがい", meaning: "Nguy hại" }
        ]
      },
      {
        character: "険",
        sino_vietnamese: "HIỂM",
        meaning: "Hiểm trở, hiểm độc, nguy hiểm",
        kunyomi: "けわ・しい",
        onyomi: "ケン",
        vocabularies: [
          { word: "険しい", reading: "けわしい", meaning: "Hiểm trở, dốc đứng, gay gắt" },
          { word: "危険", reading: "きけん", meaning: "Nguy hiểm" },
          { word: "保険", reading: "ほけん", meaning: "Bảo hiểm" },
          { word: "冒険", reading: "ぼうけん", meaning: "Mạo hiểm" }
        ]
      },
      {
        character: "関",
        sino_vietnamese: "QUAN",
        meaning: "Quan hệ, liên quan, then chốt, cửa ải",
        kunyomi: "せき、かか・わる",
        onyomi: "カン",
        vocabularies: [
          { word: "関", reading: "せき", meaning: "Cửa ải, trạm kiểm soát" },
          { word: "関わる", reading: "かかわる", meaning: "Dính líu, liên quan tới" },
          { word: "関係", reading: "かんけい", meaning: "Mối quan hệ" },
          { word: "関心", reading: "かんしん", meaning: "Sự quan tâm" },
          { word: "玄関", reading: "げんかん", meaning: "Lối vào nhà, tiền sảnh" }
        ]
      },
      {
        character: "係",
        sino_vietnamese: "HỆ",
        meaning: "Hệ lụy, liên kết, người phụ trách",
        kunyomi: "かか・る、かかり",
        onyomi: "ケイ",
        vocabularies: [
          { word: "係", reading: "かかり", meaning: "Người phụ trách, nhiệm vụ" },
          { word: "係わる", reading: "かかわる", meaning: "Ảnh hưởng tới, liên quan" },
          { word: "関係", reading: "かんけい", meaning: "Mối quan hệ" },
          { word: "係員", reading: "かかりいん", meaning: "Nhân viên phụ trách" }
        ]
      },
      {
        character: "落",
        sino_vietnamese: "LẠC",
        meaning: "Rơi, rụng, trượt, tụt lại",
        kunyomi: "お・ちる、お・とす",
        onyomi: "ラク",
        vocabularies: [
          { word: "落ちる", reading: "おちる", meaning: "Rơi, rụng, thi trượt" },
          { word: "落とす", reading: "おとす", meaning: "Làm rơi, đánh mất" },
          { word: "落第", reading: "らくだい", meaning: "Thi trượt, ở lại lớp" },
          { word: "落下", reading: "らっか", meaning: "Rơi xuống" },
          { word: "集落", reading: "しゅうらく", meaning: "Thôn bản, làng xóm" }
        ]
      },
      {
        character: "石",
        sino_vietnamese: "THẠCH",
        meaning: "Hòn đá, đá",
        kunyomi: "いし",
        onyomi: "セキ、シャク、コク",
        vocabularies: [
          { word: "石", reading: "いし", meaning: "Hòn đá, viên đá" },
          { word: "石油", reading: "せきゆ", meaning: "Dầu mỏ, dầu hỏa" },
          { word: "石鹸", reading: "せっけん", meaning: "Xà phòng" },
          { word: "磁石", reading: "じしゃく", meaning: "Nam châm" }
        ]
      },
      {
        character: "飛",
        sino_vietnamese: "PHI",
        meaning: "Bay, phóng đi",
        kunyomi: "と・ぶ、と・ばす",
        onyomi: "ヒ",
        vocabularies: [
          { word: "飛ぶ", reading: "とぶ", meaning: "Bay" },
          { word: "飛ばす", reading: "とばす", meaning: "Bắn đi, phóng đi, bỏ qua" },
          { word: "飛行機", reading: "ひこうき", meaning: "Máy bay" },
          { word: "飛行", reading: "ひこう", meaning: "Chuyến bay" },
          { word: "飛び出す", reading: "とびだす", meaning: "Lao ra, phóng ra" }
        ]
      },
      {
        character: "駐",
        sino_vietnamese: "TRÚ",
        meaning: "Đỗ xe, dừng chân, lưu trú",
        kunyomi: "-",
        onyomi: "チュウ",
        vocabularies: [
          { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "Bãi đỗ xe" },
          { word: "駐車", reading: "ちゅうしゃ", meaning: "Việc đỗ xe" },
          { word: "駐在", reading: "ちゅうざい", meaning: "Thường trú, lưu trú" }
        ]
      },
      {
        character: "捨",
        sino_vietnamese: "XẢ",
        meaning: "Vứt bỏ, từ bỏ",
        kunyomi: "す・てる",
        onyomi: "シャ",
        vocabularies: [
          { word: "捨てる", reading: "すてる", meaning: "Vứt rác, từ bỏ" },
          { word: "四捨五入", reading: "ししゃごにゅう", meaning: "Làm tròn số (4 bỏ 5 lên)" }
        ]
      },
      {
        character: "遊",
        sino_vietnamese: "DU",
        meaning: "Chơi, du ngoạn, du lịch",
        kunyomi: "あそ・ぶ",
        onyomi: "ユウ、ユ",
        vocabularies: [
          { word: "遊ぶ", reading: "あそぶ", meaning: "Chơi đùa" },
          { word: "遊び", reading: "あそび", meaning: "Trò chơi, sự vui chơi" },
          { word: "遊園地", reading: "ゆうえんち", meaning: "Khu vui chơi giải trí" },
          { word: "周遊", reading: "しゅうゆう", meaning: "Du ngoạn vòng quanh" }
        ]
      },
      {
        character: "泳",
        sino_vietnamese: "VỊNH",
        meaning: "Bơi lội",
        kunyomi: "およ・ぐ",
        onyomi: "エイ",
        vocabularies: [
          { word: "泳ぐ", reading: "およぐ", meaning: "Bơi" },
          { word: "水泳", reading: "すいえい", meaning: "Môn bơi lội" },
          { word: "平泳ぎ", reading: "ひらおよぎ", meaning: "Bơi ếch" },
          { word: "競泳", reading: "きょうえい", meaning: "Thi bơi lội" }
        ]
      },
      {
        character: "喫",
        sino_vietnamese: "KHIẾT",
        meaning: "Ăn uống, hít thở",
        kunyomi: "-",
        onyomi: "キツ",
        vocabularies: [
          { word: "喫茶店", reading: "きっさてん", meaning: "Quán cà phê, quán nước" },
          { word: "喫煙", reading: "きつえん", meaning: "Hút thuốc" },
          { word: "満喫", reading: "まんきつ", meaning: "Tận hưởng trọn vẹn" }
        ]
      },
      {
        character: "非",
        sino_vietnamese: "PHI",
        meaning: "Không phải, phi lý, sai trái",
        kunyomi: "-",
        onyomi: "ヒ",
        vocabularies: [
          { word: "非常口", reading: "ひじょうぐち", meaning: "Cửa thoát hiểm" },
          { word: "非常に", reading: "ひじょうに", meaning: "Rất, cực kỳ" },
          { word: "非難", reading: "ひなん", meaning: "Trách móc, chỉ trích" }
        ]
      },
      {
        character: "御",
        sino_vietnamese: "NGỰ",
        meaning: "Kính ngữ (ngài, quý), điều khiển, ngự trị",
        kunyomi: "おん、お-、ご-、み-",
        onyomi: "ギョ、ゴ",
        vocabularies: [
          { word: "御手洗", reading: "おてあらい", meaning: "Nhà vệ sinh" },
          { word: "御中", reading: "おんちゅう", meaning: "Kính gửi (công ty/tổ chức)" },
          { word: "御礼", reading: "おれい", meaning: "Lời cảm ơn, đáp lễ" },
          { word: "制御", reading: "せいぎょ", meaning: "Kiểm soát, chế ngự" }
        ]
      },
      {
        character: "常",
        sino_vietnamese: "THƯỜNG",
        meaning: "Bình thường, thông thường, luôn luôn",
        kunyomi: "つね、とこ-",
        onyomi: "ジョウ",
        vocabularies: [
          { word: "常に", reading: "つねに", meaning: "Luôn luôn, thường xuyên" },
          { word: "日常", reading: "にちじょう", meaning: "Thường ngày" },
          { word: "正常", reading: "せいじょう", meaning: "Bình thường (hoạt động tốt)" },
          { word: "日常茶飯事", reading: "にちじょうさはんじ", meaning: "Chuyện thường ngày ở huyện" }
        ]
      },
      {
        character: "受",
        sino_vietnamese: "THỤ",
        meaning: "Nhận, tiếp nhận, thi cử",
        kunyomi: "う・ける、う・かる",
        onyomi: "ジュ",
        vocabularies: [
          { word: "受ける", reading: "うける", meaning: "Nhận lấy, chịu đựng, dự thi" },
          { word: "受かる", reading: "うかる", meaning: "Đỗ, trúng tuyển" },
          { word: "受付", reading: "うけつけ", meaning: "Bàn tiếp tân, lễ tân" },
          { word: "受験", reading: "じゅけん", meaning: "Dự thi" },
          { word: "受領", reading: "じゅりょう", meaning: "Nhận (tiền, hàng)" }
        ]
      },
      {
        character: "付",
        sino_vietnamese: "PHÓ",
        meaning: "Gắn vào, dán, đính kèm, giao phó",
        kunyomi: "つ・く、つ・ける",
        onyomi: "フ",
        vocabularies: [
          { word: "付く", reading: "つく", meaning: "Dính vào, kèm theo" },
          { word: "付ける", reading: "つける", meaning: "Đính vào, bật (đèn), viết" },
          { word: "付近", reading: "ふきん", meaning: "Vùng lân cận" },
          { word: "添付", reading: "てんぷ", meaning: "Đính kèm (file)" },
          { word: "交付", reading: "こうふ", meaning: "Cấp phát" }
        ]
      },
      {
        character: "案",
        sino_vietnamese: "ÁN",
        meaning: "Đề án, phương án, kế hoạch, hướng dẫn",
        kunyomi: "-",
        onyomi: "アン",
        vocabularies: [
          { word: "案内", reading: "あんない", meaning: "Hướng dẫn, dẫn đường" },
          { word: "提案", reading: "ていあん", meaning: "Đề xuất" },
          { word: "方案", reading: "ほうあん", meaning: "Dự thảo luật, phương án" }
        ]
      },
      {
        character: "内",
        sino_vietnamese: "NỘI",
        meaning: "Bên trong, trong khoảng, nội bộ",
        kunyomi: "うち",
        onyomi: "ナイ、ダイ",
        vocabularies: [
          { word: "内", reading: "うち", meaning: "Bên trong, trong lúc" },
          { word: "内部", reading: "ないぶ", meaning: "Nội bộ, bên trong" },
          { word: "国内", reading: "こくない", meaning: "Trong nước" },
          { word: "以内", reading: "いない", meaning: "Trong vòng, trong phạm vi" }
        ]
      },
      {
        character: "議",
        sino_vietnamese: "NGHỊ",
        meaning: "Bàn bạc, thảo luận, nghị luận",
        kunyomi: "-",
        onyomi: "ギ",
        vocabularies: [
          { word: "会議", reading: "かいぎ", meaning: "Cuộc họp" },
          { word: "議員", reading: "ぎいん", meaning: "Nghị sĩ" },
          { word: "議論", reading: "ぎろん", meaning: "Thảo luận, tranh luận" }
        ]
      },
      {
        character: "化",
        sino_vietnamese: "HOÁ",
        meaning: "Biến hoá, hoá trang, hoá học",
        kunyomi: "ば・ける、ば・かす",
        onyomi: "カ、ケ",
        vocabularies: [
          { word: "化ける", reading: "ばける", meaning: "Biến hình, hoá trang" },
          { word: "文化", reading: "ぶんか", meaning: "Văn hoá" },
          { word: "化学", reading: "かがく", meaning: "Hoá học" },
          { word: "化粧", reading: "けしょう", meaning: "Trang điểm" }
        ]
      },
      {
        character: "階",
        sino_vietnamese: "GIAI",
        meaning: "Tầng nhà, bậc thang, giai cấp",
        kunyomi: "-",
        onyomi: "カイ",
        vocabularies: [
          { word: "階段", reading: "かいだん", meaning: "Cầu thang" },
          { word: "階層", reading: "かいそう", meaning: "Tầng lớp, giai cấp" },
          { word: "段階", reading: "だんかい", meaning: "Giai đoạn, bậc" }
        ]
      },
      {
        character: "段",
        sino_vietnamese: "ĐOẠN",
        meaning: "Giai đoạn, bậc, đoạn, phần",
        kunyomi: "-",
        onyomi: "ダン",
        vocabularies: [
          { word: "段階", reading: "だんかい", meaning: "Giai đoạn" },
          { word: "手段", reading: "しゅだん", meaning: "Thủ đoạn, biện pháp" },
          { word: "値段", reading: "ねだん", meaning: "Giá cả" }
        ]
      },
      {
        character: "営",
        sino_vietnamese: "DOANH",
        meaning: "Kinh doanh, doanh trại, điều hành",
        kunyomi: "いとな・む",
        onyomi: "エイ",
        vocabularies: [
          { word: "営む", reading: "いとなむ", meaning: "Kinh doanh, buôn bán" },
          { word: "営業", reading: "えいぎょう", meaning: "Kinh doanh" },
          { word: "経営", reading: "けいえい", meaning: "Quản trị, điều hành" },
          { word: "運営", reading: "うんえい", meaning: "Vận hành" }
        ]
      },
      {
        character: "放",
        sino_vietnamese: "PHÓNG",
        meaning: "Phóng thích, thả, buông, phát thanh",
        kunyomi: "はな・す、はな・つ、はな・れる",
        onyomi: "ホウ",
        vocabularies: [
          { word: "放す", reading: "はなす", meaning: "Thả ra, buông tay" },
          { word: "放れる", reading: "はなれる", meaning: "Rời ra, thoát khỏi" },
          { word: "放送", reading: "ほうそう", meaning: "Phát thanh, truyền hình" },
          { word: "開放", reading: "かいほう", meaning: "Mở cửa rộng rãi" },
          { word: "放置", reading: "ほうち", meaning: "Bỏ mặc, để mặc" }
        ]
      },
      {
        character: "押",
        sino_vietnamese: "ÁP",
        meaning: "Ấn, nhấn, đè, đóng dấu",
        kunyomi: "お・す、お・さえる",
        onyomi: "オウ",
        vocabularies: [
          { word: "押す", reading: "おす", meaning: "Ấn, bấm, đẩy, đóng dấu" },
          { word: "押さえる", reading: "おさえる", meaning: "Giữ chặt, đè xuống" },
          { word: "押収", reading: "おうしゅう", meaning: "Tịch thu, thu giữ" },
          { word: "押入れ", reading: "おしいれ", meaning: "Tủ âm tường" }
        ]
      },
      {
        character: "準",
        sino_vietnamese: "CHUẨN",
        meaning: "Tiêu chuẩn, chuẩn bị, tương đương",
        kunyomi: "-",
        onyomi: "ジュン",
        vocabularies: [
          { word: "準備", reading: "じゅんび", meaning: "Chuẩn bị" },
          { word: "基準", reading: "きじゅん", meaning: "Tiêu chuẩn" },
          { word: "準決勝", reading: "じゅんけっしょう", meaning: "Trận bán kết" }
        ]
      },
      {
        character: "備",
        sino_vietnamese: "BỊ",
        meaning: "Trang bị, phòng bị, chuẩn bị",
        kunyomi: "そな・える、そな・わる",
        onyomi: "ビ",
        vocabularies: [
          { word: "備える", reading: "そなえる", meaning: "Chuẩn bị, trang bị" },
          { word: "備わる", reading: "そなわる", meaning: "Có sẵn, được trang bị" },
          { word: "準備", reading: "じゅんび", meaning: "Chuẩn bị" },
          { word: "予備", reading: "よび", meaning: "Dự bị, dự phòng" },
          { word: "設備", reading: "せつび", meaning: "Thiết bị" }
        ]
      },
      {
        character: "定",
        sino_vietnamese: "ĐỊNH",
        meaning: "Xác định, cố định, quy định",
        kunyomi: "さだ・める、さだ・まる、さだ・か",
        onyomi: "テイ、ジョウ",
        vocabularies: [
          { word: "定める", reading: "さだめる", meaning: "Quy định, xác định" },
          { word: "定まる", reading: "さだまる", meaning: "Được ổn định, được định đoạt" },
          { word: "予定", reading: "よてい", meaning: "Dự định" },
          { word: "定食", reading: "ていしょく", meaning: "Suất cơm phần" },
          { word: "安定", reading: "あんてい", meaning: "Ổn định" }
        ]
      },
      {
        character: "流",
        sino_vietnamese: "LƯU",
        meaning: "Chảy, lưu thông, trôi nổi, dòng phái",
        kunyomi: "なが・れる、なが・す",
        onyomi: "リュウ、ル",
        vocabularies: [
          { word: "流れる", reading: "ながれる", meaning: "Chảy, trôi" },
          { word: "流す", reading: "ながす", meaning: "Xả nước, làm trôi, phát tán" },
          { word: "流行", reading: "りゅうこう", meaning: "Lưu hành, mốt" },
          { word: "合流", reading: "ごうりゅう", meaning: "Hợp lưu, sáp nhập" },
          { word: "交流", reading: "こうりゅう", meaning: "Giao lưu" }
        ]
      },
      {
        character: "清",
        sino_vietnamese: "THANH",
        meaning: "Thanh khiết, trong sạch, thanh tịnh",
        kunyomi: "きよ・い、きよ・まる、きよ・める",
        onyomi: "セイ、ショウ",
        vocabularies: [
          { word: "清い", reading: "きよい", meaning: "Trong sạch, thuần khiết" },
          { word: "清掃", reading: "せいそう", meaning: "Quét dọn, vệ sinh" },
          { word: "清潔", reading: "せいけつ", meaning: "Sạch sẽ, ngăn nắp" },
          { word: "清純", reading: "せいじゅん", meaning: "Trong sáng, thuần khiết" }
        ]
      },
      {
        character: "掃",
        sino_vietnamese: "TẢO",
        meaning: "Quét tước, dọn dẹp, truy quét",
        kunyomi: "は・く",
        onyomi: "ソウ",
        vocabularies: [
          { word: "掃く", reading: "はく", meaning: "Quét (nhà, rác)" },
          { word: "清掃", reading: "せいそう", meaning: "Quét dọn" },
          { word: "掃除", reading: "そうじ", meaning: "Dọn dẹp" },
          { word: "一掃", reading: "いっそう", meaning: "Quét sạch, thanh trừng" }
        ]
      },
      {
        character: "閉",
        sino_vietnamese: "BẾ",
        meaning: "Đóng, khép, bế mạc",
        kunyomi: "し・まる、し・める、と・じる",
        onyomi: "ヘイ",
        vocabularies: [
          { word: "閉まる", reading: "しまる", meaning: "Đóng lại" },
          { word: "閉める", reading: "しめる", meaning: "Đóng (cửa)" },
          { word: "閉じる", reading: "とじる", meaning: "Nhắm (mắt), gập (sách)" },
          { word: "閉店", reading: "へいてん", meaning: "Đóng cửa quán" },
          { word: "閉会", reading: "へいかい", meaning: "Bế mạc hội nghị" },
          { word: "閉鎖", reading: "へいさ", meaning: "Phong toả, đóng cửa" }
        ]
      },
      {
        character: "点",
        sino_vietnamese: "ĐIỂM",
        meaning: "Điểm số, dấu chấm, kiểm điểm",
        kunyomi: "つ・く、つ・ける",
        onyomi: "テン",
        vocabularies: [
          { word: "点く", reading: "つく", meaning: "Bật sáng (đèn)" },
          { word: "点ける", reading: "つける", meaning: "Bật (đèn)" },
          { word: "点数", reading: "てんすう", meaning: "Điểm số" },
          { word: "点検", reading: "てんけん", meaning: "Kiểm tra, bảo dưỡng" },
          { word: "要点", reading: "ようてん", meaning: "Điểm mấu chốt" }
        ]
      },
      {
        character: "検",
        sino_vietnamese: "KIỂM",
        meaning: "Kiểm tra, xét nghiệm, kiểm duyệt",
        kunyomi: "-",
        onyomi: "ケン",
        vocabularies: [
          { word: "点検", reading: "てんけん", meaning: "Kiểm tra định kỳ" },
          { word: "検査", reading: "けんさ", meaning: "Xét nghiệm, kiểm tra" },
          { word: "検討", reading: "けんとう", meaning: "Xem xét, cân nhắc" }
        ]
      },
      {
        character: "鉄",
        sino_vietnamese: "THIẾT",
        meaning: "Sắt, chất thép, kim loại",
        kunyomi: "くろがね",
        onyomi: "テツ",
        vocabularies: [
          { word: "鉄道", reading: "てつどう", meaning: "Đường sắt" },
          { word: "地下鉄", reading: "ちかてつ", meaning: "Tàu điện ngầm" },
          { word: "私鉄", reading: "してつ", meaning: "Đường sắt tư nhân" }
        ]
      },
      {
        character: "窓",
        sino_vietnamese: "SONG",
        meaning: "Cửa sổ, ô kính giao dịch",
        kunyomi: "まど",
        onyomi: "ソウ",
        vocabularies: [
          { word: "窓", reading: "まど", meaning: "Cửa sổ" },
          { word: "窓口", reading: "まどぐち", meaning: "Cửa bán vé, quầy tiếp nhận" },
          { word: "同窓会", reading: "どうそうかい", meaning: "Họp lớp, hội cựu học sinh" }
        ]
      },
      {
        character: "符",
        sino_vietnamese: "PHÙ",
        meaning: "Phù hiệu, ký hiệu, vé",
        kunyomi: "-",
        onyomi: "フ",
        vocabularies: [
          { word: "切符", reading: "きっぷ", meaning: "Vé (tàu, xe)" },
          { word: "符号", reading: "ふごう", meaning: "Phù hiệu, dấu" },
          { word: "音符", reading: "おんぷ", meaning: "Nốt nhạc" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2: Giao thông, Đi lại, Y tế & Thường nhật",
    description: "Các chữ Hán liên quan đến vé tàu, lộ trình, tăng giảm, y tế và cứu hộ",
    kanjis: [
      {
        character: "精",
        sino_vietnamese: "TINH",
        meaning: "Tinh thần, tinh túy, tỉ mỉ",
        kunyomi: "しら・げる",
        onyomi: "セイ、ショウ",
        vocabularies: [
          { word: "精算", reading: "せいさん", meaning: "Quyết toán, thanh toán bù trừ" },
          { word: "精神", reading: "せいしん", meaning: "Tinh thần" },
          { word: "精密", reading: "せいみつ", meaning: "Chính xác, tỉ mỉ" }
        ]
      },
      {
        character: "算",
        sino_vietnamese: "TOÁN",
        meaning: "Tính toán, số học, kế hoạch",
        kunyomi: "-",
        onyomi: "サン",
        vocabularies: [
          { word: "計算", reading: "けいさん", meaning: "Tính toán" },
          { word: "予算", reading: "よさん", meaning: "Ngân sách" },
          { word: "決算", reading: "けっさん", meaning: "Quyết toán" }
        ]
      },
      {
        character: "改",
        sino_vietnamese: "CẢI",
        meaning: "Cải cách, sửa đổi, soát vé",
        kunyomi: "あらた・める、あらた・まる",
        onyomi: "カイ",
        vocabularies: [
          { word: "改める", reading: "あらためる", meaning: "Sửa đổi, kiểm tra lại" },
          { word: "改まる", reading: "あらたまる", meaning: "Được đổi mới, trịnh trọng" },
          { word: "改札", reading: "かいさつ", meaning: "Soát vé" },
          { word: "改正", reading: "かいせい", meaning: "Cải chính, sửa đổi luật" },
          { word: "改革", reading: "かいかく", meaning: "Cải cách" }
        ]
      },
      {
        character: "札",
        sino_vietnamese: "TRÁT",
        meaning: "Thẻ, nhãn, tiền giấy, vé",
        kunyomi: "ふだ",
        onyomi: "サツ",
        vocabularies: [
          { word: "札", reading: "ふだ", meaning: "Thẻ, nhãn, bảng tên" },
          { word: "改札口", reading: "かいさつぐち", meaning: "Cổng soát vé" },
          { word: "お札", reading: "おさつ", meaning: "Tiền giấy" },
          { word: "名札", reading: "なふだ", meaning: "Bảng tên" }
        ]
      },
      {
        character: "線",
        sino_vietnamese: "TUYẾN",
        meaning: "Đường dây, tuyến đường, vạch kẻ",
        kunyomi: "すじ",
        onyomi: "セン",
        vocabularies: [
          { word: "直線", reading: "ちょくせん", meaning: "Đường thẳng" },
          { word: "路線", reading: "ろせん", meaning: "Tuyến đường" },
          { word: "下線", reading: "かせん", meaning: "Gạch chân" }
        ]
      },
      {
        character: "刻",
        sino_vietnamese: "KHẮC",
        meaning: "Khắc ghi, thời khắc, băm thái",
        kunyomi: "きざ・む",
        onyomi: "コク",
        vocabularies: [
          { word: "刻む", reading: "きざむ", meaning: "Thái nhỏ, băm, khắc sâu" },
          { word: "時刻", reading: "じこく", meaning: "Thời khắc, giờ giấc" },
          { word: "深刻", reading: "しんこく", meaning: "Nghiêm trọng" },
          { word: "遅刻", reading: "ちこく", meaning: "Đi muộn" }
        ]
      },
      {
        character: "番",
        sino_vietnamese: "PHIÊN",
        meaning: "Số thứ tự, phiên trực, lượt",
        kunyomi: "-",
        onyomi: "バン",
        vocabularies: [
          { word: "番号", reading: "ばんごう", meaning: "Số hiệu, số điện thoại" },
          { word: "番組", reading: "ばんぐみ", meaning: "Chương trình tivi" },
          { word: "交番", reading: "こうばん", meaning: "Đồn cảnh sát" }
        ]
      },
      {
        character: "号",
        sino_vietnamese: "HIỆU",
        meaning: "Tên hiệu, tín hiệu, số hiệu",
        kunyomi: "さけ・ぶ、よびな",
        onyomi: "ゴウ",
        vocabularies: [
          { word: "信号", reading: "しんごう", meaning: "Đèn tín hiệu" },
          { word: "号室", reading: "ごうしつ", meaning: "Số phòng" },
          { word: "年号", reading: "ねんごう", meaning: "Niên hiệu" }
        ]
      },
      {
        character: "快",
        sino_vietnamese: "KHOÁI",
        meaning: "Khoan khoái, vui vẻ, sảng khoái, mau lẹ",
        kunyomi: "こころよ・い",
        onyomi: "カイ",
        vocabularies: [
          { word: "快い", reading: "こころよい", meaning: "Dễ chịu, sẵn lòng (nhận lời)" },
          { word: "快適", reading: "かいてき", meaning: "Tiện nghi, thoải mái" },
          { word: "快速", reading: "かいそく", meaning: "Tàu tốc hành" },
          { word: "快晴", reading: "かいせい", meaning: "Trời nắng đẹp" }
        ]
      },
      {
        character: "速",
        sino_vietnamese: "TỐC",
        meaning: "Nhanh chóng, tốc độ",
        kunyomi: "はや・い、はや・める、すみ・やか",
        onyomi: "ソク",
        vocabularies: [
          { word: "速い", reading: "はやい", meaning: "Nhanh" },
          { word: "速める", reading: "はやめる", meaning: "Đẩy nhanh (tốc độ)" },
          { word: "速度", reading: "そくど", meaning: "Tốc độ" },
          { word: "時速", reading: "じそく", meaning: "Tốc độ theo giờ" },
          { word: "急速", reading: "きゅうそく", meaning: "Cấp tốc, nhanh chóng" }
        ]
      },
      {
        character: "路",
        sino_vietnamese: "LỘ",
        meaning: "Đường đi, con đường, tuyến đường",
        kunyomi: "じ、みち",
        onyomi: "ロ",
        vocabularies: [
          { word: "家路", reading: "いえじ", meaning: "Đường về nhà" },
          { word: "道路", reading: "どうろ", meaning: "Đường xá" },
          { word: "線路", reading: "せんろ", meaning: "Đường ray" },
          { word: "通路", reading: "つうろ", meaning: "Lối đi, hành lang" }
        ]
      },
      {
        character: "港",
        sino_vietnamese: "CẢNG",
        meaning: "Bến cảng, hải cảng, sân bay",
        kunyomi: "みなと",
        onyomi: "コウ",
        vocabularies: [
          { word: "港", reading: "みなと", meaning: "Bến cảng" },
          { word: "空港", reading: "くうこう", meaning: "Sân bay" },
          { word: "港湾", reading: "こうわん", meaning: "Vùng cảng biển" },
          { word: "出港", reading: "しゅっこう", meaning: "Tàu rời cảng" }
        ]
      },
      {
        character: "由",
        sino_vietnamese: "DO",
        meaning: "Lý do, nguồn gốc, tự do",
        kunyomi: "よし、よ・る",
        onyomi: "ユ、ユウ",
        vocabularies: [
          { word: "由", reading: "よし", meaning: "Lý do, cớ sự" },
          { word: "理由", reading: "りゆう", meaning: "Lý do" },
          { word: "自由", reading: "じゆう", meaning: "Tự do" },
          { word: "経由", reading: "けいゆ", meaning: "Quá cảnh, đi qua" }
        ]
      },
      {
        character: "深",
        sino_vietnamese: "THÂM",
        meaning: "Sâu sắc, sâu đậm, đêm khuya",
        kunyomi: "ふか・い、ふか・まる、ふか・める",
        onyomi: "シン",
        vocabularies: [
          { word: "深い", reading: "ふかい", meaning: "Sâu, sâu sắc" },
          { word: "深まる", reading: "ふかまる", meaning: "Sâu sắc hơn (mùa thu, quan hệ)" },
          { word: "深刻", reading: "しんこく", meaning: "Nghiêm trọng" },
          { word: "深夜", reading: "しんや", meaning: "Đêm khuya" },
          { word: "水深", reading: "すいしん", meaning: "Độ sâu của nước" }
        ]
      },
      {
        character: "降",
        sino_vietnamese: "GIÁNG, HÀNG",
        meaning: "Rơi xuống (mưa, tuyết), xuống xe, đầu hàng",
        kunyomi: "お・りる、お・ろす、ふ・る",
        onyomi: "コウ、ゴ",
        vocabularies: [
          { word: "降りる", reading: "おりる", meaning: "Xuống xe" },
          { word: "降ろす", reading: "おろす", meaning: "Cho xuống, dỡ xuống" },
          { word: "降る", reading: "ふる", meaning: "Rơi (mưa, tuyết)" },
          { word: "以降", reading: "いこう", meaning: "Kể từ sau đó" },
          { word: "降雨", reading: "こうう", meaning: "Lượng mưa" },
          { word: "投降", reading: "とうこう", meaning: "Đầu hàng" }
        ]
      },
      {
        character: "両",
        sino_vietnamese: "LƯỠNG",
        meaning: "Cả hai, đôi bên, toa xe",
        kunyomi: "てる、ふたつ",
        onyomi: "リョウ",
        vocabularies: [
          { word: "両親", reading: "りょうしん", meaning: "Bố mẹ (song thân)" },
          { word: "両手", reading: "りょうて", meaning: "Cả hai tay" },
          { word: "両方", reading: "りょうほう", meaning: "Cả hai phía" }
        ]
      },
      {
        character: "替",
        sino_vietnamese: "THẾ",
        meaning: "Thay thế, đổi chác, hoán đổi",
        kunyomi: "か・える、か・わる",
        onyomi: "タイ",
        vocabularies: [
          { word: "替える", reading: "かえる", meaning: "Thay đổi, đổi (tiền, pin)" },
          { word: "替わる", reading: "かわる", meaning: "Bị thay thế, luân phiên" },
          { word: "両替", reading: "りょうがえ", meaning: "Đổi tiền" },
          { word: "交替", reading: "こうたい", meaning: "Thay phiên, đổi ca" }
        ]
      },
      {
        character: "賃",
        sino_vietnamese: "NHẪM",
        meaning: "Tiền công, tiền thuê, cước phí",
        kunyomi: "-",
        onyomi: "チン",
        vocabularies: [
          { word: "家賃", reading: "やちん", meaning: "Tiền thuê nhà" },
          { word: "運賃", reading: "うんちん", meaning: "Cước vận chuyển, tiền vé xe" },
          { word: "賃金", reading: "ちんぎん", meaning: "Tiền lương, tiền công" }
        ]
      },
      {
        character: "割",
        sino_vietnamese: "CÁT",
        meaning: "Chia, vỡ, phân chia, tỷ lệ phần mười",
        kunyomi: "わ・る、わり、わ・れる、さ・く",
        onyomi: "カツ",
        vocabularies: [
          { word: "割る", reading: "わる", meaning: "Làm vỡ, chia nhỏ" },
          { word: "割れる", reading: "われる", meaning: "Bị vỡ" },
          { word: "割く", reading: "さく", meaning: "Dành thời gian, xé nhỏ" },
          { word: "割引", reading: "わりびき", meaning: "Giảm giá" },
          { word: "割合", reading: "わりあい", meaning: "Tỷ lệ" },
          { word: "分割", reading: "ぶんかつ", meaning: "Phân chia, trả góp" }
        ]
      },
      {
        character: "増",
        sino_vietnamese: "TĂNG",
        meaning: "Tăng lên, gia tăng, thêm vào",
        kunyomi: "ま・す、ふ・える、ふ・やす",
        onyomi: "ゾウ",
        vocabularies: [
          { word: "増える", reading: "ふえる", meaning: "Tăng lên" },
          { word: "増やす", reading: "ふやす", meaning: "Làm tăng thêm" },
          { word: "増す", reading: "ます", meaning: "Tăng thêm (cảm giác, tốc độ)" },
          { word: "増加", reading: "ぞうか", meaning: "Gia tăng" },
          { word: "増量", reading: "ぞうりょう", meaning: "Tăng khối lượng" },
          { word: "急増", reading: "きゅうぞう", meaning: "Tăng đột biến" }
        ]
      },
      {
        character: "優",
        sino_vietnamese: "ƯU",
        meaning: "Ưu tú, dịu dàng, ưu thế, diễn viên",
        kunyomi: "やさ・しい、すぐ・れる",
        onyomi: "ユウ、ウ",
        vocabularies: [
          { word: "優しい", reading: "やさしい", meaning: "Dịu dàng, hiền lành" },
          { word: "優れる", reading: "すぐれる", meaning: "Xuất sắc, ưu việt" },
          { word: "優勝", reading: "ゆうしょう", meaning: "Vô địch, giải nhất" },
          { word: "優先", reading: "ゆうせん", meaning: "Ưu tiên" },
          { word: "女優", reading: "じょゆう", meaning: "Nữ diễn viên" }
        ]
      },
      {
        character: "席",
        sino_vietnamese: "TỊCH",
        meaning: "Chỗ ngồi, ghế, bữa tiệc",
        kunyomi: "むしろ",
        onyomi: "セキ",
        vocabularies: [
          { word: "座席", reading: "ざせき", meaning: "Chỗ ngồi" },
          { word: "出席", reading: "しゅっせき", meaning: "Tham dự, có mặt" },
          { word: "指定席", reading: "していせき", meaning: "Ghế đặt trước" }
        ]
      },
      {
        character: "側",
        sino_vietnamese: "TRẮC",
        meaning: "Bên cạnh, phía, bề mặt bên",
        kunyomi: "かわ、そば",
        onyomi: "ソク",
        vocabularies: [
          { word: "側", reading: "かわ", meaning: "Phía, bên" },
          { word: "側", reading: "そば", meaning: "Bên cạnh" },
          { word: "側面", reading: "そくめん", meaning: "Mặt bên, khía cạnh" },
          { word: "両側", reading: "りょうがわ", meaning: "Cả hai bên" },
          { word: "外側", reading: "そとがわ", meaning: "Phía bên ngoài" }
        ]
      },
      {
        character: "座",
        sino_vietnamese: "TỌA",
        meaning: "Ngồi, chỗ ngồi, toạ đàm, chòm sao",
        kunyomi: "すわ・る",
        onyomi: "ザ",
        vocabularies: [
          { word: "座る", reading: "すわる", meaning: "Ngồi xuống" },
          { word: "座席", reading: "ざせき", meaning: "Chỗ ngồi" },
          { word: "口座", reading: "こうざ", meaning: "Tài khoản ngân hàng" },
          { word: "星座", reading: "せいざ", meaning: "Chòm sao" }
        ]
      },
      {
        character: "寄",
        sino_vietnamese: "KÝ",
        meaning: "Ghé vào, gửi gắm, quyên góp, tới gần",
        kunyomi: "よ・る、よ・せる",
        onyomi: "キ",
        vocabularies: [
          { word: "寄る", reading: "よる", meaning: "Ghé qua, tạt vào" },
          { word: "寄せる", reading: "よせる", meaning: "Tấp vào, gom lại, gửi đến" },
          { word: "寄付", reading: "きふ", meaning: "Quyên góp, ủng hộ" },
          { word: "立ち寄る", reading: "たちよる", meaning: "Tạt qua, ghé thăm" }
        ]
      },
      {
        character: "郵",
        sino_vietnamese: "BƯU",
        meaning: "Bưu chính, trạm thư tín",
        kunyomi: "-",
        onyomi: "ユウ",
        vocabularies: [
          { word: "郵便", reading: "ゆうびん", meaning: "Bưu chính, thư từ" },
          { word: "郵便局", reading: "ゆうびんきょく", meaning: "Bưu điện" },
          { word: "郵送", reading: "ゆうそう", meaning: "Gửi bưu điện" }
        ]
      },
      {
        character: "局",
        sino_vietnamese: "CỤC",
        meaning: "Cơ quan, bộ phận, cục diện",
        kunyomi: "つぼね",
        onyomi: "キョク",
        vocabularies: [
          { word: "薬局", reading: "やっきょく", meaning: "Hiệu thuốc" },
          { word: "局長", reading: "きょくちょう", meaning: "Cục trưởng, giám đốc" },
          { word: "結局", reading: "けっきょく", meaning: "Rốt cuộc, kết cục" }
        ]
      },
      {
        character: "貯",
        sino_vietnamese: "TRỮ",
        meaning: "Tích trữ, tiết kiệm tiền bạc",
        kunyomi: "た・める、たくわ・える",
        onyomi: "チョ",
        vocabularies: [
          { word: "貯める", reading: "ためる", meaning: "Tiết kiệm, dành dụm (tiền)" },
          { word: "貯金", reading: "ちょきん", meaning: "Tiết kiệm tiền" },
          { word: "貯蓄", reading: "ちょちく", meaning: "Tích lũy tiền của" },
          { word: "貯水池", reading: "ちょすいち", meaning: "Hồ chứa nước" }
        ]
      },
      {
        character: "包",
        sino_vietnamese: "BAO",
        meaning: "Bao bọc, gói ghém, bao hàm",
        kunyomi: "つつ・む、くる・む",
        onyomi: "ホウ",
        vocabularies: [
          { word: "包む", reading: "つつむ", meaning: "Gói lại, bọc lại" },
          { word: "包帯", reading: "ほうたい", meaning: "Băng gạc y tế" },
          { word: "小包", reading: "こづつみ", meaning: "Bưu kiện nhỏ" },
          { word: "包含", reading: "ほうがん", meaning: "Bao hàm" }
        ]
      },
      {
        character: "達",
        sino_vietnamese: "ĐẠT",
        meaning: "Đạt tới, chuyển đến, số nhiều (chúng tôi, các bạn)",
        kunyomi: "-たち",
        onyomi: "タツ、ダ",
        vocabularies: [
          { word: "私達", reading: "わたしたち", meaning: "Chúng tôi, chúng ta" },
          { word: "友達", reading: "ともだち", meaning: "Bạn bè" },
          { word: "配達", reading: "はいたつ", meaning: "Giao hàng, phát thư" },
          { word: "発達", reading: "はったつ", meaning: "Phát triển" }
        ]
      },
      {
        character: "際",
        sino_vietnamese: "TẾ",
        meaning: "Khi, dịp, ranh giới, quốc tế",
        kunyomi: "きわ",
        onyomi: "サイ",
        vocabularies: [
          { word: "際", reading: "きわ", meaning: "Mép, ven, bờ" },
          { word: "国際", reading: "こくさい", meaning: "Quốc tế" },
          { word: "実際", reading: "じっさい", meaning: "Thực tế" },
          { word: "交際", reading: "こうさい", meaning: "Giao du, hẹn hò" }
        ]
      },
      {
        character: "初",
        sino_vietnamese: "SƠ",
        meaning: "Ban đầu, lần đầu tiên, sơ đẳng",
        kunyomi: "はじ・め、はじ・めて、はつ、うい-、そ・める",
        onyomi: "ショ",
        vocabularies: [
          { word: "初めて", reading: "はじめて", meaning: "Lần đầu tiên" },
          { word: "初め", reading: "はじめ", meaning: "Ban đầu, lúc đầu" },
          { word: "初級", reading: "しょきゅう", meaning: "Sơ cấp" },
          { word: "最初", reading: "さいしょ", meaning: "Đầu tiên" },
          { word: "初夏", reading: "しょか", meaning: "Đầu hè" }
        ]
      },
      {
        character: "再",
        sino_vietnamese: "TÁI",
        meaning: "Lại, tái diễn, lần nữa",
        kunyomi: "ふたた・び",
        onyomi: "サイ、サ",
        vocabularies: [
          { word: "再び", reading: "ふたたび", meaning: "Lại một lần nữa" },
          { word: "再来週", reading: "さらいしゅう", meaning: "Tuần sau nữa" },
          { word: "再会", reading: "さいかい", meaning: "Gặp lại" },
          { word: "再生", reading: "さいせい", meaning: "Tái chế, phát lại (video)" }
        ]
      },
      {
        character: "療",
        sino_vietnamese: "LIỆU",
        meaning: "Điều trị, chữa bệnh, trị liệu",
        kunyomi: "-",
        onyomi: "リョウ",
        vocabularies: [
          { word: "治療", reading: "ちりょう", meaning: "Điều trị, chữa trị" },
          { word: "医療", reading: "いりょう", meaning: "Y tế" },
          { word: "療養", reading: "りょうよう", meaning: "Điều dưỡng, tịnh dưỡng" }
        ]
      },
      {
        character: "科",
        sino_vietnamese: "KHOA",
        meaning: "Khoa học, chuyên khoa, môn học",
        kunyomi: "-",
        onyomi: "カ",
        vocabularies: [
          { word: "科学", reading: "かがく", meaning: "Khoa học" },
          { word: "外科", reading: "げか", meaning: "Ngoại khoa" },
          { word: "内科", reading: "ないか", meaning: "Nội khoa" }
        ]
      },
      {
        character: "婦",
        sino_vietnamese: "PHỤ",
        meaning: "Phụ nữ, vợ, nàng dâu",
        kunyomi: "よめ",
        onyomi: "フ",
        vocabularies: [
          { word: "婦人", reading: "ふじん", meaning: "Phụ nữ" },
          { word: "主婦", reading: "しゅふ", meaning: "Nội trợ" },
          { word: "夫婦", reading: "ふうふ", meaning: "Vợ chồng" }
        ]
      },
      {
        character: "皮",
        sino_vietnamese: "BÌ",
        meaning: "Da dẻ, vỏ cây, vỏ hoa quả",
        kunyomi: "かわ",
        onyomi: "ヒ",
        vocabularies: [
          { word: "皮", reading: "かわ", meaning: "Vỏ (trái cây), da" },
          { word: "皮膚", reading: "ひふ", meaning: "Da dẻ, bì phu" },
          { word: "皮肉", reading: "ひにく", meaning: "Mỉa mai, châm chọc" },
          { word: "毛皮", reading: "けがわ", meaning: "Da lông thú" }
        ]
      },
      {
        character: "膚",
        sino_vietnamese: "PHU",
        meaning: "Làn da, biểu bì",
        kunyomi: "はだ",
        onyomi: "フ",
        vocabularies: [
          { word: "皮膚", reading: "ひふ", meaning: "Da" },
          { word: "皮膚科", reading: "ひふか", meaning: "Khoa da liễu" },
          { word: "完膚なきまで", reading: "かんぷなきまで", meaning: "Triệt để, tơi bời" }
        ]
      },
      {
        character: "救",
        sino_vietnamese: "CỨU",
        meaning: "Cứu giúp, cứu hộ, giúp đỡ",
        kunyomi: "すく・う",
        onyomi: "キュウ",
        vocabularies: [
          { word: "救う", reading: "すくう", meaning: "Cứu giúp, cứu rỗi" },
          { word: "救急車", reading: "きゅうきゅうしゃ", meaning: "Xe cấp cứu" },
          { word: "救助", reading: "きゅうじょ", meaning: "Cứu hộ" },
          { word: "救援", reading: "きゅうえん", meaning: "Cứu viện, chi viện" }
        ]
      },
      {
        character: "普",
        sino_vietnamese: "PHỔ",
        meaning: "Phổ biến, rộng khắp, thông thường",
        kunyomi: "あまね・く",
        onyomi: "フ",
        vocabularies: [
          { word: "普通", reading: "ふつう", meaning: "Bình thường, thông thường" },
          { word: "普及", reading: "ふきゅう", meaning: "Phổ cập, phổ biến" },
          { word: "普遍", reading: "ふへん", meaning: "Phổ quát, phổ biến" }
        ]
      },
      {
        character: "券",
        sino_vietnamese: "KHOÁN",
        meaning: "Vé, phiếu, chứng khoán",
        kunyomi: "-",
        onyomi: "ケン",
        vocabularies: [
          { word: "乗車券", reading: "じょうしゃけん", meaning: "Vé lên xe/tàu" },
          { word: "旅券", reading: "りょけん", meaning: "Hộ chiếu" },
          { word: "定期券", reading: "ていきけん", meaning: "Vé tháng" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3: Tài chính, Ngân hàng & Định lượng",
    description: "Các chữ Hán về thanh toán, tiền tệ, nhiệt độ và đối chiếu số liệu",
    kanjis: [
      {
        character: "数",
        sino_vietnamese: "SỐ",
        meaning: "Đếm, số lượng, chữ số",
        kunyomi: "かず、かぞ・える",
        onyomi: "スウ、ス",
        vocabularies: [
          { word: "数える", reading: "かぞえる", meaning: "Đếm" },
          { word: "数", reading: "かず", meaning: "Số lượng" },
          { word: "数字", reading: "すうじ", meaning: "Con số" },
          { word: "数学", reading: "すうがく", meaning: "Toán học" },
          { word: "多数", reading: "たすう", meaning: "Số đông, đa số" }
        ]
      },
      {
        character: "機",
        sino_vietnamese: "CƠ",
        meaning: "Máy móc, cơ hội, then chốt",
        kunyomi: "はた",
        onyomi: "キ",
        vocabularies: [
          { word: "機", reading: "はた", meaning: "Khung cửi dệt vải" },
          { word: "機械", reading: "きかい", meaning: "Máy móc" },
          { word: "飛行機", reading: "ひこうき", meaning: "Máy bay" },
          { word: "機会", reading: "きかい", meaning: "Cơ hội" }
        ]
      },
      {
        character: "復",
        sino_vietnamese: "PHỤC",
        meaning: "Khôi phục, quay lại, ôn tập",
        kunyomi: "また",
        onyomi: "フク",
        vocabularies: [
          { word: "往復", reading: "おうふく", meaning: "Khứ hồi, đi và về" },
          { word: "復習", reading: "ふくしゅう", meaning: "Ôn tập" },
          { word: "回復", reading: "かいふく", meaning: "Hồi phục" }
        ]
      },
      {
        character: "片",
        sino_vietnamese: "PHIẾN",
        meaning: "Một bên, mảnh vụn, phiến lá",
        kunyomi: "かた-、ひら",
        onyomi: "ヘン",
        vocabularies: [
          { word: "片道", reading: "かたみち", meaning: "Một chiều" },
          { word: "片付ける", reading: "かたづける", meaning: "Thu dọn" },
          { word: "破片", reading: "はへん", meaning: "Mảnh vỡ" },
          { word: "片言", reading: "かたこと", meaning: "Bập bẹ, vài lời" }
        ]
      },
      {
        character: "枚",
        sino_vietnamese: "MAI",
        meaning: "Tờ, tấm (đơn vị đếm vật mỏng)",
        kunyomi: "-",
        onyomi: "マイ",
        vocabularies: [
          { word: "一枚", reading: "いちまい", meaning: "1 tờ, 1 tấm" },
          { word: "枚数", reading: "まいすう", meaning: "Số lượng tờ" },
          { word: "三枚目", reading: "さんまいめ", meaning: "Danh hài, vai hài hước" }
        ]
      },
      {
        character: "期",
        sino_vietnamese: "KỲ",
        meaning: "Thời kỳ, kỳ hạn, kỳ vọng",
        kunyomi: "-",
        onyomi: "キ、ゴ",
        vocabularies: [
          { word: "期間", reading: "きかん", meaning: "Thời gian, khoảng thời gian" },
          { word: "定期", reading: "ていき", meaning: "Định kỳ" },
          { word: "期待", reading: "きたい", meaning: "Kỳ vọng, mong đợi" }
        ]
      },
      {
        character: "販",
        sino_vietnamese: "PHIẾN",
        meaning: "Buôn bán, phân phối",
        kunyomi: "-",
        onyomi: "ハン",
        vocabularies: [
          { word: "販売", reading: "はんばい", meaning: "Bán hàng, kinh doanh" },
          { word: "自動販売機", reading: "じどうはんばいき", meaning: "Máy bán hàng tự động" },
          { word: "市販", reading: "しはん", meaning: "Bày bán trên thị trường" }
        ]
      },
      {
        character: "指",
        sino_vietnamese: "CHỈ",
        meaning: "Ngón tay, chỉ trỏ, hướng dẫn",
        kunyomi: "ゆび、さ・す",
        onyomi: "シ",
        vocabularies: [
          { word: "指", reading: "ゆび", meaning: "Ngón tay" },
          { word: "指す", reading: "さす", meaning: "Chỉ (hướng, đồ vật)" },
          { word: "指定席", reading: "していせき", meaning: "Ghế chỉ định" },
          { word: "指導", reading: "しどう", meaning: "Hướng dẫn, chỉ đạo" },
          { word: "指示", reading: "しじ", meaning: "Chỉ thị" }
        ]
      },
      {
        character: "調",
        sino_vietnamese: "ĐIỀU, ĐIỆU",
        meaning: "Điều tra, điều chỉnh, điệu nhạc",
        kunyomi: "しら・べる、ととの・う、ととの・える",
        onyomi: "チョウ",
        vocabularies: [
          { word: "調べる", reading: "しらべる", meaning: "Điều tra, tra cứu" },
          { word: "整える", reading: "ととのえる", meaning: "Chuẩn bị, sắp đặt" },
          { word: "調整", reading: "ちょうせい", meaning: "Điều chỉnh" },
          { word: "調査", reading: "ちょうさ", meaning: "Khảo sát, điều tra" },
          { word: "好調", reading: "こうちょう", meaning: "Tình trạng tốt, thuận lợi" }
        ]
      },
      {
        character: "整",
        sino_vietnamese: "CHỈNH",
        meaning: "Chỉnh đốn, sắp xếp ngăn nắp",
        kunyomi: "ととの・える、ととの・う",
        onyomi: "セイ",
        vocabularies: [
          { word: "整える", reading: "ととのえる", meaning: "Sắp xếp gọn gàng, điều chỉnh" },
          { word: "整う", reading: "ととのう", meaning: "Được chỉnh đốn, sẵn sàng" },
          { word: "整理", reading: "せいり", meaning: "Chỉnh lý, sắp xếp" },
          { word: "調整", reading: "ちょうせい", meaning: "Điều chỉnh" },
          { word: "整列", reading: "せいれつ", meaning: "Xếp hàng ngay ngắn" }
        ]
      },
      {
        character: "表",
        sino_vietnamese: "BIỂU",
        meaning: "Bề mặt, biểu đồ, biểu hiện, bảng biểu",
        kunyomi: "おもて、あらわ・す、あらわ・れる",
        onyomi: "ヒョウ",
        vocabularies: [
          { word: "表", reading: "おもて", meaning: "Bề ngoài, mặt trước" },
          { word: "表す", reading: "あらわす", meaning: "Thể hiện, biểu thị" },
          { word: "表れる", reading: "あらわれる", meaning: "Xuất hiện, biểu hiện ra" },
          { word: "表示", reading: "ひょうじ", meaning: "Hiển thị, biểu thị" },
          { word: "発表", reading: "はっぴょう", meaning: "Phát biểu, công bố" },
          { word: "代表", reading: "だいひょう", meaning: "Đại diện" }
        ]
      },
      {
        character: "示",
        sino_vietnamese: "THỊ",
        meaning: "Cho xem, biểu thị, chỉ ra",
        kunyomi: "しめ・す",
        onyomi: "ジ、シ",
        vocabularies: [
          { word: "示す", reading: "しめす", meaning: "Chỉ ra, cho xem" },
          { word: "表示", reading: "ひょうじ", meaning: "Biểu thị, hiển thị" },
          { word: "指示", reading: "しじ", meaning: "Hướng dẫn, chỉ thị" },
          { word: "暗示", reading: "あんじ", meaning: "Gợi ý, ám chỉ" }
        ]
      },
      {
        character: "現",
        sino_vietnamese: "HIỆN",
        meaning: "Xuất hiện, hiện tại, tiền mặt",
        kunyomi: "あらわ・れる、あらわ・す",
        onyomi: "ゲン",
        vocabularies: [
          { word: "現れる", reading: "あらわれる", meaning: "Xuất hiện" },
          { word: "現す", reading: "あらわす", meaning: "Làm lộ ra, làm xuất hiện" },
          { word: "現在", reading: "げんざい", meaning: "Hiện tại" },
          { word: "現金", reading: "げんきん", meaning: "Tiền mặt" },
          { word: "表現", reading: "ひょうげん", meaning: "Biểu hiện, diễn đạt" }
        ]
      },
      {
        character: "支",
        sino_vietnamese: "CHI",
        meaning: "Chi trả, hỗ trợ, chi nhánh",
        kunyomi: "ささ・える",
        onyomi: "シ",
        vocabularies: [
          { word: "支える", reading: "ささえる", meaning: "Chống đỡ, nâng đỡ, hỗ trợ" },
          { word: "支払う", reading: "しはらう", meaning: "Chi trả, trả tiền" },
          { word: "支持", reading: "しじ", meaning: "Ủng hộ, ủng trợ" },
          { word: "支店", reading: "してん", meaning: "Chi nhánh" }
        ]
      },
      {
        character: "払",
        sino_vietnamese: "PHẤT",
        meaning: "Trả tiền, quét sạch, phủi bụi",
        kunyomi: "はら・う",
        onyomi: "フツ、ヒツ",
        vocabularies: [
          { word: "払う", reading: "はらう", meaning: "Trả tiền, quét dọn, phủi" },
          { word: "支払い", reading: "しはらい", meaning: "Thanh toán" },
          { word: "払拭", reading: "ふっしょく", meaning: "Xua tan, xóa bỏ" }
        ]
      },
      {
        character: "預",
        sino_vietnamese: "DỰ",
        meaning: "Gửi tiền, gửi đồ, giao phó",
        kunyomi: "あず・ける、あず・かる",
        onyomi: "ヨ",
        vocabularies: [
          { word: "預ける", reading: "あずける", meaning: "Gửi (tiền, đồ, con)" },
          { word: "預かる", reading: "あずかる", meaning: "Giữ hộ, trông nom" },
          { word: "預金", reading: "よきん", meaning: "Tiền gửi ngân hàng" },
          { word: "預金通帳", reading: "よきんつうちょう", meaning: "Sổ tiết kiệm" }
        ]
      },
      {
        character: "戻",
        sino_vietnamese: "LỆ",
        meaning: "Quay lại, trả lại, hồi phục",
        kunyomi: "もど・す、もど・る",
        onyomi: "レイ",
        vocabularies: [
          { word: "戻る", reading: "もどる", meaning: "Quay lại, trở về" },
          { word: "戻す", reading: "もどす", meaning: "Trả lại chỗ cũ, nôn ra" },
          { word: "払い戻し", reading: "はらいもどし", meaning: "Hoàn tiền, trả lại tiền" },
          { word: "返戻", reading: "へんれい", meaning: "Trả lại" }
        ]
      },
      {
        character: "残",
        sino_vietnamese: "TÀN",
        meaning: "Còn lại, tàn dư, độc ác",
        kunyomi: "のこ・る、のこ・す",
        onyomi: "ザン",
        vocabularies: [
          { word: "残る", reading: "のこる", meaning: "Còn lại, sót lại" },
          { word: "残す", reading: "のこす", meaning: "Để lại, chừa lại" },
          { word: "残業", reading: "ざんぎょう", meaning: "Làm thêm giờ" },
          { word: "残念", reading: "ざんねん", meaning: "Đáng tiếc" },
          { word: "残高", reading: "ざんだか", meaning: "Số dư tài khoản" }
        ]
      },
      {
        character: "照",
        sino_vietnamese: "CHIẾU",
        meaning: "Chiếu sáng, đối chiếu, ngượng ngùng",
        kunyomi: "て・る、て・らす、て・れる",
        onyomi: "ショウ",
        vocabularies: [
          { word: "照る", reading: "てる", meaning: "Nắng, chiếu sáng" },
          { word: "照らす", reading: "てらす", meaning: "Chiếu sáng, soi rọi" },
          { word: "照れる", reading: "てれる", meaning: "Ngượng ngùng, xấu hổ" },
          { word: "対照", reading: "たいしょう", meaning: "Đối chiếu, tương phản" },
          { word: "残高照会", reading: "ざんだかしょうかい", meaning: "Tra cứu số dư" },
          { word: "照明", reading: "しょうめい", meaning: "Ánh sáng, đèn chiếu" }
        ]
      },
      {
        character: "硬",
        sino_vietnamese: "NGẠNH",
        meaning: "Cứng rắn, khô cứng, cứng ngắc",
        kunyomi: "かた・い",
        onyomi: "コウ",
        vocabularies: [
          { word: "硬い", reading: "かたい", meaning: "Cứng (đá, kim loại, văn phong)" },
          { word: "硬貨", reading: "こうか", meaning: "Tiền xu" },
          { word: "強硬", reading: "きょうこう", meaning: "Ngoan cố, kiên quyết" },
          { word: "硬式", reading: "こうしき", meaning: "Kiểu bóng cứng" }
        ]
      },
      {
        character: "貨",
        sino_vietnamese: "HÓA",
        meaning: "Hàng hoá, tiền tệ",
        kunyomi: "たから",
        onyomi: "カ",
        vocabularies: [
          { word: "硬貨", reading: "こうか", meaning: "Tiền kim loại, tiền xu" },
          { word: "通貨", reading: "つうか", meaning: "Tiền tệ" },
          { word: "貨物", reading: "かもつ", meaning: "Hàng hoá" }
        ]
      },
      {
        character: "確",
        sino_vietnamese: "XÁC",
        meaning: "Chính xác, xác thực, vững chắc",
        kunyomi: "たし・か、たし・かめる",
        onyomi: "カク",
        vocabularies: [
          { word: "確か", reading: "たしか", meaning: "Chắc chắn, chuẩn xác" },
          { word: "確かめる", reading: "たしかめる", meaning: "Xác nhận, làm rõ" },
          { word: "確認", reading: "かくにん", meaning: "Xác nhận" },
          { word: "正確", reading: "せいかく", meaning: "Chính xác" },
          { word: "確定", reading: "かくてい", meaning: "Xác định rõ ràng" }
        ]
      },
      {
        character: "認",
        sino_vietnamese: "NHẬN",
        meaning: "Công nhận, thừa nhận, nhìn nhận",
        kunyomi: "みと・める",
        onyomi: "ニン",
        vocabularies: [
          { word: "認める", reading: "みとめる", meaning: "Công nhận, thừa nhận, tha thứ" },
          { word: "確認", reading: "かくにん", meaning: "Xác nhận" },
          { word: "認識", reading: "にんしき", meaning: "Nhận thức" },
          { word: "承認", reading: "しょうにん", meaning: "Phê duyệt, chấp thuận" }
        ]
      },
      {
        character: "違",
        sino_vietnamese: "VI",
        meaning: "Sai khác, khác biệt, vi phạm",
        kunyomi: "ちが・う、ちが・える",
        onyomi: "イ",
        vocabularies: [
          { word: "違う", reading: "ちがう", meaning: "Khác, sai" },
          { word: "間違える", reading: "まちがえる", meaning: "Nhầm lẫn, làm sai" },
          { word: "違い", reading: "ちがい", meaning: "Sự khác nhau" },
          { word: "違法", reading: "いほう", meaning: "Trái phép, phạm pháp" },
          { word: "違反", reading: "いはん", meaning: "Vi phạm" }
        ]
      },
      {
        character: "取",
        sino_vietnamese: "THỦ",
        meaning: "Lấy, cầm, đoạt lấy, tiếp thu",
        kunyomi: "と・る",
        onyomi: "シュ",
        vocabularies: [
          { word: "取る", reading: "とる", meaning: "Lấy, cầm, giành lấy" },
          { word: "取材", reading: "しゅざい", meaning: "Thu thập tư liệu, lấy tin" },
          { word: "取得", reading: "しゅとく", meaning: "Đạt được, lấy được" },
          { word: "取引", reading: "とりひき", meaning: "Giao dịch" }
        ]
      },
      {
        character: "消",
        sino_vietnamese: "TIÊU",
        meaning: "Tắt, xoá bỏ, tiêu hoá, biến mất",
        kunyomi: "き・える、け・す",
        onyomi: "ショウ",
        vocabularies: [
          { word: "消える", reading: "きえる", meaning: "Biến mất, tắt (đèn)" },
          { word: "消す", reading: "けす", meaning: "Tắt, xoá, dập tắt" },
          { word: "消しゴム", reading: "けしごむ", meaning: "Cục tẩy" },
          { word: "消防", reading: "しょうぼう", meaning: "Cứu hoả" },
          { word: "消費", reading: "しょうひ", meaning: "Tiêu dùng" }
        ]
      },
      {
        character: "温",
        sino_vietnamese: "ÔN",
        meaning: "Ấm áp, nhiệt độ, ôn hoà",
        kunyomi: "あたた・か、あたた・かい、あたた・まる、あたた・める",
        onyomi: "オン",
        vocabularies: [
          { word: "温かい", reading: "あたたかい", meaning: "Ấm áp" },
          { word: "温める", reading: "あたためる", meaning: "Hâm nóng, làm ấm" },
          { word: "温度", reading: "おんど", meaning: "Nhiệt độ" },
          { word: "気温", reading: "きおん", meaning: "Nhiệt độ không khí" },
          { word: "温泉", reading: "おんせん", meaning: "Suối nước nóng" }
        ]
      },
      {
        character: "冷",
        sino_vietnamese: "LÃNH",
        meaning: "Lạnh lẽo, nguội lạnh, bình tĩnh",
        kunyomi: "つめ・たい、ひ・える、ひ・やす、さ・める、さ・ます",
        onyomi: "レイ",
        vocabularies: [
          { word: "冷たい", reading: "つめたい", meaning: "Lạnh buốt (đồ vật, thái độ)" },
          { word: "冷える", reading: "ひえる", meaning: "Lạnh đi" },
          { word: "冷ます", reading: "さます", meaning: "Làm nguội" },
          { word: "冷蔵庫", reading: "れいぞうこ", meaning: "Tủ lạnh" },
          { word: "冷静", reading: "れいせい", meaning: "Điềm tĩnh" },
          { word: "冷房", reading: "れいぼう", meaning: "Máy lạnh, điều hoà mát" }
        ]
      },
      {
        character: "緑",
        sino_vietnamese: "LỤC",
        meaning: "Màu xanh lá cây",
        kunyomi: "みどり",
        onyomi: "リョク、ロク",
        vocabularies: [
          { word: "緑", reading: "みどり", meaning: "Màu xanh lục, cây xanh" },
          { word: "緑茶", reading: "りょくちゃ", meaning: "Trà xanh" },
          { word: "新緑", reading: "しんりょく", meaning: "Chồi non xanh biếc" },
          { word: "緑地", reading: "りょくち", meaning: "Khu vực cây xanh" }
        ]
      },
      {
        character: "紅",
        sino_vietnamese: "HỒNG",
        meaning: "Màu đỏ thắm, hồng trà, son môi",
        kunyomi: "べに、くれない",
        onyomi: "コウ、ク",
        vocabularies: [
          { word: "口紅", reading: "くちべに", meaning: "Son môi" },
          { word: "紅茶", reading: "こうちゃ", meaning: "Trà đen (hồng trà)" },
          { word: "紅葉", reading: "こうよう", meaning: "Lá đỏ mùa thu" },
          { word: "真紅", reading: "しんく", meaning: "Đỏ tươi, đỏ thắm" }
        ]
      },
      {
        character: "玉",
        sino_vietnamese: "NGỌC",
        meaning: "Viên ngọc, quả bóng tròn, quả trứng",
        kunyomi: "たま",
        onyomi: "ギョク",
        vocabularies: [
          { word: "玉", reading: "たま", meaning: "Viên ngọc, hòn bi, hạt" },
          { word: "玉ねぎ", reading: "たまねぎ", meaning: "Củ hành tây" },
          { word: "目玉", reading: "めだま", meaning: "Nhãn cầu, điểm nổi bật" },
          { word: "玉石", reading: "ぎょくせき", meaning: "Ngọc lẫn đá, vàng thau lẫn lộn" }
        ]
      },
      {
        character: "返",
        sino_vietnamese: "PHẢN",
        meaning: "Trả lại, đáp lại, lật mặt",
        kunyomi: "かえ・す、かえ・る",
        onyomi: "ヘン",
        vocabularies: [
          { word: "返す", reading: "かえす", meaning: "Trả lại, hoàn lại" },
          { word: "返る", reading: "かえる", meaning: "Trở lại, quay lại" },
          { word: "返事", reading: "へんじ", meaning: "Trả lời, hồi đáp" },
          { word: "返却", reading: "へんきゃく", meaning: "Trả lại đồ (sách thư viện)" },
          { word: "恩返し", reading: "おんがえし", meaning: "Đền ơn đáp nghĩa" }
        ]
      },
      {
        character: "団",
        sino_vietnamese: "ĐOÀN",
        meaning: "Đoàn thể, tập thể, vo tròn",
        kunyomi: "-",
        onyomi: "ダン、トン",
        vocabularies: [
          { word: "団体", reading: "だんたい", meaning: "Đoàn thể, nhóm" },
          { word: "団地", reading: "だんち", meaning: "Khu tập thể, khu chung cư" },
          { word: "布団", reading: "ふとん", meaning: "Nệm, chăn đệm" }
        ]
      },
      {
        character: "般",
        sino_vietnamese: "BAN, BÁT",
        meaning: "Toàn thể, nói chung, phổ thông",
        kunyomi: "-",
        onyomi: "ハン",
        vocabularies: [
          { word: "一般", reading: "いっぱん", meaning: "Nói chung, phổ thông, thông thường" },
          { word: "全般", reading: "ぜんぱん", meaning: "Toàn bộ, tổng thể" },
          { word: "一般人", reading: "いっぱんじん", meaning: "Người bình thường" }
        ]
      },
      {
        character: "幼",
        sino_vietnamese: "ẤU",
        meaning: "Nhỏ tuổi, thơ ấu, non nớt",
        kunyomi: "おさな・い",
        onyomi: "ヨウ",
        vocabularies: [
          { word: "幼い", reading: "おさない", meaning: "Thơ ngây, non nớt" },
          { word: "幼児", reading: "ようじ", meaning: "Trẻ ấu nhi" },
          { word: "幼稚園", reading: "ようちえん", meaning: "Trường mẫu giáo" },
          { word: "幼少期", reading: "ようしょうき", meaning: "Thời thơ ấu" }
        ]
      },
      {
        character: "児",
        sino_vietnamese: "NHI",
        meaning: "Trẻ con, trẻ sơ sinh, con cái",
        kunyomi: "こ",
        onyomi: "ジ、ニ",
        vocabularies: [
          { word: "小児科", reading: "しょうにか", meaning: "Khoa nhi" },
          { word: "児童", reading: "じどう", meaning: "Nhi đồng" },
          { word: "育児", reading: "いくじ", meaning: "Nuôi dạy con" }
        ]
      },
      {
        character: "歳",
        sino_vietnamese: "TUẾ",
        meaning: "Tuổi tác, năm tháng",
        kunyomi: "とし、とせ",
        onyomi: "サイ、セイ",
        vocabularies: [
          { word: "〜歳", reading: "〜さい", meaning: "... tuổi" },
          { word: "二十歳", reading: "はたち", meaning: "20 tuổi" },
          { word: "歳月", reading: "さいげつ", meaning: "Năm tháng, thời gian" }
        ]
      },
      {
        character: "未",
        sino_vietnamese: "VỊ",
        meaning: "Chưa, vị thành niên, chưa đến",
        kunyomi: "いま・だ、ひつじ",
        onyomi: "ミ",
        vocabularies: [
          { word: "未だ", reading: "いまだ", meaning: "Vẫn chưa" },
          { word: "未成年", reading: "みせいねん", meaning: "Vị thành niên" },
          { word: "未来", reading: "みらい", meaning: "Tương lai" },
          { word: "未満", reading: "みまん", meaning: "Chưa đủ, dưới mức" }
        ]
      },
      {
        character: "満",
        sino_vietnamese: "MÃN",
        meaning: "Đầy ắp, thoả mãn, trọn vẹn",
        kunyomi: "み・ちる、み・たす",
        onyomi: "マン",
        vocabularies: [
          { word: "満ちる", reading: "みちる", meaning: "Tràn đầy (nước, năng lượng)" },
          { word: "満たす", reading: "みたす", meaning: "Làm thoả mãn, làm đầy" },
          { word: "満足", reading: "まんぞく", meaning: "Thoả mãn, hài lòng" },
          { word: "満員", reading: "まんいん", meaning: "Kín chỗ, đông nghẹt" },
          { word: "満点", reading: "まんてん", meaning: "Điểm tối đa" }
        ]
      },
      {
        character: "老",
        sino_vietnamese: "LÃO",
        meaning: "Già nua, người già, lão luyện",
        kunyomi: "お・いる、ふ・ける",
        onyomi: "ロウ",
        vocabularies: [
          { word: "老いる", reading: "おいる", meaning: "Già đi" },
          { word: "老ける", reading: "ふける", meaning: "Trông già đi" },
          { word: "老人", reading: "ろうじん", meaning: "Người già" },
          { word: "老後", reading: "ろうご", meaning: "Tuổi già, dưỡng già" },
          { word: "敬老", reading: "けいろう", meaning: "Kính lão" }
        ]
      },
      {
        character: "設",
        sino_vietnamese: "THIẾT",
        meaning: "Thiết lập, bày đặt, xây dựng, kiến thiết",
        kunyomi: "もう・ける",
        onyomi: "セツ",
        vocabularies: [
          { word: "設ける", reading: "もうける", meaning: "Thiết lập, lập ra" },
          { word: "設定", reading: "せってい", meaning: "Cài đặt, thiết lập" },
          { word: "設計", reading: "せっけい", meaning: "Thiết kế" },
          { word: "施設", reading: "しせつ", meaning: "Cơ sở vật chất" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4: Kỹ thuật, Quy cách & Thủ tục văn phòng",
    description: "Các chữ Hán về sửa chữa, hồ sơ, tuyển chọn, in ấn và quy mô",
    kanjis: [
      {
        character: "換",
        sino_vietnamese: "HOÁN",
        meaning: "Đổi, hoán đổi, thay thế",
        kunyomi: "か・える、か・わる",
        onyomi: "カン",
        vocabularies: [
          { word: "換える", reading: "かえる", meaning: "Đổi chác, thay đổi" },
          { word: "換わる", reading: "かわる", meaning: "Được thay đổi" },
          { word: "換気", reading: "かんき", meaning: "Thông gió" },
          { word: "交換", reading: "こうかん", meaning: "Trao đổi, thay thế" },
          { word: "変換", reading: "へんかん", meaning: "Chuyển đổi" }
        ]
      },
      {
        character: "向",
        sino_vietnamese: "HƯỚNG",
        meaning: "Hướng về, đối diện, phương hướng",
        kunyomi: "む・く、む・ける、む・かう、む・こう",
        onyomi: "コウ",
        vocabularies: [
          { word: "向く", reading: "むく", meaning: "Hướng về, hợp với" },
          { word: "向ける", reading: "むける", meaning: "Hướng tới, chĩa về" },
          { word: "向かい", reading: "むかい", meaning: "Phía đối diện" },
          { word: "方向", reading: "ほうこう", meaning: "Phương hướng" },
          { word: "傾向", reading: "けいこう", meaning: "Khuynh hướng" },
          { word: "向上", reading: "こうじょう", meaning: "Tiến bộ, nâng cao" }
        ]
      },
      {
        character: "停",
        sino_vietnamese: "ĐÌNH",
        meaning: "Dừng lại, đình chỉ, trạm dừng",
        kunyomi: "と・まる、と・める",
        onyomi: "テイ",
        vocabularies: [
          { word: "停止", reading: "ていし", meaning: "Đình chỉ, dừng lại" },
          { word: "停車", reading: "ていしゃ", meaning: "Dừng xe" },
          { word: "停電", reading: "ていでん", meaning: "Mất điện" }
        ]
      },
      {
        character: "暖",
        sino_vietnamese: "NOÃN",
        meaning: "Ấm áp (thời tiết), sưởi ấm",
        kunyomi: "あたた・か、あたた・かい、あたた・まる、あたた・める",
        onyomi: "ダン",
        vocabularies: [
          { word: "暖かい", reading: "あたたかい", meaning: "Ấm áp (thời tiết)" },
          { word: "暖まる", reading: "あたたまる", meaning: "Trở nên ấm áp" },
          { word: "暖房", reading: "だんぼう", meaning: "Lò sưởi, máy sưởi" },
          { word: "温暖", reading: "おんだん", meaning: "Ấm áp (khí hậu)" },
          { word: "暖冬", reading: "だんとう", meaning: "Mùa đông ấm" }
        ]
      },
      {
        character: "除",
        sino_vietnamese: "TRỪ",
        meaning: "Loại trừ, xoá bỏ, phép chia",
        kunyomi: "のぞ・く",
        onyomi: "ジョ、ジ",
        vocabularies: [
          { word: "除く", reading: "のぞく", meaning: "Loại trừ, gạt bỏ, ngoại trừ" },
          { word: "除湿", reading: "じょしつ", meaning: "Hút ẩm" },
          { word: "削除", reading: "さくじょ", meaning: "Xoá bỏ" },
          { word: "掃除", reading: "そうじ", meaning: "Dọn dẹp" }
        ]
      },
      {
        character: "湿",
        sino_vietnamese: "THẤP",
        meaning: "Ẩm ướt, độ ẩm, bệnh ngoài da",
        kunyomi: "しめ・る、しめ・す",
        onyomi: "シツ",
        vocabularies: [
          { word: "湿る", reading: "しめる", meaning: "Bị ẩm ướt" },
          { word: "湿度", reading: "しつど", meaning: "Độ ẩm" },
          { word: "湿気", reading: "しっけ", meaning: "Hơi ẩm" },
          { word: "除湿器", reading: "じょしつき", meaning: "Máy hút ẩm" }
        ]
      },
      {
        character: "標",
        sino_vietnamese: "TIÊU",
        meaning: "Tiêu chuẩn, mục tiêu, biển báo",
        kunyomi: "しるし",
        onyomi: "ヒョウ",
        vocabularies: [
          { word: "標", reading: "しるし", meaning: "Biển chỉ dẫn, mốc" },
          { word: "標準", reading: "ひょうじゅん", meaning: "Tiêu chuẩn" },
          { word: "目標", reading: "もくひょう", meaning: "Mục tiêu" },
          { word: "標識", reading: "ひょうしき", meaning: "Biển báo" }
        ]
      },
      {
        character: "倍",
        sino_vietnamese: "BỘI",
        meaning: "Gấp đôi, gấp bội, lần",
        kunyomi: "-",
        onyomi: "バイ",
        vocabularies: [
          { word: "倍", reading: "ばい", meaning: "Gấp đôi, gấp lần" },
          { word: "二倍", reading: "にばい", meaning: "Gấp 2 lần" },
          { word: "倍率", reading: "ばいりつ", meaning: "Tỷ lệ chọi, độ phóng đại" }
        ]
      },
      {
        character: "巻",
        sino_vietnamese: "QUYỂN",
        meaning: "Cuốn, cuộn lại, tập sách",
        kunyomi: "ま・く、まき",
        onyomi: "カン",
        vocabularies: [
          { word: "巻く", reading: "まく", meaning: "Cuộn lại, quấn (khăn)" },
          { word: "巻き寿司", reading: "まきずし", meaning: "Cơm cuộn sushi" },
          { word: "第一巻", reading: "だいいっかん", meaning: "Tập 1" },
          { word: "全巻", reading: "ぜんかん", meaning: "Toàn bộ các tập" }
        ]
      },
      {
        character: "録",
        sino_vietnamese: "LỤC",
        meaning: "Ghi chép, ghi âm, ghi hình",
        kunyomi: "しる・す、と・る",
        onyomi: "ロク",
        vocabularies: [
          { word: "記録", reading: "きろく", meaning: "Kỷ lục, ghi chép" },
          { word: "録音", reading: "ろくおん", meaning: "Ghi âm" },
          { word: "登録", reading: "とうろく", meaning: "Đăng ký" }
        ]
      },
      {
        character: "量",
        sino_vietnamese: "LƯỢNG",
        meaning: "Khối lượng, số lượng, đo lường",
        kunyomi: "はか・る",
        onyomi: "リョウ",
        vocabularies: [
          { word: "量る", reading: "はかる", meaning: "Cân, đong, đo khối lượng" },
          { word: "数量", reading: "すうりょう", meaning: "Số lượng" },
          { word: "重量", reading: "じゅうりょう", meaning: "Trọng lượng" },
          { word: "大量", reading: "たいりょう", meaning: "Số lượng lớn" }
        ]
      },
      {
        character: "予",
        sino_vietnamese: "DỰ",
        meaning: "Dự báo, trước, dự định",
        kunyomi: "あらかじ・め",
        onyomi: "ヨ",
        vocabularies: [
          { word: "予め", reading: "あらかじめ", meaning: "Trước, sẵn sàng" },
          { word: "予定", reading: "よてい", meaning: "Dự định" },
          { word: "予約", reading: "よやく", meaning: "Đặt trước" },
          { word: "予算", reading: "よさん", meaning: "Ngân sách" }
        ]
      },
      {
        character: "約",
        sino_vietnamese: "ƯỚC",
        meaning: "Hẹn ước, lời hứa, khoảng chừng, tóm tắt",
        kunyomi: "つづ・まる、つづ・める",
        onyomi: "ヤク",
        vocabularies: [
          { word: "予約", reading: "よやく", meaning: "Đặt hẹn, đặt trước" },
          { word: "約束", reading: "やくそく", meaning: "Lời hứa, quy ước" },
          { word: "約", reading: "やく", meaning: "Khoảng, ước chừng" }
        ]
      },
      {
        character: "帯",
        sino_vietnamese: "ĐỚI, ĐÁI",
        meaning: "Thắt lưng, dải, vành đai, mang theo",
        kunyomi: "お・びる、おび",
        onyomi: "タイ",
        vocabularies: [
          { word: "帯", reading: "おび", meaning: "Dải thắt lưng Kimono" },
          { word: "帯びる", reading: "おびる", meaning: "Mang sắc thái, nhiễm" },
          { word: "時間帯", reading: "じかんたい", meaning: "Khung giờ" },
          { word: "熱帯", reading: "ねったい", meaning: "Nhiệt đới" },
          { word: "携帯", reading: "けいたい", meaning: "Điện thoại di động" }
        ]
      },
      {
        character: "保",
        sino_vietnamese: "BẢO",
        meaning: "Bảo vệ, duy trì, bảo hiểm, bảo quản",
        kunyomi: "たも・つ",
        onyomi: "ホ、ホウ",
        vocabularies: [
          { word: "保つ", reading: "たもつ", meaning: "Duy trì, giữ gìn" },
          { word: "保険", reading: "ほけん", meaning: "Bảo hiểm" },
          { word: "保存", reading: "ほぞん", meaning: "Bảo tồn, lưu trữ" },
          { word: "保護", reading: "ほご", meaning: "Bảo hộ, che chở" }
        ]
      },
      {
        character: "留",
        sino_vietnamese: "LƯU",
        meaning: "Giữ lại, lưu lại, du học",
        kunyomi: "と・まる、と・める",
        onyomi: "リュウ、ル",
        vocabularies: [
          { word: "留まる", reading: "とまる", meaning: "Dừng lại, đọng lại" },
          { word: "留める", reading: "とめる", meaning: "Đọng lại, bấm (ghim)" },
          { word: "留守", reading: "るす", meaning: "Vắng nhà" },
          { word: "留学", reading: "りゅうがく", meaning: "Du học" },
          { word: "保留", reading: "ほりゅう", meaning: "Bảo lưu, giữ lại tạm thời" }
        ]
      },
      {
        character: "守",
        sino_vietnamese: "THỦ",
        meaning: "Bảo vệ, gìn giữ, tuân thủ",
        kunyomi: "まも・る、もり",
        onyomi: "シュ、ス",
        vocabularies: [
          { word: "守る", reading: "まもる", meaning: "Bảo vệ, giữ (lời hứa)" },
          { word: "子守", reading: "こもり", meaning: "Trông trẻ" },
          { word: "留守番", reading: "るすばん", meaning: "Trông nhà" },
          { word: "保守", reading: "ほしゅ", meaning: "Bảo thủ, bảo trì" },
          { word: "厳守", reading: "げんしゅ", meaning: "Tuân thủ nghiêm ngặt" }
        ]
      },
      {
        character: "伝",
        sino_vietnamese: "TRUYỀN",
        meaning: "Truyền đạt, lan truyền, truyền thống",
        kunyomi: "つた・わる、つた・える、つた・う",
        onyomi: "デン",
        vocabularies: [
          { word: "伝える", reading: "つたえる", meaning: "Truyền đạt, nhắn nhủ" },
          { word: "伝わる", reading: "つたわる", meaning: "Được truyền bá, lan toả" },
          { word: "手伝う", reading: "てつだう", meaning: "Giúp đỡ" },
          { word: "伝言", reading: "でんごん", meaning: "Lời nhắn" },
          { word: "伝統", reading: "でんとう", meaning: "Truyền thống" }
        ]
      },
      {
        character: "済",
        sino_vietnamese: "TẾ",
        meaning: "Xong xuôi, kết thúc, thanh toán, cứu tế",
        kunyomi: "す・む、す・ます",
        onyomi: "サイ、セイ",
        vocabularies: [
          { word: "済む", reading: "すむ", meaning: "Xong, kết thúc, giải quyết xong" },
          { word: "済ます", reading: "すます", meaning: "Kết thúc, làm cho xong" },
          { word: "経済", reading: "けいざい", meaning: "Kinh tế" },
          { word: "返済", reading: "へんさい", meaning: "Trả nợ, hoàn trả" },
          { word: "決済", reading: "けっさい", meaning: "Thanh toán" }
        ]
      },
      {
        character: "件",
        sino_vietnamese: "KIỆN",
        meaning: "Sự việc, vụ việc, sự kiện, thư",
        kunyomi: "くだん",
        onyomi: "ケン",
        vocabularies: [
          { word: "事件", reading: "じけん", meaning: "Vụ án, sự kiện" },
          { word: "用件", reading: "ようけん", meaning: "Công việc cần bàn" },
          { word: "件名", reading: "けんめい", meaning: "Tiêu đề (email)" }
        ]
      },
      {
        character: "信",
        sino_vietnamese: "TÍN",
        meaning: "Tin tưởng, tín nhiệm, thư từ, tín hiệu",
        kunyomi: "-",
        onyomi: "シン",
        vocabularies: [
          { word: "信じる", reading: "しんじる", meaning: "Tin tưởng" },
          { word: "信用", reading: "しんよう", meaning: "Tín nhiệm, lòng tin" },
          { word: "信号", reading: "しんごう", meaning: "Đèn giao thông" }
        ]
      },
      {
        character: "歴",
        sino_vietnamese: "LỊCH",
        meaning: "Lịch sử, trải qua, lý lịch",
        kunyomi: "-",
        onyomi: "レキ",
        vocabularies: [
          { word: "歴史", reading: "れきし", meaning: "Lịch sử" },
          { word: "履歴書", reading: "りれきしょ", meaning: "Sơ yếu lý lịch" },
          { word: "経歴", reading: "けいれき", meaning: "Quá trình công tác, lý lịch" }
        ]
      },
      {
        character: "箱",
        sino_vietnamese: "TƯƠNG",
        meaning: "Cái hộp, cái hòm, thùng",
        kunyomi: "はこ",
        onyomi: "ソウ",
        vocabularies: [
          { word: "箱", reading: "はこ", meaning: "Cái hộp, thùng" },
          { word: "ゴミ箱", reading: "ごみばこ", meaning: "Thùng rác" },
          { word: "本箱", reading: "ほんばこ", meaning: "Kệ sách, tủ sách" }
        ]
      },
      {
        character: "規",
        sino_vietnamese: "QUY",
        meaning: "Quy tắc, quy định, khuôn mẫu",
        kunyomi: "-",
        onyomi: "キ",
        vocabularies: [
          { word: "規則", reading: "きそく", meaning: "Quy tắc" },
          { word: "規定", reading: "きてい", meaning: "Quy định" },
          { word: "規模", reading: "きぼ", meaning: "Quy mô" }
        ]
      },
      {
        character: "変",
        sino_vietnamese: "BIẾN",
        meaning: "Thay đổi, biến đổi, kỳ lạ, tai biến",
        kunyomi: "か・わる、か・える",
        onyomi: "ヘン",
        vocabularies: [
          { word: "変わる", reading: "かわる", meaning: "Thay đổi, khác thường" },
          { word: "変える", reading: "かえる", meaning: "Đổi, biến đổi" },
          { word: "変化", reading: "へんか", meaning: "Thay đổi, biến hoá" },
          { word: "大変", reading: "たいへん", meaning: "Vất vả, khó khăn" },
          { word: "変", reading: "へん", meaning: "Kỳ lạ, quái dị" }
        ]
      },
      {
        character: "選",
        sino_vietnamese: "TUYỂN",
        meaning: "Lựa chọn, tuyển chọn, bầu cử",
        kunyomi: "えら・ぶ",
        onyomi: "セン",
        vocabularies: [
          { word: "選ぶ", reading: "えらぶ", meaning: "Lựa chọn" },
          { word: "選手", reading: "せんしゅ", meaning: "Vận động viên, tuyển thủ" },
          { word: "選挙", reading: "せんきょ", meaning: "Bầu cử" },
          { word: "選択", reading: "せんたく", meaning: "Tuyển chọn, lựa chọn" }
        ]
      },
      {
        character: "決",
        sino_vietnamese: "QUYẾT",
        meaning: "Quyết định, quyết tâm, giải quyết",
        kunyomi: "き・める、き・まる",
        onyomi: "ケツ",
        vocabularies: [
          { word: "決める", reading: "きめる", meaning: "Quyết định" },
          { word: "決まる", reading: "きまる", meaning: "Được định đoạt" },
          { word: "決定", reading: "けってい", meaning: "Quyết định" },
          { word: "決心", reading: "けっしん", meaning: "Quyết tâm" },
          { word: "解決", reading: "かいけつ", meaning: "Giải quyết" }
        ]
      },
      {
        character: "登",
        sino_vietnamese: "ĐĂNG",
        meaning: "Leo lên, đăng ký, xuất hiện",
        kunyomi: "のぼ・る",
        onyomi: "トウ、ト",
        vocabularies: [
          { word: "登る", reading: "のぼる", meaning: "Leo (núi), trèo" },
          { word: "登山", reading: "とざん", meaning: "Leo núi" },
          { word: "登録", reading: "とうろく", meaning: "Đăng ký" },
          { word: "登場", reading: "とうじょう", meaning: "Xuất hiện (trên sân khấu, màn ảnh)" }
        ]
      },
      {
        character: "編",
        sino_vietnamese: "BIÊN",
        meaning: "Đan len, biên tập, soạn thảo",
        kunyomi: "あ・む",
        onyomi: "ヘン",
        vocabularies: [
          { word: "編む", reading: "あむ", meaning: "Đan (áo len)" },
          { word: "編集", reading: "へんしゅう", meaning: "Biên tập" },
          { word: "短編", reading: "たんぺん", meaning: "Truyện ngắn" },
          { word: "編成", reading: "へんせい", meaning: "Tổ chức, cơ cấu" }
        ]
      },
      {
        character: "能",
        sino_vietnamese: "NĂNG",
        meaning: "Năng lực, khả năng, kịch Noh",
        kunyomi: "-",
        onyomi: "ノウ",
        vocabularies: [
          { word: "能力", reading: "のうりょく", meaning: "Năng lực" },
          { word: "可能", reading: "かのう", meaning: "Khả năng, khả thi" },
          { word: "機能", reading: "きのう", meaning: "Chức năng" }
        ]
      },
      {
        character: "修",
        sino_vietnamese: "TU",
        meaning: "Sửa chữa, tu dưỡng, tu học",
        kunyomi: "おさ・める、おさ・まる",
        onyomi: "シュウ、シュ",
        vocabularies: [
          { word: "修める", reading: "おさめる", meaning: "Trau dồi, tu dưỡng" },
          { word: "修理", reading: "しゅうり", meaning: "Sửa chữa" },
          { word: "修学旅行", reading: "しゅうがくりょこう", meaning: "Chuyến đi dã ngoại học tập" },
          { word: "研修", reading: "けんしゅう", meaning: "Tu nghiệp, thực tập sinh" }
        ]
      },
      {
        character: "完",
        sino_vietnamese: "HOÀN",
        meaning: "Hoàn thành, trọn vẹn, hoàn hảo",
        kunyomi: "-",
        onyomi: "カン",
        vocabularies: [
          { word: "完成", reading: "かんせい", meaning: "Hoàn thành" },
          { word: "完全", reading: "かんぜん", meaning: "Hoàn hảo, toàn diện" },
          { word: "完了", reading: "かんりょう", meaning: "Hoàn tất" }
        ]
      },
      {
        character: "了",
        sino_vietnamese: "LIỄU",
        meaning: "Kết thúc, hoàn tất, thấu hiểu",
        kunyomi: "-",
        onyomi: "リョウ",
        vocabularies: [
          { word: "完了", reading: "かんりょう", meaning: "Hoàn tất" },
          { word: "終了", reading: "しゅうりょう", meaning: "Kết thúc" },
          { word: "了解", reading: "りょうかい", meaning: "Hiểu rõ, đồng ý" }
        ]
      },
      {
        character: "像",
        sino_vietnamese: "TƯỢNG",
        meaning: "Hình tượng, bức tượng, hình ảnh",
        kunyomi: "-",
        onyomi: "ゾウ",
        vocabularies: [
          { word: "画像", reading: "がぞう", meaning: "Hình ảnh kỹ thuật số" },
          { word: "想像", reading: "そうぞう", meaning: "Tưởng tượng" },
          { word: "映像", reading: "えいぞう", meaning: "Hình ảnh, phim ảnh" }
        ]
      },
      {
        character: "類",
        sino_vietnamese: "LOẠI",
        meaning: "Chủng loại, giống nhau, phân loại",
        kunyomi: "たぐ・い",
        onyomi: "ルイ",
        vocabularies: [
          { word: "類", reading: "たぐい", meaning: "Loại, giống loại" },
          { word: "書類", reading: "しょるい", meaning: "Giấy tờ, tài liệu" },
          { word: "種類", reading: "しゅるい", meaning: "Chủng loại" },
          { word: "分類", reading: "ぶんるい", meaning: "Phân loại" }
        ]
      },
      {
        character: "式",
        sino_vietnamese: "THỨC",
        meaning: "Nghi thức, công thức, phong cách",
        kunyomi: "-",
        onyomi: "シキ",
        vocabularies: [
          { word: "結婚式", reading: "けっこんしき", meaning: "Lễ kết hôn" },
          { word: "公式", reading: "こうしき", meaning: "Công thức, chính thức" },
          { word: "様式", reading: "ようしき", meaning: "Kiểu cách, biểu mẫu" }
        ]
      },
      {
        character: "央",
        sino_vietnamese: "ƯƠNG",
        meaning: "Chính giữa, trung ương",
        kunyomi: "-",
        onyomi: "オウ",
        vocabularies: [
          { word: "中央", reading: "ちゅうおう", meaning: "Trung ương, chính giữa" },
          { word: "中央線", reading: "ちゅうおうせん", meaning: "Tuyến đường trung tâm" }
        ]
      },
      {
        character: "存",
        sino_vietnamese: "TỒN",
        meaning: "Tồn tại, bảo tồn, biết (khiêm nhường ngữ)",
        kunyomi: "-",
        onyomi: "ゾン、ソン",
        vocabularies: [
          { word: "保存", reading: "ほぞん", meaning: "Bảo tồn, lưu trữ" },
          { word: "存在", reading: "そんざい", meaning: "Tồn tại" },
          { word: "ご存知", reading: "ごぞんじ", meaning: "Biết (kính ngữ)" }
        ]
      },
      {
        character: "印",
        sino_vietnamese: "ẤN",
        meaning: "Dấu ấn, con dấu, in ấn, Ấn Độ",
        kunyomi: "しるし",
        onyomi: "イン",
        vocabularies: [
          { word: "印", reading: "しるし", meaning: "Dấu hiệu, ký hiệu" },
          { word: "印刷", reading: "いんさつ", meaning: "In ấn" },
          { word: "矢印", reading: "やじるし", meaning: "Mũi tên chỉ hướng" },
          { word: "印鑑", reading: "いんかん", meaning: "Con dấu" }
        ]
      },
      {
        character: "刷",
        sino_vietnamese: "XOÁT",
        meaning: "In ấn, quét sơn, chải",
        kunyomi: "す・る、は・く",
        onyomi: "サツ",
        vocabularies: [
          { word: "刷る", reading: "する", meaning: "In ấn" },
          { word: "印刷", reading: "いんさつ", meaning: "In ấn" },
          { word: "増刷", reading: "ぞうさつ", meaning: "In thêm (sách)" }
        ]
      },
      {
        character: "拡",
        sino_vietnamese: "KHUẾCH",
        meaning: "Mở rộng, khuếch đại, bành trướng",
        kunyomi: "ひろ・がる、ひろ・げる",
        onyomi: "カク",
        vocabularies: [
          { word: "拡大", reading: "かくだい", meaning: "Phóng to, mở rộng" },
          { word: "拡張", reading: "かくちょう", meaning: "Mở rộng (diện tích, tính năng)" },
          { word: "拡散", reading: "かくさん", meaning: "Khuếch tán, lan truyền" }
        ]
      }
    ]
  }
];
