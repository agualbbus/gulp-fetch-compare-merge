var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');

gulp.task('git-watch', function() {
    gitWatch({
        gitPull: ['git', 'pull', 'origin', 'master'],
        //forceHead: true
    })
        .on('check', function() {
            console.log('CHECK!');
        })
        .on('change', function(newHash, oldHash) {
            console.log('CHANGES! FROM', oldHash, '->', newHash);
        });
});