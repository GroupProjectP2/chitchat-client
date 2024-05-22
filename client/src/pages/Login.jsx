import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setFullName } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const fullName = useSelector((state) => state.auth.fullName);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);

    try {
      let { data } = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      localStorage.setItem("access_token", "Bearer " + data.access_token);
      Swal.fire({
        title: "Success login!",
        text: "Welcome to Chat app",
        icon: "success",
      });
      console.log(data);
      dispatch(setFullName(data.fullName));
      console.log(fullName);
      localStorage.setItem("user_id", data.id);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data.message || error.message);
      Swal.fire({
        title: "Error!",
        text: error.response?.data.message || error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f59e0b", height: "100vh" }}
    >
      <div className="border w-75 p-5 my-5 bg-white rounded-3 shadow">
        <div className="row">
          <div className="col-6">
            <img src="{img1}" alt="login-img" width="100%" />
          </div>
          <div className="col-6 align-self-center">
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <img
                  src="{h8logo}"
                  alt="logo-h8"
                  className="mb-4"
                  width="200px"
                />
                <h5 className="mb-4">Sign in to your account</h5>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  autoComplete="off"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {loading ? <div className="spinner-border"></div> : ""}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
