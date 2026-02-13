import "./TaskList.css"
export const TaskList=({tasks,onToggle})=>{
    const completedTasks=(tasks.filter((task)=>task.isCompleted)).length
    const totalTasks=tasks.length
    return(
        <div>
            {(tasks).map((task)=>(
                <div key={task.id} className="task-item">
                    <div className="task-content">
                        <p className={task.isCompleted ? "completed-text" : ""}>
                            {task.text}
                        </p>
                        <p>{task.isCompleted ? "Completed ✅" : "Incompleted ⏳"}</p>
                    </div>

                    <button onClick={() => onToggle(task.id)}>Toggle</button>
                </div>
            ))}
            <div className="stats">
                <p>Completed Tasks: {completedTasks}</p>
                <p>Total Tasks: {totalTasks}</p>
            </div>

        </div>
    )
}