"use client";

import React, { useState } from "react";
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

export default function ColorConverter() {
  const [input, setInput] = useState<string>("");
  const [hex, setHex] = useState<string>("#FFFFFF");
  const [rgb, setRgb] = useState<string>("rgb(255, 255, 255)");
  const [hsl, setHsl] = useState<string>("hsl(0, 0%, 100%)");

  const isValidHex = (color: string): boolean =>
    /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
  const isValidRgb = (color: string): boolean =>
    /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/.test(color);

  const convertColor = (): void => {
    try {
      let color = input.trim();

      if (isValidHex(color)) {
        let r: number, g: number, b: number;
        if (color.length === 4) {
          r = parseInt(color[1] + color[1], 16);
          g = parseInt(color[2] + color[2], 16);
          b = parseInt(color[3] + color[3], 16);
        } else {
          r = parseInt(color.slice(1, 3), 16);
          g = parseInt(color.slice(3, 5), 16);
          b = parseInt(color.slice(5, 7), 16);
        }
        setHex(color);
        setRgb(`rgb(${r}, ${g}, ${b})`);

        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        let h: number = 0,
          s: number = 0,
          l: number = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h *= 60;
        }

        setHsl(
          `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
            l * 100
          )}%)`
        );
      } else if (isValidRgb(color)) {
        const rgbValues = color.match(/\d+/g)?.map(Number) || [];
        if (rgbValues.length === 3) {
          const [r, g, b] = rgbValues;
          setHex(
            `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
          );
          setRgb(color);
        }
      } else {
        console.error("Invalid color format");
      }
    } catch (error) {
      console.error("Error processing color:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
        <CardDescription>
          Transform colors between Hex, RGB, and HSL formats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="color-input">Enter Color</Label>
            <Input
              id="color-input"
              placeholder="#FFFFFF or rgb(255, 255, 255)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Hex</Label>
              <Input readOnly value={hex} />
            </div>
            <div>
              <Label>RGB</Label>
              <Input readOnly value={rgb} />
            </div>
            <div>
              <Label>HSL</Label>
              <Input readOnly value={hsl} />
            </div>
          </div>
          <div
            className="h-20 w-full rounded"
            style={{ backgroundColor: hex }}
          />
          <Button onClick={convertColor}>Convert</Button>
        </div>
      </CardContent>
    </Card>
  );
}
