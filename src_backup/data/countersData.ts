// Core data for Japanese Counters
export interface CounterItem {
  num: number;
  kanji: string;
  reading: string;
  romaji: string;
  irregular?: boolean;
}

export interface Counter {
  id: string;
  name: string;
  kanji: string;
  romaji: string;
  category: string;
  usage: string;
  example: string;
  howToAsk: string;
  notes?: string;
  list: CounterItem[];
}

export const ALL_COUNTERS: Counter[] = [
  {
    id: 'tsu',
    name: 'Số đếm chung Thuần Nhật (~つ)',
    kanji: 'つ',
    romaji: 'tsu',
    category: 'Cốt lõi',
    usage: 'Dùng đếm các vật tròn, hộp, hoặc đồ vật không có đơn vị đếm chuyên dụng.',
    example: 'Quả táo, ổ bánh mì, ý kiến, thắc mắc...',
    howToAsk: 'いくつ (ikutsu)',
    notes: 'Chỉ dùng từ 1 đến 9. Mốc 10 đọc là とお (không có つ). Từ 11 trở đi bắt buộc đếm bằng số thông thường.',
    list: [
      { num: 1, kanji: '一つ', reading: 'ひとつ', romaji: 'hitotsu', irregular: true },
      { num: 2, kanji: '二つ', reading: 'ふたつ', romaji: 'futatsu', irregular: true },
      { num: 3, kanji: '三つ', reading: 'みっつ', romaji: 'mittsu', irregular: true },
      { num: 4, kanji: '四つ', reading: 'よっつ', romaji: 'yottsu', irregular: true },
      { num: 5, kanji: '五つ', reading: 'いつつ', romaji: 'itutsu', irregular: true },
      { num: 6, kanji: '六つ', reading: 'むっつ', romaji: 'muttu', irregular: true },
      { num: 7, kanji: '七つ', reading: 'ななつ', romaji: 'nanatsu', irregular: true },
      { num: 8, kanji: '八つ', reading: 'やっつ', romaji: 'yattu', irregular: true },
      { num: 9, kanji: '九つ', reading: 'ここのつ', romaji: 'kokonotsu', irregular: true },
      { num: 10, kanji: '十', reading: 'とお', romaji: 'too', irregular: true }
    ]
  },
  {
    id: 'nin',
    name: 'Người (~人)',
    kanji: '人',
    romaji: 'nin',
    category: 'Cốt lõi',
    usage: 'Đếm số lượng người.',
    example: 'Thành viên gia đình, học sinh, khách hàng...',
    howToAsk: '何人 (nan-nin)',
    notes: 'Bất quy tắc cực kỳ quan trọng ở 1 người (ひとり), 2 người (ふたり) và 4 người (よにん - không đọc là よんにん).',
    list: [
      { num: 1, kanji: '一人', reading: 'ひとり', romaji: 'hitori', irregular: true },
      { num: 2, kanji: '二人', reading: 'ふたり', romaji: 'futari', irregular: true },
      { num: 3, kanji: '三人', reading: 'さんにん', romaji: 'san-nin', irregular: false },
      { num: 4, kanji: '四人', reading: 'よにん', romaji: 'yo-nin', irregular: true },
      { num: 5, kanji: '五人', reading: 'ごにん', romaji: 'go-nin', irregular: false },
      { num: 6, kanji: '六人', reading: 'ろくにん', romaji: 'roku-nin', irregular: false },
      { num: 7, kanji: '七人', reading: 'ななにん / しちにん', romaji: 'nana-nin / shichi-nin', irregular: false },
      { num: 8, kanji: '八人', reading: 'はちにん', romaji: 'hachi-nin', irregular: false },
      { num: 9, kanji: '九人', reading: 'きゅうにん / くにん', romaji: 'kyuu-nin / ku-nin', irregular: true },
      { num: 10, kanji: '十人', reading: 'じゅうにん', romaji: 'juu-nin', irregular: false }
    ]
  },
  {
    id: 'sai',
    name: 'Tuổi (~歳)',
    kanji: '歳',
    romaji: 'sai',
    category: 'Cốt lõi',
    usage: 'Chỉ số tuổi của người.',
    example: 'Bé 1 tuổi, tôi 20 tuổi...',
    howToAsk: '何歳 (nan-sai) / おいくつ (o-ikutsu)',
    notes: 'Lưu ý mốc biến âm ngắt ở 1 tuổi (いっさい), 8 tuổi (はっさい), 10 tuổi (じゅっさい) và mốc siêu đặc biệt 20 tuổi đọc là はたち (hatachi).',
    list: [
      { num: 1, kanji: '一歳', reading: 'いっさい', romaji: 'issai', irregular: true },
      { num: 2, kanji: '二歳', reading: 'にさい', romaji: 'nisai', irregular: false },
      { num: 3, kanji: '三歳', reading: 'さんさい', romaji: 'sansai', irregular: false },
      { num: 4, kanji: '四歳', reading: 'よんさい', romaji: 'yonsai', irregular: false },
      { num: 5, kanji: '五歳', reading: 'ごさい', romaji: 'gosai', irregular: false },
      { num: 6, kanji: '六歳', reading: 'ろくさい', romaji: 'rokusai', irregular: false },
      { num: 7, kanji: '七歳', reading: 'ななさい', romaji: 'nanasai', irregular: false },
      { num: 8, kanji: '八歳', reading: 'はっさい', romaji: 'hassai', irregular: true },
      { num: 9, kanji: '九歳', reading: 'きゅうさい', romaji: 'kyuusai', irregular: false },
      { num: 10, kanji: '十歳', reading: 'じゅっさい', romaji: 'jussai', irregular: true }
    ]
  },
  {
    id: 'ji',
    name: 'Giờ (~時)',
    kanji: '時',
    romaji: 'ji',
    category: 'Thời gian',
    usage: 'Chỉ mốc giờ trên đồng hồ.',
    example: '1 giờ trưa, 4 giờ chiều...',
    howToAsk: '何時 (nan-ji)',
    notes: 'Chú ý mốc 4 giờ là よじ (bỏ ん), 7 giờ là しちじ, 9 giờ là くじ.',
    list: [
      { num: 1, kanji: '一時', reading: 'いちじ', romaji: 'ichiji', irregular: false },
      { num: 2, kanji: '二時', reading: 'にじ', romaji: 'niji', irregular: false },
      { num: 3, kanji: '三時', reading: 'さんじ', romaji: 'sanji', irregular: false },
      { num: 4, kanji: '四時', reading: 'よじ', romaji: 'yoji', irregular: true },
      { num: 5, kanji: '五時', reading: 'ごじ', romaji: 'goji', irregular: false },
      { num: 6, kanji: '六時', reading: 'ろくじ', romaji: 'rokuji', irregular: false },
      { num: 7, kanji: '七時', reading: 'しちじ', romaji: 'shichiji', irregular: true },
      { num: 8, kanji: '八時', reading: 'はちじ', romaji: 'hachiji', irregular: false },
      { num: 9, kanji: '九時', reading: 'くじ', romaji: 'kuji', irregular: true },
      { num: 10, kanji: '十時', reading: 'じゅうじ', romaji: 'juuji', irregular: false }
    ]
  },
  {
    id: 'fun',
    name: 'Phút (~分)',
    kanji: '分',
    romaji: 'fun / pun',
    category: 'Thời gian',
    usage: 'Chỉ mốc phút hoặc khoảng thời lượng phút.',
    example: '5 phút nghỉ, 10 phút trôi qua...',
    howToAsk: '何分 (nan-pun)',
    notes: 'Quy luật biến âm phức tạp. Các mốc 1, 3, 4, 6, 8, 10 đều biến thành âm ngắt đi kèm phụ âm "p" tròn môi (pun).',
    list: [
      { num: 1, kanji: '一分', reading: 'いっぷん', romaji: 'ippun', irregular: true },
      { num: 2, kanji: '二分', reading: 'にふん', romaji: 'nihun', irregular: false },
      { num: 3, kanji: '三分', reading: 'さんぷん', romaji: 'sanpun', irregular: true },
      { num: 4, kanji: '四分', reading: 'よんぷん', romaji: 'yonpun', irregular: true },
      { num: 5, kanji: '五分', reading: 'ごふん', romaji: 'gohun', irregular: false },
      { num: 6, kanji: '六分', reading: 'ろっぷん', romaji: 'roppun', irregular: true },
      { num: 7, kanji: '七分', reading: 'ななふん', romaji: 'nanahun', irregular: false },
      { num: 8, kanji: '八分', reading: 'はっぷん', romaji: 'happun', irregular: true },
      { num: 9, kanji: '九分', reading: 'きゅうふん', romaji: 'kyuuhun', irregular: false },
      { num: 10, kanji: '十分', reading: 'じゅっぷん', romaji: 'juppun', irregular: true }
    ]
  },
  {
    id: 'jikan',
    name: 'Tiếng đồng hồ (~時間)',
    kanji: '時間',
    romaji: 'jikan',
    category: 'Thời gian',
    usage: 'Đếm khoảng thời lượng kéo dài bao nhiêu tiếng đồng hồ.',
    example: 'Học bài trong 4 tiếng, ngủ 8 tiếng...',
    howToAsk: '何時間 (nan-jikan)',
    notes: 'Thừa hưởng trọn vẹn quy luật biến đổi của bộ đếm Giờ (~時): 4 tiếng là よじかん, 9 tiếng là くじかん.',
    list: [
      { num: 1, kanji: '一時間', reading: 'いちじかん', romaji: 'ichijikan', irregular: false },
      { num: 2, kanji: '二時間', reading: 'にじかん', romaji: 'nijikan', irregular: false },
      { num: 3, kanji: '三時間', reading: 'さんじかん', romaji: 'sanjikan', irregular: false },
      { num: 4, kanji: '四時間', reading: 'よじかん', romaji: 'yojikan', irregular: true },
      { num: 5, kanji: '五時間', reading: 'ごじかん', romaji: 'gojikan', irregular: false },
      { num: 6, kanji: '六時間', reading: 'ろくじかん', romaji: 'rokujikan', irregular: false },
      { num: 7, kanji: '七時間', reading: 'しちじかん', romaji: 'shichijikan', irregular: true },
      { num: 8, kanji: '八時間', reading: 'はちじかん', romaji: 'hachijikan', irregular: false },
      { num: 9, kanji: '九時間', reading: 'くじかん', romaji: 'kujikan', irregular: true },
      { num: 10, kanji: '十時間', reading: 'じゅうじかん', romaji: 'juujikan', irregular: false }
    ]
  },
  {
    id: 'byou',
    name: 'Giây (~秒)',
    kanji: '秒',
    romaji: 'byou',
    category: 'Thời gian',
    usage: 'Chỉ mốc giây hoặc khoảng thời lượng giây.',
    example: 'Chạy nước rút trong 10 giây...',
    howToAsk: '何秒 (nan-byou)',
    notes: 'Cực kỳ đơn giản, không có bất kỳ biến âm bất quy tắc nào.',
    list: [
      { num: 1, kanji: '一秒', reading: 'いちびょう', romaji: 'ichibyou', irregular: false },
      { num: 2, kanji: '二秒', reading: 'にびょう', romaji: 'nibyou', irregular: false },
      { num: 3, kanji: '三秒', reading: 'さんびょう', romaji: 'sanbyou', irregular: false },
      { num: 4, kanji: '四秒', reading: 'よんびょう', romaji: 'yonbyou', irregular: false },
      { num: 5, kanji: '五秒', reading: 'ごびょう', romaji: 'gobyou', irregular: false },
      { num: 6, kanji: '六秒', reading: 'ろくびょう', romaji: 'rokubyou', irregular: false },
      { num: 7, kanji: '七秒', reading: 'ななびょう / しちびょう', romaji: 'nanabyou / shichibyou', irregular: false },
      { num: 8, kanji: '八秒', reading: 'はちびょう', romaji: 'hachibyou', irregular: false },
      { num: 9, kanji: '九秒', reading: 'きゅうびょう', romaji: 'kyuubyou', irregular: false },
      { num: 10, kanji: '十秒', reading: 'じゅうびょう', romaji: 'juubyou', irregular: false }
    ]
  },
  {
    id: 'ko',
    name: 'Vật tròn nhỏ (~個)',
    kanji: '個',
    romaji: 'ko',
    category: 'Vật thể',
    usage: 'Đếm đồ vật nhỏ, quả cây hình khối tròn.',
    example: 'Quả táo, quả bóng, cục tẩy, linh kiện...',
    howToAsk: '何個 (nan-ko)',
    notes: 'Biến âm gấp âm ở các mốc 1, 6, 8, 10.',
    list: [
      { num: 1, kanji: '一個', reading: 'いっこ', romaji: 'ikko', irregular: true },
      { num: 2, kanji: '二個', reading: 'にこ', romaji: 'niko', irregular: false },
      { num: 3, kanji: '三個', reading: 'さんこ', romaji: 'sanko', irregular: false },
      { num: 4, kanji: '四個', reading: 'よんこ', romaji: 'yonko', irregular: false },
      { num: 5, kanji: '五個', reading: 'ごこ', romaji: 'goko', irregular: false },
      { num: 6, kanji: '六個', reading: 'ろっこ', romaji: 'rokko', irregular: true },
      { num: 7, kanji: '七個', reading: 'ななこ', romaji: 'nanako', irregular: false },
      { num: 8, kanji: '八個', reading: 'はっこ', romaji: 'hakko', irregular: true },
      { num: 9, kanji: '九個', reading: 'きゅうこ', romaji: 'kyuuko', irregular: false },
      { num: 10, kanji: '十個', reading: 'じゅっこ', romaji: 'jukko', irregular: true }
    ]
  },
  {
    id: 'mai',
    name: 'Vật mỏng, phẳng (~枚)',
    kanji: '枚',
    romaji: 'mai',
    category: 'Vật thể',
    usage: 'Đếm giấy, đĩa ăn, áo thun, hóa đơn, bưu thiếp, lát bánh mì.',
    example: 'Tờ giấy A4, vé tàu, đĩa nhạc, áo thun...',
    howToAsk: '何枚 (nan-mai)',
    notes: 'Hoàn toàn quy tắc, chỉ cần ghép số thông thường với まい.',
    list: [
      { num: 1, kanji: '一枚', reading: 'いちまい', romaji: 'ichimai', irregular: false },
      { num: 2, kanji: '二枚', reading: 'にまい', romaji: 'nimai', irregular: false },
      { num: 3, kanji: '三枚', reading: 'さんまい', romaji: 'sanmai', irregular: false },
      { num: 4, kanji: '四枚', reading: 'よんまい', romaji: 'yonmai', irregular: false },
      { num: 5, kanji: '五枚', reading: 'ごまい', romaji: 'gomai', irregular: false },
      { num: 6, kanji: '六枚', reading: 'ろくまい', romaji: 'rokumai', irregular: false },
      { num: 7, kanji: '七枚', reading: 'ななまい', romaji: 'nanamai', irregular: false },
      { num: 8, kanji: '八枚', reading: 'はちまい', romaji: 'hachimai', irregular: false },
      { num: 9, kanji: '九枚', reading: 'きゅうまい', romaji: 'kyuumai', irregular: false },
      { num: 10, kanji: '十枚', reading: 'じゅうまい', romaji: 'juumai', irregular: false }
    ]
  },
  {
    id: 'hon',
    name: 'Vật thon dài (~本)',
    kanji: '本',
    romaji: 'hon / bon / pon',
    category: 'Vật thể',
    usage: 'Đếm chai nước, bút viết, cây cối, ngón tay, sợi dây thừng.',
    example: 'Cây bút chì, chai bia, cuộn chỉ, bộ phim dài...',
    howToAsk: '何本 (nan-bon)',
    notes: 'Biến âm rất mạnh thành âm "p" hoặc "b" ở các mốc 1, 3, 6, 8, 10.',
    list: [
      { num: 1, kanji: '一本', reading: 'いっぽん', romaji: 'ippon', irregular: true },
      { num: 2, kanji: '二本', reading: 'にほん', romaji: 'nihon', irregular: false },
      { num: 3, kanji: '三本', reading: 'さんぼん', romaji: 'sanbon', irregular: true },
      { num: 4, kanji: '四本', reading: 'よんほん', romaji: 'yonhon', irregular: false },
      { num: 5, kanji: '五本', reading: 'ごほん', romaji: 'gohon', irregular: false },
      { num: 6, kanji: '六本', reading: 'ろっぽん', romaji: 'roppon', irregular: true },
      { num: 7, kanji: '七本', reading: 'ななほん', romaji: 'nanahon', irregular: false },
      { num: 8, kanji: '八本', reading: 'はっぽん / はちほん', romaji: 'happon / hachihon', irregular: true },
      { num: 9, kanji: '九本', reading: 'きゅうほん', romaji: 'kyuuhon', irregular: false },
      { num: 10, kanji: '十本', reading: 'じゅっぽん', romaji: 'juppon', irregular: true }
    ]
  },
  {
    id: 'hiki',
    name: 'Động vật nhỏ (~匹)',
    kanji: '匹',
    romaji: 'hiki / biki / piki',
    category: 'Người & Động vật',
    usage: 'Đếm chó, mèo, côn trùng, cá, loài bò sát.',
    example: 'Con chó, con mèo, con cá cảnh, con muỗi...',
    howToAsk: '何匹 (nan-biki)',
    notes: 'Biến âm tương tự bộ đếm 本 (hon) ở các mốc 1, 3, 6, 8, 10.',
    list: [
      { num: 1, kanji: '一匹', reading: 'いっぴき', romaji: 'ippiki', irregular: true },
      { num: 2, kanji: '二匹', reading: 'にひき', romaji: 'nihiki', irregular: false },
      { num: 3, kanji: '三匹', reading: 'さんびき', romaji: 'sanbiki', irregular: true },
      { num: 4, kanji: '四匹', reading: 'よんひき', romaji: 'yonhiki', irregular: false },
      { num: 5, kanji: '五匹', reading: 'ごひき', romaji: 'gohiki', irregular: false },
      { num: 6, kanji: '六匹', reading: 'ろっぴき', romaji: 'roppiki', irregular: true },
      { num: 7, kanji: '七匹', reading: 'ななひき', romaji: 'nanahiki', irregular: false },
      { num: 8, kanji: '八匹', reading: 'はっぴき', romaji: 'happiki', irregular: true },
      { num: 9, kanji: '九匹', reading: 'きゅうひき', romaji: 'kyuuhiki', irregular: false },
      { num: 10, kanji: '十匹', reading: 'じゅっぴき', romaji: 'juppiki', irregular: true }
    ]
  },
  {
    id: 'tou',
    name: 'Động vật lớn (~頭)',
    kanji: '頭',
    romaji: 'tou',
    category: 'Người & Động vật',
    usage: 'Đếm gia súc, động vật kích thước lớn.',
    example: 'Bò, ngựa, voi, gấu trúc, sư tử...',
    howToAsk: '何頭 (nan-tou)',
    notes: 'Hầu như không biến âm ở giữa, riêng mốc 1 và 10 là いっとう, じゅっとう.',
    list: [
      { num: 1, kanji: '一頭', reading: 'いっとう', romaji: 'ittou', irregular: true },
      { num: 2, kanji: '二頭', reading: 'にとう', romaji: 'nitou', irregular: false },
      { num: 3, kanji: '三頭', reading: 'さんとう', romaji: 'santou', irregular: false },
      { num: 4, kanji: '四頭', reading: 'よんとう', romaji: 'yontou', irregular: false },
      { num: 5, kanji: '五頭', reading: 'ごとう', romaji: 'gotou', irregular: false },
      { num: 6, kanji: '六頭', reading: 'ろくとう', romaji: 'rokutou', irregular: false },
      { num: 7, kanji: '七頭', reading: 'ななとう', romaji: 'nanatou', irregular: false },
      { num: 8, kanji: '八頭', reading: 'はっとう', romaji: 'hattou', irregular: true },
      { num: 9, kanji: '九頭', reading: 'きゅうとう', romaji: 'kyuutou', irregular: false },
      { num: 10, kanji: '十頭', reading: 'じゅっとう', romaji: 'juttou', irregular: true }
    ]
  },
  {
    id: 'satsu',
    name: 'Sách, vở, tài liệu (~冊)',
    kanji: '冊',
    romaji: 'satsu',
    category: 'Vật thể',
    usage: 'Đếm sách, tập san, từ điển, tạp chí đóng cuốn.',
    example: 'Cuốn sách giáo khoa, quyển truyện tranh manga...',
    howToAsk: '何冊 (nan-satsu)',
    notes: 'Biến âm gấp phụ âm đầu (âm ngắt) ở mốc 1, 8, 10.',
    list: [
      { num: 1, kanji: '一冊', reading: 'いっさつ', romaji: 'issatsu', irregular: true },
      { num: 2, kanji: '二冊', reading: 'にさつ', romaji: 'nisatsu', irregular: false },
      { num: 3, kanji: '三冊', reading: 'さんさつ', romaji: 'sansatsu', irregular: false },
      { num: 4, kanji: '四冊', reading: 'よんさつ', romaji: 'yonsatsu', irregular: false },
      { num: 5, kanji: '五冊', reading: 'ごさつ', romaji: 'gosatsu', irregular: false },
      { num: 6, kanji: '六冊', reading: 'ろくさつ', romaji: 'rokusatsu', irregular: false },
      { num: 7, kanji: '七冊', reading: 'ななさつ', romaji: 'nanasatsu', irregular: false },
      { num: 8, kanji: '八冊', reading: 'はっさつ', romaji: 'hassatsu', irregular: true },
      { num: 9, kanji: '九冊', reading: 'きゅうさつ', romaji: 'kyuusatsu', irregular: false },
      { num: 10, kanji: '十冊', reading: 'じゅっさつ', romaji: 'jussatsu', irregular: true }
    ]
  },
  {
    id: 'dai',
    name: 'Máy móc, thiết bị (~台)',
    kanji: '台',
    romaji: 'dai',
    category: 'Vật thể',
    usage: 'Đếm xe cộ, đồ gia dụng điện tử, máy tính, máy móc.',
    example: 'Chiếc tivi, máy tính, ô tô, tủ lạnh...',
    howToAsk: '何台 (nan-dai)',
    notes: 'Rất dễ học, hoàn toàn không có biến âm bất quy tắc.',
    list: [
      { num: 1, kanji: '一台', reading: 'いちだい', romaji: 'ichidai', irregular: false },
      { num: 2, kanji: '二台', reading: 'にだい', romaji: 'nidai', irregular: false },
      { num: 3, kanji: '三台', reading: 'さんだい', romaji: 'sandai', irregular: false },
      { num: 4, kanji: '四台', reading: 'よんだい', romaji: 'yondai', irregular: false },
      { num: 5, kanji: '五台', reading: 'ごだい', romaji: 'godai', irregular: false },
      { num: 6, kanji: '六台', reading: 'ろくだい', romaji: 'rokudai', irregular: false },
      { num: 7, kanji: '七台', reading: 'ななだい', romaji: 'nanadai', irregular: false },
      { num: 8, kanji: '八台', reading: 'はちだい', romaji: 'hachidai', irregular: false },
      { num: 9, kanji: '九台', reading: 'きゅうだい', romaji: 'kyuudai', irregular: false },
      { num: 10, kanji: '十台', reading: 'じゅうだい', romaji: 'juudai', irregular: false }
    ]
  },
  {
    id: 'kai_floor',
    name: 'Tầng nhà (~階)',
    kanji: '階',
    romaji: 'kai / gai',
    category: 'Vị trí & Địa điểm',
    usage: 'Chỉ số tầng của tòa nhà.',
    example: 'Văn phòng tầng 3, căn hộ tầng 10...',
    howToAsk: '何階 (nan-gai / nan-kai)',
    notes: 'Tầng 3 biến âm thành さんがい (đục âm), tầng 1, 6, 8, 10 biến ngắt k.',
    list: [
      { num: 1, kanji: '一階', reading: 'いっかい', romaji: 'ikkai', irregular: true },
      { num: 2, kanji: '二階', reading: 'にかい', romaji: 'nikai', irregular: false },
      { num: 3, kanji: '三階', reading: 'さんがい', romaji: 'sangai', irregular: true },
      { num: 4, kanji: '四階', reading: 'よんかい', romaji: 'yonkai', irregular: false },
      { num: 5, kanji: '五階', reading: 'ごかい', romaji: 'gokai', irregular: false },
      { num: 6, kanji: '六階', reading: 'ろっかい', romaji: 'rokkai', irregular: true },
      { num: 7, kanji: '七階', reading: 'ななかい', romaji: 'nanakai', irregular: false },
      { num: 8, kanji: '八階', reading: 'はっかい', romaji: 'hakkai', irregular: true },
      { num: 9, kanji: '九階', reading: 'きゅうかい', romaji: 'kyuukai', irregular: false },
      { num: 10, kanji: '十階', reading: 'じゅっかい', romaji: 'jukkai', irregular: true }
    ]
  },
  {
    id: 'day',
    name: 'Ngày / Đếm ngày (~日)',
    kanji: '日',
    romaji: 'ka / nichi',
    category: 'Thời gian',
    usage: 'Chỉ mốc ngày trong tháng hoặc thời lượng số ngày.',
    example: 'Ngày mùng 5 tháng 5, chuyến đi du lịch 3 ngày...',
    howToAsk: '何日 (nan-nichi)',
    notes: 'Bất quy tắc nghiêm trọng bậc nhất từ mốc 1 đến 10. Chú ý mùng 1 là ついたち.',
    list: [
      { num: 1, kanji: '一日', reading: 'ついたち (Mùng 1) / いちにち (1 ngày)', romaji: 'tsuitachi / ichinichi', irregular: true },
      { num: 2, kanji: '二日', reading: 'ふつか', romaji: 'futsuka', irregular: true },
      { num: 3, kanji: '三日', reading: 'みっか', romaji: 'mikka', irregular: true },
      { num: 4, kanji: '四日', reading: 'よっか', romaji: 'yokka', irregular: true },
      { num: 5, kanji: '五日', reading: 'いつか', romaji: 'itsuka', irregular: true },
      { num: 6, kanji: '六日', reading: 'むいか', romaji: 'muika', irregular: true },
      { num: 7, kanji: '七日', reading: 'なのか', romaji: 'nanoka', irregular: true },
      { num: 8, kanji: '八日', reading: 'ようか', romaji: 'youka', irregular: true },
      { num: 9, kanji: '九日', reading: 'ここのか', romaji: 'kokonoka', irregular: true },
      { num: 10, kanji: '十日', reading: 'とおか', romaji: 'tooka', irregular: true }
    ]
  },
  {
    id: 'kai_times',
    name: 'Lần, lượt (~回)',
    kanji: '回',
    romaji: 'kai',
    category: 'Khác',
    usage: 'Đếm số lần thực hiện hành động hoặc tần suất.',
    example: 'Học lại 1 lần nữa, đi Nhật 3 lần...',
    howToAsk: '何回 (nan-kai)',
    notes: 'Biến ngắt ở 1, 6, 8, 10 tương tự phát âm của tầng nhà.',
    list: [
      { num: 1, kanji: '一回', reading: 'いっかい', romaji: 'ikkai', irregular: true },
      { num: 2, kanji: '二回', reading: 'にかい', romaji: 'nikai', irregular: false },
      { num: 3, kanji: '三回', reading: 'さんかい', romaji: 'sankai', irregular: false },
      { num: 4, kanji: '四回', reading: 'よんかい', romaji: 'yonkai', irregular: false },
      { num: 5, kanji: '五回', reading: 'ごかい', romaji: 'gokai', irregular: false },
      { num: 6, kanji: '六回', reading: 'ろっかい', romaji: 'rokkai', irregular: true },
      { num: 7, kanji: '七回', reading: 'ななかい', romaji: 'nanakai', irregular: false },
      { num: 8, kanji: '八回', reading: 'はっかい', romaji: 'hakkai', irregular: true },
      { num: 9, kanji: '九回', reading: 'きゅうかい', romaji: 'kyuukai', irregular: false },
      { num: 10, kanji: '十回', reading: 'じゅっかい', romaji: 'jukkai', irregular: true }
    ]
  },
  {
    id: 'month',
    name: 'Số tháng (~ヶ月)',
    kanji: 'ヶ月',
    romaji: 'kagetsu',
    category: 'Thời gian',
    usage: 'Đếm khoảng thời lượng bao nhiêu tháng.',
    example: 'Học tiếng Nhật trong 3 tháng...',
    howToAsk: '何ヶ月 (nan-kagetsu)',
    notes: 'Có sự biến âm gấp phụ âm đầu (âm ngắt) ở các mốc 1, 6, 8, 10.',
    list: [
      { num: 1, kanji: '一ヶ月', reading: 'いっかげつ', romaji: 'ikkagetsu', irregular: true },
      { num: 2, kanji: '二ヶ月', reading: 'にかげつ', romaji: 'nikagetsu', irregular: false },
      { num: 3, kanji: '三ヶ月', reading: 'さんかげつ', romaji: 'sankagetsu', irregular: false },
      { num: 4, kanji: '四ヶ月', reading: 'よんかげつ', romaji: 'yonkagetsu', irregular: false },
      { num: 5, kanji: '五ヶ月', reading: 'ごかげつ', romaji: 'gokagetsu', irregular: false },
      { num: 6, kanji: '六ヶ月', reading: 'ろっかげつ', romaji: 'rokkagetsu', irregular: true },
      { num: 7, kanji: '七ヶ月', reading: 'ななかげつ', romaji: 'nanakagetsu', irregular: false },
      { num: 8, kanji: '八ヶ月', reading: 'はっかげつ', romaji: 'hakkagetsu', irregular: true },
      { num: 9, kanji: '九ヶ月', reading: 'きゅうかげつ', romaji: 'kyuukagetsu', irregular: false },
      { num: 10, kanji: '十ヶ月', reading: 'じゅっかげつ', romaji: 'jukkagetsu', irregular: true }
    ]
  },
  {
    id: 'year',
    name: 'Năm (~年)',
    kanji: '年',
    romaji: 'nen',
    category: 'Thời gian',
    usage: 'Chỉ mốc năm dương lịch hoặc thời lượng bao nhiêu năm.',
    example: 'Năm 2026, đi du học 4 năm...',
    howToAsk: '何年 (nan-nen)',
    notes: 'Đặc biệt lưu ý 4 năm là よねん (bỏ ん), 14 năm là じゅうよねん.',
    list: [
      { num: 1, kanji: '一年', reading: 'いちねん', romaji: 'ichinen', irregular: false },
      { num: 2, kanji: '二年', reading: 'にねん', romaji: 'ninen', irregular: false },
      { num: 3, kanji: '三年', reading: 'さんねん', romaji: 'sannen', irregular: false },
      { num: 4, kanji: '四年', reading: 'よねん', romaji: 'yonen', irregular: true },
      { num: 5, kanji: '五年', reading: 'ごねん', romaji: 'gonen', irregular: false },
      { num: 6, kanji: '六年', reading: 'ろくねん', romaji: 'rokunen', irregular: false },
      { num: 7, kanji: '七年', reading: 'しちねん / ななねん', romaji: 'shichinen / nananen', irregular: false },
      { num: 8, kanji: '八年', reading: 'はちねん', romaji: 'hachinen', irregular: false },
      { num: 9, kanji: '九年', reading: 'きゅうねん / くねん', romaji: 'kyuunen / kunen', irregular: true },
      { num: 10, kanji: '十年', reading: 'じゅうねん', romaji: 'juunen', irregular: false }
    ]
  },
  {
    id: 'wa',
    name: 'Chim và Thỏ (~羽)',
    kanji: '羽',
    romaji: 'wa',
    category: 'Người & Động vật',
    usage: 'Đếm gia cầm, loài chim và con thỏ.',
    example: 'Con gà, con vịt, bồ câu, con thỏ...',
    howToAsk: '何羽 (nan-wa)',
    notes: 'Thỏ được đếm bằng 羽 do truyền thống văn hóa Nhật Bản.',
    list: [
      { num: 1, kanji: '一羽', reading: 'いちわ', romaji: 'ichiwah', irregular: false },
      { num: 2, kanji: '二羽', reading: 'にわ', romaji: 'niwa', irregular: false },
      { num: 3, kanji: '三羽', reading: 'さんわ / さんば', romaji: 'sanwa / sanba', irregular: true },
      { num: 4, kanji: '四羽', reading: 'よんわ', romaji: 'yonwa', irregular: false },
      { num: 5, kanji: '五羽', reading: 'ごわ', romaji: 'gowa', irregular: false },
      { num: 6, kanji: '六羽', reading: 'ろくわ / ろっぱ', romaji: 'rokuwa / roppa', irregular: true },
      { num: 7, kanji: '七羽', reading: 'ななわ', romaji: 'nanawa', irregular: false },
      { num: 8, kanji: '八羽', reading: 'はちわ / はっぱ', romaji: 'hachiwa / happa', irregular: true },
      { num: 9, kanji: '九羽', reading: 'きゅうわ', romaji: 'kyuuwa', irregular: false },
      { num: 10, kanji: '十羽', reading: 'じゅうわ / じゅっぱ', romaji: 'juuwa / juppa', irregular: true }
    ]
  },
  {
    id: 'hai',
    name: 'Cốc, chén, muỗng (~杯)',
    kanji: '杯',
    romaji: 'hai / bai / pai',
    category: 'Vật thể',
    usage: 'Đếm lượng nước chứa trong ly, chén hoặc muỗng.',
    example: 'Ly cà phê, bát cơm, muỗng đường...',
    howToAsk: '何杯 (nan-bai)',
    notes: 'Có sự biến âm thành "pai" ở mốc 1, 6, 8, 10 và "bai" ở mốc số 3.',
    list: [
      { num: 1, kanji: '一杯', reading: 'いっぱい', romaji: 'ippai', irregular: true },
      { num: 2, kanji: '二杯', reading: 'にはい', romaji: 'nihai', irregular: false },
      { num: 3, kanji: '三杯', reading: 'さんばい', romaji: 'sanbai', irregular: true },
      { num: 4, kanji: '四杯', reading: 'よんはい', romaji: 'yonhai', irregular: false },
      { num: 5, kanji: '五杯', reading: 'ごはい', romaji: 'gohai', irregular: false },
      { num: 6, kanji: '六杯', reading: 'ろっぱい', romaji: 'roppai', irregular: true },
      { num: 7, kanji: '七杯', reading: 'ななはい', romaji: 'nanahai', irregular: false },
      { num: 8, kanji: '八杯', reading: 'はっぱい', romaji: 'happai', irregular: true },
      { num: 9, kanji: '九杯', reading: 'きゅうはい', romaji: 'kyuuhai', irregular: false },
      { num: 10, kanji: '十杯', reading: 'じゅっぱい', romaji: 'juppai', irregular: true }
    ]
  },
  {
    id: 'ken',
    name: 'Căn nhà, cửa hiệu (~軒)',
    kanji: '軒',
    romaji: 'ken / gen',
    category: 'Vị trí & Địa điểm',
    usage: 'Đếm các ngôi nhà độc lập hoặc cửa hàng.',
    example: 'Ba căn nhà hàng xóm, cửa hiệu ramen...',
    howToAsk: '何軒 (nan-gen)',
    notes: 'Số 3 biến âm thành "gen", 1, 6, 8, 10 biến thành âm ngắt "ken".',
    list: [
      { num: 1, kanji: '一軒', reading: 'いっけん', romaji: 'ikken', irregular: true },
      { num: 2, kanji: '二軒', reading: 'にけん', romaji: 'niken', irregular: false },
      { num: 3, kanji: '三軒', reading: 'さんげん', romaji: 'sangen', irregular: true },
      { num: 4, kanji: '四軒', reading: 'よんけん', romaji: 'yonken', irregular: false },
      { num: 5, kanji: '五軒', reading: 'ごけん', romaji: 'goken', irregular: false },
      { num: 6, kanji: '六軒', reading: 'ろっけん', romaji: 'rokken', irregular: true },
      { num: 7, kanji: '七軒', reading: 'ななけん', romaji: 'nanaken', irregular: false },
      { num: 8, kanji: '八軒', reading: 'はっけん', romaji: 'hakken', irregular: true },
      { num: 9, kanji: '九軒', reading: 'kyuuken', romaji: 'kyuuken', irregular: false },
      { num: 10, kanji: '十軒', reading: 'じゅっけん', romaji: 'jukken', irregular: true }
    ]
  },
  {
    id: 'soku',
    name: 'Đôi giày, đôi tất (~足)',
    kanji: '足',
    romaji: 'soku / zoku',
    category: 'Vật thể',
    usage: 'Đếm các vật đi theo đôi dưới chân.',
    example: 'Đôi tất thể thao, đôi giày tây...',
    howToAsk: '何足 (nan-zoku)',
    notes: 'Số 3 biến thành "zoku", số 8 và 10 biến thành âm ngắt.',
    list: [
      { num: 1, kanji: '一足', reading: 'いっそく', romaji: 'issoku', irregular: true },
      { num: 2, kanji: '二足', reading: 'にそく', romaji: 'nisoku', irregular: false },
      { num: 3, kanji: '三足', reading: 'さんぞく', romaji: 'sanzoku', irregular: true },
      { num: 4, kanji: '四足', reading: 'よんそく', romaji: 'yonsoku', irregular: false },
      { num: 5, kanji: '五足', reading: 'ごそく', romaji: 'gosoku', irregular: false },
      { num: 6, kanji: '六足', reading: 'ろくそく', romaji: 'rokusoku', irregular: false },
      { num: 7, kanji: '七足', reading: 'ななそく', romaji: 'nanasoku', irregular: false },
      { num: 8, kanji: '八足', reading: 'はっそく', romaji: 'hassoku', irregular: true },
      { num: 9, kanji: '九足', reading: 'きゅうそく', romaji: 'kyuusoku', irregular: false },
      { num: 10, kanji: '十足', reading: 'じゅっそく', romaji: 'jussoku', irregular: true }
    ]
  },
  {
    id: 'chaku',
    name: 'Bộ quần áo (~着)',
    kanji: '着',
    romaji: 'chaku',
    category: 'Vật thể',
    usage: 'Đếm bộ vest, áo khoác, kimono, váy đầm.',
    example: 'Một bộ vest công sở, áo khoác ấm...',
    howToAsk: '何着 (nan-chaku)',
    notes: 'Biến ngắt nhẹ ở mốc 1 (いっちゃく) và mốc 10 (じゅっちゃく).',
    list: [
      { num: 1, kanji: '一着', reading: 'いっちゃく', romaji: 'icchaku', irregular: true },
      { num: 2, kanji: '二着', reading: 'にちゃく', romaji: 'nichaku', irregular: false },
      { num: 3, kanji: '三着', reading: 'さんちゃく', romaji: 'sanchaku', irregular: false },
      { num: 4, kanji: '四着', reading: 'よんちゃく', romaji: 'yonchaku', irregular: false },
      { num: 5, kanji: '五着', reading: 'ごちゃく', romaji: 'gochaku', irregular: false },
      { num: 6, kanji: '六着', reading: 'ろくちゃく', romaji: 'rokuchaku', irregular: false },
      { num: 7, kanji: '七着', reading: 'ななちゃく', romaji: 'nanachaku', irregular: false },
      { num: 8, kanji: '八着', reading: 'はっちゃく', romaji: 'hacchaku', irregular: true },
      { num: 9, kanji: '九着', reading: 'きゅうちゃく', romaji: 'kyuuchaku', irregular: false },
      { num: 10, kanji: '十着', reading: 'じゅっちゃく', romaji: 'jucchaku', irregular: true }
    ]
  }
];

