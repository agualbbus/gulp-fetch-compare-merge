var exec = require('exec-chainable');
var gulp = require('gulp');
var git = require('gulp-git');


gulp.task('fetch', function(){
    return exec('git fetch').then(function(stdout){

    });
});
 

gulp.task('merge',['fetch'], function() {
    var head={};
    exec('git rev-list master -n 1').then(function (stdout) {
        head.local=stdout;
        console.log('local is',head.local)
        
        exec('git rev-list origin/master -n 1').then(function(stdout){
            head.origin=stdout;
            console.log('remote is',head.origin)
        })
        .done(function (stdout) {
              if (head.origin!==head.local){
                  git.merge('origin/master', function (err) {
                    if (err) throw err;
                    console.log('merged')   
                  });
              }
        });

    })
});

