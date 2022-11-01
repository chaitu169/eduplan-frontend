import React , { useState } from "react";
import { OutlinedInput ,  Button , Snackbar} from "@mui/material";
import { config } from "../../App";
import {useNavigate} from "react-router-dom";
import Header from "../Header/header";
import "./register.css";

export function LoginS() {

    let navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const [messageInfo , setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    //input validation function before making an api call
    const validateInput = () => {

        console.log("validate function called");
        if(email.length == 0){
            alert("enter email correctly");
            return false;
        }else if(password.length < 8){
            alert("password length must be atleast 8");
            return false;
        }

        return true;
    }

    //validating the response 
    const validateResponse = (isError , response) => {
        console.log("validate response function called");
        if(isError){
            setMessageInfo("something went wrong,try again");
            return false;
        }else if(!response[0].success){
            setMessageInfo(response[0].message)
            return false;
        }else{
            return true;
        }
    };

    //performing an api cal using fetch api
    const performApiCall = async () => {
        console.log("api function called");
        const url = config.endpoint + `signin/student`;
        console.log(url);
        debugger;
        try{
            let response = await fetch(url , {
                method : "POST",
                body : JSON.stringify({
                    "email" : email,
                    "password" : password
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            });

            let json_response = await response.json();
            let status =  validateResponse(false , json_response);
            if(status === true){
                return json_response;
            }else{
                setOpen(true);
            }
        }catch (e){
            let status = validateResponse(true , null);
            setOpen(true);
        }
    };

    const persistLogin = (email , password) => {
        const localstorage = window.localStorage;
        localstorage.setItem('email' , email);
        localstorage.setItem('password' , password);
    }

    const handleLogin = async () => {
        console.log("login function called");
        debugger;
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            // debugger;
            let emailid = email;
            if(response !== undefined){
                persistLogin(email , password);
                setEmail("");
                setPassword("");
                setMessageInfo("Login successfull");
                setOpen(true);
                setTimeout(navigate(`/student/classes/${emailid}`) , 3000);
            }
        }
    }

    return (
        <>
        <Snackbar open={open} onClose={handleClose} message={messageInfo ? messageInfo : undefined} autoHideDuration={3000}/>
        <Header />
        <div className="iform">
            <OutlinedInput placeholder="mail-id" value={email} onChange={(e) => {
                setEmail(e.target.value);
            }}/>
            <OutlinedInput placeholder="password" type="password" value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={(e) => {
                handleLogin(e);
            }}>Login</Button>
        </div>
        </>
    );
}

export function LoginA() {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const [messageInfo , setMessageInfo] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
    }

    //input validation function before making an api call
    const validateInput = () => {
        console.log("validate function called");
        if(email.length == 0){
            alert("enter email correctly");
            return false;
        }else if(password.length < 8){
            alert("password length must be atleast 8");
            return false;
        }

        return true;
    }

    //validating the response 
    const validateResponse = (isError , response) => {
        console.log("validate response function called");
        if(isError){
            setMessageInfo("Something went wrong try again");
            return false;
        }else if(!response[0].success){
            setMessageInfo(response[0].message);
            return false;
        }else{
            return true;
        }
    };

    //performing an api cal using fetch api
    const performApiCall = async () => {
        console.log("api function called");
        const url = config.endpoint + `signin/admin`;
        try{
            let response = await fetch(url , {
                method : "POST",
                body : JSON.stringify({
                    "email" : email,
                    "password" : password
                }),
                headers : {
                    "Content-type" : "application/json"
                }
            });

            let json_response = await response.json();
            let status =  validateResponse(false , json_response);
            if(status === true){
                return json_response;
            }else{
                setOpen(true);
            }
        }catch (e){
            let status = validateResponse(true , null);
            setOpen(true);
        }
    };

    const handleLogin = async () => {
        console.log("login function called");
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            if(response !== undefined){
                setEmail("");
                setPassword("");
                setMessageInfo("Login succesfull");
                setOpen(true);
            }
        }
    }

    return(
        <>
        <Snackbar open={open} message={messageInfo ? messageInfo : undefined} onClose={handleClose} autoHideDUration={3000}/>
        <Header />
        <div className="iform">
            
            <OutlinedInput placeholder="email" value={email} onChange={(e) => {
                setEmail(e.target.value);
            }}/>
            <OutlinedInput placeholder="password" value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={(e) => {
                handleLogin(e);
            }}>Login</Button>
        </div>
        </>
    )
}

