import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import Header from "./Header";

const Card = () => {
  const [data, setData] = useState([]);
  const [resData, setResData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isHandleSearchCalled, SetIsHandleSearchCalled] = useState(false);
  const [TitleId, SetTitleId] = useState([]);
  let isTitleSeen = new Set();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        let cardData = response.data;
        setResData(cardData);
        let uniqueUserIds = [...new Set(cardData.map((c) => c.userId))];
        const usersData = uniqueUserIds.map((userId) => {
          const userAlbums = cardData.filter((c) => c.userId === userId);
          const itemCount = userAlbums.length;
          const items = userAlbums.map((album) => ({
            id: album.id,
            title: album.title,
          }));
          return { id: userId, name: getRandomName(), itemCount, items };
        });
        console.log(usersData);
        setData(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    SetIsHandleSearchCalled(true);
    if (e.target.value !== "") {
      const results = resData.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
      SetIsHandleSearchCalled(false);
    }
  };

  const getRandomName = () => {
    const names = ["ab", "cd", "ef", "gh", "ij"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const handleTitle = (id) => {
    console.log(id);
    isTitleSeen.add(id);
    let isSeenArr = [...isTitleSeen];
    SetTitleId([...new Set([...TitleId, ...isSeenArr])]);
  };

  return (
    <>
      <Header searchFn={handleSearch} value={searchTerm} />
      <div>
        <ul>
          {searchResults.length !== 0 ? (
            searchResults.map((item) => (
              <li className="TitleItems" key={item.id}>
                <p onClick={() => handleTitle(item.id)}>{item.title}</p>
              </li>
            ))
          ) : (
            <p>{isHandleSearchCalled ? "No results found" : ""}</p>
          )}
        </ul>
      </div>
      {searchResults.length === 0 && searchTerm === "" && (
        <div className="Content">
          {data.map((c) => {
            return (
              <div className="number" key={c.id}>
                <div className="fullName">{`${c.name} ${c.id}`}</div>
                <Notification data={c} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Card;
