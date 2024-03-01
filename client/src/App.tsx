import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Landing from "./landingPage";
import Home from "./home";
import AddListing from "./addListing";
import Product from "./productDetails";
import { UserProvider } from "./userContext";
import Profile from "./profile";
import Setting from "./setting";
import Cookies from "js-cookie";
import Mylistings from "./mylisting";
import UpdateProduct from "./updatePruduct";
import MyCart from "./mycart";
import VerfyEmail from "./verfyEmail";
import { FilterProvider } from "./filterContext";

interface TokenProps {
  children: React.ReactNode;
}

function CheckToken({ children }: TokenProps) {
  const token = Cookies.get("token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App: React.FC = () => {
  return (
    <UserProvider>
      <FilterProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FilterProvider>
    </UserProvider>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/:userId/verify/:token" element={<VerfyEmail />} />
      <Route
        path="/home"
        element={
            <Home />
          
        }
      />
      <Route
        path="/add"
        element={
          <CheckToken>
            <AddListing />
          </CheckToken>
        }
      />
      <Route
        path="/product/:productId"
        element={
          <CheckToken>
            <Product />
          </CheckToken>
        }
      />
      <Route
        path="/profile"
        element={
          <CheckToken>
            <Profile />
          </CheckToken>
        }
      />
      <Route
        path="/settings"
        element={
          <CheckToken>
            <Setting />
          </CheckToken>
        }
      />
      <Route
        path="/mylistings"
        element={
          <CheckToken>
            <Mylistings />
          </CheckToken>
        }
      />
      <Route
        path="/update/:productId/"
        element={
          <CheckToken>
            <UpdateProduct />
          </CheckToken>
        }
      />
      <Route
        path="/mycart"
        element={
          <CheckToken>
            <MyCart />
          </CheckToken>
        }
      />
      <Route
        path="/categories/:category"
        element={
          <CheckToken>
            <MyCart />
          </CheckToken>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
