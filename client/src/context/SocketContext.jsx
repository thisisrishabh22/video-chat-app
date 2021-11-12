import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

// const socket = io("http://localhost:5110")
const socket = io("https://videocallapi1.rishabhsingh-dev.me")

const SocketContextProvider = (props) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState("");
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [videoOn, setVideoOn] = useState(true);
    const [audioOn, setAudioOn] = useState(true);



    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: videoOn === true ? true.valueOf : videoOn, audio: true }).then((currentStream) => {
            setStream(currentStream)
            myVideo.current.srcObject = currentStream;
        })

        socket.on("me", (id) => setMe(id));

        socket.on('call_user', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [])

    const videoOffRun = () => {
        if (stream !== null) {
            if (stream.getVideoTracks()[0]) {
                if (videoOn === false) {
                    stream.getVideoTracks()[0].stop();
                }
                else {
                    navigator.mediaDevices.getUserMedia({ video: videoOn === true ? true.valueOf : videoOn, audio: audioOn }).then((currentStream) => {
                        setStream(currentStream)
                        myVideo.current.srcObject = currentStream;
                    })
                }
            }
        }
    }

    useEffect(() => {
        videoOffRun()
    }, [videoOn])

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on("signal", (data) => {
            socket.emit("answer_call", { signal: data, to: call.from })
        })

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal)

        connectionRef.current = peer;
    }
    const callUser = (id) => {

        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on("signal", (data) => {
            socket.emit("call_user", { userToCall: id, signalData: data, from: me, name })
        })

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on("call_accepted", (signal) => {
            setCallAccepted(true)

            peer.signal(signal);
        })

        connectionRef.current = peer;
    }
    const leaveCall = () => {
        setCallEnded(true)

        connectionRef.current.destroy()

        window.location.reload()
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            me,
            callUser,
            leaveCall,
            answerCall,
            setVideoOn,
            videoOn
        }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketContextProvider }