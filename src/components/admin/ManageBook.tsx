import { useEffect, useState } from "react";
import { deleteBook, getBookData } from "../../../utils/firebase";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";

export interface Book {
  id: number;
  book_name: string;
  author: string;
  price: number;
  description: string;
  image: string;
  genre: string;
  review?: object | null | undefined;
}

const ManageBook = () => {
  const [book, setBook] = useState<Book[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const bookData: Book[] = await getBookData();
    if (bookData) {
      setBook(bookData);
    }
  };

  const deleteBookData = async (bookId: number) => {
    await deleteBook(bookId.toString());
    setBook((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const columns: GridColDef[] = [
    { field: "book_name", headerName: "Book Name", width: 230 },
    { field: "author", headerName: "Author Name", width: 230 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
      renderCell: (params) => `${params.value} $`,
    },
    {
      field: "button",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="w-full flex justify-center items-center h-full">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteBookData(params.row.id)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 gap-2 flex-wrap w-[80%]">
        <Paper
          className="w-full min-w-[600px]"
          sx={{ backgroundColor: "#fff" }}
        >
          <DataGrid
            rows={book}
            columns={columns}
            pageSizeOptions={[5, 10, 20]} 
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel} 
            paginationMode="client" 
            checkboxSelection
            sx={{ border: 0, minWidth: 600 }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default ManageBook;
