import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import s from './App.module.css';
import {Button, TextField, IconButton} from "@mui/material";
import { Delete } from '@mui/icons-material'
import {v1} from "uuid";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import EditableSpan from "./EditableSpan";

export type listItemType = {
    id: string
    liText: string
}
export type listType = Array<listItemType>

function App() {

    let [list, setLists] = useState<listType>([
        {id: v1(), liText: 'first message'},
        {id: v1(), liText: 'second message'},
    ])
    const [newMess, setNewMess] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const onNewMessHandler = (e: ChangeEvent<HTMLInputElement>) => setNewMess(e.currentTarget.value);
    const addLi = () => {
        if (list.length < 5 && newMess.trim()) {
            setError(false);
            let newLi = {id: v1(), liText: newMess.trim()};
            setLists([...list, newLi]);
            setNewMess('');
        }
        if (list.length >= 5) setError(true);
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addLi()
    }
    const inputClear = () => setNewMess('');
    const deleteLastLi = () => {
        setLists(list.filter((li, i) => i !== list.length-1));
        setError(false);
    }
    const deleteLi = (id: string) => {
        setLists(list.filter(li => li.id !== id))
    }
    const onSpanChgCB = (newTitle: string, id: string) => {
        list.map(li => li.id === id ? li.liText = newTitle : li)
        setLists([...list])
    }

    return (
    <div className={s.App}>
      <div className={s.container}>
          <div className={s.errorText}>
              {error && <span>Limit of messages is exceeded</span>}
          </div>
          <div className={s.inpBtns}>
              <TextField onChange={onNewMessHandler}
                         onKeyUp={onKeyHandler}
                         value={newMess}
                         label="Write your message"
                         variant="outlined"
              />
              <Button onClick={addLi} disabled={error} variant='contained' sx={{width: '40px', height: '40px', m: '10px 0px 0px 10px'}}>Send</Button>
              <Button onClick={inputClear} variant='contained' sx={{width: '40px', height: '40px', m: '10px 0px 0px 10px'}}>Clear</Button>
              <Button onClick={deleteLastLi} variant='contained' sx={{width: '200px', height: '40px', m: '30px 0 0 0'}}>Delete last message</Button>
          </div>
          <ul className={s.ul} ref={listRef}>
              {list.length > 0
                  ? list.map(objMess => {

                      const deleteLiCallBack = () => deleteLi(objMess.id)
                      const onSpanChangeCB = (newTitle: string) => {
                          onSpanChgCB(newTitle, objMess.id)
                      }

                      return <li key={objMess.id}>
                          <EditableSpan title={objMess.liText} onSpanChangeCB={onSpanChangeCB}/>
                          <IconButton onClick={deleteLiCallBack}><Delete/></IconButton>
                      </li>
                  })
                  : <span className={s.reserveSpan}>Please, add your new message</span>
              }

          </ul>
      </div>
    </div>
    );
}

export default App;
