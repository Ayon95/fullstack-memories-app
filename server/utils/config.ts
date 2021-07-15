const PORT: number = Number.parseFloat(process.env.PORT!);
const MONGO_URL = process.env.MONGO_URL!;
const JWT_SECRET = process.env.SECRET!;
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID!;

const config = {
	PORT,
	MONGO_URL,
	JWT_SECRET,
	GOOGLE_OAUTH_CLIENT_ID,
};

export default config;
