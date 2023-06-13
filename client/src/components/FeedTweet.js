import styled from "styled-components";
import { format } from "date-fns";
import { COLORS } from "../constants";
import { FiMessageCircle } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

//components
import Likes from "./Likes";

const FeedTweet = ({ id, author, timestamp, media, status, tweet }) => {
  const navigate = useNavigate();

  const toFriendProfile = (e) => {
    e.preventDefault();
    navigate(`/${author.handle}`);
  };

  return (
    <Link
      to={`/tweet/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Tweet key={id}>
        <TweetContent>
          <Container>
            <Avatar
              alt="Avatar Photo"
              src={author.avatarSrc}
              tweet={tweet}
              onClick={toFriendProfile}
            />
            <HeaderContainer>
              <DisplayName> {author.displayName} </DisplayName>
              <Handle onClick={toFriendProfile}>@{author.handle}</Handle>
              <TimeStamp>{format(new Date(timestamp), "◦ MMM do")}</TimeStamp>
            </HeaderContainer>
          </Container>
          <p>{status}</p>

          {media.length !== 0 && <Photo alt="Tweet Photo" src={media[0].url} />}
        </TweetContent>
        <IconMenu>
          <FiMessageCircle />
          <FiRefreshCw />
          <Likes onClick={(e) => e.preventDefault()} />
          <FiShare />
        </IconMenu>
      </Tweet>
    </Link>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 20px;
`;

let fontColor = "";
const CharCount = styled.div`
  color: ${({ length }) => {
    switch (true) {
      case length > 55:
        return (fontColor = "black");

      case length < 56 && length >= 0:
        return (fontColor = "yellow");

      case length < 0:
        return (fontColor = "red");
    }
  }};
`;

const Container = styled.div`
  display: flexbox;
  align-items: center;
  gap: 18px;
`;

const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconMenu = styled.div`
  padding-top: 25px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  color: ${COLORS.primary};
  border-top: solid 1px ${COLORS.primary};
`;

const DisplayName = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

const Handle = styled.div`
  font-size: 0.9em;
  color: ${COLORS.primary};
`;

const TimeStamp = styled.div`
  font-size: 0.75em;
`;

const Avatar = styled.img`
  width: 6vw;
  border-radius: 50px;
`;

const Photo = styled.img`
  width: 40vw;
  border-radius: 15px;
`;

const Tweet = styled.div`
  width: 50vw;
  padding: 20px;
  margin: 10px;
  margin-top: 50px;
  border: solid 1.5px ${COLORS.primary};
  border-radius: 15px;
  background-color: #f3f3f3;
`;

export default FeedTweet;
