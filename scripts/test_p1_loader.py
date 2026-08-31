# -*- coding: utf-8 -*-
from n2_writer_core import write_part_ts

# Items 1 to 250
ITEMS_P1 = [
  {
    "id": 1, "lesson": 1, "lessonTitle": "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ",
    "kanji": "相変わらず", "kana": "あいかわらず", "hanViet": "Tương biến",
    "meaning": "Vẫn, như thường lệ", "category": "Phó từ",
    "collocations": ["相変わらず元気 (Vẫn khỏe mạnh như mọi khi)", "相変わらずの～ (Vẫn là... như thường lệ)", "相変わらず忙しい (Vẫn bận rộn như cũ)"],
    "synonyms": [{"word": "依然として", "reading": "いぜんとして", "note": "Chỉ trạng thái không có gì thay đổi so với quá khứ."}],
    "antonyms": [{"word": "一変して", "reading": "いっぺんして", "meaning": "Thay đổi hoàn toàn"}],
    "nuanceNote": "BẪY ĐỀ THI N2: Hay hỏi trong phần tìm từ đồng nghĩa (Mondai 5), đồng nghĩa với 依然として, 相も変わらず. Cực kỳ lưu ý cụm '相変わらずお元気そうで' dùng trong thư từ/giao tiếp lịch sự.",
    "exampleJp": "彼は相変わらず忙しいです。", "exampleVn": "Anh ấy vẫn bận rộn như thường lệ."
  },
  {
    "id": 2, "lesson": 2, "lessonTitle": "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian",
    "kanji": "相次いで", "kana": "あいついで", "hanViet": "Tương thứ",
    "meaning": "Liên tiếp, dồn dập", "category": "Phó từ",
    "collocations": ["事故が相次ぐ (Tai nạn liên tiếp xảy ra)", "相次いで発表される (Lần lượt được công bố)", "批判が相次ぐ (Hứng chịu làn sóng chỉ trích liên tục)"],
    "synonyms": [{"word": "続々と", "reading": "ぞくぞくと", "note": "Dùng khi nhiều sự việc tương tự xảy ra liên tiếp trong thời gian ngắn."}],
    "antonyms": [{"word": "途絶えて", "reading": "とだえて", "meaning": "Bị gián đoạn"}],
    "nuanceNote": "BẪY ĐỀ THI N2: Chỉ dùng cho các sự kiện cùng loại xảy ra liên tiếp trong thời gian ngắn (thường là sự cố, thiên tai, tin tức). Bẫy chọn sai khi áp dụng cho hành động của 1 cá nhân đơn lẻ lặp lại.",
    "exampleJp": "事故が相次いで起こる。", "exampleVn": "Tai nạn xảy ra liên tiếp."
  },
  {
    "id": 3, "lesson": 3, "lessonTitle": "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao",
    "kanji": "相手", "kana": "あいて", "hanViet": "Tương thủ",
    "meaning": "Đối tượng, đối thủ", "category": "Danh từ",
    "collocations": ["話し相手 (Bạn nói chuyện, người tâm sự)", "相手にする (Tiếp chuyện, đối phó)", "結婚相手 (Đối tượng kết hôn)"],
    "synonyms": [{"word": "対象", "reading": "たいしょう", "note": "Chỉ người cùng tương tác, đối thoại hoặc đối đầu."}],
    "antonyms": [{"word": "自分", "reading": "じぶん", "meaning": "Bản thân"}],
    "nuanceNote": "LƯU Ý CÁCH DÙNG: Hay đi kèm các danh từ ghép: 話し相手, 結婚相手, 対戦相手. Đề thi N2 hay bẫy cụm '相手にする' (bận tâm/tiếp chuyện ai) và '相手にされない' (bị ngó lơ, không ai thèm để ý).",
    "exampleJp": "試合の相手が強いです。", "exampleVn": "Đối thủ của trận đấu rất mạnh."
  },
  {
    "id": 4, "lesson": 1, "lessonTitle": "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ",
    "kanji": "アイデア", "kana": "アイデア", "hanViet": "-",
    "meaning": "Ý tưởng", "category": "Danh từ",
    "collocations": ["アイデアが浮かぶ (Nảy ra ý tưởng mới)", "アイデアを出し合う (Cùng nhau đóng góp ý tưởng)", "画期的なアイデア (Ý tưởng mang tính bước ngoặt)"],
    "synonyms": [{"word": "着想", "reading": "ちゃくそう", "note": "Ý tưởng sáng tạo, giải pháp mới mẻ nảy ra trong đầu."}],
    "nuanceNote": "LƯU Ý: Thường đi với động từ 'アイデアが浮かぶ' (nảy ra ý tưởng) hoặc 'アイデアを出す'. Tránh nhầm với ヒント (gợi ý từ bên ngoài).",
    "exampleJp": "新しいアイデアが浮かびました。", "exampleVn": "Một ý tưởng mới đã xuất hiện."
  },
  {
    "id": 5, "lesson": 4, "lessonTitle": "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội",
    "kanji": "あいにく", "kana": "あいにく", "hanViet": "-",
    "meaning": "Không may, đáng tiếc", "category": "Phó từ",
    "collocations": ["あいにくの雨 (Trận mưa không đúng lúc/đáng tiếc)", "あいにく留守にする (Rất tiếc là đúng lúc đi vắng)", "あいにく都合が悪い (Rất tiếc là bận không đi được)"],
    "synonyms": [{"word": "折悪しく", "reading": "おりあしく", "note": "Dùng khi tình huống thực tế trái ngược với kỳ vọng/mong muốn, mang sắc thái tiếc nuối khi phải từ chối lịch hẹn."}],
    "nuanceNote": "BẪY ĐỀ THI N2 (Mondai 6): Luôn dùng khi từ chối lịch hẹn hoặc báo tin không thuận lợi kèm sự tiếc nuối (あいにくですが/あいにくの雨). Không dùng khi bản thân cố tình không muốn đi.",
    "exampleJp": "あいにくですが、予約はいっぱいです。", "exampleVn": "Rất tiếc, nhưng lịch hẹn đã đầy."
  }
]

# Generate part 1 with full 250 items
print("P1 base loaded.")
