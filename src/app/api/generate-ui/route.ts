import MistralAI from "@mistralai/mistralai";

// Initialize the Mistral client
const client = new MistralAI(process.env.MISTRAL_API_KEY || "");

export async function POST(req: Request) {
  interface Message {
    role: "user" | "assistant";
    content: string;
  }

  const { messages } = (await req.json()) as { messages: Message[] };

  // Get the last user message
  const lastUserMessage = messages
    .filter((m: Message) => m.role === "user")
    .pop();

  if (!lastUserMessage) {
    return new Response(
      JSON.stringify({
        role: "assistant",
        content: "I didn't receive a question. Please ask me about space!",
      }),
      { status: 200 }
    );
  }

  // Define the system message for the AI
  const systemMessage = `You are an astronomy education assistant for children.
  Analyze the user's question and determine which visual component would best explain the concept.
  
  Based on the question, choose ONE of the following components to render:
  
  1. PlanetCard - For questions about specific planets
  2. SolarSystemDiagram - For questions about the solar system structure
  3. ConstellationMap - For questions about stars and constellations
  4. SpaceMission - For questions about space exploration
  5. SpaceComparison - For comparing celestial objects
  6. AstronomyFact - For general astronomy facts
  
  Respond ONLY with a JSON object containing:
  1. componentType: The name of the component to render
  2. props: An object with the necessary props for that component
  
  Example response for a question about Mars:
  {
    "componentType": "PlanetCard",
    "props": {
      "name": "Mars",
      "description": "Mars is the fourth planet from the Sun and is known as the Red Planet.",
      "color": "#E67F4B",
      "diameter": "4,220 miles",
      "distanceFromSun": "142 million miles",
      "dayLength": "24.6 hours",
      "yearLength": "687 Earth days",
      "temperature": "-195°F to 70°F",
      "moons": 2
    }
  }
  
  DO NOT include any explanatory text, ONLY the JSON object.`;

  // Call Mistral API
  const response = await client.chat({
    model: "mistral-small",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: lastUserMessage.content },
    ],
  });

  // Get the AI response
  const aiResponse = response.choices[0].message.content;

  // Return the response
  return new Response(
    JSON.stringify({
      role: "assistant",
      content: aiResponse,
    }),
    { status: 200 }
  );
}
