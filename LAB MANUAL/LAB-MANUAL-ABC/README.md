# ReactJS & MongoDB Lab Project: Full Stack Frameworks

This repository contains the complete implementation for the Full Stack Frameworks (23CSE461) Lab requirements, including advanced React logic and MongoDB database management.

## 🚀 React Features

### 1. Math Logic Suite

- **Factorial & Fibonacci**: Calculates large-number factorials and generates N terms of the Fibonacci sequence
- **Prime Checker**: Implements efficient primality testing for user-input numbers
- **Sum of Digits**: Extracts individual digits from any integer and returns their sum

### 2. Employee Tax Calculator (Set-2)

A dual-implementation (Class and Functional) based on the Set-2 Mid-Term Question Paper:

- **Salary Breakdown**: Computes DA (30%), HRA (10%), and Special Allowance (5%)
- **Grade Logic**: Automatically assigns grades based on Total Salary:
  - Grade A: ₹10,000 to ₹20,000
  - Grade B: ₹20,001 to ₹30,000
  - Grade C: ₹30,001 to ₹40,000
  - Grade EXC: > ₹40,000
- **Bonus Calculation**: Computes bonuses ranging from 5% to 15% based on the assigned grade

## 🍃 MongoDB Implementation (Employee DB)

Based on the Set-2 backend requirements and confirmed via terminal execution:

### Database Schema

Documents in the `employees` collection include `Eno`, `Name`, `Date_of_joining`, and `experience`.

### Executed Operations

- **Create**: Used `insertMany()` to add initial employee records (B101, B101_1, B102)
- **Read**: Performed targeted search for `Eno: B101` using `.find().pretty()`
- **Update**: Modified record `B101_1` to update Name to "Rahul" and Experience to 12
- **Delete**: Successfully removed the document with `Eno: B101` using `deleteOne()`

## 🛠️ Installation & Usage

### 1. Clone and Install

```bash
npm install
```

### 2. Launch React

```bash
npm start
```

### 3. Run MongoDB Shell

Ensure `mongod` is running, then use `mongosh` to execute the CRUD queries provided in the lab manual.

## 📝 Technologies

- **Frontend**: ReactJS (Hooks & Class Components)
- **Backend**: MongoDB (Mongosh v6.x)
- **Styling**: Custom CSS with Neon UI/UX elements

---

*Full Stack Frameworks Lab Project - 23CSE461*