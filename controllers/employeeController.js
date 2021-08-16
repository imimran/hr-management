import User from '../models/user'



const getAllUser = async(req, res) => {
    try {
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : null;
    const offset = parseInt(req.query.offset)
      ? parseInt(req.query.offset)
      : null;
        const users = await User.findAll({ limit,
            offset,
            order: [["ID", "DESC"]],})
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

        console.log(req.body);
        let { first_name, last_name, email } = req.body

        let user = await User.findOne({ where: { email: email } });
         if (user) {
          return res.status(401).json({ error: true, msg: "E-mail already taken" });
        }

        // if (first_name == "" || first_name == null || first_name == undefined) {
        //     return res
        //       .status(401)
        //       .json({ error: true, msg: "First Name is requrired." });
        // }
        // if (last_name == "" || last_name == null || last_name == undefined) {
        //     return res
        //       .status(401)
        //       .json({ error: true, msg: "Last Name is requrired." });
        // }
        // if (email == "" || email == null || email == undefined) {
        //     return res
        //       .status(401)
        //       .json({ error: true, msg: "Email is requrired." });
        //   }
        
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