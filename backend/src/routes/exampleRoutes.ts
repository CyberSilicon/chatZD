import express from 'express';
import { exampleFunction } from '../controllers/exampleController';

const router = express.Router();

router.get('/example', exampleFunction);

export default router;
