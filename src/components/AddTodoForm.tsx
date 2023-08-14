import {ChangeEvent, KeyboardEvent, ReactNode, useState} from "react";
import {TodoListStateTypes} from "./TodoList.tsx";
import {Button, TextField} from "@material-ui/core";

type AddTodoFormType = {
    data: {
        addItem: (title: string) => void,
        placeHolder: string,
        btnText: string | ReactNode

    }
}

function AddTodoForm({data}: AddTodoFormType) {

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
            addTaskOrTodo();
        }
    };

    const addTaskOrTodo = () => {
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
        <>

            <div className={'todo-form'}>

                <TextField
                    error={state.fieldError}
                    onKeyDown={addTaskInTodoListByEnter}
                    value={state.taskName}
                    onChange={addTaskName}
                    id="standard-basic"
                    label={data.placeHolder}/>


                <Button
                    size={"small"}
                    color={state.fieldError ? 'secondary' : 'primary'}
                    variant={"contained"}
                    onClick={addTaskOrTodo}>
                    {state.fieldError ? 'The field is required!': data.btnText}
                </Button>

            </div>



        </>
    )
}

export default AddTodoForm