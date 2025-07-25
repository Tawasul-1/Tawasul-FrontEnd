import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";
import NewPassword from "../Pages/NewPassword";
import Signup from "../Pages/Signup";
import Board from "../Pages/Board";
import HomePage from "../Pages/Home";
import Profile from "../Pages/Profile";

import Plan from "../Pages/Plan";
import Selection from "../Pages/Selection";
import AddNewCard from "../Pages/AddNewCard";
import EmailVerification from "../Pages/EmailVerification";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Payment from "../Pages/Payment";
import TestCategories from "../Pages/TestCategories";
import TestCards from "../Pages/TestCards";
import TestCard from "../Pages/TestCard";
import Test from "../Pages/Test";
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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/new-password/:token" element={<NewPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/how-to-use/cards" element={<TestCards />} />
          <Route path="/how-to-use/card/:itemName" element={<TestCard />} />
          <Route path="/how-to-use" element={<HowUse />} />
          {/* Protected Routes - Require Authentication */}
          <Route
            path="/how-to-use/card/test"
            element={
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/how-to-use/categories"
            element={
              <ProtectedRoute>
                <TestCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <LearnDone />
              </ProtectedRoute>
            }
          />
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
