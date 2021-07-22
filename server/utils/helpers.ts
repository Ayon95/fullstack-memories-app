import Post from '../models/Post';
import config from './config';

// this function will return a list of paginated posts
export async function getPaginatedPosts(page: number) {
	// the index of the very first item of the page
	const startIndex = (page - 1) * config.POSTS_PER_PAGE;
	try {
		// getting a specific number of posts starting from the start index (we don't want to get posts from previous pages)
		// sorting the posts from newest to oldest
		// populating the author field of each post with _id, firstName, and lastName
		// populating the comments field, and the author field inside the comments field (nested populate)
		return await Post.find({})
			.skip(startIndex)
			.limit(config.POSTS_PER_PAGE)
			.sort({ _id: -1 })
			.populate(config.POST_POPULATE_OPTIONS);
	} catch (error) {
		throw error;
	}
}
