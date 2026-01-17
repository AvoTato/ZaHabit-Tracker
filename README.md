# ZaHabit-Tracker

📎[ Live Demo Link:] ( https://avotato.github.io/ZaHabit-Tracker/ )

**Project Description**

The Habit Tracker is a motivational personal development tool that utilises a visual and statistical interface to assist users in establishing and maintaining everyday habits. It is designed as a lightweight, client-side program that allows users to track progress across numerous habits using a single calendar grid, all while keeping data permanent and confidential within their browser. It is constructed using localStorage, HTML, CSS, and JS.

**1. Project Choice**
   
   I chose Topic 3: The Habit Tracker with Calendar View. This project focuses on building a motivational tool that provides a clear, visual representation of progress through a calendar interface and statistics.

**2. Justification of Tools**
   - **LLM (GPT-4/ Claude 3.5):** I chose these models for their advanced reasoning in structuring complex JavaScript state logic and their ability to generate a clean, semantic HTML5 and CSS3.
   - **HTML5, CSS and JavaScript:** I used these core web technologies to ensure the application remains 'lighweight' and 'operates entirely in the browser' without the need for external frameworks or cloud-based services.
   - **LocalStorage API:** This was chosen to satisfy the requirement that all data should be 'saved in the browser', providing a consistent tool for organizing habits without a backend.

**3. High Level Approach**

My strategy utilized a Chain-of-Thought (CoT) prompting strategy rather than a single 'one-shot' prompt to ensure code stability.

   1. Foundational UI: I began with a single prompt to establish the HTML structure and a responsive CSS grid for the calendar. This ensured the layout could handle different month lengths.
   2. Logic Layering: I prompted for the JavaScript logic to handle date toggling and to structure data as a nested object in 'localStorage'. It ensure completion dates are tied to unique Habit IDs, preventing data overlap between different habits.
   3. Statistical Intergration: I used a specific chain of prompt to build a calculation engine. This engine parses the stored data to accurately calculate streaks and consistency percentage based on the data.
   5. Refinement: I iterated on the prompt to expand the app from a single-habit tracker to a multi-habit tracker system. This allowed me to refine the UI without breaking the existing logic.

**4. Final Prompts**

   I engineered the following final prompt to consolidate the working solutions:

"Act as a Senior Frontend Developer. Build a multi-habit tracker using HTML, CSS, and JS. Create a primary calendar interface where users can mark dates as complete. The app must calculate 'Longest Streak', 'Completion Rate' and 'Monthly Consistency' and save all data to localStorage. Include a 'Daily Motivation' card that displays a quote."

**5. Instructions**

   To run this project and reproduce the results:

   1. **Clone the Repository:** Clone the repository to your local machine.
   2.**Verify File Structure:** Ensure 'index.html', 'styles.css' and 'script.js' are in the same root directory. The application relies on these relative paths to function.
   3. **Launch the Application:** Open 'index.html' in any web browser. (e.g., Microsoft Edge, Chrome). No local server or 'npm install' is required as this is a client-side application.
   4. **Add a Habit:** Use the input field and click "Add Habit". This creates a unique data object in your browser's 'localStorage'.
   5. **Tracking Progress (The Calendar Grid):**
      - State Change: Click any **Date Cell** to toggle its state. The system identifies the specific date and habit ID to update the completion status.
      - Visual Feedback: The green cell indicates a "Complete" status, while a grey cell indicates "Incomplete".
   6.** Month Navigation:** Use the arrow buttons next to the month name to view past or future months. The system dynamically re-renders the calendar while preserving your saved data.
   7. Delete Habit Option: To remove a habit and its associated data, click the 'X' icon on the habit tag. This triggers a deletion logic that cleans up the local database.

**6. Challenges and Iterations**

- Challenge 1: Month Navigation Logic. Initially, switching months cleared the UI state. I iterated on my prompt to ensure the calendar re-rendered based on the stored data for that specific month and year.
- Challenge 2: Habit Deletion. Deleting a habit required careful cleanup of 'localStorage' to prevent orphaned data. I prompted for a specific filter function to handle this safely.
- Challenge 3: Visual Feedback. I refined the CSS prompts to ensure the "Delete" (X) buttons and "Months Toggles" were intuitive and responsive across all screen sizes.
   
