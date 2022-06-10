import React from "react";


const Todolist=({title,status,id,handleToggle,handleDelete})=>{
    return(
       <div>
           <li>{title}</li>
           <button onClick={()=>handleToggle(id)}>{status? "TRUE" : "FALSE"}</button>
           <button onClick={()=>handleDelete(id)}>Delete</button>
       </div>

    )
}

export default Todolist;