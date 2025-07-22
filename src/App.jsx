import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import LessonView from './components/LessonView/Lessionview.jsx';
import IdeModal from './components/IDE/IdeModal.jsx';
import { fetchLessonContent } from './services/geminiService.js';

const initialCourseData = {
  title: "AI Python Tutor",
  modules: [
    {
      title: "Module 1: Getting Started",
      lessons: [
        { id: 1, title: "Variables & Data Types", completed: false },
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


function App() {
  const [courseData, setCourseData] = useState(initialCourseData);
  
  // --- CHANGE 1: Initialize activeLesson to null ---
  // This prevents the app from crashing on the first render.
  const [activeLesson, setActiveLesson] = useState(null); 

  const [lessonContent, setLessonContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [isIdeOpen, setIsIdeOpen] = useState(false);

  // --- CHANGE 2: Add a new useEffect to safely set the initial lesson ---
  // This hook runs only once after the component mounts.
  useEffect(() => {
    const firstLesson = initialCourseData?.modules?.[0]?.lessons?.[0];
    if (firstLesson) {
      setActiveLesson(firstLesson);
    } else {
        setIsLoading(false); // Stop loading if there are no lessons
    }
  }, []); // The empty array [] ensures this runs only once.


  // This effect now safely fetches content when activeLesson is set.
  useEffect(() => {
    // --- CHANGE 3: Add a check to ensure activeLesson is not null ---
    if (activeLesson) {
      const loadLesson = async () => {
        setIsLoading(true);
        setIsTaskCompleted(activeLesson.completed);
        const content = await fetchLessonContent(activeLesson.title);
        setLessonContent(content);
        setIsLoading(false);
      };
      loadLesson();
    }
  }, [activeLesson]);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleCustomTopicSubmit = (topic) => {
    const customLesson = { id: Date.now(), title: topic, completed: false };
    setActiveLesson(customLesson);
  };
  
  const handleTaskSubmit = () => {
    setIsTaskCompleted(true);
    setCourseData(prevData => {
      const newModules = prevData.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson =>
          lesson.id === activeLesson.id ? { ...lesson, completed: true } : lesson
        )
      }));
      return { ...prevData, modules: newModules };
    });
  };

  const handleNextLesson = () => {
      const allLessons = courseData.modules.flatMap(m => m.lessons);
      const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
          setActiveLesson(allLessons[currentIndex + 1]);
      } else {
          console.log("Course complete!");
      }
  };

  // Render a loading state if there's no active lesson yet
  if (!activeLesson) {
      return <div className="w-screen h-screen flex items-center justify-center bg-slate-100 text-slate-600">Loading Course...</div>;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar
        course={courseData}
        activeLesson={activeLesson}
        onLessonClick={handleLessonClick}
        onCustomTopicSubmit={handleCustomTopicSubmit}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <LessonView
          lesson={activeLesson}
          content={lessonContent}
          isLoading={isLoading}
          isTaskCompleted={isTaskCompleted}
          onNextLesson={handleNextLesson}
          onStartChallenge={() => setIsIdeOpen(true)}
        />
      </main>

      <IdeModal
        isOpen={isIdeOpen}
        onClose={() => setIsIdeOpen(false)}
        initialCode={lessonContent?.initialCode}
        onTaskSubmit={handleTaskSubmit}
        lessonTitle={activeLesson.title}
      />
    </div>
  );
}

export default App;