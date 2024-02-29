import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/PredefinedPages/LoginPage/LoginPage";
import PostImage from "../components/pages/NewPages/PostImage";
import HomePage from "../components/pages/NewPages/HomePage";
import UserTable from "../components/pages/PredefinedPages/UserPage/UserTable";
import UserPage from "../components/pages/PredefinedPages/UserPage/UserPage";
import * as jwt from "jsonwebtoken";
import UpdatePost from "../components/pages/NewPages/UpdatePost";
import Gallery from "../components/pages/NewPages/Gallery";
import ProfilePage from "../components/pages/PredefinedPages/UserPage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import authorities from "../config/Authorities";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {

  /** navigate to different "home"-locations depending on Role the user have */
  const isLoggedIn = () => {
    let tokenString = localStorage.getItem("token");
    if (!tokenString) {
      console.error("no token found");
      return false;
    }
    tokenString = tokenString.replace("Bearer ", "");
    const token: JWTType = jwt.decode(tokenString) as JWTType;
    // Check if token does not exist or doesn't have an expiration claim or is expired.
    if (!token || !token.exp || token.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  };

  if (!isLoggedIn()) {
    return (
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/post"} element={<LoginPage />} />
        <Route path={"/gallery"} element={<LoginPage />} />
        <Route path={"/update-post"} element={<LoginPage />} />
        <Route path={"/profile"} element={<LoginPage />} />
        <Route path={"/users"} element={<LoginPage />} />
        <Route path="/user/add" element={<LoginPage />} />
        <Route path="/useredit/" element={<LoginPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    );
  }

  type JWTType = {
    iss: string;
    exp: number;
  };

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/post"} element={<PostImage />} />
      <Route path={"/gallery"} element={<Gallery />} />
      <Route path={"/update-post"} element={<UpdatePost />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route
        path="/users"
        element={
          <PrivateRoute element={<UserTable />} requiredAuths={[authorities.USER_DELETE]}></PrivateRoute>
        }
      />
      <Route path="/user/add" element={<UserPage />} />
      <Route path="/useredit/" element={<UserPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
