import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API_URL = "https://mernback-lfb9.onrender.com/todos";

  // Fetch Todos
  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (text.trim()) {
      const response = await axios.post(API_URL, { text });
      setTodos([...todos, response.data]);
      setText("");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.header}>Todo List</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your todo..."
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.addButton}>
            Add
          </button>
        </div>

        <ul style={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo._id} style={styles.todoItem}>
              <span style={styles.todoText}>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage:
      "url('https://img.freepik.com/premium-photo/happy-cartoon-character-runs-yellow-background_14117-722191.jpg?w=1380')", // Replace with your preferred image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)", // Adds blur to the container background
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "70%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  todoList: {
    listStyleType: "none",
    padding: "0",
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  todoText: {
    fontSize: "1rem",
    color: "#555",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "0.9rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default TodoApp;
