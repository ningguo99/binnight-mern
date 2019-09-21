const mongoose = require('mongoose');
const areas = require('./routes/areas');
const express = require('express');
const config = require('config');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(config.db, { useNewUrlParser: true })
    .then(async () => {
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Fail to connect to MongoDB...', err));

app.use(express.json());
app.use('/api/areas', areas);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//console.log(process.env.NODE_ENV);

app.listen(port, () => console.log(`Listening on port ${port}...`));