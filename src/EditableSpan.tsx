import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onSpanChangeCB: (newTitle: string) => void
}

const EditableSpan: FC<EditableSpanType> = ({title, onSpanChangeCB}) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(title)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(title)
    }
    const activateViewMode = () => {
        setEditMode(!editMode)
        onSpanChangeCB(newTitle)
    }
    const onSpanChange = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return (
        editMode
            ? <TextField value={newTitle}
                         onChange={onSpanChange}
                         onBlur={activateViewMode}
                         onKeyUp={onKeyUpHandler}
                         autoFocus
                         size="small"
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};

export default EditableSpan;