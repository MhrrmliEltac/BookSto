import { useState, useEffect } from "react";
import CustomTextField from "./custom/CustomTextField";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { addBook } from "../../../utils/firebase";
import { validateBook } from "./helpers/validateField";
import { Box, Card } from "@mui/material";
import CustomButton from "./custom/CustomButton";

export type Books = {
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
  const [loading, setLoading] = useState(false);

  const [bookId, setBookId] = useState<number>(0);

  useEffect(() => {
    const savedId = localStorage.getItem("bookId");
    const newId = savedId ? +savedId : 1;
    setBookId(newId);
  }, []);
  const isValidField = validateBook(books);
  const handleAddBook = async () => {
    try {
      setLoading(true);

      if (isValidField) {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
      } else if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
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
    <div className="h-screen items-center flex justify-center ">
      <Card className="flex p-4 gap-2 h-min flex-wrap justify-center bg-white rounded-2xl w-[80%]">
        <CustomTextField
          fullwidth
          label="Kitabın adı"
          name="book_name"
          onChange={handleChangeInput}
          value={books.book_name}
        />
        <CustomTextField
          fullwidth
          label="Müəllifin adı"
          name="author"
          onChange={handleChangeInput}
          value={books.author}
        />
        <CustomTextField
          fullwidth
          label="Kitabın təsviri"
          name="description"
          onChange={handleChangeInput}
          value={books.description}
        />
        <CustomTextField
          fullwidth
          label="Kitabın şəkli"
          name="image"
          onChange={handleChangeInput}
          value={books.image}
        />
        <CustomTextField
          fullwidth
          label="Janr"
          name="genre"
          onChange={handleChangeInput}
          value={books.genre}
        />
        <CustomTextField
          fullwidth
          type="number"
          label="Qiymət"
          name="price"
          onChange={handleChangeInput}
          value={books.price}
        />
        <Box
          sx={{ display: "flex", justifyContent: "end", width: "100%", mt: 5 }}
        >
          <CustomButton
            title="Əlavə et"
            disabled={!isValidField}
            onClick={handleAddBook}
            loading={loading}
          />
        </Box>
      </Card>
    </div>
  );
};

export default AddBookk;
