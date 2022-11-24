import React , { useState , useEffect } from "react";
import {config} from "../../App";
import { Snackbar } from "@mui/material";

const Comments = ({clubname}) => {

    const [comment , setComment] = useState([]);
    const [open , setOpen] = useState(false);
    const [messageInfo ,setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const getComments = async() => {
            await performApiCall();
        }

        getComments();
    } , []);

    const performApiCall = async () => {
        const comments = await fetchComments();
        if(comments != null){
            if(comments.length != 0){
                setComment(comments[0]);
            }
        }
    }

    const fetchComments = async() => {
        const url = config.endpoint + `getcomment`;
        try {
            
            const response = await fetch(url , {
                method : "post",
                body : JSON.stringify({
                    "club_name" : clubname
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            });

            const json_response = await response.json();

            handleResponse(false , json_response);
            return json_response;
        } catch (error) {
            handleResponse(true , null);
            return null;
        }
    }

    const handleResponse = (isError , comments) => {
        if(isError){
            setMessageInfo("Try again");
            setOpen(true);
        }else if(comments.length == 0){
            setMessageInfo("No comments added yet,you can add one");
            setOpen(true);
        }else{
            setMessageInfo("These are the comments added");
            setOpen(true);
        }
    }

    const itr = (item , idx , arr) => {
        return (
            <div key={idx}>
                <h5>item.email</h5>
                <p>item.comment</p>
            </div>
        )
    }

    return(
        <>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} message={messageInfo ? messageInfo : undefined}/>
            <h1>Comments</h1>
            {
                comment.map((val , index) => {
                    return (
                        <div key={index}>
                            <h5>{val.email}</h5>
                            <p>{val["comment"]}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Comments;