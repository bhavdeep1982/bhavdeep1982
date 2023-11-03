import React, { useState } from "react";

export const TodoContext = React.createContext();

const AppContext = ({ children }) => {
  const [list, setList] = useState([]);
  const [bin, setBin] = useState([]);
  const value = {
    list,
    bin,
    addToList: (item) => setList(item),
    saveToBin: (item) => setBin(item)
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default AppContext;
