import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Form.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';
const Form = ({ route, method }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/');
      } else {
        //if its register we dont have to set tokens, we have to login first
        navigate('/login');
      }
    } catch (e) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  //alternative onChange for mulitple form elements
  // const onChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input
          type='text'
          className='form-input'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Username'
        />
        <input
          type='password'
          className='form-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {loading && <LoadingIndicator />}
        <button type='submit'>{name}</button>
      </form>
    </>
  );
};

export default Form;
