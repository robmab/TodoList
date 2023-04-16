import React, { useState } from "react";

//create your first component

export const TodoList = () => {
  const [value, setValue] = useState("");

  const [lis, setLis] = useState([]);

  const handleKeyDown = (e) => {
    let aux;
    if (e.key === "Enter") {
      aux =
        e.target.value.charAt(0).toUpperCase() + // Capitalice
        e.target.value.slice(1).toLowerCase();
      setLis([aux, ...lis]); //like push method
      setValue("");
    }
  };

  const handleChange = (e) => {
    setValue(
      e.target.value.charAt(0).toUpperCase() + // Capitalice
        e.target.value.slice(1).toLowerCase()
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
              <div id={i} className="todo-list-col">
                <li>{x}</li>
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
