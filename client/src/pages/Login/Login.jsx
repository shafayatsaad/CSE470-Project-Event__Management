import './Login.css';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {FaRegUser,FaLock  } from 'react-icons/fa'

function Login() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    setCookies("access_token", data.token);
    window.localStorage.setItem("userID", data.userID); 
    window.localStorage.setItem("username", data.username);

    if (response.ok) {
      setMessage(data.message);
      setForm({});
      navigate("/");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className='container'>
      <div className='box'>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className='form'>
          <div className='form-group'>
            <FaRegUser className='username-icon'/>
            <p>Username: </p>
            <input type='text' name='username' onChange={handleFormChange} value={form.username || ''} required />
          </div>
          <div className='form-group'>
            <FaLock className='password-icon'/>
            <p>Password: </p>
            <input type='password' name='password' onChange={handleFormChange} value={form.password || ''} required />
          </div>
          <button type='submit' className='button'>Login</button>
        </form>
        {message && <p className='message'>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
