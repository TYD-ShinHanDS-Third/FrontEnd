import { display, height } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const { kakao } = window;

function HouseMapKakao(props) {
  useEffect(
    function view() {
      let container = document.getElementById("map");

      const mapCenter = new kakao.maps.LatLng(37.537187, 127.005476);

      var options = {
        center: mapCenter,
        level: 4
      };

      let map = new window.kakao.maps.Map(container, options);

      var positions = [
        {
          content: "<div>카카오</div>",
          latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
          content: "<div>생태연못</div>",
          latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
          content: "<div>텃밭</div>",
          latlng: new kakao.maps.LatLng(33.450879, 126.56994)
        },
        {
          content: "<div>근린공원</div>",
          latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
      ];

      for (var i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: positions[i].content // 인포윈도우에 표시할 내용
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
            position: coords
          });

          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.addressName}</div>`
          });

          infowindow.open(map, marker);
          console.log(coords);
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
          borderBottomLeftRadius: "10px"
        }}
      ></div>
    </div>
  );
}

export default HouseMapKakao;
