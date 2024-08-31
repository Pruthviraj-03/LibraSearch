LibraSearch

LibraSearch is a React.js and Tailwind CSS-based web application that allows users to find and read their favorite books easily. With features like sorting and responsive design, users can quickly navigate through book listings and get detailed information about each book.

Table of Contents
Overview
Technology Used
API Usage
Features
Installation
Folder Structure
Routing
Header and Footer
Pages
Home Page
Books Page
Not Found Page
Optional Features
Challenges and Solutions
Overview
LibraSearch helps users discover and read books they are interested in. By leveraging React.js for the front end and Tailwind CSS for styling, the application provides a modern, responsive user interface that enhances the user experience.

Technology Used
React.js: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for creating custom designs.
API Usage
The application uses the OpenLibrary API to fetch book data. Example endpoint used:

Book Search: OpenLibrary Search API
Features
Installation: Easily set up the project with necessary dependencies.
Folder Structure: Organized to maintain clean and modular code.
Routing: Implemented for navigation between pages.
Header and Footer: Included for consistent layout across the site.
Home Page: Displays an introduction and links to book search.
Books Page: Shows a list of books with details like title, author, and description.
Spinner: Added to both the home and books pages to indicate loading states.
Not Found Page: Displays a user-friendly message when no search results are found.
Responsiveness: Ensured that the application is fully responsive across different devices.
Favicon Update: Added a favicon for branding.
Sorting: Users can sort books by title and author name (A-Z).
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Pruthviraj-03/LibraSearch.git
cd LibraSearch
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
Open http://localhost:3000 in your browser to view the application.

Folder Structure
public/: Contains static assets like index.html and favicon.
src/: Contains source code for the application.
components/: Reusable components like Header, Footer, Spinner.
pages/: Page components like Home, Books, NotFound.
styles/: Tailwind CSS configuration and custom styles.
App.js: Main application component with routing.
Routing
Implemented routing using React Router to navigate between:

Home Page
Books Page
Not Found Page
Header and Footer
Consistent header and footer components have been added to provide navigation and information throughout the site.

Pages
Home Page
Introduces the application and provides a link to the books search page.
Books Page
Displays a list of books with options to search and sort.
Includes a spinner for loading states.
Not Found Page
Displays a friendly message and image when no search results are found.
Optional Features
Sorting: Users can sort books by title and author name (A-Z), enhancing the usability and user experience.
Challenges and Solutions
Challenge: Implementing sorting functionality.

Solution: Created a sorting function based on user-selected options to dynamically reorder book listings.
Challenge: Handling API data and filtering results.

Solution: Utilized React hooks to manage state and filter books based on user input.
Challenge: Making the application responsive.

Solution: Used Tailwind CSS utility classes to ensure the application looks good on different devices.
Challenge: Implementing a user-friendly "Not Found" page.

Solution: Created a dedicated page that displays a custom message and image when no search results are found.
