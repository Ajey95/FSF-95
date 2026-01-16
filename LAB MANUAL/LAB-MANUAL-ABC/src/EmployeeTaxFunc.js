import React, { useState } from 'react';

const EmployeeTaxFunc = () => {
  const [basicPay, setBasicPay] = useState(0);
  const [grade, setGrade] = useState("");
  const [bonus, setBonus] = useState(0);

  
  const da = basicPay * 0.30;
  const hra = basicPay * 0.10;
  const specAllowance = basicPay * 0.05;
  const totalSalary = parseFloat(basicPay) + da + hra + specAllowance;

  const checkGrade = () => {
    let g = "";
    if (totalSalary >= 10000 && totalSalary <= 20000) g = "A";
    else if (totalSalary > 20000 && totalSalary <= 30000) g = "B";
    else if (totalSalary > 30000 && totalSalary <= 40000) g = "C";
    else if (totalSalary > 40000) g = "EXC";
    setGrade(g);
  };

  
  const checkBonus = () => {
    let b = 0;
    const bp = parseFloat(basicPay);
    if (grade === "A") b = bp * 0.15;
    else if (grade === "B") b = bp * 0.12;
    else if (grade === "C") b = bp * 0.06;
    else if (grade === "EXC") b = bp * 0.05;
    setBonus(b);
  };

  return (
    <div className="card">
      <h2>Employee Tax Calculator (Functional)</h2>
      <input 
        type="number" 
        placeholder="Enter Basic Pay" 
        onChange={(e) => setBasicPay(e.target.value)} 
      />
      <div className="result-box">
        <p>Total Salary: {totalSalary.toFixed(2)}</p>
        <button onClick={checkGrade}>Check Grade</button>
        <p>Grade: {grade}</p>
        <button onClick={checkBonus}>Check Bonus</button>
        <p>Bonus: {bonus.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default EmployeeTaxFunc;