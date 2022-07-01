import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();

  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState(initialDeckState);

  useEffect(() => {
    async function deckInfo() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error(error);
      }
      return () => {
        abortController.abort();
      };
    }
    deckInfo();
  }, [deckId]);

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
      <h2>Edit Card</h2>
      <CardForm deck={deck} />
    </div>
  );
}

export default EditCard;
