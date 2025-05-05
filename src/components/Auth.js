import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import css from '../css/Auth.module.css';
import Alert from './Alert';

import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setViewAlert(false);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        showAlert('Registration Successful!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        showAlert('Login Successful!');
      }
    } catch (err) {
      showAlert(err.message, true);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    showAlert('Logout Successful!');
  };

  const showAlert = (message, isError = false) => {
    setAlertMessage(message);
    setViewAlert(true);
    setTimeout(() => {
      setViewAlert(false);
    }, 3000);
  };

  return (
    <>
      <Alert show={viewAlert} type="success" message={alertMessage} />
      <div className={css['auth-container']}>
        {user ? (
          <div className={css['welcome']}>
            <h2>Welcome {user.email}!</h2>
            <a className="welcome" href="/Home">
              <h2>Enjoy Our Service 🏘</h2>
            </a>
            <br />
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
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

            <button type="submit" disabled={loading}>
              {loading ? (
                <div className={css.spinner}></div>
              ) : isRegistering ? (
                <>
                  <FaUserPlus /> Register
                </>
              ) : (
                <>
                  <FaSignInAlt /> Login
                </>
              )}
            </button>

            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Auth;
