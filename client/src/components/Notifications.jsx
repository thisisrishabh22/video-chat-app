import { Button } from '@mui/material';
import React, { useContext } from 'react'

import { SocketContext } from "../context/SocketContext";

const Notifications = () => {

    const { call, answerCall, callAccepted } = useContext(SocketContext)
    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>{call.name} is calling !</h1>
                    <Button variant="contained" color="primary" onClick={() => { answerCall() }}>Answer</Button>
                </div>
            )}
        </>
    )
}

export default Notifications
