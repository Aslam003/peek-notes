import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { deleteNotes} from "../actions/noteAction";
import {useSelector,useDispatch} from 'react-redux';
import {Card} from "react-bootstrap";
import axios from "axios";
function AddedNotes(props){
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({});
    const userId = useSelector(state => state.notes.userId.id);
    const dispatch = useDispatch();

    function handleChange(e){
        const {name,value} = e.target;
        setData(prevData =>{
            return{
                ...prevData,
                [name] : value
            }
        });
    }
    
    function handleSave(){
        const prevTitle=props.title;
        const updateData = {userId,prevTitle,...data};
        axios.put("/notes", updateData);
        window.location.reload(true);
        toggle();
    }
    
    function handleClick(){
        const deleteNote = {user:userId,title:props.title};
        dispatch(deleteNotes(props.id));
        axios.delete("/notes", {data:deleteNote})
        .then(function(res){
            console.log(res);  
        });
    }
    function toggle(){
        setData({title:props.title,content:props.content})
        setModal(!modal);
    }  

    return(<>
    <Card >
    <Card.Body onClick={toggle}>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>{props.content}</Card.Text>
    </Card.Body>
    <button onClick={handleClick} className="delButton"  type="submit" name="NotesButton" > <i className="fas fa-trash"> </i>  </button>

    </Card>
    <div>
        <Modal isOpen={modal} toggle={toggle} >
            <form className = "modal-form" >
            <ModalHeader toggle={toggle} style={{border:"none"}}><Input type="text" name = "title" onChange={handleChange}  value= {data.title} /></ModalHeader>
            <ModalBody>
                <Input type="textarea" name="content" onChange={handleChange} value={data.content} rows={15} />
            </ModalBody>
            <ModalFooter style={{border:"none"}}>
            <button  type="submit" name="addNotes" className="modal-notes-button" onClick={handleSave}><i className="fas fa-save"></i></button>
            </ModalFooter>
            </form>
        </Modal>
    </div></>);
}


export default AddedNotes;