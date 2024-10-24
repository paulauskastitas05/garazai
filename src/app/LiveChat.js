'use client';

import { useState } from 'react';

export default function LiveChat() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]); // State for chat messages
  const [inputValue, setInputValue] = useState(''); // State for input value

  // Function to toggle minimized state
  const toggleChat = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue(''); // Clear input after sending
    }
  };

  return (
    <div style={{
      backgroundColor: 'lightblue',
      width: '300px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chat Header */}
      <div 
        style={{
          backgroundColor: '#003366',
          color: 'black',
          padding: '10px',
          cursor: 'pointer'
        }} 
        onClick={toggleChat}  // Toggle chat when clicking the header
      >
        <h3 style={{ margin: 0  }}>{isMinimized ? 'Chat' : 'Chat'}</h3>
      </div>

      {/* Conditionally Render the Chat Content */}
      {!isMinimized && (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '150px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}>
            {/* Render messages */}
            {messages.map((msg, index) => (
              <div key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
                {msg}
              </div>
            ))}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Rašyti"
              style={{ flex: 1, padding: '5px', marginRight: '5px' }}
            />
            <button type="submit" style={{ padding: '5px' }}>Siūsti</button>
          </form>
        </div>
      )}
    </div>
  );
}
