import { useState } from "react";

const TaskList = ({todos,onToggle,onEdit,onDelete})=>{

    const [editId,setEditId] = useState(null);
    const [editValue,setEditValue] = useState('');

    const handleDoubleClick = (todo)=>{
        setEditId(todo.id);
        setEditValue(todo.task);
    }

    const handleOKClick = ()=>{
        onEdit(editId,editValue);
        setEditId(null);
        setEditValue('');
    }

    let sno=0;
    return(
        <div className="task-list m-12">
            <h1>Task List</h1>
            <table className="w-full border border-gray-500 rounded-xl shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th>SNo</th>
                        <th>Completed</th>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length===0 ?(
                        <tr>
                            <td colSpan="3" className="text-center text-lg font-semibold">No tasks yet.</td>
                        </tr>
                    ):(
                        todos.map((todo)=>(
                            <tr key={todo._id} className="border-t">
                                <td className="text-center">
                                    {sno=sno+1}
                                </td>
                                <td className=" text-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={()=>onToggle(todo._id)}
                                        className="scale-200 cursor-pointer"
                                    />
                                </td>
                        
                                <td
                                    onDoubleClick={()=>handleDoubleClick(todo)}
                                    className={`text-center text-lg ${
                                        todo.completed?"line-through":""
                                    }`} 
                                >
                                    {editId === todo._id ? (
                                        <input type="text" value={editValue} onChange={(e)=>setEditValue(e.target.value)}
                                            autoFocus
                                            onKeyDown={(e)=>{
                                                if(e.key==="Enter") handleOKClick();
                                            }}
                                        />
                                    ):
                                    (todo.task)}
                                </td>
                                <td className=" text-center">
                                    {editId ===todo._id
                                        ?<button onClick={handleOKClick} className="!bg-green-500">Okay</button>
                                        :<button onClick={()=>{
                                            setEditId(todo._id)
                                            setEditValue(todo.task)}}>Edit</button>
                                    }
                                    <button className="!bg-red-500" onClick={()=>onDelete(todo._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )
                    }
                   
                </tbody>
               
               
            </table>
            
        </div>
    )
}

export default TaskList;