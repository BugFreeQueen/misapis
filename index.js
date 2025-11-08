import Server from './server/server.js';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const server = new Server();
server.listen();

console.log('API de venta de juguetes iniciada'.green);
