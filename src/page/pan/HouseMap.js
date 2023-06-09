import React from "react";
import Kakao from "./Kakao";
import "../../css/pan/HouseMap.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HouseIcon from "@mui/icons-material/House";

function HouseMap(props) {
  return (
    <div className="houseMap">
      <div className="mapContainer">
        <div>
          <div className="searchForm">
            <h3>행복주택 검색하기</h3>
            <input type="text" className="search" />
            <div className="searchList">
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <nav>
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <HouseIcon />
                        </ListItemIcon>

                        <ListItemText primary="서울시 마포구 000 000 000" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <HouseIcon />
                        </ListItemIcon>
                        <ListItemText primary="서울시 마포구 000 000 000" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
                <Divider />
              </Box>
            </div>
          </div>
        </div>

        <div className="kakaomap">
          <Kakao />
        </div>
      </div>
    </div>
  );
}

export default HouseMap;
