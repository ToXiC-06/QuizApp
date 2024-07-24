import { Link, Outlet } from "react-router-dom";
import styles from "./AdminPageLayout.module.css";

export default function AdminPage() {
  const adminBoard = localStorage.getItem("adminBoard");

  return (
    <div className={`d-flex flex-column align-items-center ${styles.admin}`}>
      <h3 className="mb-4 p-2">Admin&apos;s Panel</h3>
      {adminBoard ? (
        <>
          <div className="mb-4 w-75 d-flex justify-content-around">
            <span className="bi bi-house-fill">
              {" "}
              <Link
                to={"/admin-panel"}
                className="text-decoration-none text-primary"
              >
                Home
              </Link>
            </span>
            <span className="bi bi-bullseye">
              <Link
                to={"/admin-panel/questions"}
                className="text-decoration-none text-primary"
              >
                QuestionsPage
              </Link>{" "}
            </span>
            <span className="bi bi-bullseye">
              <Link
                to={"/admin-panel/stats"}
                className="text-decoration-none text-primary"
              >
                StatsPage
              </Link>{" "}
            </span>
          </div>

          <Outlet />
        </>
      ) : (
        <p className="text-danger">
          You are not authorised.
          <Link to={"/auth/admin-login"}>Login here...</Link>
        </p>
      )}
    </div>
  );
}
