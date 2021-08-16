import User from '../models/user';
import fs from "fs";
import * as csv from 'fast-csv';



 const upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
  
      let users = [];
      console.log(" __basedir",  __basedir);
      let path = __basedir + "/uploads/" + req.file.filename;

      console.log("path", path);
  
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          users.push(row);
        })
        .on("end", () => {
          User.bulkCreate(users, {
            validate: true,
          })
            .then(() => {
              res.status(200).send({
                message:
                  `Uploaded ${users.length} data  successfully from ` + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: `Fail to import ${users.length}  into database!`,
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
};
  

const getUsers = (req, res) => {
    User.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };
  
export default{
    upload,
    getUsers
  };

// module.exports = {
//     upload,
//     getTutorials
//   };