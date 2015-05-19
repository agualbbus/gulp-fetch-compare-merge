var exec = require('exec-chainable');
var gulp = require('gulp');
var git = require('gulp-git');


gulp.task('fetch', function(){
  git.fetch('origin', '', {args: ''}, function (err) {
    if (err) throw err;
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


//    head=exec('git rev-list HEAD -n 1', function (err, stdout, stderr){
//       return  stdout.trim();
//    });
//    console.log(head)
});
