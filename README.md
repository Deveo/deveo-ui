# Deveo UI

This project acts as a showcase for the Deveo UI components.

To get started you'll just need to run

    $ npm start

and access the app with your browser.

    $ open http://lvh.me:8000

## Acknowledgements

This project uses

* [npm][npm] to manage developer tools (such as [Gulp][gulp]),
* [Bower][bower] to manage frontend packages (such as [jQuery][jquery]), and
* [Gulp][gulp] to run project tasks (such as [SASS][sass] compilation and watching for file changes).

The Bower components of this project are exceptionally installed in `public/js/vendor/` instead of the default `bower_components/`.

## Project structure

Below you'll find short descriptions for the essential project directories and files.

| path                | description                           |
|:--------------------|:--------------------------------------|
| node_modules/       | the installed node modules            |
| public/css/         | contains all compiled CSS files       |
| public/fonts/       | contains all Deveo fonts              |
| public/js/          | contains all JavaScript files         |
| public/js/vendor/   | the installed bower components        |
| sass/               | contains all SASS files to compile    |
| .bowerrc            | project-specific Bower settings       |
| bower.json          | project-specific Bower dependencies   |
| gulpfile.js         | project-specific Gulp tasks           |
| package.json        | project-specific npm dependencies     |

[bower]:  http://bower.io/
[gulp]:   http://gulpjs.com/
[jquery]: http://jquery.com/
[npm]:    https://www.npmjs.org/
[sass]:   http://sass-lang.com/
