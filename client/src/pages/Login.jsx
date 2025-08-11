// import React from 'react';
// import './Login.css';
// import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
// import { Link } from 'react-router-dom';


// const Login = () => {
//     return (

//         <div className="login-container">
            // <div className="login-image">
            //     <img
            //         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            //         alt="Sample illustration"
            //     />
            // </div>

//             <div className="login-form">
//                 <h1 className="heading">Login</h1>

//                 <input type="email" placeholder="Email address" className="input-field" />
//                 <input type="password" placeholder="Password" className="input-field" />

//                 <div className="remember-forgot">
//                     <label>
//                         <input type="checkbox" /> Remember me
//                     </label>
//                     <a href="#">Forgot password?</a>
//                 </div>

//                 <button className="btn-primary">Login</button>

//                 <div className="divider">
//                     <span>Or</span>
//                 </div>

//                 <div className="social-login">
//                     <p>Sign in with</p>
//                     <div className="social-icons-login">
//                         <a href="#"><FaFacebookF /></a>
//                         <a href="#"><FaGoogle /></a>
//                         <a href="#"><FaGithub /></a>
//                     </div>
//                 </div>

//                 <p className="signup-text-login">
//                     Don't have an account?{" "}
//                     <Link to="/signup" className="link-danger-login">
//                         Register
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import './Login.css';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSLice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => navigate("/"))
            .catch(() => { });
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample illustration"
                />
            </div>

            <div className="login-form">
                <h1 className="heading">Login</h1>

                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="divider">
                    <span>Or</span>
                </div>

                <div className="social-login">
                    <p>Sign in with</p>
                    <div className="social-icons-login">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaGoogle /></a>
                        <a href="#"><FaGithub /></a>
                    </div>
                </div>

                <p className="signup-text-login">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-danger-login">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
