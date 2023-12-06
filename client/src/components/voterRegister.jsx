import CandidateList from "./candidateList";

function VoterRegister({ state, account }) {
  async function voterRegister(e) {
    e.preventDefault();

    const { contract } = state;

    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    try {
      await contract.methods
        .voterRegistration(name, age, gender)
        .send({ from: account, gas: "1000000" });
      alert("Registration is succesfull");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <div className="btnContainer">
        <form className="form" onSubmit={voterRegister}>
          <label className="label2" htmlFor="name">
            Name:
          </label>
          <input className="innerBoxVote" type="text" id="name"></input>

          <label className="label2" htmlFor="age">
            Age:
          </label>
          <input className="innerBoxVote" type="text" id="age"></input>

          <label className="label2" htmlFor="gender">
            Gender:
          </label>
          <input className="innerBoxVote" type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default VoterRegister;
