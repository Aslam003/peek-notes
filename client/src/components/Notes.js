import React ,{useState} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from "react-redux";
import {addNotes} from "../actions/noteAction";

function Notes(){
    const dispatch = useDispatch();
    const [expand,setExpand] = useState(false);
    const userId = useSelector(state => state.notes.userId.id);

    function handleExpand(){
        setExpand(true);
    }

    /// user input getter
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) =>{
        //add this item to action
        const addNote = {userId, ...data};
        dispatch(addNotes(data));
        axios.post("/notes",addNote)
        .then(function(res){
        document.getElementById("form").reset();
        })
    }
    return(
        <div>
        <form id = "form" className="inputForm" onSubmit={handleSubmit(onSubmit)}>
            {expand && <input name="title" placeholder="Title"  ref={register()}/>}
            <textarea onClick={handleExpand} name="content" placeholder="Note down..."  rows = {expand ? "2":"1"} ref={register()}/>
            {expand && <button  type="submit" name="addNotes"  >  <i className="fas fa-save"></i></button>}
        </form>
        </div>
    );
}


export default Notes;