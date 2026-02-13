import { useState } from "react"
import { TaskList } from "./TaskList"

export const TaskForm = ()=>{
    const [inputValue,setInputValue]=useState('')
    const [tasks,setTasks]=useState([])

    const addTask=(e)=>{
        e.preventDefault()

        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        if(tasks.some((t)=>(t.text==trimmedValue))) return;

        const newTask={
            id:crypto.randomUUID(),
            text:inputValue,
            isCompleted:false
        }

        setTasks((prev)=>[...prev,newTask])
        setInputValue('')
    }

    const toggleTask=(id)=>{
        setTasks((prev)=>{
            const updatedTasks=[...prev]
            const index = updatedTasks.findIndex(task => task.id === id);

                if (index !== -1) {
                const targetTask= updatedTasks[index]

                const newTask={
                    ...targetTask,
                    isCompleted:!targetTask.isCompleted
                }
                updatedTasks[index]=newTask
            }
            return updatedTasks
        })
    }
    return(
        <form onSubmit={addTask}>
           <label htmlFor="task">Create a Task</label>
            <input type="text" id="task" name="task" 
            value={inputValue} 
            onChange={(e)=>setInputValue(e.target.value)}/>

            <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            />

            <button type="submit">Add a Task</button> 
        </form>
    )

}