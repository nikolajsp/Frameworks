var mongoose = require('mongoose');

// CommentSchema modellen
var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

// Upvote methode for comments
CommentSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
}

mongoose.model('Comment', CommentSchema);