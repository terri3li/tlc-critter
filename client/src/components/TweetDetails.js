import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { FiMessageCircle } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { COLORS } from "../constants";

import Likes from "./SmallComponents/Likes";

/// big tweet page

const TweetDetails = () => {
  const [info, setInfo] = useState(null);
  const { tweetId } = useParams();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.tweet);
      });
  }, []);

  return (
    <>
      {info === null ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <AlignContainer>
            <TopContainer>
              <Avatar alt="User Avatar" src={info.author.avatarSrc} />

              <HeaderContainer>
                <DisplayName>{info.author.displayName}</DisplayName>
                <Handle>@{info.author.handle}</Handle>
              </HeaderContainer>
            </TopContainer>
            <MainContainer>
              <Status>{info.status}</Status>
              {info.media.length !== 0 && (
                <Photo alt="Tweet Photo" src={info.media[0].url} />
              )}
            </MainContainer>
            <InfoContainer>
              <TimeStamp>
                {format(new Date(info.timestamp), "HH:mmaa - MMM dd yyyy")}
              </TimeStamp>
              <span> Critter Web App </span>
            </InfoContainer>
            <IconMenu>
              <FiMessageCircle />
              <FiRefreshCw />
              <Likes />
              <FiShare />
            </IconMenu>
          </AlignContainer>
        </>
      )}
    </>
  );
};

const AlignContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 25px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const InfoContainer = styled.div`
  display: inline;
`;

const Avatar = styled.img`
  width: 7vw;
  height: 14vh;
  border-radius: 50px;
`;

const DisplayName = styled.div`
  font-weight: bold;
`;

const Handle = styled.div`
  color: ${COLORS.primary};
`;

const Status = styled.div`
  font-size: 1.3em;
  padding-bottom: 20px;
`;

const Photo = styled.img`
  height: 55vh;
  border-radius: 30px;
  padding-bottom: 20px;
`;

const TimeStamp = styled.span`
  padding-right: 15px;
`;

const IconMenu = styled.div`
  margin-top: 25px;
  padding: 15px 10px 10px 10px;
  display: flex;
  justify-content: space-around;
  border: solid 1px ${COLORS.primary};
  border-radius: 20px;
  color: ${COLORS.primary};
`;

export default TweetDetails;
