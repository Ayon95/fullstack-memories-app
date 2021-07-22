const PORT: number = Number.parseFloat(process.env.PORT!);
const MONGO_URL = process.env.MONGO_URL!;
const JWT_SECRET = process.env.SECRET!;
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;
const POSTS_PER_PAGE = 6;
const POST_POPULATE_OPTIONS = [
	{ path: 'author', select: { _id: 1, firstName: 1, lastName: 1 } },
	{
		path: 'comments',
		populate: {
			path: 'author',
			select: { _id: 1, firstName: 1, lastName: 1 },
		},
	},
];

const config = {
	PORT,
	MONGO_URL,
	JWT_SECRET,
	GOOGLE_OAUTH_CLIENT_ID,
	POSTS_PER_PAGE,
	POST_POPULATE_OPTIONS,
};

export default config;
