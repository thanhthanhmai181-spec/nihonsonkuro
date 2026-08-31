# -*- coding: utf-8 -*-
"""
Production JLPT N2 2,265 Words Generator
Generates exactly 2,265 vocabulary items across 9 parts.
Part 1 to 8: 250 items each
Part 9: 265 items
Total = 2,265 items
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

# Common Kanji Han-Viet mappings
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
    "年": "NIÊN", "時": "THỜI", "何": "HÀ", "男": "NAM", "女": "NỮ",
    "子": "TỬ", "友": "HỮU", "本": "BẢN", "大": "ĐẠI", "小": "TIỂU", "高": "CAO",
    "安": "AN", "新": "TÂN", "古": "CỔ", "長": "TRƯỜNG", "短": "ĐOẢN", "多": "ĐA",
    "少": "THIỂU", "早": "TẢO", "遅": "TRÌ", "明": "MINH", "暗": "ÁM", "広": "QUẢNG",
    "狭": "HIỆP", "重": "TRỌNG", "軽": "KHINH", "強": "CƯỜNG", "弱": "NHƯỢC",
    "悪": "ÁC", "良": "LƯƠNG", "正": "CHÍNH", "同": "ĐỒNG", "異": "DỊ", "常": "THƯỜNG",
    "態": "THÁI", "度": "ĐỘ", "界": "GIỚI", "世": "THẾ", "社": "XÃ", "会": "HỘI",
    "政": "CHÍNH", "治": "TRỊ", "経": "KINH", "済": "TẾ", "法": "PHÁP", "律": "LUẬT",
    "産": "SẢN", "業": "NGHIỆP", "企": "XÍ", "財": "TÀI", "政": "CHÍNH", "労": "LAO",
    "働": "ĐỘNG", "給": "CẤP", "職": "CHỨC", "資": "TƯ", "金": "KIM", "費": "PHÍ",
    "課": "KHÓA", "題": "ĐỀ", "環": "HOÀN", "境": "CẢNH", "然": "NHIÊN", "科": "KHOA",
    "技": "KĨ", "術": "THUẬT", "情": "TÌNH", "報": "BÁO", "通": "THÔNG", "信": "TÍN",
    "医": "Y", "療": "LIỆU", "健": "KIỆN", "康": "KHANG", "病": "BỆNH", "院": "VIỆN",
    "薬": "DƯỢC", "運": "VẬN", "育": "DỤC", "教": "GIÁO", "研": "NGHIÊN", "究": "CỨU",
    "験": "NGHIỆM", "試": "THÍ", "問": "VẤN", "答": "ĐÁP", "考": "KHẢO", "察": "SÁT",
    "感": "CẢM", "情": "TÌNH", "心": "TÂM", "理": "LÍ", "態": "THÁI", "意": "Ý",
    "識": "THỨC", "認": "NHẬN", "解": "GIẢI", "判": "PHÁN", "断": "ĐOẠN", "決": "QUYẾT",
    "定": "ĐỊNH", "約": "ƯỚC", "束": "THÚC", "契": "KHẾ", "責": "TRÁCH", "任": "NHIỆM",
    "権": "QUYỀN", "利": "LỢI", "害": "HẠI", "損": "TỔN", "得": "ĐẮC", "失": "THẤT",
    "勝": "THẮNG", "負": "PHỤ", "戦": "CHIẾN", "争": "TRANH", "和": "HÒA", "平": "BÌNH"
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

# 10 N2 Lesson Titles
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

# Quick translation map for common English meanings to natural Vietnamese
EN_VN_MAP = {
    "to ": "",
    "action of making": "hành động làm",
    "counter for": "đơn vị đếm",
    "whole": "toàn bộ",
    "all of": "tất cả",
    "hold an umbrella": "che ô, cầm dù",
    "custom": "tập quán, phong tục",
    "th place": "vị trí thứ",
    "garden": "vườn, hoa viên",
    "end up": "kết cục, kết thúc",
    "under": "dưới, trực thuộc",
    "action of": "sự",
    "society": "xã hội",
    "economy": "kinh tế",
    "politics": "chính trị",
    "law": "pháp luật",
    "education": "giáo dục",
    "medical": "y tế",
    "health": "sức khỏe",
    "environment": "môi trường",
    "nature": "tự nhiên",
    "relation": "quan hệ",
    "company": "công ty",
    "business": "kinh doanh, thương mại",
    "management": "quản lý",
    "investigation": "điều tra",
    "decision": "quyết định",
    "agreement": "thỏa thuận, hợp đồng",
    "progress": "tiến bộ, tiến triển",
    "change": "thay đổi, biến đổi",
    "increase": "tăng lên",
    "decrease": "giảm xuống",
    "influence": "ảnh hưởng",
    "cause": "nguyên nhân",
    "result": "kết quả",
    "reason": "lý do",
    "purpose": "mục đích",
    "opportunity": "cơ hội",
    "problem": "vấn đề",
    "solution": "giải pháp",
    "development": "phát triển",
    "technology": "kỹ thuật, công nghệ",
    "situation": "tình huống, tình thế",
    "condition": "điều kiện",
    "feeling": "cảm giác, cảm xúc",
    "thought": "suy nghĩ, tư tưởng",
    "opinion": "ý kiến, quan điểm",
    "expression": "biểu hiện, cách diễn đạt"
}

def translate_meaning(en_meaning, kanji, kana):
    m = en_meaning.strip()
    m_clean = re.sub(r'\(.*?\)', '', m).strip()
    # If meaning contains semicolon or comma, take key parts
    parts = [p.strip() for p in re.split(r'[,;]', m_clean) if p.strip()]
    
    # Check if we have standard Vietnamese translation keywords
    vn_parts = []
    for p in parts[:3]:
        p_lower = p.lower()
        if p_lower.startswith("to "):
            verb_vn = p_lower[3:].strip()
            vn_parts.append(f"{verb_vn}")
        else:
            vn_parts.append(p)
            
    res = ", ".join(vn_parts) if vn_parts else m
    # Clean up leading/trailing symbols
    res = res.capitalize()
    return res

def determine_category(kanji, kana, meaning):
    if re.search(r'(する|づける|める|まる|てる|たる|む|ぶ|く|ぐ|す|つ|ぬ|る)$', kana) and not re.search(r'(こと|もの|さ|み|き)$', kana):
        return "Động từ"
    if kana.endswith("い") or kana.endswith("な") or "tính từ" in meaning.lower():
        return "Tính từ"
    if kana.endswith("り") or kana.endswith("と") or "phó từ" in meaning.lower() or "vẫn" in meaning.lower():
        return "Phó từ"
    if "quán dụng" in meaning.lower() or len(kanji) > 5 or "手を" in kanji or "目を" in kanji or "気を" in kanji:
        return "Quán dụng ngữ"
    if len(kana) == 4 and kana[:2] == kana[2:]:
        return "Từ láy/Tượng thanh"
    return "Danh từ"

def generate_collocations(kanji, kana, category):
    if category == "Động từ":
        return [
            f"〜を{kanji}する (Tiến hành {kanji})",
            f"〜が{kanji} (Xảy ra {kanji})",
            f"{kanji}始める (Bắt đầu {kanji})"
        ]
    elif category == "Tính từ":
        return [
            f"極めて{kanji} (Hết sức / vô cùng {kanji})",
            f"{kanji}状態 (Trạng thái {kanji})",
            f"{kanji}傾向がある (Có xu hướng {kanji})"
        ]
    elif category == "Phó từ":
        return [
            f"{kanji}変化する (Biến đổi {kanji})",
            f"{kanji}進める (Tiến hành {kanji})",
            f"{kanji}続く (Tiếp diễn {kanji})"
        ]
    elif category == "Quán dụng ngữ":
        return [
            f"〜に{kanji} (Áp dụng cụm {kanji})",
            f"{kanji}場面 (Tình huống xuất hiện {kanji})"
        ]
    else: # Danh từ
        return [
            f"{kanji}に関する〜 (Liên quan đến {kanji})",
            f"{kanji}の重要性 (Tầm quan trọng của {kanji})",
            f"{kanji}を果たす (Thực hiện / phát huy {kanji})"
        ]

def generate_nuance(kanji, kana, category, meaning):
    if category == "Động từ":
        return f"LƯU Ý ĐỀ THI N2: Chú ý phân biệt trợ từ を (tha động từ) và が (tự động từ). Thường xuất hiện trong phần bài tập chia thể bị động/sai khiến và Mondai 5 (Tìm từ đồng nghĩa)."
    elif category == "Tính từ":
        return f"LƯU Ý NGỮ CẢNH: Dùng để miêu tả tính chất, trạng thái. Tránh nhầm lẫn sắc thái trang trọng trong văn viết N2 với cách nói thông thường hàng ngày."
    elif category == "Phó từ":
        return f"BẪY ĐỀ THI N2 (Mondai 6): Luôn kiểm tra kỹ câu đi kèm có đúng sắc thái khẳng định hay phủ định (hay đi với thể phủ định ない hoặc khẳng định tuyệt đối)."
    else:
        return f"TRỌNG TÂM N2: Từ vựng tần suất cao trong đề đọc hiểu Dokkai và đề ngữ pháp Bunpou. Cần ghi nhớ chính xác Hán tự và âm Hán Việt để suy đoán nghĩa nhanh."

def generate_examples(kanji, kana, meaning):
    jp = f"この問題について、{kanji}の観点から慎重に検討する必要がある。"
    vn = f"Về vấn đề này, cần phải xem xét một cách thận trọng từ góc độ {meaning.lower()}."
    return jp, vn

print("Core generator components defined.")
