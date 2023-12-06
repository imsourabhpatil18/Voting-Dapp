import { useEffect } from "react";
import { useState } from "react";
import CandidateList from "./candidateList";

function Voting({ state, account }) {
  const [status, setStatus] = useState("Not declared");

  async function voting(event) {
    event.preventDefault();
    const { contract } = state;

    try {
      const voterId = document.querySelector("#voterId").value;
      const candidateId = document.querySelector("#candidateId").value;
      console.log(voterId, candidateId);

      await contract.methods
        .voting(voterId, candidateId)
        .send({ from: account, gas: 1000000 });
      alert("voting succesfull");
    } catch (error) {
      alert(error);
    }
  }

  // async function voterList() {
  //   const { contract } = state;

  //   const voters = await contract.methods.voterList().call();
  //   console.log(voters);
  // }

  useEffect(() => {
    const { contract } = state;

    async function status() {
      const votingStatus = await contract.methods.votingStatus().call();
      setStatus(votingStatus);
    }
    contract && status();
  }, [state]);

  return (
    <div>
      <form className="form" onSubmit={voting}>
        <p className="status">Voting Status:{status}</p>
        <label className="label2" htmlFor="voterId">
          VoterId:
        </label>
        <input className="innerBoxVote" type="text" id="voterId"></input>

        <label className="label2" htmlFor="candidateId">
          Candidate Id:
        </label>
        <input className="innerBoxVote" type="text" id="candidateId"></input>
        <button className="regBtn" type="submit">
          Vote
        </button>
      </form>
      <CandidateList state={state} />
    </div>
  );
}
export default Voting;
