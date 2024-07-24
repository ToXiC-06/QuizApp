import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Button from "../components/Button";
import styles from "./LoginPage.module.css";
import { useAuthDispatch, useAuthState } from "../contexts/AuthProvider";
import Loader from "../components/Loader";

export default function AdminLoginPage() {
  const dispatch = useAuthDispatch();
  const { errors, isLoading } = useAuthState();
  console.log(errors);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const adminBoard = localStorage.getItem("adminBoard");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "auth/fetching" });
    axios
      .post("http://localhost:4040/admin-login", {
        Email: email,
        Password: password,
      })
      .then((res) => {
        dispatch({ type: "auth/fetched" });
        if (res.data.success) {
          localStorage.setItem("adminBoard", true);
          dispatch({ type: "auth/reset" });
          navigate("/admin-panel");
        } else {
          if (res.data.errorMsg === "Incorrect Password.") {
            dispatch({
              type: "auth/passwordError",
              payload: res.data.errorMsg,
            });
          } else {
            dispatch({ type: "auth/emailError", payload: res.data.errorMsg });
          }
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  if (adminBoard) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h3 className="mb-3">Admin is Already Login.</h3>
        <Button onClick={() => navigate("/admin-panel")}>
          Move to Admin Page
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`border border-black-2 w-50 p-3 bg-dark text-white ${styles.login}`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center h2 text-warning">Admin Board </div>
          <form onSubmit={handleSubmit}>
            <h6 className="mt-2 mb-1">Email: </h6>
            <input
              name="Email"
              placeholder="Enter your email"
              className="border-0 w-100 p-1 rounded"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <h6 className="mt-2 mb-1">Password: </h6>
            <input
              name="Password"
              placeholder="Enter your Password"
              className="border-0 w-100 p-1 rounded"
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}

            <div className="text-center mt-4">
              <Button type="warning">Sign In</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
