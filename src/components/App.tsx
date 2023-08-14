import {useEffect, useState} from 'react';
import '../App.css';
import {TasksProps} from './TodoList.tsx'
import {v1} from "uuid";
import {TodoList} from "./TodoList.tsx";
import AddTodoForm from "./AddTodoForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsProps = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TasksProps>
}



function LS(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
}




function App() {
    const todoListId_1 = v1() // defined for each Todolist unique "key" : string
    const todoListId_2 = v1()

    const [todoLists, setTodo] = useState<Array<TodoListsProps>>([ // TodoLists general Interface
        {id: todoListId_1, title: 'First Stack', filter: 'all'},
        {id: todoListId_2, title: 'Second Stack', filter: 'all'},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({ // Interface of tasks of each TodoList components
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


    const changeTodoListTitle = (newValue: string, id: string): void => {

        const todoList = todoLists.find(tl => tl.id === id)

        if (todoList) {
            todoList.title = newValue
            setTodo([...todoLists])
        }
    }


    const addTask = (task: string, toDoListId: string): void => {

        const newTask: TasksProps = {
            id: v1(),
            name: task,
            isDone: false
        }

        const tasksArr = tasks[toDoListId]
        console.log(tasksArr)

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
    const changeTaskTitle = (newValue: string, taskId: string, toDoListId: string) => {
        const tasksArr = tasks[toDoListId]

        const task = tasksArr.find(t => t.id === taskId)
        if (task) {
            task.name = newValue


            setTasks({...tasks})
        }


    }


    const removeTodo = (toDoListId: string) => {
        let removedTodoList = todoLists.filter(t => t.id !== toDoListId)

        setTodo(removedTodoList)
        delete tasks[toDoListId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListsProps = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodo([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })


    }

    // useEffect(() => {
    //     if('todo-list-tasks' in localStorage){
    //         const storedTasks = localStorage.getItem('todo-list-tasks');
    //         if(storedTasks){
    //             setTasks(JSON.parse(storedTasks));
    //
    //
    //         }
    //
    //     }
    //
    // }, []);

    useEffect(() => {

        LS('todo-lists', todoLists)
        LS('todo-list-tasks', tasks)



    }, [tasks])

    return (
        <Grid className="App">


            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">

                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Grid container>
                <AddTodoForm data={{
                    addItem: addTodoList,
                    btnText: 'Create a Todolist',
                    placeHolder: 'Give a name...'
                }}/>
            </Grid>


            <Container fixed>

                <Grid justifyContent={'center'} container className="App-wrapper">


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
                                          changeTodoTitle: changeTodoListTitle,
                                          changeStatus: changeStatus,
                                          changeTaskTitle: changeTaskTitle,
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
                </Grid>

            </Container>


        </Grid>


    );
}


export default App;



