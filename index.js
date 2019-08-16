const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// init middleware
app.use(logger) // use middleware

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// homepage route
app.get('/', (req, res) => res.render('index', {
	title: 'Member App',
	members
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// res.render renders html templates
// app.get('/', (req, res) => {
// 	console.log('home page /');
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// middleware to re-route the /api/members to the router file
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Express server started on port ${PORT}`));
