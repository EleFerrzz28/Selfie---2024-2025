import React from 'react';
import './AvatarsShowroom.css';

export const AVATARS = [
  'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922510.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922656.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922688.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922561.png',
  'https://cdn-icons-png.flaticon.com/512/2922/2922604.png',
];


const AvatarsShowroom = ({ isOpen, onClose, onSelect, selected }) => {
  if (!isOpen) return null;

  return (
        <div className="avatars-showroom">
      <div className="avatar-modal">
        <button className="avatar_close-btn" onClick={onClose}>
          <i className='bx  bx-x'></i> 
        </button>
        <h5>Scegli il tuo avatar</h5>
        <div className="avatar-grid">
          {AVATARS.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Avatar ${idx}`}
              className={`avatar-option ${selected === idx ? 'selected' : ''}`}
              onClick={() => {
                onSelect(idx);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AvatarsShowroom;

