export default function UserProfile({ fullName, profilePic }) {
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
