"use server";

import { generateGameTheme as generateGameThemeFlow, GameThemeInput, GameThemeOutput } from "@/ai/flows/generate-game-theme";
import { suggestMoveWithAnalysis as suggestMoveWithAnalysisFlow, SuggestMoveWithAnalysisInput } from "@/ai/flows/suggest-move-with-analysis";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function generateGameTheme(input: GameThemeInput): Promise<{ success: boolean; theme?: GameThemeOutput['colorPalette']; error?: string; }> {
  try {
    const result = await generateGameThemeFlow(input);
    return {
      success: true,
      theme: result.colorPalette
    };
  } catch (error) {
    console.error("Theme generation failed:", error);
    return { success: false, error: "Failed to generate theme." };
  }
}

const SuggestMoveSchema = z.object({
    fen: z.string(),
    difficulty: z.number().min(400).max(2500)
});

export async function suggestMoveWithAnalysis(input: SuggestMoveWithAnalysisInput) {
    try {
        const validatedInput = SuggestMoveSchema.parse(input);
        const result = await suggestMoveWithAnalysisFlow(validatedInput);
        return { success: true, data: result };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
          return { success: false, error: fromZodError(error).toString() };
        }
        console.error("AI move analysis failed:", error);
        return { success: false, error: "An unexpected error occurred while analyzing the move." };
    }
}
