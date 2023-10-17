function Voting() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("voting");
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="status">Voting Status:</p>
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
    </div>
  );
}
export default Voting;
