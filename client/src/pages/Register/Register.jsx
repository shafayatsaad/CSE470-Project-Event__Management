import {FaRegUser,FaLock,FaMailBulk   } from 'react-icons/fa'
import { useState } from 'react';
import './Register.css';

function Registration() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setForm({});
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className='container'>
      <div className='box'>
        <h1>Register</h1>
        <form onSubmit={handleRegister} className='form'>
          <div className='form-group'>
            <FaRegUser className='icons'/>
            <p>Username: </p>
            <input type='text' name='username' onChange={handleFormChange} value={form.username || ''} required />
          </div>
          <div className='form-group'>
            <FaMailBulk className='icons'/>
            <p>Email: </p>
            <input type='email' name='email' onChange={handleFormChange} value={form.email || ''} required />
          </div>
          <div className='form-group'>
            <FaLock className='icons'/>
            <p>Password: </p>
            <input type='password' name='password' onChange={handleFormChange} value={form.password || ''} required />
          </div>
          <button type='submit'>Register</button>
        </form>
        {message && <p className='message'>{message}</p>}
      </div>
    </div>
  );
}

export default Registration;
