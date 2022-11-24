import React, { useEffect, useState } from "react";
import { Snackbar, Card, Grid, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../../App";
import Header from "../Header/header";
import "./sclasses.css";

export default function StudentClasses() {

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    let [messageInfo, setMessageInfo] = useState(undefined);
    let [classes, setClasses] = useState([]);

    const handleClose = () => {
        setOpen(false);
    }

    // let {emailid} = useParams();
    let emailid = sessionStorage.getItem("email");
    const [mail, setMail] = useState(emailid);

    const handleResponse = (isError, json_response) => {
        if (isError) {
            setMessageInfo("Server Error wait sometime and try again");
            return false;
        } else if (json_response.clubs.length == 0) {
            setMessageInfo("You have not enrolled in any classes");
            return false;
        } else {
            setMessageInfo("These are your enrolled classes");
            return true;
        }
    }

    //
    const handleClick = (event) => {
        // debugger;
        let classname = event.currentTarget.childNodes[0].innerText;
        navigate(`/student/clubs/${classname}`);
    }

    useEffect(() => {
        const getClasses = async () => {
            debugger;
            const url = config.endpoint + `student/classesdisplay`;
            try {
                let response = await fetch(url, {
                    method: "post",
                    body: JSON.stringify({
                        "email": mail,
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });

                let json_response = await response.json();
                console.log(json_response);
                let status = handleResponse(false, json_response[0]);
                if (status) {
                    setOpen(true);
                    setClasses(json_response[0].clubs);
                } else {
                    setOpen(true);
                }
            } catch (error) {
                handleResponse(true, null);
                setOpen(true);
            }
        };

        getClasses();
    }, [mail]);

    return (
        <div>
            <Header />
            {console.log(classes)}
            <Snackbar open={open} onClose={handleClose} message={messageInfo ? messageInfo : undefined} autoHideDuration={5000} />
            <Grid container className="clubs">
                {
                    classes.map((val) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={val} className="club-name">
                                <div className="card" onClick={(event) => {
                                handleClick(event);
                            }}>
                                    <div className="heading">
                                        {val}
                                    </div>
                                    <div className="description">
                                        This is a club created for learning and sharing information.
                                    </div>
                                    <Button variant="contained">
                                        Enter
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