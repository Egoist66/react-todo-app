import {TasksProps} from "./TodoList.tsx";

interface PropsType  {
    data: {
        isDone?: boolean,
        name?: string,
        _id: string,
        toDoListId: string,
        tasks?: Array<TasksProps>,
        removeTask: (id: string, toDoListId: string) => void,
        changeStatus: (taskId: string, status : boolean, toDoListId: string) => void

    }

}



export function Task({data}: PropsType) {

    const deleteTask = () : void => {
        data.removeTask(data._id, data.toDoListId)
    }

    const changeTaskStatus = () : void => {

        data.changeStatus(data._id, !data.isDone, data.toDoListId)

    }

    return (
       <>

           <li className={data.isDone ? 'is-done' : ''}>

               <input
                   onChange={changeTaskStatus}
                   id={data._id.toString()}
                   className={'task_input'}
                   checked={data.isDone}
                   type="checkbox"
               />

               <label
                   htmlFor={data._id.toString()}
                   className={'task_name'}>{data.name}
               </label>

               <button onClick={deleteTask} className={'task_delete'}>&times;
               </button>


           </li>


       </>

    )
}