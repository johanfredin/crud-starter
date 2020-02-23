const express = require('express');

const PORT = 3000;
const app = express();
const userRouter = require('./router/user-routes');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

app.listen(PORT, () => console.log(`Server listeing on port ${PORT}`));