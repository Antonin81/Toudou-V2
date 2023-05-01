function Category({cat, niveau}){
    let prefixe = "";
    for(let i=0;i<niveau;i++){
      prefixe+="-"
    }
    return(
        <div data-parentcat={cat.parent_category}>
            <br />
            <p>{prefixe}{cat.name}</p>
            <br />
        </div>
    )
}

export default Category