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

export default function SecurePasswordGenerator() {
  const [length, setLength] = React.useState(16);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);
  const [generatedPassword, setGeneratedPassword] = React.useState("");

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let chars = lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setGeneratedPassword(password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Password Generator</CardTitle>
        <CardDescription>
          Create strong and customizable passwords.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="password-length">Password Length</Label>
            <Input
              id="password-length"
              type="number"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-uppercase"
              className="h-4 w-4"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <Label htmlFor="include-uppercase">Include Uppercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-numbers"
              className="h-4 w-4"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <Label htmlFor="include-numbers">Include Numbers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-symbols"
              className="h-4 w-4"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <Label htmlFor="include-symbols">Include Symbols</Label>
          </div>
          <Input readOnly value={generatedPassword} />
          <Button onClick={generatePassword}>Generate Password</Button>
        </div>
      </CardContent>
    </Card>
  );
}