"use client";

import useGameStore from "@/lib/store/game-store";
import { Difficulty, difficulties } from "@/types";
import { Card } from "@/components/ui/card";
import { Brain, Zap, TrendingUp, Award, Crown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIDifficultySelectorProps {
  disabled?: boolean;
}

export default function AIDifficultySelector({
  disabled = false,
}: AIDifficultySelectorProps) {
  const { gameMode, aiDifficulty, setAiDifficulty } = useGameStore();

  const levels: Array<{
    level: Difficulty;
    icon: React.ReactNode;
    gradient: string;
    shadowColor: string;
    textColor: string;
    name: string;
  }> = [
    {
      level: 400,
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-green-400 to-emerald-500",
      shadowColor: "shadow-green-200",
      textColor: "text-green-600",
      name: "Beginner",
    },
    {
      level: 800,
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-200",
      textColor: "text-blue-600",
      name: "Novice",
    },
    {
      level: 1200,
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-orange-400 to-orange-600",
      shadowColor: "shadow-orange-200",
      textColor: "text-orange-600",
      name: "Intermediate",
    },
    {
      level: 1600,
      icon: <Award className="w-6 h-6" />,
      gradient: "from-red-500 to-rose-600",
      shadowColor: "shadow-red-200",
      textColor: "text-red-600",
      name: "Advanced",
    },
    {
      level: 2000,
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-purple-500 to-indigo-600",
      shadowColor: "shadow-purple-200",
      textColor: "text-purple-600",
      name: "Expert",
    },
    {
      level: 2500,
      icon: <Trophy className="w-6 h-6" />,
      gradient: "from-amber-400 to-yellow-500",
      shadowColor: "shadow-amber-200",
      textColor: "text-amber-600",
      name: "Master",
    },
  ];

  if (gameMode !== "pve") {
    return null;
  }

  return (
    <Card className="p-5 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-background">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">AI Difficulty</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Choose your opponent's strength.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {levels.map((levelData) => {
            const isSelected = aiDifficulty === levelData.level;

            return (
              <button
                key={levelData.level}
                onClick={() => !disabled && setAiDifficulty(levelData.level)}
                disabled={disabled}
                className={cn(`
                  group relative p-4 rounded-xl transition-all duration-300 transform
                  ${
                    isSelected
                      ? `bg-gradient-to-br ${levelData.gradient} shadow-lg ${levelData.shadowColor} scale-105 border-2 border-white`
                      : "bg-white dark:bg-background hover:shadow-md border-2 border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102"
                  }
                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `)}
              >
                <div
                  className={cn(`
                    absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-xs font-bold shadow-md
                    ${
                      isSelected
                        ? "bg-white text-gray-900"
                        : `bg-gradient-to-r ${levelData.gradient} text-white`
                    }
                  `)}
                >
                  {levelData.level}
                </div>

                <div className="flex flex-col items-center gap-2.5">
                  <div
                    className={cn(`
                      p-3 rounded-xl transition-all duration-300
                      ${
                        isSelected
                          ? "bg-white/20 backdrop-blur-sm text-white"
                          : `${levelData.textColor} bg-gray-50 dark:bg-card group-hover:scale-110`
                      }
                    `)}
                  >
                    {levelData.icon}
                  </div>

                  <div className="text-center">
                    <div
                      className={cn(`
                        font-bold text-sm leading-tight
                        ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}
                      `)}
                    >
                      {levelData.name}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {disabled && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-yellow-900/20 border border-amber-200 dark:border-yellow-800/50">
            <svg
              className="w-4 h-4 text-amber-600 dark:text-yellow-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-amber-700 dark:text-yellow-300 font-medium">
              Cannot change difficulty during a game.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
