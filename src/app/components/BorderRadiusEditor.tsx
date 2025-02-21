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

export default function BorderRadiusEditor() {
  const [radius, setRadius] = React.useState({
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  });

  const handleRadiusChange = (corner: keyof typeof radius, value: string) => {
    setRadius((prev) => ({ ...prev, [corner]: Number.parseInt(value) || 0 }));
  };

  const cssCode = `border-radius: ${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px;`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Border-Radius Editor</CardTitle>
        <CardDescription>
          Adjust rounded borders and generate CSS code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(radius).map(([corner, value]) => (
              <div key={corner}>
                <Label htmlFor={corner}>
                  {corner.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  id={corner}
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleRadiusChange(
                      corner as keyof typeof radius,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div
            className="h-40 w-full bg-muted"
            style={{
              borderRadius: `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`,
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
