import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";
import { Cookies } from "react-cookie";

function PanList({ loc }) {
  const [panlist, setPanlist] = useState([]);
  const [pageNum, setPage] = useState("1");
  const [pageTotal, setPageTotal] = useState("0");

  const [filterState, setFilterState] = useState("");

  const location = useLocation();

  useEffect(() => {
    getList("1");
  }, []);

  useEffect(() => {
    if (filterState == "기본") {
      getList(pageNum);
    } else if (filterState == "주소") {
      filterLocation(loc, pageNum);
    } else if (filterState == "관심") {
      filterFavorite(pageNum);
    } else if (filterState == "모집") {
      filterOnNotice(pageNum);
    } else if (filterState == "관심+모집") {
      filterNotice(pageNum);
    }
  }, [pageNum]);

  useEffect(() => {
    filterLocation(loc, "1");
  }, [loc]);

  async function getList(pageNum) {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice";
    await axios
      .get(listurl, {
        params: {
          page: pageNum - 1,
          size: "10",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        setFilterState("기본");
        setBtnColor(pageNum);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function filterLocation(loc, pageNum) {
    if (loc == "전체") {
      getList("1");
    } else {
      const listurl = `/hows/notice/${loc}`;
      await axios
        .get(listurl, {
          params: {
            page: pageNum - 1,
            size: "10",
          },
        })
        .then(function (response) {
          setPanlist(response.data.obj);
          setPageTotal(response.data.total);
          setBtnColor(pageNum);
          setFilterState("주소");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  async function filterFavorite(pageNum) {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice/fav/1";
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum - 1,
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        setBtnColor(pageNum);
        setFilterState("관심");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function filterOnNotice(pageNum) {
    const listurl = "/hows/notice/fav/2";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    await axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum - 1,
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        setBtnColor(pageNum);
        setFilterState("모집");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function filterNotice(pageNum) {
    const listurl = "/hows/notice/fav/3";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum - 1,
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        setBtnColor(pageNum);
        setFilterState("관심+모집");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function favorite(panid, favorite) {
    // console.log("좋아요 하기 + 좋아요 취소" + panid + " : " + favorite);
    const listurl = "/hows/notice";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    console.log("favorite : " + favorite);

    if (favorite) {
      console.log("axios");
      await axios
        .post(
          listurl,
          { panid: panid },
          {
            headers: {
              "Content-type": "application/json",
              token: token,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await axios
        .delete(listurl, {
          headers: {
            token: token,
          },
          params: {
            panid: panid,
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const changePage = (p) => {
    setPage(p);
    setBtnColor(p);
  };

  const createBtn = (pageTotal) => {
    let paging = pageTotal / 10;
    let btns = [];
    for (let i = 1; i < paging + 1; i++) {
      let btn_name = "btn_" + i;
      btns.push(
        <button
          className="pagebtn"
          id={btn_name}
          style={{ backgroundColor: "#edf1d6", color: "gray" }}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }
    if (pageNum) return btns;
  };

  function setBtnColor(p) {
    var paging = pageTotal / 10;
    var btn_name;
    for (let a = 1; a < paging + 1; a++) {
      btn_name = "btn_" + a;
      document.getElementById(btn_name).style.backgroundColor = "#edf1d6";
      document.getElementById(btn_name).style.color = "gray";
    }
    let btn_check = "btn_" + p;
    document.getElementById(btn_check).style.backgroundColor = "#2c7929";
    document.getElementById(btn_check).style.color = "white";
  }

  return (
    <div className="panlist">
      <div className="noticearea">
        <Routes>
          <Route
            path="detail"
            element={
              <PanDetail
                favorite={favorite}
                pageNum={pageNum}
                getList={getList}
              />
            }
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
                loc={loc}
              />
            }
          ></Route>
        </Routes>
      </div>
      {location.pathname == "/hows/notice" ? (
        <div className="paging">{createBtn(pageTotal)}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PanList;
