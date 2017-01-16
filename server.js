require('dotenv').config();
var express = require('express');
var passport = require('passport');
var bookController = require('./controllers/book-controller.js');
var userController = require('./controllers/user-controller.js');
var orderController = require('./controllers/order-controller.js');
var orderItemController = require('./controllers/order-item-controller.js');
var shippingController = require('./controllers/shipping-controller.js');
var checkOutController = require('./controllers/check-out-controller.js');
var authStrategy = require('./services/auth-strategy.js');
var braintree = require('./controllers/braintree-controller.js');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

passport.use(authStrategy);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    next();
});

//////////Books
app.get('/books/:bookId', bookController.findOne);
app.get('/books', bookController.list);
app.get('/categories', bookController.categories);
app.get('/publishers', bookController.publishers);
app.get('/authors', bookController.authors);
app.get('/length', bookController.length);
app.get('/search', bookController.search);
app.post('/books', passport.authenticate('bearer', {session: false}), bookController.create);
app.put('/books/:bookId', passport.authenticate('bearer', {session: false}), bookController.update);
app.delete('/books/:bookId', passport.authenticate('bearer', {session: false}), bookController.destroy);

//////////User
app.post('/login', userController.login);
app.post('/sign-up', userController.signUp);
app.put('/account/edit', passport.authenticate('bearer', {session: false}), userController.update);
app.put('/account/edit/change-password', passport.authenticate('bearer', {session: false}), userController.updatePassword);
app.put('/account/forgot-password', userController.forgotPassword);
app.put('/account/reset-password', userController.resetPassword);
app.get('/checkEmail', userController.existingEmail);

//////////Orders
app.post('/order', passport.authenticate('bearer', {session: false}), orderController.create);
app.get('/order', passport.authenticate('bearer', {session: false}), orderController.checkOrder);
app.delete('/order', passport.authenticate('bearer', {session: false}), orderController.destroy);

//////////Order Items
app.post('/orderItem', orderItemController.create);
app.get('/orderItem', orderItemController.list);
app.put('/orderItem/:itemId', orderItemController.update);
app.delete('/orderItem/:itemId', orderItemController.destroy);

//////////Shipping Details
app.post('/shipping', shippingController.create);
app.get('/shipping', shippingController.list);
app.put('/shipping/:shippingId', shippingController.update);
app.delete('/shipping', shippingController.destroy);

//////////Check out
app.post('/check-out', checkOutController.checkOut);

//////////Braintree
app.get('/client-token', braintree.clientToken);
app.post('/checkout', braintree.payment);

app.listen(3000, function () {
    console.log('Book Shop API listening on port 3000!');
});
