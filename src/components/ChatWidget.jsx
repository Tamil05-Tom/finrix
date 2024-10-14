import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import '../App.css'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // State to track if it's closing
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    if (isOpen) {
      // Trigger close animation
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false); // Reset after close animation completes
      }, 300); // Duration matches the animation time
    } else {
      // Open the chat
      setIsOpen(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate a bot response
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          { text: "Thanks for your message! An agent will respond shortly.", sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-10 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && !isClosing && (
        <button
          onClick={toggleChat}
          className="bg-[#656ce1] text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Box with Open and Close Animation */}
      {(isOpen || isClosing) && (
        <div
          className={`bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col transition-transform transform ${
            isOpen && !isClosing
              ? 'scale-100 origin-bottom-right animate-chat-open'
              : 'scale-0 origin-bottom-right animate-chat-close'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">FinRix</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? 'text-right' : 'text-left'}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input for Sending Messages */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 text-black focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
