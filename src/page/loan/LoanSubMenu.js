import React from "react";
import "../../css/pan/PanSubMenu.css";

const banklist = ["전체", "신한", "국민", "우리", "하나"];

function LoanSubMenu({ findBank }) {
  const changeColor = (loc) => {
    for (let i = 0; i < banklist.length; i++) {
      var reset = banklist[i];
      document.getElementById(reset).style.color = "black";
    }
    document.getElementById(loc).style.color = "#2c7929";
  };
  return (
    <div className="pansubmenu">
      {banklist.map((item, index) => {
        return (
          <li
            className="loclist"
            id={item}
            key={item}
            onClick={() => {
              findBank({ item });
              changeColor(item);
            }}
          >
            {item}
          </li>
        );
      })}
    </div>
  );
}

export default LoanSubMenu;
