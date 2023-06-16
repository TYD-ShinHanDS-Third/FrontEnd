import React from "react";
import "../../css/pan/PanSubMenu.css";

const banklist = ["전체", "신한", "국민", "우리", "하나"];

function LoanSubMenu({ findBank }) {
  return (
    <div className="pansubmenu">
      {banklist.map((item, index) => {
        return (
          <li className="loclist" key={item} onClick={() => findBank({ item })}>
            {item}
          </li>
        );
      })}
    </div>
  );
}

export default LoanSubMenu;
