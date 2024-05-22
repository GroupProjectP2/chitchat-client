import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Conversation from "../components/Conversation";
import MessageInput from "../components/MessageInput";
import MessageProfileHeader from "../components/MessageProfileHeader";

import UserProfile from "../components/UserProfile";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  async function fetchUserData() {
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/users/",
        headers: { Authorization: localStorage.getItem("access_token") },
      });
      setProfilePic(data.user.profilePic);
      setFullName(data.user.fullName);
      console.log(data);
      // setProfilePic(data.user.profilePic);
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogout = (e) => {
    e.preventDefault;
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <div className="container my-5 border p-3 " style={{ height: "100vh" }}>
        <div className="row gap-3">
          <div id="div1" className="col border p-2">
            <UserProfile
              fullName={fullName}
              profilePic={profilePic}
            ></UserProfile>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div id="div2" className="col border p-2">
            <MessageProfileHeader></MessageProfileHeader>
            <MessageInput fullName={fullName}></MessageInput>
          </div>
        </div>
      </div>
    </>
  );
}
