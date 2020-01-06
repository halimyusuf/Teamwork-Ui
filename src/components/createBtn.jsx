import React from "react";
import { Link } from "react-router-dom";

const CreateBtn = () => {
  return (
    <div className="create-btn">
      <button>
        {" "}
        <Link to="/gif/new">Create Gif</Link>{" "}
      </button>
      <button>
        {" "}
        <Link to="/article/new">Create Article </Link>{" "}
      </button>
    </div>
  );
};

export default CreateBtn;
