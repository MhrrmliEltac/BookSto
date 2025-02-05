import { CiSearch } from "react-icons/ci";
import { searchBooksByPartialTitle } from "../../../utils/firebase";
import { ChangeEvent, useState } from "react";
import SearchItem from "../search/SearchItem";

export interface SearchBook {
  id: string;
  book_name: string;
  image: string;
}

const Seacrh = () => {
  const [searchBook, setSearchBook] = useState<SearchBook[]>([]);
  const [, setSearchInp] = useState<string>("");

  const handleSearchInp = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchInp(searchValue);

    if (!searchValue.trim()) {
      setSearchBook([]);
      return;
    }

    const searchBookItems = await searchBooksByPartialTitle(searchValue);
    if (searchBookItems) {
      setSearchBook(searchBookItems as SearchBook[]);
    } else {
      setSearchBook([]);
    }
  };

  return (
    <>
      <div className="relative items-center md:flex hidden">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className="flex items-center rounded-sm px-2 py-2 bg-[#FAFAFA] outline-none"
          onChange={handleSearchInp}
        />
        <CiSearch
          className="text-black absolute right-2 cursor-pointer"
          size={20}
        />
      </div>

      {searchBook.length > 0 && (
        <div className="absolute top-16 left-60 bg-white p-2 rounded-md shadow-md w-[25%] md:flex flex-col hidden">
          {searchBook.map((book) => (
            <SearchItem book={book} key={book.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Seacrh;
