import { useNavigate } from "react-router-dom";
import Conversation from "../components/Conversation";
import MessageInput from "../components/MessageInput";
import MessageProfileHeader from "../components/MessageProfileHeader";
import UserProfile from "../components/UserProfile";

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault;
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="container my-5 border p-3 " style={{ height: "100vh" }}>
        <div className="row gap-3">
          <div id="div1" className="col border p-2">
            <UserProfile></UserProfile>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div id="div2" className="col border p-2">
            <MessageProfileHeader></MessageProfileHeader>
            <MessageInput></MessageInput>
          </div>
        </div>
      </div>
    </>
  );
}
