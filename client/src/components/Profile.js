import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";

import Error from "./Error";
import FeedTweet from "./FeedTweet";

const Profile = () => {
  const [user, setUser] = useState("");
  const { profileId } = useParams();
  const [order, setOrder] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState(false);
  const { error } = useContext(CurrentUserContext);
  const [localError, setLocalError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.profile);
      })
      .catch((e) => {
        setLocalError(true);
        console.log("profile fetch fail");
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data.tweetIds);
        setTweet(data.tweetsById);
      })
      .catch((e) => {
        setLocalError(true);
        console.log("profile feed fetch fail");
        console.log(e);
      });
  }, [newTweet]);

  const tweetArray = order.map((id) => {
    return tweet[id];
  });

  return error || localError ? (
    <Error />
  ) : (
    <Container>
      <Avatar alt="user avatar" src={user.avatarSrc} />
      <Header alt="profile banner" src={user.bannerSrc} />

      <InfoContainer>
        <TopContainer>
        <DisplayName>{user.displayName}</DisplayName>
        {/* need to turn below into button and move to top left corner */}
        {user.isBeingFollowedByYou ? <Following>Following</Following> : <Following>Follow</Following>}
        </TopContainer>
        <Handle>@{user.handle}</Handle>
        <Bio>{user.bio}</Bio>
        {user.isFollowingYou ? (
          <FollowingYou>Following you</FollowingYou>
        ) : (
          <FollowingYou>Is not following you</FollowingYou>
        )}
        <div>{user.isBeingFollowedByYou}</div>
        {/* add location icon below */}
        {/* <div>{user.location}</div> */}
        {/* <div>Likes: {user.numLikes}</div> */}
        {/* format date */}
        {/* <div>{user.joined}</div> */}
      </InfoContainer>
      <FeedContainer>
        {tweetArray.map((tweet) => {
          return (
            <FeedTweet
              key={tweet.id}
              media={tweet.media}
              status={tweet.status}
              author={tweet.author}
              timestamp={tweet.timestamp}
              id={tweet.id}
              tweet={tweet.tweet}
            />
          );
        })}
      </FeedContainer>
    </Container>
  );
};

const DisplayName = styled.div`
font-size: 2em;
font-weight: bold;
`;

const TopContainer = styled.div`
display: flex;
justify-content: space-between`;

const Avatar = styled.img`
  width: 10vw;
  margin-top: 25vh;
  margin-left: 3vw;
  border-radius: 80px;
  border: solid 4px white;
  z-index: 1;
`;

const Bio = styled.div`
font-size: 1.05em;
`;

const Following = styled.div`
margin-top: 2vh;
  background-color: #dedede;
  color: green;
  border-radius: 10px;
  border: solid 1px green;
  padding: 5px;
  width: fit-content;
`;

const Photo = styled.img`
  width: 40vw;
  border-radius: 15px;
`;

const Header = styled.img`
  width: 50vw;
  position: absolute;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowingYou = styled.div`
margin-top: 2vh;
  background-color: #dedede;
  color: ${COLORS.primary};
  border-radius: 10px;
  border: solid 1px ${COLORS.primary};
  padding: 5px;
  width: fit-content;
`;

const InfoContainer = styled.div``;

const FeedContainer = styled.div``;

const Handle = styled.div`
font-size: 1.25em;
`;

export default Profile;
