'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a chessboard theme based on a user-provided description.
 *
 * The flow takes a theme description as input and returns a color palette and piece style suggestion.
 * It exports:
 * - `generateGameTheme`: An async function that takes a theme description and returns the generated theme.
 * - `GameThemeInput`: The input type for the `generateGameTheme` function.
 * - `GameThemeOutput`: The output type for the `generateGameTheme` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GameThemeInputSchema = z.object({
  themeDescription: z.string().describe('A description of the desired chessboard theme.'),
});
export type GameThemeInput = z.infer<typeof GameThemeInputSchema>;

const GameThemeOutputSchema = z.object({
  colorPalette: z
    .object({
      primary: z.string().describe('The primary color for UI elements like buttons and highlights, in HSL format (e.g., "210 29% 24%").'),
      background: z.string().describe('The main background color of the app, in HSL format (e.g., "0 0% 13.3%").'),
      accent: z.string().describe('The accent color for highlights and call-to-actions, in HSL format (e.g., "51 100% 50%").'),
      card: z.string().describe('The background color for card elements, in HSL format (e.g., "210 29% 18%").'),
      foreground: z.string().describe('The primary text color, in HSL format (e.g., "0 0% 98%").'),
    })
    .describe('The HSL color palette for the app theme.'),
});
export type GameThemeOutput = z.infer<typeof GameThemeOutputSchema>;

export async function generateGameTheme(input: GameThemeInput): Promise<GameThemeOutput> {
  return generateGameThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGameThemePrompt',
  input: {schema: GameThemeInputSchema},
  output: {schema: GameThemeOutputSchema},
  prompt: `You are a theme generator for a chess web app. Your task is to generate a harmonious and accessible color palette based on a user's theme description. The palette must be suitable for a modern, dark-themed interface.

  **Theme Description:**
  "{{{themeDescription}}}"

  **Instructions:**
  1.  Generate five colors in HSL format (e.g., "210 29% 24%").
  2.  **Primary Color:** This will be used for the dark squares on the chessboard and for some UI elements. It should be a mid-to-dark tone.
  3.  **Background Color:** This is the main app background. It must be a very dark color to ensure a good dark mode experience.
  4.  **Accent Color:** A bright, vibrant color for highlights, selected state, and call-to-actions.
  5.  **Card Color:** A color for card backgrounds, slightly lighter than the main background but still dark.
  6.  **Foreground Color:** The main text color. It should be very light (almost white) to have high contrast against the dark backgrounds.

  Ensure the generated palette is aesthetically pleasing and provides good contrast for readability.
`,
});

const generateGameThemeFlow = ai.defineFlow(
  {
    name: 'generateGameThemeFlow',
    inputSchema: GameThemeInputSchema,
    outputSchema: GameThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
