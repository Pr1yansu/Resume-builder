import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateTextUsingAI = async (prompt: string) => {
  try {
    const { response } = await model.generateContent([prompt]);
    const text = response.text();
    return text;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate text using AI");
  }
};

export { generateTextUsingAI };
