var express = require('express');
var router = express.Router();
var get_data = require('../models/get.js');
var bson_objectid = require('bson-objectid');

router.get('/:id', function(req, res, next) {
    var _id = bson_objectid(req.params.id); //ObjectId('24位16进制数')
    get_data.get_nocount({ '_id': _id }, 'bussiness', function(err, docs) {
        if (err) throw err;
        else {
            res.render('list', {
                mes: docs[0],
            })
        }
    });
    // next();
})

// .get('/[a-z0-9]{24}/\?*', function(req, res, next) {
//     res.download('E:/rep_node/web.enco/download/ind-1.tor');
//     // console.log('--------/[a-z0-9]{24}\?*------------');
// });

module.exports = router;
// console.log(req.params)
// res.send('req.params.id');
// console.log(req.params._id);