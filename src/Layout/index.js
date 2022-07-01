import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./components/Home";
import Study from "./components/decks/Study";
import CreateDeck from "./components/decks/CreateDeck";
import DeckDetails from "./components/decks/DeckDetails";
import EditDeck from "./components/decks/EditDeck";
import EditCard from "./components/card/EditCard";
import AddCard from "./components/card/AddCard";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`/decks/new`}>
            <CreateDeck />
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <DeckDetails />
          </Route>
          <Route path={`/decks/:deckId/study`}>
            <Study />
          </Route>
          <Route path={`/decks/:deckId/edit`}>
            <EditDeck />
          </Route>
          <Route path={`/decks/:deckId/cards/new`}>
            <AddCard />
          </Route>
          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </Fragment>
  );
}
export default Layout;
