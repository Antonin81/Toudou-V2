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

//création type de données
/*
class CategoriesTree{
    constructor(id, name, parentId){
      this.id=id;
      this.name=name;
      this.parentId=parentId;
      this.children=[];
    }
    // fonction booléenne qui doit renvoyer si une catégorie se trouve dans l'arbre, à partir de son id
    containsId(id){
      if(this.id===id){
          return true;
      }else{
          for(let cat of this.children){
              if(cat.containsId(id)){
                  return true;
              }
          }
          return false;
      }
    }
    //Fonction qui trouve ma catégorie correspondant à un id donné dans l'arbre
    getCategory(id){
      try {
          //teste si on a trouvé le noeud possédant le bon identifiant, si oui on le renvoit, sinon autre traitement
          if(this.id===id){
              return this;
          }else{
              //ici, pour chaque enfant du noeud actuel, on teste la correspondance
              let solution;
              for(let cat of this.children){
                  solution = cat.getCategory(id);
                  //si la solution est définie, on la renvoit.
                  if(solution!==undefined){
                      return solution;
                  }
              }
              //on retourne la solution trouvée
              return solution;
          }
      } catch (error) {
          console.error("This Category isn't stored");
      }
    }
    //fonction qui ajoute un noeud à l'arbre
    add(category){
      console.log(this.getCategory(category.parent_category))
      this.getCategory(category.parent_category).children.push(new CategoriesTree(category.id_category,category.name,category.parent_category))
    }
  
    //on récupère le parent d'une catégorie à partir de son id
    getParentId(id){
      if(this.containsId(id)){
          return ((this.getCategory(id)).parentId);
      }else{
          console.error("This element isn't in the tree");
      }
    }
    //fonction de conversion d'un arbre vers un string
    toString(tasksMap){
      return `\n\nid : ${this.id}, name : ${this.name}, parentCategory : ${this.parentId}, children : ${this.children}, associated tasks : ${tasksMap.get(this.id)}`;
    }
}*/

function createTasksMap(data){
    var tempMap={}
    for (let task of data){
        var key=task.task_category.toString()
      if(Object.keys(tempMap).includes(key)){
        tempMap[key].push(task)
        //tempMap.get(task.task_category).push(task);
      }else{
        tempMap[key]=[task]
        //tempMap.set(task.task_category, [task]);
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

/*  
function createCategoriesTree(list){
    var tempCategoriesTree= new CategoriesTree(list[0].id_category,list[0].name,list[0].parent_category);
    console.log(tempCategoriesTree)
    list.shift();
      
    for( let cat of list){
      tempCategoriesTree.add(cat);
    }
  
    return tempCategoriesTree
}*/

//routage

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