import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LessonView from './components/LessonView/Lessionview.jsx';
import IDE from './components/IDE/Terminal';
// IMPORT the real service function
import { fetchLessonContent } from './services/geminiService.js';


// Mock data for the initial course structure.
const courseData = {
  title: "AI Python Tutor",
  modules: [
    {
      title: "Module 1: Getting Started",
      lessons: [
        { id: 1, title: "Variables & Data Types", completed: true },
        { id: 2, title: "Conditional Statements", completed: false },
        { id: 3, title: "Introduction to Strings", completed: false },
      ],
    },
    {
      title: "Module 2: Logic & Control Flow",
      lessons: [
        { id: 4, title: "For & While Loops", completed: false },
        { id: 5, title: "Functions", completed: false },
      ],
    },
  ],
};

// DELETED the mock fetchLessonContent function that was here.

function App() {
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[1]);
  const [lessonContent, setLessonContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs when the activeLesson changes.
  useEffect(() => {
    // Now this calls the real service function.
    const loadLesson = async () => {
      setIsLoading(true);
      const content = await fetchLessonContent(activeLesson.title);
      setLessonContent(content);
      setIsLoading(false);
    };
    loadLesson();
  }, [activeLesson]);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleCustomTopicSubmit = async (topic) => {
    console.log("User wants to learn about:", topic);
    // Create a temporary lesson object
    const customLesson = { id: Date.now(), title: topic, completed: false };
    setActiveLesson(customLesson);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800">
      <Sidebar 
        course={courseData}
        activeLesson={activeLesson}
        onLessonClick={handleLessonClick}
        onCustomTopicSubmit={handleCustomTopicSubmit}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          <LessonView 
            lesson={activeLesson}
            content={lessonContent}
            isLoading={isLoading} 
          />
          <IDE 
            key={activeLesson.id} // Force re-mount on lesson change
            initialCode={lessonContent?.initialCode}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}

export default App;