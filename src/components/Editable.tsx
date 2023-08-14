import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableProps = {
    title: string,
    onSaveEdits: (newValue: string) => void,

}

type EditStateType = {
    editMode: boolean,
    title: string
}

function Editable({title, onSaveEdits} : EditableProps){

    const [state, setState] = useState<EditStateType>({
        editMode: false,
        title: title
    })

    const activateEditMode = () => {
        setState({
            ...state,
            editMode: true
        })
    }

    const onBlurOffEditMode = () => {
        setState({
            ...state,
            editMode: false
        })


        onSaveEdits(state.title)


    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            title: e.currentTarget.value
        })
    }

    return (
        state.editMode
            ?   <TextField
                autoFocus
                onBlur={onBlurOffEditMode}
                onChange={handleChangeTitle}
                onDoubleClick={activateEditMode}
                value={state.title} type="text"
                label="Edit title" />



            : <span onDoubleClick={activateEditMode}>{state.title}</span>
    )
}

export default Editable