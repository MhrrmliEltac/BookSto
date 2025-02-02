import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useAppSelector } from "../../hook/hooks";
import toast from "react-hot-toast";
import { addReview, fetchDocumentsByCondition } from "../../../utils/firebase";

interface Id {
  bookId: number;
}

export default function BasicRating({ bookId }: Id) {
  const [valueRatingNum, setValueRating] = React.useState<number[]>([]);
  const [isAdded, setIsAdded] = React.useState<boolean>(false);

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

  const handleChangeRating = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setValueRating((prevRatings) => [...prevRatings, newValue]);
    }
  };

  const addRatingToReview = async () => {
    console.log(valueRatingNum);
    setIsAdded(!isAdded);
    if (!user || user.length === 0) {
      toast.error("Please, sign in or sign up");
      return;
    }

    if (isAdded) {
      if (valueRatingNum.length === 0) {
        toast.error("Please select a rating.");
        return;
      }
    }

    try {
      if (isAdded) {
        await addReview(
          {
            rating: valueRatingNum,
          },
          bookId
        );
      }
    } catch (error) {
      toast.error("Failed to add rating. Please try again.");
    }
  };

  let value = valueRatingNum.reduce((acc, curr) => acc + curr, 0);
  let newValue = value / valueRatingNum.length;

  React.useEffect(() => {
    getBookDataFull();
  }, [bookId]);

  return (
    <Box sx={{ "& > legend": { mt: 2 }, cursor: "pointer" }}>
      <Rating
        disabled={!user || user.length === 0}
        name="simple-controlled"
        value={newValue}
        onChange={handleChangeRating}
        onClick={addRatingToReview}
      />
    </Box>
  );
}
