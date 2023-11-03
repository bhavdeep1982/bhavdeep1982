import React, { useState, useRef, useContext } from "react";
import { TodoContext } from "./";

const Input = () => {
  const { list, addToList } = useContext(TodoContext);

  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const inputTodo = useRef();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = () => {
    const items = [...list];
    items.push({ todo: input, completed: false });
    inputTodo.current.focus();
    addToList([...items]);
  };

  const validateInput = () => {
    const error = {};
    if (input.trim() === "") {
      error.message = "Empty input!";
    }

    if (
      list.filter(
        (item) => item.todo.toLowerCase() === input.trim().toLowerCase()
      ).length
    ) {
      error.message = "Duplicate input!";
    }
    return error;
  };

  const doChange = (e) => {
    handleChange(e);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateInput(input);
    if (error.message) {
      inputTodo.current.focus();
      setError(error);
      return;
    }
    addItem(input);
    setInput("");
  };

  return (
    <>
      <form
        className="form-group"
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="todo_input"
            value={input}
            onChange={doChange}
            placeholder="Enter todo..."
            ref={inputTodo}
          />
          <div className="input-group-append">
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn btn-info"
              type="button"
            >
              Add Todo
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error.message}</div>}
      </form>
    </>
  );
};

export default Input;
