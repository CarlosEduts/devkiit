"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [generatedText, setGeneratedText] = React.useState("");

  const generateLoremIpsum = () => {
    const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    let result = "";
    for (let i = 0; i < paragraphs; i++) {
      result += loremIpsum + "\n\n";
    }
    setGeneratedText(result.trim());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lorem Ipsum Generator</CardTitle>
        <CardDescription>
          Generate placeholder text for your designs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="paragraph-count">Number of Paragraphs</Label>
            <Input
              id="paragraph-count"
              type="number"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number.parseInt(e.target.value))}
            />
          </div>
          <textarea
            className="h-48 w-full rounded-md border border-input bg-background px-3 py-2"
            readOnly
            value={generatedText}
          />
          <Button onClick={generateLoremIpsum}>Generate Lorem Ipsum</Button>
        </div>
      </CardContent>
    </Card>
  );
}
