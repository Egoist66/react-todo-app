import {TasksProps} from "./TodoList.tsx";
import Editable from "./Editable.tsx";
import DeleteIcon from '@material-ui/icons/Delete';
import {Checkbox, IconButton} from "@material-ui/core";

interface PropsType {
    data: {
        isDone?: boolean,
        name: string,
        _id: string,
        toDoListId: string,
        tasks?: Array<TasksProps>,
        changeTaskTitle: (newValue: string, id: string) => void
        removeTask: (id: string, toDoListId: string) => void,
        changeStatus: (taskId: string, status: boolean, toDoListId: string) => void

    }

}


export function Task({data}: PropsType) {

    const deleteTask = (): void => {
        const confirmation = confirm('Do you really wish to remove a task?')
        if (confirmation) {
            data.removeTask(data._id, data.toDoListId)
        }
    }

    const changeTaskStatus = (): void => {

        data.changeStatus(data._id, !data.isDone, data.toDoListId)

    }

    const changeTaskEdits = (newValue: string): void => {

        data.changeTaskTitle(newValue, data._id)

    }


    return (
        <>

            <li className={data.isDone ? 'is-done' : ''}>


                <Checkbox
                    onChange={changeTaskStatus}
                    id={data._id}
                    className={'task_input'}
                    checked={data.isDone}
                    name="task-status"
                    color="primary"
                />


                <label htmlFor={data._id} className={'task_name'}>
                    <Editable
                        onSaveEdits={changeTaskEdits}
                        title={data.name}
                    />
                </label>

                <IconButton onClick={deleteTask} aria-label="delete">
                    <DeleteIcon />
                </IconButton>



            </li>

        </>

    )
}