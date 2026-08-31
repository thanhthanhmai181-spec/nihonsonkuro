const fs = require("fs");
const path = require("path");

// Map topic to lesson number and title
const TOPIC_MAP = {
  "Hành động, Trạng thái & Mức độ": { id: 1, title: "Chuyên đề 1: Hành Động, Trạng Thái & Mức Độ" },
  "Giao thông, Du lịch & Không gian": { id: 2, title: "Chuyên đề 2: Giao Thông, Du Lịch & Không Gian" },
  "Y tế, Sức khỏe & Thể thao": { id: 3, title: "Chuyên đề 3: Y Tế, Sức Khỏe & Thể Thao" },
  "Kinh tế, Tài chính & Xã hội": { id: 4, title: "Chuyên đề 4: Kinh Tế, Tài Chính & Xã Hội" },
  "Con người, Tính cách & Cảm xúc": { id: 5, title: "Chuyên đề 5: Con Người, Tính Cách & Cảm Xúc" },
  "Tự nhiên, Môi trường & Khoa học kỹ thuật": { id: 6, title: "Chuyên đề 6: Tự Nhiên, Môi Trường & Khoa Học Kỹ Thuật" },
  "Học tập & Giáo dục": { id: 7, title: "Chuyên đề 7: Học Tập & Giáo Dục" },
  "Đời sống sinh hoạt & Ẩm thực": { id: 8, title: "Chuyên đề 8: Đời Sống Sinh Hoạt & Ẩm Thực" },
  "Chính trị & Pháp luật": { id: 9, title: "Chuyên đề 9: Chính Trị & Pháp Luật" },
  "Công việc & Doanh nghiệp": { id: 10, title: "Chuyên đề 10: Công Việc & Doanh Nghiệp" }
};

function normalizeCategory(catStr) {
  if (!catStr) return "Danh từ";
  if (catStr.includes("Phó từ")) return "Phó từ";
  if (catStr.includes("Quán ngữ") || catStr.includes("Cụm từ cố định") || catStr.includes("慣用句")) return "Quán dụng ngữ";
  if (catStr.includes("Từ tượng") || catStr.includes("オノマトペ")) return "Từ láy/Tượng thanh";
  if (catStr.includes("Tính từ")) return "Tính từ";
  if (catStr.includes("Động từ")) return "Động từ";
  if (catStr.includes("Tiền tố") || catStr.includes("Hậu tố")) return "Danh từ";
  return "Danh từ";
}

module.exports = { TOPIC_MAP, normalizeCategory };
