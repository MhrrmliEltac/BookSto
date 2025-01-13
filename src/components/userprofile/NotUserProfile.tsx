import { Link } from "react-router";

const NotUserProfile = () => {
  return (
    <div className="bg-[#0DD6B8] flex-col font-mono vh-100 overflow-hidden text-3xl flex justify-center items-center gap-2">
      <div className="bg-white rounded-lg p-4 flex flex-col items-center">
        <img
          src="teenage-showing-how-to-sign-up-3d-cartoon-character-illustration-png.webp"
          alt=""
        />
        <div>
          Please{" "}
          <Link
            className="no-underline text-red-500 font-mono"
            to="/auth/login"
          >
            Sign in
          </Link>{" "}
          and{" "}
          <Link
            className="no-underline text-red-500 font-mono"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotUserProfile;
