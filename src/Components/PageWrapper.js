import React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { styled as styledComponent } from "styled-components";

import logo from "../icons/logo.png";

import useRegion from "../hooks/useRegion";

const Wrapper = styledComponent(Box)`
  margin: auto;
  max-width : 1300px;
  overflow: hidden;
`;

const PageWrapper = ({ header, children }) => {
  const { postcode, setPostcode } = useRegion();

  const navigate = useNavigate();

  return (
    <Wrapper sx={{ padding: { xs: "1rem", sm: "0rem" } }}>
      <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
        <AppBar
          position="static"
          style={{ background: "#333333" }}
          sx={{
            display: "flex",
            height: { xs: "6rem", sm: "4rem" },
            flexDirection: { xs: "column", sm: "column" },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <img src={logo} width="30px" style={{ paddingRight: "1rem" }} />
                GridWatch - {header}
              </div>
            </Typography>
            <div>
              <input
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              />
              <button onClick={() => navigate(`/regional/${postcode}`)}>
                See Regional
              </button>
              {postcode && (
                <button
                  onClick={() => {
                    setPostcode(null);
                    navigate(`/`);
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Wrapper>
  );
};
export default PageWrapper;
