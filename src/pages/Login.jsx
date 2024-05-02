import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import Layout from '../components/Layout'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password };
        axios.post(`${process.env.REACT_APP_API}/api/auth/login`, requestData)
            .then((result) => {
                if (result.status === 200) {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("user", JSON.stringify(result.data.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.user });
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Login successfully',
                    }); // Display success message
                    navigate('/');
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
        
        <Layout title="Login-TrendVista">
            <div className="container d-flex justify-content-center align-items-center w-100">
                <div className="login-form">
                    <h2 className="text-center">Login</h2>
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}

                    {/* <!-- form for entering login details --> */}
                    <form onSubmit={(e) => login(e)}>
                        <div className="mb-3">
                            <label className="form-label"><b>E-mail:</b></label>
                            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="email" placeholder="Enter your E-mail" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Password:</b></label>
                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="password" placeholder="Enter your Password" />
                            <Link to="/forgotpassword" className='text-decoration-none'>
                                <button type="button" className="btn w-100 fw-bold d-flex justify-content-start">Forgot password?</button>
                            </Link>
                        </div>
                        <button type="submit" className="btn w-100 bg-theam">Submit</button>
                    </form>
                    <Link to="/registration">
                        <button type="button" className="btn w-100 fw-bold text-primary mt-3">New to TrendVista? Create an account</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Login