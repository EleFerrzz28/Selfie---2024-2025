import { useState } from "react";
import "./Form.css"; 

function Form() {
    const [isFlipped, setIsFlipped] = useState(false);
    const togglePass = () => {
        return 1;
    }

    return (
        <div id="welcomeForm" className="card-container mt-5">
            <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
                <div className="card-front">
                    <h5 className="mt-3">Welcome Back!</h5>
                    <h6>Sign In</h6>
                    <input className="m-3 p-2" type="text" placeholder="Username" />
                    <input className="mb-1 p-2" type="password" placeholder="Password" />
                        
                    <div id="forgotPassword" className="form-text m-2 pb-1 px-1">
                        Forgot your password? <span>Click here</span>
                    </div>
                    <button>Login</button>
                    <p className="mt-2">Don't have an account? <span onClick={() => setIsFlipped(true)}>Sign Up</span></p>
                </div>

                <div className="card-back">
                    <h5 className="mt-3">Welcome!</h5>
                    <h6>Sign Up</h6>
                    <input className="m-3 p-2" type="text" placeholder="Username" />
                    <input className="mb-3 p-2" type="email" placeholder="Email" />
                    <input className="mb-1 p-2" type="password" placeholder="Password" />
                    <div id="passwordHelpBlock" className="form-text m-2 px-1">
                        Your password must be 6-12 characters long, contain letters and numbers, and must not contain spaces or special characters.
                    </div>
                    <button>Register</button>
                    <p className="mt-2">Already have an account? <span onClick={() => setIsFlipped(false)}>Sign In</span></p>
                </div>
            </div>
        </div>
    );
}

export default Form;
