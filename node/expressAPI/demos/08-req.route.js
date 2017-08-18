const express = require('express');
const app = express();

app.get('/user/:id?', (req, res) => {
    console.log(req.route)
});

app.listen(3000);
/*Route {
    path: '/user/:id?',
        stack:
    [ Layer {
        handle: [Function],
        name: '<anonymous>',
        params: undefined,
        path: undefined,
        keys: [],
        regexp: /^\/?$/i,
        method: 'get' } ],
        methods: { get: true } }*/
