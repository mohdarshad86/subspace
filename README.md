# Subspace Application

This repository contains a simple Express.js application that provides two REST API endpoints: `/api/blog-stats` and `/api/blog-search`. Below are instructions on how to clone the repository, navigate to the project directory, install dependencies, and make requests to these endpoints using cURL.

## Getting Started

Follow these steps to set up and run the Subspace Express application:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mohdarshad86/subspace.git

Navigate to the project directory:

```bash
cd subspace
```
Install the project dependencies:

```bash
npm install
```
Start the Express server:

```bash
npm start
```
The server should now be running on http://localhost:3000.

Making Requests
1. Get Blog Statistics
To retrieve blog statistics, make a GET request to the /api/blog-stats endpoint using cURL:

```bash
curl --request GET \
  --url http://localhost:3000/api/blog-stats
  ```
This command will fetch and return the cached blog statistics, including the total number of blogs, the title of the longest blog, the number of blogs with "privacy" in the title, and an array of unique blog titles.

2. Search Blogs
To search for blogs based on a query, make a GET request to the /api/blog-search endpoint with a query parameter. Replace <query> with your desired search query:

```bash
curl --request GET \
  --url 'http://localhost:3000/api/blog-search?query=privacy'
  ```

This command will return the cached search results for the specified query, where `privacy` is the keyword you want to search for in the blog titles.