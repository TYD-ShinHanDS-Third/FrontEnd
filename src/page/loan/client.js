import { io } from "socket.io-client";
import { createRTCConnectionManager } from "rtc-socket-connector-client";

const socket = io("http://localhost:5000");

const rtcConnectionManager = createRTCConnectionManager(socket, {
  // RTCPeerConnection 객체가 생성될 때 호출
  onRTCPeerConnection: (socketId, rtcPeerConnection) => {},

  // RTCPeerConnection: track 이벤트 발생 시 호출
  onTrack: (socketId, streams) => {},

  // RTCPeerConnection: datachannel 이벤트 발생 시 호출
  onDataChannel: (socketId, dataChannel) => {},
});

// 다른 클라이언트에 연결을 시도할 때 아래의 함수를 호출
function connect(targetSocketId) {
  rtcConnectionManager.connect(targetSocketId, {
    enableDataChannel: true, // DataChannel을 연결, Chat 기능을 구현할 때 사용.
    enableMedaiStream: false, // MediaStream을 연결, Video call 기능을 구현할 때 사용.
  });
}
