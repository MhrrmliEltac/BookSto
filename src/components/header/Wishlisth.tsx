import { IconType } from "react-icons/lib";

interface WishlistProps {
  icon: IconType;
  onClick: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ icon: Icon, onClick }) => {
  return (
    <div className="cursor-pointer">
      <Icon
        onClick={onClick}
        size={18}
        className="hover:text-red-500 transition-all duration-200"
      />
    </div>
  );
};

export default Wishlist;
