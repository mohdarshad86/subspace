const _ = require('lodash');
const axios = require('axios');

const fetchBlogs = async () => {
    try {
        const apiUrl = process.env.API_URL;
        const secret = process.env.SECRET;

        const response = await axios.get(apiUrl, {
            headers: {
                'x-hasura-admin-secret': secret,
            },
        });

        return response.data.blogs;       

    } catch (error) {
        console.error('Error fetching blog data:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const getCachedBlogStats = _.memoize(async () => {
    try {
        const blogs = await fetchBlogs();

        const totalBlogs = blogs.length;
        const longestBlog = _.maxBy(blogs, 'title.length');
        const blogsWithPrivacy = _.filter(blogs, (blog) => _.includes(_.toLower(blog.title), 'privacy'));
        const uniqueBlogTitles = _.uniqBy(blogs, 'title');

        return {
            totalBlogs,
            longestBlog: longestBlog.title,
            blogsWithPrivacy: blogsWithPrivacy.length,
            uniqueBlogTitles,
        };
    } catch (error) {
        console.error('Error in blog fetch:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

const blogStats = async (req, res) => {
    try {
        const cachedBlogResult = await getCachedBlogStats();

        return res.status(200).send(cachedBlogResult);


    } catch (error) {
        console.error('Error in blog stats:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const getCachedBlogSearchResults = _.memoize(async (query) => {
    try {
        if (!query) {
            return res.status(400).send({ error: 'Query parameter is required' });
        }

        const blogs = await fetchBlogs();

        const filteredBlogs = _.filter(blogs, (blog) =>
            _.includes(_.toLower(blog.title), _.toLower(query))
        );

        return { results: filteredBlogs };
    } catch (error) {
        console.error('Error in blog search:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

const searchBlogs = async (req, res) => {
    try {
        const { query } = req.query;

        const cachedSearchResult = await getCachedBlogSearchResults(query);

        return res.send({ results: cachedSearchResult });
    } catch (error) {
        console.error('Error in blog search:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = { blogStats, searchBlogs }