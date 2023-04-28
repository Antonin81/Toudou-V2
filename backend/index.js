const express=require('express');
const app=express();
const http = require('http').createServer(app);
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/localhost/
}))

// ouvre le port et le serveur

http.listen(8000, () =>{
    console.log("Je suis sur le port 8000");
});

//crée la connexion avec la bdd

const db=mysql.createConnection({
    host:"localhost",

    user:"root",

    password:"root",

    database:"toudou"
});

//gère le cas où la connexion échoue

db.connect(function(err){
    if (err) throw err;
    console.log("Connecté à la base de données");
});

//routage

app.get('/tasks/uncomplete', (req,res) => {
    db.query("select * from tasks where is_done=false;", function(err, reponse){
            if (err) throw err;
            var locals={
                tasksList:reponse
            }
            res.send(locals);
    });
    
});
app.get('/tasks/complete', (req,res) => {
    db.query("select * from tasks where is_done=true;", function(err, reponse){
            if (err) throw err;
            var locals={
                tasksList:reponse
            }
            res.send(locals);
    });
    
});