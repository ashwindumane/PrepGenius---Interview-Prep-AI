import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/');
  };

  // Generate initials like "JD" from "John Doe"
  const getInitials = (name) => {
    if (!name) return 'U'; // fallback: Unknown User
    const names = name.trim().split(' ');
    const initials = names.map((n) => n[0].toUpperCase()).slice(0, 2).join('');
    return initials || 'U';
  };

  return user ? (
    <div className="flex items-center gap-3">
      {/* Circle with initials */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
        {getInitials(user.name)}
      </div>

      <div className="text-right">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-1 max-w-[120px]">
          {user?.name || 'Guest User'}
        </h2>
        <button
          onClick={handleLogout}
          className="text-xs text-red-500 hover:text-red-700 mt-1"
        >
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default ProfileInfoCard;
