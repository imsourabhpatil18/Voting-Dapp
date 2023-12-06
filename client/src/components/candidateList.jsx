import { useEffect, useState } from "react";

const CandidateList = ({ state }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const { contract } = state;
    async function candidateDisplay() {
      const candidate = await contract.methods.candidateList().call();
      console.log(candidate);

      setList(candidate);
    }
    contract && candidateDisplay();
  }, [state]);

  return (
    <>
      <table>
        <tbody>
          <h3>CandidateList:</h3>
          {list.map((cList) => {
            return (
              <tr>
                <td>{cList.name}</td>
                <td>{cList.party}</td>
                <td key={cList.candidateId}>{cList.CandidateId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CandidateList;
