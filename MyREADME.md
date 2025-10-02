# 📚 MongoDB Assignment

This project demonstrates fundamental and advanced data-layer operations using MongoDB and Node.js. It includes data insertion, complex queries, updates, deletions, indexing, and aggregation.

---

## 🛠️ Technologies Used

- **Node.js**

- **MongoDB**

- **MongoDB Node.js Driver**

---

## 📦 Setup Instructions


**Clone the repo** or download the files:

```bash
git clone https://github.com/PLP-MERN-Stack-Development/mongodb-data-layer-fundamentals-and-advanced-techniques-Princessglory.git
```

2. Open terminal and navigate to the project folder 

3. Run the following commands:

```bash
npm install
node insert_books.js      # Inserts book data into MongoDB
node queries.js           # Executes various queries and operations

```
⚠️ Make sure MongoDB is running locally on mongodb://localhost:27017

| File              | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `insert_books.js` | Inserts a sample dataset into MongoDB    |
| `queries.js`      | Performs multiple queries and operations |


🔍 Features Demonstrated

* Insert multiple documents

* Query by genre, author, and year

* Update documents

* Delete documents

* Projection (select specific fields)

* Sorting (ascending and descending)

* Pagination (skip and limit)

* Aggregations:

  * Average price by genre

  * Most popular author

  * Group books by decade

* Indexing:

  * Single-field index

  * Compound index

  * Query performance using .explain()

## Screenshot
![Book List Output](compass%20screenshot.PNG)

## ✅ Example Query Output

  Find all books in the Fiction genre:
  
```
[
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "price": 12.99
  },
  ...
]
```
## 📄 License

This project is for educational purposes only.