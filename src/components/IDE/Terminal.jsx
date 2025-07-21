import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import Console from './Console';

function IDE({ initialCode, isLoading }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState([]);

  // When the lesson changes, update the code in the editor.
  useEffect(() => {
    setCode(initialCode || '');
    setOutput([]); // Clear console on lesson change
  }, [initialCode]);

  const handleRunCode = () => {
    // Placeholder for Pyodide and Gemini AI feedback logic
    console.log("Running code:", code);
    const newOutput = [
      ...output,
      { type: 'input', content: code },
      { type: 'log', content: 'Code execution logic is coming soon!' }
    ];
    setOutput(newOutput);
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-800">
        <p className="text-slate-400">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col bg-slate-800">
      <Editor code={code} setCode={setCode} />
      <Console output={output} onRunCode={handleRunCode} />
    </div>
  );
}

export default IDE;
