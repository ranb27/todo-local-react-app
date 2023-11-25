import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./TodoList.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  // Initialize the state with data from localStorage or an empty array
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return storedTodos;
  });

  useEffect(() => {
    // Update local storage when the todos state changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(todoText) {
    if (!todoText) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter some todo text!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    } else if (todos.some((todo) => todo.text === todoText)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You already have this todo!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Nice!",
        text: "You added a new todo!",
        timer: 1000,
        showConfirmButton: false,
      });
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    // Update the state with the new todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  function removeTodo(todo) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((t) => t.id !== todo.id);
        setTodos(updatedTodos);

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Your todo has been removed.",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  }

  function toggleCompleted(todo) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(updatedTodos);
  }

  function toggleDarkMode() {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);

    const userMode = localStorage.getItem("userMode");

    if (userMode === "dark") {
      // Switch to light mode
      document.body.style.setProperty("--background-color-light", "#ffffff");
      document.body.style.setProperty("--background-color-dark", "#333333");
      document.body.style.setProperty("--text-color-light", "#333333");
      document.body.style.setProperty("--text-color-dark", "#ffffff");
      localStorage.setItem("userMode", "light");
    } else {
      // Switch to dark mode
      document.body.style.setProperty("--background-color-light", "#333333");
      document.body.style.setProperty("--background-color-dark", "#ffffff");
      document.body.style.setProperty("--text-color-light", "#ffffff");
      document.body.style.setProperty("--text-color-dark", "#333333");
      localStorage.setItem("userMode", "dark");
    }
    localStorage.setItem("userMode", isDarkMode ? "light" : "dark");
  }

  // When the application loads, check for user's choice
  useEffect(() => {
    // Get the user's preferred mode from local storage
    const userMode = localStorage.getItem("userMode");

    // Check if it is 'dark' or 'light' mode, and update the UI accordingly
    if (userMode === "dark") {
      // Set isDarkMode to true if it's 'dark' mode
      setIsDarkMode(true);

      // Update the UI for dark mode
      document.body.style.setProperty("--background-color-light", "#333333");
      document.body.style.setProperty("--background-color-dark", "#ffffff");
      document.body.style.setProperty("--text-color-light", "#ffffff");
      document.body.style.setProperty("--text-color-dark", "#333333");
    } else {
      // Set isDarkMode to false if it's 'light' mode
      setIsDarkMode(false);

      // Update the UI for light mode
      document.body.style.setProperty("--background-color-light", "#ffffff");
      document.body.style.setProperty("--background-color-dark", "#333333");
      document.body.style.setProperty("--text-color-light", "#333333");
      document.body.style.setProperty("--text-color-dark", "#ffffff");
    }
  }, []);

  function renderTodos() {
    return todos.map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        toggleCompleted={toggleCompleted}
      />
    ));
  }

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const userMode = localStorage.getItem("userMode");
    return userMode === "dark";
  });

  return (
    <React.Fragment>
      <div className="mx-auto">
        <button
          className="btn btn-neutral text-xl z-50 rounded-xl"
          onClick={toggleDarkMode}
          style={{
            backgroundColor: "var(--background-color-light)",
            color: "var(--text-color-light)",
            position: "absolute",
            right: 0,
            marginRight: "1rem",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <span>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </span>
        </button>
        <div className="mx-auto my-4 w-90">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 drop-shadow-lg animate-fade">
              Todo List
            </h1>
          </div>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const todoText = e.target.elements.todo.value;
              addTodo(todoText);
              e.target.reset();
            }}
          >
            <div className="mb-4 animate-fade flex gap-2 mt-4">
              <input
                type="text"
                name="todo"
                placeholder="Add some todo here..."
                className="border font-semibold rounded-2xl py-2 px-4 outline-none focus:shadow-outline text-xl w-full"
                style={{
                  backgroundColor: "var(--background-color-light)",
                  color: "var(--text-color-light)",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                  outline: "none",
                  border: "none",
                }}
              />

              <button
                type="submit"
                className="btn btn-ghost text-lg rounded-2xl font-bold w-auto"
                style={{
                  backgroundColor: "var(--background-color-light)",
                  color: "var(--text-color-light)",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                Add
              </button>
            </div>
          </form>
          {renderTodos()}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-center items-center mb-2">
        <p className="text-sky-500 animate-delay font-semibold drop-shadow-md whitespace-nowrap">
          To-do via React + Tailwind{" "}
          <span className="text-amber-500">// sinb27</span>
        </p>
      </footer>
    </React.Fragment>
  );
}

import PropTypes from "prop-types";

function Todo({ todo, removeTodo, toggleCompleted }) {
  const textClass = todo.text.length > 30 ? "break-all" : "";

  return (
    <div className="flex items-center mb-4 mx-1 animate-delay">
      <div
        className={`flex-1 text-xl drop-shadow-md font-semibold ${textClass} ${
          todo.completed ? "line-through text-yellow-500" : ""
        }`}
      >
        {todo.text}
      </div>

      <button
        onClick={() => toggleCompleted(todo)}
        className={todo.completed ? "completed-button" : "uncompleted-button"}
      >
        {todo.completed ? "<-" : "O"}
      </button>
      <button
        onClick={() => removeTodo(todo)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-8"
        style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}
      >
        X
      </button>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
};

export default TodoList;
