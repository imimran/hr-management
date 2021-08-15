import User from '../models/user'

const getAllUser = async(req, res) => {
    try {
        const users = await User.findAll({})
        return res.status(200).json({ error: false, data: users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: false, msg: "Server Error"})
    }
}


const getUser = async(req, res) => {
    try {
        const userId = req.params.id
        const findUser = await User.findOne({ id: userId })
        if (!findUser) {
            return res.status(404).json({ error: true, msg: "Not Found"})
        }
        const user = await User.findByPK({id: userId})
        return res.status(200).json({ error: false, data: user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, msg: "Server Error"})
    }
}


const addUser = async(req, res) => {
    try {
        let { first_name, last_name, email } = req.body
        
        const newUser = await User.create({
            first_name,
            last_name,
            email
        }) 
        return res.status(201).json({ error: false, msg: "Employee Create Successfuly", data: newUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, msg: "Server Error"})
    }
}

export default {
    getAllUser,
    getUser,
    addUser
}