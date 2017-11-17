var db = require('./db');
//----------------------------------------------------
exports.get = function(query_json, collection_name, page, callback) {
        db.open(function(err, db) {
            db.collection(collection_name, function(err, collection) {
                if (err) throw err;
                else {
                    collection.count(query_json, function(err, total) {
                        collection.find(query_json, {
                            skip: (page - 1) * 10,
                            limit: 10
                        }).sort({
                            time: -1
                        }).toArray(function(err, docs) {
                            db.close();
                            if (err) throw err;
                            else {
                                callback(null, docs, total);
                            }
                        });
                    });
                }
            });
        });
    }
    //-------------------------------------------------------------
exports.get_nocount = function(query_json, collection_name, callback) {
    db.open(function(err, db) {
        db.collection(collection_name, function(err, collection) {
            if (err) throw err;
            else {
                collection.find(query_json).toArray(function(err, docs) {
                    if (err) throw err;
                    else {
                        callback(null, docs);
                        db.close();
                    }
                });
            }
        });
    });
}