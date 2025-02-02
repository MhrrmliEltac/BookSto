import { useEffect, useState } from "react";
import { useAppSelector } from "../../hook/hooks";
import {
  deleteBookByIdFromFavorite,
  getFavorites,
} from "../../../utils/firebase";
import SkeletonLoader from "../general/SkeletonLoader";
import ItemCard from "../general/ItemCard";

const WishlistItem = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<object[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAppSelector((state: any) => state.auth.user);

  const getFavoriteToUserId = async (user: any) => {
    try {
      const response = await getFavorites(user?.user?.uid);
      setFavoriteBooks(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleAction = async (bookId: string) => {
    try {
      if (user.user.uid) {
        await deleteBookByIdFromFavorite(user.user.uid, Number(bookId));
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getFavoriteToUserId(user);
    }
  }, [user, favoriteBooks]);

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader count={favoriteBooks.length} />
      ) : (
        favoriteBooks.map((book: any) => (
          <div key={book.id}>
            <ItemCard
              book={book}
              button
              handleAction={() => handleAction(book.id)}
            />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistItem;
