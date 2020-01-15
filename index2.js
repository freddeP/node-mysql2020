const express = require('express');
const mysql = require("mysql");
const {check, body, validationResult } = require("express-validator");
const escape = require("escape-html");
const render = require("./template");
const con = mysql.createConnection({
    host:"localhost",
    port:"3309",
    user:"root",
    password:"",
    database:"node2020"
});
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + "/client"));


con.connect((err)=>{
    err ? console.log(err.message): console.log("connected");
});


app.get("/create",(req,res)=>{

    res.send(require('./template')(`
        <form action="/create" method="post">
            <input type="text" name="title" placeholder="title">
            <textarea name="content" placeholder="Post Content" ></textarea>
            <input type="submit" value="save post">
        </form>
    `));

});

app.post("/create",[
 /*    body('title').escape(),
    body('content').escape() */
],(req,res)=>{

    const {title,content} = req.body;

    const q = `INSERT INTO posts (title, content) VALUES (?,?)`;

    con.query(q,[title,content],(err)=>{
        err ? res.send(err.message): res.redirect("/");
    });

});


app.get('/',function(req,res){

    const q = "SELECT * FROM posts ORDER BY id DESC";
    con.query(q,(err,data)=>{

        if(err) res.send(err.message)
        else
        {
            let html = data.map(p=>{
                return `
                <div id = ${p.id}>
                <h1>${escape(p.title)}</h1>
                <p>${escape(p.content)}</p>
                <a href = "/delete/${p.id}">delete - ${p.id}</a> |
                <a href = "/edit/${p.id}">edit</a> |
                <button onclick="edit(${p.id})">Edit Front End</button>
                </div>
                `;
            });
            html = html.join('');
            let error = req.query.error ? req.query.error : ""; 
            res.send(render(html,escape(error)));
        }
    
    });
 });

app.get('/delete/:id',[
    check("id").isNumeric()
],function(req,res){

    if(validationResult(req).errors.length>0){
        return res.redirect("/?error=invalidValue");
    }

    const id = req.params.id;
    const q = "DELETE FROM posts WHERE id = "+id;

    con.query(q,(err)=>{
        err ? res.send(err.message): res.redirect("/");
    })

});

app.get('/edit/:id',function(req,res){

    q = "SELECT * FROM posts WHERE id = ?";
    con.query(q,[req.params.id],(err,data)=>{

        if(!err){
            let form = `
            <form action="/update" method="post">
                <input type="text" name="title" value = "${data[0].title}">
                <textarea name="content" placeholder = "content">${data[0].content}</textarea>
                <input type = "hidden" name = "id" value = "${data[0].id}">
                <input type="submit" value="save post">
            </form>`;

            res.send(render(form));
        }


        
    });

 });






app.listen(3666,()=>console.log("3666"));