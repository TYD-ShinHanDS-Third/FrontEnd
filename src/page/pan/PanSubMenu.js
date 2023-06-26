import React from "react";
import "../../css/pan/PanSubMenu.css";

const locationlist = [
  ["전체", "전체"],
  ["서울", "서울"],
  ["경기", "경기도"],
  ["인천", "인천"],
  ["부산", "부산"],
  ["대구", "대구"],
  ["광주", "광주"],
  ["울산", "울산"],
  ["세종", "세종"],
  ["강원", "강원"],
  ["충북", "충청북도"],
  ["충남", "충청남도"],
  ["전북", "전라북도"],
  ["전남", "전라남도"],
  ["경북", "경상북도"],
  ["경남", "경상남도"],
  ["제주", "제주도"]
];

function PanSubMenu({ findLocation }) {
  const changeColor = (loc) => {
    for (let i = 0; i < locationlist.length; i++) {
      var reset = locationlist[i][0];
      document.getElementById(reset).style.color = "black";
    }
    document.getElementById(loc).style.color = "#2c7929";
  };
  return (
    <div className="pansubmenu">
      {locationlist.map((item, index) => {
        var newloc = item[1];
        return (
          <li
            className="loclist"
            id={item[0]}
            key={item[0]}
            onClick={() => {
              findLocation({ newloc });
              changeColor(item[0]);
            }}
            style={{ cursor: "pointer" }}
          >
            {item[0]}
          </li>
        );
      })}
    </div>
  );
}

export default PanSubMenu;
