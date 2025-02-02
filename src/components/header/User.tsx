import { useCallback, useState } from "react";
import { Link } from "react-router";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { LuSquareUserRound } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { LuLockKeyhole } from "react-icons/lu";
import { useAppSelector } from "../../hook/hooks";
import { Button } from "@mui/material";
import BasicButton from "../general/Button";
import { GoSignOut } from "react-icons/go";
import { signOut } from "../../../utils/firebase";

type User = {
  displayName: string;
  photoURL: string;
  email: string;
};

const User = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);
  const user = useAppSelector((state: any) => state.auth.user);
  const userData = {
    displayName: user?.user?.displayName,
    photoURL: user?.user?.photoURL,
    email: user?.user?.email,
  };
  const signOutFunc = async () => {
    await signOut();
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  return (
    <div className="relative ml-3">
      {userData.displayName || userData.email || userData.photoURL ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleShowMenu}
            type="button"
            className="p-1 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            {userData.photoURL ? (
              <img
                className="size-14 rounded-full"
                src={userData.photoURL}
                alt=""
              />
            ) : (
              <FaUser size={20} className="text-white" />
            )}
          </button>
          <div>
            <p className="mb-0 font-medium text-lg">{userData.displayName}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            href="/auth/login"
            style={{ backgroundColor: "#0DD6B8", color: "white" }}
            color="success"
          >
            Sign In
          </Button>
          <Button
            href="/auth/register"
            style={{ backgroundColor: "#0DD6B8", color: "white" }}
            color="success"
          >
            Sign Up
          </Button>
        </div>
      )}

      {showMenu && (
        <div
          className="absolute -right-10 z-10 mt-2
          w-96 rounded-lg bg-white flex flex-col shadow-lg ring-1  focus:outline-none overflow-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="bg-[#0DD6B8] p-3 rounded-lg rounded-b-none">
            <h4 className="text-white">Hello {userData.displayName}</h4>
            <span className="text-white">Available</span>
          </div>
          <ul className="flex flex-col py-3 gap-4">
            <li>
              <Link
                className="flex items-center gap-3 no-underline"
                to="/settings/my-profile"
              >
                <div className="flex justify-center items-center p-2 bg-[#CFF7F1] rounded-full text-[#10D7B9]">
                  <FaRegUserCircle size={25} />
                </div>
                <div>
                  <p className="mb-0 text-black font-medium">My Profile</p>
                  <span className="text-[#9098AA]">
                    View personal profile details
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 no-underline"
                to="/settings/my-profile"
              >
                <div className="flex justify-center items-center p-2 bg-[#CFF7F1] rounded-full text-[#10D7B9]">
                  <FaUserEdit size={25} />
                </div>
                <div>
                  <p className="mb-0 text-black font-medium">Edit Profile</p>
                  <span className="text-[#9098AA]">
                    Modify your personal details
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 no-underline"
                to="/settings/my-profile"
              >
                <div className="flex justify-center items-center p-2 bg-[#CFF7F1] rounded-full text-[#10D7B9]">
                  <LuSquareUserRound size={25} />
                </div>
                <div>
                  <p className="mb-0 text-black font-medium">
                    Account Settings
                  </p>
                  <span className="text-[#9098AA]">
                    Manage your account parameters
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3 no-underline"
                to="/settings/my-profile"
              >
                <div className="flex justify-center items-center p-2 bg-[#CFF7F1] rounded-full text-[#10D7B9]">
                  <LuLockKeyhole size={25} />
                </div>
                <div>
                  <p className="mb-0 text-black font-medium">
                    Privacy Settings
                  </p>
                  <span className="text-[#9098AA]">
                    Control your privacy parameters
                  </span>
                </div>
              </Link>
            </li>
          </ul>
          <div className="flex justify-center items-center mb-2">
            <BasicButton
              text="Sign Out"
              Icon={GoSignOut}
              onClick={signOutFunc}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
