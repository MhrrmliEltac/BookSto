import { useNavigate } from "react-router";
import { useAppSelector } from "../../hook/hooks";
import { signOut } from "../../../utils/firebase";
import NotUserProfile from "./NotUserProfile";

const UserProfile = () => {
  const user = useAppSelector((state:any) => state.auth.user);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("user");
    location.reload();
    navigate("/");
  };

  return (
    <>
      {user && user.toString().length > 0 ? (
        <div>
          <div>UserProfile</div>
          <div className="cursor-pointer" onClick={handleSignOut}>
            Log Out
          </div>
        </div>
      ) : (
        <NotUserProfile />
      )}
    </>
  );
};

export default UserProfile;
