const express=require('express')
const cors=require('cors')
require('dotenv').config()
const connectDB=require('./config/connectDB')
const router=require('./routes/index')
const cookiesParser=require("cookie-parser")
const {app,server}=require('./socket/index')

// const app=express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT=process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message:"Server running at "+PORT
    })
})


// api end points
app.use('/api',router)


// Handle CORS headers manually if needed
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});



connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server running at localhost:${PORT}`)
    })
})

