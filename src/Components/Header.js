import { Card } from "@mui/material";
import { styled as styledComponent } from "styled-components";

const Header = styledComponent.div`
display: flex;
justify-content: space-between;  
padding: 1rem;
background-color: ${(props) => props.color};
color: ${(props) => props.fontColor};
font-weight: 500;
font-size: 20px;
text-transform: capitalize;
letter-spacing: .2px;
  `;

Header.defaultProps = {
  fontColor: "black",
  color: "#52525287",
};

export default Header;
