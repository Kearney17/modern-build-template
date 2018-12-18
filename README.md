# Modern Build Template

This app is a starting point for working Sass to generate CSS and ES6 to build javascript modules. It is not designed to work with older browsers that do not support the latest javascript standards. However, Babel could easily be integrated into a Gulp compile process to enable older browser support. Gulp CLI is used to run tasks for all build processes.

## Getting started

**You must have node and npm installed**

- Run `npm install` to pull in all node modules
- Run the `gulp` task to see all available tasks

### Gulp Tasks

The `gulp sync` task is the most helpful for development, it streamlines the update code, save, refresh loop. Please note, if the compile task crashes (eg. bad sass syntax, etc) the `gulp sync` task will need to be terminated. Running the `gulp compile` task can help troubleshoot the issue, once resolved the `gulp sync` task can be restarted.

#### Helpers

- `gulp` and `gulp default` will display the available gulp tasks

#### Compile

- `gulp compile` will compile sass into a css file and output it into the `src/css` directory
- `gulp sync` launches a browser using BrowserSync. This will watch for file changes to sass, javascript, and the index.html and inject the changes into the browser (or refresh)

#### Build

- `gulp build` will run the compile task, plus minify the output into the `dist` directory for consumption
