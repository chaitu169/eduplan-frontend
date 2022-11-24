import React , { useState } from "react";
import { OutlinedInput , Button , Snackbar } from "@mui/material";
import { config } from "../../App";

const NewComment = ({clubname , hC}) => {

    const [comment , setComment ] = useState("");
    const [open , setOpen] = useState(false);
    const [messageInfo , setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    const performApiCall = async ()=> {
        // debugger;
        const r = await postComment();
        if(r === true){
            hC();
        }
    }

    const postComment = async () => {
        const url = config.endpoint + `addcomment`;
        try{
            const response = await fetch(url , {
                method : "post",
                body : JSON.stringify({
                    "club_name" : clubname,
                    "email" : sessionStorage.getItem("email"),
                    "comment" : comment
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            })

            const json_response = await response.json();

            const status = handleResponse(false , json_response);
            if(status){
                setComment("");
                return true;
            }else{
                return false;
            }
        }catch(error){
            handleResponse(true , null);
            return false;
        }
    }

    const handleResponse = (isError , response) => {
        if(isError){
            setMessageInfo("Try again");
            setOpen(true);
            return false;
        }else if(response[0].success == 0){
            setMessageInfo(response[0].message);
            setOpen(true);
            return false;
        }else{
            setMessageInfo(response[0].message);
            setOpen(true);
            return true;
        }
    }

    return (
        <>
            <Snackbar open={open} onClose={handleClose} message={messageInfo ? messageInfo : undefined} autoHideDuration={3000}/>
            <h1>Add Comment</h1>
            <OutlinedInput placeholder="comment" value={comment} onChange={(e) => {
                setComment(e.target.value);
            }}/>

            <Button variant="outlined" onClick={performApiCall}>Add</Button>
        </>
    )
}

export default NewComment;