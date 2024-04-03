import React, { useState} from "react";
import * as CryptoJS from 'crypto-js';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  
  const handleInputChange = (e) => {
      setMessage(e.target.value);
      setEncryptedMessage(e.target.value);
  };

  const handleEncryption = () => {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    setEncryptedMessage(ciphertext);
  };

  const handleDecryption = () => {
      if (encryptedMessage) {
          try {
              const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
              const plaintext = bytes.toString(CryptoJS.enc.Utf8);
              setDecryptedMessage(plaintext);
          } catch (error) {
              console.error('Decryption Error:', error);
              setDecryptedMessage('Decryption failed. Check your key.');
          }
      }
  };

  return (
      <div className="container">
          <h1>Message Encryption</h1>

          <input
              type="text"
              placeholder="Enter your message or encrypted text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />

          <input
              type="password"
              placeholder="Enter your secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
          />

          <button onClick={handleEncryption}>Encrypt</button>
          <button onClick={handleDecryption} disabled={!encryptedMessage}>Decrypt</button>

          <h3>Encrypted Message</h3>
          <p>{encryptedMessage}</p>

          <h3>Decrypted Message</h3>

          <input
              type="text"
              placeholder="Decrypted message will appear here"
              value={decryptedMessage}
              disabled // The input is read-only
              onChange={(e) => setDecryptedMessage(e.target.value)}
          />
      </div>
  );
}

export default App;