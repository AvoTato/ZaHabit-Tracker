# ZaHabit-Tracker

**Project Description**
The Habit Tracker is a motivational personal development tool that utilises a visual and statistical interface to assist users in establishing and maintaining everyday habits. It is designed as a lightweight, client-side program that allows users to track progress across numerous habits using a single calendar grid, all while keeping data permanent and confidential within their browser. It is constructed using localStorage, HTML, CSS, and JS.

**1. Project Choice**
   
   I chose Topic 3: The Habit Tracker with Calendar View. This project focus on building a motivational tool that provides a clear, visual representation of progress through a calendar interface and satistics.

**2. Justification of Tools**
   - **LLM (GPT-4/ Claude 3.5):** I chose these models for their advanced reasoning in structuring complex JavaScript state logic and their ability to generate a clean, sematic HTML% and CSS3.
   - **HTML, CSS and JavaScript:** I used these core web technologies to ensure the application remains 'lighweight' and 'operates entirely in the browser' without the need for external frameworks or cloud-based services.
   - **LocalStorage API:** This was chosen to satisfy the requirement that all data should be 'saved in the browser', providing a consistant tool for organizing habits without a backend.

**3. High Level Approach**

My strategy utilized a Chain-of-Thought (CoT) prompting strategy:
   1. Foundational UI: I began with a single prompt to establish the HTML structure and a responsive CSS grid for the calendar.
   2. Logic Layering: I then prompt for the JavaScript logic to handle date tonggling and data persistence via 'localStorage'.
   3. Statistical Intergration: I used a specific prompt to implement the math logic for calculating streaks and percentage.
   4. Refinement: I iterated on the prompt to expand the app from a single-habit tracker to a multi-habit tracker system with a dynamic selection menu.

**4. Final Prompts**

   I engineered the following final prompt to consolidate the working solutions:

"Act as a Senior Frontend Developer. Build a multi-habit tracker using separate HTML, CSS, and JS files. Create a primary calendar interface where users can mark dates as complete. The app must calculate 'Longest Streak' and 'Completion Rate' and save all data to localStorage. Include a 'Daily Motivation' card that displays a quote."

5. Intructions
   To run this project and reproduce the results:
   
