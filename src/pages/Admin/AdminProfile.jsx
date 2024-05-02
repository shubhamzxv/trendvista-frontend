import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../profile.css'
import axios from 'axios'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/AdminMenu'

const AdminProfile = () => {
    const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions
    const user = useSelector(state => state.userReducer);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState("");

    //update photo function
    const handlePhotoUpdate = async (e) => {
        e.preventDefault();
        try {
            const userData = new FormData();
            userData.append("photo", photo);

            const { data } = axios.put(
                `${process.env.REACT_APP_API}/api/auth/update-profilePhoto/${user?.user?._id}`,
                userData,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
            );
            if (data?.success) {
                toast.error(data?.message);

            } else {
                toast.success("Profile Photo Updated Successfully");
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // form Update function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/auth/profile`, {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                address,
                gender,
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
                localStorage.setItem("token", data?.token);
                localStorage.setItem("user", JSON.stringify(data?.updatedUser));
                dispatch({ type: 'LOGIN_SUCCESS', payload: data.updatedUser });
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("user"); // Remove user data from local storage
        dispatch({ type: "LOGIN_ERROR" }); // Dispatch LOGIN_ERROR action to update Redux store
    }

    useEffect(() => {
        const { firstName, lastName, phoneNumber, gender, email, address } = user?.user;
        setFirstName(firstName);
        setLastName(lastName);
        setPhoneNumber(phoneNumber);
        setGender(gender);
        setEmail(email);
        setAddress(address);
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
                            <div className=''>
                                <div className="row d-flex flex-column">
                                    <img className='img-fluid p-2 profile-img' src={`${process.env.REACT_APP_API}/api/auth/profile-photo/${user.user._id}`} alt="Profile pic" />
                                </div>
                                <div className='row'>
                                    <div className="mb-3 col-6">
                                        <label className="btn btn-outline-secondary">
                                            {photo ? photo.name : "Upload Photo"}
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    {photo ? <div className="mb-3 col-6">
                                        <button className='btn btn-outline-secondary bg-theam' onClick={handlePhotoUpdate}>Change Photo</button>
                                    </div> : ''}
                                </div>
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
                                                <label className="form-label"><b>Gender:</b></label>
                                                <select className="form-select" value={gender} onChange={(ev) => setGender(ev.target.value)} aria-label="Default select example">
                                                    <option selected>select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><b>E-mail:</b></label>
                                                <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" placeholder="Enter your E-mail" required disabled />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><b>Address:</b></label>
                                                <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} className="form-control" id="address" placeholder="Enter your address" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><b>Password:</b></label>
                                                <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="password" placeholder="Enter your Password" />
                                            </div>
                                            <button type="submit" className="btn w-100 bg-theam">Update</button>
                                        </form>

                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className="col-12">
                                        <hr />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <Link className="nav-link m-2" to='/login'>
                                        <button className="btn bg-theam" type="submit" onClick={(e) => logout()}>Logout</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminProfile