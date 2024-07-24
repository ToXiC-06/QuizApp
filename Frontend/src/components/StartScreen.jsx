import Button from "../components/Button";
import { useQuizDispatch } from "../contexts/QuizProvider";

export default function StartScreen() {
  const dispatch = useQuizDispatch();

  function handleClick() {
    dispatch({ type: "quiz/start" });
  }

  return (
    <div className="text-center w-100">
      <Button onClick={handleClick}>Start Quiz</Button>
    </div>
  );
}
