import { Card } from "@mui/material";
import { styled as styledComponent } from "styled-components";

const Header = styledComponent.div`
display: flex;
justify-content: space-between;  
padding: 1rem;
  background-color: ${(props) => props.color};
  font-weight: bold;
  text-transform: capitalize;
  `;

Header.defaultProps = {
  color: "#B3B3B3",
};

export default Header;
