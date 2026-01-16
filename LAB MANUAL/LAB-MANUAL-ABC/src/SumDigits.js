import React, { useState } from 'react';

const SumDigits = () => {
  const [val, setVal] = useState("");
  const [sum, setSum] = useState(null);

  const findSum = () => {
    let n = Math.abs(parseInt(val));
    let total = 0;
    while (n > 0) {
      total += n % 10;
      n = Math.floor(n / 10);
    }
    setSum(total);
  };

  return (
    <div className="card">
      <h2>Part B: Sum of Digits</h2>
      <input type="number" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Enter digits" />
      <button onClick={findSum}>Calculate Sum</button>
      {sum !== null && <div className="result-box">Sum: {sum}</div>}
    </div>
  );
};

export default SumDigits;