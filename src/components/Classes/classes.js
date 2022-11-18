import React , { useEffect , useState } from "react";
import { Snackbar , Button ,Grid} from "@mui/material";
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

    const handleResponse2 = (isError , json_response) => {
        if(isError){ 
            setOpen(true);
            setMessageInfo("Server Error wait sometime and try again");
            return false;
        }else if(json_response[0].success == 0){
            setMessageInfo(json_response[0].message);
            return false;
        }else{
            setMessageInfo(json_response[0].message);
            return true;
        }
    }

    const joinClass = async (e) => {
        debugger;
        const url = config.endpoint + `student/joinclass`;
        const ele = e.currentTarget;
        const clubname = ele.children[0].innerText;
        const email = window.sessionStorage.getItem("email");
        console.log(clubname);
        try {

            let response = await fetch(url , {
                method : "POST",
                body : JSON.stringify({
                    "email" : email,
                    "clubname" : clubname
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            });

            const json_response = await response.json();
            const status = handleResponse2(false , json_response);

            if(status){
                setOpen(true);
            }else{
                setOpen(true);
            }
        } catch (error) {
            handleResponse2(true , null);
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
                        "email" : sessionStorage.getItem("email"),
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
        <div className="c-page">
            <Header />
            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} message={messageInfo ? messageInfo : undefined}/>
            <Grid container className="clubs">
            {
                classes.map((val) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={val.clubname} className="club-name">
                            <div className="card"  onClick={(e) => {joinClass(e);
                            }}>
                                <div  className="heading" >
                                    {val.clubname}
                                </div>
                                <div className="description">
                                    This is a club created for learning and sharing information.
                                </div>
                                <Button variant="contained">
                                    Enroll
                                </Button>
                            </div>
                        </Grid>
                    )
                })
            }
            </Grid>
        </div>
    )
}