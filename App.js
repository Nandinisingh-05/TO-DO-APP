import React,{useState, useEffect} from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import "./index.js"


function App() {

  const [task, settask] = useState([]);

  const [newtask, setnewtask] = useState("");

  const [ duedate, setduedate] = useState("");

  const [search, setsearch] = useState("");

  const [darkmode, setdarkmode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      settask(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (newtask.trim() === "" ) return;
    const  newtaskobj = {
      id : Date.now(),
      Text : newtask,   
      duedate : duedate,
      completed : false
    };

    settask([...task, newtaskobj]);
    setnewtask("");
    setduedate(""); 
  };

  const toggleComplete = (id) => {
    settask(
      task.map((t) =>
      t.id === id ? { ...t, completed: !t.completed} : t)
    );
  };

  const deletetask = (id) => {
    settask(task.filter((task) => task.id !== id));
  };
  const editTask = (id) => {
    const newtext = prompt("Edit your task:");
    if (newtext) {
      settask(  
        task.map((task) =>
          task.id === id ? { ...task, Text: newtext } : task
        )
      );
    };
  };
  const filteredTasks = task.filter((task) =>
    task.Text.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <div className={darkmode ? "app dark-mode" : "app"}>
      <h1>To-Do App</h1>

      <button onClick={setdarkmode}>🌙 Dark Mode</button>
    <div className="input-area">
      <input
        type="text"
        placeholder="enter your task"
        value={newtask}
        onChange={(e) => setnewtask(e.target.value)}
      />
      <input
        type="date"
        value={duedate}
        onChange={(e) => setduedate(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      {task.map((task) => (
        <TodoItem
        key={task.id}
        task={task}
        toggleComplete={toggleComplete}
        deleteTask={deletetask}
        />
      ))}

    </div>
    <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="search"
      />
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span >
              {task.text}{" "}
              <small>{task.due ? `(Due: ${task.due})` : ""}</small>
            </span>
            <div>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? "Undo" : "complete"}
              </button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deletetask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
    

};
export default App;