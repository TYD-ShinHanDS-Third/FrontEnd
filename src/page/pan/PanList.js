import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";

function PanList(props) {
  const [panlist, setPanlist] = useState([]);
  const [panlocation, setPanlocation] = useState([]);

  const pan = useState({
    panId: 0,
    panName: "",
    location: "",
    panStartDate: "",
    panEndDate: "",
    panState: "",
    favorite: false
  });

  async function getList(list) {
    const listurl = "http://localhost:3000/data/pan/panlistData.json";
    await axios
      .get(listurl)
      .then(function (response) {
        console.log(response);
        setPanlist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const locationurl = "http://localhost:3000/data/pan/panlocationData.json";
    await axios
      .get(locationurl)
      .then(function (response) {
        console.log(response);
        setPanlocation(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getList();
    setLocation(panlocation);
  }, []);

  function setLocation(panlocation) {
    const locations = [];
    for (let item in Object.keys(panlocation)) {
      locations.push(panlocation[item].location);
    }
  }

  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          <li>{panlocation}</li>
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
