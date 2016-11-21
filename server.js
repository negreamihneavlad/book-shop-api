var express = require('express');

var app = express();

var passport = require('passport');

var bookController = require('./controllers/book-controller.js');
var userController = require('./controllers/user-controller.js');

var authStrategy = require('./services/auth-strategy.js');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


passport.use(authStrategy);

app.get('/books/:bookId', bookController.findOne);

app.get('/books', bookController.list);

app.get('/search/:term', bookController.search);

app.post('/books', passport.authenticate('bearer', {session: false}), bookController.create);

app.put('/books/:bookId', passport.authenticate('bearer', {session: false}), bookController.update);

app.delete('/books/:bookId', passport.authenticate('bearer', {session: false}), bookController.destroy);

app.post('/login', userController.login);

app.post('/sign-up', userController.signUp);

app.put('/account/edit', passport.authenticate('bearer', {session: false}), userController.update);

app.put('/account/edit/change-password', passport.authenticate('bearer', {session: false}), userController.updatePassword);

app.put('/account/forgot-password', userController.forgotPassword);

app.put('/account/reset-password', userController.resetPassword);


app.listen(3000, function () {
    console.log('Book Shop API listening on port 3000!');
});
