"use server";

import { suggestMoveWithAnalysis as suggestMoveWithAnalysisFlow, SuggestMoveWithAnalysisInput, SuggestMoveWithAnalysisOutput } from "@/ai/flows/suggest-move-with-analysis";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";


const SuggestMoveSchema = z.object({
    fen: z.string(),
    difficulty: z.number().min(400).max(2500)
});

export async function suggestMoveWithAnalysis(input: SuggestMoveWithAnalysisInput): Promise<SuggestMoveWithAnalysisOutput> {
    try {
        const validatedInput = SuggestMoveSchema.parse(input);
        const result = await suggestMoveWithAnalysisFlow(validatedInput);
        return result;
    } catch (error: any) {
        if (error instanceof z.ZodError) {
          throw new Error(fromZodError(error).toString());
        }
        console.error("AI move analysis failed:", error);
        throw new Error("An unexpected error occurred while analyzing the move.");
    }
}
