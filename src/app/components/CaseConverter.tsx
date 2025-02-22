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

export default function CaseConverter() {
  const [input, setInput] = React.useState("");
  const [camelCase, setCamelCase] = React.useState("");
  const [snakeCase, setSnakeCase] = React.useState("");
  const [kebabCase, setKebabCase] = React.useState("");

  const convertCase = () => {
    // Convert to camelCase
    setCamelCase(
      input
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, "")
    );

    // Convert to snake_case
    setSnakeCase(
      input
        .replace(/\s+/g, "_")
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase()
    );

    // Convert to kebab-case
    setKebabCase(
      input
        .replace(/\s+/g, "-")
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Converter</CardTitle>
        <CardDescription>
          Convert text between different naming conventions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="case-input">Input Text</Label>
            <Input
              id="case-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert"
            />
          </div>
          <Button onClick={convertCase}>Convert</Button>
          <div>
            <Label>camelCase</Label>
            <Input readOnly value={camelCase} />
            { camelCase &&
            <Button
              onClick={() => navigator.clipboard.writeText(camelCase)}
              className="w-full mt-3"
              variant="outline"
            >
              Copy camelCase
            </Button> }
          </div>
          <div>
            <Label>snake_case</Label>
            <Input readOnly value={snakeCase} />
            {snakeCase &&
            <Button
              onClick={() => navigator.clipboard.writeText(snakeCase)}
              className="w-full mt-3"
              variant="outline"
            >
              Copy snake_case
            </Button>}
          </div>
          <div>
            <Label>kebab-case</Label>
            <Input readOnly value={kebabCase} />
            {kebabCase &&
            <Button
              onClick={() => navigator.clipboard.writeText(kebabCase)}
              className="w-full mt-3"
              variant="outline"
            >
              Copy kebab-case
            </Button>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
