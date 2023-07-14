import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeposit = () => {
    setTransactions([...transactions, `Deposit: $${depositAmount}`]);
    setBalance(balance + depositAmount);
    setDepositAmount(0);
  };

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && balance - withdrawAmount >= 0) {
       setTransactions([...transactions, `Withdrawal: $${withdrawAmount * -1}`]);
       setBalance(balance - withdrawAmount);
       setWithdrawAmount(0);
    }
  };

  const handleEmailChange = (e) => {
     setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
     setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img className="logo" src="/HOME.png" alt="HomeBank" />
        <h1 className="title">HomeBank</h1>
      </div>
      {isLoggedIn ? (
        <>
          <h2 className="subtitle">Bem Vindo, {email}!</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
          <div className="transactions">
            <h2>Transações:</h2>
            <ul>
              {transactions.map((transaction, index) => (
                <li key={index}>{transaction}</li>
              ))}
            </ul>
          </div>
          <div className="balance">
            <h2>Saldo:</h2>
            <p>${balance}</p>
          </div>
          <div className="actions">
            <div className="deposit">
              <h2>Depositar</h2>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(parseInt(e.target.value))}
              />
              <button onClick={handleDeposit}>Deposit</button>
            </div>
            <div className="withdraw">
              <h2>Retirar</h2>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
              />
              <button onClick={handleWithdraw}>Withdraw</button>
            </div>
          </div>
        </>
      ) : (
        <div className="login">
          <h2 className="subtitle">Login to HomeBank</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
