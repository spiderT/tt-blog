var express = require('express');
var router = express.Router();

router.get('/list', function (req, res) {
    res.render('list', {
        title: 'List',
        items: [1991, '1212', 'express', 'Node.js']
    });
});

module.exports = router;
