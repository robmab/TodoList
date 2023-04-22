import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//create your first component

export const TodoList = () => {
  const [close, setClose] = useState(false);

  const [value, setValue] = useState("");

  const [lis, setLis] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab")
      .then((r) => {
        if (!r.ok) throw Error(r.statusText);
        return r.json();
      })
      .then((data) => {
        setLis(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (update === true) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab", {
      method: "PUT",
      body: JSON.stringify(lis),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r.statusText);
        //debug
        console.log(r.ok);
        console.log(r.status);
        console.log(r.text());
        //debug
        return r.json();
      })
      .then((data) => setLis(data))
      .catch((error) => console.log(error));

    setUpdate(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") return;
      setLis([{ label: e.target.value, done: false }, ...lis]); //like push method
      setUpdate(true);
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
                id={i}
                key={i}
                className="todo-list-col"
                onMouseEnter={() => setClose(i)}
                onMouseLeave={() => setClose(false)}
              >
                <li>{x.label}</li>
                <a
                  onClick={(e) => {
                    console.log(e.target.parentNode.parentNode.id);
                    setLis(
                      lis.filter(
                        (_, i) => e.target.parentNode.parentNode.id != i
                      )
                    );
                    setUpdate(true);
                  }}
                >
                  {close === i ? <FontAwesomeIcon icon={faX} /> : ""}
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
