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

export default function PomodoroTimer() {
  const [time, setTime] = React.useState(25 * 60);
  const [isActive, setIsActive] = React.useState(false);
  const [workDuration, setWorkDuration] = React.useState(25);
  const [breakDuration, setBreakDuration] = React.useState(5);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(workDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>
          Boost your productivity with the Pomodoro Technique.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="text-center">
            <span className="text-6xl font-bold">{formatTime(time)}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <Button onClick={toggleTimer}>
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button variant="outline" onClick={resetTimer}>
              Reset
            </Button>
          </div>
          <div>
            <Label htmlFor="work-duration">Work Duration (minutes)</Label>
            <Input
              id="work-duration"
              type="number"
              min="1"
              max="60"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number.parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="break-duration">Break Duration (minutes)</Label>
            <Input
              id="break-duration"
              type="number"
              min="1"
              max="30"
              value={breakDuration}
              onChange={(e) =>
                setBreakDuration(Number.parseInt(e.target.value))
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
