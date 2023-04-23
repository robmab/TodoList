import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//create your first component

export const TodoList = () => {
  const [close, setClose] = useState(false);

  const [value, setValue] = useState("");

  const [lis, setLis] = useState([]);

  /* FETCH */
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab")
      .then((r) => {
        if (!r.ok) throw Error(r);
        return r.json();
      })
      .then((data) => setLis(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(lis);

  const updateFetch = (arr, meth) => {
    if (arr.length < 1 && meth === "delete") {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab", {
        method: "DELETE",
      })
        .then((r) => {
          if (!r.ok) throw Error(r);
        })
        .catch((error) => console.log(error));
      return;
    }

    if (arr.length == 1 && meth === "add") {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab", {
        method: "POST",
        body: JSON.stringify(arr),
        headers: {
          "Content-Type": "application/json",
        }
          .then((r) => {
            if (!r.ok) throw Error(r);
          })
          .catch((error) => console.log(error)),
      });

      fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab", {
        method: "PUT",
        body: JSON.stringify([
          { a: "", b: "" },
          { a: "", b: "" },
        ]),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          if (!r.ok) throw Error(r);
        })
        .catch((error) => console.log(error));
    }

    fetch("https://assets.breatheco.de/apis/fake/todos/user/robmab", {
      method: "PUT",
      body: JSON.stringify(arr),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r);
      })
      .catch((error) => console.log(error));
  };
  /* FETCH END*/

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") return;

      let addTask = [{ label: e.target.value, done: false }, ...lis];
      setLis(addTask); //like push method
      updateFetch(addTask, "add");

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
                onMouseEnter={() => setClose(i)} //like hover { display:none}
                onMouseLeave={() => setClose(false)}
              >
                <li>{x.label}</li>
                <a
                  onClick={() => {
                    let deleteTask = lis.filter((_, y) => i != y);

                    setLis(deleteTask);
                    updateFetch(deleteTask, "delete");
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
