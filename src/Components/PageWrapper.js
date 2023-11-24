import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../icons/eye-color.png";
import PostcodeInput from "./PostcodeInput";

const Wrapper = styled(Box)`
  margin: auto;
  max-width: 1300px;
  overflow: hidden;
  padding: 1rem;

  @media (min-width: 600px) {
    padding: 0;
  }
`;

const StyledAppBar = styled(AppBar)`
  background: #fff;
  display: flex;
  height: 6rem;
  flex-direction: column;
  box-shadow: unset;

  @media (min-width: 600px) {
    height: 5rem;
    flex-direction: row;
  }
`;

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;

const LogoLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 35px;
  margin-right: 0.3rem;
  margin-top: -0.25rem;
`;

const HeaderText = styled.div`
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 800;
  font-style: italic;
  font-size: 20px;
`;

const PageWrapper = ({ header, children }) => {
  return (
    <Wrapper>
      <StyledAppBar position="static">
        <StyledToolbar>
          <HeaderText>
            <LogoWrapper>
              <LogoLink href="/">
                <LogoImage src={logo} alt="Logo" />
                <span>GRIDWATCH</span>
              </LogoLink>
            </LogoWrapper>
          </HeaderText>
          <div>
            <PostcodeInput />
          </div>
        </StyledToolbar>
      </StyledAppBar>
      {children}
    </Wrapper>
  );
};

export default PageWrapper;
