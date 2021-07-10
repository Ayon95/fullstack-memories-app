// shape of a post without _id, _v, likes, and createdAt
// this is the expected request body for POST request
export type BasePost = {
	title: string;
	author: string;
	description: string;
	tags: string[];
	selectedFile: string;
};

// shape of Post doc
export type PostDoc = BasePost & {
	_id: string;
	likes: number;
	createdAt: string;
};
