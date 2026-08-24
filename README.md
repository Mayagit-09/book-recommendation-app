# Phase  5 – User Interaction and Personalized Recommendations

## Objective

Enable user interaction and display personalized book recommendations based on user preferences and interactions.

## Features Implemented

* Implemented a **Like / Unlike system** that allows authenticated users to like and remove likes from book recommendations.

* Implemented a **Comments system** that allows users to add and view comments on books.

* Added a **Book Details page** displaying detailed information about each selected book, including title, author, description, genre, image, rating, and comments.

* Implemented a **Rating system** allowing authenticated users to rate books from 1 to 5 stars.

* Created a **User Profile page** displaying user information, liked books, comments, followers, and following.

* Added **Followers and Following** fields to the User model.

* Protected user interactions and sensitive routes using **JWT authentication**.

* Implemented a **personalized recommendation algorithm** based on the genres of books liked by the user.

* Excluded books already liked by the user from personalized recommendations.

* Sorted recommendations to prioritize books with higher ratings.

* Created a **Personalized Recommendations Feed** that displays recommended books dynamically for each authenticated user.

* Added a **Recommendations page** where users can view their preferred genres and discover suggested books.

* Added loading states, error handling, and empty recommendation messages to improve the user experience.

* Optimized recommendation retrieval by filtering relevant books directly from MongoDB.

## Technologies Used

* React

* React Router DOM

* Node.js

* Express.js

* MongoDB

* Mongoose

* Axios

* JWT Authentication

* Bootstrap

* React Icons
