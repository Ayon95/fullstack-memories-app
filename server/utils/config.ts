const PORT: number = Number.parseFloat(process.env.PORT!);
const MONGO_URL = process.env.MONGO_URL!;
const JWT_SECRET = process.env.SECRET!;

const config = {
	PORT,
	MONGO_URL,
	JWT_SECRET,
};

export default config;
