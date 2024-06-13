import React from "react";
import "./QuoteCard.css";
import Card from "./UI/Card";
import LoadingSpinner from "./UI/LoadingSpinner";

const QuoteCard = ({ newQuoteLoading, quote, onSave }) => {
  if (newQuoteLoading) {
    return (
      <div className="quote-card">
      <div className="centered">
        <LoadingSpinner />
      </div>
      </div>
    );
  }

  return (
    <div className="quote-card">
      <Card>
        <p>{quote}</p>
      </Card>
      <button onClick={onSave}>Save to List</button>
    </div>
  );
};

export default QuoteCard;
