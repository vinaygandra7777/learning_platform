import React from 'react';

function LoadingSpinner() {
  return (
    <div className="text-center">
      <div className="text-4xl animate-spin mb-4 text-indigo-500">✨</div>
      <p className="text-slate-600 font-medium">Gemini is generating your lesson...</p>
    </div>
  );
}

export default LoadingSpinner;
