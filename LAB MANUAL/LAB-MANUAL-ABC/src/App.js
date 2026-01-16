import React from 'react';
import './App.css';
import MathOperations from './MathOperations'; 
import SumDigits from './SumDigits';           
import EmployeeTaxFunc from './EmployeeTaxFunc';
import EmployeeTaxClass from './EmployeeTaxClass';

function App() {
  return (
    <div className="container">
      <h1>LAB MANUAL Solutions</h1>
      
      {/* Set 2 Components */}
      <EmployeeTaxFunc />
      <EmployeeTaxClass />
      
      <hr />
      
   
      <MathOperations />
      <SumDigits />
    </div>
  );
}

export default App;