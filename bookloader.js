import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  password: "mrcool10",
  database: "LMS",
  host: "localhost",
  port: 3000,
});
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    createTablesAndSeedData();
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });
  let upload = async(title,author)=>{
    try {
        // Insert the new book into the database
        await db.query("INSERT INTO books (title, author) VALUES ($1, $2)", [
          title,
          author,
        
        ]);
        
       console.log("book added successfully");
      } catch (error) {
        console.log("error",title,error);
      }
    }
    import fs from 'fs';

    // Function to read the CSV file and return the required data
    function readBooksCSV(filePath) {
      const booksData = [];
    
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            reject(err); // Reject the promise if there's an error reading the file
            return;
          }
    
          // Splitting the data by lines
          const lines = data.trim().split('\n');
    
          // Extracting data from each line
          for (let i = 1; i < lines.length; i++) { // starting from index 1 to skip the header line
            const line = lines[i].split(','); // Splitting each line by commas
            const [id, title, author, status] = line;
    
            // Pushing the extracted data to the booksData array
            booksData.push({ title, author, status });
          }
    
          resolve(booksData); // Resolve the promise with the booksData array
        });
      });
    }
    
    // Usage example

      function createTablesAndSeedData(){
        const filePath = 'static/books.csv';
    
        readBooksCSV(filePath)
          .then((books) => {
            // Logging the extracted data for each book
            books.forEach((book) => {
              //console.log(`Title: ${book.title}, Author: ${book.author}, Status: ${book.status}`);
                 upload(book.title,book.author)
            });
          })
          .catch((error) => {
            console.error('Error reading CSV file:', error);
          });
      };
    