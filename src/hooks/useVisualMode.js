import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    const newHistory = [...history, newMode];
    if(!replace) {
      setHistory(newHistory);
    }
  };
  function back() {
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    if (newHistory.length >= 1) {
      setMode(newHistory[newHistory.length - 1]);
    }
  }  

  return { mode, transition, back };
}