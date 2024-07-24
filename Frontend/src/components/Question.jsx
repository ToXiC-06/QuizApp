import { useQuizState } from "../contexts/QuizProvider";
import Option from "./Option";

export default function Question() {
  const state = useQuizState();

  const question = state.questions.at(state.index);

  return (
    <div>
      <h4>{question.Question}</h4>
      <Option question={question} />
    </div>
  );
}
