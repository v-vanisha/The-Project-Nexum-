// import logo from "./logo.svg";
// import Navbar from "./components/Navbar";
import Nexum from './components/Nexum';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import BlogCreatePost from "./components/BlogCreatePost";
import BlogPostDetail from "./components/BlogPostDetail";
import BlogHome from "./components/BlogHome";

import ForgotPassword from './components/ForgotPassword';
// import Post from "./components/Post";
// import Feed from "./components/Feed";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "./context/auth";


function App() {
 
  return (
    <div>
      {console.log("I'm the first one, I'm Speaking from App.js")}
      <BrowserRouter>
        {/* Secondaly AuthProvider Component will be rendered */}
        <AuthWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/BlogHome" element={<BlogHome/>} />
            <Route path="/post/:id" element={<BlogPostDetail/>} />
            <Route path="/createpost" element={<BlogCreatePost />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Nexum />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
