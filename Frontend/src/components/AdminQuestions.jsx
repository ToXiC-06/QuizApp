import { useEffect } from "react";
import axios from "axios";

import Loader from "./Loader";
import { useAdminDispatch, useAdminState } from "../contexts/AdminProvider";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function AdminQuestions() {
  const dispatch = useAdminDispatch();
  const state = useAdminState();
  const navigate = useNavigate();

  useEffect(function () {
    dispatch({ type: "admin/fetching" });

    axios
      .get("http://localhost:4040/questions")
      .then((res) => {
        dispatch({ type: "question/fetched", payload: res.data });
      })
      .catch(() => {
        dispatch({ type: "admin/error" });
      });
  }, []);

  function handleAddClick() {
    navigate("add");
  }

  return (
    <div className="w-100">
      {state.isLoading ? (
        <Loader />
      ) : (
        <main className="d-flex flex-wrap gap-2 row-gap-4 justify-content-between">
          {state.errors?.fetch ? (
            <p className="text-danger">
              There was a error while fetching the data
            </p>
          ) : (
            <>
              {state.questions.map((item) => (
                <Card key={item._id} question={item} />
              ))}
              <div
                onClick={handleAddClick}
                className="bg-info-subtle text-dark gap-3 overflow-auto d-flex flex-column  justify-content-center align-items-center"
                style={{ width: "45%", height: "200px" }}
              >
                <div className="h2 bi bi-plus-circle"></div>
                <p>Add Question</p>
              </div>
            </>
          )}
        </main>
      )}
    </div>
  );
}
