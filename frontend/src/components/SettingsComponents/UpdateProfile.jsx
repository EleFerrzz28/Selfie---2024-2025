import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../redux/features/userApiSlice.js';
import { setCredentials } from '../../redux/features/authSlice.js';
import AvatarsShowroom, { AVATARS } from './AvatarsShowroom.jsx';
import './UpdateProfile.css'



const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(0);
    const [showSelected, setShowSelected] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setAvatar(typeof userInfo.avatar === 'number' ? userInfo.avatar : 0);
    }, [userInfo.email, userInfo.name, userInfo.avatar]);


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
                    avatar,
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
        <div className='updateProfile rounded'>
            <h3 className='mb-4 m-lg-0'>Update your Profile </h3>
            <div className='container-fluid '>
                <div className='row h-100 d-flex align-items-center'>
                    <div className="profile-image col-12 col-lg-4">
                        <img
                            className="avatar-image"
                            src={AVATARS[avatar]}
                            alt="User avatar"/>

                        <button
                            type="button"
                            className="change-avatar__button"
                            onClick={() => setShowSelected(true)}
                        >
                            <i className='bx-sm  bx-pencil' ></i>
                        </button>
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
            <AvatarsShowroom
                isOpen={showSelected}
                onClose={() => setShowSelected(false)}
                onSelect={(idx) => {
                    setAvatar(idx);
                    setShowSelected(false);
                }}
                selected={avatar}/>
        </div>
    );
};

export default UpdateProfile;