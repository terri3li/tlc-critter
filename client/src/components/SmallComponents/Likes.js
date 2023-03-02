import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";

const Likes = () => {
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };

  return (
    <LikeContainer>
      <FiHeart onClick={handleClick} />
      <span> {likes}</span>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: inline;
  color: #b40e7f;
`;

export default Likes;
