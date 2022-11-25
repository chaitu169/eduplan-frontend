import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import { Snackbar, Button, Grid, OutlinedInput } from "@mui/material";
import { config } from "../../App";
import "../AdminUI/adminui.css";
import { useNavigate } from "react-router-dom";

export default function AdminUI() {

    //state for displaying mentor's clubs
    let navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);

    //state for adding new club
    const [clubname, setClubName] = useState("");
    const [genre, setGenre] = useState("");


    const handleClose = () => {
        setOpen(false);
    }

    //handling API repsonse from backend api of adding club
    const hResAddClub = (isError, json_response) => {
        if (isError) {
            setOpen(true);
            setMessageInfo("Server Error wait sometime and try again");
            return false;
        } else if (json_response[0].success == 0) {
            setMessageInfo(json_response[0].message);
            return false;
        } else {
            setMessageInfo(json_response[0].message);
            return true;
        }
    }

    //function for adding a new club by mentor
    const handleAddClub = async () => {
        debugger;
        const url = config.endpoint + `club/genre`;
        try {
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify({
                    "club_name": clubname,
                    "genre": genre,
                    "email": sessionStorage.getItem("email")
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const json_response = await response.json();
            const status = hResAddClub(false, json_response);
            if (status) {
                setOpen(true);
            } else {
                setOpen(true);
            }

            setClubName("");
            setGenre("");

        } catch (error) {
            hResAddClub(true, null);
        }
    }

    //handling api resposne of backend from displaying classes api endpoint
    const hResClubDisplay = (isError, json_response) => {
        if (isError) {
            setMessageInfo("Internal server error,try again");
            return false;
        } else {
            setMessageInfo("success");
            return true;
        }
    }

    const performApiCall = async() => {
        debugger;
        try {
            const url = config.endpoint + `mentor/classes`;
            const email = sessionStorage.getItem("email");
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    "email": email
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json_response = await response.json();
            const status = hResClubDisplay(false , json_response);
            if(status){
                setClasses(json_response);
            }
            setOpen(true);
        } catch (error) {
            hResClubDisplay(true , null);
            setOpen(true);
        }
    }

    useEffect(() => {
        const getClasses = async () => {
            await performApiCall();
        }
        getClasses();
    }, []);

    const handleClick = (event) => {
        // debugger;
        let classname = event.currentTarget.childNodes[0].innerText;
        navigate(`/admin/clubs/${classname}`);
    }

    return (
        <div>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} message={messageInfo ? messageInfo : undefined} />
            <Header />
            <Grid container columnSpacing={3}>
                <Grid className="m-clubs" container item sm={12} md={8}>
                    {
                        classes.map((val) => {
                            return (
                                <Grid item xs={12} md={6} lg={4} key={val.clubname} className="club-name">
                                    <div className="card" onClick={(event) => {
                                handleClick(event);
                            }}>
                                        <div className="heading" >
                                            {val.clubname}
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
                <Grid className="add-club" container item sm={12} md={4} direction="column">

                    <OutlinedInput placeholder="clubname" value={clubname} onChange={(e) => {
                        setClubName(e.target.value);
                    }} />


                    <OutlinedInput placeholder="genre" value={genre} onChange={(e) => {
                        setGenre(e.target.value);
                    }} />

                    <Button onClick={handleAddClub} variant="contained">Add Club</Button>

                </Grid>
            </Grid>
        </div>
    )
}