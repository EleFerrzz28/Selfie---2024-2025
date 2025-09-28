import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/features/userApiSlice.js';
import { logout } from '../redux/features/authSlice.js';
import UpdateProfile from '../components/SettingsComponents/UpdateProfile.jsx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SettingsPage.css';


function Settings() {
    const options = [
        {
            header: { name: "Account" },
            values: [
                {
                    name: "Profile",
                    description: "Your email address is your identity on this app and is used to log in.",
                    tags: ["email", "username", "first name", "last name"],
                },
                {
                    name: "Security",
                    description: "Want to change your personal data? Then use the modal above.",
                    tags: ["check your account", "change email", "change password"],
                },
            ],
        },
        {
            header: { name: "Time Machine" },
            values: [
                {
                    name: "info",
                    description: "Use the Time Machine to change the current day.",
                    tags: ["date and weather", "synchronize"],
                },
            ],
        },
        {
            header: { name: "Support" },
            values: [
                {
                    name: "Help",
                    description: "Having trouble? Contact us on selfie_studio@iper.com",
                    tags: [],
                },
                {
                    name: "FAQ",
                    description: "View our frequently asked questions.",
                    questions: "How do I logout? Just click the button on this page whenever you want to disconnect your personal account",
                    tags: [],
                },
            ],
        },
    ];

    const [visibleOptions, setVisibleOptions] = useState(options);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const supabase = useSupabaseClient();


    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);



    async function GooglesignOut() {
        await supabase.auth.signOut();
    }


    const logoutHandler = async () => {
        try {
            await GooglesignOut();
            await logoutApiCall().unwrap();
            dispatch(logout());
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value;

        if (value.trim().length === 0) {
            setVisibleOptions(options);
            return;
        }

        const returnedItems = [];

        options.forEach((option, index) => {
            const foundOptions = option.values.filter(item =>
                item.name.toLowerCase().includes(value.trim().toLowerCase()) ||
                item.description.toLowerCase().includes(value.trim().toLowerCase())
            );

            returnedItems[index] = {
                header: { name: option.header.name },
                values: foundOptions
            };

            if (option.header.name.toLowerCase().includes(value.trim().toLowerCase())) {
                returnedItems[index] = {
                    header: { name: option.header.name },
                    values: option.values
                };
            }
        });

        setVisibleOptions(returnedItems);
    };


    const handleGoogleConnection = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user?.app_metadata?.provider === "google") {
            toast.info("Sei già connesso con Google");
            return;
        }
        await googleSignIn();
    };



    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { scopes: 'https://www.googleapis.com/auth/calendar' }
        });
        if (error) {
            toast.error("Google Calendar connection failed");
            console.log(error);
        }
    }

    if (!userInfo) return null;

    return (
        <div className='Settings'>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className='container my-5'>
                <h1>
                    <span style={{
                        color: 'var(--white)',
                        fontWeight: '600'
                    }}>
                        <NavLink to={'/Home'}>
                            <button className='btn btn-secondary me-3'>
                                <span>&lt;</span> Back
                            </button>
                        </NavLink>
                        Settings
                    </span>
                </h1>

                <UpdateProfile />
                
                <h2 className='mt-5' style={{ fontWeight: 'bold' }}> About our website </h2>
                <input
                    type='text'
                    className='form-control mt-2'
                    onChange={onChange}
                    placeholder='search...'
                />


                <div className='option-category'>
                    {visibleOptions.map((option) => (
                        <div key={option.header.name} className='options-header mt-5 mt-2'>
                            <h3 style={{ fontWeight: 'bolder' }}>{option.header.name}</h3>
                            <div className='option-value'>
                                {option.values.map((value) => (
                                    <div key={value.name}>
                                        <ul className="list-group list-unstyled">
                                            <li className="list-group-item d-flex flex-column mb-2 p-2">
                                                <h6 style={{ fontWeight: 'bold' }}>{value.name}</h6>
                                                <p>{value.description}</p>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='d-flex flex-column'>
                    <button className="google mt-2"
                        style={{ width: '20rem' }}
                        onClick={handleGoogleConnection}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        <span>Be connected with Google</span>
                    </button>

                    <button className='btn btn-secondary mt-5'
                        type="button"
                        style={{ cursor: "pointer", width: '5rem' }} onClick={logoutHandler}>
                        Logout
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Settings;
