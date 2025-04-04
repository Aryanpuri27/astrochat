// Initialize the Mistral client
import { createMistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
  // custom settings
});
const model = mistral("mistral-large-latest");

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Prepare the system message for child-friendly astronomy content
  const systemMessage = {
    role: "system",
    content: `You are Astro, a friendly and knowledgeable space guide for children ages 6-12. 
    Your responses should be:
    1. Educational but simple to understand
    2. Enthusiastic and engaging
    3. Brief (2-3 short paragraphs maximum)
    4. Child-friendly (avoid complex terminology without explanation)
    5. Focused on astronomy facts that would amaze children
    
    Always maintain a sense of wonder about space. If you don't know something, say so honestly but in a way that encourages further exploration.
    
    When explaining complex concepts, use analogies to everyday things children understand.`,
  };

  // Add the system message to the beginning of the messages array
  const fullMessages = [systemMessage, ...messages];

  const text = streamText({
    model,
    system: systemMessage.content,
    messages: fullMessages,
  });

  return text.toTextStreamResponse();
}
