import {useEffect, useState} from 'react';
import '../App.css';
import {TodoList} from "./TodoList.tsx";
import {TasksProps} from './TodoList.tsx'
import {v1} from "uuid";

type StateProps = {
    tasklist: Array<TasksProps>,
    filter: 'all' | 'active' | 'completed',
    filteredTasks?: Array<TasksProps>,
}

function App() {

    const [state, setState] = useState<StateProps>({
        tasklist: [
            {name: 'CSS&HTML', status: true, id: v1()},
            {name: 'React', status: false, id: v1()},
            {name: 'Next JS', status: true, id: v1()},
        ],
        filter: 'all',
        filteredTasks: [],
    });



    useEffect(() => {
        if (state.filter === 'all') {
            setState({
                ...state,
                filteredTasks: state.tasklist

            })
        }
    }, [])

    const filterTasks = (e: any) : void => {

        switch (e.target.name) {
            case 'completed':
                setState({
                    ...state,
                    filter: e.target.name,
                    filteredTasks: state.tasklist.filter(t => t.status)
                })
                break
            case 'active':
                setState({
                    ...state,
                    filter: e.target.name,
                    filteredTasks: state.tasklist.filter(t => !t.status)

                })
                break
            case 'all':
                setState({
                    ...state,
                    filter: e.target.name,
                    filteredTasks: state.tasklist

                })
                break
            default:
                throw new Error(`unknown --${e.target.name}-- type!`)
        }

    }

    const removeTask = (id: string): void => {
        const data = state.tasklist.filter(t => t.id !== id)
        setState({
            ...state,
            filteredTasks: data,
            tasklist: data,


        })

    }


    const addTask = (task : string) : void => {

        const newTask : TasksProps = {
            id: v1(),
            name: task,
            status: false
        }

        // @ts-ignore
        const newTasks : Array<TasksProps> = [newTask, ...state.filteredTasks]

        setState({
            ...state,
            tasklist: newTasks,
            filteredTasks: newTasks,
        })

    }


    return (
        <div className="App">

            <TodoList
                data={{
                    removeTask: removeTask,
                    filterTask: filterTasks,
                    tasks: state.filteredTasks,
                    title: 'What to learn',
                    addTask: addTask
                }}
            />
        </div>
    );
}

export default App;
