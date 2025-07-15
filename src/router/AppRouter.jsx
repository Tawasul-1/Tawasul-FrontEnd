import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";
import NewPassword from "../Pages/NewPassword";
import Signup from "../Pages/Signup";
import Board from "../Pages/Board";
import HomePage from "../Pages/Home";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import Plan from "../Pages/Plan";
import Selection from "../Pages/Selection";
import AddNewCard from "../Pages/AddNewCard";
import EmailVerification from "../Pages/EmailVerification";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Success from "../Pages/Success";
import Cat from "../Pages/Cat";
import Items from "../Pages/Items";
import Item from "../Pages/Item";
import Test from "../Pages/Test";
import Test2 from "../Pages/Test2";
import Test3 from "../Pages/Test3";
import HowUse from "../Pages/HowUse";
import LearnDone from "../Pages/LearnDone";
import ProtectedRoute from "../Components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/newpass" element={<NewPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/items" element={<Items />} />
          <Route path="/item/:itemName" element={<Item />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test3" element={<Test3 />} />
          <Route path="/howuse" element={<HowUse />} />
          <Route path="/learn" element={<LearnDone />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-Profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <Plan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selection"
            element={
              <ProtectedRoute>
                <Selection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addnewcard"
            element={
              <ProtectedRoute>
                <AddNewCard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
