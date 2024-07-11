import React, { useState } from 'react';
import "../CSS/AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../../config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './AdminNavbar';

function AdminLogin() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
                const user = res.user;
                toast.success('Logged in successfully!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                navigate("/AdminDashboard");
            })
            .catch((err) => {
                console.error(err);
                toast.error('Login failed. Please check your credentials.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    };

    return (
        <>
        <AdminNavbar/>
        <div className="login-container">
            <div className="login-box">
                <div className="login-title">ADMIN PANEL</div>
                <form onSubmit={handleSubmit}>
                    <div className="login-row">
                        <div className="login-textbox">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="login-row">
                        <div className="login-textbox">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
        </>
    );
}

export default AdminLogin;
