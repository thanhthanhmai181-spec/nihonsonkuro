#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full JLPT N2 2,265 Vocabulary Compiler
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

TOPICS = [
    "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ",
    "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian",
    "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao",
    "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội",
    "Chuyên đề 5: Con Người, Tính Cách & Cảm Xúc",
    "Chuyên đề 6: Tự Nhiên, Môi Trường & Kỹ Thuật",
    "Chuyên đề 7: Học Tập & Giáo Dục",
    "Chuyên đề 8: Đời Sống Sinh Hoạt & Ẩm Thực",
    "Chuyên đề 9: Chính Trị & Pháp Luật",
    "Chuyên đề 10: Công Việc & Doanh Nghiệp"
]

print("Script template ready.")
