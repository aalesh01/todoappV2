import React from "react";
import Todoinput from "./todoInput";
import Todolist from "./todoList";
import {v4 as uuid} from "uuid";


const Todo=()=>{
    const [data, setData] = React.useState([]);
    const [showAll,setShowAll]=React.useState(true);

    const handleAdd = (title)=>{
        const payload = {
            title,
            status:false,
            id: uuid()
        }
        setData([...data,payload]);
    }

     const handleToggle = (id)=>{
         setData(data.map((element) => {
              if(element.id === id) return {...element,status: !element.status}
              else return element;
         }
         )
         )

        }

     
     const handleDelete = (id)=>{
          setData([...data.filter((element)=>{
             return element.id!==id;
         })])

     }


    return(
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
    )
}

export default Todo;