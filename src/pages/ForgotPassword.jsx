import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Layout from '../components/Layout'


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const forgot = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, newPassword, answer};
        axios.post(`${process.env.REACT_APP_API}/api/auth/forgotpassword`, requestData)
            .then((result) => {
                console.log(result.data);
                if (result.status === 200) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered',
                    }); // Display success message
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occured please try again later!'
                })
            })
    }

    return (
        <Layout title="Forget Password-TrendVista">
            <div className="container d-flex justify-content-center align-items-center w-100">
                <div className="login-form">
                    <h2 className="text-center">Forgot Passward</h2>
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}

                    {/* <!-- form for entering login details --> */}
                    <form onSubmit={(e) => forgot(e)}>
                        <div className="mb-3">
                            <label className="form-label"><b>E-mail:</b></label>
                            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" placeholder="Enter your E-mail" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Your Pet Name:</b></label>
                            <input type="text" value={answer} onChange={(ev) => setAnswer(ev.target.value)} className="form-control" id="email" placeholder="Answer" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>New Password:</b></label>
                            <input type="password" value={newPassword} onChange={(ev) => setNewPassword(ev.target.value)} className="form-control" id="password" placeholder="Enter your New Password" />
                        </div>
                        <button type="submit" className="btn w-100 bg-theam">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword