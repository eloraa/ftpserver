const Videos = './public/videos';
const fs = require('fs');
exports.home = function (req, res, next) {
    fs.readdir(Videos, (err, file) => {
        if (err) throw new Error(err.message)

        res.render('index', {
            title: 'FTP',
            fileList: file
        });

    })
}
exports.videos = function (req, res, next) {
    fs.readdir(Videos, (err, file) => {
        if (err) throw new Error(err.message)

        res.render('videos', {
            title: 'FTP',
            fileList: file
        });

    })
}