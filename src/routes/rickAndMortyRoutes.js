import express from 'express';
import { getRickAndMortyCharacters } from '../controllers/rickAndMortyController.js';

const router = express.Router();

router.get('/', getRickAndMortyCharacters);

export default router;
