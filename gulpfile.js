"use strict";

var exec = require('exec-chainable');
var gulp = require('gulp');
var git = require('gulp-git');
var Q = require('q');



gulp.task('fetch', function(){
    return exec('git fetch');
});
 
var existsUpdates=false;//we use this variable to enable/disable build tasks

gulp.task('merge',['fetch'], function() {
    var head={},
        deferred = Q.defer();//we will use a promise so that gulp syncs with our async tasks

    exec('git rev-list master -n 1').then(function (stdout) {

        head.local=stdout;
        console.log('local head is',head.local);
        
        exec('git rev-list origin/master -n 1').then(function(stdout){

            head.origin=stdout;
            console.log('remote head is',head.origin);

        })
        .then(function (stdout) {
            if (head.origin!==head.local){

                git.merge('origin/master', function (err) {

                  if (err) {
                      throw err;
                  }
                  else{
                    existsUpdates=true;//builds enabled
                    console.log('merged');
                    return deferred.resolve();//let gulp return from the task
                  }
                });

            }
            else{
                console.log('no need to merge');
                return deferred.resolve();//let gulp return from the task
            }

        });

    })

    return deferred.promise;

});

gulp.task('build',['merge'], function() {

    if (existsUpdates){
        return console.log('your building stuff');
    }
    else{
        return console.log('nothing to build');
    }

})

