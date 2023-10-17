import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Candidate from "./components/candidateRegistration";
import VoterRegister from "./components/VoterRegister";
import Winner from "./components/Winner";
//import Vote from "./contracts/Vote.json";
import Voting from "./components/voting";
import Web3 from "web3";
import { useEffect, useState } from "react";
import "./App.css";
import ElectionCommision from "./components/electionCommision";

function App() {
  const [state, setState] = useState({
    web3Key: null,
    contractKey: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    async function init() {
      try {
        const provider = new Web3.providers.HttpProvider(
          "HTTP://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        const ABI = require("./contracts/vote.json").abi;

        const contract = new web3.eth.Contract(
          ABI,
          "0xB0EA40b347Af1701D30969e868c4b809f4026b78"
        );

        setState({ web3Key: web3, contractKey: contract });
      } catch (error) {
        console.log("Error connecting to Ganache:", error);
      }
    }
    init();
  }, []);
  useEffect(() => {
    // const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");

      //var options = await web3.eth.getAccounts();
      options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var element = document.createElement("option");
        element.textContent = opt;
        element.value = opt;
        select.appendChild(element);
      }
    };
    web3 && allAccounts();
  }, [state]);
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };

  return (
    <>
      <div className="topnav">
        <a>
          <Link to="/">Home</Link>
        </a>
        <a>
          <Link to="/candidate">Candidate</Link>
        </a>
        <a>
          <Link to="/voter">Voter</Link>
        </a>
        <a>
          <Link to="/voting">Voting</Link>
        </a>
        <a>
          <Link to="/electioncommision">Election Commision</Link>
        </a>

        <a>
          <Winner state={state}></Winner>
        </a>
      </div>
      <div className="maiNcontainer">
        <p className="ca">Connected Account:{account}</p>

        <form className="label0" id="myForm">
          <label htmlFor="">Choose an account</label>
          <select
            className="innerBox"
            id="selectNumber"
            onChange={selectAccount}
          >
            <option></option>
          </select>
        </form>

        <Routes>
          <Route
            path="/candidate"
            element={<Candidate state={state} account={account} />}
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
            path="/electioncommision"
            element={<ElectionCommision state={state} account={account} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
//list of all accounts to select from
// selected account should become the sender
//list of accounts should be common in all components
