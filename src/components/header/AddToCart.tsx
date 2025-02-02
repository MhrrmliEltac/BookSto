import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hook/hooks";
import { fetchCartLength } from "../redux/slice/count";
import { SlBasket } from "react-icons/sl";

interface AddToCart {
  onClick: () => void;
}

const AddToCart: React.FC<AddToCart> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state: any) => state.count.count);
  const user = useAppSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (user?.user?.uid) {
      dispatch(fetchCartLength(user.user.uid));
    }
  }, [user, dispatch]);

  return (
    <div>
      <div className="flex relative">
        <div className="bg-lime-900 absolute w-4 h-4 text-white text-xs font-serif p-2 -right-2 -top-2 rounded-full flex items-center justify-center">
          {count}
        </div>
        <SlBasket
          size={18}
          className="hover:text-green-500 cursor-pointer transition-all duration-200"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default AddToCart;
