<p align="center">
  <img src="public/logo.png" alt="ZetaPik Logo" width="100" />
</p>

<h1 align="center">ZetaPik</h1>

<p align="center">
  A modern, full-stack e-commerce platform built with React and Spring Boot — featuring real-time cart state management, a dynamic light/dark mode UI, and a robust RESTful backend.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=spring-boot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-21-007396?logo=java&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap" />
</p>

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

**ZetaPik** is a feature-rich e-commerce application that provides users with a seamless shopping experience. It features a responsive React frontend with a highly polished user interface, complete with glassmorphism effects, intuitive cart animations, and a modern light/dark theme toggle. 

The backend is powered by a robust Spring Boot RESTful API that handles product inventory, database operations via Spring Data JPA, and secure state management. 

---

## Features

| Feature | Description |
|---|---|
| **Dynamic Theming** | Fully integrated Light & Dark mode with smooth transitions and glassmorphism styling |
| **Product Catalog** | Browse, search, and view detailed information for available products |
| **Interactive Cart** | Real-time add-to-cart animations with inline quantity controls (`- 1 +`) |
| **Inventory Management** | Automatic tracking of stock quantity, preventing "Out of Stock" purchases |
| **RESTful API** | Clean and structured backend endpoints for handling product and cart logic |
| **Responsive UI** | Mobile-friendly grid layouts built with custom CSS and React Bootstrap |
| **Blazing Fast** | Vite-powered React frontend for instantaneous local development and builds |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library with component-based architecture |
| [Vite 5](https://vite.dev/) | Next-gen build tool with lightning-fast HMR |
| [Bootstrap 5](https://getbootstrap.com/) | Responsive layout and pre-built styling components |
| [React Router 6](https://reactrouter.com/) | Declarative client-side routing |
| [Axios](https://axios-http.com/) | Promise-based HTTP client for API requests |
| [Context API](https://react.dev/learn/passing-data-deeply-with-context) | Centralized global state management (Cart, Theme) |

### Backend
| Technology | Purpose |
|---|---|
| [Spring Boot](https://spring.io/projects/spring-boot) | Java framework for building robust, production-grade REST APIs |
| [Spring Data JPA](https://spring.io/projects/spring-data-jpa) | ORM layer for seamless database interactions |
| [H2 Database](https://h2database.com/) | Lightweight, fast relational database for development |
| [Lombok](https://projectlombok.org/) | Java library for reducing boilerplate code |
| [Maven](https://maven.apache.org/) | Dependency management and project build tool |

---

## Architecture

```text
┌──────────────────────────────────────────────────┐
│                    Client (React)                │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │  Pages   │──│Components│──│  Context API  │   │
│  │          │  │          │  │  (Cart State) │   │
│  └────┬─────┘  └─────┬────┘  └────────┬──────┘   │
│       │              │                │          │
│  ┌────┴──────────────┴────────────────┴───────┐  │
│  │               Axios HTTP Client            │  │
│  └─────────────────────┬──────────────────────┘  │
└────────────────────────┼─────────────────────────┘
                         │ HTTP / JSON
┌────────────────────────┴──────────────────────────┐
│                 Server (Spring Boot)              │
│                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│    │REST API  │──│ Services │──│ Repositories │   │
│    │Controllers│  │          │  │    (JPA)     │   │
│    └──────────┘  └──────────┘  └───────┬──────┘   │
│                                        │          │
│                              ┌─────────┴──────┐   │
│                              │  H2 Database   │   │
│                              └────────────────┘   │
└───────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (v21)
- [Maven](https://maven.apache.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shub11-gh/ZetaPik.git
   cd ZetaPik
   ```

2. **Start the Backend (Spring Boot)**
   ```bash
   cd backend/EcomProject
   mvn spring-boot:run
   ```
   *The API will start running on `http://localhost:8080`*

3. **Start the Frontend (React/Vite)**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The React app will be accessible at `http://localhost:5173`*

---

## Project Structure

```text
ZetaPik/
├── backend/
│   └── EcomProject/            # Spring Boot Application
│       ├── src/main/java/      # Controllers, Models, Repositories, Services
│       ├── src/main/resources/ # application.properties
│       └── pom.xml             # Maven dependencies
├── frontend/                   # React Application
│   ├── public/                 # Static assets (logo.png)
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Cards, etc.)
│   │   ├── Context/            # React Context (Global state for Cart/Theme)
│   │   ├── App.jsx             # Main router and layout wrapper
│   │   ├── App.css             # Global CSS and CSS Variables
│   │   └── main.jsx            # React entry point
│   ├── package.json            # NPM dependencies
│   └── vite.config.js          # Vite build configuration
└── README.md
```
