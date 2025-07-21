const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

/**
 * Creates a detailed prompt for the Gemini API to generate a Python lesson.
 * @param {string} lessonTitle - The title of the lesson to generate (e.g., "Conditional Statements").
 * @returns {string} A structured prompt string.
 */
const createLessonPrompt = (lessonTitle) => {
  // This prompt is carefully engineered to ask the AI for a response in a specific JSON format.
  // This ensures the data we get back is predictable and easy to parse.
  return `
    You are an expert Python instructor creating a lesson for an interactive learning platform. 
    Your tone should be encouraging, clear, and simple.
    The user wants to learn about: "${lessonTitle}".

    Generate a JSON object with the following exact keys: "concept", "challenge", "initialCode".

    - "concept": A clear, concise explanation of the topic (2-3 sentences).
    - "challenge": A small, practical coding challenge for the user to solve.
    - "initialCode": A few lines of starter Python code for the user to begin the challenge in the editor.

    Example for "Variables":
    {
      "concept": "In Python, a variable is a container for storing data. You create one by choosing a name and using the '=' sign to assign it a value. Python automatically figures out the data type, like numbers or text.",
      "challenge": "Create a variable named 'favorite_movie' and assign it the name of your favorite movie as a string. Then, print the variable.",
      "initialCode": "# Create your variable below\\nfavorite_movie = \\"\\"\\n\\n# Print the variable\\nprint(favorite_movie)"
    }

    Now, generate the JSON for the topic: "${lessonTitle}".
  `;
};

/**
 * Fetches structured lesson content from the Gemini API.
 * @param {string} lessonTitle - The title of the lesson.
 * @returns {Promise<object|null>} A promise that resolves to the structured lesson object or null if an error occurs.
 */
export const fetchLessonContent = async (lessonTitle) => {
  try {
    const prompt = createLessonPrompt(lessonTitle);

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      // Optional: Add safety settings and generation config if needed
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // If the response is not OK, throw an error with the status text.
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text, which should be our JSON string.
    const jsonString = data.candidates[0].content.parts[0].text;
    
    // Clean the string to make sure it's valid JSON.
    // The API might sometimes return the JSON string wrapped in ```json ... ```
    const cleanedJsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse the JSON string into a JavaScript object.
    return JSON.parse(cleanedJsonString);

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    // Return a fallback object so the app doesn't crash.
    return {
      concept: "Sorry, I couldn't generate the lesson content right now. Please try again.",
      challenge: "Please select another lesson or try this one again later.",
      initialCode: "# An error occurred while fetching the lesson."
    };
  }
};