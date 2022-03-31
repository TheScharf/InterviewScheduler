import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  ////// Transitions to a new Mode //////
  function transition(newMode, replace = false) {
    setMode(newMode);
    if(!replace) {
      setHistory((prev) => [...prev, newMode]);
    }
  };
  ////// Goes back to a previous Mode //////
  function back() {
    setHistory((prev) => {
      const newHistory = [...prev].slice(0, -1);
      if (newHistory.length >= 1) {
        setMode(newHistory[newHistory.length - 1]);
      }
      return newHistory;
    })  
  }
  return { mode, transition, back };
}