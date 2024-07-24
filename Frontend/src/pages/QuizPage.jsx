import { useEffect } from "react";
import Error from "../components/Error";
import Finished from "../components/Finished";
import Loader from "../components/Loader";
import NextQuestion from "../components/NextQuestion";
import Question from "../components/Question";
import QuizFooter from "../components/QuizFooter";
import StartScreen from "../components/StartScreen";
import Timer from "../components/Timer";
import { useQuizDispatch, useQuizState } from "../contexts/QuizProvider";

export default function QuizPage() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  const email = localStorage.getItem("email");

  useEffect(
    function () {
      fetch(`http://localhost:4040/user/${email}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "user/fetched", payload: data }))
        .catch(() => dispatch({ type: "user/failed" }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [state.user, email, dispatch]
  );

  useEffect(function () {
    dispatch({ type: "questions/fetching" });
    fetch("http://localhost:4040/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "questions/fetched", payload: data }))
      .catch(() => dispatch({ type: "questions/failed" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authToken = localStorage.getItem("authToken");
  return (
    <div>
      {authToken ? (
        <>
          <h1>React Quiz Test</h1>
          <hr></hr>
          {state.user[0]?.HasAttended ? (
            <main>
              You have already attempted the exam and secured{" "}
              <span>{state.user[0]?.Score}</span> points.
            </main>
          ) : (
            <main>
              {state.status === "loading" && <Loader />}
              {state.status === "ready" && <StartScreen />}
              {state.status === "error" && <Error />}
              {state.status === "active" && (
                <>
                  <Question />
                  <QuizFooter>
                    <Timer />
                    <NextQuestion />
                  </QuizFooter>
                </>
              )}
              {state.status === "finished" && <Finished />}
            </main>
          )}
        </>
      ) : (
        <p className="text-danger">
          User is not autherized. Login to get access
        </p>
      )}
    </div>
  );
}
