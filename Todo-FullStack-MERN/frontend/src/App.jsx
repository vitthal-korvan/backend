// client/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // 1. Fetch data from backend when component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/getItems')
      .then(result => setItems(result.data))
      .catch(err => console.log(err));
  }, []);

  // 2. Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to backend
    axios.post('http://localhost:3001/addItem', { name: input })
      .then(result => {
        // Add the new item to the local list instantly (UI update)
        // result.data contains the new item created by MongoDB
        setItems([...items, result.data]);
        setInput(""); // Clear input field
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Simple MERN List</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Display Data */}
      <ul>
        {items.map((item) => (
          // MongoDB automatically creates a unique '_id' for every document
          <li key={item._id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;