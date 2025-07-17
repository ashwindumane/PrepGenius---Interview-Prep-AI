import React from 'react';
import moment from 'moment';

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{role} Interview</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {experience} experience
            </span>
            {topicsToFocus && topicsToFocus.split(',').map((topic, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {topic.trim()}
              </span>
            ))}
          </div>
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">
            {questions?.length || 0} questions
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated ? moment(lastUpdated).format('MMM D, YYYY') : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;