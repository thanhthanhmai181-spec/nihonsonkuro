#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full JLPT N2 (2,265 items) Database Generator
Produces vocabN2Part1.ts to vocabN2Part9.ts
"""

import os
import sys
import json
import re

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data"))

# Load Sino-Vietnamese dictionary
sino_dict = {}
try:
    with open(os.path.join(DATA_DIR, "sinoVietnameseDictionary.ts"), "r", encoding="utf-8") as f:
        matches = re.findall(r'\"([^\"]+)\":\s*\"([^\"]+)\"', f.read())
        for k, v in matches:
            sino_dict[k] = v
except Exception as e:
    print(f"Warning loading Sino dictionary: {e}")

def get_han_viet(kanji_str):
    if not kanji_str:
        return "-"
    res = []
    for char in kanji_str:
        if char in sino_dict:
            res.append(sino_dict[char])
        elif '\u4e00' <= char <= '\u9fff':
            res.append("Hán")
    return " ".join(res) if res else "-"

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
    if not cat: return "Danh từ"
    if "Động từ" in cat: return "Động từ"
    if "Tính từ" in cat: return "Tính từ"
    if "Phó từ" in cat: return "Phó từ"
    if "Quán" in cat or "Cụm" in cat: return "Quán dụng ngữ"
    if "tượng" in cat.lower() or "láy" in cat.lower(): return "Từ láy/Tượng thanh"
    return "Danh từ"

def write_part_ts(part_num, items):
    out_file = os.path.join(DATA_DIR, f"vocabN2Part{part_num}.ts")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write('import { VocabN2Item } from "./vocabN2";\n\n')
        f.write(f'export const VOCAB_N2_PART_{part_num}: VocabN2Item[] = [\n')
        for it in items:
            f.write("  {\n")
            f.write(f'    id: {it["id"]},\n')
            f.write(f'    lesson: {it["lesson"]},\n')
            f.write(f'    lessonTitle: {json.dumps(it["lessonTitle"], ensure_ascii=False)},\n')
            f.write(f'    kanji: {json.dumps(it["kanji"], ensure_ascii=False)},\n')
            f.write(f'    kana: {json.dumps(it["kana"], ensure_ascii=False)},\n')
            f.write(f'    hanViet: {json.dumps(it["hanViet"], ensure_ascii=False)},\n')
            f.write(f'    meaning: {json.dumps(it["meaning"], ensure_ascii=False)},\n')
            f.write(f'    category: {json.dumps(clean_cat(it.get("category", "Danh từ")), ensure_ascii=False)},\n')
            f.write(f'    collocations: {json.dumps(it.get("collocations", []), ensure_ascii=False)},\n')
            if it.get("synonyms"):
                f.write(f'    synonyms: {json.dumps(it["synonyms"], ensure_ascii=False)},\n')
            if it.get("antonyms"):
                f.write(f'    antonyms: {json.dumps(it["antonyms"], ensure_ascii=False)},\n')
            f.write(f'    nuanceNote: {json.dumps(it.get("nuanceNote", ""), ensure_ascii=False)},\n')
            f.write(f'    exampleJp: {json.dumps(it.get("exampleJp", ""), ensure_ascii=False)},\n')
            f.write(f'    exampleVn: {json.dumps(it.get("exampleVn", ""), ensure_ascii=False)},\n')
            if it.get("usageQuestion"):
                f.write(f'    usageQuestion: {json.dumps(it["usageQuestion"], ensure_ascii=False)}\n')
            f.write("  },\n")
        f.write("];\n")
    print(f"Part {part_num} written: {len(items)} items.")

