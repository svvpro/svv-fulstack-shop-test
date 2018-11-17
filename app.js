const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const authRouter = require('./routes/auth');
const analiticsRouter = require('./routes/analitics');
const categoryRouter = require('./routes/category');
const positionRouter = require('./routes/position');
const orderRouter = require('./routes/order');

mongoose.connect(keys.mongoUrl,  { useNewUrlParser: true, useCreateIndex: true } )
    .then(()=> console.log('MongoDB connected...'))
    .catch((error) => console.warn(error));

app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
require('./middleware/passport')(passport);


app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/analytics', analiticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/position', positionRouter);
app.use('/api/order', orderRouter);

module.exports = app;