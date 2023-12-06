import { useEffect } from "react";
import { useState } from "react";

function Winner({ state }) {
  const [winner, setWinner] = useState("not declared");

  useEffect(() => {
    const { contract } = state;
    async function winnerCandidate() {
      const win = await contract.methods.winner().call();
      if (winner !== "0x0000000000000000000000000000000000000000") {
        setWinner(win);
      }
      console.log(winner);
    }
    contract && winnerCandidate();
  }, [state]);

  return <div className="win">Winner is :{winner} </div>;
}
export default Winner;
