import React, { useContext } from "react";
import { Icon, TodoContext } from "./";

const Item = ({
  item,
  draggable,
  iconLeft,
  iconRight,
  actionLeft,
  actionRight
}) => {
  const { list, addToList } = useContext(TodoContext);

  const handleClick = (item) => {
    const todos = list.map((listitem) => {
      if (listitem.todo === item.todo) {
        listitem.completed = !listitem.completed;
      }
      return listitem;
    });
    addToList(todos);
  };

  ///------------------------------------------------
  /// DRAG AND DROP EVENT HANDLERS
  ///------------------------------------------------

  const resetElement = (e) => {
    const elParentStyle = e.target.parentElement.style;
    elParentStyle.transform = "scale(1)";
    e.target.style.background = "#fff";
  };

  const handleDragStart = (e) => {
    const source = e.target.innerHTML;
    e.dataTransfer.setData("source", source);
    e.target.style.background = "#cfc";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const elParentStyle = e.target.parentElement.style;
    elParentStyle.transform = "scale(1.03)";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    resetElement(e);
  };

  const getItemObject = (todo) => {
    return list.filter((item) => item.todo === todo);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.target.style.background = "#eee";

    let source = e.dataTransfer.getData("source");
    let target = e.target.innerHTML;

    if (source === target) return; //dont replace itself

    const targetIndex = list.findIndex((item) => item.todo === target);
    const updatedList = list.filter((item) => item.todo !== source);
    source = getItemObject(source);

    updatedList.splice(targetIndex, 0, source[0]);
    setTimeout(() => {
      addToList(updatedList);
      resetElement(e);
    }, 200);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    resetElement(e);
  };
  return (
    <>
      <div className="input-group d-flex flex-nowrap justify-content-between bg-light draggable">
        {actionLeft && (
          <div className="input-group-prepend">
            <button
              onClick={() => actionLeft(item)}
              className="btn  btn-sm input-group-text"
            >
              <Icon icon={iconLeft} />
            </button>
          </div>
        )}
        <div
          className={`droparea border px-2 w-100 pointer ${
            item.completed && "completed"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(item)}
          // drag and drop events only available
          // for todo list not in bin
          draggable={iconRight && draggable}
          onDragStart={iconRight && handleDragStart}
          onDragOver={iconRight && handleDragOver}
          onDrop={iconRight && handleDrop}
          onDragLeave={iconRight && handleDragLeave}
          onDragEnd={iconRight && handleDragEnd}
          //
        >
          {item.todo}
        </div>
        {actionRight && (
          <div className="input-group-append">
            <button
              onClick={() => actionRight(item)}
              className="btn btn-danger btn-sm input-group-text"
            >
              <Icon icon={iconRight} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;
