import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
//create your first component

export const TodoList = () => {
  const [lis, setLis] = useState([]);
  const url = "https://assets.breatheco.de/apis/fake/todos/user/robmab";
  const [charge, setCharge] = useState(false);

  /* FETCH */
  useEffect(() => {
    //First time Update GET
    fetch(url)
      .then((r) => {
        if (!r.ok) throw Error(r);
        return r.json();
      })
      .then((data) => {
        console.log(data);
        setCharge(true);
        setLis(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateFetch = (arr, meth) => {
    if (arr.length < 1 && meth === "delete") {
      //Delete API when lis < 0
      fetch(url, {
        method: "DELETE",
      })
        .then((r) => {
          if (!r.ok) throw Error(r);
          return r.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));

      return;
    }

    if (arr.length === 1 && meth === "add") {
      // Create API when lis = 1
      fetch(url, {
        method: "POST",
        body: JSON.stringify(arr),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          if (!r.ok) throw Error(r);
          return r.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));

      return;
    }

    fetch(url, {
      //normal LIS update
      method: "PUT",
      body: JSON.stringify(arr),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (!r.ok) throw Error(r);
        return r.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  /* FETCH END*/

  const [close, setClose] = useState(false);

  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") return;

      let addTask = [{ label: e.target.value, done: false }, ...lis]; //like push method
      setLis(addTask);
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
                !charge //Hide placeholder while charging data from API
                  ? ""
                  : lis.length === 0
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