export const BASIC_NUMBERS = {
  units: [
    { num: 0, kanji: '零 / ゼロ', reading: 'れい / ぜろ', romaji: 'rei / zero' },
    { num: 1, kanji: '一', reading: 'いち', romaji: 'ichi' },
    { num: 2, kanji: '二', reading: 'に', romaji: 'ni' },
    { num: 3, kanji: '三', reading: 'さん', romaji: 'san' },
    { num: 4, kanji: '四', reading: 'よん / し', romaji: 'yon / shi', note: 'Thường đọc là よん khi ghép, し khi đọc số đơn.' },
    { num: 5, kanji: '五', reading: 'ご', romaji: 'go' },
    { num: 6, kanji: '六', reading: 'ろく', romaji: 'roku' },
    { num: 7, kanji: '七', reading: 'なな / しち', romaji: 'nana / shichi' },
    { num: 8, kanji: '八', reading: 'はち', romaji: 'hachi' },
    { num: 9, kanji: '九', reading: 'きゅう / く', romaji: 'kyuu / ku' },
    { num: 10, kanji: '十', reading: 'じゅう', romaji: 'juu' }
  ],
  tens: [
    { num: 11, kanji: '十一', reading: 'じゅういち', romaji: 'juuichi' },
    { num: 12, kanji: '十二', reading: 'じゅうに', romaji: 'juuni' },
    { num: 13, kanji: '十三', reading: 'じゅうさん', romaji: 'juusan' },
    { num: 14, kanji: '十四', reading: 'じゅうよん', romaji: 'juuyon' },
    { num: 15, kanji: '十五', reading: 'じゅうご', romaji: 'juugo' },
    { num: 16, kanji: '十六', reading: 'じゅうろく', romaji: 'juuroku' },
    { num: 17, kanji: '十七', reading: 'じゅうなな / じゅうしち', romaji: 'juunana / juushichi' },
    { num: 18, kanji: '十八', reading: 'じゅうはち', romaji: 'juuhachi' },
    { num: 19, kanji: '十九', reading: 'じゅうきゅう / じゅうく', romaji: 'juukyuu / juuku' },
    { num: 20, kanji: '二十', reading: 'にじゅう', romaji: 'nijuu' }
  ],
  hundreds: [
    { num: 100, kanji: '百', reading: 'ひゃく', romaji: 'hyaku' },
    { num: 200, kanji: '二百', reading: 'にひゃく', romaji: 'nihyaku' },
    { num: 300, kanji: '三百', reading: 'さんびゃく', romaji: 'sanbyaku', irregular: true, note: 'Biến âm đục hóa "hyaku" thành "byaku"' },
    { num: 400, kanji: '四百', reading: 'よんひゃく', romaji: 'yonhyaku' },
    { num: 500, kanji: '五百', reading: 'ごひゃく', romaji: 'gohyaku' },
    { num: 600, kanji: '六百', reading: 'ろっぴゃく', romaji: 'roppyaku', irregular: true, note: 'Biến âm ngắt súc âm "ku+hyaku" thành "ppyaku"' },
    { num: 700, kanji: '七百', reading: 'ななひゃく', romaji: 'nanahyaku' },
    { num: 800, kanji: '八百', reading: 'はっぴゃく', romaji: 'happyaku', irregular: true, note: 'Biến âm ngắt súc âm "chi+hyaku" thành "ppyaku"' },
    { num: 900, kanji: '九百', reading: 'きゅうひゃく', romaji: 'kyuuhyaku' }
  ],
  thousands: [
    { num: 1000, kanji: '千', reading: 'せん', romaji: 'sen' },
    { num: 2000, kanji: '二千', reading: 'にせん', romaji: 'nisen' },
    { num: 3000, kanji: '三千', reading: 'さんぜん', romaji: 'sanzen', irregular: true, note: 'Biến âm đục hóa "sen" thành "zen"' },
    { num: 4000, kanji: '四千', reading: 'よんせん', romaji: 'yonsen' },
    { num: 5000, kanji: '五千', reading: 'ごせん', romaji: 'gosen' },
    { num: 6000, kanji: '六千', reading: 'ろくせん', romaji: 'rokusen' },
    { num: 7000, kanji: '七千', reading: 'ななせん', romaji: 'nanasen' },
    { num: 8000, kanji: '八千', reading: 'はっせん', romaji: 'hassen', irregular: true, note: 'Biến âm ngắt súc âm "chi+sen" thành "ssen"' },
    { num: 9000, kanji: '九千', reading: 'きゅうせん', romaji: 'kyuusen' }
  ],
  tenThousands: [
    { num: 10000, kanji: '一万', reading: 'いちまん', romaji: 'ichiman', note: 'Người Nhật gộp nhóm số theo đơn vị 4 chữ số (vạn - 万) thay vì 3 chữ số.' },
    { num: 100000, kanji: '十万', reading: 'じゅうまん', romaji: 'juuman', value: '100.000 (Mười vạn)' },
    { num: 1000000, kanji: '百万', reading: 'ひゃくまん', romaji: 'hyakuman', value: '1.000.000 (Một triệu)' },
    { num: 10000000, kanji: '千万', reading: 'せんまん', romaji: 'senman', value: '10.000.000 (Mười triệu)' },
    { num: 100000000, kanji: '一億', reading: 'いちおく', romaji: 'ichioku', value: '100.000.000 (Một trăm triệu)' }
  ]
};

