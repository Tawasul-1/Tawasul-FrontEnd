import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "../Pages/Signup";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;