import React, { useCallback, useEffect, useRef, useState } from "react";
import StopwatchIcon from "../assets/StopwatchIcon.tsx";
import Button from "@/ui/button.tsx";

interface StopwatchProps {
  id: number;
}

const Stopwatch: React.FC<StopwatchProps> = (id) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const updateTimer = useCallback(() => {
    if (!startTimeRef.current) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - startTimeRef.current;

    setTime(timeRef.current + deltaTime);
  }, []);

  const handleStartStop = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = performance.now();
      intervalIdRef.current = window.setInterval(updateTimer, 100);
      setIsRunning(true);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
  
      timeRef.current += performance.now() - (startTimeRef.current || 0);
      startTimeRef.current = null;
      setIsRunning(false);
    }
  }, [isRunning, updateTimer]);

  const handleReset = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    setTime(0);
    timeRef.current = 0;
    startTimeRef.current = null;
    setIsRunning(false);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);

    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");
    const millisecondsString = milliseconds.toString().padStart(3, "0");

    return `${minutesString}:${secondsString}.${millisecondsString}`;
  };

  return (
    <div className="p-4 border border-input rounded-lg min-h-48 flex flex-col justify-between">
      <div className={"flex flex-col gap-2 items-center"}>
        <StopwatchIcon />
        <p className={`${isRunning ? "" : "opacity-70"}`}>{formatTime(time)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
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
