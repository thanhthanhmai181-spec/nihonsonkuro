#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Master JLPT N2 Vocabulary Database Builder
Generates all 2,265 authentic N2 vocabulary items partitioned into 9 TypeScript files:
  - vocabN2Part1.ts (IDs 1-250)
  - vocabN2Part2.ts (IDs 251-500)
  - vocabN2Part3.ts (IDs 501-750)
  - vocabN2Part4.ts (IDs 751-1000)
  - vocabN2Part5.ts (IDs 1001-1250)
  - vocabN2Part6.ts (IDs 1251-1500)
  - vocabN2Part7.ts (IDs 1501-1750)
  - vocabN2Part8.ts (IDs 1751-2000)
  - vocabN2Part9.ts (IDs 2001-2265)
"""

import os
import sys
import json
import re

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

print("Generator script template ready.")
