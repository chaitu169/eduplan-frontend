import React , { useEffect } from "react";
import homeimg from "./home.png";
import Grid from "@mui/material/Grid";
import Header from "../Header/header";
import { Link } from "react-router-dom"
import "./home.css";

const Home = () => {

    //=========making a api call to test backend================
    // useEffect(() => {
    //     (async () => {
    //         let url = `https://eduplanbackenddeployement.herokuapp.com/`;
    //         const res = await fetch(url);
    //         const resp = await JSON.parse(res);
    //         console.log(resp);
    //     })();
    // });

    return (
        
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
                <img src={homeimg} alt="home" />
            </Grid>
            <Grid item container xs={12} md={12} lg={6} className="rpage">
                    <h1>Welcome</h1>
                    <p className="paragraph">Eduplan connects college clubs and
                        students.Now,fasten your seat belt
                        to this amazing journey with us.
                    </p>
                    <div>
                        <Link className="ltag" to={`student/signup`}>Student</Link>
                        <Link className="ltag" to={`admin/signup`}>Admin</Link>
                    </div>
            </Grid>
        </Grid>
      
    );
}

export default Home;
