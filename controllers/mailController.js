
import User from '../models/user'
import nodemailer from 'nodemailer'


var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7e596c652350a9",
      pass: "46658256c5a4e6"
    }
  });

// var transporter = nodemailer.createTransport({
//     service: '',
//     auth: {
//         user: '',
//         pass: ''
//     }
// });

const bulkMessgeSend = async (req, res) => {
    // let id = req.params.ID.split(',');
    try {

        let { employees , message, subject } = req.body;
        let employee_list = employees.split(',');
        
        employee_list.map(async (i) => {
            const intId = parseInt(i);
            let employee = await User.findOne({ where: { id: intId } });
            console.log("employee", employee);
            if (employee) {
                var mailOptions = {
                    from: 'inbox2aih@gmail.com',
                    to: employee.email,
                    subject: subject,
                    text: message
                };
        
                await transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(500).json({ error: true, msg: "Email server error." });
                        
                    }
                });
            }
        });

        return res.status(200).json({ error: false, msg: "Message sent Successfull ."});
        // });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, msg: "Internal server error." });
    }
};
const MessgeSendToAll = async (req, res) => {
    try {
        let { message, subject } = req.body;
        const employees = await User.findAll({
            order: [["ID", "DESC"]],
        });
        employees.map(async (item) => {
            const email = item.email;
            if (email) {
                console.log(email)
               
                var mailOptions = {
                    from: 'inbox2aih@gmail.com',
                    to: email,
                    subject: subject,
                    text: message
                };
        
                await transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            }
        });

        return res.status(200).json({ error: false, msg: "Message sent Successfull ."});
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ error: true, msg: "Internal server error." });
    }
};


export default{
    bulkMessgeSend,
    MessgeSendToAll 
};
