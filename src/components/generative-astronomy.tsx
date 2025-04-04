"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AstronomyFact } from "./generative-ui/astronomy-fact";
import { useChat } from "ai/react";

export function GenerativeAstronomy() {
  const [activeUI, setActiveUI] = useState<React.ReactNode>(
    <AstronomyFact fact="I can create visual explanations about astronomy! Ask me to show you a planet, the solar system, or a constellation." />
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/generate-ui",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Ask me to show you something about space! I can create visual explanations about planets, stars, and more!",
        },
      ],
      streamProtocol: "text",
      onFinish: async (message) => {
        try {
          // Try to parse the message content as JSON to extract component info
          const contentStr = message.content.trim();

          // Helper function to safely parse JSON
          const safeJsonParse = (str: string) => {
            try {
              return { success: true, data: JSON.parse(str) };
            } catch (e) {
              return { success: false, error: e as Error };
            }
          };

          // First attempt to parse the outer JSON
          const outerResult = safeJsonParse(contentStr);

          if (outerResult.success) {
            const outerData = outerResult.data;

            // Check if we have content to parse
            if (outerData && typeof outerData.content === "string") {
              // Try to parse the inner content
              const innerResult = safeJsonParse(outerData.content);

              if (
                innerResult.success &&
                innerResult.data &&
                typeof innerResult.data.componentType === "string" &&
                innerResult.data.props
              ) {
                // Valid component data found, update UI
                console.log("Parsed component data:", innerResult.data);
                updateUIComponent(
                  innerResult.data.componentType,
                  innerResult.data.props
                );
              } else {
                // Inner content parsing failed or invalid format
                console.warn(
                  "Invalid component data format:",
                  innerResult.data
                );
                setActiveUI(
                  <AstronomyFact fact="I understand your question but couldn't generate the visualization. Please try asking about a specific space topic." />
                );
              }
            } else {
              // Content field missing or not a string
              console.warn("Invalid outer JSON format:", outerData);
              setActiveUI(<AstronomyFact fact={contentStr} />);
            }
          } else {
            // If the response is not JSON at all, display as regular message
            setActiveUI(<AstronomyFact fact={contentStr} />);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
          // Show error message in a user-friendly way
          setActiveUI(
            <AstronomyFact fact="I encountered an error processing that request. Please try asking about a specific planet or space topic." />
          );
        }
      },
    });

  // Function to update the UI component based on AI response
  const updateUIComponent = (
    componentType: string,
    props: Record<string, unknown>
  ) => {
    switch (componentType) {
      case "PlanetCard":
        import("./generative-ui/planet-card").then(({ PlanetCard }) => {
          setActiveUI(<PlanetCard {...props} />);
        });
        break;
      case "SolarSystemDiagram":
        import("./generative-ui/solar-system-diagram").then(
          ({ SolarSystemDiagram }) => {
            setActiveUI(<SolarSystemDiagram {...props} />);
          }
        );
        break;
      case "ConstellationMap":
        import("./generative-ui/constellation-map").then(
          ({ ConstellationMap }) => {
            setActiveUI(
              <ConstellationMap
                constellation={props.constellation as string}
                stars={
                  props.stars as Array<{ name: string; x: number; y: number }>
                }
              />
            );
          }
        );
        break;
      case "SpaceMission":
        import("./generative-ui/space-mission").then(({ SpaceMission }) => {
          setActiveUI(<SpaceMission {...props} />);
        });
        break;
      case "SpaceComparison":
        import("./generative-ui/space-comparison").then(
          ({ SpaceComparison }) => {
            setActiveUI(<SpaceComparison {...props} />);
          }
        );
        break;
      case "AstronomyFact":
      default:
        import("./generative-ui/astronomy-fact").then(({ AstronomyFact }) => {
          setActiveUI(
            <AstronomyFact
              fact={props && "I'm learning about that space topic!"}
            />
          );
        });
        break;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeUI]);

  return (
    <Card className="glass flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-white flex items-center justify-center gap-2">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Rocket className="h-5 w-5 text-yellow-400" />
          </motion.div>
          Visual Space Explorer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <div className="h-[450px] flex flex-col">
          <div className="flex-grow overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        message.role === "assistant"
                          ? "bg-purple-700"
                          : "bg-blue-600"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Sparkles className="h-4 w-4 text-white" />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "assistant"
                          ? "bg-purple-950/70 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm">
                        {message.role === "user" ? message.content : ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Generated UI display area */}
          <div className="p-4 border-t border-purple-900/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={messages.length.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeUI}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask to show a planet, solar system, constellation..."
            value={input}
            onChange={handleInputChange}
            className="bg-slate-800/90 border-purple-900/50 text-white"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="cosmic-btn"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
