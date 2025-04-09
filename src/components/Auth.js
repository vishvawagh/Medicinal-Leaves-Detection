import React, { useState, useEffect } from 'react';
import { auth } from './firebase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import css from '../css/Auth.module.css';
import Alert from "./Alert";



const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        <Alert show={viewAlert} type="success" message={alertMessage} />
        setViewAlert(true);
        setAlertMessage("Login Successful");
        setTimeout(() => {
        setViewAlert(false);
      }, 3000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        <Alert show={viewAlert} type="success" message={alertMessage} />
        setViewAlert(true);
        setAlertMessage("Login Successful");
        setTimeout(() => {
        setViewAlert(false);
      }, 3000);
       
      }
    } catch (error) {
      setViewAlert(true);
        setAlertMessage(error.message);
        setTimeout(() => {
        setViewAlert(false);
      }, 3000);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    <Alert show={viewAlert} type="success" message={alertMessage} />
    setViewAlert(true);
        setAlertMessage(" Logout Successful");
        setTimeout(() => {
        setViewAlert(false);
      }, 3000);
  };

  return (
    <>
    <Alert show={viewAlert} type="success" message={alertMessage} />
    <div className= {css['auth-container']}>
      {user ? (
        <div className={css['welcome']}>
          <h2> Welcome  {user.email} !!! </h2>
          <a className='welcome' href="/Home"><h2>Enjoy Our Service 🏘 </h2></a>
          <br></br>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className={css['auth-form']} onSubmit={handleSubmit}>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={css['error']}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
          </button>
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </form>
      )}
    </div>
    </>
  );
};

export default Auth;
