const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();
    // modified api call dummy images by fetching each album of post using and to fetch user data along with post and image data
    const postsWithImagesAndUsers = await Promise.all(
      posts.map(async post => {
        const photoResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
        );
        const photos = photoResponse.data.slice(0, 5); // Limit to 5 photos per post

        //fetching the user

        const user = await fetchUserById(post.userId);

        return {
          ...post,
          images: photos.map(photo => ({ url: photo.url })),
          user: user
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
              }
            : null,
        };
      }),
    );

    res.json(postsWithImagesAndUsers);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});

module.exports = router;
