import Button from "./Button";
import axios from "axios";
import { useAdminDispatch } from "../contexts/AdminProvider";
import { useNavigate } from "react-router-dom";

export default function Card({ question }) {
  const dispatch = useAdminDispatch();
  const navigate = useNavigate();

  function handleEditClick() {
    // dispatch({ type: "admin/edited" });
    dispatch({ type: "admin/editing", payload: question });
    navigate("edit");
  }

  function handleDeleteClick() {
    const flag = window.confirm("Want to delete this item?");
    if (flag)
      axios
        .delete(`http://localhost:4040/delete-question/${question._id}`)
        .then((res) => {
          if (res.data.success) {
            alert("deleted");
            axios
              .get("http://localhost:4040/questions")
              .then((res) => {
                dispatch({ type: "question/fetched", payload: res.data });
              })
              .catch(() => {
                dispatch({ type: "admin/error" });
              });
          }
        });
  }

  return (
    <div
      className="bg-info-subtle text-dark gap-3 overflow-auto d-flex flex-column justify-content-between"
      style={{ width: "45%", height: "200px" }}
    >
      <h6>{question.Question}</h6>
      <p>
        Options:
        <br />
        <span className="text-success">{question?.Options.toString()}</span>
      </p>

      <div className="text-left ms-3 mb-1">
        <Button onClick={handleEditClick} type="warning">
          <span className="bi bi-pen-fill"></span>
        </Button>
        <Button type="danger" onClick={handleDeleteClick}>
          <span className="bi bi-trash-fill"></span>
        </Button>
      </div>
    </div>
  );
}
