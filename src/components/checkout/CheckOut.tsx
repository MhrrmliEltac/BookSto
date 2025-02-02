import { useAppSelector } from "../../hook/hooks";
import Heading from "../general/Heading";
import NotUserProfile from "../userprofile/NotUserProfile";
import CheckOutItem from "./CheckOutItem";

const CheckOut = () => {
  const user = useAppSelector((state: any) => state.auth.user);

  return (
    <>
      {user.user ? (
        <div className="flex flex-col mx-auto pt-24 h-vh">
          <div className="container flex flex-col">
            <div className="bg-[#0DD6B8] h-fit p-4 flex items-center">
              <Heading text="Shopping Cart" color small />
            </div>{" "}
            <div>{<CheckOutItem />}</div>
          </div>
        </div>
      ) : (
        <NotUserProfile />
      )}
    </>
  );
};

export default CheckOut;
