import express from 'express'
import path from 'path';
import { sequelize } from './models/db';


import employeeRoutes from './routes/public'
// import sequelize  from './models'
const app = express()
app.use(express.json())
app.use(cors());

app.use('/api/v1', employeeRoutes);

app.get('/', (req, res) =>{
    return res.status(200).json({ error: false, msg: "Hello Imran"})
})

app.use((req, res) =>{
    return res.status(404).json({ error: true, msg: "Request URL not found"})
})

//serve static files
app.use(express.static(path.join(__dirname, '/upload/')));



//connect Database
(async () => {
    await sequelize.sync({ force: false });
    console.log('Database Connected!')
  
})()
  
const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server Running on port ${port}`))