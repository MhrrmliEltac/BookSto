import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import UserProfile from "./components/userprofile/UserProfile";
import RecoverPass from "./components/auth/RecoverPass";
import { Layout } from "./components/layout/Layout";
import Home from "./components/pages/Home";
import "swiper/swiper-bundle.css";
import AddBookk from "./components/admin/AddBookk";

function App() {
  return (
    <div className="bg-[#FAFAFA] h-vh font-plus-jakarta-sans">
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Layout>
            <Routes>
              <Route path="/admin/control" element={<AddBookk />} />
              <Route path="/" element={<Home />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/auth/recover-password" element={<RecoverPass />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
