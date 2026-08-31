#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

from build_all_n2_2265 import TOPICS, clean_cat, write_part_file

def convert_tuple_to_item(t):
    # Tuple format: (id, lesson_id, cat, kanji, kana, han_viet, meaning, coll1, coll2, nuance, ex_jp, ex_vn, *opt)
    item_id = t[0]
    lesson_id = t[1]
    cat = t[2]
    kanji = t[3]
    kana = t[4]
    han_viet = t[5]
    meaning = t[6]
    colls = [t[7], t[8]] if len(t) > 8 and t[8] else [t[7]]
    nuance = t[9] if len(t) > 9 else f"Cách dùng của {kanji} trong kỳ thi JLPT N2."
    ex_jp = t[10] if len(t) > 10 else f"{kanji}の例文です。"
    ex_vn = t[11] if len(t) > 11 else f"Ví dụ của {kanji}."
    
    lesson_title = TOPICS.get(lesson_id, f"Chuyên đề {lesson_id}")
    
    res = {
        "id": item_id,
        "lesson": lesson_id,
        "lessonTitle": lesson_title,
        "kanji": kanji,
        "kana": kana,
        "hanViet": han_viet,
        "meaning": meaning,
        "category": clean_cat(cat),
        "collocations": colls,
        "nuanceNote": nuance,
        "exampleJp": ex_jp,
        "exampleVn": ex_vn
    }
    
    # Optional synonyms / antonyms / question if provided
    if len(t) > 12 and t[12]:
        res["synonyms"] = t[12]
    if len(t) > 13 and t[13]:
        res["antonyms"] = t[13]
    if len(t) > 14 and t[14]:
        res["usageQuestion"] = t[14]
        
    return res

def process_and_write(part_num, tuple_list):
    items = [convert_tuple_to_item(t) for t in tuple_list]
    write_part_file(part_num, items)

if __name__ == "__main__":
    print("Converter helper ready.")
