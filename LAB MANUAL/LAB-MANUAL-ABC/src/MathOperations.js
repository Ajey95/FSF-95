import React, { useState } from 'react';

const MathOperations = () => {
  const [num, setNum] = useState("");
  const [results, setResults] = useState({ fact: '', fib: '', prime: '' });

  const calculate = () => {
    const n = parseInt(num);
    if (isNaN(n)) return;

    // Factorial
    let fact = 1;
    for (let i = 1; i <= n; i++) fact *= i;

    // Fibonacci
    let fibArr = [0, 1];
    for (let i = 2; i < n; i++) fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
    let fibRes = n <= 0 ? "None" : (n === 1 ? "0" : fibArr.slice(0, n).join(', '));

    // Prime Check
    let isPrime = n > 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { isPrime = false; break; }
    }

    setResults({
      fact: fact,
      fib: fibRes,
      prime: isPrime ? "Yes" : "No"
    });
  };

  return (
    <div className="card">
      <h2>Part A: Math Logic</h2>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder="Enter a number" />
      <button onClick={calculate}>Check</button>
      <div className="result-box">
        <p>Factorial: {results.fact}</p>
        <p>Fibonacci: {results.fib}</p>
        <p>Is Prime: {results.prime}</p>
      </div>
    </div>
  );
};

export default MathOperations;