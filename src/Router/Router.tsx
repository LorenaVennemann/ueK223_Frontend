import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/PredefinedPages/LoginPage/LoginPage";
import PostPicturePage from "../components/pages/NewPages/PostImage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/NewPages/HomePage";
import UserTable from "../components/pages/PredefinedPages/UserPage/UserTable";
import UserPage from "../components/pages/PredefinedPages/UserPage/UserPage";
import authorities from "../config/Authorities";
import UpdatePost from "../components/pages/NewPages/UpdatePost";
import Gallery from "../components/pages/NewPages/Gallery";
import ProfilePage from "../components/pages/PredefinedPages/UserPage/ProfilePage";




/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/post"} element={<PostPicturePage />} />
      <Route path={"/gallery"} element={<Gallery />} />
      <Route path={"/update-post"} element={<UpdatePost />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      

      <Route
        path={"/users"}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute
            requiredAuths={[
              authorities.USER_DEACTIVATE,
              authorities.USER_CREATE,
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_READ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
