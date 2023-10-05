import React, { useState } from 'react'
import "../CSS/AdminLogin.css"
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from '../../config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';


function AdminLogin() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',



    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        signInWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
            const user = res.user;

            console.log(user);
            navigate("/AdminDashboard")


        }).catch(err => console.log(err))
    }
    return (
        <>


            <div class="container my-4">
                <div class="row">
                    <div class="col-lg-3 col-md-2"></div>
                    <div class="col-lg-6 col-md-8 login-box">
                        <div class="col-lg-12 login-key">
                            <i class="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div class="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>

                        <div class="col-lg-12 login-form">
                            <div class="col-lg-12 login-form">
                                <form>
                                    <div class="form-group">
                                        <label class="form-control-label">USERNAME</label>
                                        <input type="text" class="form-control" name='email' onChange={(events) => {
                                            setValues((prev) => ({ ...prev, email: events.target.value }))
                                        }} />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-control-label">PASSWORD</label>
                                        <input type="password" class="form-control" name='password'
                                            onChange={(events) => {
                                                setValues((prev) => ({ ...prev, password: events.target.value }))
                                            }} i />
                                    </div>

                                    <div class="col-lg-12 loginbttm">
                                        <div class="col-lg-6 login-btm login-text">
                                            {/* <!-- Error Message --> */}
                                        </div>
                                        <div class="col-lg-6 login-btm login-button">
                                            <button type="submit" onClick={handleSubmit} class="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-2"></div>
                    </div>
                </div>        </div>






        </>
    )
}

export default AdminLogin