#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

# Comprehensive generator for all 2265 words
TOPIC_NAMES = {
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

print("Generator script template ready.")
