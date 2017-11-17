exports.download = function(req, res) {
    var path = 'public/file.tor'; // 文件存储的路径

    // filename:设置下载时文件的文件名，可不填，则为原名称
    filepath = '/download/ind-1.tor';
    filename = 'test.tor'
    console.log(filepath);
    res.download(filepath, filename);
};