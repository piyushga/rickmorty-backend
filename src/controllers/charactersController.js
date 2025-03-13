import pool from '../config/db.js';

// ✅ Create a new character
export const createCharacter = async (req, res) => {
    try {
        const { name, species, status, gender, origin, image } = req.body;
        const user_id = 1; // Temporary static user ID

        const newCharacter = await pool.query(
            `INSERT INTO characters (user_id, name, species, status, gender, image) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [user_id, name, species, status, gender, image]
        );

        res.status(201).json({ message: 'Character created successfully', character: newCharacter.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// ✅ Get all characters for static user
export const getCharacters = async (req, res) => {
    try {
        const user_id = 1; // Temporary static user ID

        const characters = await pool.query(
            `SELECT * FROM characters WHERE user_id = $1`, 
            [user_id]
        );

        res.status(200).json(characters.rows);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

export const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        // Remove 'origin' and only use the columns that exist in your database
        const { name, species, status, gender, image } = req.body;
        const user_id = 1; // Temporary static user ID
        
        // Validate input data
        if (!name || !species || !status || !gender) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                required: ['name', 'species', 'status', 'gender'] 
            });
        }
        
        // Ensure ID is a number
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid character ID' });
        }
        
        // Define default value for optional image
        const characterImage = image || null;
        
        const updatedCharacter = await pool.query(
            `UPDATE characters SET name=$1, species=$2, status=$3, gender=$4, image=$5 
             WHERE id=$6 AND user_id=$7 RETURNING *`,
            [name, species, status, gender, characterImage, numericId, user_id]
        );

        if (updatedCharacter.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Character not found or not authorized',
                details: `Character with ID ${numericId} was not found or you don't have permission to update it`
            });
        }

        res.status(200).json({ 
            message: 'Character updated successfully', 
            character: updatedCharacter.rows[0] 
        });
    } catch (error) {
        console.error('Error updating character:', error);
        
        // Provide more detailed error messages based on error type
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Duplicate entry not allowed' });
        } else if (error.code === '23503') {
            return res.status(400).json({ error: 'Referenced entity does not exist' });
        } else if (error.code && error.code.startsWith('22')) {
            return res.status(400).json({ error: 'Data type mismatch in input data' });
        }
        
        res.status(500).json({ 
            error: 'Server Error', 
            message: error.message || 'Unknown database error occurred'
        });
    }
};

// ✅ Delete a character
export const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = 1; // Temporary static user ID

        const deletedCharacter = await pool.query(
            `DELETE FROM characters WHERE id=$1 AND user_id=$2 RETURNING *`,
            [id, user_id]
        );

        if (deletedCharacter.rows.length === 0) {
            return res.status(404).json({ error: 'Character not found or not authorized' });
        }

        res.status(200).json({ message: 'Character deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
