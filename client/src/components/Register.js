import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import "./mix.css";

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        profilePic: "",
        password: "",
        cpassword: "",
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

    const updImage = (e) => {
        // console.log(e.target.files[0]);
        setInpval({ ...inpval, profilePic: e.target.files[0] });
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, profilePic, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("Name is required!");
        } else if (email === "") {
            toast.error("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!");
        } else if (profilePic === "") {
            toast.error("ProfilePic is required!");
        }else if (password === "") {
            toast.error("Password is required!");
        } else if (password.length < 6) {
            toast.error("Password: min 6 char require!");
        } else if (cpassword === "") {
            toast.error("Confirm password is required!");
        } else if (password !== cpassword) {
            toast.error("Confirm password is not matching!");
        } else {
            // console.log("user registration succesfully done");

            console.log(profilePic);
            console.log(profilePic.name);
            const formData = new FormData();
            formData.append("profilePic", profilePic, profilePic.name);
            formData.append("fname", fname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("cpassword", cpassword);
            // console.log(formData.entries());

            axios
                .post("https://mern-signin-signout-backend.onrender.com/register", formData)
                .then((res) => {
                    console.log(res);
                    toast.success("Registration Successfuly done 😃!", {
                        position: "bottom-right",
                        theme: "colored",
                    });
                    setInpval({
                        ...inpval,
                        fname: "",
                        email: "",
                        profilePic: "",
                        password: "",
                        cpassword: "",
                    });
                    history("/");
                })
                .catch((err) => {
                    // console.log(err.response.status);
                    if(err.response.status === 409) {
                        toast.error("Email already exists! 😥", {
                            position: "bottom-right",
                            theme: "colored",
                        });
                    } else {
                        toast.error("Someting went wrong! 😥", {
                            position: "bottom-right",
                            theme: "colored",
                        });
                    }
                    console.log(err);
                });
        }
    };

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>
                            We are glad that you will be using Project Cloud to
                            manage <br />
                            your tasks! We hope that you will get like it.
                        </p>
                    </div>

                    <form
                        encType="multipart/form-data"
                        style={{ zIndex: 1000 }}
                    >
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                onChange={setVal}
                                value={inpval.fname}
                                name="fname"
                                id="fname"
                                placeholder="Enter Your Name"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                onChange={setVal}
                                value={inpval.email}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="profilePic">Profile Picture</label>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={updImage}
                                name="profilePic"
                                id="profilePic"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    value={inpval.password}
                                    onChange={setVal}
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

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input
                                    type={!cpassShow ? "password" : "text"}
                                    value={inpval.cpassword}
                                    onChange={setVal}
                                    name="cpassword"
                                    id="cpassword"
                                    placeholder="Confirm password"
                                />
                                <div
                                    className="showpass"
                                    onClick={() => setCPassShow(!cpassShow)}
                                    style={{
                                        background: "transparent",
                                        color: "#fff",
                                    }}
                                >
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className="btn" onClick={addUserdata}>
                            Sign Up
                        </button>
                        <p>
                            Already have an account?
                            <NavLink to="/" style={{marginLeft: "1.5rem"}}>Log In</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Register;
