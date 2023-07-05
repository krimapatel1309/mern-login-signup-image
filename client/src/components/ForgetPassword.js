import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const { id, token } = useParams();

    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const userValid = async () => {
        const res = await fetch(`https://mern-signin-signout-backend.onrender.com/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (data.status === 201) {
            setData(true);
            console.log("user valid");
        } else {
            history("*");
        }
    };

    const setval = (e) => {
        setPassword(e.target.value);
    };

    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("Password is required!");
        } else if (password.length < 6) {
            toast.error("Password: min 6 char require!");
        } else {
            const res = await fetch(`https://mern-signin-signout-backend.onrender.com/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.status === 201) {
                setPassword("");
                history("/");
                toast.success("Password Update Successfully!");
            } else {
                toast.error("Token Expired: generate new Link!");
            }
        }
    };

    useEffect(() => {
        userValid();
    }, []);

    return (
        <>
            {data2 ? (
                <>
                    <section>
                        <div className="form_data">
                            <div className="form_heading">
                                <h1>Enter New Password</h1>
                            </div>

                            <form style={{ zIndex: 1000 }}>
                                <div className="form_input">
                                    <label htmlFor="password">
                                        New password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={setval}
                                        name="password"
                                        id="password"
                                        placeholder="Enter Your New Password"
                                    />
                                </div>

                                <button className="btn" onClick={sendpassword}>
                                    Update
                                </button>
                                {/* <p style={{width: "20rem", textAlign: "center", margin: "2.5rem auto 0"}}>
                                    <NavLink
                                        to="/"
                                        className="btn btn-primary"
                                        style={{
                                            zIndex: 1000,
                                            borderRadius: "1rem",
                                            background: "rgba(255,255,255,0.25)",
                                            padding: "1rem 2rem",
                                            color: "#fff",
                                            textDecoration: "none",
                                            fontSize: "1.8rem",
                                        }}
                                    >
                                        Back to Home
                                    </NavLink>
                                </p> */}
                            </form>
                        </div>
                    </section>
                </>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 8rem - 1.5rem)",
                        fontSize: "2rem",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default ForgotPassword;
