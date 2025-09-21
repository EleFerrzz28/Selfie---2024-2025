import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/features/userApiSlice.js';
import { logout } from '../redux/features/authSlice.js';
import ThemeToggler from '../components/Theme';
import { toggleDarkMode } from '../redux/features/themeSlice';
import UpdateProfile from '../components/UpdateProfile.jsx';
import './SettingsPage.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {

    const options = [
        {
            header: { name: "Account" },
            values: [
                {
                    name: "Profile",
                    description: "Your email address is your identity on this app and is used to log in.",
                    tags: ["email", "username", "first name", "last name", "date of birth"],
                },
                {
                    name: "Security",
                    description: "Want to reset your password? Then Logout then click on the 'reset password' link",
                    tags: ["verify your account", "change email", "change password"],
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
    const { mode } = useSelector((state) => state.theme);
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall] = useLogoutMutation();

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            toast.success('Logout successful');
        } catch (err) {
            console.error(err);
            toast.error('Logout failed');
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

    if (!userInfo) return null;

    return (
        <div className='Settings' data-theme={mode ? "dark" : "light"}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className='container my-5'>
                <h1>
                    <span>
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

                <ThemeToggler
                    isChecked={mode}
                    handleChange={() => dispatch(toggleDarkMode())}
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

                <button className='btn btn-secondary mt-3 mb-2' type="button" style={{ cursor: "pointer" }} onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Settings;
