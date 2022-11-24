import React, { useState, useEffect } from "react";
import { config } from "../../App";

const Meetings = ({clubname}) => {

    const [meets, setMeets] = useState([]);

    useEffect(() => {
        // console.log("hello");
        // console.log(meets , "1");
        const getMeetings = async () => {
            debugger;
            const m = await performApiCall();
            if(m != null){
                // console.log(meets);
                setMeets(m);
            }
            // console.log(meets);
        }

        getMeetings();
    });

    const performApiCall = async () => {
        // console.log("pac");
        const meetings = await fetchMeetings();
        return meetings;
    }

    const fetchMeetings = async () => {
        const url = config.endpoint + `getmeetdetails`;
        // debugger;
        try {

            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify({
                    "club_name": clubname
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json_response = await response.json();

            const status = handleResponse(false, json_response);
            if (status) {
                return json_response;
            } else {
                return null;
            }
        } catch (error) {
            handleResponse(true, null);
            return null;
        }

    }

    const handleResponse = (isError, meetings) => {
        if (isError) {
            return false;
        } else if (meetings[0].success == 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            <h1>Meetings</h1>
            {
            (meets.length != 0) ? (
                <>
                    <p>{meets.meetlink}</p>
                    <p>{meets.meettopic}</p>
                    <p>{meets.mentor}</p>
                </>
            ) : (<p>
                No meet is scheduled
            </p>)

        }
        </div >
    )
}

export default Meetings;