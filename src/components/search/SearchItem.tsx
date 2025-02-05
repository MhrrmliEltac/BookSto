import { useNavigate } from "react-router";
import BasicButton from "../general/Button";

const SearchItem = ({ book }: { book: any }) => {
  const navigate = useNavigate();
  const handleBookDetail = (id: number) => {
    navigate(`/books/book-detail/${id}`);
  };

  return (
    <div className="flex justify-between mb-2 items-center">
      <div className="flex gap-2 justify-start items-center">
        <img src={book.image} alt="" className="w-10 h-10 rounded-full" />
        <p className="mb-0 text-sm w-[150px] font-medium">{book.book_name}</p>
      </div>
      <div className="">
        <BasicButton
          text="Read More"
          search
          onClick={() => handleBookDetail(book.id)}
        />
      </div>
    </div>
  );
};

export default SearchItem;
