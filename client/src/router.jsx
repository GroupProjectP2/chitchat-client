import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="bg-primary">home</div>,
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
  ]);
export default router