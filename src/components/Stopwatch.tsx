import React, { useState } from "react";
import StopwatchIcon from "../assets/StopwatchIcon.tsx";
import { Button } from "./ui/button.tsx";
import { runMicrotaskInterval } from "@/utils/index.ts";

const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [microtaskInterval, setMicrotaskInterval] = useState<{
    stop: () => void;
  } | null>(null);
  const minutes: number = Math.floor((time % 360000) / 6000);
  const seconds: number = Math.floor((time % 6000) / 100);
  const milliseconds: number = time % 100;
  const timeString: string = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;

  const handleStartStop = async () => {
    if (isRunning) {
      setIsRunning(false);
      microtaskInterval?.stop();
    } else {
      setIsRunning(true);
      setMicrotaskInterval(
        runMicrotaskInterval<number, void>(
          () => setTime((prevTime) => prevTime + 1),
          100
        )
      );
    }
  };

  const handleReset = async () => {
    microtaskInterval?.stop();
    setMicrotaskInterval(null);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div
      className="p-4 border border-input rounded-lg min-h-48 flex flex-col justify-between"
    >
      <div className={"flex flex-col gap-2 items-center"}>
        <StopwatchIcon />
        <p className={`${isRunning ? "" : "opacity-70"}`}>{timeString}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg" onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          disabled={time === 0}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
