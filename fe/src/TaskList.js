// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:8080/api/tasks', {
        title: newTask,
        completed: false,
      });

      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, { completed });
      const updatedTasks = tasks.map((task) => (task.id === id ? response.data : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">ToDo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item ${task.completed ? 'text-decoration-line-through' : ''}`}
          >
            <span>{task.title}</span>
            <input
              type="checkbox"
              className="form-check-input mx-3"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, e.target.checked)}
            />
            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
