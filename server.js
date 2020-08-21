import express from 'express';
import { Server } from 'http';

const app = express();

const PORT = process.env.port || 3000;

const sever = Server(app);

sever.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})