var requireDir = require('require-dir-all');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks/', {
    recursive:    true,
    includeFiles: /^.*\.(js)$/,
    excludeDirs:  /^(\.git|tasks)$/
});