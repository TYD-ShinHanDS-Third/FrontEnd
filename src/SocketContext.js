import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

//const socket = io("http://localhost:8000");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [stream, setStream] = useState("");

  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [start, setStart] = useState(0);

  const myVideo = useRef({});
  const userVideo = useRef({});
  const connectionRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://192.168.0.107:8000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.current.on("me", (id) => {
      setMe(id);
    });

    socket.current.on("callUser", ({ from, signal }) => {
      setCall({ isReceivingCall: true, from, signal });
    });
  }, [start]);

  useEffect(() => {
    setStart(start + 1);
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    //console.log(connectionRef.current);
    //connectionRef.current.destroy();
    //window.location.reload();
  };

  const muteCall = () => {
    setCallMuted(true);
  };

  const unMuteCall = () => {
    setCallMuted(false);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        me,
        callMuted,
        callUser,
        leaveCall,
        answerCall,
        muteCall,
        unMuteCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
