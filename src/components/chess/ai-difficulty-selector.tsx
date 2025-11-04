"use client";

import useGameStore from "@/lib/store/game-store";
import { Difficulty } from "@/types";
import { Brain, Zap, TrendingUp, Award, Crown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

interface AIDifficultySelectorProps {
  disabled?: boolean;
}

export default function AIDifficultySelector({
  disabled = false,
}: AIDifficultySelectorProps) {
  const { aiDifficulty, setAiDifficulty } = useGameStore();

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
      icon: <Brain className="w-5 h-5" />,
      gradient: "from-green-400 to-emerald-500",
      shadowColor: "shadow-green-200",
      textColor: "text-green-600",
      name: "Beginner",
    },
    {
      level: 800,
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-200",
      textColor: "text-blue-600",
      name: "Novice",
    },
    {
      level: 1200,
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-orange-400 to-orange-600",
      shadowColor: "shadow-orange-200",
      textColor: "text-orange-600",
      name: "Intermediate",
    },
    {
      level: 1600,
      icon: <Award className="w-5 h-5" />,
      gradient: "from-red-500 to-rose-600",
      shadowColor: "shadow-red-200",
      textColor: "text-red-600",
      name: "Advanced",
    },
    {
      level: 2000,
      icon: <Crown className="w-5 h-5" />,
      gradient: "from-purple-500 to-indigo-600",
      shadowColor: "shadow-purple-200",
      textColor: "text-purple-600",
      name: "Expert",
    },
    {
      level: 2500,
      icon: <Trophy className="w-5 h-5" />,
      gradient: "from-amber-400 to-yellow-500",
      shadowColor: "shadow-amber-200",
      textColor: "text-amber-600",
      name: "Master",
    },
  ];

  return (
    <div className="space-y-2">
      <Label>AI Difficulty</Label>
      <div className="grid grid-cols-3 gap-2">
        {levels.map((levelData) => {
          const isSelected = aiDifficulty === levelData.level;

          return (
            <button
              key={levelData.level}
              onClick={() => !disabled && setAiDifficulty(levelData.level)}
              disabled={disabled}
              className={cn(`
                group relative p-2 rounded-lg transition-all duration-300 transform
                border-2
                ${
                  isSelected
                    ? `bg-gradient-to-br ${levelData.gradient} ${levelData.shadowColor} scale-105 border-white/50 text-white`
                    : "bg-background hover:shadow-md border-border hover:border-muted-foreground/50 hover:scale-102"
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
                    absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm
                    ${
                      isSelected
                        ? "bg-white text-gray-900"
                        : `bg-gradient-to-r ${levelData.gradient} text-white`
                    }
                  `)}
                >
                  {levelData.level}
                </div>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(`
                    transition-all duration-300
                    ${
                      isSelected
                        ? "text-white"
                        : `${levelData.textColor} group-hover:scale-110`
                    }
                  `)}
                >
                  {levelData.icon}
                </div>
                <div className="text-center">
                  <div
                    className={cn(`
                      font-bold text-xs leading-tight
                      ${isSelected ? "text-white" : "text-card-foreground"}
                    `)}
                  >
                    {levelData.name}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
