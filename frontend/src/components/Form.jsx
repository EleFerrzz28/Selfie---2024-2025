import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../redux/features/userApiSlice.js";
import { setCredentials } from "../redux/features/authSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { ReactComponent as LoginPic } from "../assets/login.svg";
import { ReactComponent as SignUpPic } from "../assets/sign-up.svg";

import "./Form.css";
import "react-toastify/dist/ReactToastify.css";


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



  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      sessionStorage.setItem("justLoggedIn", "true");
      toast.success("Login successful!");
      setTimeout(() => navigate("/Home"), 1000);
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };


  const RegisterHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      sessionStorage.setItem("justLoggedIn", "true");
      toast.success("Registration successful!");
      setTimeout(() => navigate("/Home"), 1000);
    } catch (err) {
      console.error("Register Error:", err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };




  return (
    <div id="welcomeForm" className="card-container mt-lg-5">
      <ToastContainer position="top-right" autoClose={3000} /> 
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>

        <div className="card-front shadow mt-5 m-lg-0">
          <div className="ms-4">
          <LoginPic className='login-pic' />
          </div>
          <div className="card-content"> 
          <h5 className="mt-3">Welcome Back!</h5>
          <h6>Sign In</h6>
          <input className="m-3 p-2" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="mb-1 p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='mt-3 formButtons' type="submit" onClick={LoginHandler}>Login</button>
          <p className="mt-2">Don't have an account? <span onClick={() => setIsFlipped(true)}>Sign Up</span></p>
        </div>
        </div>

        <div className="card-back shadow mt-3 m-lg-0">
          <div className="ms-4"> 
          <SignUpPic className='signUpPic'/>
          <h5 className="mt-3">Welcome!</h5>
          <h6>Sign Up</h6>
          </div>
          <div className="card-content"> 
          <input className="m-3 p-2" type="text" placeholder="Enter Username" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="mb-3 p-2" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="mb-3 p-2" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="mb-1 p-2" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div id="passwordHelpBlock" className="form-text m-2 ps-3">
            Your password must be 6-12 characters long, contain letters and numbers, and must not contain spaces or special characters.
          </div>       
          <button className="formButtons" type="submit" onClick={RegisterHandler}>Register</button>
          <p className="mt-2">Already have an account? <span onClick={() => setIsFlipped(false)}>Sign In</span></p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
