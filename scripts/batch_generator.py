import json
import os

TOPIC_MAP = {
    1: "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ",
    2: "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian",
    3: "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao",
    4: "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội",
    5: "Chuyên đề 5: Con Người, Tính Cách & Cảm Xúc",
    6: "Chuyên đề 6: Tự Nhiên, Môi Trường & Kỹ Thuật",
    7: "Chuyên đề 7: Học Tập & Giáo Dục",
    8: "Chuyên đề 8: Đời Sống Sinh Hoạt & Ẩm Thực",
    9: "Chuyên đề 9: Chính Trị & Pháp Luật",
    10: "Chuyên đề 10: Công Việc & Doanh Nghiệp"
}

CATEGORY_MAP = {
    "Danh từ": "Danh từ",
    "Động từ": "Động từ",
    "Động từ nhóm 1": "Động từ",
    "Động từ nhóm 2": "Động từ",
    "Động từ nhóm 3": "Động từ",
    "Động từ ghép": "Động từ",
    "Tính từ": "Tính từ",
    "Tính từ đuôi い": "Tính từ",
    "Tính từ đuôi な": "Tính từ",
    "Phó từ": "Phó từ",
    "Quán dụng ngữ": "Quán dụng ngữ",
    "Quán ngữ": "Quán dụng ngữ",
    "Cụm từ": "Quán dụng ngữ",
    "Hậu tố": "Danh từ",
    "Tiền tố": "Danh từ",
    "Từ tượng thanh": "Từ láy/Tượng thanh",
    "Từ tượng hình": "Từ láy/Tượng thanh"
}

def clean_category(cat_str):
    if not cat_str:
        return "Danh từ"
    for k, v in CATEGORY_MAP.items():
        if k in cat_str:
            return v
    return "Danh từ"

def write_ts_part(part_num, items, filename):
    with open(filename, "w", encoding="utf-8") as f:
        f.write('import { VocabN2Item } from "./vocabN2";\n\n')
        f.write(f'export const VOCAB_N2_PART_{part_num}: VocabN2Item[] = [\n')
        for i, item in enumerate(items):
            item_id = item.get("id", i + 1)
            lesson = item.get("lesson", 1)
            lesson_title = item.get("lessonTitle", TOPIC_MAP.get(lesson, f"Chuyên đề {lesson}"))
            kanji = item.get("kanji", "")
            kana = item.get("kana", "")
            han_viet = item.get("hanViet", "")
            meaning = item.get("meaning", "")
            category = clean_category(item.get("category", "Danh từ"))
            collocations = item.get("collocations", [])
            synonyms = item.get("synonyms", [])
            antonyms = item.get("antonyms", [])
            nuance_note = item.get("nuanceNote", "")
            example_jp = item.get("exampleJp", "")
            example_vn = item.get("exampleVn", "")
            usage_q = item.get("usageQuestion", None)

            f.write("  {\n")
            f.write(f'    id: {item_id},\n')
            f.write(f'    lesson: {lesson},\n')
            f.write(f'    lessonTitle: {json.dumps(lesson_title, ensure_ascii=False)},\n')
            f.write(f'    kanji: {json.dumps(kanji, ensure_ascii=False)},\n')
            f.write(f'    kana: {json.dumps(kana, ensure_ascii=False)},\n')
            f.write(f'    hanViet: {json.dumps(han_viet, ensure_ascii=False)},\n')
            f.write(f'    meaning: {json.dumps(meaning, ensure_ascii=False)},\n')
            f.write(f'    category: {json.dumps(category, ensure_ascii=False)},\n')
            f.write(f'    collocations: {json.dumps(collocations, ensure_ascii=False)},\n')
            
            if synonyms:
                f.write(f'    synonyms: {json.dumps(synonyms, ensure_ascii=False)},\n')
            if antonyms:
                f.write(f'    antonyms: {json.dumps(antonyms, ensure_ascii=False)},\n')
            
            f.write(f'    nuanceNote: {json.dumps(nuance_note, ensure_ascii=False)},\n')
            f.write(f'    exampleJp: {json.dumps(example_jp, ensure_ascii=False)},\n')
            f.write(f'    exampleVn: {json.dumps(example_vn, ensure_ascii=False)},\n')
            
            if usage_q:
                f.write(f'    usageQuestion: {json.dumps(usage_q, ensure_ascii=False)}\n')
            
            f.write("  },\n")
        f.write("];\n")
    print(f"Written Part {part_num} with {len(items)} items to {filename}")

if __name__ == "__main__":
    print("Batch generator loaded successfully.")
