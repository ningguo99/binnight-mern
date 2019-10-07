const mongoose = require('mongoose');
const areas = require('./routes/areas');
const express = require('express');
const config = require('config');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

mongoose.connect(config.db, { useNewUrlParser: true })
    .then(async () => {
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Fail to connect to MongoDB...', err));
app.use(cors());
app.use(express.json());
app.use('/api/areas', areas);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });


//console.log(process.env.NODE_ENV);

app.listen(port, () => console.log(`Listening on port ${port}...`));