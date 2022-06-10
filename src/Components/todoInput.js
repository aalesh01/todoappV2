import React from "react";


const Todoinput = ({onClick}) => {

    const [title, setTitle] = React.useState("");

    return (
        <>
            <div>
                <input placeholder="Enter Grocery Item" 
                value={title}
                onChange={(e) =>  setTitle(e.target.value)}
                 />
            </div>
            
            <button onClick={()=>{ onClick(title); setTitle("") }}>Add to List</button>
        </>
    )
}

export default Todoinput;