import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useAdminDispatch, useAdminState } from "../contexts/AdminProvider";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function AdminEdit() {
  const state = useAdminState();
  const dispatch = useAdminDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(state.editQuestion.Question);
  const [options, setOptions] = useState(state.editQuestion.Options || {});
  const [correctOption, setCorrectOption] = useState(
    state.editQuestion.CorrectOption
  );
  const [points, setPoints] = useState(state.editQuestion.Points);

  console.log(options);
  console.log(state.editQuestion);
  function handleEditClick() {
    dispatch({ type: "admin/fetching" });
    axios
      .put("http://localhost:4040/edit-question", {
        Id: state.editQuestion._id,
        Question: question,
        Options: options,
        CorrectOption: correctOption,
        Points: points,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Edited");
        } else {
          console.log("can't able to edit");
        }
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        dispatch({ type: "admin/reset" });
        navigate("/admin-panel/questions");
      });
  }

  return (
    <div className="w-50 bg-dark rounded text-white">
      {state.isLoading ? (
        <Loader />
      ) : (
        <>
          <h4 className="text-center">Edit Question</h4>
          <form className="mx-3">
            <h6 className="mt-2 mb-1">Question: </h6>
            <input
              name="Email"
              value={question}
              placeholder="Enter question"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            {/* {errors.email && <p className="text-danger">{errors.email}</p>} */}
            <h6 className="mt-2 mb-1">Options: </h6>
            <input
              name="UserName"
              value={options}
              placeholder="Enter all options with comma"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setOptions(e.target.value)}
              required
            />
            <h6 className="mt-2 mb-1">
              Correct option:{" "}
              <span className="fw-normal">
                Always give answer + 1 to match index
              </span>
            </h6>
            <input
              name="Password"
              value={correctOption}
              placeholder="Enter correct option"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setCorrectOption(e.target.value)}
              type="number"
              required
            />
            {/* {errors.password && <p className="text-danger">{errors.password}</p>} */}
            <h6 className="mt-2 mb-1">Points: </h6>
            <input
              name="Mobile"
              value={points}
              placeholder="Enter Points"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setPoints(e.target.value)}
              required
              type="number"
            />

            <div className="text-center my-2">
              <Button onClick={handleEditClick} type="warning">
                Edit
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
