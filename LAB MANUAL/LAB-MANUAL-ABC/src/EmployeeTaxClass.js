import React, { Component } from 'react';

class EmployeeTaxClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicPay: 0,
      grade: "",
      bonus: 0
    };
  }

  handleCheckGrade = () => {
    const bp = parseFloat(this.state.basicPay) || 0;
    const total = bp + (bp * 0.30) + (bp * 0.10) + (bp * 0.05);
    let g = "";
    if (total >= 10000 && total <= 20000) g = "A";
    else if (total > 20000 && total <= 30000) g = "B";
    else if (total > 30000 && total <= 40000) g = "C";
    else if (total > 40000) g = "EXC";
    this.setState({ grade: g });
  };


  handleCheckBonus = () => {
    const { grade, basicPay } = this.state;
    const bp = parseFloat(basicPay) || 0;
    let b = 0;
    if (grade === "A") b = bp * 0.15;
    else if (grade === "B") b = bp * 0.12;
    else if (grade === "C") b = bp * 0.06;
    else if (grade === "EXC") b = bp * 0.05;
    this.setState({ bonus: b });
  };

  render() {
    const bp = parseFloat(this.state.basicPay) || 0;
    const total = bp + (bp * 0.30) + (bp * 0.10) + (bp * 0.05);

    return (
      <div className="card">
        <h2>Employee Tax Calculator (Class)</h2>
        <input 
          type="number" 
          placeholder="Enter Basic Pay"
          onChange={(e) => this.setState({ basicPay: e.target.value })} 
        />
        <div className="result-box">
          <p>Total Salary: {total.toFixed(2)}</p>
          <button onClick={this.handleCheckGrade}>Check Grade</button>
          <p>Grade: {this.state.grade}</p>
          <button onClick={this.handleCheckBonus}>Check Bonus</button>
          <p>Bonus: {this.state.bonus.toFixed(2)}</p>
        </div>
      </div>
    );
  }
}

export default EmployeeTaxClass;