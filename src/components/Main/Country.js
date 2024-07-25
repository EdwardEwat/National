import React from "react";

const Country = (props) => {
  return (
    <div className="flex items-center border-b border-solid border-black">
      <div
        className="cursor-pointer hover:text-red-400"
        onClick={props.onClick}
      >
        {props.children}
      </div>
      <div
        className={` ${
          props.acceptUpdate
            ? "visible border-black border-solid border-l-2 pl-2"
            : "invisible"
        } ml-auto `}
      >
        <div className="cursor-pointer text-red-400">
          <i className="bi bi-trash3" onClick={props.onDelete}></i>
        </div>
      </div>
    </div>
  );
};

export default Country;
