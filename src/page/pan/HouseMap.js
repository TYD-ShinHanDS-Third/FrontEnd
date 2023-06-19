import React, { useEffect, useState } from "react";
import Kakao from "./Kakao";
import "../../css/pan/HouseMap.css";

import DaumPostcodeEmbed from "react-daum-postcode";
import { Cookies } from "react-cookie";
import axios from "axios";
import HouseMapKakao from "./HouseMapKakao";

function HouseMap(props) {
  const [houseaddress, setHouseaddress] = useState("");
  const [addressName, setAdressName] = useState("");
  const [searchtoggle, setSearchtoggle] = useState(false);
  const [houselist, setHouseList] = useState([]);

  useEffect(() => {}, [houseaddress, addressName]);

  const handleSearchToggle = (e) => {
    setSearchtoggle(!searchtoggle);
  };

  const selectAddress = (data) => {
    setHouseaddress(data.address);
    setAdressName(data.roadAddress);
  };

  async function showNearHouse(houseaddress) {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/find";
    await axios
      .get(listurl, {
        params: {
          houseaddress: houseaddress
        },
        headers: {
          "Content-type": "application/json",
          token: token
        }
      })
      .then(function (response) {
        setHouseList(response.data.obj);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="houseMap">
      <div className="mapContainer">
        <div>
          <div className="searchForm">
            <div className="searchHeader">
              <div className="searchTitle">
                <h3>행복주택 검색하기</h3>

                <button
                  className="searchLocationbtn"
                  onClick={() => handleSearchToggle()}
                >
                  주소검색
                </button>
              </div>
            </div>
            <div className="daumpost">
              {searchtoggle && (
                <DaumPostcodeEmbed
                  onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="서울특별시"
                  style={{ height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="kakaomap" id="kakaomap">
          <HouseMapKakao address={houseaddress} addressName={addressName} />
        </div>
      </div>
    </div>
  );
}

export default HouseMap;
