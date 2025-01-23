import Books from "../home/Books";
import { useEffect, useState } from "react";
import { getBookData } from "../../../utils/firebase";
import Heading from "../general/Heading";
import { useNavigate } from "react-router";

const BookItem = () => {
  const navigate = useNavigate();
  const [allBookData, setAllBookData] = useState<object[] | null>(null);

  const getData = async () => {
    const dataDB = await getBookData();
    setTimeout(() => {
      if (dataDB) {
        setAllBookData(dataDB);
      }
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToBookList = () => {
    navigate("/books");
  };

  return (
    <div className="flex flex-col rounded-md bg-white p-4">
      <Heading text="Browse Books" button onClick={navigateToBookList} />
      <Books allBookData={allBookData} pageLength={8} />
    </div>
  );
};

export default BookItem;
