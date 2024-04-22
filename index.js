import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import session from "express-session";
// import path from "path";
let name=0;
let data=[];
let obj={};
let blogs=[];



import { fileURLToPath } from "url";
const _dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
app.use(express.static("public", { 'strict': false }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'Harini_armY2512',
    resave:false,
    saveUninitiaized:true
}));
// app.set('view engine', 'ejs');
// app.set('views', path.join(_dirname, 'views'));
const port=3000;
app.get("/",(req,res)=>{
    res.render("index.ejs", {blogs:blogs,obj:obj,name:name});
})

app.get("/create",(req,res)=>{
    
    res.render("create.ejs");
    
    
})

app.post("/create",(req,res)=>{
    const title=req.body["title"];
    const description=req.body["description"];
    req.session.t=title;
    req.session.d=description;
    console.log("title is "+title);
    console.log("description is "+description);
    
    
    // data=[{
    //     t:title,
    //     d:description
    // }];
    // obj[title]=description;
    blogs.push({ title: title, description:description});

    name++;
    console.log("count is:"+name);
    blogs.push("--------------");
    console.log("new line addedd");
    res.redirect("/");

   
})
app.get("/more",(req,res)=>{
    res.render("more.ejs", { blogs: blogs });
})

app.post("/more",(req,res)=>{
    const title=req.body["title"];
    const description=req.body["description"];
    req.session.t=title;
    req.session.d=description;
    console.log("title is "+title);
    console.log("description is "+description);
    
    blogs.push({ title: title, description: description });

    name++;
    console.log("count is:"+name);
    blogs.push("--------------");
    console.log("new line addedd");
    res.redirect("/more");
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
// app.get("/posts/:postName",function(req,res){

//     const requestedTitle=_.lowerCase(req.params.postName);
//     posts.forEach(function(data){
//       const storedTitle=_.lowerCase(data.title);
//       if(storedTitle===requestedTitle){
//         res.render("post.ejs",{
//           title:data.title,
//           post:data.post
//         });
//         console.log("match found!");
//       };
//     });