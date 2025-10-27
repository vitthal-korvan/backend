import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setConversations([...conversations, { text: message, sender: 'user' }])
      setMessage('')
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>AI-ChatBot</h1>
      </div>
      <div className="chat-messages">
        {conversations.map((conv, index) => (
          <div key={index} className={`message ${conv.sender}`}>
            {conv.text}
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

export default App
