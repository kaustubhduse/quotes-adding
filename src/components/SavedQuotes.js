import React, { useState, useEffect } from "react";
import "./SavedQuotes.css";
import Card from "./UI/Card";
import LoadingSpinner from "./UI/LoadingSpinner";

const FIREBASE_DOMAIN = "https://react-http-63945-default-rtdb.firebaseio.com";

const SavedQuotes = ({ fetchTrigger }) => {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [hoveredQuoteId, setHoveredQuoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchSavedQuotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch saved quotes");
        }
        const data = await response.json();
        if (data) {
          const loadedQuotes = [];
          for (const key in data) {
            loadedQuotes.push({
              id: key,
              quote: data[key],
            });
          }
          setSavedQuotes(loadedQuotes);
        }
      } catch (error) {
        console.error("Error fetching saved quotes:", error);
      }
      setIsLoading(false);
    };

    fetchSavedQuotes();
    
  }, [fetchTrigger]);

  useEffect(() => {
    if (savedQuotes.length > 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [savedQuotes]);

  const deleteQuote = async (id) => {
    setIsDeleteLoading(true);
    try {
      const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${id}.json`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the quote");
      }
      setSavedQuotes((prevQuotes) =>
        prevQuotes.filter((quote) => quote.id !== id)
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error deleting the quote:", error);
    }

    setIsDeleteLoading(false);
  };

  if (savedQuotes.length === 0 && !isLoading) {
    return (
      <div className="saved-quotes">
        <p>No saved quotes yet.</p>
      </div>
    );
  }

  if (isLoading || isDeleteLoading) {
    return (
      <div className="saved-quotes">
        <div className="centered">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="saved-quotes">
      <p className="total">Total Quotes: {savedQuotes.length}</p>
      {savedQuotes.map((item, index) => (
        <div className="quote-container" key={item.id}>
          <span className="quote-number">{index + 1}.</span>
          <Card 
            id={`quote_${item.id}`}
            onMouseEnter={() => setHoveredQuoteId(item.id)}
            onMouseLeave={() => setHoveredQuoteId(null)}
          >
            <p>{item.quote}</p>
            {hoveredQuoteId === item.id && (
              <button className="delete" onClick={() => deleteQuote(item.id)}>
                Delete
              </button>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SavedQuotes;
