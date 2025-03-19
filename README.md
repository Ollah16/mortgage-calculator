# 🏡 Mortgage Calculator

A **responsive** Mortgage Repayment Calculator built with **React and TypeScript**. This tool helps users estimate their **monthly mortgage repayments** based on their **property value, deposit, interest rate, and mortgage term**.

---

## ✨ Features

✅ **Fully Responsive** – Optimized for both **mobile and desktop** devices  
✅ **Real-Time Calculations** – Automatically updates as users input values  
✅ **React + TypeScript** – Ensures **scalability & maintainability** 
✅ **Accessible & User-Friendly** – Includes **input validation & structured UI**
✅ **Styled with Vanilla CSS** – Implements the **BEM naming convention** for maintainability  

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

---

## 📦 Installation Guide

### **1️⃣ Extract the ZIP File**
- Unzip the downloaded file to a desired location.

### **2️⃣ Install Dependencies**
Navigate into the project directory and run:
npm install

### **3️⃣ Run the Application**
Start the development server with:
npm start

## 📂 Project Structure 

/mortgage-calculator
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── components
│   │   ├── InputField.tsx
│   │   ├── Modal.tsx
│   │   └── MortgageCalculator.tsx
│   ├── hooks
│   │   └── useMortgageCalculator.ts
│   ├── styles
│   │   └── calculator.css
│   ├── utils
│   │   ├── mortgageCalculator.ts
│   │   └── validateInput.ts
│   └── __tests__
│       └── mortgageCalculator.test.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json

## 🧮 Mortgage Calculation Formula
This calculator uses the following formulas to determine the loan amount and monthly repayment:

### **1️⃣ Loan Calculation**
loan = propertyValue - deposit;

### **2️⃣ Monthly Repayment Calculation**
monthlyRepayment = (interestRate / 100 / 12) / (1 - Math.pow(1 + interestRate / 100 / 12, -mortgageTermYears * 12)) * loan;

## 🧪 Testing
- Unit tests are located in `src/__tests__/`.
- Run tests with: `npm test`
