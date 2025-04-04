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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useChat } from "ai/react";
import { CustomAvatar } from "./custom-avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AnimatedMessage extends Message {
  isAnimating?: boolean;
}

const suggestedQuestions = [
  "Why is space black?",
  "How many planets are in our solar system?",
  "What are stars made of?",
  "Why does the Moon change shape?",
  "How old is the universe?",
  "What is a black hole?",
  "Why is Mars red?",
  "How do astronauts live in space?",
];

export function AstronomyChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi there, young space explorer! I'm Astro, your friendly space guide. Ask me anything about planets, stars, or space!",
      },
    ],
    streamProtocol: "text",
    // experimental_onFunctionCall: () => {},
    onResponse: () => {
      setTypingIndicator(false);
    },
    onFinish: () => {
      setTypingIndicator(false);
    },
    // Remove streamProtocol as it's not needed with vercel/ai
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [animatingMessages, setAnimatingMessages] = useState<AnimatedMessage[]>(
    []
  );
  const [typingIndicator, setTypingIndicator] = useState(false);

  // Handle new messages and animate them
  useEffect(() => {
    console.log("Messages:", messages);
    const currentLength = animatingMessages.length;

    // Update existing message content if it's streaming
    if (currentLength > 0 && messages.length === currentLength) {
      const lastMessageIndex = messages.length - 1;
      const lastMessage = messages[lastMessageIndex];

      setAnimatingMessages((prev) =>
        prev.map((msg, i) =>
          i === lastMessageIndex
            ? ({
                ...lastMessage,
                isAnimating: msg.isAnimating,
              } as AnimatedMessage)
            : msg
        )
      );
    }
    // Add new message if it's a completely new one
    else if (messages.length > currentLength) {
      const newMessage = messages[messages.length - 1];
      setAnimatingMessages((prev) => [
        ...prev,
        { ...newMessage, isAnimating: true } as AnimatedMessage,
      ]);

      setTimeout(() => {
        setAnimatingMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1 ? { ...msg, isAnimating: false } : msg
          )
        );
      }, 500);
    }
  }, [messages, animatingMessages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [animatingMessages, typingIndicator]);

  const handleSuggestedQuestion = (question: string) => {
    append({
      id: Date.now().toString(),
      role: "user",
      content: question,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTypingIndicator(true);
    handleSubmit(e);
  };

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
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </motion.div>
          Ask Astro About Space
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[450px] px-4">
          <div className="space-y-4 pt-4">
            {animatingMessages.map((message) => (
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
                  <CustomAvatar
                    type={message.role === "assistant" ? "ai" : "user"}
                    isAnimating={
                      message.isAnimating && message.role === "assistant"
                    }
                  />
                  <motion.div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "assistant"
                        ? "bg-purple-950/70 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm">{message.content}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {typingIndicator && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-3 max-w-[80%]">
                  <CustomAvatar type="ai" isAnimating={true} />
                  <div className="rounded-lg px-4 py-3 bg-purple-950/70 text-white min-w-[80px] flex items-center">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.1,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.2,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Suggested questions */}
      <div className="px-4 py-2">
        <p className="text-xs text-purple-300 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedQuestions.slice(0, 4).map((question) => (
            <motion.button
              key={question}
              className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 px-2 py-1 rounded-full"
              onClick={() => handleSuggestedQuestion(question)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      <CardFooter className="pt-0">
        <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Ask about planets, stars, or space..."
            value={input}
            onChange={handleInputChange}
            className="bg-slate-800/90 border-purple-900/50 text-white"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="cosmic-btn"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </form>
      </CardFooter>
    </Card>
  );
}
