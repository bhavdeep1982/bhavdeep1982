import React, { memo } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faUndo,
  faListUl,
  faEllipsisV,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { Todos, AppContext } from "./components/";
import "./styles.css";

library.add(fas, faUndo, faListUl, faEllipsisV, faTimesCircle);

const App = memo(() => {
  return (
    <AppContext>
      <Todos />
    </AppContext>
  );
});

export default App;

