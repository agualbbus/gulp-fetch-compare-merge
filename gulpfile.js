var exec = require('exec-chainable');
var gulp = require('gulp');
var git = require('gulp-git');

var head={};
gulp.task('head', function() {
    exec('git rev-list master -n 1').then(function (stdout) {
        head.local=stdout;
        exec('git rev-list origin/master -n 1').then(function(stdout){
            head.origin=stdout;
        })
        .done(function (stdout) {
              if (head.origin!==head.local){
                  git.merge('origin/master', function (err) {
                    if (err) throw err;
                  });
              }
        });

    })


//    head=exec('git rev-list HEAD -n 1', function (err, stdout, stderr){
//       return  stdout.trim();
//    });
//    console.log(head)
});
