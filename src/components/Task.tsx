
type PropsType = {
    data: {
        status?: boolean,
        name?: string,
        _id: string,
        removeTask: (id: string) => void,

    }

}

export function Task({data}: PropsType) {

    const deleteTask = () => {
        data.removeTask(data._id)
    }

    return (
        <li>

            <input
                id={data._id.toString()}
                className={'task_input'}
                defaultChecked={data.status}
                type="checkbox"
            />

            <label
                htmlFor={data._id.toString()}
                className={'task_name'}>{data.name}
            </label>

            <button onClick={deleteTask} className={'task_delete'}>&times;
            </button>
        </li>

    )
}