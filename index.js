const express = require('express');
const app = express();
require('dotenv').config();

//Controllers
const { blogStats, searchBlogs } = require('./controllers/blogController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/blog-stats', blogStats);
app.get('/api/blog-search', searchBlogs);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});