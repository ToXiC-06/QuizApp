import { useQuizDispatch, useQuizState } from "../contexts/QuizProvider";
import styles from "./Option.module.css";

export default function Option({ question }) {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  const hasAnswered = state.answer !== null;

  return (
    <div>
      {question.Options.map((option, index) => (
        <button
          className={`${styles.btn} ${styles.btnOption} ${
            index === state.answer ? `${styles.answer}` : ""
          }  ${
            hasAnswered
              ? index === question.CorrectOption
                ? `${styles.correct}`
                : `${styles.wrong}`
              : ""
          } `}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "quiz/newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
