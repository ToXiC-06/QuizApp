import { useNavigate } from "react-router-dom";
import { useQuizDispatch, useQuizState } from "../contexts/QuizProvider";
import Button from "./Button";
import axios from "axios";

export default function Finished() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();
  const navigate = useNavigate();

  const maxPoints = state.questions.reduce(
    (accumulator, curValue) => accumulator + curValue.Points,
    0
  );

  const percentage = Math.ceil((state.points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage > 80 && percentage < 100) emoji = "🎉";
  if (percentage > 50 && percentage <= 80) emoji = "🙂";
  if (percentage > 0 && percentage <= 50) emoji = "😶";
  if (percentage === 0) emoji = "🤦🏻";

  function handleClick() {
    dispatch({ type: "quiz/restart" });

    axios
      .put("http://localhost:4040/user/update", {
        Email: state.user[0]?.Email,
        Score: state.points,
        HasAttended: true,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/quiz");
        }
      })
      .catch((e) => console.log(e.message));
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored {state.points} out of {maxPoints} (
        {percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {state.highscore} points)</p>
      <Button type="outline-dark" onClick={handleClick}>
        Finish Quiz
      </Button>
    </>
  );
}
