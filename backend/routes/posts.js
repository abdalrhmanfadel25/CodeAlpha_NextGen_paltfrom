const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['username', 'avatar']).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a post
router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { content, image } = req.body;
  try {
    let imageUrl = '';
    if (req.file) {
      // File upload
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } else if (image && image.startsWith('data:image/')) {
      // Base64 image string
      const result = await cloudinary.uploader.upload(image, {
        upload_preset: 'ml_default',
      });
      imageUrl = result.secure_url;
    } else if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
      // Direct image URL: upload to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        upload_preset: 'ml_default',
        fetch_format: 'auto',
      });
      imageUrl = result.secure_url;
    }
    const user = await User.findById(req.user.id);
    const newPost = new Post({
      content,
      image: imageUrl,
      user: req.user.id,
    });
    const post = await newPost.save();
    const populatedPost = await Post.findById(post._id).populate('user', ['username', 'avatar']);
    res.json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like/unlike a post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.likes.some((like) => like.equals(req.user.id))) {
      post.likes = post.likes.filter((like) => !like.equals(req.user.id));
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    const updatedPost = await Post.findById(post._id).populate('user', ['username', 'avatar']);
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a comment to a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const comment = {
      user: req.user.id,
      text: req.body.content,
      createdAt: new Date(),
    };
    post.comments.push(comment);
    await post.save();
    const updatedPost = await Post.findById(post._id).populate('user', ['username', 'avatar']);
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;