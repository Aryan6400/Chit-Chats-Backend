import { AddBoxRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import "./CreateGroup.css";
import { useState } from "react";

function CreateGroup(){
    const [name, setName] = useState();
    const darkTheme = useSelector((state)=>state.darkMode);

    async function createGroup() {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const data = {
          name: name,
          users: []
        }
        try {
          const response = await fetch("http://localhost:8080/groups", {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });
          const result = await response.json();
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div className={"create-group-container" + (darkTheme ? " dark-create-div" : "")}>
            <input type="text" placeholder="Enter group name" className="create-group" value={name} onChange={(e)=>setName(e.target.value)} />
            <IconButton>
                <AddBoxRounded className={darkTheme ? "dark-theme-font" : ""} />
            </IconButton>
        </div>
    )
}

export default CreateGroup;