import React , { useState } from "react";
import { OutlinedInput , Button } from "@mui/material";
import config from "../../App";
import "./register.css";

export function LoginS() {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

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
            alert("something went wrong,try again");
            return false;
        }else if(response.success === false){
            alert(response.message);
            return false;
        }else{
            return true;
        }
    };

    //performing an api cal using fetch api
    const performApiCall = async () => {
        console.log("api function called");
        const url = config.endpoint + `sign/student`;
        try{
            let response = await fetch(url , {
                method : "get",
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
            }
        }catch (e){
            let status = validateResponse(true , null);
        }
    };

    const handleLogin = async () => {
        debugger;
        console.log("login function called");
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            if(response !== undefined){
                setEmail("");
                setPassword("");
                alert("login successfull");
            }
        }
    }

    return (
        <div className="iform">
            <OutlinedInput placeholder="mail-id" value={email} onChange={(e) => {
                setEmail(e.target.value);
            }}/>
            <OutlinedInput placeholder="password" value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={(e) => {
                handleLogin(e);
            }}>Login</Button>
        </div>
    );
}

export function LoginA() {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

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
            alert("something went wrong,try again");
            return false;
        }else if(response.success === false){
            alert(response.message);
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
                method : "get",
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
            }
        }catch (e){
            let status = validateResponse(true , null);
        }
    };

    const handleLogin = async () => {
        debugger;
        console.log("login function called");
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            if(response !== undefined){
                setEmail("");
                setPassword("");
                alert("login successfull");
            }
        }
    }

    return(
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
    )
}

