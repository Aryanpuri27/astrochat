"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, Award } from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: 1,
    explanation:
      "Mars is called the Red Planet because of its reddish appearance, which is caused by iron oxide (rust) on its surface.",
  },
  {
    id: 2,
    question: "How many planets are in our Solar System?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1,
    explanation:
      "There are 8 planets in our Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
  },
  {
    id: 3,
    question: "Which is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2,
    explanation:
      "Jupiter is the largest planet in our Solar System. It's so big that more than 1,300 Earths could fit inside it!",
  },
  {
    id: 4,
    question: "What is the name of Earth's natural satellite?",
    options: ["Sun", "Moon", "Mars", "Venus"],
    correctAnswer: 1,
    explanation:
      "The Moon is Earth's only natural satellite. It orbits around Earth and is about 1/4 the size of our planet.",
  },
  {
    id: 5,
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2,
    explanation:
      "Jupiter has the most moons with 79 confirmed moons! Saturn is close behind with 82 moons.",
  },
];

export function SpaceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Space Quiz Challenge
        </h2>

        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300 text-sm">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-purple-300 text-sm">
                    Score: {score}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <motion.button
                        key={index}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedAnswer === null
                            ? "bg-slate-800/80 hover:bg-slate-700/80 text-white"
                            : selectedAnswer === index
                            ? index ===
                              quizQuestions[currentQuestion].correctAnswer
                              ? "bg-green-800/50 text-white"
                              : "bg-red-800/50 text-white"
                            : index ===
                                quizQuestions[currentQuestion].correctAnswer &&
                              showExplanation
                            ? "bg-green-800/50 text-white"
                            : "bg-slate-800/80 text-white opacity-70"
                        }`}
                        onClick={() =>
                          selectedAnswer === null && handleAnswerSelect(index)
                        }
                        disabled={selectedAnswer !== null}
                        whileHover={
                          selectedAnswer === null ? { scale: 1.02 } : {}
                        }
                        whileTap={
                          selectedAnswer === null ? { scale: 0.98 } : {}
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedAnswer !== null && (
                            <>
                              {index ===
                              quizQuestions[currentQuestion].correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : selectedAnswer === index ? (
                                <XCircle className="h-5 w-5 text-red-400" />
                              ) : null}
                            </>
                          )}
                        </div>
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-300 mb-1">
                          Explanation:
                        </h4>
                        <p className="text-white text-sm">
                          {quizQuestions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <Button onClick={handleNextQuestion} className="cosmic-btn">
                    {currentQuestion < quizQuestions.length - 1
                      ? "Next Question"
                      : "See Results"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6 flex flex-col items-center">
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  <Award className="h-20 w-20 text-yellow-400 mb-4" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Quiz Complete!
                </h3>
                <p className="text-purple-300 mb-4">
                  You scored {score} out of {quizQuestions.length}
                </p>

                <div className="w-full max-w-md bg-slate-800/50 rounded-lg p-4 mb-6">
                  <div className="relative h-6 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(score / quizQuestions.length) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {score === quizQuestions.length ? (
                  <p className="text-green-400 mb-6">
                    Perfect score! You&apos;re a space expert! 🚀
                  </p>
                ) : score >= quizQuestions.length / 2 ? (
                  <p className="text-blue-400 mb-6">
                    Good job! You know a lot about space! 🌟
                  </p>
                ) : (
                  <p className="text-yellow-400 mb-6">
                    Keep exploring space to learn more! 🔭
                  </p>
                )}

                <Button onClick={resetQuiz} className="cosmic-btn">
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
