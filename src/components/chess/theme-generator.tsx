"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateGameTheme } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  themeDescription: z.string().min(10, "Please describe the theme in at least 10 characters."),
});

export function ThemeGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themeDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    try {
      const result = await generateGameTheme(values);
      if (result.success && result.theme) {
        document.documentElement.style.setProperty('--background', result.theme.background);
        document.documentElement.style.setProperty('--primary', result.theme.primary);
        document.documentElement.style.setProperty('--board-dark-square', `hsl(${result.theme.primary})`);

        const primaryHsl = result.theme.primary.split(' ').map(parseFloat);
        const lightSquareHsl = `hsl(${primaryHsl[0]}, ${primaryHsl[1]}%, ${Math.min(100, primaryHsl[2] + 30)}%)`;
        document.documentElement.style.setProperty('--board-light-square', lightSquareHsl);
        
        document.documentElement.style.setProperty('--accent', result.theme.accent);

        toast({
          title: "Theme Applied!",
          description: "The new AI-generated theme has been applied.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Theme Generation Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate theme.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Theme Generator</CardTitle>
        <CardDescription>Describe a theme and let AI create it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="themeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'A futuristic space theme'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating} className="w-full">
              <Wand2 />
              {isGenerating ? 'Generating...' : 'Generate Theme'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
