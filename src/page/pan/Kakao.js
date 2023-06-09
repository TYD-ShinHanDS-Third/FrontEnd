import { display, height } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
const { kakao } = window;

function Kakao(props) {
  useEffect(
    function view() {
      let container = document.getElementById("map");

      const mapCenter = new kakao.maps.LatLng(33.450701, 126.570667);

      var options = {
        center: mapCenter,
        level: 3,
      };

      let map = new window.kakao.maps.Map(container, options);

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
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.addressName}</div>`,
          });

          infowindow.open(map, marker);

          console.log(coords);

          map.setCenter(coords);

          // 로드뷰 코드

          var rvContainer = document.getElementById("roadview"); // 로드뷰를 표시할 div
          var rv = new kakao.maps.Roadview(rvContainer); // 로드뷰 객체 생성
          var rc = new kakao.maps.RoadviewClient(); // 좌표를 통한 로드뷰의 panoid를 추출하기 위한 로드뷰 help객체 생성
          var rvResetValue = {}; //로드뷰의 초기화 값을 저장할 변수
          rc.getNearestPanoId(mapCenter, 50, function (panoId) {
            rv.setPanoId(panoId, mapCenter); //좌표에 근접한 panoId를 통해 로드뷰를 실행합니다.
            rvResetValue.panoId = panoId;
          });

          kakao.maps.event.addListener(rv, "init", function () {
            var rMarker = new kakao.maps.Marker({
              position: mapCenter,
              map: rv,
            });

            var rLabel = new kakao.maps.InfoWindow({
              position: mapCenter,
              content: props.addressName,
            });
            rLabel.open(rv, rMarker);

            var projection = rv.getProjection();

            var viewpoint = projection.viewpointFromCoords(
              rMarker.getPosition(),
              rMarker.getAltitude()
            );
            rv.setViewpoint(viewpoint);

            rvResetValue.pan = viewpoint.pan;
            rvResetValue.tilt = viewpoint.tilt;
            rvResetValue.zoom = viewpoint.zoom;
          });

          function moveKakaoMap(self) {
            var center = map.getCenter(),
              lat = center.getLat(),
              lng = center.getLng();

            self.href =
              "https://map.kakao.com/link/map/" +
              encodeURIComponent(props.addressName) +
              "," +
              lat +
              "," +
              lng;
          }

          //지도 초기화 이벤트 핸들러
          function resetKakaoMap() {
            map.setCenter(mapCenter);
            map.setLevel(options.level);
          }

          //로드뷰 이동 이벤트 핸들러
          function moveKakaoRoadview(self) {
            var panoId = rv.getPanoId();
            var viewpoint = rv.getViewpoint();
            self.href =
              "https://map.kakao.com/?panoid=" +
              panoId +
              "&pan=" +
              viewpoint.pan +
              "&tilt=" +
              viewpoint.tilt +
              "&zoom=" +
              viewpoint.zoom;
          }

          function resetRoadview() {
            rv.setViewpoint({
              pan: rvResetValue.pan,
              tilt: rvResetValue.tilt,
              zoom: rvResetValue.zoom,
            });
            rv.setPanoId(rvResetValue.panoId);
          }
        }
      });
    },
    [props]
  );

  const [toggle, setToggle] = useState(true);
  function setRoad() {
    setToggle(!toggle);

    if (toggle === true) {
      document.getElementById("map").style.display = "none";
      document.getElementById("roadview").style.display = "block";
    } else {
      document.getElementById("map").style.display = "block";
      document.getElementById("roadview").style.display = "none";
    }
  }

  return (
    <div style={{ display: "flex", height: "100%", alignItems: "flex-end" }}>
      <div id="map" style={{ width: "95%", height: "100%" }}></div>
      <div
        id="roadview"
        style={{ width: "95%", height: "100%", display: "none" }}
      ></div>
      <button
        onClick={() => setRoad()}
        style={{
          height: "fit-content",
          width: "13%",
          marginLeft: "3%",
        }}
      >
        {toggle ? "로드뷰 보기" : "지도로 보기"}
      </button>
    </div>
  );
}

export default Kakao;
