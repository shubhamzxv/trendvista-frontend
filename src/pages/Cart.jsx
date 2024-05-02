import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useCart } from '../Context/CartContext'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const user = useSelector(state => state.userReducer);
    const [cart, setCart] = useCart();

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Layout title="Cart-TrendVista">
                <div className="col-md-12">
                    <h2 className="text-center bg-light p-2 mb-1">
                        {!user?.user?.firstName
                            ? "Hello Guest"
                            : `Hello  ${user?.user?.firstName}`}
                        <p className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${localStorage.getItem("token") ? "" : "please login to checkout !"
                                }`
                                : " Your Cart Is Empty"}
                        </p>
                    </h2>
                </div>
                {cart?.length ? (

                    <div className="row justify-content-center m-3">
                        {/* <!-- col for items in cart --> */}

                        <div className="col-sm-7 mb-3 mb-sm-0 ">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center">Items in Cart</h3>
                                </div>
                                {cart?.map((p) => (
                                    <div className="card-body">
                                        <div className="d-flex flex-column flex-md-row gap-3">
                                            <div className="col-sm-6 text-center">
                                                <img src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`} className="w-75 "
                                                    alt="ProductImages" />
                                            </div>
                                            <div className="col-sm-3 d-flex flex-column align-items-center">
                                                <p className="text-center"><b>{p.name}</b></p>
                                                <p className="text-center">{p.price} &#8377; </p>

                                                <button className="btn btn-success bg-header" onClick={() => removeCartItem(p._id)}>
                                                    {/* <!-- added custom svg instead of fontawseom --> */}
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
                                                            fill="#ffcc57" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"
                                                            fill="#ffcc57" />
                                                    </svg>

                                                </button>

                                            </div>
                                           
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <!-- col for summary of item --> */}
                        <div className="col-sm-3">
                            <div className="card ">
                                <div className="card-header">
                                    <h3 className="text-center">Summary</h3>
                                </div>
                                <div className="card-body  align-items-center">

                                    <div className="row ">
                                        <div className="col">
                                            <h6>cost</h6>
                                        </div>
                                        <div className="col text-end">
                                            {totalPrice()} &#8377;
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Shipping</h6>
                                        </div>
                                        <div className="col text-end">
                                            0 &#8377;
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <h6><b>Total</b></h6>
                                        </div>
                                        <div className="col text-end">
                                            <b>{totalPrice()} &#8377;</b>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {localStorage.getItem("token") ? (
                                            
                                                <Link className="text-center mt-3" to='/checkout'>
                                                    <button className="btn btn-success bg-header text-theam" type="button">Checkout</button>
                                                </Link>
                                            
                                        ) : (
                                            <Link className="text-center mt-3" to='/login'>
                                                <button className="btn btn-success bg-header text-theam" type="button">Please Login to Checkout</button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ("")}
            </Layout>
        </div>
    )
}

export default Cart