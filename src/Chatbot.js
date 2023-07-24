import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import api from './api';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      setMessages([...messages, { text: userInput, type: 'user' }]);
      const botResponse = await api(userInput);
      setMessages([...messages, { text: botResponse, type: 'bot' }]);
      setUserInput('');
    }
  };
  

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Container className="chatbot-container">
      <div className="chatbot">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <Form onSubmit={handleMessageSubmit}>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Chatbot;
