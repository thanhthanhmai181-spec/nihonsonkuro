#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

from build_full_2265 import TOPICS, export_part

def main():
    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/data"))
    
    # We load raw items from data_p1_p6 and generate Parts 1, 2, 3
    # Part 1: IDs 1 to 250
    # Part 2: IDs 251 to 500
    # Part 3: IDs 501 to 750
    print("Generating Parts 1, 2, 3...")
    
if __name__ == "__main__":
    main()
