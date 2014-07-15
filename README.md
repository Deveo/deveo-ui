# Deveo UI

This project acts as a showcase for the Deveo UI components.

To get started, you'll first need to run SASS compilation,

    $ grunt sass

then start up the server,

    $ node app.js 

and finally access the app with your browser.

    $ open http://lvh.me:8000

## Acknowledgements

This project uses

* npm to manage developer tools (such as Grunt),
* Bower to manage frontend packages (such as jQuery), and
* Grunt to run project tasks (such as SASS compilation).

The Bower components of this project are exceptionally installed in `public/js/vendor/` instead of the default `bower_components/`.

## Project structure

Below you'll find short descriptions for the essential project directories and files.

| path                | description                           |
|:--------------------|:--------------------------------------|
| node_modules/       | the installed node modules            |
| public/css/         | contains all compiled `.css` files    |
| public/fonts/       | contains all Deveo fonts              |
| public/js/          | contains all JavaScript files         |
| public/js/vendor/   | the installed bower components        |
| sass/               | contains all `.scss` files to compile |
| .bowerrc            | project-specific Bower settings       |
| app.js              | the application file to run           |
| bower.json          | project-specific Bower dependencies   |
| Gruntfile.js        | project-specific Grunt tasks          |
| package.json        | project-specific npm dependencies     |
