import {FilterValuesType} from "./App.tsx";

type TodoControlsTypes = {
    data: {
        filterTask: (arg: FilterValuesType, todoListId : string) => void,
        filter: FilterValuesType,
        todoListId: string

    }
}

function TodoControls({data} : TodoControlsTypes) {


    const setFilterTask = (arg: FilterValuesType) => {
        console.log(arg)
        data.filterTask(arg, data.todoListId)
    }


    return (
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
    )
}




export default TodoControls
