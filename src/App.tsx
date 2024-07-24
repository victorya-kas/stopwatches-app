import React, { ReactNode, useState } from "react";
import Stopwatch from "./components/Stopwatch.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <main className="bg-slate-600 flex flex-col gap-8 items-center min-h-screen p-20 text-white">
      <h1 className="text-5xl">Stopwatches</h1>
      <div className="flex flex-wrap items-center gap-4">
        <Stopwatch />
        <Stopwatch />
      </div>
    </main>
  );
};

export default App;
