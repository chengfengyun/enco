var express = require('express');
var router = express.Router();

// router.get('/list/[a-z0-9]{24}\?*', file.download);
router.get('/:id', function(req, res, next) {
    // var filepath = 'E:/rep_node/web.enco/download/' + req.originalUrl.split('/')[2] + '.tor';
    var filepath = 'E:/rep_node/web.enco/download/' + req.originalUrl.split('/')[2];
    res.download(filepath);
});

module.exports = router;