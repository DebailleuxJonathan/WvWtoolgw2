if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOveride = require('method-override');

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

app.set('view engine','ejs');
app.set('views',__dirname+ '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(methodOveride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',  ()  => console.log('Connect to DB'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 3000);
