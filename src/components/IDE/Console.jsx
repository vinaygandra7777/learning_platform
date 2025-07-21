import React from 'react';

function Console({ output, onRunCode }) {
  return (
    <div className="h-56 border-t-4 border-slate-600 flex flex-col">
      <div className="flex items-center justify-between bg-slate-700 px-4 py-1 flex-shrink-0">
        <span className="text-sm font-medium text-slate-300">Console</span>
        <button
          onClick={onRunCode}
          className="px-6 py-2 text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
        >
          Run Code
        </button>
      </div>
      <div className="flex-1 p-4 bg-slate-900 font-mono text-sm text-white overflow-y-auto space-y-2">
        {output.length === 0 && <p className="text-slate-500">Click "Run Code" to see the output.</p>}
        {output.map((line, index) => (
          <div key={index}>
            {line.type === 'input' && <pre className="text-slate-500 whitespace-pre-wrap">{`> ${line.content}`}</pre>}
            {line.type === 'log' && <pre className="text-white whitespace-pre-wrap">{line.content}</pre>}
            {line.type === 'error' && <pre className="text-red-400 whitespace-pre-wrap">{line.content}</pre>}
            {line.type === 'ai' && (
              <div className="p-3 bg-yellow-900/50 rounded-lg border border-yellow-700/50">
                <p className="font-bold text-yellow-300 mb-1">🤖 AI Tutor:</p>
                <p className="text-yellow-200 whitespace-pre-wrap">{line.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Console;