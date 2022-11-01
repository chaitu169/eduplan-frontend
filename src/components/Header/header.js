import React from "react";
import { useNavigate , Link} from "react-router-dom";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./header.css";

function Header() {

    let navigate = useNavigate();

    const logOut = () => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
        navigate("/");
    }

    return(
     <div className="header">
        <h3>EduPlan</h3>
        <div className="header-action">
        {window.localStorage.getItem("email") ? (
            <>
                <Link className="header-link" to={"/student/classes"}>
                    <AddIcon />
                </Link>
                <Link className="header-link" to={`/student/classes/${window.localStorage.getItem("email")}`}>
                    My Classes
                </Link>
                <Button className="header-link" variant="outlined" onClick={logOut}>Log out</Button>
            </>
        ) : (<>

            </>)
        }  
        </div> 
     </div>
    );
}

export default Header;