"use server";

import { generateGameTheme as generateGameThemeFlow, GameThemeInput } from "@/ai/flows/generate-game-theme";
import { suggestMoveWithAnalysis as suggestMoveWithAnalysisFlow, SuggestMoveWithAnalysisInput } from "@/ai/flows/suggest-move-with-analysis";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const hexToHsl = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

export async function generateGameTheme(input: GameThemeInput) {
  try {
    const result = await generateGameThemeFlow(input);

    const primary = hexToHsl(result.colorPalette.primaryColor);
    const background = hexToHsl(result.colorPalette.backgroundColor);
    const accent = hexToHsl(result.colorPalette.accentColor);

    return {
      success: true,
      theme: {
        background: `${background[0]} ${background[1]}% ${background[2]}%`,
        primary: `${primary[0]} ${primary[1]}% ${primary[2]}%`,
        accent: `${accent[0]} ${accent[1]}% ${accent[2]}%`,
      }
    };
  } catch (error) {
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
        return { success: false, error: "An unexpected error occurred." };
    }
}
