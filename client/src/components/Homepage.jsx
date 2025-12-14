import { useEffect, useState } from "react";
import InputField from "./InputField";
import TaskList from "./TaskList";
import apiClient from '../apiClient';
const Homepage = ()=>{
    const [task,setTask] = useState('');
    const [taskErr,setTaskErr] = useState('');
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState('');

    useEffect(()=>{
        const fetchTodos = async()=>{
            try{
                // const response = await fetch('http://localhost:3000/api/v1/tasks');
                const response = await apiClient('');
                const data = await response.json();
                if(response.ok){
                    setTodos(data.tasks);
                }else{
                    throw new Error('Error!Could not fetch data');
                }
            }catch(error){
                console.error('Error fetching todos:',error);
            }
        }
        fetchTodos();
    },[]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setTaskErr('');
        setSuccess('');
        if(task===''){
            setTaskErr('Error! fill the task field');
            return;
        }
        let completed=false;
        const newTodo = {task,completed};

        try{
            setLoading(true);
            // const response = await fetch('http://localhost:3000/api/v1/tasks',{
            const response = await apiClient('/',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(newTodo)
            });
            const todowithId = await response.json();
            if(!response.ok){
                throw new Error('Server Error');
            }
            // console.log(todowithId);
            // setTodos((prev)=>[...prev,todowithId.task]);
            setTodos((prev)=>[...prev,todowithId.newTask]);
            setLoading(false);
            setSuccess('Task has been added successfully!')
            setTask('');

        }catch(error){
            console.log('Server error:',error);
        }
    }

    const onToggle = (id)=>{
            // console.log(id);
            setTodos((prev)=>prev.map((t)=>{
                return(
                t._id===id?{...t,completed:!t.completed}:t
                )
            }))
    }

    const onEdit = async (id,newTask)=>{
        try{
            // const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`,{
            const response = await apiClient(`/${id}`,{
                method:'PATCH',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({task:newTask})
            });
            if(!response.ok){
                throw new Error('Failed to edit task');
            }
            const updatedTask = await response.json();

            setTodos((prev)=>
                prev.map((t)=>t._id===id
                ?updatedTask.task
                :t));


        }catch(error){
            console.log('Error updating task:',error)
        }
    }

    const onDelete = async (id)=>{
        try{
            // const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`,{
            const response = await apiClient(`/${id}`,{
                method:'DELETE',
            })
            if(!response.ok){
                throw new Error('Failed to delete from server');
            }
            setTodos((prev)=>prev.filter((t)=>t._id!==id))
            // console.log('Task deleted successfully');
        }catch(error){
            console.error('Error deleting task:',error);
        }
    }

    return(
        <>
            <div className="form-container">
                <h1>To-do List</h1>
                <form onSubmit={handleSubmit}>
                    <InputField label="Enter a task" type="text" value={task} onChange={(e)=>setTask(e.target.value)}  />
                    {taskErr && <div className="text-red-500">{taskErr}</div>}
                    {loading?<button disabled>Add Task</button>:<button>Add Task</button>}
                    {success && <div className="text-green-500">{success}</div>}
                </form>
            </div>
            <div>
                <TaskList todos={todos} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </>
    )
}

export default Homepage;