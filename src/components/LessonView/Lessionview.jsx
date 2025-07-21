import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function LessonView({ lesson, content, isLoading }) {
  return (
    <div className="w-full lg:w-1/2 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">{lesson.title}</h2>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6 overflow-y-auto">
          <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Concept (Learn)</h3>
            <p className="text-slate-600 whitespace-pre-wrap">{content?.concept}</p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Challenge (Practice)</h3>
            <p className="text-slate-600 whitespace-pre-wrap">{content?.challenge}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonView;