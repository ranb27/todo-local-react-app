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
      });
      return;
    } else if (todos.some((todo) => todo.text === todoText)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You already have this todo!",
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Nice!",
        text: "You added a new todo!",
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

        Swal.fire("Removed!", "Your todo has been removed.", "success");
      }
    });
  }

  function toggleCompleted(todo) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${todo.completed ? "undo" : "complete"} this todo?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${todo.completed ? "undo" : "complete"} it!`,
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.map((t) => {
          if (t.id === todo.id) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });
        setTodos(updatedTodos);

        Swal.fire(
          "Completed!",
          `Your todo has been ${todo.completed ? "undone" : "completed"}.`,
          "success"
        );
      }
    });
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
      <div className="mx-4">
        <button
          className="btn btn-neutral w-50 text-xl mt-5"
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
        <div className="max-w-lg mx-auto pt-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold mb-4">Todo List</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const todoText = e.target.elements.todo.value;
              addTodo(todoText);
              e.target.reset();
            }}
          >
            <div className="flex mb-4">
              <input
                type="text"
                name="todo"
                placeholder="Add some todo here..."
                className="flex-1 border rounded py-2 px-4 mr-2 outline-none focus:shadow-outline "
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
                className="btn btn-ghost w-24 text-xl"
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
          <footer className="fixed bottom-0 w-full flex justify-center pb-5 max-w-lg mx-auto">
            <p className="text-sky-500">To-do list via React // by sinb27</p>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

import PropTypes from "prop-types";

function Todo({ todo, removeTodo, toggleCompleted }) {
  const textClass = todo.text.length > 50 ? "break-all" : "";

  return (
    <div className="flex items-center mb-4 ">
      <div
        className={`flex-1 text-xl ${textClass} ${
          todo.completed ? "line-through text-yellow-500" : ""
        }`}
      >
        {todo.text}
      </div>
      <button
        onClick={() => removeTodo(todo)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-5"
        style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}
      >
        X
      </button>
      <button
        onClick={() => toggleCompleted(todo)}
        className={todo.completed ? "completed-button" : "uncompleted-button"}
      >
        {todo.completed ? "<-" : "O"}
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
