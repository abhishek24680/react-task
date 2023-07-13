import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import Header from "./Header";

const Card = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isHandleSearchCalled, SetIsHandleSearchCalled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        let cardData = response.data;
        let uniqueUserIds = [...new Set(cardData.map((c) => c.userId))];
        const usersData = uniqueUserIds.map((userId) => {
          const userAlbums = cardData.filter((c) => c.userId === userId);
          const itemCount = userAlbums.length;
          const items = userAlbums.map((album) => ({
            id: album.id,
            title: album.title,
          }));
          let userName = getRandomName();
          let fullName = userName + userId;
          return {
            id: userId,
            itemCount,
            items,
            fullName: fullName,
          };
        });
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
      const results = data.filter((item) => {
        return item.fullName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
      SetIsHandleSearchCalled(false);
    }
  };

  const getRandomName = () => {
    const names = ["ab", "cd", "ef", "gh", "ij", "kl", "mn", "op"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  return (
    <>
      <Header searchFn={handleSearch} value={searchTerm} />

      {searchResults.length !== 0 ? (
        <div className="Content">
          {searchResults.map((item) => (
            <div className="number" key={item.id}>
              <div className="fullName">{item.fullName}</div>
              <Notification data={item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="NoResult">
          {isHandleSearchCalled ? "No results found" : ""}
        </p>
      )}

      {searchResults.length === 0 && searchTerm === "" && (
        <div className="Content">
          {data.map((c) => {
            return (
              <div className="number" key={c.id}>
                <div className="fullName">{c.fullName}</div>
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
