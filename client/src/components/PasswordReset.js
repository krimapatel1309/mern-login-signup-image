import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const history = useNavigate();

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is required!");
        } else if (!email.includes("@")) {
            toast.warning("Enter valid Email!");
        } else {
            const res = await fetch("https://mern-login-signup-image-backend.onrender.com/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                history("/");
                toast.success("Email sent Successfully! (check spam)");
            } else if (data.status === 404) {
                toast.error("Email not Registered");
            } else {
                toast.error("Error in sending Mail");
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>

                    <form style={{ zIndex: 1000 }}>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PasswordReset;
