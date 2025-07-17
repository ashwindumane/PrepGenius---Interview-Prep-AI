import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const SummaryCard = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
  id,
  colors = { bgcolor: '#f0f4ff' },
}) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this session?')) {
      onDelete?.(id);
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={onSelect}
      style={{ height: '100%', width: '100%' }}
    >
      {/* Header color strip */}
      <div
        className="h-2 w-full"
        style={{
          background: colors.bgcolor,
        }}
      ></div>

      <div className="p-4 pb-3">
        {/* Top Row: Role + Delete */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
            {role}
          </span>
          <button
            onClick={handleDeleteClick}
            className="text-red-400 hover:text-white transition-colors p-1 rounded-full hover:bg-red-500 group"
            title="Delete"
          >
            <FiTrash2 
              size={16} 
              className="group-hover:scale-110 transition-transform" 
            />
          </button>
        </div>

        {/* Title and Skills */}
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-800 mb-1">{role}</h2>
          <div className="flex flex-wrap gap-1 mb-2">
            {topicsToFocus.split(',').slice(0, 3).map((topic, index) => (
              <span 
                key={index} 
                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded"
              >
                {topic.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="text-sm text-gray-600 space-y-1.5 mt-2">
          <div className="flex items-center">
            <span className="inline-block w-24 font-medium text-gray-500">Experience:</span>
            <span className="font-medium">{experience}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-24 font-medium text-gray-500">Questions:</span>
            <span className="font-medium">{questions}</span>
          </div>
          <div className="pt-1">
            <p className="text-gray-500 font-medium">Description:</p>
            <p className="text-gray-600 text-sm line-clamp-2 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;