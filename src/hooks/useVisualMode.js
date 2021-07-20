import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(arg, isReplacing) {
    if (!isReplacing || isReplacing === undefined) {
      setMode(arg);
      let newHistory = [...history];
      newHistory.push(arg);
      setHistory(newHistory);
    }
    if (isReplacing === true) {
      let newHistory = [...history];
      newHistory.pop();
      newHistory.push(arg);
      setHistory(newHistory);
      setMode(arg);
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      let newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
