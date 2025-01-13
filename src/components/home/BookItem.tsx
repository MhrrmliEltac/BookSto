import Books from "../home/Books";
import { useEffect, useState } from "react";
import { getBookData } from "../../../utils/firebase";
import Heading from "../general/Heading";

const BookItem = () => {
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

  return (
    <div className="flex flex-col rounded-md bg-white p-4">
      <Heading text="Browse Books" button />
      <Books allBookData={allBookData} />
    </div>
  );
};

export default BookItem;
