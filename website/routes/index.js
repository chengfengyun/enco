var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    // var str = 'SELECT * FROM hotspot AS result';
    // var conn = mysql.createConnection(settings.db);
    // // var sessionStore = new MySQLStore({} /* session store options */ , conn);

    // conn.connect();
    // conn.query(str, function(err, rows, fields) {
    //     // console.log(rows);
    //     if (err) {
    //         req.flash('error', '数据查询有误');
    //     }
    //     if (!err) {

    //     }
    // });
    // conn.end();
    res.render('index', {
        title: 'index'
    });

});

module.exports = router;