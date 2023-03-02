import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import styled from "styled-components";

import Profile from "./Profile";
import HomeFeed from "./HomeFeed";
import TweetDetails from "./TweetDetails";
import Bookmarks from "./NotBeingUsed/Bookmarks";
import Notifications from "./NotBeingUsed/Notifications";
import Sidebar from "./Sidebar";
import CurrentUserProvider from "../CurrentUserContext";
import UserProfile from "./NotBeingUsed/UserProfile";

const App = () => {
  const [order, setOrder] = useState([]);
  const [tweet, setTweet] = useState([]);
  const [newTweet, setNewTweet] = useState(false);

  console.log("newTweet", newTweet);
  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.tweetIds);
        setTweet(data.tweetsById);
      });
  }, [newTweet]);

  const tweetArray = order.map((id) => {
    return tweet[id];
  });

  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Wrapper>
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <HomeFeed
                  tweetArray={tweetArray}
                  newTweet={newTweet}
                  setNewTweet={setNewTweet}
                />
              }
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:tweetId" element={<TweetDetails />} />
            <Route path="/:profileId" element={<Profile />} />
            <Route path="/profile/user" element={<UserProfile />} />
            {/* <Route path="*" element ={<PageNotFound />} /> */}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
