import { User } from "../../models/user.js";


async function getUsers(req, res) {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } }
            ]
        }
        : {};
    const users = await User.find(keyword).find({_id:{$ne:req.userId}});
    res.send(users);
}


export { getUsers };