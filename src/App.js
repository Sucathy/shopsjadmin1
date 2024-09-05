import { Dashboard } from "@mui/icons-material";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AccountList from "./Components/AccountList/AccountList";
import AddProduct from "./Components/AddProduct/AddProduct";
import Footer from "./Components/Footer/Footer";
import ListProduct from "./Components/ListProduct/ListProduct";
import Navbar from "./Components/Navbar/Navbar";
import OrderList from "./Components/OrderList/OrderList";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Sidebar from "./Components/Sidebar/Sidebar";
import UserDetails from "./Components/UserDetails/UserProfile";
import Website from "./Components/WebSite/Website";
import WebSiteList from "./Components/WebSiteList/WebsiteList";
import Admin from "./Pages/Admin";
import LoginSignup from "./Pages/LoginSignup";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/accountlist" element={<AccountList />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/website" element={<Website />} />
          <Route path="/websitelist" element={<WebSiteList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
