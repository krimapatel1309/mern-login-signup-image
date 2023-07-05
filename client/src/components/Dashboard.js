import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginContext } from "./ContextProvider/Context";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch(
            "https://mern-signin-signout-backend.onrender.com/validuser",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );

        const data = await res.json();

        if (data.status === 401 || !data) {
            toast.error("Login First to access it 😢");
            history("*");
        } else {
            toast.success("Logged In Successful 😃");
            console.log("user verify");
            setLoginData(data);
            history("/dash");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true);
        }, 2000);
    }, []);

    return (
        <>
            {data ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "calc(100vh - 8rem - 1.5rem)",
                        gap: "15px",
                    }}
                >
                    <img
                        src={`${
                            logindata
                                ? `https://mern-signin-signout-backend.onrender.com/public/images/${logindata.ValidUserOne.profilePic}`
                                : ""
                        }`}
                        style={{
                            width: "15rem",
                            height: "15rem",
                            marginTop: 20,
                            borderRadius: "50%",
                            zIndex: 1000,
                        }}
                        alt="Picture deleted on server"
                    />
                    <h3 style={{ zIndex: 1000, fontSize: "3rem" }}>
                        Name : {logindata ? logindata.ValidUserOne.fname : ""}
                    </h3>
                    <h3 style={{ zIndex: 1000, fontSize: "3rem" }}>
                        Email : {logindata ? logindata.ValidUserOne.email : ""}
                    </h3>
                </div>
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

export default Dashboard;
