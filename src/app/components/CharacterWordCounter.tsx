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

export default function CharacterWordCounter() {
  const [text, setText] = React.useState("");

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = text.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Character and Word Counter</CardTitle>
        <CardDescription>
          Count characters and words in your text.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="text-input">Enter your text</Label>
            <textarea
              id="text-input"
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Character Count</Label>
              <Input readOnly value={characterCount} />
            </div>
            <div>
              <Label>Word Count</Label>
              <Input readOnly value={wordCount} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
