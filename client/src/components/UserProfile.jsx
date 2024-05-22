import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedUser } from "../features/auth/userSlice";
import { useEffect } from "react";

export default function UserProfile() {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.user.fullName);
  const profilePic = useSelector((state) => state.user.profilePic);
  console.log(fullName, "<<< FULLNAME");

  useEffect(() => {
    dispatch(fetchLoggedUser());
  }, [dispatch]);
  return (
    <>
      <div className="mb-2">
        <img
          src={profilePic}
          className="rounded-circle d-inline-block"
          width={100}
          height={100}
        />
        <h2 className="d-inline ms-5">{fullName}</h2>
      </div>
    </>
  );
}
