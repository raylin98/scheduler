import { useState } from "react";

// Custom hook to handle different modes and keep track of the previous modes for navigation
export default function useVisualMode(initial) {
  // Set the current mode state and the history of modes state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Function to switch to a new mode and update the history accordingly
  const transition = (newMode, replace = false) => {
    // Update the current mode state
    setMode(newMode);

    // Update the history based on whether we want to replace the last mode or add a new one
    setHistory(prevHistory => {
      if (replace) {
        // If replace is true, remove the last mode from the history and add the new mode
        return [...prevHistory.slice(0, prevHistory.length - 1), newMode];
      } else {
        // If replace is false, simply add the new mode to the history
        return [...prevHistory, newMode];
      }
    });
  };

  // Function to go back to the previous mode in history
  const back = () => {
    if (history.length > 1) {
      // Set the previous mode as the current mode
      setMode(history[history.length - 2]);

      // Remove the last mode from the history
      setHistory(prevHistory => [...prevHistory.slice(0, prevHistory.length - 1)]);
    }
  };

  // Return the current mode, the function to switch to a new mode, and the function to go back
  return { mode, transition, back };
}
