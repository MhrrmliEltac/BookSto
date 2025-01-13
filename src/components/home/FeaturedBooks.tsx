import { useEffect, useState } from "react";
import { getBookData } from "../../../utils/firebase";
import Heading from "../general/Heading";
import BasicButton from "../general/Button";
import FeaturedWriter from "./FeaturedWriter";
import axios from "axios";

interface Writer {
  image: string;
  id: number;
  writer_name: string;
  publish_books: number;
}

const FeaturedBooks = () => {
  const [sliceData, setSliceData] = useState<object[] | null>(null);
  const [writerData, setWriterData] = useState<Writer[] | null>(null);

  const fetchData = async () => {
    const bookData = await getBookData();
    let bookDataSlice = bookData.slice(2, 3);
    setSliceData(bookDataSlice);
  };

  const getWriterData = async () => {
    const response = await axios.get("/data.json");
    setWriterData(response.data);
  };

  useEffect(() => {
    fetchData();
    getWriterData();
  }, []);

  return (
    <div className="w-[100%] flex  justify-between my-10 gap-10 flex-wrap md:flex-nowrap">
      <div className="flex flex-col md:w-1/2 w-full bg-white p-4 rounded-lg h-fit">
        <Heading text="Featured Books" select />
        {sliceData &&
          sliceData.map((book: any) => (
            <div key={book.id} className="flex items-center">
              <div className="p-3 w-1/2">
                <img src={book.image} alt="" className="rounded-lg" />
              </div>
              <div className="w-1/2">
                <p className="text-3xl font-bold">{book.book_name}</p>
                <p className="text-[#6E7990]">Author: {book.author}</p>
                <p>{book.description} </p>
                <BasicButton text="Learn More" />
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col md:w-1/2 w-full bg-white p-4 rounded-lg h-[300px] md:h-full">
        <Heading text="Featured Writer" select />
        <FeaturedWriter writerData={writerData} />
      </div>
    </div>
  );
};

export default FeaturedBooks;
