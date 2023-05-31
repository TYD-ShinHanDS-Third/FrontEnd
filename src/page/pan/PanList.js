import React from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";

function PanList(props) {
  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
        </ul>
      </div>
      <div className="noticearea">
        <Routes>
          <Route path="detail" element={<PanDetail />}></Route>
          <Route path="/" element={<NoticeList />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default PanList;
