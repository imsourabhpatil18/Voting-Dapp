import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CandidateRegister from "./components/candidateRegister";
import VoterRegister from "./components/voterRegister";
import Winner from "./components/Winner";
import Vote from "./contracts/vote.json";
import Home from "./components/HOme";

import Voting from "./components/voting";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./App.css";
import ElectionCommision from "./components/electionCommision";
import Navbar from "./components/navbar";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [buttonText, setButtonText] = useState("Connect Wallet");

  useEffect(() => {
    async function init() {
      const contractABI = Vote.abi;

      let provider = new Web3.providers.HttpProvider(
        "https://eth-sepolia.g.alchemy.com/v2/_EemJldI7Q2EbIcwTPXcuKVT_X_UaS5r"
      );

      let web3 = new Web3(provider);

      const Contract = new web3.eth.Contract(
        contractABI,
        "0xCEEF7Dd1654e21143F209Cd7f7a77A1AbAb1D5d1"
      );

      setState({ web3: web3, contract: Contract });
    }
    init();
  }, []);

  async function connectWallet() {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      //when metamask is installed
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account[0]);
        setButtonText("Connected");
      } catch (error) {
        console.log(error);
      }
    } else {
      //when metamask is not installed
      console.log("Install Metamask");
    }
  }

  return (
    <>
      <Navbar />
      <div className="wallet-connect-container">
        <h3>Account Address :{account}</h3>

        <button onClick={connectWallet}>{buttonText}</button>
      </div>

      <div className="App">
        <div className="maiNcontainer">
          <Routes>
            <Route
              path="/"
              element={<Home state={state} account={account} />}
            />
            <Route
              path="/candidate"
              element={<CandidateRegister state={state} account={account} />}
            />
            <Route
              path="/voter"
              element={<VoterRegister state={state} account={account} />}
            />

            <Route
              path="/voting"
              element={<Voting state={state} account={account} />}
            />
            <Route
              p
              ath="/electioncommision"
              element={<ElectionCommision state={state} account={account} />}
            />
            <Route
              path="/result"
              element={<Winner state={state} account={account} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
