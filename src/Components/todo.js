import React from "react";
import Todoinput from "./todoInput";
import Todolist from "./todoList";
import {v4 as uuid} from "uuid";


const Todo=()=>{
    const [data, setData] = React.useState([]);
    const [showAll,setShowAll]=React.useState(true);
    const [isLoading,setIsLoading]=React.useState(false);
    const [isError,setIsError]=React.useState(false);

    const handleAdd = async (title)=>{
           await fetch(`http://localhost:3000/tasks`, {
            method: "POST",
            body: JSON.stringify({
                title,
                status:false,
                id:uuid(),
            }),
               headers: { "Content-type": "application/json; charset=UTF-8"}
            })

       await  fetch(`http://localhost:3000/tasks`)
         .then((res)=>res.json())
         .then((res)=>setData(res));
    }

    React.useEffect(()=>{
        setIsLoading(true);
        fetch(`http://localhost:3000/tasks`)
        .then((res)=>res.json())
        .then((res)=>setData(res))
        .catch((err)=>setIsError(true))
        .finally(()=>{setIsLoading(false)
        setIsError(false)})
    },[])

    
    


  
     const handleToggle = async (id,status)=>{
         await fetch(`http://localhost:3000/tasks/${id}`,{
         method:"PATCH",
         body: JSON.stringify({
              status: status ? false : true
         }),
         headers: { "Content-type": "application/json" }
         
         })

         await fetch(`http://localhost:3000/tasks`)
             .then((res) => res.json())
             .then((res) => setData(res));
        }

     
     const handleDelete = async (id)=>{
        await fetch(`http://localhost:3000/tasks/${id}`,{
             method:"DELETE"
     }
         )
         await fetch(`http://localhost:3000/tasks`)
             .then((res) => res.json())
             .then((res) => setData(res));
     }


    return(
        <>
        <h1>{ isLoading ? "Loading list ...... " : "" }</h1>
        <h1>{ isError? "Error Server not responding" : ""}</h1>
        <div>
            <h1>Todo App</h1>
            <Todoinput onClick={handleAdd}/>
            {data
            .filter((element)=> showAll? true : !element.status )
            .map((element)=>(
                <Todolist handleDelete={handleDelete} handleToggle={handleToggle} key={element.id} {...element} />
            ))}
            <button onClick={()=>setShowAll(!showAll)}>{showAll ? "Show Unfininished Task" : "Show All"}</button>
        </div>
        </>
    )
}

export default Todo;