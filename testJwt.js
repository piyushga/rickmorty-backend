import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const secret = process.env.JWT_SECRET || 'your_fallback_secret'; // Ensure JWT_SECRET is loaded
const token = ""; // Use your actual JWT token

try {
    const decoded = jwt.verify(token, secret);
    console.log("Decoded Token:", decoded);
} catch (error) {
    console.error("JWT Verification Error:", error);
}
