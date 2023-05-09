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
    "origin": "*"
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


function createTasksMap(data){
    var tempMap={}
    for (let task of data){
        var key=task.task_category.toString()
      if(Object.keys(tempMap).includes(key)){
        tempMap[key].push(task)
      }else{
        tempMap[key]=[task]
      }
    }
    return tempMap
}

function createCategoriesMap(data){
    var tempMap={}
    for (let cat of data){
        var key=cat.parent_category.toString()
      if(Object.keys(tempMap).includes(key)){
        tempMap[key].push(cat)
      }else{
        tempMap[key]=[cat]
      }
    }
    return tempMap
}

//routage
//--tasks
app.get('/tasks/uncomplete', (req,res) => {
    db.query("select * from tasks where is_done=false;", function(err, reponse){
        if (err) throw err;
        db.query('select * from categories where id_category!=parent_category order by parent_category asc, id_category asc;', function(erro,rep){
            if(erro) throw erro;
            db.query('select * from categories where id_category=parent_category;', function(err3,reponse3){
                if(err3) throw err3;
                //var categoriesTree = createCategoriesTree(rep);
                var categoriesMap = createCategoriesMap(rep)
                var tasksMap = createTasksMap(reponse);
                var locals={
                    tasksList:reponse,
                    categoriesList:rep,
                    categoriesMap:categoriesMap,
                    tasksMap:tasksMap,
                    firstCategory:reponse3[0]
                }
                res.send(locals);
            })
        })
    });
});

app.get('/tasks/complete', (req,res) => {
    db.query("select * from tasks where is_done=true;", function(err, reponse){
        if (err) throw err;
        db.query('select * from categories where id_category!=parent_category order by parent_category asc, id_category asc;', function(erro,rep){
            if(erro) throw erro;
            db.query('select * from categories where id_category=parent_category;', function(err3,reponse3){
                if(err3) throw err3;
                //var categoriesTree = createCategoriesTree(rep);
                var categoriesMap = createCategoriesMap(rep)
                var tasksMap = createTasksMap(reponse);
                var locals={
                    tasksList:reponse,
                    categoriesList:rep,
                    categoriesMap:categoriesMap,
                    tasksMap:tasksMap,
                    firstCategory:reponse3[0]
                }
                res.send(locals);
            })
        })
    });
});

app.post('/tasks/create', (req,res) => {
    console.log(req.body)   
    if(req.body.end_date!=null){
        db.query(`insert into tasks (title, description, end_date,is_done,duration,task_category) values ('${req.body.title}', '${req.body.description}','${req.body.end_date}',false,${req.body.duration},${req.body.task_category});`,(err,reponse)=>{
            if(err!=undefined){
                res.send({errorHasOccured:true});
            }
            else{
                res.send({errorHasOccured:false})
            }
        }) 
    }else{
        db.query(`insert into tasks (title, description, is_done,duration,task_category) values ('${req.body.title}', '${req.body.description}',false,${req.body.duration},${req.body.task_category});`,(err,reponse)=>{
            if(err!=undefined){
                res.send({errorHasOccured:true});
            }
            else{
                res.send({errorHasOccured:false})
            }
        }) 
    }
    
})

app.delete('/tasks/delete',(req,res)=>{
    db.query(`delete from tasks where id_task=${req.body.id_task};`, function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    });
})

app.patch('/tasks/check',(req,res)=>{
    db.query(`update tasks set is_done=true where id_task=${req.body.id_task};`, function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    });
})

app.patch('/tasks/modifyParent',(req,res)=>{
    db.query(`update tasks set task_category=${req.body.newParent} where id_task=${req.body.id_task};`,function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    })
})

//--categories

app.get('/categories',(req,res)=>{
    db.query('select * from categories;', function(err, reponse){
        if(err)throw err;
        db.query('select * from categories where id_category=parent_category;', function(err2, reponse2){
            if(err2)throw err2;
            var categoriesMap = createCategoriesMap(reponse)
            var locals={
                categoriesList:reponse,
                categoriesMap:categoriesMap,
                firstCategory:reponse2
            }
            res.send(locals)
        })
    })
})

app.post('/categories/create',(req,res)=>{
    db.query(`insert into categories(name, parent_category) values('${req.body.categoryName}',${req.body.parentCategoryId});`, function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    });
})

app.delete('/categories/delete',(req,res)=>{
    db.query(`delete from tasks where task_category=${req.body.categoryId};`, function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
    });
    db.query(`delete from categories where id_category=${req.body.categoryId};`, function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    });
})

app.patch('/categories/modifyName',(req,res)=>{
    db.query(`update categories set name='${req.body.newName}' where id_category=${req.body.id_category};`,function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    })
})

app.patch('/categories/modifyParent',(req,res)=>{
    db.query(`update categories set parent_category=${req.body.newParent} where id_category=${req.body.id_category};`,function(err, reponse){
        if(err!=undefined){
            res.send({errorHasOccured:true});
        }
        else{
            res.send({errorHasOccured:false})
        }
    })
})