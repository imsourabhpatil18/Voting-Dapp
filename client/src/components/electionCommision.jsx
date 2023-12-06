function ElectionCommision({ state, account }) {
  async function management(event) {
    event.preventDefault();
    const { contract } = state;

    const start = document.querySelector("#start").value;
    const end = document.querySelector("#end").value;
    try {
      await contract.methods
        .voteTime(start, end)
        .send({ from: account, gas: 1000000 });
      alert("voting time set");
    } catch (error) {
      alert(error);
    }
  }

  async function emergency() {
    const { contract } = state;

    try {
      await contract.methods.emergency().call();
      alert("voting stop");
    } catch (error) {
      alert(error);
    }
  }

  async function result() {
    const { contract } = state;

    try {
      await contract.methods.result().call();
      console.log("result function calling");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <form className="form" onSubmit={management}>
          <label className="label2" htmlFor="start">
            Start Time:
          </label>
          <input className="innerBoxVote" type="text" id="start"></input>

          <label className="label2" htmlFor="end">
            End Time:
          </label>
          <input className="innerBoxVote" type="text" id="end"></input>

          <button className="regBtn" type="submit">
            Voting Start
          </button>
        </form>
      </div>
      <div className="space">
        <button className="emerBtn" onClick={emergency}>
          Emergency
        </button>
        <button className="resBtn" onClick={result}>
          Result
        </button>
      </div>
    </>
  );
}
export default ElectionCommision;
