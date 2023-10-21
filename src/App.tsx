import React from 'react';
import './App.css';
import {
  sum_to_n_a,
  sum_to_n_b,
  sum_to_n_c
} from "./Problem/Problem1";

function App() {

  const printToScreen = (sum: number) => {
    return (
        <h1>{sum}</h1>
    )
  }


  return (
    <div className="App">
      {
        printToScreen(sum_to_n_a(5))
      }
    </div>
  );
}

export default App;
