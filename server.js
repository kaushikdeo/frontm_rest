const express = require('express');
const { Server } = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Food = require('./models/Food');


const app = express();
const router = express.Router();

mongoose.connect(process.env.dbUrl || 'mongodb+srv://kaushikmdeo:kaushik123@frontm.zltir.mongodb.net/frontm?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
// add sample foods to DB
try {
    db.once('open', async () => {
        if (await Food.countDocuments().exec() > 0) return
        for (let i = 0; i < 600; i++) {
            Food.create({
                itemName: `Food ${i}`,
                cusineType: i%5 === 0 ? 'continental' : 'indian',
                foodType: i%3 === 0 ? 'breakfast' : 'dinner',
                cost: i * 10,
                inventory: i*20,
            })
        }
    })
} catch (error) {
    console.log('error', error);
}

const PORT = process.env.port || 3000;
const sever = Server(app);

app.use(bodyParser.json());
app.use(router);
app.use((req, res, next) => {
    req.queryStartTime = process.hrtime();
    next();
})
app.use('/api', require('./routes'));
app.get('/', (req, res) => res.send('Welcome to FrontM'));

sever.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})