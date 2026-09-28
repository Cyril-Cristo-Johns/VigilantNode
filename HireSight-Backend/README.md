# AI-Powered Job Application Pipeline

A full-stack MERN application built to track job applications via a Kanban board. I integrated the Google Gemini AI to automatically generate interactive interview prep checklists from unstructured job descriptions, focusing on clean state management and responsive UI design.

**[View Live Demo] (Insert your Vercel URL here)**

## 🚀 Core Features & Technical Implementations

* **Smooth Kanban Interactions:** Built with `@dnd-kit`. I utilized GPU-accelerated CSS transforms (`translate3d`) and **Optimistic UI updates** to ensure the drag-and-drop interface feels instant, masking standard network latency.
* **AI-Driven Interview Prep:** Integrated the Google Gemini API to parse job descriptions. I used prompt engineering to force the LLM to return a strict JSON structure, allowing React to easily map the data into interactive checklist components.
* **Stateless Authentication:** Implemented JWT verification and bcrypt password hashing. I set up centralized Axios interceptors to automatically handle authorization headers across the frontend.
* **Data Privacy:** Ensured single-tenant data isolation at the database level by explicitly scoping all MongoDB Mongoose queries to the authenticated user's ID.

## 🏗️ What I Learned: System Design

### 1. Frontend API Orchestration & Graceful Degradation
When a user creates a new application, I chained the API requests on the frontend: first hitting the AI endpoint, then passing that data to the database creation endpoint. I implemented **graceful degradation**—if the Gemini API times out, the app safely falls back to standard CRUD creation so the user isn't blocked.

### 2. Avoiding "Derived State" in React
Initially, I passed parent data into the Kanban board's local `useState`, which caused rendering delays. I refactored the app to "lift state up," removing the child's local state entirely. The Board now acts as a pure presentational component, which solved the race conditions and kept the UI perfectly synced.

### 3. Optimistic UI Updates for Better UX
To make the drag-and-drop feel seamless, the React state updates instantly when a card is dropped, while the Axios `PATCH` request fires silently in the background. I included a localized rollback mechanism that reverts the card to its original position if the database request fails.