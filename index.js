const express = require('express');
const mongoose = require('mongoose')
const memberRouter = require('./router/member-router');

const dbUrl = 'mongodb://localhost:27017/members'
const PORT = 3000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(memberRouter);

// Start server
app.listen(PORT, () => console.log('Server running at port ' + PORT));

mongoose.connect(dbUrl, { useUnifiedTopology: true , useNewUrlParser: true}, (err) => {
    if (err) {
        console.error(`Could not connect to database at ${dbUrl}`)
        throw err;
    } 
}).then(() => console.info(`Connection established to db at ${dbUrl}`));
