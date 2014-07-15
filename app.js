(function () {

    "use strict";

    var connect = require('connect'),
        serve   = require('serve-static'),
        app     = connect();

    app.use(serve('public', {
        index: ['index.html']
    }));

    app.listen(8000, function () {
        console.log('Listening on port 8000');
    });

})();
