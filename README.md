# Created By: Igman Difari
# Email: difariivman@gmail.com
# Offline Notes App Test

A production‑style **offline notes application** built with
**React Native CLI** and **TypeScript**. The app demonstrates clean
architecture, local persistence, optimistic UI updates, and simulated
background synchronization.

This project was created as a technical test with offline storage,
state management, pagination, undo actions, and multi-select operations.

------------------------------------------------------------------------
# Environment
- Node.js: >= 22.11.0
- React Native: 0.84.1
- TypeScript: ^5.8.3
- Package Manager: npm

# Link Video Demo Offline Contact App
[https://github.com/igmandifari/videodemocontactapp/blob/main/demo.mp4]

# Running the Project
Install dependencies

- npm install

iOS
- cd ios pod install cd ..
- npx react-native run-ios

Android
- npx react-native run-android

# Running Tests
npm test
Tests cover storage, state logic, and UI behavior.

# Key Features

### Notes Management
-   Create notes
-   Edit notes
-   Delete notes
-   Bulk delete (multi‑select)
-   Undo delete (5 second window)

### Search & Sorting
-   Debounced search
-   Sort by **Created Date**
-   Sort by **Last Edited**

### Offline First Storage
-   SQLite local database
-   All operations work without internet

### Sync Status Simulation
Each note contains a sync status indicator:
  Status    Meaning
  --------- ---------------------
  Pending   waiting to sync
  Synced    successfully synced
  Failed    sync failed

The app simulates a background sync process to demonstrate how an
offline-first architecture would behave with a remote backend.

### Multi Select Mode
Users can:
1.  Long press a note
2.  Enter selection mode
3.  Select multiple notes
4.  Delete selected notes
5.  Undo deletion

### Swipe Gestures
-   Swipe left to delete a note
-   Undo deletion via snackbar

### Pagination
-   Infinite scrolling list
-   Loads notes incrementally from SQLite

### Unit Tests
Tests are included for core layers:
-   Storage layer
-   Store (state management)
-   UI components

------------------------------------------------------------------------

# Technology Stack
  Technology                     Purpose
  ------------------------------ ------------------------------
  React Native CLI               Mobile framework
  TypeScript                     Static typing
  SQLite                         Local persistent storage
  Zustand                        Lightweight state management
  React Navigation               Screen navigation
  Jest                           Unit testing
  React Native Gesture Handler   Swipe gestures
  Day.js                         Date handling

------------------------------------------------------------------------

# Architecture
The project follows a **feature‑based architecture** with layered
separation of concerns.

### Layer Responsibilities
UI Layer Screens and reusable components.

State Layer Handled by Zustand. Responsible for UI state, selection
mode, undo logic, and pagination.

Data Layer Repository pattern responsible for business logic.

Storage Layer Direct interaction with SQLite.

------------------------------------------------------------------------

# Data Flow
UI ↓ Zustand Store ↓ Repository ↓ Storage ↓ SQLite

This separation ensures the codebase is maintainable, testable, and
scalable.

------------------------------------------------------------------------

# Offline First Strategy
The application is designed with an offline-first approach.

All actions such as: - creating notes - editing notes - deleting notes -
searching notes

are performed locally using SQLite.

A simulated sync system demonstrates how notes would synchronize with a
backend server.

------------------------------------------------------------------------

# Undo Delete System
Behavior:

1.  User deletes note(s)
2.  Notes disappear from UI
3.  Snackbar appears for 5 seconds
4.  User may undo deletion
5.  If no undo occurs → permanent deletion

Bulk deletes and individual deletes share the same undo system.

------------------------------------------------------------------------

# Sync Simulation
Flow:

Create/Edit Note ↓ Status = Pending ↓ Simulated network request ↓ Synced
or Failed

Failure cases are randomly simulated to demonstrate retry scenarios.


# Notes
This project focuses on demonstrating: - clean architecture -
offline-first design - maintainable code structure - scalable mobile
application patterns
