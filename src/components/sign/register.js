import React , { useState } from "react";
import {OutlinedInput , Input , Button } from "@mui/material";
import config from "../../App";
import "./register.css";
import {  redirect , Link} from "react-router-dom";

export function RegisterS() {
    const [name , setName] = useState("");
    const [mail , setMail] = useState("");
    const [password , setPassword] = useState("");

    //input validation function before making an api call
    const validateInput = () => {
        console.log("validate function called");
        if(name.length == 0){
            alert("name should be atleast 2 characters");
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
        const url = config.endpoint + `student/signup`;
        try{
            let response = await fetch(url , {
                method : "post",
                body : JSON.stringify({
                    "name" : name,
                    "email" : mail,
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


    const handleRegister = async () => {
        debugger;
        console.log("register function called");
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            if(response !== undefined){
                setName("");
                setMail("");
                setPassword("");
                alert("registration successfull,redirecting to login page");
            }
        }
    }

    return(
        <div className="iform">
            <OutlinedInput value={name} placeholder="student name" onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
            }}/>
            <OutlinedInput value={mail} placeholder="mail" onChange={(e) => {
                setMail(e.target.value);
            }}/>
            <OutlinedInput value={password} placeholder="password" onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onClick={() => {
                console.log("regustering");
                handleRegister();
            }}>Register</Button>

            <Link to={`/student/signin`}>
                <p>Already have an account Log in</p>
            </Link>
        </div>
    )
}

export function RegisterA() {
    const [club , setClub] = useState("");
    const [name , setName] = useState("");
    const [mail , setMail] = useState("");
    const [password , setPassword] = useState("");

    //input validation function before making an api call
    const validateInput = () => {
        if(name.length == 0 || club.length == 0){
            alert("name should be atleast 2 characters");
            return false;
        }else if(password.length < 8){
            alert("password length must be atleast 8");
            return false;
        }

        return true;
    }

    //validating the response 
    const validateResponse = (isError , response) => {
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

    //performing an api call to register admin
    const performApiCall = async () => {
        const url = config.endpoint + `student/signup`;
        try{
            let response = await fetch(url , {
                method : "post",
                body : JSON.stringify({
                    "club" : club,
                    "name" : name,
                    "email" : mail,
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

    const handleRegister = async () => {
        let isInputValid = validateInput();
        if(isInputValid === true){
            let response = await performApiCall();
            if(response !== undefined){
                setClub("");
                setName("");
                setMail("");
                setPassword("");
                alert("registration successfull,redirecting to login page");
            }
        }
    }

    return(
        <div className="iform">
            <OutlinedInput  value={club}  placeholder="club name" onChange={(e) => {
                setClub(e.target.value);
            }}/>
            <OutlinedInput  value={name} placeholder="admin name" onChange={(e) => {
                setName(e.target.value);
            }}/>
            <OutlinedInput  value={mail} placeholder="mail-id" onChange={(e) => {
                setMail(e.target.value);
            }}/>
            <OutlinedInput  value={password} placeholder="password" onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button variant="contained" onSubmit={handleRegister}>Register</Button>

            <Link to={`/admin/signin`}>
                <p>Already have an account Log in</p>
            </Link>
        </div>
    )
}