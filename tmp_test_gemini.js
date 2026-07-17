import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("No GEMINI_API_KEY found in process.env");
    return;
  }
  console.log("Found GEMINI_API_KEY:", apiKey.substring(0, 10) + "...");
  
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the exact Japanese listening script for JLPT N3 2022-12 Listening Question 1 (1番. 女の学生は何をしなければなりませんか。) with correct answer: 3 (川野さんにお金をわたす), explanation: 'Người nam báo rằng Kawano sẽ mua vé trước trên mạng và đã có phiếu giảm giá. Người nữ chỉ cần trực tiếp đưa tiền vé cho Kawano. => Đáp án 3: Đưa tiền cho Kawano.'. Keep it in simple Japanese with speaker names like '男:' and '女:'."
    });
    console.log("Response text:");
    console.log(response.text);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

test();
