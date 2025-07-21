import React, { useState } from 'react';

// The Sidebar component receives the course data and the active lesson as props.
// It also receives callback functions to notify the parent App component of user actions.
function Sidebar({ course, activeLesson, onLessonClick, onCustomTopicSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the key press event for the custom topic input.
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      onCustomTopicSubmit(searchTerm.trim());
      setSearchTerm(""); // Clear input after submission
    }
  };

  return (
    <aside className="w-64 md:w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
      {/* Header of the sidebar */}
      <div className="h-16 flex items-center px-4 border-b border-slate-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-indigo-600">{course.title}</h1>
      </div>

      {/* Main navigation area for lessons */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {course.modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            {/* Module Title (e.g., "Module 1: Getting Started") */}
            <h4 className="px-2 py-2 text-sm font-semibold text-slate-400">{module.title}</h4>
            
            {/* List of lessons within the module */}
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
                  // Dynamically apply styles based on lesson state (active, completed, etc.)
                  className={`flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {/* Lesson Title */}
                  <span className={isActive ? 'font-semibold' : ''}>{lesson.title}</span>

                  {/* Status Indicator: Check for completed, pulsing dot for active */}
                  {lesson.completed && !isActive && (
                    <span className="text-green-500">✓</span>
                  )}
                  {isActive && (
                    <span className="flex items-center justify-center w-4 h-4">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer section with the AI search input */}
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
