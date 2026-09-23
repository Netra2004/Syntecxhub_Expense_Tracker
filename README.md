💰 Expense Tracker

Track smarter. Spend better. Understand your money.

A modern, responsive Expense Tracker web application built with React.js and Vite that helps users record, manage, search, filter, and analyze their expenses through an intuitive dashboard and interactive visual analytics.

🔗 GitHub Repository: https://github.com/Netra2004/expense-tracker



📌 Overview

Managing daily expenses can become difficult without a clear view of where money is being spent.

Expense Tracker provides a simple and interactive solution for managing personal expenses. Users can maintain transactions, categorize spending, analyze expense patterns, and monitor their overall spending from a single dashboard.

The application combines a clean user interface with interactive charts to make financial data easier to understand.



✨ Key Features

📊 Dashboard

- View total spending
- Track number of transactions
- Calculate average expense
- View recent transactions
- Add new expenses directly from the dashboard

💳 Expense Management

- Add new transactions
- Edit existing expenses
- Delete transactions
- Select expense categories
- Select transaction dates
- Automatically calculate updated totals

🔍 Search & Filtering

- Search transactions by name
- Filter expenses by category
- Quickly find specific transactions
- View filtered results dynamically

📈 Interactive Analytics

- Doughnut/Pie chart for spending distribution
- Bar chart for category-wise spending
- Percentage-based category analysis
- Automatically updated charts when transactions change

💾 Data Persistence

- Uses browser Local Storage
- Expenses remain available after refreshing the page
- No external database required for the current version

📱 Responsive Design

- Clean and modern interface
- Responsive layout for different screen sizes
- User-friendly navigation
- Designed for both desktop and smaller screens

🇮🇳 Currency Support

- Uses Indian Rupee (₹) formatting
- Displays expenses in a familiar Indian currency format



🖥️ Application Pages

Page| Description
📊 Dashboard| Overview of spending and recent transactions
💳 Expenses| Search, filter, edit, and delete transactions
📈 Analytics| Visualize spending using charts and category analysis
⚙️ Settings| View application settings and transaction information



🛠️ Tech Stack

Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

Build Tool

- Vite

Data Visualization

- Recharts

Data Storage

- Browser Local Storage

Development Tools

- Git
- GitHub
- VS Code
- npm



🏗️ Project Architecture

expense-tracker/
│
├── public/
│   ├── expense-dashboard.png
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── SummaryCards.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js



🚀 Getting Started

Follow these steps to run the project locally.

1. Clone the repository

git clone https://github.com/Netra2004/expense-tracker.git

2. Navigate to the project directory

cd expense-tracker

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open the application

Vite will provide a local development URL, usually:

http://localhost:5173/

Open the URL in your browser.



📊 Analytics & Visualization

The Analytics section transforms expense data into easy-to-understand visual information.

Doughnut Chart

Displays the distribution of expenses across different categories.

Bar Chart

Provides a category-wise comparison of spending.

Category Analysis

Each category also displays its percentage contribution to the overall spending.

The charts automatically update whenever the user:

- Adds an expense
- Edits an expense
- Deletes an expense



💡 Sample Expense Categories

The application supports categories such as:

- 🛒 Groceries
- 🍔 Food
- 🏠 Utilities
- 🎬 Entertainment
- 🛍️ Shopping
- 🚕 Travel
- 📦 Other



🔄 Application Workflow

        
           Add Expense        
                 ↓
         Store Transaction
                 ↓
         Update Dashboard 
                 ↓
         Analyze Expenses 
                 ↓
         Charts & Insights
 


🎯 Project Objectives

The main objectives of this project are to:

- Build a practical real-world React application
- Implement CRUD operations for expense transactions
- Practice React state management
- Implement browser-based data persistence
- Create interactive data visualizations
- Develop responsive user interfaces
- Improve frontend development and UI/UX skills


📚 What I Learned

Through this project, I gained practical experience in:

- React component development
- React Hooks and state management
- CRUD functionality
- Form handling and validation
- Local Storage
- Dynamic filtering and searching
- Data aggregation
- Data visualization with Recharts
- Responsive CSS design
- Git and GitHub workflow
- Vite-based React development


👩‍💻 Developer

Netra

CSE Graduate | React | Java | SQL | Full Stack Development

This project was developed as a portfolio project to demonstrate practical frontend development, UI design, data management, and visualization skills.


⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.



📄 License

This project is created for educational and portfolio purposes.
