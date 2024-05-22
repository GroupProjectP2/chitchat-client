import { useNavigate } from "react-router-dom";
import MessageInput from "../components/MessageInput";
import UserProfile from "../components/UserProfile";

export default function HomepageTest() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault;
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div>
        <div
          className="container my-5 border p-3 d-flex flex-column rounded"
          style={{ height: "100vh", backgroundColor: "#09c2b8" }}
        >
          <div id="div1" className="col p-2">
            <UserProfile></UserProfile>
          </div>
          <MessageInput></MessageInput>
          <button
            className="btn btn-danger"
            style={{ width: "5rem" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
