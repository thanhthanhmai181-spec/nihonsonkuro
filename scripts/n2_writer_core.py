import os
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
    pass

def get_han_viet(kanji_str, fallback="-"):
    if not kanji_str or kanji_str == "-":
        return fallback
    res = []
    for char in kanji_str:
        if char in sino_dict:
            res.append(sino_dict[char])
        elif '\u4e00' <= char <= '\u9fff':
            res.append("")
    return " ".join([r for r in res if r]) if any(res) else fallback

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
            f.write(f'    category: {json.dumps(it.get("category", "Danh từ"), ensure_ascii=False)},\n')
            f.write(f'    collocations: {json.dumps(it.get("collocations", []), ensure_ascii=False)},\n')
            if it.get("synonyms"):
                f.write(f'    synonyms: {json.dumps(it["synonyms"], ensure_ascii=False)},\n')
            if it.get("antonyms"):
                f.write(f'    antonyms: {json.dumps(it["antonyms"], ensure_ascii=False)},\n')
            f.write(f'    nuanceNote: {json.dumps(it.get("nuanceNote", ""), ensure_ascii=False)},\n')
            f.write(f'    exampleJp: {json.dumps(it.get("exampleJp", ""), ensure_ascii=False)},\n')
            f.write(f'    exampleVn: {json.dumps(it.get("exampleVn", ""), ensure_ascii=False)}\n')
            f.write("  },\n")
        f.write("];\n")
    print(f"Generated Part {part_num} with {len(items)} items -> {out_file}")
