import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./mix.css";

const Login = () => {
    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value,
            };
        });
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!");
        } else if (password === "") {
            toast.error("Password is required!");
        } else if (password.length < 6) {
            toast.error("Password: min 6 char require!");
        } else {
            // console.log("user login succesfully done");

            const data = await fetch(
                "https://mern-signin-signout-backend.onrender.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const res = await data.json();
            //  console.log(res);

            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dash");
                setInpval({ ...inpval, email: "", password: "" });
            } else {
                toast.error("Invalid Credentials 😥", {
                    position: "bottom-right",
                    theme: "colored",
                });
            }
        }
    };

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form style={{ zIndex: 1000 }}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={inpval.email}
                                onChange={setVal}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    onChange={setVal}
                                    value={inpval.password}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your password"
                                />
                                <div
                                    className="showpass"
                                    onClick={() => setPassShow(!passShow)}
                                    style={{
                                        background: "transparent",
                                        color: "#fff",
                                    }}
                                >
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className="btn" onClick={loginuser}>
                            Login
                        </button>
                        {/* <p style={{marginTop: "3rem"}}>
                            Don't have an Account?
                            <NavLink to="/register">Sign Up</NavLink>
                        </p>
                        <p style={{marginTop: "3rem"}}>
                            <span style={{marginLeft: "2rem"}}>Forget Password?</span>
                            <NavLink to="/register" style={{marginLeft: "4rem"}}>Reset</NavLink>
                        </p> */}
                        <p style={{display: "flex", justifyContent: "space-between"}}>
                            <NavLink to="/register" style={{width: "10rem"}}>Sign Up</NavLink>
                            <NavLink to="/password-reset" style={{width: "10rem"}}>Reset</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;
