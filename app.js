import express from 'express'
import path from 'path';
import { sequelize } from './models/db';
import cors from 'cors'

import employeeRoutes from './routes/public'

const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));


global.__basedir = __dirname ;
app.use('/api/v1', employeeRoutes);

app.get('/', (req, res) =>{
    return res.status(200).json({ error: false, msg: "Hello Imran"})
})

app.use((req, res) =>{
    return res.status(404).json({ error: true, msg: "Request URL not found"})
})

//serve static files
app.use(express.static(path.join(__dirname, '/uploads/')));



/*Generating the database table. If we set force:true then each and every
 *time when we start our application all tables will be drop from the
 *database and regenerate new. So beware of it before using it.
 */

//connect Database
(async () => {
    await sequelize.sync({ force: false });
    console.log('Database Connected!')
  
})()
  
const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server Running on port ${port}`))
