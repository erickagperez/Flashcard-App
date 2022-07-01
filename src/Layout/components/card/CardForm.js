import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../../utils/api/index";

function CardForm({deck}) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  const [isEdit, setIsEdit] = useState(null);
  const [front, setFront] = useState({ front: "" });
  const [back, setBack] = useState({ back: "" });

  useEffect(() => {
    async function cardInfo() {
      const abortController = new AbortController();
      const response = await readCard(cardId, abortController.signal);
      setFront({ front: response.front });
      setBack({ back: response.back });
    }
    function addOrEdit() {
      if (pathname.includes("new")) {
        setIsEdit(false);
      } else {
        setIsEdit(true);
        cardInfo();
      }
    }
    addOrEdit();
  }, [pathname, cardId]);

  function handleFront(event) {
    setFront({ ...front, front: event.target.value });
  }

  function handleBack(event) {
    setBack({ ...back, back: event.target.value });
  }

  async function handleUpdate() {
    await updateCard({ id: cardId, deckId: deck.id, ...front, ...back });
    history.push(`/decks/${deckId}`);
  }

    async function handleSubmit() {
      await createCard(parseInt(deckId), { ...front, ...back });
      history.push(`/decks/${deckId}`);
    }

    if (!front || !back) return null;
    return (
      <>
        <form>
          <div className="form-group">
            <label>
              <strong>Front:</strong>
            </label>
            <textarea
              required
              className="form-control"
              id="front"
              rows="3"
              placeholder={isEdit ? null : "Front side of card"}
              value={front.front}
              onChange={handleFront}
            ></textarea>
          </div>
          <div className="form-group">
            <label>
              <strong>Back:</strong>
            </label>
            <textarea
              required
              className="form-control"
              id="back"
              rows="3"
              placeholder={isEdit ? null : "Back side of card"}
              value={back.back}
              onChange={handleBack}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-1"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={isEdit ? handleUpdate : handleSubmit}
          >
           Save
          </button>
        </form>
      </>
    );
}
export default CardForm;
