import React, { useState } from 'react';
import './Signup.css';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/authSLice';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({ firstName, lastName, email, password }))
            .unwrap()
            .then(() => navigate("/"))
            .catch(() => { });
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1 className="signup-heading">
                    The best offer <br />
                    <span>for your business</span>
                </h1>
                <p className="signup-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                    itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
                    at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
                    aliquid ipsum atque?
                </p>
            </div>

            <div className="signup-right">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>

                <div className="signup-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <label className="checkbox">
                            <input type="checkbox" /> Subscribe to our newsletter
                        </label>

                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </form>

                    <div className="social-section">
                        <p>or sign up with:</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon facebook"><FaFacebookF /></a>
                            <a href="#" className="social-icon google"><FaGoogle /></a>
                            <a href="#" className="social-icon github"><FaGithub /></a>
                        </div>
                    </div>

                    <p className="login-text">
                        Already have an account?{" "}
                        <Link to="/home" className="link-danger">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
