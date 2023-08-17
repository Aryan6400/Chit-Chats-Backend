import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Backdrop, CircularProgress } from "@mui/material";
import database from "../database";


function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevItem) => {
            return {
                ...prevItem,
                [name]: value
            };
        })
    }
    function handleClick() {
        if(user.username=="" || user.password=="") {
            alert("Please fill all the credentials.");
            return;
        }
        setLoading(true);
        database.postData("http://localhost:8080/auth/login", user).then((data) => {
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/welcome");
                setLoading(false);
            }else{
                setLoading(false);
                setUser({
                    username: "",
                    password: ""
                })
                alert("Invalid Credentials!!");
            }
        })
    }
    return (
        <>
            <Backdrop
                sx={{color:"#fff", zIndex:5}}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="signup-comp">
                <h1>Login to proceed.</h1>
                <div className="login-form-box">
                    <label >Email:</label>
                    <input type="email" onChange={handleChange} className="form-email" name="username" value={user.username} />
                    <label >Password:</label>
                    <input type="password" onChange={handleChange} className="form-password" name="password" value={user.password} />
                    <button type="submit" onClick={handleClick} className="btn-login">Login</button>
                </div>
            </div>
        </>
    )
}

export default Login;