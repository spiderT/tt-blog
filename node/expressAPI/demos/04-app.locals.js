const express = require('express');
const app = express();

app.locals.title = 'My App';
app.locals.strftime = require('strftime');

console.log(app.locals);