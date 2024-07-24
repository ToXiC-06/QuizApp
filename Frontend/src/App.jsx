import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import AuthProvider from "./contexts/AuthProvider";
import QuizProvider from "./contexts/QuizProvider";
import AdminProvider from "./contexts/AdminProvider";

import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./components/AdminPage";
import AppLayOut from "./pages/AppLayOut";
import AdminPageLayout from "./pages/AdminPageLayout";
import AdminQuestions from "./components/AdminQuestions";
import AdminStats from "./components/AdminStats";
import AdminEdit from "./components/AdminEdit";
import AdminAdd from "./components/AdminAdd";

function App() {
  return (
    <QuizProvider>
      <AdminProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="container-fluid">
              <Routes>
                <Route element={<AppLayOut />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/auth">
                    <Route index element={<LoginPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="admin-login" element={<AdminLoginPage />} />
                  </Route>

                  <Route path="/quiz" element={<QuizPage />} />
                  <Route element={<AdminPageLayout />}>
                    <Route path="/admin-panel" element={<AdminPage />} />
                    <Route
                      path="/admin-panel/questions"
                      element={<AdminQuestions />}
                    />
                    <Route
                      path="/admin-panel/questions/edit"
                      element={<AdminEdit />}
                    />
                    <Route
                      path="/admin-panel/questions/add"
                      element={<AdminAdd />}
                    />

                    <Route path="/admin-panel/stats" element={<AdminStats />} />
                  </Route>
                  <Route />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </AdminProvider>
    </QuizProvider>
  );
}

export default App;
