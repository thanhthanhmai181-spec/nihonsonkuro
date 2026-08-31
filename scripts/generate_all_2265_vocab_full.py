# -*- coding: utf-8 -*-
"""
Full JLPT N2 2,265 Vocabulary Generator
Builds 9 parts (250 * 8 + 265 = 2265 items) with high quality.
"""

import os
import sys
import json
import csv
import re

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data"))

# 1. Load Sino-Vietnamese dictionary
sino_dict = {}
try:
    with open(os.path.join(DATA_DIR, "sinoVietnameseDictionary.ts"), "r", encoding="utf-8") as f:
        matches = re.findall(r'\"([^\"]+)\":\s*\"([^\"]+)\"', f.read())
        for k, v in matches:
            sino_dict[k] = v
except Exception as e:
    print("Warning loading sino dict:", e)

# Common additional Sino-Vietnamese kanji
EXTRA_SINO = {
    "相": "TƯƠNG", "変": "BIẾN", "次": "THỨ", "手": "THỦ", "合": "HỢP", "間": "GIAN",
    "向": "HƯỚNG", "気": "KHÍ", "持": "TRÌ", "立": "LẬP", "出": "XUẤT", "入": "NHẬP",
    "取": "THỦ", "引": "DẪN", "込": "NHẬP", "切": "THIẾT", "返": "PHẢN", "直": "TRỰC",
    "通": "THÔNG", "過": "QUÁ", "違": "VI", "見": "KIẾN", "聞": "VĂN", "言": "NGÔN",
    "話": "THOẠI", "思": "TƯ", "考": "KHẢO", "知": "TRI", "分": "PHÂN", "行": "HÀNH",
    "来": "LAI", "帰": "QUY", "生": "SINH", "死": "TỬ", "食": "THỰC", "飲": "ẨM",
    "買": "MÃI", "売": "MẠI", "使": "SỬ", "作": "TÁC", "読": "ĐỘC", "書": "THƯ",
    "道": "ĐẠO", "車": "XA", "電": "ĐIỆN", "話": "THOẠI", "校": "HIỆU", "学": "HỌC",
    "先": "TIÊN", "後": "HẬU", "前": "TIỀN", "今": "KIM", "日": "NHẬT", "月": "NGUYỆT",
    "年": "NIÊN", "時": "THỜI", "分": "PHÂN", "何": "HÀ", "男": "NAM", "女": "NỮ",
    "子": "TỬ", "友": "HỮU", "本": "BẢN", "大": "ĐẠI", "小": "TIỂU", "高": "CAO",
    "安": "AN", "新": "TÂN", "古": "CỔ", "長": "TRƯỜNG", "短": "ĐOẢN", "多": "ĐA",
    "少": "THIỂU", "早": "TẢO", "遅": "TRÌ", "明": "MINH", "暗": "ÁM", "広": "QUẢNG",
    "狭": "HIỆP", "重": "TRỌNG", "軽": "KHINH", "強": "CƯỜNG", "弱": "NHƯỢC",
    "悪": "ÁC", "良": "LƯƠNG", "正": "CHÍNH", "変": "BIẾN", "同": "ĐỒNG", "異": "DỊ"
}
sino_dict.update(EXTRA_SINO)

def get_han_viet(kanji_str):
    if not kanji_str or kanji_str == "-":
        return "-"
    res = []
    for char in kanji_str:
        if char in sino_dict:
            res.append(sino_dict[char].upper())
        elif '\u4e00' <= char <= '\u9fff':
            res.append("")
    return " ".join([r for r in res if r]) if any(res) else "-"

# 2. Topic definitions
TOPICS = [
    (1, "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ"),
    (2, "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian"),
    (3, "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao"),
    (4, "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội"),
    (5, "Chuyên đề 5: Con Người, Tính Cách & Cảm Xúc"),
    (6, "Chuyên đề 6: Tự Nhiên, Môi Trường & Kỹ Thuật"),
    (7, "Chuyên đề 7: Học Tập & Giáo Dục"),
    (8, "Chuyên đề 8: Đời Sống Sinh Hoạt & Ẩm Thực"),
    (9, "Chuyên đề 9: Chính Trị & Pháp Luật"),
    (10, "Chuyên đề 10: Công Việc & Doanh Nghiệp")
]

# Clean category
def get_category(kanji, kana, meaning):
    if re.search(r'(する|づける|める|まる|てる|たる|む|ぶ|く|ぐ|す|つ|ぬ|る)$', kana) and not re.search(r'(こと|もの|さ|み)$', kana):
        if "to " in meaning.lower() or "động từ" in meaning.lower():
            return "Động từ"
    if kana.endswith("い") or kana.endswith("な") or "tính từ" in meaning.lower() or "adj" in meaning.lower():
        return "Tính từ"
    if kana.endswith("り") or kana.endswith("と") or "phó từ" in meaning.lower() or "adv" in meaning.lower():
        return "Phó từ"
    if "quán dụng" in meaning.lower() or len(kanji) > 5 or "手を" in kanji or "目を" in kanji or "足を" in kanji or "気を" in kanji:
        return "Quán dụng ngữ"
    if len(kana) == 4 and kana[:2] == kana[2:]:
        return "Từ láy/Tượng thanh"
    return "Danh từ"

# 3. Read existing items from existing files
existing_items = {}
for p in range(1, 6):
    fp = os.path.join(DATA_DIR, f"vocabN2Part{p}.ts")
    if os.path.exists(fp):
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
            # Extract JSON-like items
            items_blocks = re.findall(r'\{\s*id:\s*(\d+),.*?\n\s*\}', content, re.DOTALL)
            # Or parse systematically
            for block in content.split("{\n"):
                if "kanji:" in block and "meaning:" in block:
                    k_match = re.search(r'kanji:\s*\"([^\"]+)\"', block)
                    m_match = re.search(r'meaning:\s*\"([^\"]+)\"', block)
                    kana_match = re.search(r'kana:\s*\"([^\"]+)\"', block)
                    if k_match and m_match:
                        k = k_match.group(1)
                        if k not in existing_items:
                            existing_items[k] = block

print(f"Loaded {len(existing_items)} existing rich items from Part 1-5.")
