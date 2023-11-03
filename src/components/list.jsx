import React, { useContext } from "react";
import { Item, Input, TodoContext } from "./";

const List = () => {
  const { list, bin, addToList, saveToBin } = useContext(TodoContext);

  const handleRecycle = (item) => {
    if (list.length) {
      const recycleItems = [...bin];
      recycleItems.push(item);
      saveToBin(recycleItems);
    }

    const items = list.filter((t) => t.todo !== item.todo);
    addToList(items);
  };

  const handleDelete = (item) => {
    addToList(list.filter((t) => t.todo !== item.todo));
  };

  return (
    <div>
      <Input />
      <ul className="list-group">
        {list.map((item) => {
          return (
            <Item
              key={item.todo}
              iconLeft="trash-alt"
              iconRight="times-circle"
              actionLeft={() => handleRecycle(item)}
              actionRight={() => handleDelete(item)}
              item={item}
              draggable="true"
            />
          );
        })}
      </ul>
      <small className="text-muted">
        {list.length > 1 && "Drag and drop to order list"}
      </small>
    </div>
  );
};

export default List;
