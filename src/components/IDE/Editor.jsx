
import React from 'react';

function Editor({ code, setCode }) {
  return (
    <div className="flex-1 p-4 font-mono text-sm text-white flex flex-col">
      <textarea
        className="bg-slate-900 rounded-lg p-4 h-full w-full flex-1 resize-none outline-none leading-relaxed"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck="false"
        placeholder="// Write your Python code here..."
      />
    </div>
  );
}

export default Editor;