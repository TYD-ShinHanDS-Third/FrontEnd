import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";

function AdminMenu(props) {
  const [token, setToken] = useState(undefined);

  const signout = (e) => {
    const cookies = new Cookies();
    cookies.remove("jwtToken", { path: "/" });
    setToken(undefined);
    window.location.href = "/hows";
  };

  useEffect(() => {
    const cookies = new Cookies();
    setToken(cookies.get("jwtToken"));
  }, []);

  return (
    <div className="menubar">
      <div className="menutab">
        <Link
          to="/hows/admin/user"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">사용자확인</h3>
        </Link>
        <Link
          to="/hows/admin/consult"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">회원상담</h3>
        </Link>
        <Link
          to="/hows/admin/form"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">서류확인</h3>
        </Link>
      </div>
      <div className="menubtn">
        <Link
          to="/hows/auth/login"
          style={{
            textDecoration: "none",
            display: token === undefined ? "block" : "none",
          }}
        >
          <button className="menu">로그인</button>
        </Link>
        <div style={{ display: token === undefined ? "none" : "block" }}>
          <button className="menu" onClick={signout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
