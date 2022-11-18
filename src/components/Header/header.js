import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./header.css";

function Header() {

    let navigate = useNavigate();

    const logOutS = () => {
        window.sessionStorage.removeItem("email");
        window.sessionStorage.removeItem("password");
        window.sessionStorage.removeItem("student");
        navigate("/");
    }

    const logOutA = () => {
        window.sessionStorage.removeItem("email");
        window.sessionStorage.removeItem("password");
        window.sessionStorage.removeItem("admin");
        navigate("/");
    }

    return (
        <div className="header">
            <h3>EduPlan</h3>
            <nav className="header-action">
                {
                    (window.sessionStorage.getItem("email") && window.sessionStorage.getItem("admin") === 'true') ? (
                        <>
                            <Link className="header-link" to={`/admin/adminui`}>
                                My Classes
                            </Link>
                            <Button className="header-link" variant="contained" onClick={logOutA}>Log out</Button>
                        </>) : (
                        
                                (window.sessionStorage.getItem("student") === 'true') ? (
                                    <>
                                <Link className="header-link" to={"/student/classes"}>
                                    New
                                </Link>
                                <Link className="header-link" to={`/student/classes/${window.sessionStorage.getItem("email")}`}>
                                    My Classes
                                </Link>
                                <Button className="header-link" variant="contained" onClick={logOutS}>Log out</Button>
                            </>
                                ) : (<></>)
                            
                        
                    )
                }

            </nav>
        </div>
    );
}

export default Header;