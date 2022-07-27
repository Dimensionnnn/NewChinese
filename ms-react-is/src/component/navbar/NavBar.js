import React from "react";
import NavBarContainer from "./NavBarContainer";
import Logo from "./logo";
import MenuLinks from "./MenuLinks";
import ThemeButton from "./themeButton";

const NavBar = (props) => {
  console.log(props.user);
  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuLinks {...props} />
      <ThemeButton />
    </NavBarContainer>
  );
};

export default NavBar;
