# Kanban Board

A **drag & drop Kanban-style ToDo list dashboard** built with **React + TypeScript + Vite**, featuring 4 columns (Backlog, In Progress, Review, Done).

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)
![React Query](https://img.shields.io/badge/React%20Query-5-red)

---

## Features

- **4-column Kanban board:** Backlog, In Progress, Review and Done.
- **Drag & drop:** Move tasks between columns with HTML5 native drag API + optimistic updates.
- **Full CRUD:** Create, update, and delete tasks with form validation.
- **Search**: Realtime filter by title or description (global Zustand store)
- **Pagination**: Per-column "Load more" pagination (5 tasks per page)
- **Caching**: React Query with 5-minute stale time and automatic cache invalidation
- **Confirm dialog**: Safety prompt before deleting tasks
- **Loading skeletons**: Shimmer animation while data is fetching
- **Responsive layout**: Bootstrap grid (4 cols on desktop, 2 on tablet and 1 on mobile)
- **Toast notifications**: Success/error feedback via react-hot-toast

---

## Tech Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| **Framework**    | React 19 + TypeScript                   |
| **Build Tool**   | Vite 8                                  |
| **State**        | Zustand (global UI state)               |
| **Server State** | React Query / TanStack Query (caching)  |
| **Styling**      | Bootstrap 5.3 + minimal custom CSS      |
| **Forms**        | react-hook-form                         |
| **HTTP**         | Axios                                   |
| **Icons**        | react-icons                             |
| **Toasts**       | react-hot-toast                         |
| **Mock API**     | json-server                             |

---

## Project Structure

```
src/
├── components/
│   ├── Column.tsx         # Kanban column with drop zone & pagination
│   ├── ConfirmDialog.tsx  # Delete confirmation task
│   ├── Header.tsx         # App header with search 
│   ├── TaskCard.tsx       # Draggable task card with actions
│   └── TaskForm.tsx       # Create | Edit task form
├── hooks/
│   └── useTasks.ts        # React Query hooks for CRUD + optimistic drag
├── services/
│   └── api.ts             # Axios API layer (json-server)
├── store/
│   └── store.ts           # Zustand store (search + drag state)
├── types.ts               # TypeScript type definitions
├── index.css              # Custom CSS overrides (Bootstrap supplements)
├── main.tsx               # App entry point (Bootstrap + React Query providers)
└── App.tsx                # Root component with board layout
```

---

## Setup Instructions

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the repository

```bash
git clone https://github.com/Ma7moud-Emad/m3aarf-mission.git
cd m3aarf-mission
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API server

```bash
npx json-server --watch db.json --port 4000
```

This serves the REST API at `http://localhost:4000/tasks`.

### 4. Start the development server (in a new terminal)

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## API Endpoints

| Method   | Endpoint         | Description              |
| -------- | ---------------- | ------------------------ |
| `GET`    | `/tasks`         | Fetch all tasks          |
| `POST`   | `/tasks`         | Create a new task        |
| `PUT`    | `/tasks/:id`     | Update a task            |
| `PATCH`  | `/tasks/:id`     | Move task (change column)|
| `DELETE` | `/tasks/:id`     | Delete a task            |

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` directory, ready for static hosting.

---

## Notes

- **Drag & drop** uses the HTML5 native Drag and Drop API, no extra library needed.
- **Optimistic updates** on drag: the UI moves the card instantly, then syncs with the server. If the server call fails, the card snaps back to its original column.
- **React Query caching**: data is cached for 5 minutes. Mutations automatically invalidate the cache.
- **Search** is global via Zustand, filters tasks across all columns simultaneously.
