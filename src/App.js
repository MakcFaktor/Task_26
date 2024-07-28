import React, { useState, useEffect } from "react";
import "./App.css";

const EmojiVoting = () => {
  const initialEmojis = ["😀", "😂", "😍", "😎", "😭"];
  const [emojis] = useState(initialEmojis);
  const [votes, setVotes] = useState(
    JSON.parse(localStorage.getItem("votes")) || {},
  );
  const [winner, setWinner] = useState(null);
  const [winnerVotes, setWinnerVotes] = useState(0);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (emoji) => {
    const newVotes = { ...votes };
    newVotes[emoji] = (newVotes[emoji] || 0) + 1;
    setVotes(newVotes);
  };

  const showResults = () => {
    let maxVotes = 0;
    let winnerEmoji = null;

    for (const emoji in votes) {
      if (votes[emoji] > maxVotes) {
        maxVotes = votes[emoji];
        winnerEmoji = emoji;
      }
    }

    setWinner(winnerEmoji);
    setWinnerVotes(maxVotes);
  };

  const clearResults = () => {
    localStorage.removeItem("votes");
    setVotes({});
    setWinner(null);
    setWinnerVotes(0);
  };

  return (
    <div className="container">
      <h1>Голусовання за найкращий смайлик</h1>
      <ul className="emojis">
        {emojis.map((emoji) => (
          <li key={emoji}>
            <button onClick={() => handleVote(emoji)}>{emoji}</button>
            <span>{votes[emoji] || 0}</span>
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button onClick={showResults}>Показати результат</button>
        <button onClick={clearResults}>Очистити результати</button>
      </div>
      {winner && (
        <div>
          <h2>Переможець: {winner}</h2>
          <p>Кільікість голосів: {winnerVotes}</p>
        </div>
      )}
    </div>
  );
};

export default EmojiVoting;
