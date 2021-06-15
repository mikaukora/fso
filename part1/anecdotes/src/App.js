import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when diagnosing patients",
  ];

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const getHighScore = () => points.indexOf(Math.max(...points));

  const setVote = () => {
    const p = [...points];
    p[selected] += 1;
    setPoints(p);
  };

  const setRandom = () => {
    let getRand = () => Math.floor(Math.random() * anecdotes.length);
    let rand = getRand();

    // prevent picking the same anecdote
    while (rand === selected) {
      rand = getRand();
    }

    setSelected(rand);
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
      </div>
      <div>
        <button onClick={setVote}>vote</button>
        <button onClick={setRandom}>next anecdote</button>
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[getHighScore()]}</p>
      </div>
    </div>
  );
};

export default App;
