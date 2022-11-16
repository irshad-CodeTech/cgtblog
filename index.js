// Acquire express module
const express=require('express');
const edb=require('./employee')
const cors=require("cors");
const pool=require("./db")
const app=express();
// acquire path module 
const path=require('path')
// defining local path 
const port =8000;

const dotenv = require("dotenv")
dotenv.config()
app.use(cors())
app.use(express.json())

// rouing to homepage
app.get('/',function(request,response){
    response.sendFile(path.join(__dirname,'index.html'))
    // response.send("Code Garage Block")
})

// routing 
app.post('/addblog',async(req,res)=>{
    try {
        console.log(req.body);
        const {bloginfo}=req.body;
        const newBlog=await pool.query(
            "INSERT INTO blogcgt(bloginfo) VALUES ($1)",
            [bloginfo]
        );

        res.json(newBlog);
    } catch (error) {
        console.error(error.message);
    }
});

// tell server listen to this port 
app.listen(port,function(err){
    if(err){
        console.log("Error",err);
    }
    console.log(`Sucessfully connected server with port no:${port}`);
})