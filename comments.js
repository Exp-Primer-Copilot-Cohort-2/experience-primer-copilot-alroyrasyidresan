// Create web server
const express = require('express');
const router = express.Router();

// Import comment model
const Comment = require('../models/Comment');

// Get all comments
router.get('/', (req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new comment
router.post('/add', (req, res) => {
    const newComment = new Comment(req.body);
    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete comment
router.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update comment
router.post('/update/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.name = req.body.name;
            comment.comment = req.body.comment;

            comment.save()
                .then(() => res.json('Comment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;