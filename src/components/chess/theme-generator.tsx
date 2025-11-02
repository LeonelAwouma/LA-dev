"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateGameTheme } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "../ui/sidebar";

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
        const root = document.documentElement;
        root.style.setProperty('--background', `hsl(${result.theme.background})`);
        root.style.setProperty('--foreground', `hsl(${result.theme.foreground})`);
        root.style.setProperty('--primary', `hsl(${result.theme.primary})`);
        root.style.setProperty('--accent', `hsl(${result.theme.accent})`);
        root.style.setProperty('--card', `hsl(${result.theme.card})`);
        
        // Sidebar colors
        root.style.setProperty('--sidebar-background', `hsl(${result.theme.sidebarBackground})`);
        root.style.setProperty('--sidebar-foreground', `hsl(${result.theme.sidebarForeground})`);
        root.style.setProperty('--sidebar-border', `hsl(${result.theme.sidebarBackground})`);
        const sidebarBgHsl = result.theme.sidebarBackground.split(' ').map(parseFloat);
        const sidebarAccentHsl = `${sidebarBgHsl[0]} ${sidebarBgHsl[1]}% ${Math.min(100, sidebarBgHsl[2] + 5)}%`;
        root.style.setProperty('--sidebar-accent', `hsl(${sidebarAccentHsl})`);


        // Board colors
        root.style.setProperty('--board-dark-square', `hsl(${result.theme.primary})`);
        const primaryHsl = result.theme.primary.split(' ').map(parseFloat);
        const lightSquareHsl = `${primaryHsl[0]} ${primaryHsl[1]}% ${Math.min(100, primaryHsl[2] + 30)}%`;
        root.style.setProperty('--board-light-square', `hsl(${lightSquareHsl})`);

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
    <SidebarGroup>
      <SidebarGroupLabel>AI Theme Generator</SidebarGroupLabel>
      <SidebarGroupContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="themeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g., 'A futuristic space theme'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating} className="w-full" size="sm">
              <Wand2 />
              {isGenerating ? 'Generating...' : 'Generate Theme'}
            </Button>
          </form>
        </Form>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
