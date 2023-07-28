import {Task} from "./Task";
import {ChangeEvent, KeyboardEvent, useState} from "react";


export type TasksProps = {
    id: string,
    name: string,
    status: boolean
}


type TodoListProps = {
    data: {
        title?: string,
        tasks?: Array<TasksProps>,
        removeTask: (id: string) => void,
        filterTask: (e : any) => void,
        addTask: (task: string) => void
    }
}

export function TodoList({data}: TodoListProps) {

    let [taskName, setTaskName] = useState('')

    const addTaskInTodoListByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter') || (e.ctrlKey && e.key === 'Enter')) {
            addTaskInTodoList()
        }

    }

    const addTaskName = (e : ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value)
    }

    const addTaskInTodoList = () => {
        if (taskName === '') {
            alert('Empty data!')
            return
        }
        data.addTask(taskName)
        setTaskName('')
    }

    return (
        <div>
            <h3>{data.title}</h3>
            <div>
                <input
                    onKeyDown={addTaskInTodoListByEnter}
                    value={taskName}
                    onChange={addTaskName}
                    placeholder='Add task...' type="text"
                />

                <button onClick={addTaskInTodoList}>+</button>
            </div>
            <ul>
                {data?.tasks?.map(task => (
                    <Task key={task.id} data={{
                        name: task.name,
                        _id: task.id,
                        removeTask: data.removeTask,
                        status: task.status
                    }}/>
                ))}
            </ul>
            <div onClick={data.filterTask}>
                <button name={'all'}>All</button>
                <button name={'active'}>Active</button>
                <button name={'completed'}>Completed</button>
            </div>
        </div>
    )
}

