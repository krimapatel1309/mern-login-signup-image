import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import ForgotPassword from "./components/ForgetPassword";
import PasswordReset from "./components/PasswordReset";
import { LoginContext } from "./components/ContextProvider/Context";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App() {
    const [data, setData] = useState(false);

    const { logindata, setLoginData } = useContext(LoginContext);

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
            console.log("user not valid");
        } else {
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
                <div className="main">
                    <Header />

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dash" element={<Dashboard />} />
                        <Route path="/password-reset" element={<PasswordReset />} />
                        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <ToastContainer 
                        theme="colored"
                        position="bottom-right"
                        style={{fontSize: "14px"}}
                    />
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        fontSize: "2rem",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}

export default App;
