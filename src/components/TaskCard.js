import React, {useState} from "react";

function TaskCard({ task, toggleTaskStatus, removeTask }) {

  const [readMore, setReadMore] = useState(false);
  function readmoreHandler() {
    setReadMore(!readMore);
  }

  return (
    <div className="task-card">
      <div className="task-content">
        <span className={`status-dot ${task.completed ? "completed" : "pending"}`}></span>
        <p className="task-text">
          {readMore ? task.text : task.text.substring(0,20)}
          <span className="readMore" onClick={readmoreHandler}>{((task.text).length<=20) ? '' : readMore ? '. ShowLess' : '....ReadMore'}</span>
        </p>
      </div>
      <div className="task-actions">
        <input
          className={`status-checkbox ${task.completed ? "greenCheck" : ""}`}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskStatus(task.id)}
        />
        <span className={`status-text ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "Task Completed" : "Task Pending"}
        </span>
        {task.completed && (
          <button
            className="remove-task-btn"
            onClick={() => removeTask(task.id)}
          >
            Remove Task
          </button>
        )}  
      </div>
    </div>
  );
}

export default TaskCard;
