const path = require('path');
const express = require('express');

const app = express();
const PORT = 8080;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

app.use('/board', require('./controllers/routes'));

app.get('/', (req, res) => {
	res.redirect('/board');
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});