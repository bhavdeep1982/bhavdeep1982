import React from "react";
import { Icon } from "./";

const IconBadge = ({ display, number }) => {
  return (
    <>
      <Icon icon={display ? "list-ul" : "ellipsis-v"} />
      {number > 0 && (
        <span className="bg-danger p-1 text-light btn-badge">{number}</span>
      )}
    </>
  );
};

export default IconBadge;
