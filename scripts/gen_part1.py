import json

# Generator for Part 1 (1 - 275)
items = []

def add(id, topic, word_type, kana, kanji, han_viet, meaning, usage, ant, syn_nuance, coll, traps, ex_jp, ex_vn):
    items.append({
        "id": id,
        "topic": topic,
        "word_type": word_type,
        "kana": kana,
        "kanji": kanji,
        "han_viet": han_viet,
        "meaning": meaning,
        "usage": usage,
        "ant": ant,
        "syn_nuance": syn_nuance,
        "coll": coll,
        "traps": traps,
        "ex_jp": ex_jp,
        "ex_vn": ex_vn
    })

print("Writing gen_part1...")
