import { Route, Routes } from "react-router";
import AddBookk from "./AddBookk";
import AdminNavbar from "./AdminNavbar";
import ManageBook from "./ManageBook";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-900">
      <div className="md:w-1/6">
        <AdminNavbar />
      </div>
      <div className="w-[80%] md:w-full mt-10 md:mt-0 ">
        <Routes>
          <Route path="add-book" element={<AddBookk />} />
          <Route path="manage-book" element={<ManageBook />} />
          <Route path="manage-user" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
