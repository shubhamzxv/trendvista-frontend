import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const UpdateUser = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    // get user Details
    const getSingleUser = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/auth/get-user/${params.uid}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            setAddress(data.user.address);
            setEmail(data.user.email);
            setPhoneNumber(data.user.phoneNumber);
            setGender(data.user.gender);
            setRole(data.user.role);
            console.log(data.user);
        } catch (error) {
            console.log(error);
        }
    };
    // Delete user
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this User ? ");
            if (!answer) return;
            await axios.delete(
                `${process.env.REACT_APP_API}/api/auth/delete-user/${params.uid}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            toast.success("User deleted Succesfully");
            navigate("/dashboard/admin/users");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // form Update function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/auth/profile/${params.uid}`, {
                firstName, lastName, email, password, phoneNumber, address, gender, role, email
            },
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setPassword('')
                console.log(data);
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getSingleUser();
    }, [])

    return (
        <Layout>
            <div className="container-fluid p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-8 p-2">
                        <div className="card p-3">
                            <div className="row">
                                <div className=" d-flex flex-column justify-content-between mt-3">
                                    <form onSubmit={(e) => handleUpdate(e)}>
                                        <div className="mb-3">
                                            <label className="form-label"><b>First Name:</b></label>
                                            <input type="text" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className="form-control" id="fName" placeholder="Enter your First name" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Last Name:</b></label>
                                            <input type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" id="lName" placeholder="Enter your Last Name" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Phone Number:</b></label>
                                            <input type="number" value={phoneNumber} onChange={(ev) => setPhoneNumber(ev.target.value)} className="form-control" id="pNumber" placeholder="Enter your Phone Number" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Role:</b></label>
                                            <select className="form-select" value={role} onChange={(ev) => setRole(ev.target.value)} aria-label="Default select example">
                                                <option selected>select</option>
                                                <option value={0}>user</option>
                                                <option value={1}>admin</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Gender:</b></label>
                                            <select className="form-select" value={gender} onChange={(ev) => setGender(ev.target.value)} aria-label="Default select example">
                                                <option selected>select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>E-mail:</b></label>
                                            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" placeholder="Enter your E-mail" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Address:</b></label>
                                            <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} className="form-control" id="address" placeholder="Enter your address" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label"><b>Password:</b></label>
                                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="password" placeholder="Enter your Password" />
                                        </div>
                                        <button className="btn w-100 bg-theam" >Update User</button>
                                    </form>

                                </div>
                            </div>

                            <hr />
                            <div>
                                <button onClick={() => handleDelete()} className="btn w-100 bg-theam">Delete User</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateUser