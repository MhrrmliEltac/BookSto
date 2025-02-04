import * as React from "react";
import Rating from "@mui/material/Rating";
import { useAppSelector } from "../../hook/hooks";
import toast from "react-hot-toast";
import { addRating, fetchDocumentsByCondition } from "../../../utils/firebase";

interface Id {
  bookId: number;
}

export default function BasicRating({ bookId }: Id) {
  const [valueRatingNum, setValueRating] = React.useState<number[] | null>();
  const [, setEvent] = React.useState<React.SyntheticEvent<
    Element,
    Event
  > | null>(null);
  const [showMessage, setShowMessage] = React.useState<boolean>(false);
  let ratingNumArr: number[] = [];

  const user = useAppSelector((state: any) => state.auth.user);

  const getBookDataFull = async () => {
    try {
      const data = await fetchDocumentsByCondition("books", bookId);
      if (data) {
        data.forEach((item: any) => {
          if (item.review && Array.isArray(item.review.rating)) {
            setValueRating(item.review.rating);
          } else {
            setValueRating([]);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleChangeRating = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      ratingNumArr.push(newValue);
      setEvent(event);
    }
  };

  const addRatingToReview = async () => {
    setShowMessage(true);
    if (!user || user.length === 0) {
      toast.error("Please, sign in or sign up");
      return;
    }
    try {
      await addRating({ rating: ratingNumArr }, bookId);
      if (showMessage) toast.success("Rating added successfully");
      await getBookDataFull();
      ratingNumArr.pop();
      setShowMessage(false);
    } catch (error) {
      console.error(error);
    }
  };

  let value = valueRatingNum?.reduce((acc, curr) => acc + curr, 0) ?? 0;
  let ratingValue =
    valueRatingNum && valueRatingNum.length > 0
      ? value / valueRatingNum.length
      : 0;

  React.useEffect(() => {
    getBookDataFull();
  }, [bookId]);

  return (
    <Rating
      disabled={!user || user.length === 0}
      value={ratingValue}
      onChange={handleChangeRating}
      onClick={addRatingToReview}
    />
  );
}
