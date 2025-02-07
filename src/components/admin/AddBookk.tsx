import { useState, useEffect } from "react";
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
  price: number;
};

const AddBookk = () => {
  const [books, setBooks] = useState<Books>({
    id: 0,
    author: "",
    book_name: "",
    description: "",
    genre: "",
    image: "",
    price: 0,
  });

  const [bookId, setBookId] = useState<number>(0);

  useEffect(() => {
    const savedId = localStorage.getItem("bookId");
    const newId = savedId ? +savedId : 1; 
    setBookId(newId);
  }, []);

  const handleAddBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      books.author.trim() !== "" &&
      books.book_name.trim() !== "" &&
      books.description.trim() !== "" &&
      books.genre.trim() !== "" &&
      books.image.trim() !== "" &&
      books.price > 0
    ) {
      await addBook({ ...books, id: bookId });
      toast.success("Kitab əlavə edildi");

      const newId = bookId + 1;
      setBookId(newId);
      localStorage.setItem("bookId", newId.toString());

      setBooks({
        id: newId,
        author: "",
        book_name: "",
        description: "",
        genre: "",
        image: "",
        price: 0,
      });
    } else {
      toast.error("Bütün xanaları doldurun zəhmət olmasa");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooks({
      ...books,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="flex flex-col p-4 gap-2 h-screen justify-center">
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="book_name"
        placeholder="Kitabın adı"
        value={books.book_name}
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="author"
        placeholder="Müəllifin adı"
        value={books.author}
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="description"
        placeholder="Kitabın təsviri"
        value={books.description}
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="image"
        placeholder="Kitabın şəkli"
        value={books.image}
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="text"
        name="genre"
        placeholder="Janr"
        value={books.genre}
        onChange={handleChangeInput}
      />
      <input
        className="border-b-2 placeholder:text-slate-500 outline-none"
        type="number"
        name="price"
        placeholder="Qiymət"
        value={books.price}
        onChange={handleChangeInput}
      />
      <Button type="submit" onClick={handleAddBook} variant="success">
        Əlavə et
      </Button>
    </div>
  );
};

export default AddBookk;
