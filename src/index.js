import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfnVefXW1JQd23beA7PCjtCRYLyN4LBVk",
  authDomain: "space-chat-40757.firebaseapp.com",
  databaseURL: "https://space-chat-40757-default-rtdb.firebaseio.com",
  projectId: "space-chat-40757",
  storageBucket: "space-chat-40757.appspot.com",
  messagingSenderId: "977687407316",
  appId: "1:977687407316:web:6b93a48659588840b36941"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
