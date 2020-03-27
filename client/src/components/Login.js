import React, { useState } from 'react';
 import axios from 'axios' 

const Login = (props) => {

  const [login, setLogin] = useState({username: '', password:''})

  const changeHandler = (event) => {
    const { name, value } = event.target
    setLogin({
        ...login, 
        [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("within handleSubmit", login);
    axios.post('http://localhost:4000/api/login', login)
      .then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.payload)
          props.history.push('/bubblepage')
      })
      .catch(err => console.log("error in POST LOGIN", err.response))


    setLogin({username: "", password: ""})
  };

  return (
    <div className="login">
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <input
            className="name"
            placeholder="enter username"
            type="text"
            value={login.username}
            name="username"
            onChange={changeHandler}
          />
        <input
            className="password"
            placeholder="enter password"
            type="password"
            value={login.password}
            name="password"
            onChange={changeHandler}
          />
        <button type="submit" className="SubmitButton">Connect!</button>
      </form>
    </div>
  )
}

export default Login;
