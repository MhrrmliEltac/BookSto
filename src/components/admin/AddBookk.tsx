import { useState } from "react";
import { addBook } from "../../../utils/firebase";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

type Books = {
  id: number;
  author: string;
  book_name: string;
  description: string;
  genre: string;
  image: string;
};

const AddBookk = () => {
  let id = 14;

  const [books, setBooks] = useState<Books>({
    id: ++id,
    author: "",
    book_name: "",
    description: "",
    genre: "",
    image: "",
  });

  const handleAddBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    books.id = ++id;
    console.log(id, "id", books.id, "books");
    if (
      books.author !== "" ||
      books.book_name !== "" ||
      books.description !== "" ||
      books.genre !== "" ||
      books.image !== ""
    ) {
      await addBook(books);
      toast.success("Kitab əlavə edildi");
    } else {
      toast.error("Bütün xanaları doldurun zəhmət olmasa");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooks({
      ...books,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col p-4 gap-2">
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="book_name"
        id="bookName"
        placeholder="Kitabın adı"
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="author"
        id="author"
        onChange={handleChangeInput}
        placeholder="Müəəlifin adı"
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="description"
        id="description"
        onChange={handleChangeInput}
        placeholder="Kitabın təsviri"
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="image"
        id="image_url"
        onChange={handleChangeInput}
        placeholder="Kitabın şəkli"
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="genre"
        id="genre"
        placeholder="Janr"
        onChange={handleChangeInput}
      />
      <Button type="submit" onClick={handleAddBook} variant="success">
        Əlavə et
      </Button>
    </div>
  );
};

export default AddBookk;
