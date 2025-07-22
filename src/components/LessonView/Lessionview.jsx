import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const ConceptIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const ChallengeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;

// RENAMED PROP: onStartChallenge
function LessonView({ lesson, content, isLoading, isTaskCompleted, onNextLesson, onStartChallenge }) {
  return (
    // This component now takes the full width of the main content area
    <div className="flex-1 p-6 lg:p-10 flex flex-col bg-white">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">{lesson.title}</h2>
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-8 overflow-y-auto flex-1">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center"><ConceptIcon /><h3 className="text-xl font-bold text-slate-900">Concept</h3></div>
            <p className="text-slate-600 mt-3 ml-9 whitespace-pre-wrap leading-relaxed">{content?.concept}</p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center"><ChallengeIcon /><h3 className="text-xl font-bold text-slate-900">Your Challenge</h3></div>
            <p className="text-slate-600 mt-3 ml-9 whitespace-pre-wrap leading-relaxed">{content?.challenge}</p>
          </div>

          {/* --- NEW CONDITIONAL UI --- */}
          <div className="mt-10 text-center">
            {isTaskCompleted ? (
              // If task is done, show the "Next Lesson" button
              <div className="p-5 bg-green-50 border-2 border-dashed border-green-400 rounded-xl">
                <h3 className="text-2xl font-bold text-green-800">✨ Well Done! ✨</h3>
                <p className="text-green-700 mt-2">You've completed this challenge.</p>
                <button
                  onClick={onNextLesson}
                  className="mt-4 px-8 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
                >
                  Continue to Next Lesson →
                </button>
              </div>
            ) : (
              // If task is not done, show the "Start Challenge" button
              <button
                onClick={onStartChallenge}
                className="px-10 py-4 text-xl font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Challenge
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonView;