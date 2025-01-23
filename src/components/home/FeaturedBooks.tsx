import { useEffect, useState } from "react";
import { getBookData } from "../../../utils/firebase";
import Heading from "../general/Heading";
import BasicButton from "../general/Button";
import FeaturedWriter from "./FeaturedWriter";
import axios from "axios";
import { useNavigate } from "react-router";
import ShortenedText from "../general/ShortenedText";

interface Writer {
  image: string;
  id: number;
  writer_name: string;
  publish_books: number;
}

const FeaturedBooks = () => {
  const [sliceData, setSliceData] = useState<object[] | null>(null);
  const [writerData, setWriterData] = useState<Writer[] | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const bookData = await getBookData();
    let bookDataSlice = bookData.slice(2, 3);
    setSliceData(bookDataSlice);
  };

  const getWriterData = async () => {
    const response = await axios.get("/data.json");
    setWriterData(response.data);
  };

  const handleBookDetail = (id: number) => {
    navigate(`/books/book-detail/${id}`);
  };

  useEffect(() => {
    fetchData();
    getWriterData();
  }, []);

  return (
    <div className="w-[100%] flex  justify-between my-10 gap-3 flex-wrap2 flex-nowrap2">
      <div className="flex flex-col lg:w-1/2 w-full bg-white p-4 rounded-lg h-fit">
        <Heading text="Featured Books" select />
        {sliceData &&
          sliceData.map((book: any) => (
            <div key={book.id} className="flex items-center">
              <div className="p-3 w-1/2">
                <img src={book.image} alt="" className="rounded-lg" />
              </div>
              <div className="w-1/2">
                <p className="md:text-3xl text-sm font-bold">
                  {book.book_name}
                </p>
                <p className="text-[#6E7990] text-sm">Author: {book.author}</p>
                <div className="text-xs">
                  <ShortenedText text={book.description} length={100} />{" "}
                </div>
                <BasicButton
                  onClick={() => handleBookDetail(book.id)}
                  text="Learn More"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col lg:w-1/2 w-full bg-white p-4 rounded-lg">
        <Heading text="Featured Writer" select />
        <FeaturedWriter writerData={writerData} />
      </div>
    </div>
  );
};

export default FeaturedBooks;
