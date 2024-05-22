import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Homepage2 from "./pages/Homepage2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/tes",
    element: <Homepage2 />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
