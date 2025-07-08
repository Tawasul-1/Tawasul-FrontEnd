import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
