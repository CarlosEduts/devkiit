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

export default function ReadingTimeCalculator() {
  const [wordCount, setWordCount] = React.useState("");
  const [readingSpeed, setReadingSpeed] = React.useState(200);
  const [readingTime, setReadingTime] = React.useState("0 minutes");

  const calculateReadingTime = () => {
    const minutes = Math.ceil(wordCount.split(" ").length / readingSpeed);
    setReadingTime(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Time Calculator</CardTitle>
        <CardDescription>
          Estimate the time needed to read a text based on word count.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="word-count">Word Count</Label>
            <Input
              id="word-count"
              type="text"
              min="1"
              placeholder="Enter text..."
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value || " ")}
            />
          </div>
          <div>
            <Label htmlFor="reading-speed">
              Reading Speed (words per minute)
            </Label>
            <Input
              id="reading-speed"
              type="number"
              min="1"
              value={readingSpeed}
              onChange={(e) =>
                setReadingSpeed(Number.parseInt(e.target.value) || 1)
              }
            />
          </div>
          <div>
            <Label>Estimated Reading Time</Label>
            <Input readOnly value={readingTime} />
          </div>
          <Button onClick={calculateReadingTime}>Calculate</Button>
        </div>
      </CardContent>
    </Card>
  );
}
