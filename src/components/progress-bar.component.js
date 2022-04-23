import React from "react";


const ProgressBar = ({ completed }) => {

  const getCompleted = (completed) => {
    if (completed === 0) return "Progress:";
    return `Progress: ${completed > 100 ? 100 : completed}%`;
  };

  return (
    <div>
      <div>
        <h4>{getCompleted(completed)}</h4>
      </div>
    </div>
  );
}

export default ProgressBar;