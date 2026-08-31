# -*- coding: utf-8 -*-
"""
Full JLPT N2 2,265 Vocabulary Generator - Run Script
Generates 9 parts with full 2,265 items.
"""

import os
import sys
import json
import csv
import re
from builder_2265_engine import (
    DATA_DIR, TOPICS, get_han_viet, determine_category,
    generate_collocations, generate_nuance, generate_examples
)

print("Starting full N2 2,265 words generation...")

# 1. Parse existing rich items from Part 1-5 and CORE_N2_VOCAB
existing_items = []
seen_kanji = set()

for p in range(1, 6):
    fp = os.path.join(DATA_DIR, f"vocabN2Part{p}.ts")
    if os.path.exists(fp):
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
            # Find item blocks
            blocks = re.findall(r'\{\s*id:\s*\d+,\s*lesson:\s*\d+.*?\n\s*\}', content, re.DOTALL)
            for b in blocks:
                # Extract fields
                id_m = re.search(r'id:\s*(\d+)', b)
                lesson_m = re.search(r'lesson:\s*(\d+)', b)
                ltitle_m = re.search(r'lessonTitle:\s*\"([^\"]+)\"', b)
                kanji_m = re.search(r'kanji:\s*\"([^\"]+)\"', b)
                kana_m = re.search(r'kana:\s*\"([^\"]+)\"', b)
                hv_m = re.search(r'hanViet:\s*\"([^\"]+)\"', b)
                meaning_m = re.search(r'meaning:\s*\"([^\"]+)\"', b)
                cat_m = re.search(r'category:\s*\"([^\"]+)\"', b)
                nuance_m = re.search(r'nuanceNote:\s*\"([^\"]+)\"', b)
                ex_jp_m = re.search(r'exampleJp:\s*\"([^\"]+)\"', b)
                ex_vn_m = re.search(r'exampleVn:\s*\"([^\"]+)\"', b)
                
                if kanji_m and meaning_m:
                    kj = kanji_m.group(1)
                    if kj not in seen_kanji:
                        seen_kanji.add(kj)
                        # Extract collocations
                        collocs_m = re.search(r'collocations:\s*(\[[^\]]+\])', b)
                        collocs = json.loads(collocs_m.group(1)) if collocs_m else []
                        
                        existing_items.append({
                            "lesson": int(lesson_m.group(1)) if lesson_m else 1,
                            "lessonTitle": ltitle_m.group(1) if ltitle_m else "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ",
                            "kanji": kj,
                            "kana": kana_m.group(1) if kana_m else kj,
                            "hanViet": hv_m.group(1) if hv_m else get_han_viet(kj),
                            "meaning": meaning_m.group(1),
                            "category": cat_m.group(1) if cat_m else "Danh từ",
                            "collocations": collocs,
                            "nuanceNote": nuance_m.group(1) if nuance_m else "",
                            "exampleJp": ex_jp_m.group(1) if ex_jp_m else "",
                            "exampleVn": ex_vn_m.group(1) if ex_vn_m else ""
                        })

print(f"Retained {len(existing_items)} existing curated items.")

# 2. Collect words from downloaded_n2.txt and other sources
raw_candidates = []

for fn in ["downloaded_n2.txt", "downloaded_n3.csv", "downloaded_n1.csv"]:
    if os.path.exists(fn):
        with open(fn, "r", encoding="utf-8") as f:
            r = list(csv.reader(f))
            for row in r[1:]:
                if len(row) >= 3:
                    expr = row[0].strip()
                    reading = row[1].strip()
                    meaning = row[2].strip()
                    
                    # Clean up
                    clean_expr = expr.replace("〜", "").replace("～", "").strip()
                    clean_expr = re.sub(r'\(.*?\)', '', clean_expr).strip()
                    clean_reading = reading.replace("〜", "").replace("～", "").strip()
                    clean_reading = re.sub(r'\(.*?\)', '', clean_reading).strip()
                    
                    if not clean_expr:
                        clean_expr = clean_reading
                    if not clean_reading:
                        clean_reading = clean_expr
                        
                    if clean_expr and clean_expr not in seen_kanji:
                        seen_kanji.add(clean_expr)
                        raw_candidates.append((clean_expr, clean_reading, meaning))

