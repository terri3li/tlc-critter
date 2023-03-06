import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";
import { FiHome } from "react-icons/fi";
import { FiSmile } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiFolder } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { keyframes } from "styled-components";

import Logo from "./Logo";

const Sidebar = () => {
  const { status } = useContext(CurrentUserContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Container>
      {status === "loading" ? (
       <Spin>
        <FiLoader size={70} color={`${COLORS.primary}`} />
        </Spin>
        
      ) : (
        <>
          <Logo />

          <Menu>
            <NavigationLink to={"/"}>
              <LinkTitle>
                <FiHome /> Home
              </LinkTitle>
            </NavigationLink>
            <NavigationLink to={`/${currentUser.handle}`}>
              <LinkTitle>
                <FiSmile /> Profile
              </LinkTitle>
            </NavigationLink>
            <NavigationLink to={"/notifications"}>
              <LinkTitle>
                <FiBell /> Notifications
              </LinkTitle>
            </NavigationLink>
            <NavigationLink to={"/bookmarks"}>
              <LinkTitle>
                <FiFolder /> Bookmarks
              </LinkTitle>
            </NavigationLink>

            <Button>Meow</Button>
          </Menu>
        </>
      )}
    </Container>
  );
};

const NavigationLink = styled(NavLink)`
  padding: 10px;
  text-decoration: none;
  &.active {
    color: ${COLORS.primary};
  }
`;

const Container = styled.div`
  height: 40vh;
  width: 18vw;
  margin: 50px 100px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 38px 55px 45px 20px;
  border: solid 1.5px ${COLORS.primary};
  border-radius: 20px;
  background-color: #f3f3f3;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 2vw;
  font-size: 1.25em;
  font-weight: bold;
`;

const LinkTitle = styled.span`
  padding-left: 5px;
  &:hover {
    background-color: #cdb5fc;
    border-radius: 15px;
    padding: 5px;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 1em;
  border-radius: 15px;
`;

// @keyframes spin { 
//   0% { 
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

const Spin = styled.div`
text-align: center;
padding-left: 28px;
animation: spin 2s linear infinite;
`;

export default Sidebar;
