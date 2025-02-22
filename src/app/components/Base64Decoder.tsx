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

export default function Base64Decoder() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");

  const handleConvert = () => {
    if (mode === "encode") {
      setOutput(btoa(input));
    } else {
      try {
        setOutput(atob(input));
      } catch (error) {
        console.error("Invalid Base64 string:", error);
        setOutput("Error: Invalid Base64 string");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base64 Encoder/Decoder</CardTitle>
        <CardDescription>
          Encode or decode text in Base64 format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="base64-input">Input</Label>
            <textarea
              id="base64-input"
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode"
                  : "Enter Base64 to decode"
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mode === "encode" ? "default" : "outline"}
              onClick={() => setMode("encode")}
            >
              Encode
            </Button>
            <Button
              variant={mode === "decode" ? "default" : "outline"}
              onClick={() => setMode("decode")}
            >
              Decode
            </Button>
          </div>
          <Button onClick={handleConvert}>Convert</Button>
          <div>
            <Label>Output</Label>
            <textarea
              className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
              readOnly
              value={output}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
