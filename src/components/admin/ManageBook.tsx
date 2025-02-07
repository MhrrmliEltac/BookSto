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
    { field: "book_name", headerName: "📖 Book Name", width: 230 },
    { field: "author", headerName: "✍️ Author", width: 200 },
    {
      field: "price",
      headerName: "💰 Price",
      type: "number",
      width: 100,
      renderCell: (params) => `${params.value} $`,
    },
    {
      field: "genre",
      headerName: "📚 Genre",
      width: 160,
    },
    {
      field: "button",
      headerName: "🛠 Actions",
      width: 120,
      renderCell: (params) => (
        <div className="w-full flex justify-center items-center h-full">
          <button
            className="text-red-500 hover:text-red-700 transition duration-300"
            onClick={() => deleteBookData(params.row.id)}
          >
            <MdDelete size={22} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-4 rounded-2xl w-[80%] shadow-lg">
        <Paper
          className="w-full overflow-hidden"
          sx={{
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <DataGrid
            rows={book}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="client"
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                color: "#333",
                borderBottom: "1px solid #E0E0E0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#D6E6FF ",
                color: "#333",
                fontWeight: "bold",
                fontSize: "16px",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#F0F0F0",
                transition: "0.3s",
              },
              "& .MuiCheckbox-root": {
                color: "#4A90E2",
              },
              "& .MuiSvgIcon-root": {
                color: "#4A90E2",
              },
              "& .MuiTablePagination-root": {
                color: "#555",
              },
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default ManageBook;
