import React from "react";

const TaskType = ({ count, label, currentLabel, handleBtnValue }) => {
  return (
    <button
      className={`type text-sm flex flex-col justify-center items-center w-32 h-20 outline-none ${currentLabel === label ? 'bg-blue-50 text-primary' : 'hover:bg-gray-50'}`}
      onClick={(e) => handleBtnValue(e, label)}
    >
      <span className="text-base mb-0.5">{count}</span>
      <p>{label}</p>
    </button>
  );
};

export default TaskType;
