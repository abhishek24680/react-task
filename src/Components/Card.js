import React, { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./Notification";
import Header from "./Header";

const Card = () => {
  const [data, setData] = useState([]);

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

  const getRandomName = () => {
    const names = ["ab", "cd", "ef", "gh", "ij"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  return (
    <>
      <Header />
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
    </>
  );
};

export default Card;
