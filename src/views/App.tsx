import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthenticationWrapper from "../components/AuthenticationWrapper";
import ShoppingListView from "./ShoppingListView";
import ShoppingListsView from "./ShoppingListsView";
import CreateShoppingListView from "./CreateShoppingListView";
import EditShoppingListView from "./EditShoppingListView";
import SignInView from "./SignInView";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <AuthenticationWrapper>
            <ShoppingListsView />
          </AuthenticationWrapper>
        </Route>
        <Route path="/lists/create" exact>
          <AuthenticationWrapper>
            <CreateShoppingListView />
          </AuthenticationWrapper>
        </Route>
        <Route path="/lists/:listId" exact>
          <AuthenticationWrapper>
            <ShoppingListView />
          </AuthenticationWrapper>
        </Route>
        <Route path="/lists/:listId/edit" exact>
          <AuthenticationWrapper>
            <EditShoppingListView />
          </AuthenticationWrapper>
        </Route>
        <Route path="/sign-in">
          <SignInView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
