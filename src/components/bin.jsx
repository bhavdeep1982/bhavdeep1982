import React, { useContext } from "react";
import { Item, TodoContext } from "./";

const Bin = () => {
  const { list, bin, saveToBin, addToList } = useContext(TodoContext);
  if (!bin.length) return null;

  // return item to main list from bin
  const onRetrieveTrash = (item) => {
    saveToBin(bin.filter((t) => t.todo !== item.todo));
    const items = [...list];
    items.push(item);
    addToList(items);
  };

  return (
    <div className="border mt-1 p-1 rounded" style={{ background: "#ccc" }}>
      <ul className="list-group">
        {bin.map((item, index) => {
          return (
            <Item
              key={item.todo}
              iconLeft="undo"
              actionLeft={onRetrieveTrash}
              item={item}
              draggable="false"
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Bin;
