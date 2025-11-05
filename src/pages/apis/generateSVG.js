import { OpenAI } from "openai";

const OR_TOKEN = import.meta.env.OR_TOKEN;
const OR_URL = "https://openrouter.ai/api/v1";

export const POST = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Aucun message fourni" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new OpenAI({
      baseURL: OR_URL,
      apiKey: OR_TOKEN,
    });

    const systemMessage = {
    role: "system",
    content: `You are an SVG code generator specialized in eyeglasses/sunglasses designs.
    Generate ONLY the SVG code, nothing else.
    Requirements:
    - viewBox="0 0 400 157"
    - Use ONLY inline fill attributes, NO <style> tags
    - Use UNIQUE ids like: id="frame_${Date.now()}" for each element
    - Use NO classes at all - only inline styles
    - Default: black (#000000) for frame, transparent for lenses
    - Return clean SVG without any id/class conflicts`,
    };



    const chatCompletion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [systemMessage, ...messages],
      extra_headers: {
        "HTTP-Referer": "http://localhost:4321",
        "X-Title": "TAVUE - SVG Glasses Generator",
      },
    });

    const messageContent = chatCompletion.choices?.[0]?.message?.content || "";
    const svgMatch = messageContent.match(/<svg[\s\S]*?<\/svg>/i);
    const svgCode = svgMatch ? svgMatch[0] : messageContent;

    return new Response(JSON.stringify({ 
      svg: svgCode,
      fullResponse: messageContent 
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erreur API SVG:", err);
    return new Response(JSON.stringify({ error: "Erreur API SVG" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
