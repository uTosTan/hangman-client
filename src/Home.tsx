import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <div>
        <Link to="/host">
          <button>Host</button>
        </Link>
      </div>
      <div>
        <Link to="/join">
          <button>Join</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
