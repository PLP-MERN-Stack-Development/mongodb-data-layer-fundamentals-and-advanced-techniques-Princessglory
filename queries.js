
// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Wrap all queries in an async function
async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // -------------------
    // Task 2: Basic CRUD
    // -------------------

    // 1. Find all books in a specific genre
    console.log("\nBooks in Fiction genre:");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    // 2. Find books published after a certain year
    console.log("\nBooks published after 1900:");
    console.log(await books.find({ published_year: { $gt: 1900 } }).toArray());

    // 3. Find books by a specific author
    console.log("\nBooks by George Orwell:");
    console.log(await books.find({ author: "George Orwell" }).toArray());

    // 4. Update the price of a specific book
    console.log("\nUpdating price of 'Moby Dick'...");
    await books.updateOne(
      { title: "Moby Dick" },
      { $set: { price: 15.99 } }
    );

    // 5. Delete a book by its title
    console.log("\nDeleting 'Animal Farm'...");
    await books.deleteOne({ title: "Animal Farm" });

    // Task 3: Advanced Queries
    // -------------------

    // 6. Find books that are in stock and published after 1900
    console.log("\nBooks in stock & published after 1900:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 1900 } }).toArray());

    // 7. Projection - return only title, author, price
    console.log("\nBooks with only title, author, price:");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    // 8. Sort books by price ascending
    console.log("\nBooks sorted by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    // 9. Sort books by price descending
    console.log("\nBooks sorted by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    // 10. Pagination - page 1 (5 books)
    console.log("\nPagination (Page 1 - 5 books):");
    console.log(await books.find().limit(5).toArray());

    // 11. Pagination - page 2 (skip 5, next 5 books)
    console.log("\nPagination (Page 2 - next 5 books):");
    console.log(await books.find().skip(5).limit(5).toArray());

        // -------------------
    // Task 4: Aggregation Pipelines
    // -------------------

    // 12. Average price of books by genre
    console.log("\nAverage price of books by genre:");
    console.log(await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    // 13. Author with the most books
    console.log("\nAuthor with most books:");
    console.log(await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray());

    // 14. Group books by publication decade
    console.log("\nBooks grouped by decade:");
    console.log(await books.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
          count: { $sum: 1 }
        }
      },
      {
        $project: { decade: { $multiply: ["$_id", 10] }, count: 1, _id: 0 }
      },
      { $sort: { decade: 1 } }
    ]).toArray());

    // -------------------
    // Task 5: Indexing
    // -------------------

    // 15. Create an index on title
    console.log("\nCreating index on title...");
    await books.createIndex({ title: 1 });

    // 16. Compound index on author + published_year
    console.log("\nCreating compound index on author + published_year...");
    await books.createIndex({ author: 1, published_year: 1 });

    // 17. Use explain() to check performance of index
    console.log("\nExplain query with index:");
    console.log(await books.find({ title: "1984" }).explain("executionStats"));

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("\nConnection closed");
  }
}

runQueries();