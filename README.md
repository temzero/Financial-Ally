# FINANCIAL ALLY
#### Video Demo:  <URL HERE>
#### Description: Designed to help people track their expenses and incomes

**PROJECT OVERVIEW**
This project empowers individuals and businesses to take control of their finances by tracking income and expenses. By simply inputting daily transactions, users gain valuable insights into their spending habits and income sources through intuitive charts and analyses. This knowledge equips them to make informed financial decisions and achieve their financial goals.

**How to Use?**

Using the tool is straightforward:
    Record Transactions: Enter details like type (income or expense), amount, category, wallet, date, and optional notes.
    Customize Categories and Wallets: Create tailored categories and wallets to match your specific financial needs.
    Set Budgets: Establish spending limits for specific periods and assign them to wallets to monitor your budget adherence.

Analysis and Insights:
    The Analysis tab provides comprehensive financial insights:
    Overall Financial Health: Visualize trends in your total balance over time.
    Detailed Budget and Wallet Analysis: Dive deep into specific budgets and wallets to track performance and spending patterns.
    Category-Based Insights: Understand how your spending is distributed across different categories.

**App Functions:**

The frontend features five main tabs, each offering distinct functionality:

Home:
    Includes a line chart to analyze changes in the total balance over time.
    Displays all transactions across all wallets.
    Features an "Add Transaction" form conveniently located on the right side of the screen.

Analysis:
    Shows transaction data for all wallets or individual wallets.
    Includes a line chart for tracking money flow and doughnut charts for analyzing categories, wallet expenses, and income.

Budget:
    Lists all your budgets and provides the option to create new ones.
    Clicking on a specific budget navigates to its detailed page, displaying transaction and budget-specific data.

Wallet:
    Similar to the Budget tab, this section displays all wallets and allows you to create new ones.
    Clicking on a wallet takes you to its detailed page, showing transaction and balance data for that wallet.

User Profile:
    Displays your account details and allows you to edit your profile, such as changing your password.
    The most important feature here is category management:
    Create custom categories.
    View all categories, along with their related transactions and the total value of those transactions.


**FILE STRUCTURE:**
The project is organized into two main folders: Frontend and Backend.
This project adopts a standard React application structure for the frontend and a well-organized backend to ensure scalability and maintainability. Below is an overview of the key directories, files, and their purposes:

*FRONTEND:*
Languages Used: JavaScript, React.js

1. node_modules
    Contains all project dependencies and their sub-dependencies, installed via npm (Node Package Manager).
    Dependency details are listed in the package.json file under the dependencies and devDependencies sections.
2. public
    Stores static assets like HTML files, images, and other files that are directly served by the web server.
    These assets are not processed by Webpack or other build tools.
3. src
    The source folder containing the application's main codebase.

Key Files in src folder:

index.js
    Entry point of the React application.
    Initializes the React app and applies global styles.
    Configures React-Redux to manage state, enabling data sharing across components.

App.js (Serves as the root component of the application)
        Implements two types of routing:
        - Public Routes: Accessible without user authentication.
        - Private Routes: Restricted to authenticated users.
        - Uses logic from the routes folder to determine user access based on login status.
  
routes
        - Contains routing logic and identifiers to decide whether a route is public or private.
        - Functions from this folder are referenced in App.js.

Pages 
        home.js
                - The landing page after user login.
                - Fetches user data from the backend using React-Redux.
                - Displays components like charts, transaction lists, and the "Add Transaction" form.
        addTransaction.js
                - Contains a form for adding transactions.
                - Supports keyboard navigation for entering transaction data.
                - Dispatches new transactions to the backend, which updates the database and triggers Redux to refresh the UI.
        analysis.js
                - Similar to home.js but focused on detailed wallet analysis.
                - Includes a controller bar for both mouse and keyboard interaction.
        budget.js
                - Displays budget cards with details such as charts and transaction lists for specific wallets.
        wallet.js
                - Manages and displays wallet information, similar to budget.js.
        profile.js
                - Displays the user profile and category list.
                - Includes a form for creating new categories.

Components (Reusable UI elements and global utilities).
        GlobalStyles
                - Applies global SCSS styles across the app.
                - Each page or component also includes localized SCSS for specific styling needs.
        Layouts
                - Contains layout components shared across pages (e.g., home, analysis, wallet, and budget).
        ClickOutside
                - Implements functionality to close pop-up forms when clicking outside the form or pressing the "Escape" key.
                - Used for components like charts, category forms, and other pop-ups.

Assets
        Stores images, logos, and other static files.

Redux (Manages the application's state and acts as a bridge between the frontend and the backend)
        Reducer
                - Functions that define how the application's state changes in response to dispatched actions.
                - Takes the current state and an action as input and returns the updated state.
                - Multiple reducers handle different data types for easier maintenance.
        Actions
                - Plain JavaScript objects that describe what occurred in the app.
                - Carry a payload to update the state.
        Store
                - The central hub for storing the application's global state.
                - Holds the current state.
                - Allows state access and subscribes to state changes.
                - Dispatches actions to modify the state.
                - Uses redux-persist for persistence:
                        - Saves the state in sessionStorage, localStorage, or other storage engines.
                        - Prevents data loss on page reload.


*BACKEND*
Languages Used: JavaScript, node.js
Database: mongoDb

1. node_modules
        Similar to the frontend, contains all backend dependencies.
2. src
        Contains the source code for backend logic and database interaction.

Key Backend Files in src:

backend.js
        - Entry point of the backend application.
        - Sets up the server, connects to the database, and starts listening for incoming requests.
        - Uses MongoDB for database operations:
                - Connects to the database via promises to handle success or failure of the connection.
Routes
        - Defines application routes (API endpoints).
        - Example: user.route.js contains public and private routes that interact with the frontend.
Controllers
        - Core logic for handling incoming API requests and returning responses.
        - Each controller handles a specific type of data (e.g., users, transactions, wallets).
        - Controllers are imported into routes to process matched requests.
Models
        - Defines data structures and schema for database interaction.
        - Example: wallet.model.js: Defines fields like name, balance, type, color, and transactionId using Mongoose (for MongoDB) or Sequelize (for SQL databases).

