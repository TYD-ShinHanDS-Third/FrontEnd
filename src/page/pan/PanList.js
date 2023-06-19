import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";
import { Cookies } from "react-cookie";

function PanList({ loc }) {
  const [panlist, setPanlist] = useState([]);

  const [pageNum, setPage] = useState("0");
  const [pageTotal, setPageTotal] = useState("0");

  const [noticePageNum, setNoticePageNum] = useState("0");
  const [noticePageTotal, setNoticePageTotal] = useState(0);

  const [panDetail, setPandetail] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [pageNum]);

  useEffect(() => {
    filterOnNotice();
  }, [noticePageNum]);

  useEffect(() => {
    filterLocation(loc.item);
  }, [loc]);

  async function getList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice";
    await axios
      .get(listurl, {
        params: {
          page: pageNum,
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function filterLocation(loc) {
    if (loc == "전체") {
      getList();
    } else {
      const listurl = `/hows/notice/${loc}`;
      await axios
        .get(listurl, {
          params: {
            page: pageNum,
            size: "10",
          },
        })
        .then(function (response) {
          setPanlist(response.data.obj);
          setPageTotal(response.data.total);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

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
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function filterOnNotice(event) {
    const listurl = "/hows/notice/fav/2";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    await axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: noticePageNum,
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setNoticePageTotal(response.data.total);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const filterNotice = (event) => {
    const listurl = "/hows/notice/fav/3";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum,
          size: "10",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          console.log("123" + error);
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
    if (noticePageTotal >= 1) {
      setNoticePageNum(p);
    } else {
      setPage(p);
    }
  };

  const createBtn = (pageTotal) => {
    let paging = pageTotal / 10;
    let btns = [];
    for (let i = 0; i < paging; i++) {
      let btn_name = "btn_" + i;
      btns.push(
        <button className="pagebtn" id={btn_name} onClick={() => changePage(i)}>
          {i + 1}
        </button>
      );
    }
    if (pageNum) return btns;
  };

  return (
    <div className="panlist">
      <div className="noticearea">
        <Routes>
          <Route
            path="detail"
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
      <div className="paging">{createBtn(pageTotal)}</div>
    </div>
  );
}

export default PanList;
