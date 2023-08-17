import "./OptionsBar.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toggleDarkMode } from "../../../Features/darkModeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";


function OptionsBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkTheme = useSelector((state)=>state.darkMode);
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const { selectedChat, setSelectedChat } = useChat();

    useEffect(()=>{
        let user = localStorage.getItem("user");
        // console.log(JSON.parse(user).user.name);
        user = JSON.parse(user);
        setName(user.user.name);
        setPicture(user.user.picture);
    }, []);

    function logout(){
        localStorage.removeItem("user");
        navigate("/");
    }
    

    return (
        <div className={"options-container " + (!darkTheme ? "" : "dark-theme-font")}>
            <div className="user-profile">
                <div className="user-image">
                    <Avatar src={picture} />
                </div>
                <div className="username">
                    <h2 onClick={()=>{
                        setSelectedChat("");
                        navigate("/welcome");
                    }}>{name}</h2>
                </div>
            </div>
            <hr />
            <div className="search-bar-and-options">
                <div className="search-bar">
                    <input id="search" type="text" placeholder="Search" />
                </div>
                <div className="options-div">
                    <PersonAddIcon />
                    <GroupAddIcon />
                    <AddCircleOutlineIcon onClick={()=>navigate("/create")} />
                    <DarkModeIcon onClick={()=>{
                        dispatch(toggleDarkMode())
                    }} />
                    <LogoutIcon onClick={logout} />
                </div>
            </div>
        </div>
    )
}

export default OptionsBar;