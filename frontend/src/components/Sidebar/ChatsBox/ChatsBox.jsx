import { Avatar } from '@chakra-ui/react';
import "./ChatsBox.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useChat } from '../../../context/ChatContext';


function ChatsBox() {
    const navigate = useNavigate();
    const darkTheme = useSelector((state) => state.darkMode);
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const { setSelectedChat } = useChat();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
        async function getChats() {
            const response = await fetch("http://localhost:8080/chats", {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { Authorization: `Bearer ${userInfo.token}` },
                redirect: "follow",
                referrerPolicy: "no-referrer"
            });
            const result = await response.json()
            setChats(result);
        }
        getChats();
    }, [])

    function getChatPicture(chat) {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if (userInfo.user._id == chat.users[0]._id) return chat.users[1].picture;
        else return chat.users[0].picture;
    }

    function getChatName(chat) {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        if (userInfo.user._id == chat.users[0]._id) return chat.users[1].name;
        else return chat.users[0].name;
    }

    return (
        <div className={"panel-chats-container" + (darkTheme ? " dark-theme-font" : "")}>
            <div className="panel-chats-box">

                {chats.map((chat) => {
                    return (
                        <div key={chat._id} className={"chat-box" + (darkTheme ? " dark-chat-box" : "")} onClick={() => {
                            setSelectedChat(chat);
                            navigate("/chat");
                        }}>
                            <div className="chat-avatar">
                                <Avatar src={chat.isGroup ? chat.picturePath : getChatPicture(chat)} />
                            </div>
                            <div className="chat-name-and-desc">
                                <h3>{chat.isGroup ? chat.name : getChatName(chat)}</h3>
                                <div className='last-message'>
                                    {chat.lastMessage ? <p>{chat.isGroup ? chat.lastMessage.sender.name + " : " : null} {chat.lastMessage.text}</p> : <p>No new message.</p>}
                                    {chat.lastMessage ? <span>{chat.lastMessage.createdAt.split("T")[1].split(".")[0].slice(0, 5)}</span> : <span>Today</span>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatsBox;