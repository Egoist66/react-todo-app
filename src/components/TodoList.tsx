import {FilterValuesType} from "./App.tsx";
import AddTodoForm from "./AddTodoForm.tsx";
import {Task} from "./Task.tsx";
import TodoControls from "./TodoControls.tsx";
import Editable from "./Editable.tsx";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {ControlPoint} from "@material-ui/icons";


export type TasksProps = {
    id: string;
    name: string;
    isDone: boolean;
};

type TodoListProps = {
    data: {
        title: string;
        filter: FilterValuesType;
        tasks?: Array<TasksProps>;
        removeTask: (id: string, toDoListId: string) => void;
        removeTodo: (toDoListId: string) => void;
        filterTask: (arg: FilterValuesType, todoListId: string) => void;
        addTask: (task: string, toDoListId: string) => void;
        changeStatus: (id: string, status: boolean, toDoListId: string) => void;
        changeTodoTitle: (newValue: string, id: string) => void;
        changeTaskTitle: (newValue: string, id: string, toDoListId: string) => void;
        todoListId: string
    };
};

export type TodoListStateTypes = {
    taskName: string;
    fieldError: boolean;

};

export function TodoList({data}: TodoListProps) {



    const removeTodoList = () => {
        const confirmation = confirm('Are you sure to remove Todo?')
        if (confirmation) {
            data.removeTodo(data.todoListId)
        }
    }

    const addTask = (task : string) => {
        data.addTask(task, data.todoListId)
    }

    const changeTodoTitle = (newValue: string) => {
        data.changeTodoTitle(newValue, data.todoListId)
    }

    const changeTaskEdits = (newValue: string, id : string): void => {

        data.changeTaskTitle(newValue, id, data.todoListId)

    }




    return (
        <div className={'todo'}>
            <h3 className={'todo-title'}>
                <Editable title={data.title} onSaveEdits={changeTodoTitle}  />
                <Button
                    onClick={removeTodoList}
                    size={"small"}
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </h3>

            <AddTodoForm data={{
                addItem: addTask,
                btnText: <ControlPoint />,
                placeHolder: 'Add a task...'

            }}/>

            <ul>
                {data.tasks?.map((task) => (
                    <Task
                        key={task.id}
                        data={{
                            toDoListId: data.todoListId,
                            changeStatus: data.changeStatus,
                            changeTaskTitle: changeTaskEdits,
                            name: task.name,
                            tasks: data.tasks,
                            _id: task.id,
                            removeTask: data.removeTask,
                            isDone: task.isDone,
                        }}
                    />
                ))}
            </ul>

            <TodoControls data={{
                todoListId: data.todoListId,
                filter: data.filter,
                filterTask: data.filterTask
            }} />

        </div>
    );
}