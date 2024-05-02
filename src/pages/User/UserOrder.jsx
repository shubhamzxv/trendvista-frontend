import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux';
import UserMenu from '../../components/UserMenu';
import moment from "moment";
import axios from 'axios';

const UserOrder = () => {
    const user = useSelector(state => state.userReducer);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/orders`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) getOrders();
    }, [user]);

    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="text-center">All Orders</h2>
                        {orders?.map((o, i) => (

                            <div className="card shadow p-1" key={o._id}>
                                <div className='mx-2'>
                                    <h3>
                                        # {i + 1} -<b>Status </b> {o?.status}
                                    </h3>
                                    <h5>
                                        <b>Date</b> {moment(o?.createdAt).fromNow()}
                                    </h5>
                                    <h5>
                                        <b>Payment</b> {o?.payment}
                                    </h5>
                                    <h5>
                                        <b>Quantity</b> {o?.products?.length}
                                    </h5>
                                </div>

                                <div className="container">
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 card flex-row text-center" key={p._id}>
                                            <div className="col-md-4">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price : {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserOrder