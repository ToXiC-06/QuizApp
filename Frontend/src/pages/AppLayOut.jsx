import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayOut() {
  return (
    <div
      style={{ height: "100dvh" }}
      className="d-flex flex-column justify-content-between align-items-center"
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
