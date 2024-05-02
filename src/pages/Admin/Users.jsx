import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    //getall products
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/all-users`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2 className="text-center">All Users</h2>
                        <div className="w-100">
                            {users?.map((p, i) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/user/${p._id}`}
                                    className="text-decoration-none"
                                >
                                    <div className="card m-2">
                                        <div className="row card-body">
                                            <div className="col-md-6" >
                                                <h4 className="card-title">{i + 1}.{p.firstName} {p.lastName}</h4>
                                                <p className="card-text">{p.email}</p>
                                                <p className="card-text ">{p.phoneNumber}</p>
                                            </div>
                                            <div className="col-md-6" >
                                                <h4 className="card-title">{p.role ? "admin":"user"}</h4>
                                                <p className="card-text">{p.gender}</p>
                                                <p className="card-text ">{p.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users