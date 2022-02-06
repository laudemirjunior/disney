import React from "react";
import { Switch, Route } from "react-router-dom";

import Characters from "../pages/characters";
import Home from "../pages/home";
import Search from "../pages/search";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/characters/:id">
        <Characters />
      </Route>
    </Switch>
  );
}
