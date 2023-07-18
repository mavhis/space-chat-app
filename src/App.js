import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import './App.css';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setName] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg
    });
    setMsg('');
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendChat();
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setName({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div>
      {user.email ? null : (
        <div>
          <button onClick={googleLogin}>Google SignIn</button>
        </div>
      )}
      {user ? (
        <div>
          <h3>user: {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
                <p className="chatbox">
                  <strong>{c.user.name}:</strong>
                  <span>{c.message}:</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={e => setMsg(e.target.value)}
              value={msg}
              placeholder="enter your chat"
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendChat}>send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
