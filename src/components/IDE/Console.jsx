import React from 'react';

function Console({ output, onRunCode, onTaskSubmit }) {
  return (
    <div className="h-64 border-t-4 border-slate-900 flex flex-col">
      {/* Redesigned Header */}
      <div className="flex items-center justify-between bg-slate-700 px-4 py-2 flex-shrink-0 border-b border-slate-600">
        <span className="text-md font-bold text-slate-300">Console Output</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRunCode}
            className="px-5 py-2 text-sm font-semibold text-slate-200 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Run Test
          </button>
          <button
            onClick={onTaskSubmit}
            className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit Task
          </button>
        </div>
      </div>
      
      {/* Output Area (with slight style tweaks) */}
      <div className="flex-1 p-4 bg-slate-900 font-mono text-sm text-white overflow-y-auto space-y-2">
        {output.length === 0 && <p className="text-slate-500">Click "Run Test" to execute your code or "Submit Task" to complete the challenge.</p>}
        {output.map((line, index) => (
          <div key={index}>
            {line.type === 'input' && <pre className="text-slate-400 whitespace-pre-wrap">{`> ${line.content}`}</pre>}
            {line.type === 'log' && <pre className="text-green-300 whitespace-pre-wrap">{line.content}</pre>}
            {line.type === 'error' && <pre className="text-red-400 whitespace-pre-wrap">{line.content}</pre>}
            {line.type === 'ai' && (
              <div className="p-3 bg-indigo-900/50 rounded-lg border border-indigo-700/50">
                <p className="font-bold text-indigo-300 mb-1">🤖 AI Tutor:</p>
                <p className="text-indigo-200 whitespace-pre-wrap">{line.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Console;