import React from "react";
import "../../css/pan/PanSubMenu.css";

const locationlist = [
  "전체",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

function PanSubMenu({ findLocation }) {
  return (
    <div className="pansubmenu">
      {locationlist.map((item, index) => {
        return (
          <li
            className="loclist"
            key={item}
            onClick={() => findLocation({ item })}
          >
            {item}
          </li>
        );
      })}
    </div>
  );
}

export default PanSubMenu;
