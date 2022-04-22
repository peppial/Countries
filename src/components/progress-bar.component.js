import React from "react";

const getCompleted = (completed) => {
  if (completed === 0) return "Progress:";
  return `Progress: ${completed > 100 ? 100 : completed}%`;
};

function ProgressBar({ completed }) {
  return (
    <div>
      <div>
        <h4>{getCompleted(completed)}</h4>
      </div>
    </div>
  );
}

export default ProgressBar;