import json
import re

TOPIC_MAP = {
    "Hành động, Trạng thái & Mức độ": (1, "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ"),
    "Giao thông, Du lịch & Không gian": (2, "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian"),
    "Y tế, Sức khỏe & Thể thao": (3, "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao"),
    "Kinh tế, Tài chính & Xã hội": (4, "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội"),
    "Con người, Tính cách & Cảm xúc": (5, "Chuyên đề 5: Con Người, Tính Cách & Cảm Xúc"),
    "Tự nhiên, Môi trường & Khoa học kỹ thuật": (6, "Chuyên đề 6: Tự Nhiên, Môi Trường & Khoa Học Kỹ Thuật"),
    "Học tập & Giáo dục": (7, "Chuyên đề 7: Học Tập & Giáo Dục"),
    "Đời sống sinh hoạt & Ẩm thực": (8, "Chuyên đề 8: Đời Sống Sinh Hoạt & Ẩm Thực"),
    "Chính trị & Pháp luật": (9, "Chuyên đề 9: Chính Trị & Pháp Luật"),
    "Công việc & Doanh nghiệp": (10, "Chuyên đề 10: Công Việc & Doanh Nghiệp")
}

def map_category(raw_type):
    if not raw_type: return "Danh từ"
    if "Phó từ" in raw_type: return "Phó từ"
    if "Tính từ" in raw_type: return "Tính từ"
    if "Động từ" in raw_type: return "Động từ"
    if "Quán ngữ" in raw_type or "quán dụng" in raw_type.lower(): return "Quán dụng ngữ"
    if "tượng thanh" in raw_type.lower() or "tượng hình" in raw_type.lower() or "オノマトペ" in raw_type: return "Từ láy/Tượng thanh"
    return "Danh từ"

def parse_collocations(coll_str):
    if not coll_str: return []
    lines = [l.strip() for l in coll_str.split('\n') if l.strip()]
    res = []
    for l in lines:
        l = re.sub(r'^[•\-\*]\s*', '', l)
        if l and not l.startswith("LƯU Ý") and not l.startswith("BẪY") and not l.startswith("NGỮ PHÁP"):
            res.append(l)
    return res

def parse_synonyms(syn_str):
    if not syn_str: return []
    syns = []
    # Match patterns like 同: ... or [Sắc thái]: ...
    m = re.search(r'同:\s*([^\[\n]+)', syn_str)
    if m:
        words = m.group(1).split(',')
        for w in words:
            w = w.strip()
            if w:
                # e.g. 依然として (Ỷ nhiên)
                m_word = re.match(r'([^\(]+)(?:\((.+)\))?', w)
                if m_word:
                    syns.append({
                        "word": m_word.group(1).strip(),
                        "reading": "",
                        "note": m_word.group(2).strip() if m_word.group(2) else "Từ đồng nghĩa"
                    })
    return syns

def parse_antonyms(ant_str):
    if not ant_str: return []
    ants = []
    parts = ant_str.split('/')
    for p in parts:
        p = p.strip()
        m = re.match(r'([^\(]+)(?:\((.+)\))?', p)
        if m:
            w = m.group(1).strip()
            if w and w != "-":
                ants.append({
                    "word": w,
                    "reading": "",
                    "meaning": m.group(2).strip() if m.group(2) else ""
                })
    return ants

def create_item(id_num, topic, word_type, kana, kanji, han_viet, meaning, coll_list, syn_list, ant_list, nuance, ex_jp, ex_vn):
    topic_clean = topic.replace('\n', ' ').strip()
    les_num, les_title = TOPIC_MAP.get(topic_clean, (1, f"Chuyên đề: {topic_clean}"))
    
    item = {
        "id": id_num,
        "lesson": les_num,
        "lessonTitle": les_title,
        "kanji": kanji if kanji and kanji != "-" else kana,
        "kana": kana,
        "hanViet": han_viet if han_viet and han_viet != "-" else "",
        "meaning": meaning,
        "category": map_category(word_type),
        "collocations": coll_list if coll_list else [f"{kanji or kana} ({meaning})"],
        "synonyms": syn_list if syn_list else undefined,
        "antonyms": ant_list if ant_list else undefined,
        "nuanceNote": nuance if nuance else f"Cách dùng và bẫy JLPT N2 cho từ {kanji or kana}.",
        "exampleJp": ex_jp if ex_jp else f"{kanji or kana}を使います。",
        "exampleVn": ex_vn if ex_vn else meaning
    }
    return item

print("make_n2_1 helper ready")
