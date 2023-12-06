import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link to="/result">Result</Link>
        </a>
      </div>
    </>
  );
};

export default Navbar;
