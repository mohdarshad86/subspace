const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000

const { blogStats, searchBlogs } = require('./controllers/blogController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/blog-stats', blogStats);
app.get('/api/blog-search', searchBlogs);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});