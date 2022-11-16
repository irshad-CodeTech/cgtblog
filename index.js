const express=require('express');
const app=express();
const port =8000;

app.get('/',function(request,response){
    response.send("Code Garage Block")
})

app.listen(port,function(err){
    if(err){
        console.log("Error",err);
    }
    console.log(`Sucessfully connected server with port no:${port}`);
})