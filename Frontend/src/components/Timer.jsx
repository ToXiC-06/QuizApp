import { useEffect } from "react";
import { useQuizDispatch, useQuizState } from "../contexts/QuizProvider";

export default function Timer() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  const mins = Math.floor(state.tick / 60);
  const secs = state.tick % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "quiz/timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="border border-dark border-1 m-3 p-2 rounded-pill bg-dark text-white">
      {mins < 10 ? "0" + mins : mins} : {secs < 10 ? "0" + secs : secs}
    </div>
  );
}
