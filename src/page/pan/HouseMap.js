import React, { useState } from "react";
import Kakao from "./Kakao";
import "../../css/pan/HouseMap.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HouseIcon from "@mui/icons-material/House";
import DaumPostcodeEmbed from "react-daum-postcode";

function HouseMap(props) {
  const [houseaddress, setHouseaddress] = useState("");
  const [searchtoggle, setSearchtoggle] = useState(false);

  const handleSearchToggle = (e) => {
    setSearchtoggle(true);

    console.log(searchtoggle + "눙일");
  };

  const selectAddress = (data) => {
    console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
    setHouseaddress(false);
  };

  const searchLocation = () => {};
  return (
    <div className="houseMap">
      <div className="mapContainer">
        <div>
          <div className="searchForm">
            <div className="searchHeader">
              <div className="searchTitle">
                <h3>행복주택 검색하기</h3>
              </div>
              <div className="searchInput">
                <input type="text" className="search" />
                <button
                  className="searchLocationbtn"
                  onClick={() => handleSearchToggle()}
                >
                  주소검색
                </button>
              </div>
              {searchtoggle && (
                <DaumPostcodeEmbed
                  onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                />
              )}
            </div>
            <div className="searchList"></div>
          </div>
        </div>
        <div className="kakaomap" id="kakaomap">
          <Kakao address={houseaddress} />
        </div>
      </div>
    </div>
  );
}

export default HouseMap;
