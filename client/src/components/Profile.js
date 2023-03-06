import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";

import Error from "./Error";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";


const Profile = () => {
  const [user, setUser] = useState("");
  const { profileId } = useParams();
  const [order, setOrder] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.profile);
      })
      .catch((error) => {
        navigate('/error');
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
      .catch((error) => {
        navigate('/error');
      });
  }, [newTweet]);

  const tweetArray = order.map((id) => {
    return tweet[id];
  });

  // if (user.isFollowingYou === true) 
    return (
      <Container>
        <Avatar alt="user avatar" src={user.avatarSrc} />
        <Header alt="profile banner" src={user.bannerSrc} />

        <InfoContainer>
          <h1>{user.displayName}</h1>
          <div>@{user.handle}</div>
          {user.isFollowingYou ? (
            <FollowingYou>following you</FollowingYou>
          ) : (
            <span>is not following you</span>
          )}
          <div>{user.bio}</div>
          <div>{user.isBeingFollowedByYou}</div>
          {/* add location icon below */}
          <div>{user.location}</div>
          <div>Likes: {user.numLikes}</div>
          {/* need to turn below into button and move to top left corner */}
          {user.isBeingFollowedByYou ? <div>Following</div> : <div>Follow</div>}
          {/* format date */}
          <div>{user.joined}</div>
        </InfoContainer>

        <FeedContainer>
          {tweetArray.map((tweet) => {
            return (
              <TweetContainer key={tweet.id}>
                  <HeaderContainer>
                    <DisplayName> {tweet.author.displayName} </DisplayName>
                    <Handle>@{tweet.author.handle}</Handle>
                    <TimeStamp>
                      {format(new Date(tweet.timestamp), "◦ MMM do")}
                    </TimeStamp>
                  </HeaderContainer>
                
                <p>{tweet.status}</p>

                {tweet.media.length !== 0 && (
                  <Photo alt="Tweet Photo" src={tweet.media[0].url} />
                )}
              </TweetContainer>
            );
          })}
        </FeedContainer>
      </Container>
    );
        }

const Avatar = styled.img`
  width: 10vw;
  margin-top: 25vh;
  margin-left: 3vw;
  border-radius: 70px;
  border: solid 4px white;
  z-index: 1;
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
background-color: #DEDEDE;
color: ${COLORS.primary};
border-radius: 4px;
padding: 5px;
width: fit-content;
`;

const InfoContainer = styled.div``;

const FeedContainer = styled.div``;

const TweetContainer = styled.div``;

const HeaderContainer = styled.div``;

const DisplayName = styled.div``;

const TimeStamp = styled.div``;

const Handle = styled.div``;

export default Profile;
