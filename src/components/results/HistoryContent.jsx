import React from 'react';
import ReactMarkdown from 'react-markdown';

const HistoryContent = ({ content }) => {
  if (!content) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-700">No historical content was generated. Please try again with different parameters.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-indigo max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default HistoryContent;