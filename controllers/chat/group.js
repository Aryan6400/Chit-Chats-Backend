import { User } from "../../models/user.js";
import { Chat } from "../../models/chat.js";

async function createGroups(req, res) {
    if(!req.body.name || !req.body.users){
        res.status(400).json("Incomplete Information.");
    }
    let users = JSON.parse(req.body.users);
    users.push(req.userId);
    try {
        const groupChat = await Chat.create({
            name: req.body.name,
            isGroup: true,
            admin: req.userId,
            users: users,
        })

        const newGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users", "-password")
        .populate("admin", "-password");

        res.status(201).json(newGroupChat);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

async function renameGroups(req, res) {
    try {
        const group = await Chat.findByIdAndUpdate(req.body.chatId, {$set:{name:req.body.name}}, {new:true})
        .populate("users", "-password")
        .populate("admin", "-password");
        res.status(201).json(group);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

async function addInGroups(req, res){
    try {
        const group = await Chat.findByIdAndUpdate(req.body.chatId, {$push:{users:req.body.userId}}, {new:true})
        .populate("users", "-password")
        .populate("admin", "-password");
        res.status(201).json(group);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

async function removeFromGroups(req, res){
    try {
        const group = await Chat.findByIdAndUpdate(req.body.chatId, {$pull:{users:req.body.userId}}, {new:true})
        .populate("users", "-password")
        .populate("admin", "-password");
        res.status(201).json(group);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}


export { createGroups, renameGroups, addInGroups, removeFromGroups };