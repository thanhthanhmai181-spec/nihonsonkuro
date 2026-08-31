#!/usr/bin/env python3
import json
import sys
import os

from batch_generator import write_ts_part, TOPIC_MAP

# Load batch generator and generate Part 1 (1-250), Part 2 (251-500), Part 3 (501-750)
def generate():
    from data_p1_to_p4 import get_page_1_to_4
    
    # We will produce all 750 items for parts 1, 2, 3
    # Let's create an organized database generator for parts 1, 2, 3
    print("Building Parts 1 to 3...")

if __name__ == "__main__":
    generate()
