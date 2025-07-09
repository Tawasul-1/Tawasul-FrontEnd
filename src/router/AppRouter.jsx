import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";
import NewPassword from "../Pages/NewPassword";
import Signup from "../Pages/Signup";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword/>} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
