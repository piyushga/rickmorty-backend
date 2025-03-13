import pool from "../config/db.js";

export const createUser = async (username, email, hashedPassword) => {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING id, username, email;
    `;
    const values = [username, email, hashedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1;";
    const { rows } = await pool.query(query, [email]);
    return rows[0]; // Return user if found
};
