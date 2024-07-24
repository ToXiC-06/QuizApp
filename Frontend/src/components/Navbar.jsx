import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    const flag = window.confirm("Are you sure want to logout?");
    if (flag) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminBoard");
      localStorage.removeItem("email");

      navigate("/");
    }
  }
  return (
    <header className="p-3 d-flex w-100 justify-content-between">
      <h1 className="text-center ms-3">
        <Link to={"/"} className="text-decoration-none brand">
          Quiz Application
        </Link>
      </h1>
      <div className="h2 float-left">
        <Button type="dark" to={"auth/admin-login"}>
          <span className="bi bi-person-fill">Admin</span>
        </Button>
        <Button to={"auth/login"}>
          <span className="bi bi-person-fill"> UserLogin</span>
        </Button>
        <Button onClick={handleLogout} type="danger">
          <span className="bi bi-arrow-right"> LogOut</span>
        </Button>
      </div>
    </header>
  );
}
