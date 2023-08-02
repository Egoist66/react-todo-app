import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodoListStateTypes} from "./TodoList.tsx";

type AddTodoFormType = {
    data: {
        addItem: (title: string) => void,
        placeHolder: string,
        btnText: string

    }
}

function AddTodoForm({data} : AddTodoFormType) {

    const [state, setState] = useState<TodoListStateTypes>({
        fieldError: false,
        taskName: "",
    });

    const addTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            taskName: e.currentTarget.value,
        });
    };

    const addTaskInTodoListByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setState({
            ...state,
            fieldError: false,
        });

        if (e.key === "Enter" || (e.ctrlKey && e.key === "Enter")) {
            addTaskInTodoList();
        }
    };

    const addTaskInTodoList = () => {
        if (state.taskName.trim() === "") {
            setState({
                ...state,
                fieldError: true,
            });
            return;
        }

        data.addItem(state.taskName.trim());

        setState({
            ...state,
            fieldError: false,
            taskName: "",
        });
    };



    return (
        <div id={'todo-form'}>

            <input
                onKeyDown={addTaskInTodoListByEnter}
                value={state.taskName}
                onChange={addTaskName}
                className={state.fieldError ? "error" : ""}
                placeholder={data.placeHolder}
                type="text"
            />

            <button onClick={addTaskInTodoList}>{data.btnText}</button>
            <div style={{marginTop: 10}}>
                {state.fieldError && (
                    <span className={"error-message"}>The Field is required!</span>
                )}
            </div>


        </div>
    )
}

export default AddTodoForm