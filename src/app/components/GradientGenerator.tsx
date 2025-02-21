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

export default function GradientGenerator() {
  const [colors, setColors] = React.useState(["#3B82F6", "#EC4899"]);
  const [angle, setAngle] = React.useState(90);

  const handleColorChange = (index: number, value: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? value : c)));
  };

  const cssCode = `background: linear-gradient(${angle}deg, ${colors.join(
    ", "
  )});`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gradient Generator</CardTitle>
        <CardDescription>
          Create custom gradients with a preview and code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color, index) => (
              <div key={index}>
                <Label htmlFor={`color-${index + 1}`}>Color {index + 1}</Label>
                <Input
                  id={`color-${index + 1}`}
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="angle">Angle</Label>
            <Input
              id="angle"
              type="number"
              value={angle}
              onChange={(e) => setAngle(Number.parseInt(e.target.value) || 0)}
            />
          </div>
          <div
            className="h-40 w-full"
            style={{
              background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
            }}
          />
          <Input readOnly value={cssCode} />
          <Button onClick={() => navigator.clipboard.writeText(cssCode)}>
            Copy CSS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
