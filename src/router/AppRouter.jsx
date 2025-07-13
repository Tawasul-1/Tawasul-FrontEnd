import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "../Pages/Login";
import ResetPassword from "../Pages/ResetPassword";
import NewPassword from "../Pages/NewPassword";
import Signup from "../Pages/Signup";
import Board from "../Pages/Board";
import BoardPassword from "../Pages/BoardPassword";
import HomePage from "../Pages/Home";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import Plan from "../Pages/Plan";
import Selection from "../Pages/Selection";
import AddNewCard from "../Pages/AddNewCard";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board-password" element={<BoardPassword />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit-Profile" element={<EditProfile/>} /> 
        <Route path="/plan" element={<Plan/>}/>  
        <Route path="/selection" element={<Selection/>}/> 
        <Route path="/addnewcard" element={<AddNewCard/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
