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

export default function EmojiUnicodeConverter() {
  const [emoji, setEmoji] = React.useState("");
  const [unicodeCode, setUnicodeCode] = React.useState("");

  const convertToUnicode = () => {
    const unicode = emoji.codePointAt(0)?.toString(16);
    setUnicodeCode(unicode ? `U+${unicode.toUpperCase()}` : "");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emoji to Unicode Converter</CardTitle>
        <CardDescription>
          Convert emojis to their Unicode representation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="emoji-input">Enter an emoji</Label>
            <Input
              id="emoji-input"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="Enter an emoji"
            />
          </div>
          <Button onClick={convertToUnicode}>Convert</Button>
          <div>
            <Label>Unicode Code</Label>
            <Input readOnly value={unicodeCode} />
            {unicodeCode && (
              <Button
                onClick={() => navigator.clipboard.writeText(unicodeCode)}
                className="w-full mt-3"
              >
                Copy Unicode
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
