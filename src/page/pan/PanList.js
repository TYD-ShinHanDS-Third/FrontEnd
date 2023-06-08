import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";
import { useRef } from "react";

const locationlist = [
  "서울특별시",
  "경기도",
  "인천광역시",
  "부산광역시",
  "대구광역시",
  "광주광역시",
  "울산광역시",
  "세종특별자치시",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치시도",
];

function PanList(props) {
  const [panlist, setPanlist] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const listurl = "http://localhost:3000/data/pan/panlistData.json";
    await axios
      .get(listurl)
      .then(function (response) {
        setPanlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const filterLocation = (index) => {};

  const filterFavorite = (event) => {
    console.log("좋아요 한 공고만 가져오기");
  };
  const filterOnNotice = (event) => {
    console.log("모집중인 공고만 가져오기");
  };
  const favorite = (panId, favorite) => {
    console.log("좋아요 하기 + 좋아요 취소" + panId + " : " + favorite);
  };

  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          {locationlist.forEach((item, index) => {
            <li key={index}>{item}</li>;
          })}
        </ul>
      </div>

      <div className="noticearea">
        <Routes>
          <Route path="detail" element={<PanDetail />}></Route>
          <Route
            path="/"
            element={
              <NoticeList
                panList={panlist}
                filterFavorite={filterFavorite}
                filterOnNotice={filterOnNotice}
                favorite={favorite}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default PanList;
