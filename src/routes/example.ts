// routes/exampleRoutes.ts

import express, { Router } from 'express';
import exampleController from '../controllers/exampleController';

const router: Router = express.Router();

// Define your routes here
router.get('/example', exampleController.getExample);

export default router;
