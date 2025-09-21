import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../redux/features/userApiSlice.js';
import { setCredentials } from '../redux/features/authSlice.js';
import './UpdateProfile.css'

const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.name]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                console.log(res);
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (
        <div className='updateProfile rounded p-3 mt-4 mb-4'>
            <h3>Update your Profile </h3>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-lg-4 mt-3 mb-3 m-lg-0 d-flex align-items-center justify-content-center'>
                        <img className="avatar-image" src="https://www.famousbirthdays.com/faces/zagato-gianmarco-image.jpg" />
                    </div>
                    <div className='col-12 fields-container col-lg-8 d-flex flex-column'>
                        <p> username </p>
                        <input className="mb-3 p-2"
                            type="text" placeholder="Enter Username"
                            value={name} onChange={(e) => setName(e.target.value)} />
                        <p> email </p>
                        <input className="mb-3 p-2"
                            type="text" placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p> password </p>
                        <input className="mb-3 p-2"
                            type="password"
                            placeholder="Enter Password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className="mb-1 p-2"
                            type="password" placeholder="Confirm Password"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type='submit'
                            onClick={submitHandler}
                            className='btn btn-secondary mt-3 mb-4'> Update </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UpdateProfile;