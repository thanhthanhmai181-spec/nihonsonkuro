import re
import json

def parse_ocr_text(ocr_text):
    # Split by number headers at start of line
    # Numbers 1 to 2265
    blocks = re.split(r'\n(?=[0-9]{1,4}\n)', "\n" + ocr_text.strip())
    results = []
    
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        
        lines = [l.strip() for l in block.split("\n") if l.strip()]
        if not lines or not re.match(r'^\d+$', lines[0]):
            continue
            
        item_id = int(lines[0])
        
        # Look for category line which contains things like 'Danh từ', 'Động từ', 'Phó từ', 'Tính từ', 'Quán ngữ', 'Hậu tố', 'Tiền tố', 'Từ tượng'
        cat_idx = -1
        for i in range(1, min(len(lines), 5)):
            if any(k in lines[i] for k in ['Danh từ', 'Động từ', 'Phó từ', 'Tính từ', 'Quán ngữ', 'Hậu tố', 'Tiền tố', 'Từ tượng', '接尾辞', '接頭辞', '名詞', '副詞', '動詞', '形容詞', '慣用句', 'オノマトペ']):
                cat_idx = i
                break
                
        if cat_idx == -1:
            continue
            
        chuyen_de = " ".join(lines[1:cat_idx])
        header_line = lines[cat_idx]
        
        # Parse example (last line usually has Japanese + Vietnamese)
        last_line = lines[-1]
        example_jp = ""
        example_vn = ""
        
        # Example line often ends with vietnamese or has JP followed by Vietnamese
        # e.g. "彼は相変わらず忙しいです。 Anh ấy vẫn bận rộn như thường lệ."
        m_ex = re.search(r'([^\s\u00C0-\u1EF9]+[。！？!?])\s*(.*)', last_line)
        if m_ex:
            example_jp = m_ex.group(1).strip()
            example_vn = m_ex.group(2).strip()
        else:
            # fallback search
            tokens = last_line.split()
            if len(tokens) >= 2:
                # Find where Vietnamese characters start
                for idx_t, tok in enumerate(tokens):
                    if re.search(r'[\u00C0-\u1EF9]', tok):
                        example_jp = " ".join(tokens[:idx_t])
                        example_vn = " ".join(tokens[idx_t:])
                        break
        
        # Find collocations (lines with •)
        collocs = []
        nuance_lines = []
        syn_str = ""
        ant_str = ""
        giai_thich = ""
        
        for l in lines[cat_idx+1:-1]:
            if l.startswith("• 相") or (l.startswith("•") and not any(k in l for k in ["BẪY", "LƯU Ý", "NGỮ PHÁP", "THA ĐỘNG TỪ", "TỰ ĐỘNG TỪ", "DANH TỪ", "HẬU TỐ", "TIỀN TỐ", "QUÁN NGỮ", "TỪ TƯỢNG"])):
                collocs.append(l.lstrip("• "))
            elif any(k in l for k in ["BẪY", "LƯU Ý", "NGỮ PHÁP", "THA ĐỘNG TỪ", "TỰ ĐỘNG TỪ", "DANH TỪ SURU", "HẬU TỐ", "TIỀN TỐ", "QUÁN NGỮ"]):
                nuance_lines.append(l.lstrip("• "))
            elif l.startswith("同:") or "[Sắc thái]:" in l:
                syn_str += " " + l
            elif "一変して" in l or "/" in l or "(" in l and ")" in l and len(l) < 40 and not l.startswith("•"):
                ant_str += " " + l
            else:
                giai_thich += " " + l
                
        results.append({
            "id": item_id,
            "chuyen_de": chuyen_de,
            "header_line": header_line,
            "giai_thich": giai_thich.strip(),
            "ant_str": ant_str.strip(),
            "syn_str": syn_str.strip(),
            "collocs": collocs,
            "nuance": " ".join(nuance_lines).strip(),
            "example_jp": example_jp,
            "example_vn": example_vn
        })
        
    return results
