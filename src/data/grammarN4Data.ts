import { dataPart1 } from "./grammarN4DataPart1";
import { dataPart2 } from "./grammarN4DataPart2";
import { dataPart3 } from "./grammarN4DataPart3";
import { dataPart4 } from "./grammarN4DataPart4";
import { dataPart5 } from "./grammarN4DataPart5";

export interface GrammarN4Item {
  id: number;
  l: string; // Lesson (e.g., "Bài 26")
  p: string; // Pattern (e.g., "〜んです")
  m: string; // Meaning (e.g., "Nhấn mạnh, giải thích")
  s: string; // Structure
  u: string; // Usage/Notes
  ex: { t: string; v: string }[]; // Examples
  qz: (
    | { type: "fill"; q: string; o: string[]; a: string; e: string }
    | { type: "star"; p: string[]; ao: number[]; q: string; e: string }
  )[];
}

export function parseText(text: string): string {
  if (!text) return "";
  let html = text.replace(/\*(.*?)\*/g, "<span class='text-red-700 dark:text-red-400 font-extrabold'>$1</span>");
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, "<ruby>$1<rt>$2</rt></ruby>");
  html = html.replace(/([\u4e00-\u9faf\u3400-\u4dbf]+)\[(.*?)\]/g, "<ruby>$1<rt>$2</rt></ruby>");
  html = html.replace(/([\u4e00-\u9faf\u3400-\u4dbf]+)\((.*?)\)/g, "<ruby>$1<rt>$2</rt></ruby>");
  return html;
}

export function getPlainText(text: string): string {
  if (!text) return "";
  let plain = text.replace(/\*(.*?)\*/g, "$1");
  plain = plain.replace(/\[(.*?)\]\((.*?)\)/g, "$1");
  plain = plain.replace(/([\u4e00-\u9faf\u3400-\u4dbf]+)\[(.*?)\]/g, "$1");
  plain = plain.replace(/([\u4e00-\u9faf\u3400-\u4dbf]+)\((.*?)\)/g, "$1");
  return plain;
}

export function getGrammarN4Data(): GrammarN4Item[] {
  try {
    const allRaw = ([] as any[][]).concat(dataPart1, dataPart2, dataPart3, dataPart4, dataPart5);
    return allRaw.map(d => {
      const examples = (d[6] || "").split("~").map((exStr: string) => {
        const parts = exStr.split("|");
        return { t: parts[0] || "", v: parts[1] || "" };
      });

      const quizzes = (d[7] || "").split("~").map((qStr: string) => {
        const p = qStr.split("|");
        if (p[0] === "f") {
          return {
            type: "fill" as const,
            q: p[1],
            o: p[2] ? p[2].split(",") : [],
            a: p[2] ? p[2].split(",")[parseInt(p[3])] : "",
            e: p[4] || "",
          };
        }
        if (p[0] === "s") {
          return {
            type: "star" as const,
            p: p[1] ? p[1].split(",") : [],
            ao: p[2] ? p[2].split("").map(Number) : [],
            q: p[3],
            e: p[4] || "",
          };
        }
        return null;
      }).filter(Boolean);

      return {
        id: d[0],
        l: d[1],
        p: d[2],
        m: d[3],
        s: d[4],
        u: d[5],
        ex: examples,
        qz: quizzes as any,
      };
    });
  } catch (e) {
    console.error("Lỗi biên dịch dữ liệu ngữ pháp N4:", e);
    return [];
  }
}
