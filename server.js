import express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

mongoose.connect(process.env.dbUrl || 'mongodb+srv://kaushikmdeo:kaushik123@frontm.zltir.mongodb.net/frontm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.port || 3000;
const sever = Server(app);

app.use(bodyParser.json());

sever.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})