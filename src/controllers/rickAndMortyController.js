import axios from 'axios';

export const getRickAndMortyCharacters = async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch characters' });
    }
};
