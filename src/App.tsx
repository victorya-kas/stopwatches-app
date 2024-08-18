import React, { useState, ReactNode } from "react";
import Stopwatch from "./components/Stopwatch.tsx";
import "./index.css";
import Button from "@/ui/button.tsx";

const App: React.FC = () => {
  const [stopwatches, setStopwatches] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  const handleAddStopwatch = () => {
    if (stopwatches.length >= 2) return;
    setError("");
    setStopwatches((prevStopwatches) => [...prevStopwatches, Date.now()]);
  };

  const handleRemoveStopwatch = () => {
    const removedStopwatchItem: number = stopwatches[stopwatches.length - 1];
    const newStopwatchesList: number[] = stopwatches.filter(
      (stopwatch: number) => stopwatch !== removedStopwatchItem
    );
    setStopwatches(newStopwatchesList);
  };

  return (
    <main className="bg-slate-600 flex flex-col gap-8 items-center min-h-screen p-20 text-white">
      <h1 className="text-5xl">Stopwatches</h1>
      <div className="flex gap-4">
        <Button size="lg" disabled={stopwatches.length >= 2} onClick={handleAddStopwatch}>
          Add
        </Button>
        <Button
          variant="outline"
          size="lg"
          disabled={!stopwatches?.length}
          onClick={handleRemoveStopwatch}
        >
          Remove
        </Button>
      </div>
      {!!error && <p className={"text-center text-error"}>{error}</p>}
      {stopwatches?.length > 0 && (
        <div className={"flex gap-8"}>
          {stopwatches?.map(
            (id: number, idx: number): ReactNode => (
              <Stopwatch key={id} id={idx + 1} />
            )
          )}
        </div>
      )}
    </main>
  );
};

export default App;
