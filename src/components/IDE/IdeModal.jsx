import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import Console from './Console';

// This component is now a full-screen modal.
function IdeModal({ isOpen, onClose, initialCode, onTaskSubmit, lessonTitle }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState([]);

  // Reset code and output when the modal is opened with new initialCode
  useEffect(() => {
    if (isOpen) {
      setCode(initialCode || '');
      setOutput([]);
    }
  }, [isOpen, initialCode]);

  // Don't render anything if the modal is not open.
  if (!isOpen) {
    return null;
  }

  const handleRunCode = () => {
    console.log("Running code:", code);
    setOutput(prev => [
      ...prev,
      { type: 'input', content: code },
      { type: 'log', content: 'Code execution logic is coming soon!' }
    ]);
  };
  
  const handleSubmit = () => {
    setOutput(prev => [...prev, {
        type: 'ai',
        content: `Great! Your code for "${lessonTitle}" has been submitted.`
    }]);

    // After a short delay, call the main submit handler and close the modal.
    setTimeout(() => {
      onTaskSubmit(); // This updates the lesson state in App.jsx
      onClose(); // This closes the modal
    }, 1500);
  };

  return (
    // Backdrop for the modal
    <div 
      className="fixed inset-0 bg-slate-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose} // Close modal by clicking the backdrop
    >
      {/* Modal Content */}
      <div 
        className="w-full max-w-5xl h-[85vh] bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <h3 className="font-bold text-lg text-white">Challenge: {lessonTitle}</h3>
          <button 
            onClick={onClose}
            className="px-3 py-1 rounded-md text-slate-300 hover:bg-slate-700"
          >
            &times;
          </button>
        </div>

        {/* Editor and Console */}
        <div className="flex-1 flex flex-col min-h-0">
            <Editor code={code} setCode={setCode} />
            <Console 
              output={output} 
              onRunCode={handleRunCode} 
              onTaskSubmit={handleSubmit}
            />
        </div>
      </div>
    </div>
  );
}

export default IdeModal;