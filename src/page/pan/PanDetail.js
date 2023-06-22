import React from "react";
import "../../css/pan/PanDetail.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StarIcon from "@mui/icons-material/Star";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Kakao from "./Kakao";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function PanDetail({ favorite, pageNum, getList, loc }) {
  console.log(loc);
  const location = useLocation();
  const panInfo = location.state.panInfo;
  const [fav, setFav] = useState(panInfo.favorite);
  const [panDetail, setPandetail] = useState([]);

  const his = useNavigate();
  const goList = () => {
    his("/hows/notice");
    getList(pageNum);
  };

  useEffect(() => {
    getDetailList(panInfo.panid);
  }, []);

  async function getDetailList(panId) {
    const listurl = "/hows/notice/detail";
    await axios
      .get(listurl, {
        params: {
          panid: panId,
        },
      })
      .then(function (response) {
        setPandetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //좋아요 기능 하기
  const like = (item) => {
    if (item.favorite === true) {
      item.favorite = false;
      setFav(false);
      favorite(item.panId, item.favorite);
    } else {
      item.favorite = true;
      setFav(true);
      favorite(item.panId, item.favorite);
    }
  };

  return (
    <div className="notice">
      <div className="noticeDetail">
        <div className="noticeHeader">
          <button className="goList" onClick={() => goList()}>
            목록으로 돌아가기
          </button>
          <h2 className="noticeTitle">{panInfo.panname}</h2>
          <div className="noticeFav">
            {panInfo.favorite === true ? (
              <button className="tag" onClick={() => like(panInfo)}>
                <HomeIcon />
              </button>
            ) : (
              <button className="tag">
                <HomeOutlinedIcon onClick={() => like(panInfo)} />
              </button>
            )}
          </div>
          <h3 className="noticeDate">
            {panInfo.panstartdate} ~ {panInfo.panenddate}
          </h3>
        </div>

        <div className="noticeBody">
          <Kakao
            address={panDetail.address}
            addressName={panDetail.addressname}
          />
        </div>

        <div className="noticeFooter">
          <div className="panDetailTable">
            <tr className="tablebox">
              <th className="panid">번호</th>
              <th className="panname">이름</th>
              <th className="location">지역</th>
              <th className="docstartdate">서류접수 시작</th>
              <th className="docenddate">서류접수 종료</th>
              <th className="winnersannouncement">당첨자 발표일</th>
            </tr>
            <tr className="tablebox">
              <td className="panid">{panInfo.panid}</td>
              <td className="panname">{panInfo.panname}</td>
              <td className="location">{panInfo.location}</td>
              <td className="docstartdate">{panDetail.docsstartdate}</td>
              <td className="docenddate">{panDetail.docsenddate}</td>
              <td className="winnersannouncement">
                {panDetail.winnersannouncement}
              </td>
            </tr>
          </div>

          <div className="panDetailTable">
            <tr className="tablebox">
              <th className="area">전용면적</th>
              <th className="address">단지주소</th>
              <th className="detailaddress">상세주소</th>
              <th className="addressname">단지명</th>
              <th className="moveindate">입주 예정월</th>
              <th className="totalcount">총 세대수</th>
            </tr>
            <tr className="tablebox">
              <td className="area">{panDetail.area}</td>
              <td className="address">{panDetail.address}</td>
              <td className="detailaddress">{panDetail.detailaddress}</td>
              <td className="addressname">{panDetail.addressname}</td>
              <td className="moveindate">{panDetail.moveindate}</td>
              <td className="totalcount">{panDetail.totalcount}</td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanDetail;
