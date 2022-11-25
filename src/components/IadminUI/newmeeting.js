import React , { useState } from "react";
import { OutlinedInput , Button , Snackbar } from "@mui/material";
import {config} from "../../App";

const NewMeeting = ({clubname}) => {

    const [topic , setTopic] = useState("");
    const [time , setTime] = useState("");
    const [link , setLink] = useState("");
    const [open , setOpen] = useState(false);
    const [messageInfo , setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    const performApiCall = async ()=> {
        // debugger;
        const r = await postMeeting();
    }

    const postMeeting = async () => {
        const url = config.endpoint + `newmeeting`;
        try{
            const response = await fetch(url , {
                method : "post",
                body : JSON.stringify({
                    "email" : sessionStorage.getItem("email"),
                    "club_name" : clubname,
                    "meetlink" : link,
                    "meettime" : time,
                    "topic" : topic
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            })

            const json_response = await response.json();

            const status = handleResponse(false , json_response);
            if(status){
                setTime("");
                setLink("");
                setTopic("");
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
            <h1>New Meeting</h1>
            <OutlinedInput placeholder="topic" value={topic} onChange={(e) => {
                setTopic(e.target.value);
            }}/>
            <OutlinedInput placeholder="time" value={time} onChange={(e) => {
                setTime(e.target.value);
            }}/>
            <OutlinedInput placeholder="link" value={link} onChange={(e) => {
                setLink(e.target.value);
            }}/>
            <Button variant="outlined" onClick={performApiCall}>Add meeting</Button>
        </>    
    )
}

export default NewMeeting;