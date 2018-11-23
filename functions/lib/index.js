"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const firebase = admin.initializeApp(functions.config().firebase);
const db = firebase.database();
const app = express();
const main = express();
main.use('/store/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
const orderList = 'orders';
exports.orderAPI = functions.https.onRequest(main);
// Add new order
app.post('/order', (req, res) => {
    return firebase.database().ref('/orders').
        push(req.body).then(success => {
        res.send('Create a new order');
    });
});
// Update new order
app.patch('/order/:orderId', (req, res) => {
    return firebase.database().ref('/orders/').child(req.params.orderId).
        update(req.body).then(success => {
        res.send('Update a new order');
    });
});
// View a order
app.get('/orders/:orderId', (req, res) => {
    return firebase.database().ref('/orders').child(req.params.orderId).
        once('value').then(function (snap) {
        res.status(200).json({ order: snap.val() });
    });
});
// View all orders
app.get('/orders', (req, res) => {
    return firebase.database().ref('/orders').once('value').then(function (snap) {
        res.status(200).json({ orders: snap.val() });
    });
});
// Delete a order 
app.delete('/order/:orderId', (req, res) => {
    return firebase.database().ref('/orders').child(req.params.orderId).
        remove().then(success => {
        res.send('order is deleted');
    });
});
//# sourceMappingURL=index.js.map