import { display, height } from "@mui/system";
import { on } from "events";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const { kakao } = window;

function HouseMapKakao(props) {
  const mImage =
    "https://lh3.google.com/u/0/d/1ul5QjkpVaJkOiJuIHc8Ha7Z_qIsT4gVH=w2560-h1374-iv1";
  useEffect(
    function view() {
      let container = document.getElementById("map");

      const mapCenter = new kakao.maps.LatLng(37.537187, 127.005476);

      var options = {
        center: mapCenter,
        level: 4,
      };

      let map = new window.kakao.maps.Map(container, options);

      var imageSrc = mImage, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(45, 50), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

      var pos = [];

      for (let house in props.houselist) {
        var oneHouse = { housename: "", latlng: { La: "", Ma: "" } };
        let x = props.houselist[house].x;
        let y = props.houselist[house].y;

        oneHouse.housename = house;
        oneHouse.latlng.La = y;
        oneHouse.latlng.Ma = x;
        pos.push(oneHouse);
      }

      var positions = [];

      positions.push(
        pos.map((item, index) => {
          return {
            content:
              '<div class="customoverlay" style="width:200px;padding:5px;display:flex;align-items:center;justify-content:center;">' +
              "    <span>" +
              item.housename +
              "</span>" +
              "</div>",
            latlng: new kakao.maps.LatLng(item.latlng.La, item.latlng.Ma),
          };
        })
      );

      positions = positions[0];

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커의 위치
          image: markerImage, // 마커이미지 설정
        });

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
      function makeOverListener(map, marker, infowindow) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      function makeOutListener(infowindow) {
        return function () {
          infowindow.close();
        };
      }

      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(props.address, async function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const mapCenter = coords;
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:10px;display:flex;align-items:center;justify-content:center;">${props.addressName}</div>`,
          });

          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    },
    [props]
  );

  return (
    <div style={{ display: "flex", height: "100%", alignItems: "flex-end" }}>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      ></div>
    </div>
  );
}

export default HouseMapKakao;
