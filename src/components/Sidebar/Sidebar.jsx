import React, { useState } from 'react';

function Sidebar({ course, activeLesson, onLessonClick, onCustomTopicSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      onCustomTopicSubmit(searchTerm.trim());
      setSearchTerm("");
    }
  };

  return (
    <aside className="w-64 md:w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-4 border-b border-slate-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-indigo-600">✨ {course.title}</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {course.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <h4 className="px-4 pt-4 pb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">{module.title}</h4>
            
            {module.lessons.map((lesson) => {
              const isActive = activeLesson.id === lesson.id;
              return (
                <a
                  href="#"
                  key={lesson.id}
                  onClick={(e) => {
                    e.preventDefault();
                    onLessonClick(lesson);
                  }}
                  // NEW: Refined styling for lesson items
                  className={`flex items-center justify-between mx-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 relative ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {/* Status Indicator: Circle for completed, line for active */}
                  <div className="flex items-center">
                    {lesson.completed ? (
                       <span className="w-5 h-5 mr-3 flex items-center justify-center text-green-500">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                       </span>
                    ) : (
                       <span className="w-5 h-5 mr-3 flex items-center justify-center text-slate-400">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       </span>
                    )}
                    <span>{lesson.title}</span>
                  </div>

                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-full"></span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <input 
          type="text" 
          placeholder="🔎 Ask to learn a topic..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md placeholder-slate-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none" 
        />
      </div>
    </aside>
  );
}

export default Sidebar;