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
  const [pageNum, setPage] = useState("0");

  useEffect(() => {
    getList();
  }, [pageNum]);

  async function getList() {
    const listurl = "/hows/notice";
    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
      })
      .then(function (response) {
        setPanlist(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const filterLocation = (item) => {
    console.log("받아온 item으로 request하기");
  };

  const filterFavorite = (event) => {
    console.log("좋아요 한 공고만 가져오기");
  };
  const filterOnNotice = (event) => {
    console.log("모집중인 공고만 가져오기");
  };
  const favorite = (panId, favorite) => {
    console.log("좋아요 하기 + 좋아요 취소" + panId + " : " + favorite);
  };
  const changePage = (pageNum) => {
    setPage(pageNum);
  };

  // detail 데이터 가져오기
  // const getPanDetail = (panid) => {
  //   console.log("데이터 가지로 왔어요");
  //   getDetailList(panid);
  // };

  // async function getDetailList(panId) {
  //   console.log(panId);
  //   const listurl = "/hows/notice/detail";
  //   await axios
  //     .get(listurl, {
  //       params: {
  //         panid: panId,
  //       },
  //     })
  //     .then(function (response) {
  //       setPandetail(response.data[0] + "!!!!!");
  //     })
  //     .catch(function (error) {
  //       console.log("123123W" + error);
  //     });
  // }

  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          {locationlist.map((item, index) => {
            return (
              <li key={item} onClick={() => filterLocation(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="noticearea">
        <Routes>
          <Route
            path="detail/*"
            element={<PanDetail favorite={favorite} />}
          ></Route>
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
      <div className="paging">
        <button className="pagebtn" onClick={() => changePage(1)}>
          {" "}
          1
        </button>
        <button className="pagebtn" onClick={() => changePage(2)}>
          2
        </button>
        <button className="pagebtn" onClick={() => changePage(3)}>
          3
        </button>
      </div>
    </div>
  );
}

export default PanList;
