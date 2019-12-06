import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    id: '',
    balance: 0,
    chain: [],
    // transactions: [
    //   {
    //     sender: "test sender",
    //     recipient: "test recipient",
    //     amount: "test amount"
    //   }
    // ]
  })

  const getChain = async () => {
    const response = await fetch('http://localhost:5000/chain')
    const result = await response.json()
    console.log("result", result);
    setState({
      ...state,
      chain: result.chain
    })
  }

  useEffect(() => {
    getChain()
  }, [])

  const handleChanges = e => {
    e.preventDefault()
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="App">
      <h1>Blockchain</h1>
      <input name="id" placeholder="id" value={state.id} onChange={handleChanges} />
      {/* <button onClick={setState({...state, id: )}></button> */}

      <h3>ID: {state.id}</h3>
      <h3>balance: {state.balance}</h3>
      <button onClick={getChain}>Re-fetch</button>
      <h3>Chain</h3>
      <ul>
        {state.chain.map(block => {
          return <li key={block.index+Math.random()}>
            index: {block.index}
            <ul>
              {/* <li>{x.index}</li> */}
              <li>previous_hash: {block.previous_hash}</li>
              <li>proof: {block.proof}</li>
              <li>timestamp: {block.timestamp}</li>
              <li>
                transactions:
                <ul>
                {block.transactions.map(t => {
                  return <ul key={t.sender+t.recipient+t.amount+Math.random()}>
                    <li>amount: {t.amount}</li>
                    <li>sender: {t.sender}</li>
                    <li>recipient: {t.recipient}</li>
                  </ul>
                })}
                </ul>
              </li>
            </ul>
          </li>
        })}
      </ul>
      {/* <ul>
        {state.transactions.map(t => {
        return <li key={Math.random() + Date.now()}>
          <ul>
            <li>sender: {t.sender}</li>
            <li>recipient: {t.recipient}</li>
            <li>amount: {t.amount}</li>
          </ul>
        </li>
        })}
      </ul> */}
    </div>
  );
}

export default App;
