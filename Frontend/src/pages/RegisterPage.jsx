import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Button from "../components/Button";
import styles from "./RegisterPage.module.css";
import { useAuthDispatch, useAuthState } from "../contexts/AuthProvider";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const dispatch = useAuthDispatch();
  const { isLoading, errors } = useAuthState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "auth/fetching" });
    axios
      .post("http://localhost:4040/add-user", {
        Email: email,
        UserName: userName,
        Password: password,
        Mobile: mobile,
      })
      .then((res) => {
        dispatch({ type: "auth/fetched" });
        if (res.data.errors) {
          res.data.errors.map((item) => {
            if (item.path === "Email")
              dispatch({ type: "auth/emailError", payload: item.msg });
            if (item.path === "Password")
              dispatch({ type: "auth/passwordError", payload: item.msg });
          });
        } else if (res.data.success) {
          navigate("/auth/login");
          dispatch({ type: "auth/reset" });
        } else if (!res.data.success) {
          dispatch({ type: "auth/emailError", payload: res.data.errorMsg });
        }
      })
      .catch();
  }

  return (
    <div
      className={`border border-black-2 w-50 p-3 bg-dark text-white ${styles.register}`}
    >
      ......................................................................................................................................................................................................
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center h2 text-warning">Register User </div>
          <form onSubmit={handleSubmit}>
            <h6 className="mt-2 mb-1">Email: </h6>
            <input
              name="Email"
              value={email}
              placeholder="Enter your email"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
            <h6 className="mt-2 mb-1">Username: </h6>
            <input
              name="UserName"
              value={userName}
              placeholder="Enter your email"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <h6 className="mt-2 mb-1">Password: </h6>
            <input
              name="Password"
              value={password}
              placeholder="Enter your Password"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
            <h6 className="mt-2 mb-1">Mobile no: </h6>
            <input
              name="Mobile"
              value={mobile}
              placeholder="Enter your Mobile"
              className="border-0 w-100 p-1 rounded"
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <div className="text-center mt-4">
              <Button type="warning">Register</Button>
            </div>

            <div className={`text-center mt-4`}>
              <Link to={"/auth/login"} className={` text-decoration-none`}>
                Already have an account!
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
