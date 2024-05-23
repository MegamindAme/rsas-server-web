const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Or any port you prefer

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'public/build')));

// For all other routes, return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});