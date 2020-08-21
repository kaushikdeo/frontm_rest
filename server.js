const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const router = express.Router();

mongoose.connect(process.env.dbUrl || 'mongodb+srv://kaushikmdeo:kaushik123@frontm.zltir.mongodb.net/frontm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.port || 3000;
const sever = Server(app);

app.use(bodyParser.json());
app.use(router);
app.use('/api', require('./routes'));
app.get('/', (req, res) => res.send('Welcome to FrontM'));

sever.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})