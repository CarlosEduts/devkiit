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

export default function BoxShadowGenerator() {
  const [shadow, setShadow] = React.useState({
    horizontal: 0,
    vertical: 0,
    blur: 0,
    spread: 0,
    color: "#000000",
  });

  const handleShadowChange = (property: keyof typeof shadow, value: string) => {
    setShadow((prev) => ({
      ...prev,
      [property]: property === "color" ? value : Number.parseInt(value) || 0,
    }));
  };

  const cssCode = `box-shadow: ${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${shadow.color};`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Box-Shadow Generator</CardTitle>
        <CardDescription>
          Fine-tune shadows and copy the generated code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {["horizontal", "vertical", "blur", "spread"].map((prop) => (
              <div key={prop}>
                <Label htmlFor={prop}>
                  {prop.charAt(0).toUpperCase() + prop.slice(1)}
                </Label>
                <Input
                  id={prop}
                  type="number"
                  value={shadow[prop as keyof typeof shadow]}
                  onChange={(e) =>
                    handleShadowChange(
                      prop as keyof typeof shadow,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <Label htmlFor="shadow-color">Color</Label>
            <Input
              id="shadow-color"
              type="color"
              value={shadow.color}
              onChange={(e) => handleShadowChange("color", e.target.value)}
            />
          </div>
          <div
            className="h-40 w-full rounded bg-muted"
            style={{
              boxShadow: `${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`,
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
