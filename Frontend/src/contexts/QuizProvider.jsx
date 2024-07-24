import { createContext, useContext, useReducer } from "react";

const QuizStateContext = createContext();
const QuizDispatchContext = createContext();

const SECS_PER_QUES = 30;

const initialState = {
  //loading, ready, error, active, finished
  status: "ready",
  questions: [],
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  tick: null,
  user: {},
  isLoading: false,
};

function reducer(state, action) {
  const question = state.questions.at(state.index);

  switch (action.type) {
    case "questions/fetching":
      return { ...state, status: "loading" };

    case "questions/fetched":
      return { ...state, status: "ready", questions: action.payload };
    case "questions/failed":
      return { ...state, status: "error" };
    case "user/fetching":
      return { ...state, isLoading: true };
    case "user/fetched":
      return { ...state, isLoading: false, user: action.payload };
    case "user/failed":
      return { ...state, status: "error" };

    case "quiz/start":
      return {
        ...state,
        status: "active",
        tick: state.questions.length * SECS_PER_QUES,
      };
    case "quiz/newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          question.CorrectOption == action.payload
            ? state.points + question.Points
            : state.points,
      };
    case "quiz/nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "quiz/finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "quiz/restart":
      return {
        ...initialState,
        status: "ready",
        user: state.user,
        questions: state.questions,
        highscore: state.highscore,
      };
    case "quiz/timer":
      return {
        ...state,
        tick: state.tick - 1,
        status: state.tick === 0 ? "finished" : state.status,
      };
    default:
      alert("Invalide action.");
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
}

export function useQuizState() {
  const context = useContext(QuizStateContext);

  if (context === undefined) {
    throw new Error("QuizStateContext was used outside the QuizStateProvider.");
  }

  return context;
}

export function useQuizDispatch() {
  const context = useContext(QuizDispatchContext);

  if (context === undefined) {
    throw new Error(
      "QuizDispatchContext was used outside the QuizDispatchProvider."
    );
  }

  return context;
}
