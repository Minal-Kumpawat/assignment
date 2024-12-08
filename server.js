const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./route/userRoute')
const taskRoutes = require('./route/taskRoute')
const cors = require('cors')
const {auth} = require('./middlewares/auth')
const port=process.env.PORT || 5475
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo is connected")
}).catch(()=>{
    console.log('error in connecting mongo')
})

app.use('/api/auth',authRoutes)
app.use('/api/',auth,taskRoutes)


app.listen(port, ()=>{
    console.log("port is running")
})