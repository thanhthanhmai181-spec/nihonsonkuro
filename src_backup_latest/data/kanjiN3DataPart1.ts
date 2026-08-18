export interface VocabularyItem {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiItem {
  character: string;
  sino_vietnamese: string;
  meaning: string;
  vocabularies: VocabularyItem[];
}

export interface LessonItem {
  id: number;
  title: string;
  kanjis: KanjiItem[];
}

export const KANJI_N3_DATA_PART1: LessonItem[] = [
  {
    id: 1,
    title: "Bài 1",
    kanjis: [
      {
        character: "駐",
        sino_vietnamese: "TRÚ",
        meaning: "Lưu trú",
        vocabularies: [
          { word: "駐車", reading: "ちゅうしゃ", meaning: "Đỗ xe" },
          { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "Bãi đỗ xe" },
          { word: "駐禁", reading: "ちゅうきん", meaning: "Cấm đỗ xe" }
        ]
      },
      {
        character: "無",
        sino_vietnamese: "VÔ",
        meaning: "Không",
        vocabularies: [
          { word: "無休", reading: "むきゅう", meaning: "Không nghỉ" },
          { word: "無理", reading: "むり", meaning: "Không thể" },
          { word: "無事", reading: "ぶじ", meaning: "Vô sự" },
          { word: "無い", reading: "ない", meaning: "Không có" },
          { word: "無し", reading: "なし", meaning: "Không" }
        ]
      },
      {
        character: "満",
        sino_vietnamese: "MÃN",
        meaning: "Đầy, mãn nguyện",
        vocabularies: [
          { word: "不満", reading: "ふまん", meaning: "Bất mãn" },
          { word: "満車", reading: "まんしゃ", meaning: "Đầy xe" },
          { word: "満員", reading: "まんいん", meaning: "Đầy người" },
          { word: "満ちる", reading: "みちる", meaning: "Thoả mãn, dâng tràn" },
          { word: "満たす", reading: "みたす", meaning: "Làm thoả mãn" }
        ]
      },
      {
        character: "向",
        sino_vietnamese: "HƯỚNG",
        meaning: "Hướng",
        vocabularies: [
          { word: "方向", reading: "ほうこう", meaning: "Phương hướng" },
          { word: "向き", reading: "むき", meaning: "Hướng, dành cho" },
          { word: "向かう", reading: "むかう", meaning: "Tiến tới, đối mặt" },
          { word: "向こう", reading: "むこう", meaning: "Phía đó, trước" }
        ]
      },
      {
        character: "禁",
        sino_vietnamese: "CẤM",
        meaning: "Cấm đoán",
        vocabularies: [
          { word: "禁止", reading: "きんし", meaning: "Cấm" },
          { word: "禁煙", reading: "きんえん", meaning: "Cấm hút thuốc" },
          { word: "禁じる", reading: "きんじる", meaning: "Cấm" }
        ]
      },
      {
        character: "関",
        sino_vietnamese: "QUAN",
        meaning: "Quan hệ, hải quan",
        vocabularies: [
          { word: "関心", reading: "かんしん", meaning: "Quan tâm" },
          { word: "関する", reading: "かんする", meaning: "Liên quan" },
          { word: "関わる", reading: "かかわる", meaning: "Liên quan" }
        ]
      },
      {
        character: "係",
        sino_vietnamese: "HỆ",
        meaning: "Quan hệ, nhân viên",
        vocabularies: [
          { word: "関係", reading: "かんけい", meaning: "Liên quan, quan hệ" },
          { word: "係争", reading: "けいそう", meaning: "Tranh chấp" },
          { word: "係属", reading: "けいぞく", meaning: "Mối quan hệ" },
          { word: "係", reading: "かかり", meaning: "Quản lý, phụ trách" },
          { word: "係人", reading: "かかりにん", meaning: "Người phụ trách" },
          { word: "係る", reading: "かかわる", meaning: "Liên quan, về" }
        ]
      },
      {
        character: "断",
        sino_vietnamese: "ĐOẠN",
        meaning: "Ngắt, từ chối",
        vocabularies: [
          { word: "無断", reading: "むだん", meaning: "Không báo trước" },
          { word: "断水", reading: "だんすい", meaning: "Ngắt nước" },
          { word: "断る", reading: "ことわる", meaning: "Từ chối" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2",
    kanjis: [
      {
        character: "横",
        sino_vietnamese: "HOÀNH",
        meaning: "Ngang",
        vocabularies: [
          { word: "横断", reading: "おうだん", meaning: "Băng qua" },
          { word: "横線", reading: "おうせん", meaning: "Đường ngang" },
          { word: "横", reading: "よこ", meaning: "Ngang" },
          { word: "横に", reading: "よこに", meaning: "Ngang qua, cạnh" }
        ]
      },
      {
        character: "押",
        sino_vietnamese: "ÁP",
        meaning: "Đè, ấn",
        vocabularies: [
          { word: "押印", reading: "おういん", meaning: "Đóng dấu" },
          { word: "押収", reading: "おうしゅう", meaning: "Tịch thu" },
          { word: "押す", reading: "おす", meaning: "Ấn, đè" },
          { word: "押え", reading: "おさえ", meaning: "Áp lực" }
        ]
      },
      {
        character: "式",
        sino_vietnamese: "THỬC",
        meaning: "Lễ, chế độ",
        vocabularies: [
          { word: "式", reading: "しき", meaning: "Lễ, nghi thức" },
          { word: "式服", reading: "しきふく", meaning: "Lễ phục" }
        ]
      },
      {
        character: "信",
        sino_vietnamese: "TÍN",
        meaning: "Tin",
        vocabularies: [
          { word: "自信", reading: "じしん", meaning: "Tự tin" },
          { word: "信頼", reading: "しんらい", meaning: "Tin cậy" },
          { word: "信じる", reading: "しんじる", meaning: "Tin tưởng" }
        ]
      },
      {
        character: "号",
        sino_vietnamese: "HIỆU",
        meaning: "Số hiệu",
        vocabularies: [
          { word: "号", reading: "ごう", meaning: "Số" },
          { word: "号車", reading: "ごうしゃ", meaning: "Số tàu" },
          { word: "番号", reading: "ばんごう", meaning: "Số" }
        ]
      },
      {
        character: "確",
        sino_vietnamese: "XÁC",
        meaning: "Bền, chắc",
        vocabularies: [
          { word: "確認", reading: "かくにん", meaning: "Xác nhận" },
          { word: "正確", reading: "せいかく", meaning: "Chính xác" },
          { word: "確か", reading: "たしか", meaning: "Chắc là" },
          { word: "確かめる", reading: "たしかめる", meaning: "Xác nhận" }
        ]
      },
      {
        character: "認",
        sino_vietnamese: "NHẬN",
        meaning: "Nhận biết, công nhận",
        vocabularies: [
          { word: "認許", reading: "にんきょ", meaning: "Chấp thuận" },
          { word: "認否", reading: "にんぴ", meaning: "Không thừa nhận" },
          { word: "認識", reading: "にんしき", meaning: "Nhận thức" },
          { word: "認める", reading: "みとめる", meaning: "Thừa nhận" }
        ]
      },
      {
        character: "飛",
        sino_vietnamese: "PHI",
        meaning: "Bay",
        vocabularies: [
          { word: "飛行機", reading: "ひこうき", meaning: "Máy bay" },
          { word: "飛語", reading: "ひご", meaning: "Lời đồn" },
          { word: "飛散", reading: "ひさん", meaning: "Phân tán" },
          { word: "飛ぶ", reading: "とぶ", meaning: "Bay" },
          { word: "飛ばす", reading: "とばす", meaning: "Phóng" },
          { word: "飛び出す", reading: "とびだす", meaning: "Phóng ra" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3",
    kanjis: [
      {
        character: "非",
        sino_vietnamese: "PHI",
        meaning: "Trái, không phải",
        vocabularies: [
          { word: "非常", reading: "ひじょう", meaning: "Khẩn cấp" },
          { word: "非難", reading: "ひなん", meaning: "Sự đổ lỗi" },
          { word: "非ず", reading: "あらず", meaning: "Không" }
        ]
      },
      {
        character: "常",
        sino_vietnamese: "THƯỜNG",
        meaning: "Bình thường",
        vocabularies: [
          { word: "常駐", reading: "じょうちゅう", meaning: "Thường trú" },
          { word: "常備", reading: "じょうび", meaning: "Dự trữ" },
          { word: "常用", reading: "じょうよう", meaning: "Thông dụng" },
          { word: "常に", reading: "つねに", meaning: "Thường thường" },
          { word: "常々", reading: "つねづね", meaning: "Thông thường" }
        ]
      },
      {
        character: "階",
        sino_vietnamese: "GIAI",
        meaning: "Bậc",
        vocabularies: [
          { word: "階級", reading: "かいきゅう", meaning: "Giai cấp" },
          { word: "階段", reading: "かいだん", meaning: "Thang bộ" },
          { word: "階上", reading: "かいじょう", meaning: "Tầng trên" }
        ]
      },
      {
        character: "段",
        sino_vietnamese: "ĐOẠN",
        meaning: "Chia đoạn",
        vocabularies: [
          { word: "段別", reading: "だんべつ", meaning: "Diện tích" },
          { word: "段階", reading: "だんかい", meaning: "Bậc" },
          { word: "段々", reading: "だんだん", meaning: "Dần dần" }
        ]
      },
      {
        character: "箱",
        sino_vietnamese: "TƯƠNG",
        meaning: "Hộp, kho",
        vocabularies: [
          { word: "箱", reading: "はこ", meaning: "Hộp" },
          { word: "箱船", reading: "はこぶね", meaning: "Con tàu" },
          { word: "箱型", reading: "はこがた", meaning: "Hình hộp" }
        ]
      },
      {
        character: "危",
        sino_vietnamese: "NGUY",
        meaning: "Nguy hiểm",
        vocabularies: [
          { word: "危険", reading: "きけん", meaning: "Nguy hiểm" },
          { word: "危める", reading: "あやめる", meaning: "Làm bị thương" },
          { word: "危ない", reading: "あぶない", meaning: "Nguy hiểm" },
          { word: "危うい", reading: "あやうい", meaning: "Nguy hiểm" },
          { word: "危ぶむ", reading: "あやぶむ", meaning: "Lo sợ" }
        ]
      },
      {
        character: "険",
        sino_vietnamese: "HIỂM",
        meaning: "Nguy, mạo hiểm",
        vocabularies: [
          { word: "険路", reading: "けんろ", meaning: "Đường nguy hiểm" },
          { word: "険悪", reading: "けんあく", meaning: "Đáng sợ, nghiêm khắc" },
          { word: "険しい", reading: "けわしい", meaning: "Dựng đứng, dốc" }
        ]
      },
      {
        character: "捨",
        sino_vietnamese: "XẢ",
        meaning: "Ném, vứt",
        vocabularies: [
          { word: "捨身", reading: "しゃしん", meaning: "Thay tu" },
          { word: "捨てる", reading: "すてる", meaning: "Vứt" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4",
    kanjis: [
      {
        character: "線",
        sino_vietnamese: "TUYẾN",
        meaning: "Chỉ, chiều dài, đường",
        vocabularies: [
          { word: "線", reading: "せん", meaning: "Đường, dây dẫn" },
          { word: "線路", reading: "せんろ", meaning: "Đường ray" },
          { word: "線条", reading: "せんじょう", meaning: "Đường kẻ, vệt" }
        ]
      },
      {
        character: "面",
        sino_vietnamese: "DIỆN",
        meaning: "Mặt, phương diện",
        vocabularies: [
          { word: "面積", reading: "めんせき", meaning: "Diện tích" },
          { word: "画面", reading: "がめん", meaning: "Màn hình" },
          { word: "方面", reading: "ほうめん", meaning: "Phương diện" },
          { word: "面出し", reading: "つらだし", meaning: "Lộ diện" },
          { word: "面", reading: "おもて", meaning: "Bề mặt" },
          { word: "面影", reading: "おもかげ", meaning: "Ngoại hình, dấu vết" }
        ]
      },
      {
        character: "普",
        sino_vietnamese: "PHỔ",
        meaning: "Rộng, khắp",
        vocabularies: [
          { word: "普通", reading: "ふつう", meaning: "Bình thường" },
          { word: "普及", reading: "ふきゅう", meaning: "Phổ cập" },
          { word: "普く", reading: "あまねく", meaning: "Rộng rãi, khắp nơi" }
        ]
      },
      {
        character: "各",
        sino_vietnamese: "CÁC",
        meaning: "Các, riêng biệt",
        vocabularies: [
          { word: "各", reading: "かく", meaning: "Các, mỗi" },
          { word: "各方", reading: "かくかた", meaning: "Tất cả quý vị" },
          { word: "各条", reading: "かくじょう", meaning: "Các khoản mục" },
          { word: "各々", reading: "おのおの", meaning: "Mỗi, riêng biệt" }
        ]
      },
      {
        character: "次",
        sino_vietnamese: "THỨ",
        meaning: "Lần lượt, thứ bậc",
        vocabularies: [
          { word: "次男", reading: "じなん", meaning: "Con trai thứ" },
          { word: "目次", reading: "もくじ", meaning: "Mục lục" },
          { word: "次回", reading: "じかい", meaning: "Lần tới" },
          { word: "次", reading: "つぎ", meaning: "Tiếp theo" },
          { word: "次々", reading: "つぎつぎ", meaning: "Lần lượt" }
        ]
      },
      {
        character: "快",
        sino_vietnamese: "KHOÁI",
        meaning: "Sướng, chóng",
        vocabularies: [
          { word: "快速", reading: "かいそく", meaning: "Nhanh chóng" },
          { word: "快適", reading: "かいてき", meaning: "Dễ chịu, thoải mái" },
          { word: "快い", reading: "こころよい", meaning: "Dễ chịu, thoải mái" }
        ]
      },
      {
        character: "速",
        sino_vietnamese: "TỐC",
        meaning: "Nhanh (tốc độ)",
        vocabularies: [
          { word: "速度", reading: "そくdo", meaning: "Tốc độ" },
          { word: "早速", reading: "さっそく", meaning: "Ngay lập tức" },
          { word: "速断", reading: "そくだん", meaning: "Kết luận vội vàng" },
          { word: "速い", reading: "はやい", meaning: "Nhanh" },
          { word: "速める", reading: "はやめる", meaning: "Đẩy nhanh" },
          { word: "速やか", reading: "すみやか", meaning: "Mau lẹ" }
        ]
      },
      {
        character: "過",
        sino_vietnamese: "QUÁ",
        meaning: "Qua, vượt",
        vocabularies: [
          { word: "通過", reading: "つうか", meaning: "Thông qua" },
          { word: "過去", reading: "かこ", meaning: "Quá khứ" },
          { word: "過ち", reading: "あやまち", meaning: "Lỗi lầm" },
          { word: "過ぎる", reading: "すぎる", meaning: "Quá" },
          { word: "過ごす", reading: "すごす", meaning: "Trải qua" }
        ]
      },
      {
        character: "鉄",
        sino_vietnamese: "THIẾT",
        meaning: "Sắt",
        vocabularies: [
          { word: "鉄", reading: "てつ", meaning: "Sắt thép" },
          { word: "地下鉄", reading: "ちかてつ", meaning: "Tàu điện ngầm" },
          { word: "鉄道", reading: "てつどう", meaning: "Đường sắt" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Bài 5",
    kanjis: [
      {
        character: "指",
        sino_vietnamese: "CHỈ",
        meaning: "Ngón tay",
        vocabularies: [
          { word: "指定", reading: "してい", meaning: "Chỉ định" },
          { word: "指標", reading: "しひょう", meaning: "Chỉ tiêu" },
          { word: "指揮", reading: "しき", meaning: "Chỉ huy" },
          { word: "指す", reading: "さす", meaning: "Chỉ" },
          { word: "指", reading: "ゆび", meaning: "Ngón tay" },
          { word: "指輪", reading: "ゆびわ", meaning: "Nhẫn" }
        ]
      },
      {
        character: "定",
        sino_vietnamese: "ĐỊNH",
        meaning: "Định, sắp đặt",
        vocabularies: [
          { word: "安定", reading: "あんてい", meaning: "Ổn định" },
          { word: "定休", reading: "ていきゅう", meaning: "Ngày nghỉ quy định" },
          { word: "定める", reading: "さだめる", meaning: "Làm ổn định, xác định" },
          { word: "定まる", reading: "さだまる", meaning: "Ổn định" },
          { word: "定か", reading: "さだか", meaning: "Rõ ràng, phân minh" }
        ]
      },
      {
        character: "席",
        sino_vietnamese: "TỊCH",
        meaning: "Chỗ ngồi",
        vocabularies: [
          { word: "席", reading: "せき", meaning: "Ghế, chỗ ngồi" },
          { word: "出席", reading: "しゅっせき", meaning: "Tham dự" },
          { word: "席順", reading: "せきじゅん", meaning: "Thứ tự chỗ ngồi" }
        ]
      },
      {
        character: "由",
        sino_vietnamese: "DO",
        meaning: "Bởi (vì), tự (do)",
        vocabularies: [
          { word: "自由", reading: "じゆう", meaning: "Tự do" },
          { word: "由来", reading: "ゆらい", meaning: "Nguồn gốc (từ)" },
          { word: "由無き", reading: "よしなき", meaning: "Vô nghĩa" },
          { word: "由緒", reading: "ゆいしょ", meaning: "Nguồn gốc, lịch sử" },
          { word: "由", reading: "よし", meaning: "Nguyên do" }
        ]
      },
      {
        character: "番",
        sino_vietnamese: "PHIÊN",
        meaning: "Lượt",
        vocabularies: [
          { word: "番号", reading: "ばんごう", meaning: "Số" },
          { word: "番", reading: "ばん", meaning: "Phiên, lượt" },
          { word: "番線", reading: "ばんせん", meaning: "Sân ga số" }
        ]
      },
      {
        character: "窓",
        sino_vietnamese: "SONG",
        meaning: "Cửa sổ",
        vocabularies: [
          { word: "窓外", reading: "そうがい", meaning: "Ngoài cửa sổ" },
          { word: "窓口", reading: "まどぐち", meaning: "Cửa sổ làm việc" },
          { word: "窓側", reading: "まどがわ", meaning: "Bên phía cửa sổ" },
          { word: "窓", reading: "まど", meaning: "Cửa sổ" }
        ]
      },
      {
        character: "側",
        sino_vietnamese: "TRẮC",
        meaning: "Bên",
        vocabularies: [
          { word: "側臥", reading: "そくが", meaning: "Nằm nghiêng" },
          { word: "右側", reading: "みぎがわ", meaning: "Bên phải" },
          { word: "側", reading: "かわ", meaning: "Phía" },
          { word: "側に", reading: "そばに", meaning: "Bên cạnh" }
        ]
      },
      {
        character: "路",
        sino_vietnamese: "LỘ",
        meaning: "Đường",
        vocabularies: [
          { word: "道路", reading: "どうろ", meaning: "Con đường" },
          { word: "路地", reading: "ろじ", meaning: "Hẻm" },
          { word: "線路", reading: "せんろ", meaning: "Đường ray" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Bài 6",
    kanjis: [
      {
        character: "停",
        sino_vietnamese: "ĐÌNH",
        meaning: "Dừng",
        vocabularies: [
          { word: "停滞", reading: "ていたい", meaning: "Đình trệ" },
          { word: "停頓", reading: "ていとん", meaning: "Bế tắc" },
          { word: "バス停", reading: "バスてい", meaning: "Trạm xe bus" },
          { word: "停める", reading: "とめる", meaning: "Đỗ, dừng" },
          { word: "停まる", reading: "とまる", meaning: "Đỗ, dừng" }
        ]
      },
      {
        character: "整",
        sino_vietnamese: "CHỈNH",
        meaning: "Sửa, đều, ngay ngắn",
        vocabularies: [
          { word: "整理", reading: "せいり", meaning: "Chỉnh lý, sắp xếp" },
          { word: "整頓", reading: "せいとん", meaning: "Gọn gàng" },
          { word: "整える", reading: "とtotax", meaning: "Chuẩn bị, sắp xếp" },
          { word: "整う", reading: "ととのう", meaning: "Được chuẩn bị" }
        ]
      },
      {
        character: "券",
        sino_vietnamese: "KHOÁN",
        meaning: "Vé",
        vocabularies: [
          { word: "券", reading: "けん", meaning: "Vé" },
          { word: "券売機", reading: "けんばいき", meaning: "Máy bán vé" },
          { word: "乗車券", reading: "じょうしゃけん", meaning: "Vé xe" }
        ]
      },
      {
        character: "現",
        sino_vietnamese: "HIỆN",
        meaning: "Hiện ra",
        vocabularies: [
          { word: "現在", reading: "げんざい", meaning: "Hiện tại" },
          { word: "現場", reading: "げんば", meaning: "Công trường" },
          { word: "現金", reading: "げんきん", meaning: "Tiền mặt" },
          { word: "現す", reading: "あらわす", meaning: "Biểu lộ" },
          { word: "現れる", reading: "あらわれる", meaning: "Hiện ra" },
          { word: "現つ", reading: "うつつ", meaning: "Hiện thực" }
        ]
      },
      {
        character: "両",
        sino_vietnamese: "LƯỠNG",
        meaning: "Hai (2)",
        vocabularies: [
          { word: "両親", reading: "りょうしん", meaning: "Bố mẹ" },
          { word: "両手", reading: "りょうて", meaning: "2 tay" },
          { word: "両", reading: "りょう", meaning: "Cả 2" }
        ]
      },
      {
        character: "替",
        sino_vietnamese: "THẾ",
        meaning: "Thay thế, đổi",
        vocabularies: [
          { word: "替える", reading: "かえる", meaning: "Đổi" },
          { word: "替わり", reading: "かわり", meaning: "Thay thế" }
        ]
      },
      {
        character: "優",
        sino_vietnamese: "ƯU",
        meaning: "Ưu việt, ưu tiên",
        vocabularies: [
          { word: "優先", reading: "ゆうせん", meaning: "Ưu tiên" },
          { word: "優秀", reading: "ゆうしゅう", meaning: "Ưu tú" },
          { word: "優れる", reading: "すぐれる", meaning: "Ưu tú, giỏi" },
          { word: "優しい", reading: "やさしい", meaning: "Hiền lành" },
          { word: "優る", reading: "まさる", meaning: "Giỏi hơn" }
        ]
      },
      {
        character: "座",
        sino_vietnamese: "TỌA",
        meaning: "Ngồi",
        vocabularies: [
          { word: "口座", reading: "こうざ", meaning: "Tài khoản" },
          { word: "座法", reading: "ざほう", meaning: "Cách ngồi" },
          { word: "座る", reading: "すわる", meaning: "Ngồi" }
        ]
      },
      {
        character: "降",
        sino_vietnamese: "GIÁNG",
        meaning: "Rơi, hạ xuống",
        vocabularies: [
          { word: "以降", reading: "いこう", meaning: "Trở về sau" },
          { word: "降参", reading: "こうさん", meaning: "Bỏ cuộc" },
          { word: "降水", reading: "こうすい", meaning: "Mưa" },
          { word: "降りる", reading: "おりる", meaning: "Xuống" },
          { word: "降る", reading: "ふる", meaning: "Rơi, mưa" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Bài 7",
    kanjis: [
      {
        character: "未",
        sino_vietnamese: "VỊ",
        meaning: "Vị, chưa",
        vocabularies: [
          { word: "未了", reading: "みりょう", meaning: "Chưa hoàn thành" },
          { word: "未来", reading: "みらい", meaning: "Tương lai" },
          { word: "未満", reading: "みまん", meaning: "Nhỏ hơn hoặc bằng" },
          { word: "未だ", reading: "いまだ", meaning: "Chưa" },
          { word: "未だに", reading: "いまだに", meaning: "Cho đến giờ" }
        ]
      },
      {
        character: "末",
        sino_vietnamese: "MẠT",
        meaning: "Cuối",
        vocabularies: [
          { word: "月末", reading: "げつまつ", meaning: "Cuối tháng" },
          { word: "末女", reading: "まつじょ", meaning: "Con gái út" },
          { word: "末流", reading: "ばつりゅう", meaning: "Hậu duệ" },
          { word: "末", reading: "すえ", meaning: "Cuối" },
          { word: "末頃", reading: "すえごろ", meaning: "Khoảng cuối" }
        ]
      },
      {
        character: "若",
        sino_vietnamese: "NHƯỢC",
        meaning: "Trẻ, non",
        vocabularies: [
          { word: "若輩", reading: "じゃくはい", meaning: "Người trẻ (non)" },
          { word: "若年", reading: "じゃくねん", meaning: "Thanh niên" },
          { word: "若し", reading: "もし", meaning: "Nếu" },
          { word: "若い", reading: "わかい", meaning: "Trẻ" },
          { word: "若者", reading: "わかもの", meaning: "Người trẻ tuổi" }
        ]
      },
      {
        character: "晩",
        sino_vietnamese: "VÃN",
        meaning: "Tối",
        vocabularies: [
          { word: "晩", reading: "ばん", meaning: "Tối" },
          { word: "今晩", reading: "こんばん", meaning: "Tối nay" },
          { word: "毎晩", reading: "まいばん", meaning: "Hàng tối" }
        ]
      },
      {
        character: "島",
        sino_vietnamese: "ĐẢO",
        meaning: "Đảo",
        vocabularies: [
          { word: "島民", reading: "とうみん", meaning: "Dân đảo" },
          { word: "島根", reading: "しまね", meaning: "Đảo (Tên tỉnh Shimane)" },
          { word: "島", reading: "しま", meaning: "Đảo" }
        ]
      },
      {
        character: "皿",
        sino_vietnamese: "MÃNH",
        meaning: "Đĩa",
        vocabularies: [
          { word: "皿", reading: "さら", meaning: "Đĩa" },
          { word: "灰皿", reading: "はいざら", meaning: "Gạt tàn" }
        ]
      },
      {
        character: "血",
        sino_vietnamese: "HUYẾT",
        meaning: "Máu",
        vocabularies: [
          { word: "血圧", reading: "けつあつ", meaning: "Huyết áp" },
          { word: "血液型", reading: "けつえきがた", meaning: "Nhóm máu" },
          { word: "出血", reading: "しゅっけつ", meaning: "Chảy máu" },
          { word: "血", reading: "ち", meaning: "Máu" },
          { word: "血道", reading: "ちみち", meaning: "Mạch máu" },
          { word: "血目", reading: "ちめ", meaning: "Mắt đỏ, giận dữ" }
        ]
      },
      {
        character: "助",
        sino_vietnamese: "TRỢ",
        meaning: "Giúp, phụ",
        vocabularies: [
          { word: "助教", reading: "じょきょう", meaning: "Trợ giảng" },
          { word: "助詞", reading: "じょし", meaning: "Trợ từ" },
          { word: "助産", reading: "じょさん", meaning: "Đỡ đẻ" },
          { word: "助かる", reading: "たすかる", meaning: "Được giúp" },
          { word: "助ける", reading: "たすける", meaning: "Giúp đỡ" },
          { word: "助", reading: "すけ", meaning: "Sự giúp đỡ" }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Bài 8",
    kanjis: [
      {
        character: "準",
        sino_vietnamese: "CHUẨN",
        meaning: "Chuẩn, mẫu mực",
        vocabularies: [
          { word: "準備", reading: "じゅんび", meaning: "Chuẩn bị" },
          { word: "基準", reading: "きじゅん", meaning: "Tiêu chuẩn" },
          { word: "準える", reading: "なぞらえる", meaning: "Phỏng theo" }
        ]
      },
      {
        character: "備",
        sino_vietnamese: "BỊ",
        meaning: "Đủ, sẵn",
        vocabularies: [
          { word: "設備", reading: "せつび", meaning: "Thiết bị" },
          { word: "備考", reading: "びこう", meaning: "Ghi chú" },
          { word: "備品", reading: "びひん", meaning: "Trang thiết bị" },
          { word: "備える", reading: "そなえる", meaning: "Chuẩn bị" },
          { word: "備わる", reading: "そなわる", meaning: "Sẵn có" },
          { word: "備に", reading: "つぶさに", meaning: "Trọn vẹn, đầy đủ" }
        ]
      },
      {
        character: "営",
        sino_vietnamese: "DOANH",
        meaning: "Doanh nghiệp, kinh doanh",
        vocabularies: [
          { word: "営業", reading: "えいぎょう", meaning: "Kinh doanh, doanh nghiệp" },
          { word: "軍営", reading: "ぐんえい", meaning: "Doanh trại" },
          { word: "営む", reading: "いとなむ", meaning: "Kinh doanh" },
          { word: "営み", reading: "いとなみ", meaning: "Công việc" }
        ]
      },
      {
        character: "閉",
        sino_vietnamese: "BẾ",
        meaning: "Đóng",
        vocabularies: [
          { word: "閉店", reading: "へいてん", meaning: "Đóng cửa tiệm" },
          { word: "閉式", reading: "へいしき", meaning: "Bế mạc" },
          { word: "閉まる", reading: "しまる", meaning: "Đóng" },
          { word: "閉じる", reading: "とじる", meaning: "Đóng, gập" },
          { word: "閉ざす", reading: "とざす", meaning: "Bịt, lấp lại" }
        ]
      },
      {
        character: "案",
        sino_vietnamese: "ÁN",
        meaning: "Dự án, đề án",
        vocabularies: [
          { word: "提案", reading: "ていan", meaning: "Đề án, đề xuất" },
          { word: "案", reading: "あん", meaning: "Ý kiến, ý tưởng" }
        ]
      },
      {
        character: "内",
        sino_vietnamese: "NỘI",
        meaning: "Trong",
        vocabularies: [
          { word: "家内", reading: "かない", meaning: "Vợ" },
          { word: "以内", reading: "いない", meaning: "Nội trong" },
          { word: "国内", reading: "こくない", meaning: "Trong nước" },
          { word: "内に", reading: "うちに", meaning: "Trong khi" },
          { word: "内側", reading: "うちがわ", meaning: "Bên trong" }
        ]
      },
      {
        character: "予",
        sino_vietnamese: "DỰ",
        meaning: "Dự liệu",
        vocabularies: [
          { word: "予定", reading: "よてい", meaning: "Dự định" },
          { word: "予算", reading: "よさん", meaning: "Dự toán" },
          { word: "予習", reading: "よしゅう", meaning: "Chuẩn bị bài" },
          { word: "予め", reading: "あらかじめ", meaning: "Sẵn sàng, trước" }
        ]
      },
      {
        character: "約",
        sino_vietnamese: "ƯỚC",
        meaning: "Ước lượng",
        vocabularies: [
          { word: "約", reading: "やく", meaning: "Cỡ chừng" },
          { word: "予約", reading: "よやく", meaning: "Đặt trước" },
          { word: "約束", reading: "やくそく", meaning: "Cuộc hẹn" },
          { word: "約まる", reading: "つづまる", meaning: "Nén lại, nhỏ lại" },
          { word: "約める", reading: "つづめる", meaning: "Rút ngắn" },
          { word: "約やか", reading: "つづまやか", meaning: "Ngắn gọn, khiêm tốn" }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Bài 9",
    kanjis: [
      {
        character: "煙",
        sino_vietnamese: "YÊN",
        meaning: "Khói",
        vocabularies: [
          { word: "禁煙", reading: "きんえん", meaning: "Cấm hút thuốc" },
          { word: "煙草", reading: "たばこ", meaning: "Thuốc lá" },
          { word: "煙", reading: "けむり", meaning: "Khói" },
          { word: "煙る", reading: "けむる", meaning: "Bốc khói" },
          { word: "煙い", reading: "けむい", meaning: "Ngạt khói, mù mịt" }
        ]
      },
      {
        character: "当",
        sino_vietnamese: "ĐƯƠNG",
        meaning: "Đương nhiên, trúng",
        vocabularies: [
          { word: "走当", reading: "そうとう", meaning: "Đương nhiên" },
          { word: "当然", reading: "とうぜん", meaning: "Đương nhiên" },
          { word: "当選", reading: "とうせん", meaning: "Trúng giải" },
          { word: "当たり前", reading: "あたりまえ", meaning: "Đương nhiên" },
          { word: "当たる", reading: "あたる", meaning: "Đánh trúng" },
          { word: "当に", reading: "まさに", meaning: "Chính xác" }
        ]
      },
      {
        character: "全",
        sino_vietnamese: "TOÀN",
        meaning: "Đủ, vẹn",
        vocabularies: [
          { word: "全部", reading: "ぜんぶ", meaning: "Toàn bộ" },
          { word: "安全", reading: "あんぜん", meaning: "An toàn" },
          { word: "全然", reading: "ぜんぜん", meaning: "Hoàn toàn không" },
          { word: "全く", reading: "まったく", meaning: "Hoàn toàn" },
          { word: "全て", reading: "すべて", meaning: "Tất cả" }
        ]
      },
      {
        character: "客",
        sino_vietnamese: "KHÁCH",
        meaning: "Khách",
        vocabularies: [
          { word: "客", reading: "きゃく", meaning: "Khách" },
          { word: "客席", reading: "きゃくせき", meaning: "Ghế khán giả" },
          { word: "客観", reading: "きゃっかん", meaning: "Khách quan" }
        ]
      },
      {
        character: "様",
        sino_vietnamese: "DẠNG",
        meaning: "Bộ dạng, dáng vẻ",
        vocabularies: [
          { word: "多様", reading: "たよう", meaning: "Đa dạng" },
          { word: "樣子", reading: "ようす", meaning: "Dáng vẻ" },
          { word: "様", reading: "さま", meaning: "Ngài..." }
        ]
      },
      {
        character: "解",
        sino_vietnamese: "GIẢI",
        meaning: "Phân tách",
        vocabularies: [
          { word: "解決", reading: "かいけつ", meaning: "Giải quyết" },
          { word: "理解", reading: "りかい", meaning: "Lý giải" },
          { word: "解脱", reading: "げだつ", meaning: "Giải thoát" },
          { word: "解かす", reading: "とかす", meaning: "Chải (đầu)" },
          { word: "解ける", reading: "とける", meaning: "Tan ra" },
          { word: "解る", reading: "わかる", meaning: "Hiểu" }
        ]
      },
      {
        character: "協",
        sino_vietnamese: "HIỆP",
        meaning: "Hiệp hội, lực",
        vocabularies: [
          { word: "協力", reading: "きょうりょく", meaning: "Hợp tác" },
          { word: "協調性", reading: "きょうちょうせい", meaning: "Tính hợp tác" },
          { word: "協同組合", reading: "きょうどうくみあい", meaning: "Nghiệp đoàn" }
        ]
      },
      {
        character: "願",
        sino_vietnamese: "NGUYỆN",
        meaning: "Muốn",
        vocabularies: [
          { word: "願意", reading: "がんい", meaning: "Ý nguyện" },
          { word: "願書", reading: "がんしょ", meaning: "Đơn" },
          { word: "お願い", reading: "おねがい", meaning: "Yêu cầu" },
          { word: "願う", reading: "ねがう", meaning: "Xin, cầu mong" },
          { word: "願望", reading: "がんぼう", meaning: "Nguyện vọng" }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Bài 10",
    kanjis: [
      {
        character: "観",
        sino_vietnamese: "QUAN",
        meaning: "Quan sất, khách quan",
        vocabularies: [
          { word: "観光", reading: "かんこう", meaning: "Tham quan" },
          { word: "観客", reading: "かんきゃく", meaning: "Quan khách" },
          { word: "観相", reading: "かんそう", meaning: "Diện mạo, vẻ mặt" },
          { word: "観る", reading: "みる", meaning: "Quan sát" },
          { word: "観月", reading: "かんげつ", meaning: "Ngắm trăng" }
        ]
      },
      {
        character: "園",
        sino_vietnamese: "VIÊN",
        meaning: "Vườn",
        vocabularies: [
          { word: "公園", reading: "こうえん", meaning: "Công viên" },
          { word: "園庭", reading: "えんてい", meaning: "Sân, vườn" },
          { word: "保育園", reading: "ほいくえん", meaning: "Trường mẫu giáo" },
          { word: "園", reading: "その", meaning: "Vườn" }
        ]
      },
      {
        character: "港",
        sino_vietnamese: "CẢNG",
        meaning: "Cảng",
        vocabularies: [
          { word: "港市", reading: "こうし", meaning: "Thành phố cảng" },
          { word: "港湾", reading: "こうわん", meaning: "Cảng" },
          { word: "空港", reading: "くうこう", meaning: "Sân bay" },
          { word: "港", reading: "みなと", meaning: "Cảng" },
          { word: "港町", reading: "みなとまち", meaning: "Thành phố cảng" }
        ]
      },
      {
        character: "遊",
        sino_vietnamese: "DU",
        meaning: "Du ngoạn, chơi",
        vocabularies: [
          { word: "遊園地", reading: "ゆうえんち", meaning: "Khu vui chơi" },
          { word: "遊戯", reading: "ゆうぎ", meaning: "Trò chơi" },
          { word: "遊女", reading: "ゆうじょ", meaning: "Kỹ nữ" },
          { word: "遊び", reading: "あそび", meaning: "Chuyến đi chơi" },
          { word: "遊ぶ", reading: "あそぶ", meaning: "Chơi, nô đùa" }
        ]
      },
      {
        character: "美",
        sino_vietnamese: "MỸ",
        meaning: "Đẹp",
        vocabularies: [
          { word: "美人", reading: "びじん", meaning: "Mỹ nhân" },
          { word: "美術館", reading: "びじゅつかん", meaning: "Bảo tàng mỹ thuật" },
          { word: "美空", reading: "みそら", meaning: "Bầu trời đẹp" },
          { word: "美しい", reading: "うつくしい", meaning: "Đẹp" },
          { word: "美味しい", reading: "おいしい", meaning: "Ngon" }
        ]
      },
      {
        character: "術",
        sino_vietnamese: "THUẬT",
        meaning: "Phương pháp",
        vocabularies: [
          { word: "美術", reading: "びじゅつ", meaning: "Mỹ thuật" },
          { word: "技術", reading: "ぎじゅつ", meaning: "Kỹ thuật" },
          { word: "手術", reading: "しゅじゅつ", meaning: "Phẫu thuật" },
          { word: "術", reading: "すべ", meaning: "Kỹ thuật, phương pháp" }
        ]
      },
      {
        character: "神",
        sino_vietnamese: "THẦN",
        meaning: "Thần",
        vocabularies: [
          { word: "神社", reading: "じんじゃ", meaning: "Đền thờ" },
          { word: "神門", reading: "しんもん", meaning: "Cổng đền" },
          { word: "神仏", reading: "しんぶつ", meaning: "Thần phật" },
          { word: "神", reading: "かみ", meaning: "Thần" },
          { word: "神戸", reading: "こうべ", meaning: "Thành phố Kobe" },
          { word: "神業", reading: "かみわざ", meaning: "Phép màu" }
        ]
      },
      {
        character: "寺",
        sino_vietnamese: "TỰ",
        meaning: "Chùa",
        vocabularies: [
          { word: "金閣寺", reading: "きんかくじ", meaning: "Chùa vàng" },
          { word: "寺院", reading: "じいん", meaning: "Chùa chiền" },
          { word: "寺", reading: "てら", meaning: "Chùa" }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Bài 11",
    kanjis: [
      {
        character: "役",
        sino_vietnamese: "DỊCH",
        meaning: "Sai, sử dụng",
        vocabularies: [
          { word: "役員", reading: "やくいん", meaning: "Viên chức" },
          { word: "役に立つ", reading: "やくにたつ", meaning: "Có ích" },
          { word: "使役", reading: "しえき", meaning: "Sai khiến" }
        ]
      },
      {
        character: "郵",
        sino_vietnamese: "BƯU",
        meaning: "Bưu điện",
        vocabularies: [
          { word: "郵便", reading: "ゆうびん", meaning: "Bưu điện" },
          { word: "郵送", reading: "ゆうそう", meaning: "Gửi bưu điện" },
          { word: "郵便局", reading: "ゆうびんきょく", meaning: "Bưu điện" }
        ]
      },
      {
        character: "局",
        sino_vietnamese: "CỤC",
        meaning: "Cục, nơi",
        vocabularies: [
          { word: "結局", reading: "けっきょく", meaning: "Kết cục" },
          { word: "薬局", reading: "やっきょく", meaning: "Hiệu thuốc" },
          { word: "局", reading: "きょく", meaning: "Cục, đơn vị" }
        ]
      },
      {
        character: "交",
        sino_vietnamese: "GIAO",
        meaning: "Giao thoa",
        vocabularies: [
          { word: "交換", reading: "こうかん", meaning: "Trao đổi" },
          { word: "交通", reading: "こうつう", meaning: "Giao thông" },
          { word: "交番", reading: "こうばん", meaning: "Đồn công an" },
          { word: "交わる", reading: "まじわる", meaning: "Lẫn vào nhau" },
          { word: "交ぜる", reading: "まぜる", meaning: "Trộn" },
          { word: "交す", reading: "かわす", meaning: "Trao đổi, giao dịch" }
        ]
      },
      {
        character: "差",
        sino_vietnamese: "SAI",
        meaning: "Khoảng cách",
        vocabularies: [
          { word: "交差点", reading: "こうさてん", meaning: "Ngã tư" },
          { word: "差", reading: "さ", meaning: "Khoảng cách" },
          { word: "差す", reading: "さす", meaning: "Mở, che (ô)" },
          { word: "差し出す", reading: "さしだす", meaning: "Đưa ra" }
        ]
      },
      {
        character: "点",
        sino_vietnamese: "ĐIỂM",
        meaning: "Điểm, địa điểm",
        vocabularies: [
          { word: "点数", reading: "てんすう", meaning: "Điểm số" },
          { word: "点差", reading: "てんさ", meaning: "Cách biệt điểm" },
          { word: "点ける", reading: "つける", meaning: "Bật" },
          { word: "点る", reading: "ともる", meaning: "Sáng lên, cháy" },
          { word: "点てる", reading: "たてる", meaning: "Pha, đánh (trà)" }
        ]
      },
      {
        character: "橋",
        sino_vietnamese: "KIỀU",
        meaning: "Cầu",
        vocabularies: [
          { word: "歩道橋", reading: "ほどうきょう", meaning: "Cầu bộ hành" },
          { word: "橋", reading: "はし", meaning: "Cầu" }
        ]
      },
      {
        character: "公",
        sino_vietnamese: "CÔNG",
        meaning: "Chung, công",
        vocabularies: [
          { word: "公園", reading: "こうえん", meaning: "Công viên" },
          { word: "公共", reading: "こうきょう", meaning: "Công cộng" },
          { word: "公", reading: "おお야け", meaning: "Công cộng, chung" }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Bài 12",
    kanjis: [
      {
        character: "受",
        sino_vietnamese: "THỤ",
        meaning: "Nhận",
        vocabularies: [
          { word: "受理", reading: "じゅり", meaning: "Thụ lý, tiếp nhận" },
          { word: "受信", reading: "じゅしん", meaning: "Nhận tin" },
          { word: "受験", reading: "じゅけん", meaning: "Tham gia thi" },
          { word: "受付", reading: "うけつけ", meaning: "Quầy lễ tân" },
          { word: "受ける", reading: "うける", meaning: "Nhận" },
          { word: "受け取り", reading: "うけとり", meaning: "Nhận, biên lai" }
        ]
      },
      {
        character: "付",
        sino_vietnamese: "PHÓ",
        meaning: "Đính, gắn, phụ",
        vocabularies: [
          { word: "付論", reading: "ふろん", meaning: "Tóm tắt" },
          { word: "付加", reading: "ふか", meaning: "Phụ thêm" },
          { word: "付ける", reading: "つける", meaning: "Gắn" },
          { word: "付く", reading: "つく", meaning: "Được gắn" },
          { word: "片付ける", reading: "かたづける", meaning: "Dọn dẹp" }
        ]
      },
      {
        character: "科",
        sino_vietnamese: "KHOA",
        meaning: "Môn, khoa",
        vocabularies: [
          { word: "教科書", reading: "きょうかしょ", meaning: "Sách giáo khoa" },
          { word: "外科", reading: "げか", meaning: "Ngoại khoa" },
          { word: "科学", reading: "かがく", meaning: "Khoa học" }
        ]
      },
      {
        character: "鼻",
        sino_vietnamese: "TỴ",
        meaning: "Mũi",
        vocabularies: [
          { word: "耳鼻科", reading: "じびか", meaning: "Khoa tai mũi họng" },
          { word: "鼻", reading: "はな", meaning: "Mũi" }
        ]
      },
      {
        character: "婦",
        sino_vietnamese: "PHỤ",
        meaning: "Nữ, phụ nữ",
        vocabularies: [
          { word: "婦女", reading: "ふじょ", meaning: "Phụ nữ" },
          { word: "産婦人科", reading: "sanふじんか", meaning: "Khoa phụ sản" }
        ]
      },
      {
        character: "形",
        sino_vietnamese: "HÌNH",
        meaning: "Hình dáng",
        vocabularies: [
          { word: "人形", reading: "にんぎょう", meaning: "Búp bê" },
          { word: "形式", reading: "けいしき", meaning: "Hình thức" },
          { word: "普通形", reading: "ふつうけい", meaning: "Thể thông thường" },
          { word: "形", reading: "かたち", meaning: "Hình dạng" },
          { word: "形振り", reading: "なりふり", meaning: "Thể diện, ngoại hình" }
        ]
      },
      {
        character: "骨",
        sino_vietnamese: "CỐT",
        meaning: "Xương",
        vocabularies: [
          { word: "豚骨", reading: "とんこつ", meaning: "Xương lợn" },
          { word: "骨棘", reading: "こっきょく", meaning: "Gai xương" },
          { word: "骨折", reading: "こっせつ", meaning: "Gãy xương" },
          { word: "骨", reading: "ほね", meaning: "Xương" },
          { word: "骨身", reading: "ほねみ", meaning: "Xương tuỷ" }
        ]
      },
      {
        character: "折",
        sino_vietnamese: "CHIẾT",
        meaning: "Bẻ, gập",
        vocabularies: [
          { word: "左折", reading: "させつ", meaning: "Rẽ trái" },
          { word: "右折", reading: "うせつ", meaning: "Rẽ phải" },
          { word: "折る", reading: "おる", meaning: "Gập, gấp, bẻ" },
          { word: "折れる", reading: "おれる", meaning: "Gãy" },
          { word: "折り紙", reading: "おりがみ", meaning: "Gấp giấy" }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Bài 13",
    kanjis: [
      {
        character: "困",
        sino_vietnamese: "KHỐN",
        meaning: "Khó, vấn đề",
        vocabularies: [
          { word: "困難", reading: "こんなん", meaning: "Khó khăn" },
          { word: "困苦", reading: "こんく", meaning: "Khó khăn, gian khổ" },
          { word: "困窮", reading: "こんきゅう", meaning: "Khốn cùng" },
          { word: "困る", reading: "こまる", meaning: "Khó khăn, rắc rối" },
          { word: "困り事", reading: "こまりごと", meaning: "Việc rắc rối" }
        ]
      },
      {
        character: "消",
        sino_vietnamese: "TIÊU",
        meaning: "Tắt, xoá, hết",
        vocabularies: [
          { word: "消化系", reading: "しょうかけい", meaning: "Hệ tiêu hoá" },
          { word: "消火器", reading: "しょうかき", meaning: "Bình cứu hoả" },
          { word: "消臭", reading: "しょうしゅう", meaning: "Khử mùi" },
          { word: "消える", reading: "きえる", meaning: "Tắt (tự động)" },
          { word: "消す", reading: "けす", meaning: "Tắt, xoá" },
          { word: "吹き消す", reading: "ふきけす", meaning: "Thổi tắt" }
        ]
      },
      {
        character: "防",
        sino_vietnamese: "PHÒNG",
        meaning: "Phòng bị",
        vocabularies: [
          { word: "消防", reading: "しょうぼう", meaning: "Phòng cháy" },
          { word: "防滑", reading: "ぼうかつ", meaning: "Chống trượt" },
          { word: "防備", reading: "ぼうび", meaning: "Phòng bị" },
          { word: "防ぐ", reading: "ふせぐ", meaning: "Đề phòng" },
          { word: "防ぎ", reading: "ふせぎ", meaning: "Phòng chống" }
        ]
      },
      {
        character: "球",
        sino_vietnamese: "CẦU",
        meaning: "Tròn, bóng",
        vocabularies: [
          { word: "電球", reading: "でんきゅう", meaning: "Bóng đèn" },
          { word: "地球", reading: "ちきゅう", meaning: "Trái đất" },
          { word: "野球", reading: "やきゅう", meaning: "Bóng chày" },
          { word: "球", reading: "たま", meaning: "Hình cầu, quả bóng" },
          { word: "球筋", reading: "たますじ", meaning: "Đường bóng" }
        ]
      },
      {
        character: "警",
        sino_vietnamese: "CẢNH",
        meaning: "Răn đe, cảnh báo",
        vocabularies: [
          { word: "警察", reading: "けいさつ", meaning: "Cảnh sát" },
          { word: "警備", reading: "けいび", meaning: "Bảo vệ" },
          { word: "警醒", reading: "けいせい", meaning: "Cảnh cáo" },
          { word: "警める", reading: "いましめる", meaning: "Cảnh báo" }
        ]
      },
      {
        character: "察",
        sino_vietnamese: "SÁT",
        meaning: "Xét, rõ",
        vocabularies: [
          { word: "警察", reading: "けいさつ", meaning: "Cảnh sát" }
        ]
      },
      {
        character: "故",
        sino_vietnamese: "CỐ",
        meaning: "Sự cố, cũ",
        vocabularies: [
          { word: "故旧", reading: "こきゅう", meaning: "Bạn cũ" },
          { word: "故人", reading: "こじん", meaning: "Người đã mất, bạn cũ" },
          { word: "事故", reading: "じこ", meaning: "Tai nạn" },
          { word: "故郷", reading: "ふるさと", meaning: "Quê hương" },
          { word: "故", reading: "ゆえ", meaning: "Lý do" },
          { word: "故に", reading: "ゆえに", meaning: "Do đó, kết quả là" }
        ]
      },
      {
        character: "伝",
        sino_vietnamese: "TRUYỀN",
        meaning: "Truyền",
        vocabularies: [
          { word: "宣伝", reading: "せんでん", meaning: "Tuyên truyền" },
          { word: "伝統", reading: "でんとう", meaning: "Truyền thống" },
          { word: "伝え", reading: "つたえ", meaning: "Sự truyền đạt" },
          { word: "伝える", reading: "つたえる", meaning: "Truyền lời, truyền đạt" },
          { word: "手伝う", reading: "てつだう", meaning: "Giúp đỡ" }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Bài 14",
    kanjis: [
      {
        character: "黄",
        sino_vietnamese: "HOÀNG",
        meaning: "Vàng",
        vocabularies: [
          { word: "黄砂", reading: "こうさ", meaning: "Cát vàng" },
          { word: "卵黄", reading: "らんおう", meaning: "Lòng đỏ trứng" },
          { word: "黄金", reading: "こがね", meaning: "Vàng (kim loại)" },
          { word: "黄色い", reading: "きいろい", meaning: "Màu vàng" }
        ]
      },
      {
        character: "絵",
        sino_vietnamese: "HỘI",
        meaning: "Tranh",
        vocabularies: [
          { word: "絵図", reading: "えず", meaning: "Hình minh hoạ" },
          { word: "絵画展", reading: "かいがてん", meaning: "Triển lãm tranh" },
          { word: "絵", reading: "え", meaning: "Tranh" }
        ]
      },
      {
        character: "組",
        sino_vietnamese: "TỔ",
        meaning: "Tổ hợp, ghép",
        vocabularies: [
          { word: "組織", reading: "そしき", meaning: "Tổ chức" },
          { word: "組成", reading: "そせい", meaning: "Kết cấu" },
          { word: "組合", reading: "くみあい", meaning: "Nghiệp đoàn, công đoàn" },
          { word: "組む", reading: "くむ", meaning: "Lắp ghép, khoanh (tay)" },
          { word: "組み立てる", reading: "くみたてる", meaning: "Lắp ráp" }
        ]
      },
      {
        character: "束",
        sino_vietnamese: "THÚC",
        meaning: "Buộc, bó",
        vocabularies: [
          { word: "約束", reading: "やくそく", meaning: "Cuộc hẹn, lời hứa" },
          { word: "束脩", reading: "そくしゅう", meaning: "Lệ phí thi, học phí" },
          { word: "花束", reading: "はなたば", meaning: "Bó hoa" },
          { word: "束ねる", reading: "たばねる", meaning: "Bó lại, buộc lại" },
          { word: "束の間", reading: "つかのま", meaning: "Chốc lát" }
        ]
      },
      {
        character: "授",
        sino_vietnamese: "THỤ",
        meaning: "Nhận, trao cho, học",
        vocabularies: [
          { word: "授業", reading: "じゅぎょう", meaning: "Tiết học" },
          { word: "授賞", reading: "じゅしょう", meaning: "Nhận giải thưởng" },
          { word: "授ける", reading: "さずける", meaning: "Trao cho, ban cho" },
          { word: "授かる", reading: "さずかる", meaning: "Được lĩnh, được ban" }
        ]
      },
      {
        character: "渡",
        sino_vietnamese: "ĐỘ",
        meaning: "Qua, vượt qua",
        vocabularies: [
          { word: "渡船", reading: "toせん", meaning: "Phà, đò" },
          { word: "渡る", reading: "わたる", meaning: "Băng qua" },
          { word: "渡す", reading: "わたす", meaning: "Trao, đưa" },
          { word: "渡硝子", reading: "わたりがらす", meaning: "Quạ (quạ di cư)" }
        ]
      },
      {
        character: "昔",
        sino_vietnamese: "TÍCH",
        meaning: "Xưa",
        vocabularies: [
          { word: "昔時", reading: "せきじ", meaning: "Thời xưa" },
          { word: "昔年", reading: "せきねん", meaning: "Năm xưa" },
          { word: "昔日", reading: "sえきじつ", meaning: "Ngày xưa" },
          { word: "昔話", reading: "むかしばなし", meaning: "Truyện cổ tích" },
          { word: "昔", reading: "むかし", meaning: "Ngày xưa" }
        ]
      }
    ]
  }
];
