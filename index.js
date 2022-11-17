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

// get all the elements from table 
app.get('/getinfo',async(req,res)=>{
    try {
        
        const blogdata=await pool.query("SELECT * FROM blogcgt");

        res.json(blogdata.rows);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

// get all the element using id 
app.get('/getinfo/:id',async(req,res)=>{
    try {
        console.log(req.params);

        const {id}=req.params;
        // console.log(id);
        // const blogdata=await pool.query(`SELECT * FROM blogcgt WHERE cg_id=2`);
        const blogdata=await pool.query("SELECT * FROM blogcgt WHERE cg_id=$1",[id]);

        res.json(blogdata.rows);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

// update table using id 
app.post('/updateinfo',async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.body.cg_id);
        console.log(req.body.bloginfo);


    const {cg_id,bloginfo}=req.body;
        
        const blogdata=await pool.query(
            "UPDATE blogcgt SET bloginfo=$1 WHERE cg_id=$2",[bloginfo,cg_id]);

        res.json(blogdata.rows);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

// delete table using id 

app.delete('/delinfo/:id',async(req,res)=>{
    try {
        console.log(req.params);

        const {id}=req.params;
        // console.log(id);
        // const blogdata=await pool.query(`SELECT * FROM blogcgt WHERE cg_id=2`);
        const blogdata=await pool.query("DELETE FROM blogcgt WHERE cg_id=$1",[id]);

        res.json(blogdata.rows);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

// tell server listen to this port 
app.listen(port,function(err){
    if(err){
        console.log("Error",err);
    }
    console.log(`Sucessfully connected server with port no:${port}`);
})