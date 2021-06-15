import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(arg, isReplacing) {
    if (!isReplacing || isReplacing === undefined) {
      setMode(arg);
      history.push(arg);
    }
    if (isReplacing === true) {
      history.pop();
      history.push(arg);
      setMode(arg);
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
    }
  }

  return { mode, transition, back };
}
