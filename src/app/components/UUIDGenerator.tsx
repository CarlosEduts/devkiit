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

export default function UUIDGenerator() {
  const [uuid, setUuid] = React.useState("");

  const generateUUID = () => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    setUuid(newUuid);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UUID Generator</CardTitle>
        <CardDescription>
          Generate universally unique identifiers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input readOnly value={uuid} />
          {uuid && (
            <Button onClick={() => navigator.clipboard.writeText(uuid)}>
              Copy Output
            </Button>
          )}
          <Button onClick={generateUUID}>Generate UUID</Button>
        </div>
      </CardContent>
    </Card>
  );
}
