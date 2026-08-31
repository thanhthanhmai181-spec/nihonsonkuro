import os
import json
import re

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data"))

# Topic mapping
TOPIC_TO_LESSON = {
    "Hành động, Trạng thái & Mức độ": (1, "Hành Động, Trạng Thái & Mức Độ"),
    "Giao thông, Du lịch & Không gian": (2, "Giao Thông, Du Lịch & Không Gian"),
    "Y tế, Sức khỏe & Thể thao": (3, "Y Tế, Sức Khỏe & Thể Thao"),
    "Kinh tế, Tài chính & Xã hội": (4, "Kinh Tế, Tài Chính & Xã Hội"),
    "Con người, Tính cách & Cảm xúc": (5, "Con Người, Tính Cách & Cảm Xúc"),
    "Tự nhiên, Môi trường & Khoa học kỹ thuật": (6, "Tự Nhiên, Môi Trường & Khoa Học"),
    "Học tập & Giáo dục": (7, "Học Tập & Giáo Dục"),
    "Đời sống sinh hoạt & Ẩm thực": (8, "Đời Sống Sinh Hoạt & Ẩm Thực"),
    "Chính trị & Pháp luật": (9, "Chính Trị & Pháp Luật"),
    "Công việc & Doanh nghiệp": (10, "Công Việc & Doanh Nghiệp")
}

def clean_category(loai_tu):
    if not loai_tu:
        return "Danh từ"
    if "Động từ" in loai_tu:
        return "Động từ"
    if "Tính từ" in loai_tu:
        return "Tính từ"
    if "Phó từ" in loai_tu:
        return "Phó từ"
    if "Quán" in loai_tu or "Cụm" in loai_tu:
        return "Quán dụng ngữ"
    if "tượng" in loai_tu.lower() or "láy" in loai_tu.lower() or "オノマトペ" in loai_tu:
        return "Từ láy/Tượng thanh"
    return "Danh từ"

def parse_record(record):
    # record: dict with raw fields
    topic_str = record.get("chuyen_de", "").strip()
    lesson_id, lesson_title = TOPIC_TO_LESSON.get(topic_str, (1, "Từ vựng N2"))
    
    cat = clean_category(record.get("loai_tu", ""))
    
    collocs = []
    raw_colloc = record.get("cum_tu_n2", "") or record.get("collocations", "")
    if raw_colloc:
        lines = [c.strip("• \t\r\n-") for c in raw_colloc.split("\n") if c.strip()]
        for l in lines:
            if l and not l.startswith("LƯU Ý") and not l.startswith("BẪY"):
                collocs.append(l)
    
    synonyms = []
    raw_syn = record.get("dong_nghia", "")
    if raw_syn:
        m = re.findall(r'同:\s*([^\n\r]+)', raw_syn)
        note_m = re.findall(r'\[Sắc thái\]:\s*([^\n\r]+)', raw_syn)
        note_str = note_m[0].strip() if note_m else ""
        if m:
            words = [w.strip() for w in m[0].split(",") if w.strip()]
            for w in words:
                synonyms.append({"word": w, "reading": "", "note": note_str})

    antonyms = []
    raw_ant = record.get("trai_nghia", "")
    if raw_ant and raw_ant != "-":
        ants = [a.strip() for a in re.split(r'[/,]', raw_ant) if a.strip()]
        for a in ants:
            antonyms.append({"word": a, "reading": "", "meaning": ""})
            
    nuance = record.get("luu_y_bay", "") or record.get("giai_thich", "") or ""
    
    return {
        "id": int(record["id"]),
        "lesson": lesson_id,
        "lessonTitle": lesson_title,
        "kanji": record.get("kanji", "") or record.get("kana", ""),
        "kana": record.get("kana", ""),
        "hanViet": record.get("han_viet", "-"),
        "meaning": record.get("nghia", ""),
        "category": cat,
        "collocations": collocs,
        "synonyms": synonyms if synonyms else None,
        "antonyms": antonyms if antonyms else None,
        "nuanceNote": nuance,
        "exampleJp": record.get("vi_du_jp", ""),
        "exampleVn": record.get("vi_du_vn", "")
    }

def format_ts_item(item):
    return json.dumps(item, ensure_ascii=False, indent=2)

def write_part_file(part_num, items):
    out_path = os.path.join(DATA_DIR, f"vocabN2Part{part_num}.ts")
    ts_code = 'import { VocabN2Item } from "./vocabN2";\n\n'
    ts_code += f'export const VOCAB_N2_PART_{part_num}: VocabN2Item[] = [\n'
    
    formatted_items = []
    for item in items:
        # Build clean TS object
        lines = []
        lines.append("  {")
        lines.append(f"    id: {item['id']},")
        lines.append(f"    lesson: {item['lesson']},")
        lines.append(f"    lessonTitle: {json.dumps(item['lessonTitle'], ensure_ascii=False)},")
        lines.append(f"    kanji: {json.dumps(item['kanji'], ensure_ascii=False)},")
        lines.append(f"    kana: {json.dumps(item['kana'], ensure_ascii=False)},")
        lines.append(f"    hanViet: {json.dumps(item['hanViet'], ensure_ascii=False)},")
        lines.append(f"    meaning: {json.dumps(item['meaning'], ensure_ascii=False)},")
        lines.append(f"    category: {json.dumps(item['category'], ensure_ascii=False)},")
        lines.append(f"    collocations: {json.dumps(item['collocations'], ensure_ascii=False)},")
        if item.get('synonyms'):
            lines.append(f"    synonyms: {json.dumps(item['synonyms'], ensure_ascii=False, indent=6)[6:]},")
        if item.get('antonyms'):
            lines.append(f"    antonyms: {json.dumps(item['antonyms'], ensure_ascii=False, indent=6)[6:]},")
        lines.append(f"    nuanceNote: {json.dumps(item['nuanceNote'], ensure_ascii=False)},")
        lines.append(f"    exampleJp: {json.dumps(item['exampleJp'], ensure_ascii=False)},")
        lines.append(f"    exampleVn: {json.dumps(item['exampleVn'], ensure_ascii=False)}")
        lines.append("  }")
        formatted_items.append("\n".join(lines))
        
    ts_code += ",\n".join(formatted_items)
    ts_code += "\n];\n"
    
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"Written {len(items)} items to vocabN2Part{part_num}.ts")
