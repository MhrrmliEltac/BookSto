import { SlBasket } from "react-icons/sl";
const AddToCart = () => {
  return (
    <div>
      <div className="flex relative">
        <div className="bg-lime-900 absolute w-4 h-4 text-white text-xs font-serif p-2 -right-2 -top-2 rounded-full flex items-center justify-center">
          0
        </div>
        <SlBasket
          size={18}
          className="hover:text-green-500 cursor-pointer transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default AddToCart;
