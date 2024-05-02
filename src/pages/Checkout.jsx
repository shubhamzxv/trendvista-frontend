import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import processImg from '../Images/process.png'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const user = useSelector(state => state.userReducer);
    const [cart, setCart] = useCart();
    const totalItem = cart.length;

    // calculate total price
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

    const total = totalPrice();
    
    const handlePyament = async () => {
        
        try {
            const data = await axios.post(`${process.env.REACT_APP_API}/create-payment`, {total })
            console.log(data);
            window.location.href = data.data;
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Layout>
            <div className="text-center">
                <img src={processImg} className="w-75" alt="process" />
            </div>

            <div className="d-flex justify-content-center  my-3">
                <div className="card " style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Name: {user?.user?.firstName} {user?.user?.lastName}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Phone Number: {user?.user?.phoneNumber}</li>
                        <li className="list-group-item">Address: {user?.user?.address}</li>
                        <li className="list-group-item">Total Products: {cart.length} </li>
                        <li className="list-group-item">Total Price: {total}  </li>
                    </ul>
                    <div className="card-body text-center">
                        <Link className="text-center mt-3" to={`/dashboard/${user.user.role === 1 ? "admin" : "user"}/profile`}>
                            <button className="btn btn-success bg-header text-theam" type="button">Update Details</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center my-3">
                <Link className="text-center" to=''>
                    <button className="btn btn-info" type="button" onClick={() => handlePyament()}>PAYMENT OPTIONS</button>
                </Link>
            </div>

        </Layout>
    )
}

export default Checkout