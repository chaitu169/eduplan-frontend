import React , { useEffect , useState } from "react";
import { Snackbar , Card , Button} from "@mui/material";
import { config } from "../../App";
import "../Classes/classes.css";
import Header from "../Header/header";

export default function Classes() {
    
    const [classes , setClasses] = useState([]);
    const [open , setOpen] = useState(false);
    const [messageInfo ,setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    const handleResponse = (isError , json_response) => {
        if(isError){
            setMessageInfo("Server Error wait sometime and try again");
            return false;
        }else if(json_response.length == 0){
            setMessageInfo("There are no clubs created yet");
            return false;
        }else{
            setMessageInfo("These are all the available clubs");
            return true;
        }
    }

    const joinClass = async (e) => {
        debugger;
        const url = config.endpoint + `student/joinclass`;
        const clubname = e.target.innerHTML;
        console.log(clubname);
        try {
            const response = await fetch(url , {

            })
        } catch (error) {
            
        }
    }

    useEffect(() => {
         const getUsers = async () => {
            // debugger;
            const url = config.endpoint + `student/classes`;
            try {
                const response = await fetch(url , {
                    method : "post",
                    body : JSON.stringify({
                        "email" : "chaitu@gmail.com",
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                });

                const json_response = await response.json();

                const status = handleResponse(false , json_response);

                if(status){
                    setOpen(true);
                    console.log(json_response);
                    setClasses(json_response);
                    console.log(classes);
                }else{
                    setOpen(true);
                }
            } catch (error) {
                handleResponse(true , null);
            }
        };

        getUsers();
    } , []);

    return(
        <div>
            <Header />
            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} message={messageInfo ? messageInfo : undefined}/>
            <div className="clubs">
            {
                classes.map((val) => {
                    return (
                        <Card onClick={(e) => {
                            joinClass(e);
                        }} key={val.clubname}>{val.clubname}</Card>
                    )
                })
            }
            </div>
        </div>
    )
}