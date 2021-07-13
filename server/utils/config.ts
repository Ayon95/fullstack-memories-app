const PORT: number = Number.parseFloat(process.env.PORT!);
const MONGO_URL = process.env.MONGO_URL!;

const config = {
	PORT,
	MONGO_URL,
};

export default config;
