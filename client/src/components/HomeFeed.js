import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { COLORS } from "../constants";

//components
import { CurrentUserContext } from "../CurrentUserContext";
import Error from "./Error";
import FeedTweet from "./FeedTweet";

const HomeFeed = () => {
  const [formData, setFormData] = useState("");
  const [length, setLength] = useState(280);
  const [order, setOrder] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState(false);

  const navigate = useNavigate();
  const { currentUser, error, setError, status } =
    useContext(CurrentUserContext);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.tweetIds);
        setTweet(data.tweetsById);
      })
      .catch((e) => {
        setError(true);
        console.log("homefeed fail");
        console.log(e);
      });
  }, [newTweet]);

  const tweetArray = order.map((id) => {
    return tweet[id];
  });

  const handlePost = (e) => {
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
        setLength(280);
      })
      .catch((e) => {
        setError(true);
        console.log("homefeed post fail");
        console.log(e);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLength(280 - e.target.value.length);

    const { id, value } = e.target;
    setFormData(e.target.value);
  };

  const toHomeProfile = (e) => {
    e.preventDefault();
    navigate(`/${currentUser.handle}`);
  };
  
  return error ? (
    <Error />
  ) : (
    <MainContainer>
      <Title>Homepage</Title>
      <PostContainer>
        <StyledForm onSubmit={handlePost}>
          <PostForm
            type="text"
            onChange={handleChange}
            placeholder="...What's up?"
            value={formData}
          />
          {currentUser && (
            <UserAvatar alt="Avatar Photo" src={currentUser.avatarSrc} />
          )}
          <CountAndSubmit>
            <CharCount length={length}>{length}</CharCount>
            <Button disabled={length < 0 || length > 279}>Meow</Button>
          </CountAndSubmit>
        </StyledForm>
      </PostContainer>

      <FeedContainer>
        {tweetArray.length &&
          tweetArray.map((tweet) => {
            return (
              <FeedTweet
                key={tweet.id}
                media={tweet.media.length ? tweet.media : []}
                status={tweet.status}
                author={tweet.author}
                timestamp={tweet.timestamp}
                id={tweet.id}
                tweet={tweet.tweet}
              />
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
  width: 45vw;
`;

const CountAndSubmit = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  padding-bottom: 10px;
  gap: 15px;
  align-items: center;
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

const PostForm = styled.textarea`
  display: flex;
  resize: none;
  position: absolute;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 44vw;
  height: 15vh;
  border: none;
  border-radius: 25px;
  text-align: center;
  font-size: 1.15em;
  background-color: #f0e7ff;
  &:focus-visible {
    outline: none;
  }
`;

const StyledForm = styled.form`
  width: 45vw;
  background-color: #f0e7ff;
  border: solid 1.5px ${COLORS.primary};
  border-radius: 25px;
  padding: 10px;
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

const UserAvatar = styled.img`
  position: relative;
  width: 6vw;
  border-radius: 40px;
  z-index: 2;
  margin-left: 20px;
  background: transparent;
`;

export default HomeFeed;
