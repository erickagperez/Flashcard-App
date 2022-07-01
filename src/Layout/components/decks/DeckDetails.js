import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../../utils/api/index";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const history = useHistory();

  // Retrieve flashcard decks
  useEffect(() => {
    async function getDeck() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.error(error);
      }
      return () => {
        abortController.abort();
      };
    }
    getDeck();
  }, [deckId]);

  async function deleteDeckHandler(deckId) {
    const toDelete = window.confirm("Are you sure you want to delete?");

    if (toDelete) {
      await deleteDeck(deckId).catch((error) => {
        console.log(error);
      });
      return history.push("/");
    }
  }

  async function handleDeleteCard(card) {
    const abortController = new AbortController();
    if (
      window.confirm(`Delete this card? You will not be able to recover it.`)
    ) {
      await deleteCard(card.id, abortController.signal);
      return history.go(0);
    }
  }

  // Display cards
  const cardComponents = cards.map((card) => {
    return (
      <div className="card-deck" key={card.id}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">{card.front}</div>
              <div className="col">{card.back}</div>
            </div>
            <div className="container row">
              <Link
                to={`/decks/${deckId}/cards/${card.id}/edit`}
                className="btn btn-secondary mx-1"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteCard(card)}
                className="btn btn-danger mx-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="Deck">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" refresh="true">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <section>
        <h2>{deck.name} </h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="m-2 btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="m-2 btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="m-2 btn btn-primary">
          + Add Cards
        </Link>
        <button
          type="button"
          className="m-2 btn btn-danger float-right"
          onClick={() => deleteDeckHandler(deckId)}
        >
          Delete
        </button>
      </section>
      <br />
      <h3>Cards</h3>
      {cardComponents}
    </div>
  );
}

export default Deck;
