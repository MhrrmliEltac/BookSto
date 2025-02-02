import { useEffect, useState } from "react";
import { deleteBookIdFromCart, getCartBook } from "../../../utils/firebase";
import { useAppSelector } from "../../hook/hooks";
import SkeletonLoader from "../general/SkeletonLoader";
import ItemCard from "../general/ItemCard";
import PaymentDetail from "./PaymentDetail";
import BasicButton from "../general/Button";

const CheckOutItem = () => {
  const [cartBook, setCartBook] = useState<object[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state: any) => state.auth.user);
  const getCartToUserId = async (user: any) => {
    const response = await getCartBook(user?.user?.uid);
    setCartBook(response);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAction = async (bookId: string) => {
    try {
      if (user.user.uid) {
        await deleteBookIdFromCart(user.user.uid, Number(bookId));
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  let totalPrice = cartBook.reduce(
    (acc: number, item: any) => acc + item.price,
    0
  );

  useEffect(() => {
    if (user) {
      getCartToUserId(user);
    }
  }, [user, cartBook]);

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader count={cartBook.length} />
      ) : (
        cartBook.map((book: any) => (
          <>
            <ItemCard
              key={book.id}
              book={book}
              handleAction={() => handleAction(book.id)}
            />
            <hr />
          </>
        ))
      )}
      <PaymentDetail totalPrice={totalPrice} />
      <div className="flex justify-end">
        <BasicButton text="Accept" check />
      </div>
    </div>
  );
};

export default CheckOutItem;
