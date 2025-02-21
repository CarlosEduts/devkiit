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

export default function CSSUnitConverter() {
  const [value, setValue] = React.useState(0);
  const [fromUnit, setFromUnit] = React.useState("px");
  const [toUnit, setToUnit] = React.useState("em");
  const [result, setResult] = React.useState(0);

  const units = ["px", "em", "rem", "%", "vw", "vh"];

  const convert = () => {
    // This is a simplified conversion. In a real-world scenario, you'd need more complex logic
    // and possibly consider the context (e.g., font-size for em conversions)
    if (fromUnit === toUnit) {
      setResult(value);
    } else if (fromUnit === "px" && toUnit === "em") {
      setResult(value / 16);
    } else if (fromUnit === "em" && toUnit === "px") {
      setResult(value * 16);
    } else {
      setResult(value); // For other conversions, we'd need more context
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Unit Converter</CardTitle>
        <CardDescription>Convert between different CSS units.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={value}
                onChange={(e) =>
                  setValue(Number.parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <Label htmlFor="to-value">To</Label>
              <Input id="to-value" type="number" value={result} readOnly />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-unit">From Unit</Label>
              <select
                id="from-unit"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="to-unit">To Unit</Label>
              <select
                id="to-unit"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={convert}>Convert</Button>
        </div>
      </CardContent>
    </Card>
  );
}
