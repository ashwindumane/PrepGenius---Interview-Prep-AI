import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded, answer]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border p-4 rounded-md shadow mb-4 bg-white transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Q</span>
          <h3 className="text-gray-800 font-medium">{question}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onTogglePin} 
            className="text-gray-600 hover:text-black"
            aria-label={isPinned ? "Unpin question" : "Pin question"}
          >
            {isPinned ? <LuPin /> : <LuPinOff />}
          </button>
          <button
            onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }}
            className="flex items-center text-gray-600 hover:text-black"
            aria-label="Learn more about this question"
          >
            <LuSparkles />
            <span className="ml-1">Learn More</span>
          </button>
          <button
            onClick={toggleExpand}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef}>
          {answer ? (
            <AIResponsePreview content={answer} />
          ) : (
            <div className="mt-2 text-gray-500 italic">No answer yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;