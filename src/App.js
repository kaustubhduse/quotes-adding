import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Navigate
import QuoteCard from "./components/QuoteCard";
import SavedQuotes from "./components/SavedQuotes";
import "./App.css";
import Layout from "./components/UI/Layout";

const FIREBASE_DOMAIN = "https://react-http-63945-default-rtdb.firebaseio.com";

const App = () => {
  const [quote, setQuote] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [newQuoteLoading, setNewQuoteLoading] = useState(false);

  const fetchQuote = async () => {
    setNewQuoteLoading(true);
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
    setNewQuoteLoading(false);
  };

  const saveQuote = async () => {
    try {
      await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        method: "POST",
        body: JSON.stringify(quote),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFetchTrigger((prev) => !prev);
      window.location.href = "/saved";
    } catch (error) {
      console.error("Error saving the quote", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Router>
      <Layout>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/quotes" />} />
            <Route
              path="/quotes"
              element={
                <>
                  <h1>Ron Swanson Quotes</h1>
                  <QuoteCard
                    newQuoteLoading={newQuoteLoading}
                    quote={quote}
                    onSave={saveQuote}
                  />
                  <button onClick={fetchQuote}>Get New Quote</button>
                </>
              }
            />
            <Route
              path="/saved"
              element={
                <>
                  <h2>Saved Quotes</h2>
                  <SavedQuotes fetchTrigger={fetchTrigger} />
                </>
              }
            />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
