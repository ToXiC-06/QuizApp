import { useQuizDispatch, useQuizState } from "../contexts/QuizProvider";

export default function NextQuestion() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();
  const questionsNums = state.questions.length;

  if (state.answer === null) return;

  if (state.index < questionsNums - 1) {
    return (
      <div>
        <button
          className="btn btn-outline-dark rounded-pill m-3"
          onClick={() => dispatch({ type: "quiz/nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  }

  if (state.index === questionsNums - 1) {
    return (
      <div>
        <button
          className="btn btn-outline-dark rounded-pill m-3"
          onClick={() => dispatch({ type: "quiz/finish" })}
        >
          Finish
        </button>
      </div>
    );
  }
}
