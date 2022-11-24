import React , { useState } from "react";
import Header from "../Header/header";
import {Grid} from "@mui/material";
import Comments from "./comments";
import Meetings from "./meeting";
import NewComment from "./newcomment";
import "./iclassui.css";
import {useParams} from "react-router-dom";

const IclassUI = () => {

    let {classname} = useParams(); 
    const [r , setR] = useState(0);

    const handleChange = () => {
        setR(!r);
    }

    return (
        <div>
            <Header />
            <Grid container>
                <Grid item md={12} lg={3}>
                    <Meetings clubname={classname}/>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Comments clubname={classname} />
                </Grid>
                <Grid item md={12} lg={3}>
                    <NewComment clubname={classname} hC={handleChange}/>
                </Grid>
            </Grid>
            {console.log("iclassui")}
        </div>
    )
}

export default IclassUI;