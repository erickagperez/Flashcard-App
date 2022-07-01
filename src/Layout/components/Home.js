//Shows a list of decks with options to create, study, view, or delete a deck

import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchDecks();
  }, []);

  async function handleDelete(deck) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  return (
    <div className="container">
      <Link className="btn btn-secondary mb-2" to="/decks/new">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <div className="card" style={{ width: "30rem" }} key={deck.id}>
              <div className="card-body">
                <div className="card-title">{`${deck.name}`}</div>
                <div className="card-subtitle mb-2 text-muted">
                  {`${deck.cards.length} cards`}
                </div>
                <div className="card-text">{`${deck.description}`}</div>
                <Link
                  className="btn btn-secondary mx-1"
                  to={`/decks/${deck.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to={`/decks/${deck.id}/study`}
                >
                  Study
                </Link>
                <button
                  type="button"
                  className="btn btn-danger mx-1"
                  onClick={() => handleDelete(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
