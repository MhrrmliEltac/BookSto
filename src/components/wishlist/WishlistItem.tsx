import { useEffect, useState } from "react";
import { useAppSelector } from "../../hook/hooks";
import { getFavorites } from "../../../utils/firebase";
import SkeletonLoader from "../general/SkeletonLoader";
import WishlistItemCard from "./WishListItemCard";

const WishlistItem = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<object[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state: any) => state.auth.user);

  const getFavoriteToUserId = async (user: any) => {
    const response = await getFavorites(user?.user?.uid);
    setFavoriteBooks(response);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      getFavoriteToUserId(user);
    } else {
      return;
    }
  }, [user]);


  return (
    <div>
      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
        favoriteBooks.map((book: any) => (
          <>
            <WishlistItemCard key={book.id} book={book} />
            <hr />
          </>
        ))
      )}
    </div>
  );
};

export default WishlistItem;
