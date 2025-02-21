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

export default function ColorConverter() {
    const [input, setInput] = React.useState("");
    const [hex, setHex] = React.useState("#FFFFFF");
    const [rgb, setRgb] = React.useState("rgb(255, 255, 255)");
    const [hsl, setHsl] = React.useState("hsl(0, 0%, 100%)");
  
    const convertColor = () => {
      let color;
      try {
        color = input.trim();
        if (color.startsWith("#")) {
          // Convert HEX to RGB
          const r = Number.parseInt(color.slice(1, 3), 16);
          const g = Number.parseInt(color.slice(3, 5), 16);
          const b = Number.parseInt(color.slice(5, 7), 16);
          setHex(color);
          setRgb(`rgb(${r}, ${g}, ${b})`);
          // Convert RGB to HSL (simplified conversion)
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const l = (max + min) / 2;
          const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
          const h =
            max === min
              ? 0
              : max === r
              ? 60 * ((g - b) / (max - min))
              : max === g
              ? 60 * (2 + (b - r) / (max - min))
              : 60 * (4 + (r - g) / (max - min));
          setHsl(
            `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
              l * 100
            )}%)`
          );
        } else if (color.startsWith("rgb")) {
          // Parse RGB values
          const [r, g, b] = color.match(/\d+/g)!.map(Number);
          // Convert RGB to HEX
          setHex(
            `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
          );
          setRgb(color);
          // Convert RGB to HSL (same as above)
          // ... (implement HSL conversion)
        }
      } catch (error) {
        console.error("Invalid color format");
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