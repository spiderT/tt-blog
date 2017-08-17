const express = require('express');
const app = express();

app.set('title','My site')
console.log(app.get('title'));//My site