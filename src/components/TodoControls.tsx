import {FilterValuesType} from "./App.tsx";
import {Button} from "@material-ui/core";

type TodoControlsTypes = {
    data: {
        filterTask: (arg: FilterValuesType, todoListId: string) => void,
        filter: FilterValuesType,
        todoListId: string

    }
}

function TodoControls({data}: TodoControlsTypes) {


    const setFilterTask = (arg: FilterValuesType) => {
        console.log(arg)
        data.filterTask(arg, data.todoListId)
    }


    return (
        <div className={'controls'}>
            <Button
                variant={data.filter === "all" ? "contained" : "text"}
                onClick={() => setFilterTask('all')}
            >
                All
            </Button>
            <Button
                variant={data.filter === "active" ? "contained" : "text"}
                color={'primary'}
                onClick={() => setFilterTask('active')}
            >
                Active
            </Button>
            <Button
                variant={data.filter === "completed" ? "contained" : "text"}
                color={'secondary'}
                onClick={() => setFilterTask('completed')}
            >
                Completed
            </Button>
        </div>
    )
}


export default TodoControls
