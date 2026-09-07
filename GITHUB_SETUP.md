# GitHub Setup Guide

Follow these steps to push your project to GitHub:

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `product-management-dashboard`
5. Add description: "Product Management Dashboard - React Internship Task"
6. Choose Public or Private
7. **Do NOT** initialize with README (you already have one)
8. Click "Create repository"

## Step 2: Initialize Git Locally

Open terminal in your project folder:

```bash
cd product-management-dashboard
```

Initialize git:

```bash
git init
```

## Step 3: Add All Files

```bash
git add .
```

## Step 4: Create First Commit

```bash
git commit -m "Build complete Product Management Dashboard

Features:
- Dashboard with statistics
- Full CRUD product management
- Search, filter, sort, pagination
- Dark/light mode
- Drag & drop reordering
- Bulk delete
- CSV export
- Responsive design
- LocalStorage persistence"
```

## Step 5: Rename Branch to Main

```bash
git branch -M main
```

## Step 6: Add GitHub Remote

Copy the repository URL from your GitHub page. It will look like: