import {useState} from 'react';
import '../App.css';
import {TodoList} from "./TodoList.tsx";
import {TasksProps} from './TodoList.tsx'
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsProps = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {


    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodo] = useState<Array<TodoListsProps>>([
        {id: todoListId_1, title: 'First Stack', filter: 'all'},
        {id: todoListId_2, title: 'Second Stack', filter: 'all'},
    ])


    const [tasks, setTasks] = useState({
        [todoListId_1]: [
            {name: 'CSS&HTML', isDone: true, id: v1()},
            {name: 'React', isDone: false, id: v1()},
            {name: 'Next JS', isDone: false, id: v1()},
        ],

        [todoListId_2]: [
            {name: 'Angular', isDone: false, id: v1()},
            {name: 'Vue', isDone: false, id: v1()},
        ]
    })

    const filterTaskByClick = (arg: FilterValuesType, todoListId: string) => {
        const filteredTodos = todoLists.find(t => t.id === todoListId)
        if (filteredTodos) {
            filteredTodos.filter = arg
            const copy: Array<TodoListsProps> = [...todoLists]

            setTodo(copy)
        }
    }


    const removeTask = (id: string, toDoListId: string): void => {

        let tasksArr = tasks[toDoListId]

        const filteredData = tasksArr.filter(t => t.id !== id)
        tasks[toDoListId] = filteredData


        setTasks({...tasks})


    }


    const addTask = (task: string, toDoListId : string): void => {

        const newTask: TasksProps = {
            id: v1(),
            name: task,
            isDone: false
        }

        const tasksArr = tasks[toDoListId]


        // @ts-ignore
        const newTasks: Array<TasksProps> = [newTask, ...tasksArr]
        tasks[toDoListId] = newTasks
        setTasks({...tasks})

    }

    const changeStatus = (taskId: string, status: boolean, toDoListId: string) => {
        const tasksArr = tasks[toDoListId]

        const task = tasksArr.find(t => t.id === taskId)
        if (task) {
            task.isDone = status


            setTasks({...tasks})
        }


    }

    const removeTodo = (toDoListId : string) => {
        let removedTodoList = todoLists.filter(t => t.id !== toDoListId)

        setTodo([...removedTodoList])
    }


    return (
        <div className="App">

            {todoLists.map(tl => {
                let tasksForTodoLists = tasks[tl.id]


                switch (tl.filter) {
                    case "active":
                        tasksForTodoLists = tasksForTodoLists.filter(t => !t.isDone)
                        break
                    case "completed":
                        tasksForTodoLists = tasksForTodoLists.filter(t => t.isDone)
                        break
                }


                return (
                    <TodoList key={tl.id}
                              data={{
                                  todoListId: tl.id,
                                  removeTodo: removeTodo,
                                  changeStatus: changeStatus,
                                  removeTask: removeTask,
                                  filterTask: filterTaskByClick,
                                  tasks: tasksForTodoLists,
                                  title: tl.title,
                                  filter: tl.filter,
                                  addTask: addTask
                              }}
                    />
                )
            })}


        </div>
    );
}

export default App;


