function CandidateRegister({ state, account }) {
  async function Register(e) {
    e.preventDefault();

    const { contract } = state;

    const name = document.querySelector("#name").value;
    const party = document.querySelector("#party").value;
    const gender = document.querySelector("#gender").value;
    const age = document.querySelector("#age").value;

    try {
      await contract.methods
        .candidateRegistration(name, age, party, gender)
        .send({ from: account, gas: "1000000" });
      alert("Registration is succesful");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <form className="form" onSubmit={Register}>
        <label className="label1" htmlFor="name">
          Name:
        </label>
        <input className="innerBoxCand" type="text" id="name"></input>

        <label className="label1" htmlFor="age">
          Age:
        </label>
        <input className="innerBoxCand" type="text" id="age"></input>

        <label className="label1" htmlFor="party">
          Party:
        </label>
        <input className="innerBoxCand" type="text" id="party"></input>

        <label className="label1" htmlFor="gender">
          Gender:
        </label>
        <input className="innerBoxCand" type="text" id="gender"></input>

        <button className="regBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
export default CandidateRegister;
