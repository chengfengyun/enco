var express = require('express');
var router = express.Router();
var get_data = require('../models/get.js');
//引入分词模块
var Segment = require('segment');
var segment = new Segment();
// segment.loadStopwordDict('en.txt');
segment.useDefault();

router.get('/', function(req, res, next) {
    var query_txt = req.query.query_text;
    //FIXED:modify the value of data
    var data = ''; //mongodb 查询name: 处理之后的data
    var page_num = req.query.page_num ? parseInt(req.query.page_num) : 1;

    var a_go = "&query_text=" + query_txt;

    if (query_txt) {
        var query_txt_arr = segment.doSegment(query_txt, {
            simple: true, //只出现分词的内容
            stripPunctuation: true //去标点
        }); //返回一个分词过后的数组
        var query_txt_arr_len = query_txt_arr.length;

        //获得['/abc/','/def/'] 这种格式，使得mongodb能够模糊查询
        for (var i = 0; i < query_txt_arr_len - 1; i++) {
            data = data + '/' + query_txt_arr[i] + '/' + ',';
        }
        data += '/' + query_txt_arr[i] + '/';
    }
    if (!data) { data = '/null/' }
    // eval('[' + data[0] + ']') 把['/abc/']转化成[/abc/]
    // console.log(data);
    // console.log(eval('[' + data + ']'));


    // console.log(query_txt_arr);
    //-----------------
    // { 'name': { $in: eval('[' + data + ']') }}
    var data_text = { name: 'null' };
    for (var item in query_txt_arr) {
        if (query_txt_arr[item].indexOf('game') > -1) {
            data_text = {};
        }
    }
    console.log(data_text);
    get_data.get(data_text, 'bussiness', page_num, function(err, docs, total) {
        if (err) {
            req.flash('error', 'An unknown error occurred');
            throw err;
            // res.redirect('/link');
        } else {
            var ispre = true;
            var isnext = true;
            if (page_num - 1 <= 0) {
                ispre = false;
            }
            if (page_num > parseInt(total / 10)) {
                isnext = false;
            }
            // console.log(ispre);
            // console.log(isnext);
            // console.log(parseInt(total / 10));

            res.render('link', {
                mes: docs,
                query: query_txt,
                segment_arr: query_txt_arr,
                isnext: isnext,
                ispre: ispre,
                pre_page: page_num - 1,
                next_page: page_num + 1,
                istotal: Boolean(total),
                go: a_go,
                // istotal: boolean(total),
                error: req.flash('error').toString()
            });
        }
    });
});
module.exports = router;