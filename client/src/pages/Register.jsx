import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from '../assets/regist.png' 

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    try {
      let { data } = await axios.post(
        "http://localhost:3000/register",
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },
        { headers: { Authorization: localStorage.getItem("access_token") } }
      );
      console.log(data);
      Swal.fire({
        title: "Register Success!",
        text: `${username} has been registered.`,
        icon: "success",
      });
      navigate("/login");
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
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    register();
    setLoading(true);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#09c2b8", height: "100vh" }}
    >
      <div className="border w-75 p-5 my-5 bg-white rounded-3 shadow">
        <div className="row">
          <div className="col-6">
            <img src={logo2} alt="regist-img" width="100%" />
          </div>
          <div className="col-6 align-self-center bg-light">
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
              <h3>ChitChat Account Registration</h3>
                <h5 className="mb-4">Please fill the form below</h5>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
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
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="ConfirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  name="gender"
                  className="form-select"
                  id="gender"
                  onChange={(event) => setGender(event.target.value)}

                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {loading ? <div className="spinner-border"></div> : ""}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <p className="text-center mt-3">Do you have an account? <Link to={'/login'}>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
