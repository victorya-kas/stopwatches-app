import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function runMicrotaskInterval<T, R>(
  fn: (arg?: T) => R,
  interval: number
): {stop: () => void} | null {
  let timeout1: undefined | ReturnType<typeof setTimeout>;
  let timeout2: undefined | ReturnType<typeof setTimeout>;
  let isRunning: undefined | boolean;
  if (isRunning) return null;
  isRunning = true;

  async function execute() {
    while (isRunning) {
      await new Promise<void>((resolve) => {
        timeout1 = setTimeout(() => {
          fn();
          resolve();
        }, interval);
      });
    }
  }

  execute();

  return {
    stop: () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        isRunning = false;
    },
  };
}
