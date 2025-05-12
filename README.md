# Bauplan Take-Home Assignment (Commit History App)

This project is a single-page web application that displays commit history using the Bauplan API. The backend is built with Flask and runs inside a Docker container, while the frontend uses React (NextJS) and runs separately.

---

<p align="center">
  <img src="https://github.com/caileeaverill/bauplan-take-home-assignment/blob/main/screenshots/screencapture-localhost-3000-2025-05-12-17_58_22.png?raw=true" alt="Dashboard View 1" width="45%" style="margin-right: 10px;" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-blue" alt="Next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?logo=tailwindcss&logoColor=white" alt="TailwindCSS 4.0" />
  <img src="https://img.shields.io/badge/Shadcn%2Fui-Tailwind-informational" alt="Shadcn UI" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript" alt="TypeScript 5.3" />
  <img src="https://img.shields.io/badge/Flask-Python-000000?logo=flask&logoColor=white" alt="Flask Python" />
</p>

## 💡 Motivation and Thinking

The goal of this project was to build an intuitive and interactive way to explore commit histories from Bauplan environments. Given the developer-focused nature of Bauplan's platform, I prioritized clarity and responsiveness in the UI, as well as seamless integration with the Bauplan API using their official Python SDK. The inspiration for the UI and functionality is [GitKraken](https://www.gitkraken.com/). Al though very much a dumbed down version, I liked the ability to have your filters on the left side, more in depth information on right side and a focus of the timeline in the center. If I had more data and time I would have hoped to connect the commits as pipes like a lot of Git visuals.

### Key Considerations:
- **User Experience:** Display commit data clearly, with filters for branches and authors.
- **Performance:** Fetch data efficiently without overloading the frontend.
- **Integration:** Use the official Bauplan SDK for reliable data retrieval.

---


## 📚 Table of Contents

- [Features](#-features)
- [Folder Structure](#-folder-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Notes](#-notes)
- [Known Limitations](#-known-limitations)

## ✨ Features
- 📊 **Interactive Commit History Visualization** — Displays Bauplan commit data in a clean and intuitive timeline format.
- 🔄 **Real-Time Commit Updates** - Automatically refreshes commit history when new data is available
- 🧩 **Modular, reusable components** — Built using [shadcn/ui](https://ui.shadcn.dev/) and custom component structures
- 🌐 **Direct API Integration via Bauplan Python SDK** - Retrieves commit data directly without additional backend layers.
- 🧭 **Branch and User Filtering** - Quickly navigate commits from different branches and authors
- 📅 **Formatted Commit Dates and Author Initials** - Enhanced readability and clear visual cues

## 🛠️ Architecture

The application follows a modular architecture, separating frontend and backend concerns to optimize both performance and maintainability.

### Frontend:
- **Framework:** Next.js with React
- **Styling:** Tailwind CSS and shadcn/ui for consistent, modern design
- **State Management:** React Context API for global state handling
- **Charting:** Recharts for interactive data visualization
- **Deployment:** Vercel for fast and easy CI/CD

### Backend:
- **Framework:** Flask for building a lightweight API
- **API Integration:** Bauplan Python SDK to directly fetch commit data
- **Containerization:** Docker for consistent environments
- **Deployment:** AWS EC2 for backend hosting, wrapped in Gunicorn for production readiness


## 🛠️ Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) – Fullstack React framework using the App Router and Server Components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI building
- [shadcn/ui](https://ui.shadcn.dev/) – Accessible UI components built with Radix and Tailwind
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript

### Backend
- [Flask](https://flask.palletsprojects.com/en/stable/) – A lightweight and flexible Python web framework for building API endpoints
- [Docker](https://www.docker.com/) – Containerization tool to package and deploy the backend with consistent environments
- [Bauplan Python SDK](https://docs.bauplanlabs.com/en/latest/index.html) - Official SDK to directly interact with Bauplan’s API and retrieve commit history

---

## 🚀 Getting Started  

Follow these instructions to set up the Bauplan Commit History App for local development and deployment.  

### Prerequisites  
Before you start, make sure you have the following installed on your system:  
- [Docker](https://www.docker.com/) - For running the Flask backend in a container.  
- [Node.js and npm](https://nodejs.org/) - For running the Next.js frontend.  
- [Python 3.x](https://www.python.org/) - Required for the backend.  
- [Git](https://git-scm.com/) - For cloning the repository.  

#### 1. Clone the Repository  
```bash
git clone https://github.com/caileeaverill/bauplan-take-home-assignment.git
cd bauplan-take-home-assignment
```

#### 2. Setup Environment Variables
 
```bash
BAUPLAN_API_KEY=<your_bauplan_api_key>

```

#### 3. Install Frontend Dependencies  
Navigate to the frontend directory and install the required packages:  
```bash
cd frontend
npm install
```

#### 4. Build and Run the Backend

```bash
docker build -t bauplan-app .

docker run -d -p 8000:8000 bauplan-app
```

#### 5. Run the Frontend

```bash
npm run dev
```
By default, the frontend runs on http://localhost:3000.

## 📐 Limitations and Assumptions  

### Limitations:
- **API Rate Limits:** The Bauplan API may impose rate limits, which could affect the responsiveness of the app when fetching large amounts of data.  
- **Data Volume:** The app is optimized for moderate-sized commit histories. Very large datasets may cause performance issues.  
- **Network Dependencies:** The application relies on a stable network connection to fetch commit data. Any disruption may cause errors or delays in displaying data.  
- **Mobile Responsiveness:** While the app is designed to be responsive, some UI components may not be fully optimized for smaller screen sizes.  
- **Single Environment Scope:** The current version of the app fetches commit history from one environment only. Multi-environment support would require additional filtering.  


### Assumptions:
- **Valid API Key:** The user has a valid Bauplan API key with permissions to access the commit history.  
- **Local Docker Setup:** Users running the app locally have Docker installed and properly configured.  
- **Standard Project Structure:** The project structure is consistent with the instructions and does not contain modifications that could affect the setup.  
- **Data Format Stability:** The format of the data returned by the Bauplan API is assumed to be consistent. Any changes to the API structure could break the data parsing.  

---

## 💡 Future Improvements  

### Additional Features:
- **Multi-Environment Support:** Extend the app to allow users to switch between different environments, displaying commit history from each.  
- **Enhanced Filtering:** Add more granular filters, such as date ranges, commit messages, and author-specific queries.  
- **Pagination and Infinite Scroll:** Improve usability when dealing with large volumes of commits by implementing pagination or infinite scrolling.  
- **Export Options:** Allow users to export commit history as CSV or JSON for external analysis.  
- **Detailed Commit View:** Add a separate page or modal to display detailed information about individual commits.  

### Technical Improvements:
- **Error Handling:** Implement more comprehensive error messages when API calls fail or data is unavailable.  
- **Unit and Integration Tests:** Introduce automated testing to ensure the stability of core features during updates.  
- **Continuous Integration:** Automate build and testing using CI/CD pipelines, ensuring every new feature is tested before deployment.  
- **Automated Data Refresh:** Implement a background task that periodically fetches the latest commits to keep the UI up-to-date without manual refresh.  

## 📝 Notes  
- Ensure that your Bauplan API key is correctly configured in the `.env` file to avoid authentication errors.  
- The frontend and backend must be running concurrently for the application to function correctly.  
