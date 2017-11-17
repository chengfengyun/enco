var db = require('./db');

function post() {}
var message = [];

module.exports = post;
post.get = function(callback) {
    db.open(function(err, db) {
        db.collection("post", function(err, collection) {
            if (err) throw err;
            else {
                collection.find({}).toArray(function(err, docs) { //docs--文档实例
                    if (err) throw err;
                    else {
                        // message = callback(null, docs);
                        // db.close();
                        // console.log(callback(null, docs));
                        callback(null, docs);
                    }
                });
            }
        });
    });
};
post.getPage = function(name, page, callbackfn) {
    db.open(function(err, db) {
        if (err) {
            return callbackfn(err);
        }
        db.collection('post', function(err, collection) {
            if (err) {
                mongodb.close();
                return callbackfn(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //使用count 返回特定查询的文档数
        })
        collection.count(query, function(err, total) {
            collection.find(query, {
                skip: (page - 1) * 10,
                limit: 10
            }).sort({ time: -1 }).toArray(function(err, docs) {
                mongodb.close();
                if (err) {
                    return callbackfn(err);
                }
                //解析markdown 为HTML
                docs.forEach(function(doc) {
                    doc.post = doc.post;
                });
                callbackfn(null, docs, total);
            });
        });
    });
};