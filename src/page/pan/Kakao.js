import React, { useEffect } from "react";
const { kakao } = window;

function Kakao(props) {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.5700667),
      level: 3
    };
    let map = new window.kakao.maps.Map(container, options);

    console.log("loading map!!!");
  }, []);

  //https://velog.io/@acwell94/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%A7%80%EB%8F%84-api%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%ED%82%A4%EC%9B%8C%EB%93%9C-%EA%B2%80%EC%83%89-%ED%9B%84-%EB%A7%88%EC%BB%A4-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-%EA%B5%AC%ED%98%84
  // 참고 자료임~
  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Kakao;
