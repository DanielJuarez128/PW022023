import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (title) {
            try {
                const response = await axios.post('http://localhost:5000/api/tasks', { title });
                setTasks(prevTasks => [...prevTasks, response.data]); // Actualiza el estado directamente
                setTitle(''); // Limpia el input
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            // Actualiza el estado usando el estado anterior
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Carga las tareas al iniciar
    }, []);

    return (
        <Router>
            <div className="container">
                <h1>To-Do List</h1>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <button onClick={addTask}>Add</button>
                </div>
                <Routes>
                    <Route path="/" element={
                        <ul>
                            {tasks.map(task => (
                                <li key={task._id}>
                                    {task.title}
                                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
