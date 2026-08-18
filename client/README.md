# Phase 3 - Book Search & Recommendations

## Objective

Allow users to search for books and add book recommendations.

## Implemented Features

### 1. Book API Integration

The application integrates the Open Library API to search for books and retrieve book information.

The API provides information such as:

- Book title
- Author
- Cover image
- Genre / subject
- Book details

### 2. Book Search

Users can search for books using:

- Title
- Author
- Genre

Search results are retrieved from the Open Library API and displayed in the application.

### 3. Add Book Recommendations

Users can add their own book recommendations through a dedicated form.

The form includes:

- Title
- Author
- Description
- Genre
- Image
- Rating

### 4. Input Validation and Form Submission

The application validates the information entered by the user before submitting the form.

Validation includes:

- Title is required
- Author is required
- Rating must be between 1 and 5
- Invalid or empty information is rejected

The application also displays success and error notifications.

### 5. Database Storage

Book recommendations are stored in MongoDB.

Each book is associated with the authenticated user who added it using the `recommendedBy` field.

Example:

```javascript
recommendedBy: req.user.id