import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaBars, FaBook, FaBookMedical, FaUser, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [color, setColor] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const route = (url: string) => {
    navigate(`/admin/control/admin-panel/${url}`);
  };

  useEffect(() => {
    setColor(location.pathname);
  }, [navigate]);

  return (
    <>
      <button
        className="text-gray-600 transition-all duration-200 p-2 rounded cursor-pointer md:hidden h-min"
        onClick={toggleMenu}
      >
        <FaBars size={25} />
      </button>
      <nav
        className={`bg-gray-700 md:w-[15%] w-[35%] h-screen flex flex-col justify-between items-center fixed left-0 top-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-1000 ease-in-out overflow-auto`}
      >
        <div className={`flex flex-col items-center `}>
          <div className="flex flex-col justify-between h-screen">
            <div>
              <ul className="px-0">
                <li className="flex w-full justify-start items-center p-2 mt-5">
                  <img src={logo} alt="Logo" className="w-20" />
                </li>
              </ul>

              <ul className={`flex flex-col gap-3 py-10 text-white px-0`}>
                <li
                  className={`${
                    color === "/admin/control/admin-panel/add-book"
                      ? "bg-gray-600"
                      : "hover:bg-gray-600"
                  } p-2 rounded cursor-pointer flex gap-2 items-center transition-all duration-200`}
                  onClick={() => route("add-book")}
                >
                  <FaBookMedical />
                  <span> Add a book</span>
                </li>
                <li
                  className={`${
                    color === "/admin/control/admin-panel/manage-book"
                      ? "bg-gray-600"
                      : "hover:bg-gray-600"
                  }   p-2 rounded cursor-pointer flex gap-2 items-center transition-all duration-200`}
                  onClick={() => route("manage-book")}
                >
                  <FaBook />
                  <span> Manage Books</span>
                </li>
                <li
                  className={`${
                    color === "/admin/control/admin-panel/manage-user"
                      ? "bg-gray-600"
                      : "hover:bg-gray-600"
                  }  p-2 rounded cursor-pointer flex gap-2 items-center transition-all duration-200`}
                  onClick={() => route("manage-user")}
                >
                  <FaUser />
                  <span>Users</span>
                </li>
              </ul>
            </div>

            <ul className="px-0">
              <li className="flex text-white hover:bg-gray-600 rounded mt-5 p-2 cursor-pointer gap-2">
                <CiSettings className="cursor-pointer text-white" size={25} />
                <span>Settings</span>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="text-white hover:bg-gray-600 p-2 rounded cursor-pointer md:hidden left-48 fixed"
          onClick={toggleMenu}
        >
          <FaTimes size={25} />
        </button>
      </nav>
    </>
  );
};

export default AdminNavbar;
