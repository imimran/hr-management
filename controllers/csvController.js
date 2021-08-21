import User from '../models/user';
import fs from "fs";
import * as csv from 'fast-csv';

const upload = async (req, res) => {
    // try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
     
      let users = [];
      console.log(" __basedir",  __basedir);
      let path = __basedir + "/uploads/" + req.file.filename;

      console.log("path", path);


  let emailPattern= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let successCount = 0;
  let errorCount = 0;
      fs.createReadStream(path)
        .pipe(csv.parse({  headers: [ undefined,'first_name', 'last_name', 'email', undefined ],renameHeaders: true, ignoreEmpty: true }))
        .validate(data => data.first_name !== '' && data.last_name !== '' && emailPattern.test(data.email))
        .on("error", (error) => {          
          throw error.message;
        })
        .on("data", (row) => {
          successCount++;
          users.push(row);
          console.log(`ROW=${JSON.stringify(row)}`)
        })
        .on('data-invalid', (row, rowNumber) => {
          errorCount++;
          console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`)
        })
        .on("end", (rowCount) => {
          console.log(`Parsed ${rowCount} rows`)
          User.bulkCreate(users, {
            validate: true,
          })
           
          
            .then(async() => {
           
              res.status(200).json({
                error: false,
                success:
                  `Uploaded ${successCount} row successfully from ` + req.file.originalname,
                failed:`Uploaded ${errorCount} row failed from ` + req.file.originalname,
                     
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: error.message,
                failed: `Fail to import ${users.length} row into database!`,
            
              });
            });
        });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     error: true,
    //     message: "Could not upload the file: " + req.file.originalname,
    //   });
    // }
};
  
const getUsers = (req, res) => {
    // User.findAll()
    //   .then((data) => {
    //     res.send(data);
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred.",
    //     });
    //   });
  };
  
export default{
    upload,
    getUsers
  };

  
