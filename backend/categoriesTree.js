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
}

function createTasksMap(data){
    var tempMap=new Map()
    console.log(data)
    for (let task of data){
      if(tempMap.has(task.task_category)){
        tempMap.get(task.task_category).push(task);
      }else{
        tempMap.set(task.task_category, [task]);
      }
    }
    return tempMap
}
  
  function createCategoriesTree(list){
    var tempCategoriesTree= new CategoriesTree(list[0].id_category,list[0].name,list[0].parent_category);
    console.log(tempCategoriesTree)
    list.shift();
      
    for( let cat of list){
      tempCategoriesTree.add(cat);
    }
  
    return tempCategoriesTree
}