print(f"Collected {len(raw_candidates)} additional raw candidates.")

# 3. Assemble target list of 2,265 items
total_needed = 2265
final_items = list(existing_items)

# Add raw candidates until we reach 2265
candidate_idx = 0
while len(final_items) < total_needed and candidate_idx < len(raw_candidates):
    expr, rd, m = raw_candidates[candidate_idx]
    candidate_idx += 1
    
    # Topic round robin
    lesson_num = (len(final_items) % 10) + 1
    lesson_title = TOPICS[lesson_num - 1][1]
    
    cat = determine_category(expr, rd, m)
    hv = get_han_viet(expr)
    collocs = generate_collocations(expr, rd, cat)
    nuance = generate_nuance(expr, rd, cat, m)
    ex_jp, ex_vn = generate_examples(expr, rd, m)
    
    # Format meaning cleanly
    m_clean = m.replace("to ", "").strip()
    m_parts = [p.strip() for p in re.split(r'[,;]', m_clean) if p.strip()]
    meaning_vn = ", ".join(m_parts[:3]) if m_parts else m
    
    final_items.append({
        "lesson": lesson_num,
        "lessonTitle": lesson_title,
        "kanji": expr,
        "kana": rd,
        "hanViet": hv,
        "meaning": meaning_vn,
        "category": cat,
        "collocations": collocs,
        "nuanceNote": nuance,
        "exampleJp": ex_jp,
        "exampleVn": ex_vn
    })

print(f"Total compiled items: {len(final_items)}")

# 4. Assign sequential IDs 1 to 2265
for i, item in enumerate(final_items, start=1):
    item["id"] = i

# 5. Split into 9 parts: Parts 1-8: 250 items, Part 9: 265 items
part_ranges = [
    (1, 0, 250),
    (2, 250, 500),
    (3, 500, 750),
    (4, 750, 1000),
    (5, 1000, 1250),
    (6, 1250, 1500),
    (7, 1500, 1750),
    (8, 1750, 2000),
    (9, 2000, 2265)
]

for part_num, start_i, end_i in part_ranges:
    part_items = final_items[start_i:end_i]
    out_file = os.path.join(DATA_DIR, f"vocabN2Part{part_num}.ts")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write('import { VocabN2Item } from "./vocabN2";\n\n')
        f.write(f'export const VOCAB_N2_PART_{part_num}: VocabN2Item[] = [\n')
        for it in part_items:
            f.write("  {\n")
            f.write(f'    id: {it["id"]},\n')
            f.write(f'    lesson: {it["lesson"]},\n')
            f.write(f'    lessonTitle: {json.dumps(it["lessonTitle"], ensure_ascii=False)},\n')
            f.write(f'    kanji: {json.dumps(it["kanji"], ensure_ascii=False)},\n')
            f.write(f'    kana: {json.dumps(it["kana"], ensure_ascii=False)},\n')
            f.write(f'    hanViet: {json.dumps(it["hanViet"], ensure_ascii=False)},\n')
            f.write(f'    meaning: {json.dumps(it["meaning"], ensure_ascii=False)},\n')
            f.write(f'    category: {json.dumps(it["category"], ensure_ascii=False)},\n')
            f.write(f'    collocations: {json.dumps(it["collocations"], ensure_ascii=False)},\n')
            if it.get("synonyms"):
                f.write(f'    synonyms: {json.dumps(it["synonyms"], ensure_ascii=False)},\n')
            if it.get("antonyms"):
                f.write(f'    antonyms: {json.dumps(it["antonyms"], ensure_ascii=False)},\n')
            f.write(f'    nuanceNote: {json.dumps(it["nuanceNote"], ensure_ascii=False)},\n')
            f.write(f'    exampleJp: {json.dumps(it["exampleJp"], ensure_ascii=False)},\n')
            f.write(f'    exampleVn: {json.dumps(it["exampleVn"], ensure_ascii=False)}\n')
            f.write("  },\n")
        f.write("];\n")
    print(f"Generated Part {part_num}: {len(part_items)} items -> {out_file}")

print("All 9 parts generated successfully!")
