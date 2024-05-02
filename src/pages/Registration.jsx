import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from '../components/Layout'

const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    // State variable to control loading indicator visibility
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Access to React Router navigation function

    // Function to handle form submission and register user
    const register =(event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Show loading indicator

        const requestData = { firstName, lastName, phoneNumber, gender, email, password, address,answer }; // Prepare request data

        axios.post(`${process.env.REACT_APP_API}/api/auth/register`, requestData)
            .then((result) => {
                if (result.status === 201) { // Check for successful registration
                    setLoading(false); // Hide loading indicator
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered',
                    }); // Display success message
                    navigate("/login"); // Redirect to login page
                }
            })
            .catch((error) => {
                console.log(error); // Log any errors
                setLoading(false); // Hide loading indicator
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!',
                }); // Display error message using SweetAlert
            });
    };

    return (
        <div>
            <Layout title="Registration-TrendVista">
                <div className="container d-flex justify-content-center align-items-center w-100">
                    <div className="login-form">
                        <h2 className="text-center">Registration</h2>
                        {loading ? <div className="col-md-12 mt-3 text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <form onSubmit={(e) => register(e)}>
                            <div className="mb-3">
                                <label className="form-label"><b>First Name:</b></label>
                                <input type="text" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className="form-control" id="fName" placeholder="Enter your First name" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Last Name:</b></label>
                                <input type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" id="lName" placeholder="Enter your Last Name"/>
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
                                <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" placeholder="Enter your E-mail" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Your Pet Name:</b></label>
                                <input type="text" value={answer} onChange={(ev) => setAnswer(ev.target.value)} className="form-control" id="email" placeholder="Answer" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Address:</b></label>
                                <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} className="form-control" id="address" placeholder="Enter your address" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Password:</b></label>
                                <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="password" placeholder="Enter your Password" required />
                            </div>
                            <button type="submit" className="btn w-100 bg-theam">Submit</button>
                        </form>
                        <Link to="/login">
                            <button type="button" className="btn w-100 fw-bold text-primary mt-3">Already have an account? Login</button>
                        </Link>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Registration