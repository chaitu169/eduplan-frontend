import React , { useState } from "react";
import { Input , Button } from "@mui/material";

function LoginStudent() {

    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const handleLogin = (e) => {
        
    }

    return (
        <>
            <Input type={string} value={userName} onChange={(e) => {
                setUserName(e.target.value);
            }}/>
            <Input type={string} value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={(e) => {
                handleLogin(e);
            }}>Login</Button>
        </>
    );
}

function LoginAdmin() {

    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const handleLogin = (e) => {

    }

    return(
        <>
            <Input type={string} value={userName} onChange={(e) => {
                setUserName(e.target.value);
            }}/>
            <Input type={string} value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={(e) => {
                handleLogin(e);
            }}>Login</Button>
        </>
    )
}

