var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//读取网站的信息
User.get = function(name, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取user集合
        db.collection('user', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //查找用户名（name）值为name的一个文档
            collection.findOne({
                name: name
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
}


















//存储用户信息
//User = {save:function(callback){}}
User.prototype.save = function(callback) {
    //要存入数据库的用户文档
    var user = {
        name: this.name, //this-->reg.newUser
        password: this.password,
        email: this.email
    };
    mongodb.open(function(err, db) {
        if (err)
            return callback(err);
        db.collection('user', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将用户数据插入到user集合
            collection.insert(user, { safe: true }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err); //错误则返回err信息
                }
                callback(null, user[0]); //成功err为null，并返回用户存储后的用户文档
            });
        });
    });
};
// //读取用户的信息
// User.get = function(name, callback) {
//     mongodb.open(function(err, db) {
//         if (err) {
//             return callback(err);
//         }
//         //读取user集合
//         db.collection('user', function(err, collection) {
//             if (err) {
//                 mongodb.close();
//                 return callback(err);
//             }
//             //查找用户名（name）值为name的一个文档
//             collection.findOne({
//                 name: name
//             }, function(err, user) {
//                 mongodb.close();
//                 if (err) {
//                     return callback(err);
//                 }
//                 callback(null, user);
//             });
//         });
//     });
// }