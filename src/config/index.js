import { config } from "dotenv";
const { parsed } = config();

export const {
	DB,
	MODE,
	SECRET,
	BASE_URL,
	URL = `${BASE_URL}`,
	IN_PROD = MODE !== "prod",
} = parsed;

export const PORT = 4000 || process.env.PORT;