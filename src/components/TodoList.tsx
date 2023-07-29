import {Task} from "./Task";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App.tsx";

export type TasksProps = {
    id: string;
    name: string;
    isDone: boolean;
};

type TodoListProps = {
    data: {
        title?: string;
        filter: FilterValuesType | string;
        tasks?: Array<TasksProps>;
        removeTask: (id: string, toDoListId: string) => void;
        removeTodo: (toDoListId: string) => void;
        filterTask: (arg: FilterValuesType, todoListId: string) => void;
        addTask: (task: string, toDoListId: string) => void;
        changeStatus: (id: string, status: boolean, toDoListId: string) => void;
        todoListId: string
    };
};

type TodoListStateTypes = {
    taskName: string;
    fieldError: boolean;

};

export function TodoList({data}: TodoListProps) {

    const [state, setState] = useState<TodoListStateTypes>({
        fieldError: false,
        taskName: "",
    });



    const setFilterTask = (arg: FilterValuesType) => {
        console.log(arg)
        data.filterTask(arg, data.todoListId)
    }

    const addTaskInTodoListByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setState({
            ...state,
            fieldError: false,
        });

        if (e.key === "Enter" || (e.ctrlKey && e.key === "Enter")) {
            addTaskInTodoList();
        }
    };

    const addTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            taskName: e.currentTarget.value,
        });
    };

    const addTaskInTodoList = () => {
        if (state.taskName.trim() === "") {
            setState({
                ...state,
                fieldError: true,
            });
            return;
        }

        data.addTask(state.taskName.trim(), data.todoListId);

        setState({
            ...state,
            fieldError: false,
            taskName: "",
        });
    };

    const removeTodoList = () => {
        const confirmation = confirm('Are you sure to remove Todo?')
        if(confirmation){
            data.removeTodo(data.todoListId)
        }
    }

    return (
        <div id={'todo'}>
            <h3>{data.title} <button onClick={removeTodoList}>Remove Todolist</button></h3>
            <div>
                <input
                    onKeyDown={addTaskInTodoListByEnter}
                    value={state.taskName}
                    onChange={addTaskName}
                    className={state.fieldError ? "error" : ""}
                    placeholder="Add task..."
                    type="text"
                />

                <button onClick={addTaskInTodoList}>+</button>
                <div style={{marginTop: 10}}>
                    {state.fieldError && (
                        <span className={"error-message"}>Field is required!</span>
                    )}
                </div>
            </div>
            <ul>
                {data.tasks?.map((task) => (
                    <Task
                        key={task.id}
                        data={{
                            toDoListId: data.todoListId,
                            changeStatus: data.changeStatus,
                            name: task.name,
                            tasks: data.tasks,
                            _id: task.id,
                            removeTask: data.removeTask,
                            isDone: task.isDone,
                        }}
                    />
                ))}
            </ul>
            <div className={'controls'}>
                <button
                    onClick={() => setFilterTask('all')}
                    className={data.filter === "all" ? "active-filter" : ""}

                >
                    All
                </button>
                <button
                    onClick={() => setFilterTask('active')}
                    className={data.filter === "active" ? "active-filter" : ""}

                >
                    Active
                </button>
                <button
                    onClick={() => setFilterTask('completed')}
                    className={data.filter === "completed" ? "active-filter" : ""}
                >
                    Completed
                </button>
            </div>


        </div>
    );
}
