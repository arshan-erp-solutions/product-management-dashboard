# ProductHub - Product Management Dashboard

A modern, production-quality Product Management Dashboard built with React, Vite, and Tailwind CSS. This application provides a complete CRUD interface for managing products with advanced features like search, filtering, sorting, pagination, drag-and-drop reordering, and more.

## Features

### Core Features
- **Dashboard Overview** - View statistics and recent products at a glance
- **Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Search** - Real-time search across product name, category, and description
- **Filtering** - Filter by category, status, and price range
- **Sorting** - Multiple sort options (name, price, stock, date)
- **Pagination** - Navigate through products with 10 items per page
- **Product Details** - View complete product information
- **Form Validation** - Comprehensive client-side validation with error messages
- **LocalStorage Persistence** - All changes persist across browser refreshes
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Bonus Features
- **Dark/Light Mode** - Toggle between themes with persistence
- **Bulk Delete** - Select and delete multiple products at once
- **Drag & Drop** - Reorder products using intuitive drag-and-drop
- **CSV Export** - Export filtered products to CSV format
- **Toast Notifications** - User-friendly feedback for all actions

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library
- **@dnd-kit** - Drag and drop library
- **LocalStorage** - Client-side data persistence

## Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Navigate to the project directory**
   ```bash
   cd product-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Project Structure
