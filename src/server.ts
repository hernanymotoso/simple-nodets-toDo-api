import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import './database/instances/postgresql';

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running in ${process.env.APP_PORT}`);
});
