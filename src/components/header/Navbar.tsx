import { useNavigate } from "react-router";
import AddToCart from "./AddToCart";
import Seacrh from "./Seacrh";
import User from "./User";
import logo from "../../assets/images/logo.png";
import Wishlist from "./Wishlisth";
import { MdFavoriteBorder } from "react-icons/md";
import ResponsiveSearch from "./ResponsiveSearch";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateToWishlist = () => {
    navigate("/wishlist");
  };
  const navigateToCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white w-[100%] flex mx-auto justify-center shadow-sm border-b-2 fixed z-10 top-0">
      <div className="w-[80%] py-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div onClick={() => navigate("/")}>
            <img src={logo} alt="" className="w-full h-10 cursor-pointer" />
          </div>
          <Seacrh />
        </div>
        <div className="flex gap-2 items-center">
          <div className="md:hidden flex items-center justify-center m-0 p-0">
            <ResponsiveSearch />
          </div>
          <Wishlist onClick={navigateToWishlist} icon={MdFavoriteBorder} />
          <AddToCart onClick={navigateToCheckOut} />
          <User />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
