import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { COLORS } from "../constants";
import { FiMessageCircle } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { format } from "date-fns";

import Likes from "./Likes";

const HomeFeed = () => {
  const [formData, setFormData] = useState("");
  const [length, setLength] = useState(280);
  const [order, setOrder] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.tweetIds);
        setTweet(data.tweetsById);
      })
      .catch((error) => {
        navigate("/error");
      });
  }, [newTweet]);

  const tweetArray = order.map((id) => {
    return tweet[id];
  });

  const handlePost = (e) => {
    //add error page
    e.preventDefault();
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewTweet(!newTweet);
        setFormData("");
        setTweet(data.tweet);
        setLength(280);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLength(280 - e.target.value.length);

    const { id, value } = e.target;
    setFormData(e.target.value);
  };

  const preventTweetLink = (e) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <Title>Homepage</Title>
      <PostContainer>
        <form onSubmit={handlePost}>
          <PostForm
            type="text"
            onChange={handleChange}
            placeholder="...What's up?"
            value={formData}
          />
          <CountAndSubmit>
            <CharCount length={length}>{length}</CharCount>
            <Button disabled={length < 0 || length > 279}>Meow</Button>
          </CountAndSubmit>
        </form>
      </PostContainer>

      <FeedContainer>
        {tweetArray.map((tweet) => {
          const toProfile = (e) => {
            e.preventDefault();
            navigate(`/${tweet.author.handle}`);
          };
          return (
            <Link
              key={tweet.id}
              to={`/tweet/${tweet.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tweet key={tweet.id}>
                <TweetContent>
                  <Container>
                    <Avatar
                      alt="Avatar Photo"
                      src={tweet.author.avatarSrc}
                      tweet={tweet}
                      onClick={toProfile}
                    />
                    <HeaderContainer>
                      <DisplayName> {tweet.author.displayName} </DisplayName>
                      <Handle>@{tweet.author.handle}</Handle>
                      <TimeStamp>
                        {format(new Date(tweet.timestamp), "◦ MMM do")}
                      </TimeStamp>
                    </HeaderContainer>
                  </Container>
                  <p>{tweet.status}</p>

                  {tweet.media.length !== 0 && (
                    <Photo alt="Tweet Photo" src={tweet.media[0].url} />
                  )}
                </TweetContent>
                <IconMenu>
                  <FiMessageCircle />
                  <FiRefreshCw />
                  <Likes onClick={preventTweetLink} />
                  <FiShare />
                </IconMenu>
              </Tweet>
            </Link>
          );
        })}
      </FeedContainer>
    </MainContainer>
  );
};

const Title = styled.div`
  padding: 12px 16px 12px 16px;
  margin-top: 15px;
  margin-bottom: 30px;
  font-size: 2.25em;
  font-weight: bold;
  background-color: #f3f3f3;
  color: ${COLORS.primary};
  border-radius: 20px;
  border: solid 1.5px ${COLORS.primary};
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 20px;
`;

const CountAndSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  padding-bottom: 10px;
  gap: 15px;
  align-items: center;
  border: solid 1.5px ${COLORS.primary};
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #f0e7ff;
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

const PostForm = styled.textarea`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 45vw;
  height: 15vh;
  border: solid 1.5px ${COLORS.primary};
  border-bottom: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f0e7ff;
  text-align: center;
  font-size: 1.15em;
  &:focus-visible {
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px;
  width: 8vw;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 1em;
  border-radius: 20px;
  &:disabled {
    background-color: gray;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  width: 6vw;
  border-radius: 40px;
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

export default HomeFeed;
