import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const socket = require("socket.io");
const path = require("path");

import { register, login, logout } from "./controllers/auth/login.js";
import auth from "./middleware/auth.js";
import { createGroups, renameGroups, addInGroups, removeFromGroups } from "./controllers/chat/group.js";
import { getUsers } from "./controllers/user/user.js";
import { accessChats, getChats } from "./controllers/chat/chat.js";
import { getMessages, createMessages } from "./controllers/messages/messages.js";
// import { notFound, handleError } from "./middleware/errorHandler.js";
const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// app.use(notFound);
// app.use(handleError);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);


app.get("/users", auth, getUsers);


app.get("/chats", auth, getChats);
app.post("/chats", auth, accessChats);

app.post("/groups", auth, createGroups);
app.patch("/groups", auth, renameGroups);
app.patch("/groupremove", auth, removeFromGroups);
app.patch("/groupadd", auth, addInGroups);


app.get("/messages/:chatId", auth, getMessages);
app.post("/messages", auth, createMessages);



const server = app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket)=>{
    console.log("Connected to socket.io");

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("Joined room: "+room);
    })

    socket.on("newMessage", (newMessageReceived)=>{
        let chat = newMessageReceived.chatId._id;
        console.log(chat);
        socket.to(chat).emit("message received", newMessageReceived);
    })
})


// ---------------------- Deployment ---------------------- //

// const __dirname1 = path.resolve();

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname1, "/frontend/build")));

//     app.get("*", (req,res)=>{
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//     })
// }else {
//     app.get('/', (req, res) => {
//         res.send("Hi");
//     })
// }

// ---------------------- Deployment ---------------------- //