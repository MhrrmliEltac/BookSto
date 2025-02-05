import { CiSearch } from "react-icons/ci";
import { searchBooksByPartialTitle } from "../../../utils/firebase";
import { ChangeEvent, useState } from "react";
import SearchItem from "../search/SearchItem";

export interface SearchBook {
  id: string;
  book_name: string;
  image: string;
}

const ModalSearch = () => {
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
    <div className="flex flex-col">
      <div className="relative items-center flex mb-2 bg-[#FAFAFA]">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className="flex items-center rounded-sm px-2 py-2 bg-[#FAFAFA] outline-none w-80"
          onChange={handleSearchInp}
        />
        <CiSearch
          className="text-black absolute right-2 cursor-pointer"
          size={20}
        />
      </div>

      {searchBook.length > 0 && (
        <div className=" bg-white p-2 rounded-md shadow-md w-full flex ">
          {searchBook.map((book) => (
            <SearchItem book={book} key={book.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalSearch;
