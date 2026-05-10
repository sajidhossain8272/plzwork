import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: "Hello"
    });
    console.log("Success with gemini-2.0-flash-lite", res.text);
  } catch (e) {
    console.error("Error with gemini-2.0-flash-lite:", e.message);
  }
}
test();
