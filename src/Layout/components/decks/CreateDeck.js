import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const intialFormState = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState(intialFormState);

  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck({ ...newDeck });
    return history.push("/");
  }

  return (
    <div className="col-0 mx-auto">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Create Deck</li>
      </ol>
      <header>
        <h2>Create Deck</h2>
      </header>
      <div className="card">
        <div className="card-body">
          <form>
            <div>
              <label>Name:</label>
              <br />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Deck Name"
                onChange={handleChange}
                value={newDeck.name}
                style={{ width: "100%" }}
              />
            </div>
            <br />
            <div>
              <label>Description:</label>
              <br />
              <textarea
                id="description"
                type="textarea"
                name="description"
                rows="3"
                placeholder="Brief description of the deck"
                onChange={handleChange}
                value={newDeck.description}
                style={{ width: "100%" }}
              />
            </div>
            <Link to="/" className="btn btn-secondary mr-3">
              Cancel
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
