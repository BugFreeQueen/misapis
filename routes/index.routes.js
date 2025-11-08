import { Router } from 'express';
import producto from './producto.routes.js';

const indexRoutes = Router();

indexRoutes.use('/producto', producto);

export default indexRoutes;
