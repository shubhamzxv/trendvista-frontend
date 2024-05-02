import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const user = useSelector(state => state.userReducer);
    const [userCount, setUserCount]= useState();
    const [productsCount, setProductsCount]= useState();
    const [orderCount, setOrderCount]= useState();

    // get Products count
    const getProductCount= async()=>{
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product`);
            setProductsCount(data.products.length);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        } 
    }
    // get Order count
    const getOrderCount= async()=>{
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/all-orders`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            setOrderCount(data.length);
        } catch (error) {
            console.log(error);
        }
    }
    // get User count
    const getUserCount = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/all-users`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            setUserCount(data.length);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    useEffect(()=>{
        getProductCount();
        getOrderCount();
        getUserCount();
    },[])
    return (
        <Layout>
            <div className="container-fluid  dashboard">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-9 p-4 m-0">
                        <div className="card w-100 p-3 text-center ">
                            <h3> Hello {user?.user?.firstName} {user?.user?.lastName}</h3>
                            <div className="row mt-3">
                                <Link to='/dashboard/admin/users' className="col-md-4 text-center fw-bold text-decoration-none">
                                    <div className='border border-black w-100 text-center p-5' style={{borderRadius:200, height:200, width:200}}>
                                        <h1>{userCount}</h1>
                                    </div>
                                    Number of Users
                                </Link>
                                <Link to='/dashboard/admin/products' className="col-md-4 text-center fw-bold text-decoration-none">
                                    <div className='border border-black w-100 text-center p-5' style={{ borderRadius: 200, height: 200, width: 200 }}>
                                        <h1>{productsCount}</h1>
                                    </div>
                                    Number of Products
                                </Link>
                                <Link to='/dashboard/admin/orders' className="col-md-4 text-center fw-bold text-decoration-none">
                                    <div className='border border-black w-100 text-center p-5' style={{ borderRadius: 200, height: 200, width: 200 }}>
                                        <h1>{orderCount}</h1>
                                    </div>
                                    Number of Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard