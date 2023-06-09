import React from "react";
import "../../css/pan/PanDetail.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Kakao from "./Kakao";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function PanDetail({ favorite }) {
  const location = useLocation();
  const panInfo = location.state.panInfo;
  const [fav, setFav] = useState(panInfo.favorite);
  const [panDetail, setPandetail] = useState([]);

  const [address, setAddress] = useState("");
  const [addressName, setAddressName] = useState("");

  const history = useNavigate();

  useEffect(() => {
    getDetailList(panInfo.panid);
  }, []);

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

  //axios 이쪽 버전
  async function getDetailList(panId) {
    console.log(panId);
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
  const goList = () => {
    history("/hows/notice");
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
          <TableContainer>
            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>공고 번호</TableCell>
                  <TableCell>공고 이름</TableCell>
                  <TableCell>지역</TableCell>
                  <TableCell>서류 접수 시작일</TableCell>
                  <TableCell>서류 접수 종료일</TableCell>
                  <TableCell>당첨자 발표일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{panInfo.panid}</TableCell>
                  <TableCell>{panInfo.panname}</TableCell>
                  <TableCell>{panInfo.location}</TableCell>
                  <TableCell>{panDetail.docsstartdate}</TableCell>
                  <TableCell>{panDetail.docsenddate}</TableCell>
                  <TableCell>{panDetail.winnersannouncement}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>전용면적</TableCell>
                  <TableCell>단지주소</TableCell>
                  <TableCell>단지 상세주소</TableCell>
                  <TableCell>단지명</TableCell>
                  <TableCell>입주 예정월</TableCell>
                  <TableCell>총 세대수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{panDetail.area}</TableCell>
                  <TableCell>{panDetail.address}</TableCell>
                  <TableCell>{panDetail.detailaddress}</TableCell>
                  <TableCell>{panDetail.addressname}</TableCell>
                  <TableCell>{panDetail.moveindate}</TableCell>
                  <TableCell>{panDetail.totalcount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default PanDetail;
