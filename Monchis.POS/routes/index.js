module.exports = function (routes, config) {

    routes.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};