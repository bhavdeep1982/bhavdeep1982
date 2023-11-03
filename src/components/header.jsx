import React, { useState, useEffect, useContext } from "react";
import { Bin, IconBadge, TodoContext } from "./";

const Header = () => {
  const { bin } = useContext(TodoContext);
  const [showBin, setShowBin] = useState(false);

  useEffect(() => {
    if (!bin.length) setShowBin(false);
  }, [bin.length, showBin]);

  const handleClick = () => {
    setShowBin(!showBin);
  };

  return (
    <>
      <header className="input-group d-flex align-items-center justify-content-between mt-2">
        <h3>Items To Do</h3>
        <button
          className="btn btn-outline-info input-group-append"
          style={{ position: "relative" }}
          onClick={handleClick}
        >
          <IconBadge display={showBin} number={bin.length} />
        </button>
      </header>
      {showBin && <Bin />}
    </>
  );
};

export default Header;
