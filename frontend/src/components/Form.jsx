import { useState, useEffect } from "react";
import "./Form.css";
import google from "../assets/google-icon-logo-svgrepo-com.svg";
import { NavLink } from "react-router-dom"; 

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../redux/features/userApiSlice.js";
import { setCredentials } from "../redux/features/authSlice.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation(); 
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/Home');
    }
  }, [navigate, userInfo]);

  // LOGIN
  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const RegisterHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } catch (err) {
      console.error("Register Error:", err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div id="welcomeForm" className="card-container mt-5">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Required */}
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front shadow">
          <h5 className="mt-3">Welcome Back!</h5>
          <h6>Sign In</h6>
          <input className="m-3 p-2" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="mb-1 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div id="forgotPassword" className="form-text m-2 pb-1 px-1">
            Forgot your password?
            <NavLink to={"/ResetPassword"}>
              <span> Click here</span>
            </NavLink>
          </div>
          <button type="submit" onClick={LoginHandler}>Login</button>

          <p className="mt-2 p-0 mb-0">Or Sign Up Using</p>
          <div className="d-flex justify-content-center align-items-center w-100 m-0 p-0">
            <img className="appIcon p-2" src={google} alt="Google icon" />
          </div>
          <p className="mt-2">Don't have an account? <span onClick={() => setIsFlipped(true)}>Sign Up</span></p>
        </div>

        <div className="card-back shadow">
          <h5 className="mt-3">Welcome!</h5>
          <h6>Sign Up</h6>
          <input className="m-3 p-2" type="text" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="mb-3 p-2" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="mb-3 p-2" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="mb-1 p-2" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div id="passwordHelpBlock" className="form-text m-2 ps-3">
            Your password must be 6-12 characters long, contain letters and numbers, and must not contain spaces or special characters.
          </div>
          <button type="submit" onClick={RegisterHandler}>Register</button>
          <p className="mt-2">Already have an account? <span onClick={() => setIsFlipped(false)}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
}

export default Form;
