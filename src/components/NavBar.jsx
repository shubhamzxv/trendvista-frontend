import React from 'react'
import logo from '../Images/TrendVista.png'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSearch } from '../Context/Search'
import axios from 'axios'
import { useCart } from '../Context/CartContext'
import { Badge, Space } from 'antd';

const NavBar = () => {
    const [cart] = useCart();
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions
    const navigate = useNavigate();
    const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("user"); // Remove user data from local storage
        dispatch({ type: "LOGIN_ERROR" }); // Dispatch LOGIN_ERROR action to update Redux store
        navigate('/');
    }
    return (
        <div className='sticky-top'>
            <nav className="navbar navbar-expand-lg py-0">
                <div className="container-fluid bg-header">
                    {/* Logo at the left side */}
                    <Link className="navbar-brand w-25" to="/">
                        <img src={logo} alt="trendVista" height="60" />
                    </Link>

                    {/* Toggle button for collapsing on smaller screens */}
                    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" data-bs-theme="dark"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar links */}
                    <div className="collapse navbar-collapse ms-lg-5 justify-content-between" id="navbarNav">
                        {/* Search bar at the center */}

                        <form className="d-flex my-2 my-lg-0" onSubmit={handleSubmit}>
                            <input className="form-control bdr-btl" type="search" placeholder="Product name,Category name, etc." value={values.keyword}
                                onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                            <button className="btn  bdr-tpr bg-theam" type="submit" href='#'>Search</button>
                        </form>

                        {/*Login and cart buttons at the right side*/}
                        <div className="navbar-nav">

                            {localStorage.getItem("token") ?
                                <div>
                                    <li className="bg-theam rounded dropdown my-2">
                                        <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.user.firstName}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`/dashboard/${user.user.role === 1 ? "admin" : "user"
                                                }`}>Dashboard</Link></li>
                                            <li>
                                                <button className="btn " type="submit" onClick={(e) => logout()}>Logout</button>
                                            </li>
                                        </ul>
                                    </li>
                                </div>

                                : ''}
                            {!localStorage.getItem("token") ? <Link className="nav-link" to='/login'>
                                <button className="btn bg-theam" type="submit" href='#'>Login</button>
                            </Link> : ''}

                            <Link className="nav-link w-auto " to="/cart">
                                <Space size="large">
                                    <Badge count={cart?.length}>
                                        <FontAwesomeIcon className="cart text-theam fs-2 my-lg-1 m-2 py-0" icon={faCartShopping} />
                                    </Badge>
                                </Space>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* secondary navBar  */}
            <nav className="nav nav-pills  flex-sm-row justify-content-center bg-light">
                <NavLink className="nav-link" to="/" aria-current="page">Home</NavLink>
                <NavLink className="nav-link" to="/allproducts">All Products</NavLink>
                {/* dropdown */}
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="/women" role="button" aria-expanded="false" aria-current="page">Women</NavLink>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><NavLink className="dropdown-item" to="/women/products/women-dresses">Dresses</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/women/products/women-pants">Pants</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/women/products/women-skirts">Skirt</NavLink></li>
                    </ul>
                </li>
                {/* DropDown button */}
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="/men" role="button" aria-expanded="false">Men</NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/men/products/men-shirts">Shirt</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/men/products/men-pants">Pants</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/men/products/men-hoodies">Hoodies</NavLink></li>
                    </ul>
                </li>
                <NavLink className="nav-link" to="/products/kids">Kids</NavLink>
                <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
            </nav>
        </div>

    )
}

export default NavBar