export const KANJI_PREFIXES = ["十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];

export function generate1To20List(counter: Counter): CounterItem[] {
  if (!counter) return [];
  if (counter.id === 'tsu') return counter.list;

  // Clone list 1-10
  const fullList = counter.list.map(item => ({ ...item }));

  for (let i = 11; i <= 20; i++) {
    const lastDigit = i % 10;
    let kanji = KANJI_PREFIXES[i - 11] + counter.kanji;
    let reading = "";
    let romaji = "";
    let irregular = false;

    if (i === 20) {
      if (counter.id === 'nin') {
        kanji = "二十人";
        reading = "にじゅうにん";
        romaji = "ni-juu-nin";
      } else if (counter.id === 'day') {
        kanji = "二十日";
        reading = "はつか";
        romaji = "hatsuka";
        irregular = true;
      } else if (counter.id === 'sai') {
        kanji = "二十歳";
        reading = "はたち / にじゅうさい";
        romaji = "hatachi / ni-juu-sai";
        irregular = true;
      } else if (counter.id === 'fun') {
        kanji = "二十分";
        reading = "にじゅっぷん";
        romaji = "ni-juppun";
        irregular = true;
      } else {
        const tenForm = counter.list[9];
        reading = "に" + tenForm.reading;
        romaji = "ni-" + tenForm.romaji;
        if (tenForm.irregular) irregular = true;
      }
    } else {
      const unitItem = counter.list[lastDigit - 1];

      if (counter.id === 'nin') {
        if (lastDigit === 4) {
          reading = "じゅうよにん";
          romaji = "juu-yo-nin";
          irregular = true;
        } else {
          reading = "じゅう" + unitItem.reading;
          romaji = "juu-" + unitItem.romaji;
        }
      } else if (counter.id === 'day') {
        if (lastDigit === 4) {
          reading = "じゅうよっか";
          romaji = "juu-yokka";
          irregular = true;
        } else {
          const dayStrFinal = 
            (lastDigit === 1) ? "いちにち" : 
            (lastDigit === 2) ? "ににch" : 
            (lastDigit === 2) ? "ににち" : 
            (lastDigit === 3) ? "さんにち" : 
            (lastDigit === 4) ? "よっか" : 
            (lastDigit === 5) ? "ごにち" : 
            (lastDigit === 6) ? "ろくにち" : 
            (lastDigit === 7) ? "しちにち" : 
            (lastDigit === 8) ? "はちにch" : 
            (lastDigit === 8) ? "はちにち" : "きゅうにch";
          
          reading = "じゅう" + dayStrFinal;
          romaji = "juu-day-" + lastDigit;
        }
      } else if (counter.id === 'ji' || counter.id === 'jikan') {
        const suffix = counter.id === 'jikan' ? 'かん' : '';
        if (lastDigit === 4) {
          reading = "じゅうよじ" + suffix;
          romaji = "juu-yoji" + suffix;
          irregular = true;
        } else if (lastDigit === 7) {
          reading = "じゅうしちじ" + suffix;
          romaji = "juu-shichiji" + suffix;
          irregular = true;
        } else if (lastDigit === 9) {
          reading = "じゅうくじ" + suffix;
          romaji = "juu-kuji" + suffix;
          irregular = true;
        } else {
          reading = "じゅう" + unitItem.reading;
          romaji = "juu-" + unitItem.romaji;
        }
      } else if (counter.id === 'year') {
        if (lastDigit === 4) {
          reading = "じゅうよねん";
          romaji = "juu-yo-nen";
          irregular = true;
        } else {
          reading = "じゅう" + unitItem.reading;
          romaji = "juu-" + unitItem.romaji;
        }
      } else {
        if (lastDigit === 1 && unitItem.reading.startsWith('いっ')) {
          reading = "じゅういっ" + unitItem.reading.slice(2);
          romaji = "juu-i" + unitItem.romaji.slice(1);
          irregular = true;
        } else if (lastDigit === 6 && unitItem.reading.startsWith('ろっ')) {
          reading = "じゅうろっ" + unitItem.reading.slice(2);
          romaji = "juu-ro" + unitItem.romaji.slice(1);
          irregular = true;
        } else if (lastDigit === 8 && unitItem.reading.startsWith('はっ')) {
          reading = "じゅうはっ" + unitItem.reading.slice(2);
          romaji = "juu-ha" + unitItem.romaji.slice(1);
          irregular = true;
        } else {
          reading = "じゅう" + unitItem.reading;
          romaji = "juu-" + unitItem.romaji;
          if (unitItem.irregular) irregular = true;
        }
      }
    }

    fullList.push({
      num: i,
      kanji,
      reading,
      romaji,
      irregular
    });
  }

  return fullList;
}
