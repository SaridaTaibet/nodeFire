import * as functions from 'firebase-functions';
import * as express from "express";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

let hostels = [
    {
        id: 1,
        name: 'hotel rose1',
        roomNumbers: 10,
        pool: true
    },
    {
        id: 2,
        name: 'hotel rose2',
        roomNumbers: 10,
        pool: true
    },
    {
        id: 3,
        name: 'hotel rose3',
        roomNumbers: 11,
        pool: true
    }
];


const app = express();

app.get('/read', (req, res) => {
    res.send(hostels).status(200)
});


app.get('/read/:id', (req, res) => {
    res.send(hostels[req.params.id]).status(200)
});

    app.post('/create', (req, res) => {
    hostels.push(req.body);
    res.send(hostels).status(201)
});

app.put('/update/:id', (req, res) => {
    const hostel = hostels.filter(value => value.id !== parseInt(req.params.id));
    hostel.push(req.body);
    res.send(hostel).status(200);
});

app.patch('/update1/:id', (req, res) => {
    const [hostel] = hostels.filter(value => value.id === parseInt(req.params.id));
    console.log(req.params.id);
    const data = req.body;
    let newHostel = Object.assign(hostel, data);
    res.send(newHostel).status(200);
});


app.delete('/delete/:id', (req, res) => {
    const newhostels = hostels.filter(value => value.id !== parseInt(req.params.id));
    res.send(newhostels).status(200)
});


app.delete('/delete', (req, res) => {
    hostels = [];
    hostels.push(req.body);
    res.send(hostels).status(200);
});



export const hello = functions.https.onRequest(app);


/*
var firebaseConfig = {
   apiKey: "AIzaSyAiZxJcLtdp4xpIWuWqgR2F4fQtQhJsrjc",
   authDomain: "cambrai-59400.firebaseapp.com",
   databaseURL: "https://cambrai-59400.firebaseio.com",
   projectId: "cambrai-59400",
   storageBucket: "cambrai-59400.appspot.com",
   messagingSenderId: "558929941782",
   appId: "1:558929941782:web:e372ace67565bda7"
};
 */