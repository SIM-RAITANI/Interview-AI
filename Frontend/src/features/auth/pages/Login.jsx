// import React from 'react'
// import { useState } from 'react'
// import { Link , useNavigate} from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
// import "../auth.form.scss"

// const Login = () => {

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const navigate = useNavigate()
//     const {loading, handleLogin} = useAuth()

//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         handleLogin({email, password})
//         navigate("/")
//     }

//     if (loading){
//         return <p>Loading...</p>
//     }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => { setEmail(e.target.value) }}
//                             type="email" id="email" name='email' placeholder='Enter email address' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => { setPassword(e.target.value) }}
//                             type="password" id="password" name='password' placeholder='Enter password' />
//                     </div>
//                     <button className='button primary-button' >Login</button>
//                 </form>
//                 <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
//             </div>
//         </main>
//     )

// }

// export default Login

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";
import toast from "react-hot-toast";

// Inline SVG icons (no extra dependency)
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="11" width="14" height="11" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
        await handleLogin({ email, password });
        navigate("/");
    } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
    }
   
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="form-container">
        <p className="form-eyebrow">Welcome back</p>
        <h1>
          Sign <span>In</span>
        </h1>
        <div className="form-divider" />

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button className="button primary-button">Login</button>
        </form>

        <p className="form-footer">
          Don't have an account?&nbsp;<Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
