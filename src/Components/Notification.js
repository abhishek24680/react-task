import React, { useEffect, useState } from "react";

const Notification = ({ data }) => {
  //   let storedReadData = JSON.parse(localStorage.getItem(`${data.id}`));
  //   let calculatedLength = data.itemCount - storedReadData?.length;
  //   let displayNotification = calculatedLength
  //     ? calculatedLength
  //     : data.itemCount;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unread, setUnread] = useState(data.itemCount);
  const [isClicked, setIsClicked] = useState([]);
  const [randomColor, setRandomColor] = useState("black");

  let isSeenData = new Set();

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    // let isSeenArr = [...isSeenData];
    setIsDialogOpen(false);

    if (data.id) {
      //   let readNotifications = JSON.parse(localStorage.getItem(`${data.id}`));
      let arrLength = isClicked.length;
      let currLength = data.itemCount - arrLength;
      console.log(currLength);
      setUnread(currLength);
    }
  };

  const handleRead = (e, val) => {
    isSeenData.add(val);
    let isSeenArr = [...isSeenData];
    setIsClicked([...new Set([...isClicked, ...isSeenArr])]);
    const randomColor = getRandomColor();
    setRandomColor(randomColor);
    // let x = isClicked.length != 0 ? isClicked : isSeenArr;
    // localStorage.setItem(`${data.id}`, JSON.stringify(x));
    console.log("val", val, "isSeenArr", isSeenArr, "local");
  };

  const getRandomColor = () => {
    const colors = ["red", "green", "blue", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div>
      <div>
        <div className="NotificationCount" onClick={handleDialog}>
          {unread}
        </div>
      </div>
      {isDialogOpen && (
        <div class="modal">
          <div className="dialog">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <p className="dialog-content">
              {data.items.map((c) => {
                return (
                  <p
                    key={c.id}
                    style={{
                      color: isClicked.includes(c.id) ? randomColor : "black",
                    }}
                    onClick={(e) => handleRead(e, c.id)}
                  >
                    {c.title}
                  </p>
                );
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;