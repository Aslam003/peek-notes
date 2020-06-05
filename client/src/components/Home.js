import React ,{useEffect} from "react";
import Notes from "./Notes";
import AddedNotes from "./AddedNotes";
import {useSelector} from "react-redux";
import {CardColumns} from "react-bootstrap";
function Home(){
        useEffect(() => {
            const search =window.location.search;
                const params = new URLSearchParams(search);
                if (params.get("user")){
                    const token = JSON.parse(params.get("user"));
                    localStorage.setItem("token", JSON.stringify(token));
                    window.location.href="/";
                }
        }, []);
    const notes = useSelector(state => state.notes.notes);
            return   <div>
            <Notes />
            <CardColumns className="added-notes">
            {notes.map((note,index) =>{
                return(
                <AddedNotes
                key={index}
                id={index}
                title ={note.title}
                content = {note.content}
                />
                );
            })}  
            </CardColumns>
            </div>
        }
export default Home;
