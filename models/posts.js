var mongoose = require('mongoose');

// PostSchema modellen
var PostSchema = new mongoose.Schema({
	title: String,
  	link: String,
  	upvotes: {type: Number, default: 0},
  	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// Upvote methode for posts
PostSchema.methods.upvote = function(cb) {
	this.upvotes += 1;
	this.save(cb);
}

mongoose.model('Post', PostSchema);