import express from 'express';
import { createCharacter, getCharacters, updateCharacter, deleteCharacter } from '../controllers/charactersController.js';

const router = express.Router();

router.post('/',createCharacter);
router.get('/',getCharacters);
router.put('/:id',updateCharacter);
router.delete('/:id',deleteCharacter);

export default router;
