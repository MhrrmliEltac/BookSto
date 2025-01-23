import { useEffect, useState } from "react";
import Books from "../home/Books";
import { getBookData } from "../../../utils/firebase";

const BookList = () => {
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
    <div className="container">
      <Books pageLength={12} allBookData={allBookData} />
    </div>
  );
};

export default BookList;
