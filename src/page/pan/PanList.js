import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";
import { useRef } from "react";
import { Cookies } from "react-cookie";
import { Toll } from "@mui/icons-material";

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
  const [onNotice, setOnNotice] = useState(false);

  useEffect(() => {
    getList();
  }, [pageNum, onNotice]);

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
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice/fav/1";
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
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
  };
  const filterOnNotice = (event) => {
    setOnNotice(true);
    const listurl = "/hows/notice/fav/2";
    const cookies = new Cookies();
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJja2RydWExIiwicm9sZXMiOlsiVXNlciJdLCJpYXQiOjE2ODYxODkwNzIsImV4cCI6MTY4NjI3NTQ3Mn0.BuOvMeMhLfIlwMZcGioJbSbxtJnEKE5aWwAj1ntaCPE";
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
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
  };

  const filterNotice = (event) => {
    const listurl = "/hows/notice/fav/3";
    axios
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
  };
  const favorite = (panId, favorite) => {
    console.log("좋아요 하기 + 좋아요 취소" + panId + " : " + favorite);
  };
  const changePage = (pageNum) => {
    setPage(pageNum);
  };

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
                filterNotice={filterNotice}
                getList={getList}
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
