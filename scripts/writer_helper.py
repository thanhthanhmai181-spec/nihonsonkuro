#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full JLPT N2 Database Generator - 2,265 Authentic Vocabulary Items
"""
import os
import sys
import json

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data"))

TOPICS = {
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

def clean_cat(cat):
    if not cat:
        return "Danh từ"
    if "Động từ" in cat:
        return "Động từ"
    if "Tính từ" in cat:
        return "Tính từ"
    if "Phó từ" in cat:
        return "Phó từ"
    if "Quán" in cat or "Cụm" in cat:
        return "Quán dụng ngữ"
    if "tượng" in cat.lower() or "láy" in cat.lower():
        return "Từ láy/Tượng thanh"
    return "Danh từ"

def write_part(part_num, items):
    out_path = os.path.join(DATA_DIR, f"vocabN2Part{part_num}.ts")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write('import { VocabN2Item } from "./vocabN2";\n\n')
        f.write(f'export const VOCAB_N2_PART_{part_num}: VocabN2Item[] = [\n')
        for item in items:
            f.write("  {\n")
            f.write(f'    id: {item["id"]},\n')
            f.write(f'    lesson: {item["lesson"]},\n')
            f.write(f'    lessonTitle: {json.dumps(item["lessonTitle"], ensure_ascii=False)},\n')
            f.write(f'    kanji: {json.dumps(item["kanji"], ensure_ascii=False)},\n')
            f.write(f'    kana: {json.dumps(item["kana"], ensure_ascii=False)},\n')
            f.write(f'    hanViet: {json.dumps(item["hanViet"], ensure_ascii=False)},\n')
            f.write(f'    meaning: {json.dumps(item["meaning"], ensure_ascii=False)},\n')
            f.write(f'    category: {json.dumps(clean_cat(item.get("category", "Danh từ")), ensure_ascii=False)},\n')
            f.write(f'    collocations: {json.dumps(item["collocations"], ensure_ascii=False)},\n')
            if item.get("synonyms"):
                f.write(f'    synonyms: {json.dumps(item["synonyms"], ensure_ascii=False)},\n')
            if item.get("antonyms"):
                f.write(f'    antonyms: {json.dumps(item["antonyms"], ensure_ascii=False)},\n')
            f.write(f'    nuanceNote: {json.dumps(item["nuanceNote"], ensure_ascii=False)},\n')
            f.write(f'    exampleJp: {json.dumps(item["exampleJp"], ensure_ascii=False)},\n')
            f.write(f'    exampleVn: {json.dumps(item["exampleVn"], ensure_ascii=False)},\n')
            if item.get("usageQuestion"):
                f.write(f'    usageQuestion: {json.dumps(item["usageQuestion"], ensure_ascii=False)}\n')
            f.write("  },\n")
        f.write("];\n")
    print(f"Successfully wrote {len(items)} items to Part {part_num} -> {out_path}")

print("Writer helper ready.")
