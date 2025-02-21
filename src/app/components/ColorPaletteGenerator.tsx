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

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = React.useState("#3B82F6");
  const [palette, setPalette] = React.useState([
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
    "#DBEAFE",
  ]);

  const generatePalette = () => {
    const hsl = hexToHSL(baseColor);
    const newPalette = [
      baseColor,
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.1, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.2, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.3, 1)),
      hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 0.4, 1)),
    ];
    setPalette(newPalette);
  };

  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    const r = Number.parseInt(result[1], 16) / 255;
    const g = Number.parseInt(result[2], 16) / 255;
    const b = Number.parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
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
      h /= 6;
    }
    return { h, s, l };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette Generator</CardTitle>
        <CardDescription>
          Generate harmonious color combinations for your projects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="base-color">Base Color</Label>
            <Input
              id="base-color"
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="h-12 w-12 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="mt-1 text-xs">{color}</span>
              </div>
            ))}
          </div>
          <Button onClick={generatePalette}>Generate Palette</Button>
        </div>
      </CardContent>
    </Card>
  );
}
