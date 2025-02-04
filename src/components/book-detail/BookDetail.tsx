import { useEffect, useState } from "react";
import { addComment, fetchDocumentsByCondition } from "../../../utils/firebase";
import { useParams } from "react-router";
import Heading from "../general/Heading";
import ShortenedText from "../general/ShortenedText";
import BasicRating from "../general/Rating";
import BasicButton from "../general/Button";
import { MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";
import Comments from "./Comments";

interface Review {
  comment: string[];
}

interface Book {
  id: string;
  book_name: string;
  price: number;
  image: string;
  author: string;
  description: string;
  review?: Review; 
}

const BookDetail = () => {
  const [bookDetails, setBookDetails] = useState<object[] | undefined>(
    undefined
  );
  const [textArea, setTextArea] = useState<string>();
  const [bookCommentState, setBookComment] = useState<any>();

  let params = useParams();
  let bookComment: string[] = [];

  const fetchBookToId = async (id: string | undefined) => {
    const book = await fetchDocumentsByCondition("books", Number(id));
    if (book) {
      setBookDetails(book);
      setBookComment((book[0] as Book)?.review?.comment || []);
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextArea(e.target.value);
  };

  const addCommentToReview = async (id: number) => {
    if (textArea) {
      setTextArea("");
      bookComment.push(textArea);
      await addComment({ comment: bookComment }, id);
      toast.success("Comment added successfully");
      bookComment.pop();
    }
  };

  useEffect(() => {
    fetchBookToId(params.id);
  }, [textArea]);

  return (
    <div className="container">
      <div className="flex flex-col rounded-md bg-white p-4 mt-10">
        <Heading text="Book description" />
        <div className="mt-5 md:mt-10">
          {bookDetails &&
            bookDetails.map((detail: any) => (
              <div
                key={detail.id}
                className="flex gap-2 flex-wrap2 flex-nowrap2"
              >
                <div className="md:w-1/2 w-full">
                  <img
                    className="w-[30rem] h-[650px] rounded-lg"
                    src={detail.image}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="md:w-1/2 w-full flex flex-col">
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">{detail.book_name}</h4>
                    <h5>${detail.price}</h5>
                    <BasicRating bookId={detail.id} />
                    <div className="mb-0">
                      <ShortenedText text={detail.description} length={247} />
                    </div>
                    <hr />
                    <p className="text-[#0DD6B8] text-sm">
                      Author:{" "}
                      <span className="text-[#C7D7E2]">{detail.author}</span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <BasicButton text="Add To Cart" />
                    <BasicButton text="Read Sample" white />
                  </div>
                  <div className="flex gap-2 items-center mt-4 ">
                    <div className="bg-[#0DD6B8] flex items-center justify-center py-2 px-2 rounded-full cursor-pointer">
                      <MdFavorite className="text-white" />
                    </div>
                    <p className="mb-0 text-md text-[#C7D7E2]">
                      Add to Wishlist{" "}
                    </p>
                  </div>
                  <div className="mt-3">
                    <h5>Write your thoughts</h5>
                    <textarea
                      className="border text-[#181717] p-1 w-[100%] h-[100px] outline-none"
                      name="feedback"
                      id="feedback"
                      onChange={handleChangeTextArea}
                      value={textArea}
                    ></textarea>
                    <div>
                      <button
                        className="rounded-lg bg-blue-500 px-4 text-white py-1 text-sm"
                        onClick={() => addCommentToReview(detail.id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col rounded-md bg-white p-4 mt-10">
        <Heading text="Review" />
        {bookCommentState &&
          bookCommentState.map((comment: string) => (
            <Comments comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default BookDetail;
