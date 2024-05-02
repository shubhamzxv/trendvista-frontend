import './App.css';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Category from './pages/Category';
import AllProducts from './pages/AllProducts';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Private from './Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import AdminOrders from './pages/Admin/AdminOrders';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import CreateProducts from './pages/Admin/CreateProduct';
import UserOrder from './pages/User/UserOrder';
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchResult from './pages/SearchResult';
import ProductDetails from './pages/ProductDetails';
import AdminProfile from './pages/Admin/AdminProfile';
import Checkout from './pages/Checkout';
import UpdateUser from './pages/Admin/UpdateUser';
import Succes from './components/Succes';

function App() {
  return (
    <div>
      {/* Defining routes for different pages */}
      <Routes>
        {/* Route for the Home page */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<SearchResult />} />
        {/* Route for the ContactUs */}
        <Route exact path="/aboutUs" element={<AboutUs />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        {/* Route for Products  */}
        <Route exact path="/allproducts" element={<AllProducts />} />
        <Route exact path="/men/products/:category" element={<Category />} />
        <Route exact path="/women/products/:category" element={<Category />} />
        <Route exact path="/products/:category" element={<Category />} />
        <Route exact path="/product/:slug" element={<ProductDetails />} />
        <Route exact path="/checkout" element={<Checkout />} />

        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/success" element={<Succes />} />
        
        <Route exact path="/dashboard" element={<Private />}>
          <Route exact path="user" element={<UserDashboard />} />
          <Route exact path="user/profile" element={<Profile />} />
          <Route exact path="user/orders" element={<UserOrder />} />
        </Route>

        <Route exact path="/dashboard" element={<AdminRoute />}>
          <Route exact path="admin" element={<AdminDashboard />} />
          <Route exact path="admin/profile" element={<AdminProfile />} />
          <Route exact path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/user/:uid" element={<UpdateUser />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route exact path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
