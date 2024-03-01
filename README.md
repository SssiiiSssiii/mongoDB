
# Simple Books Store API
This is a simple Node.js and Express API for managing books in a bookstore.    
It provides basic **CRUD** (Create, Read, Update, Delete) operations for a **MongoDB** database.     
Below are the endpoints available:

* GET /books: Retrieves all books from the database.
* GET /books/:id: Retrieves a specific book by its ID.
* POST /books: Creates a new book in the database.
* DELETE /books/:id: Deletes a book from the database by its ID.

# Setup
1) `npm install`
2) Create a `.env` file in the root directory with the following content:   
```c
URL = your_mongodb_connection_url
PORT = 3000
```
3) Start the server `node index.js`.
