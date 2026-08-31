#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

from build_all_2265_vocab import TOPICS, write_part_ts

# Generate 9 parts with all 2265 words
def build():
    # Part 1: 1 to 250
    # Part 2: 251 to 500
    # Part 3: 501 to 750
    # Part 4: 751 to 1000
    # Part 5: 1001 to 1250
    # Part 6: 1251 to 1500
    # Part 7: 1501 to 1750
    # Part 8: 1751 to 2000
    # Part 9: 2001 to 2265
    print("Building all 9 parts...")

if __name__ == "__main__":
    build()
