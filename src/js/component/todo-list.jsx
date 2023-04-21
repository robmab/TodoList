import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//create your first component

export const TodoList = () => {
  const [close, setClose] = useState(false);

  const [value, setValue] = useState("");

  const [lis, setLis] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setLis([e.target.value, ...lis]); //like push method
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(
      e.target.value.charAt(0).toUpperCase() + // Capitalice
        e.target.value.slice(1)
    );
  };

  return (
    <div className="wrapper">
      <h1>todos</h1>
      <div className="todo-list-wrapper">
        <div className="todo-list">
          <div className="todo-list-col">
            <input
              className="prueba"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              placeholder={
                lis.length === 0
                  ? "No tasks, add a task"
                  : "What needs to be done?"
              }
              type="text"
              name=""
              value={value}
            />
          </div>
          <ul>
            {lis.map((x, i) => (
              <div
                a-key={i}
                key={i}
                className="todo-list-col"
                onMouseEnter={() => setClose(i)}
                onMouseLeave={() => setClose(false)}
              >
                <li>{x}</li>
                <a
                  onClick={(e) => {
                    setLis(
                      lis.filter(
                        (_, i) =>
                          Number(e.target.parentNode.getAttribute("a-key")) !==
                          i
                      )
                    );
                  }}
                >
                  {close === i ? (
                    <FontAwesomeIcon icon={faX}  />
                  ) : (
                    ""
                  )}
                </a>
              </div>
            ))}
          </ul>
          <div className="todo-list-footer">
            <p>{lis.length} item left</p>
          </div>
        </div>
        <div className="tda"></div>
        <div className="tdb"></div>
      </div>
    </div>
  );
};
