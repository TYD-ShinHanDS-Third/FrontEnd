import React from "react";
import { Link } from "react-router-dom";

function AdminMenu(props) {
  return (
    <div className="menubar">
      <Link
        to="/hows/admin/user"
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3 className="menu">사용자확인</h3>
      </Link>
      <Link
        to="/hows/admin/consult"
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3 className="menu">회원상담</h3>
      </Link>
      <Link
        to="/hows/admin/form"
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3 className="menu">서류확인</h3>
      </Link>
    </div>
  );
}

export default AdminMenu;
