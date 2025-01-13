import React, { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [taskHistory, setTaskHistory] = useState(false); // Tracks if tasks were ever added
  const [btnClassName, setBtnClassName] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  // Get current date in 'YYYY-MM-DD' format
  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Load tasks for the selected date from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
    setTasks(savedTasks);
    setTaskHistory(savedTasks.length > 0);
  }, [selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBtnClassName(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  const handleAddTask = () => {
    if (inputValue.length === 0) {
      setBtnClassName(true);
      return;
    }
    setBtnClassName(false);
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      // Add new task to current day's tasks
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTaskHistory(true);
      setInputValue("");

      // Save the tasks for the selected date in localStorage
      localStorage.setItem(selectedDate, JSON.stringify(updatedTasks));
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(selectedDate, JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(selectedDate, JSON.stringify(updatedTasks));
  };

  const handleSave = () => {
    localStorage.setItem(selectedDate, JSON.stringify(tasks));
    alert("Tasks saved successfully!");
  };

  return (
    <div className="app">
      <div className="current-date">
        {selectedDate}
      </div>

      {/* Date Picker (Calendar) */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your task here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          className={`${btnClassName ? "overlapBtn" : ""}`}
        >
          ADD
        </button>
      </div>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-task-message">
            {taskHistory ? "All tasks completed" : "No task yet!"}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleTaskStatus={toggleTaskStatus}
              removeTask={removeTask}
            />
          ))
        )}
      </div>
      <div className="save-button">
        <button onClick={handleSave} style={{ padding: "10px 20px" }}>
          Save Tasks
        </button>
      </div>
    </div>
  );
}

export default App;
