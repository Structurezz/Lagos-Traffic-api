
import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const BASE_URL = process.env.BASE_URL;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3000;
