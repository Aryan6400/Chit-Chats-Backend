import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import database from "../database";
import { useToast } from '@chakra-ui/react'


function Register() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: ""
    })
    const toast = useToast();
    const [picture, setPic] = useState("");
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

    const PostDetails = (pic) => {
        setLoading(true);
        if(!pic) {
            toast({
                title: 'Please select an image',
                status: 'warning',
                variant: 'left-accent',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
        if(pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "Coride Chat");
            data.append("cloud_name", "dfj3rhjvl");
            fetch("https://api.cloudinary.com/v1_1/dfj3rhjvl/image/upload", {
                method:"POST",
                body:data, 
            })
            .then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString());
                setLoading(false);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }else{
            toast({
                title: 'Please select an image',
                status: 'warning',
                variant: 'left-accent',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
    }
    function handleClick() {
        if (user.name == "" || user.username == "" || user.password == "" || picture == "") {
            toast({
                title: 'Please fill all the fields!!',
                status: 'warning',
                variant: 'left-accent',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            // alert("Please fill all the fields!!");
            return;
        }
        setLoading(true);
        const newUser = {
            name: user.name,
            username: user.username,
            password: user.password,
            picture: picture
        }
        database.postData("http://localhost:8080/auth/register", newUser).then((data) => {
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/welcome");
                setLoading(false);
            } else {
                setLoading(false);
                setUser({
                    name: "",
                    username: "",
                    password: ""
                })
                alert("Username already exists!!");
            }
        })
    }
    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="signup-comp">
                <h1>Sign Up to Proceed</h1>
                <div className="register-form-box">
                    <label >Name:</label>
                    <input type="name" onChange={handleChange} className="form-email" name="name" value={user.name} />
                    <label >Email:</label>
                    <input type="email" onChange={handleChange} className="form-email" name="username" value={user.username} />
                    <label >Password:</label>
                    <input type="password" onChange={handleChange} className="form-password" name="password" value={user.password} />
                    <label >Picture:</label>
                    <div className="picture-input-div"><input type="file" accept="image/*" onChange={(e)=>PostDetails(e.target.files[0])} id="form-picture" /></div>
                    <button type="submit" onClick={handleClick} className="btn-register">SignUp</button>
                </div>
            </div>
        </>
    )
}

export default Register;
