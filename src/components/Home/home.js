import React , { useEffect } from "react";
import homeimg from "./home.png";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import "./home.css";

const Home = () => {

    useEffect(() => {
        (async () => {
            let url = `https://eduplanbackenddeployement.herokuapp.com/`;
            const res = await fetch(url);
            const resp = await JSON.parse(res);
            console.log(resp);
        })();
    });

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
                        <Button variant="contained">Student</Button>
                        <Button variant="contained">Admin</Button>
                    </div>
            </Grid>
        </Grid>
    );
}

export default Home;
