import express from 'express';
import cors from 'cors';
import path from 'path';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.generalRoute = '/api/';

    this.conectarDBMongo();
    this.middlewares();
    this.routes();
  }

  async conectarDBMongo() {
    if (!db.isConected) await db.conectarAMongoDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

  }

  routes() {
    this.app.use(this.generalRoute, indexRoutes);
    this.app.use('**', (req, res) => {
      res.status(404).json({ msg: 'Ruta no encontrada' });
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor corriendo en puerto ${this.port}`.yellow)
    );
  }
}
