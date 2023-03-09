import { FiFrown } from "react-icons/fi";
import styled from "styled-components";
import { COLORS } from "../constants";

const Error = () => {
  return (
    <Container>
      <FiFrown size={100} color={`${COLORS.primary}`} />
      <h1>An unknown error has occured</h1>
      <h2>...please try refreshing the page &#x1F91E;</h2>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  text-align: center;
`;

export default Error;
