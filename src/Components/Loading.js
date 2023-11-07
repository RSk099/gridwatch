import React from "react";

import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  );
};
export default Loading;
