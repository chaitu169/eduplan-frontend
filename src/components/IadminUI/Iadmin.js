import React, { useState } from "react";
import Header from "../Header/header";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Meetings from "../IclassUI/meeting";
import Comments from "../IclassUI/comments";
import NewComment from "../IclassUI/newcomment";
import NewMeeting from "./newmeeting";

const IadminUI = () => {
    let { classname } = useParams();
    const [r, setR] = useState(0);

    return (
        <div>
            <Header />
            <Grid container>
                <Grid item md={12} lg={3}>
                    <Meetings clubname={classname} />
                </Grid>
                <Grid item md={12} lg={6}>
                    <Comments clubname={classname} />
                </Grid>
                <Grid container item md={12} lg={3} direction="column" justifyContent="space-between">
                    <Grid item lg={3}>
                        <NewComment clubname={classname} />
                    </Grid>
                    <Grid item lg={3}>
                        <NewMeeting clubname={classname} />
                    </Grid>
                </Grid>
            </Grid>
            {console.log("iclassui")}
        </div>
    )
}

export default IadminUI;
