import { useAdminDispatch, useAdminState } from "../contexts/AdminProvider";
import { useEffect } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
import TableRow from "./TableRow.jsx";

export default function AdminStats() {
  const dispatch = useAdminDispatch();
  const state = useAdminState();

  console.log(state.user);

  const quizAppered = state.user?.filter((item) => item.HasAttended === true);
  console.log(quizAppered);

  useEffect(function () {
    dispatch({ type: "admin/fetching" });

    axios
      .get("http://localhost:4040/user")
      .then((res) => {
        dispatch({ type: "user/fetched", payload: res.data });
      })
      .catch(() => {
        dispatch({ type: "admin/error" });
      });
  }, []);

  return (
    <div className="text-start">
      {state.isLoading ? (
        <Loader />
      ) : (
        <>
          <ul>
            <li>
              <h5>
                Total {state.user?.length || 0} peoples have registered in our
                app and {quizAppered?.length || 0} peoples gave quiz tests.
              </h5>
            </li>
          </ul>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Score</th>
                <th scope="col">HasAttended</th>
              </tr>
            </thead>
            <tbody>
              {state.user?.map((item, index) => (
                <TableRow key={item._id} item={item} index={index + 1} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
