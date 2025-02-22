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

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = React.useState("");
  const [date, setDate] = React.useState("");

  const convertTimestamp = () => {
    const dateObj = new Date(parseInt(timestamp) * 1000);
    setDate(dateObj.toISOString());
  };

  const convertDate = () => {
    const dateObj = new Date(date);
    setTimestamp(Math.floor(dateObj.getTime() / 1000).toString());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timestamp Unit Converter</CardTitle>
        <CardDescription>
          Convert between timestamps and readable dates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="timestamp-input">Unix Timestamp</Label>
            <Input
              id="timestamp-input"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter Unix timestamp"
            />
          </div>
          <Button onClick={convertTimestamp}>Convert to Date</Button>
          <div>
            <Label htmlFor="date-input">ISO 8601 Date</Label>
            <Input
              id="date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DDTHH:mm:ss.sssZ"
            />
          </div>
          <Button onClick={convertDate}>Convert to Timestamp</Button>
        </div>
      </CardContent>
    </Card>
  );
}
