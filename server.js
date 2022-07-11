
const express = require("express");
const bodypaser=require("body-parser");

const app = express();
app.use(bodypaser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/",function(request,respond){
    respond.sendFile(__dirname+"/index.html");
});


app.listen(3000,function(){
    console.log("Server is Started");
});