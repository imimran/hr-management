import express from 'express'
import path  from 'path';
const app = express()

import sequelize  from './models'

app.use(express.json())

app.get('/', (req, res) =>{
    return res.status(200).json({ error: false, msg: "Hello Imran"})
})

app.use((req, res) =>{
    return res.status(404).json({ error: true, msg: "Request URL not found"})
})

//serve static files
app.use(express.static(path.join(__dirname, '/upload/')));


const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server Running on port ${port}`))