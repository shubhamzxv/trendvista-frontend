import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux';
import UserMenu from '../../components/UserMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const user = useSelector(state => state.userReducer);
    const [orderCount, setOrderCount] = useState();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/orders`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            setOrderCount(data.length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <Layout>
            <div className="container-fluid dashboard">
                <div className="row">
                    <div className="col-lg-3">
                        <UserMenu />
                    </div>
                    <div className="col-lg-9 p-4 m-0">
                        <div className="card w-100 p-3 text-center ">
                            <h3> Hello {user?.user?.firstName} {user?.user?.lastName}</h3>
                            <div className="row mt-3">
                                <Link className="col-lg-4 text-center fw-bold text-decoration-none" to='/dashboard/user/orders'>
                                    <div to='/dashboard/user/orders' className='border border-black w-100 text-center p-5' style={{ borderRadius: 200, height: 200, width: 200 }}>
                                        <h1>{orderCount}</h1>
                                    </div>
                                    Number of orders
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard