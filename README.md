# General Information
We implemented the Selfie project using the React framework for the application and Bootstrap for the graphical interface. As for the backend, we employed libraries and technologies 
including Node, Express, MongoDB (with Mongoose), and vanilla JavaScript. The `frontend/` (containing a `build/` directory) and `backend/` folders—which handle their respective functions—have 
been uploaded to Docker (unibo).

# Description
Selfie is a client + server web app for both pc, smartphone and tablet which allows the user to plan their events and, 
generally speaking, their life, thanks to the many functionalities. More specifically, Selfie is composed of the following screens: 
- Home Page: The Home screen represents the app's main screen, displaying the user’s main content and widgets within a responsive layout,
  automatically adapting to both desktop and mobile devices. The Homepage serves as a true extension of the calendar: it does not merely display the day’s scheduled events,
  but also allows users to complete the latter directly from the interface—using a dedicated ring-shaped button—and to filter them by category, providing immediate control
  over one’s daily agenda. The visual experience is further enhanced by the use of interactive colors: each ring associated with an event takes on the color of its respective category,
  while the colors of the tasks become progressively more intense as the deadline approaches, offering an immediate sense of their progress status.
- Calendar: The calendar provides users with an overview of their commitments through convenient monthly, weekly, and daily views. Navigating between years is very simple, as users
  can select any specific date from the past or future. Users can organize events and activities as they see fit, assigning them to different categories—each with its own distinct color.
  Furthermore, the calendar offers complete control over past, present, and future study sessions (which can be scheduled by the user in advance).
- Notes: The notes screen allows users to add, edit, delete, and copy notes, which can be displayed in alphabetical order, by length, or by date. Users can also choose to pin specific
  notes. Nnotes can be assigned categories (tags), enabling users to filter them by specific tags; a dedicated search bar is also available for more precise searches, matching
  keywords found in the title, the body text, or the list of categories. Markdown notes are also supported.
- Pomodoro: The app also offers the ability to organize your daily study sessions by alternating between periods of study and breaks.
  As you complete each study session, you’ll be able to watch your entire patch of tomato plants grow!

# Utilities mechanisms
- Login: every registered user is assigned a personal space within the MongoDB database, where their credentials and access information—such as first name, last name, email, and password—are stored.
  The password is encrypted to ensure a high level of security. To manage route security and protect resources, the application uses JSON Web Tokens (JWT). Following a successful login or registration,
  a unique token is generated (and stored in the user’s cookies), allowing the backend to verify the user’s identity and ensure that only authenticated users can access specific APIs or features.
- Notifications: the app offers a notification system as regards planned events and activities; the user can choose which of the available options they prefer, and will receive notifications via email at the same email
  address is used to log in to the site.
- Time Machine (development purpouses): thanks to the "Time Machine" mechanism, you can move forward or backward in time as you please, in order to test whether the system for notifying you about events and
- tasks is working correctly—including how tasks and "pomodoros" (work intervals) are shifted if they are not completed.
