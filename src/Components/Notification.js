import React, { useEffect, useState } from "react";

const Notification = ({ data }) => {
  let storedReadData = JSON.parse(localStorage.getItem(`${data.id}`));
  let displayNotification = storedReadData ? storedReadData : data.itemCount;
  let storedClickedData = JSON.parse(localStorage.getItem(`ID${data.id}`));
  let setClickedStore = storedClickedData?.length > 0 ? storedClickedData : [];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unread, setUnread] = useState(displayNotification);
  const [isClicked, setIsClicked] = useState(setClickedStore || []);
  const [randomColor, setRandomColor] = useState("black");

  let isSeenData = new Set();

  const handleDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const randomColor = getRandomColor();
    setRandomColor(randomColor);
  }, [isDialogOpen]);

  const handleClose = () => {
    setIsDialogOpen(false);
    if (data.id) {
      let arrLength = isClicked.length;
      let currLength = data.itemCount - arrLength;
      localStorage.setItem(`${data.id}`, JSON.stringify(currLength));
      setUnread(currLength);
    }
  };

  const handleRead = (e, val) => {
    isSeenData.add(val);
    let isSeenArr = [...isSeenData];
    setIsClicked([...new Set([...isClicked, ...isSeenArr])]);
    localStorage.setItem(
      `ID${data.id}`,
      JSON.stringify([...new Set([...isClicked, ...isSeenArr])])
    );
    const randomColor = getRandomColor();
    setRandomColor(randomColor);
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
        {unread !== 0 && (
          <div className="NotificationCount" onClick={handleDialog}>
            {unread}
          </div>
        )}
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
                    className="Popup-Title"
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
