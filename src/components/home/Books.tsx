import { useState, useEffect } from "react";
import PaginationRounded from "../general/RoundedPagination";
import ShortenedText from "../general/ShortenedText";
import { FaHeart } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
import Rating from "../general/Rating";
import {
  addToCart,
  addToFavourites,
  pagination,
} from "../../../utils/firebase";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hook/hooks";
import toast from "react-hot-toast";
import SkeletonLoader from "../general/SkeletonLoader";
import { fetchCartLength } from "../redux/slice/count";

type ActionFnType = (userId: string, book: any) => Promise<void>;

const Books = ({ allBookData, pageLength }: any) => {
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [books, setBooks] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isToken, setIsToken] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);
  const pageSize: number = pageLength;

  const totalPages = allBookData?.length
    ? Math.ceil(allBookData.length / pageSize)
    : 1;

  const fetchBooks = async (pageNumber: number): Promise<void> => {
    setIsLoading(true);
    if (pageNumber === 1) setLastDoc(null);

    const result = await pagination(
      pageSize,
      pageNumber === 1 ? null : lastDoc
    );
    setBooks(result.books);
    setLastDoc(result.lastDoc);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsToken(!!(user && user.user?.providerData.length > 0));
  }, [user]);

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPage(value);
  };

  const handleBookDetail = (id: number) => {
    navigate(`/books/book-detail/${id}`);
  };

  const handleAction = async (actionFn: ActionFnType, book: any) => {
    if (isToken) {
      try {
        await actionFn(user?.user.uid, book);
        if (actionFn === addToCart) {
          dispatch(fetchCartLength(user?.user.uid));
        }
      } catch (error) {
        console.error("Error in handleAction:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Please, sign in or sign up");
    }
  };

  return (
    <div className="pt-4 w-[80%] md:w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: pageSize }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : books.map((item: any) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative z-0"
              >
                <div className="relative group cursor-pointer">
                  <img
                    src={item.image}
                    alt="Book's image"
                    className="w-28 h-44 rounded-lg group-hover:opacity-70 transition-all duration-300"
                  />
                  <div className="absolute top-0 left-0 hidden group-hover:flex w-28 h-44 rounded-lg items-center justify-center z-10 transition-all duration-300 bg-[rgba(0,0,0,0.5)]">
                    <button
                      onClick={() => handleBookDetail(item.id)}
                      className="bg-[#fff] rounded-md w-[90%] p-2 hover:bg-[#0DD6B8] transition-all duration-300 hover:text-white text-[#0DD6B8] text-sm"
                    >
                      View Book
                    </button>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <div className="flex justify-between mb-2 flex-col">
                    <div>
                      <h4 className="mb-1 text-[18px] font-semibold">
                        <ShortenedText text={item.book_name} />
                      </h4>
                      <div className="text-[#0DD6B8] text-[12px]">
                        <ShortenedText text={item.author} />
                      </div>
                    </div>
                    <Rating />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-black font-bold mt-1 mb-0">
                      ${item.price}
                    </p>
                    <div className="flex gap-2">
                      <FaHeart
                        onClick={() => handleAction(addToFavourites, item)}
                        className="w-7 h-7 cursor-pointer border p-1 rounded-lg bg-[#FBDDDD] text-[#EB5757]"
                      />
                      <CiShoppingBasket
                        onClick={() => handleAction(addToCart, item)}
                        className="w-7 h-7 cursor-pointer border p-1 rounded-lg bg-[#CFF7F1] text-[#0DD6B8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center mt-5 mb-2">
        <PaginationRounded
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Books;
