import React , { useEffect } from "react";
import homeimg from "./home.png";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
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
            <Grid container item xs={12} md={12} lg={6} direction="column" justifyContent="center" alignItems="center">
                    <h1>Welcome</h1>
                    <p className="paragraph">Eduplan connects college clubs and
                        students.Now,fasten your seat belt
                        to this amazing journey with us.
                        <br />Are you
                    </p>
                    <div className="btns">
                        <Link to={`student/signup`}><Button variant="contained">Student</Button></Link>
                        <Link to={`admin/signup`}><Button variant="contained">Admin</Button></Link>
                    </div>
            </Grid>
        </Grid>
    );
}

export default Home;
