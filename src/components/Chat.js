import React, { useState, useEffect } from 'react';
import socket from '../socket';
import Message from './Message';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Écouter les nouveaux messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Nettoyer l'écouteur d'événements
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && username) {
      socket.emit('chat message', { username, text: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Chat React + Socket.IO</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        {messages.map((msg, index) => (
          <Message key={index} username={msg.username} text={msg.text} />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;