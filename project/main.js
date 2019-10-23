// configure module's directory
require.config({
    baseUrl: './',
    paths: {
        "app": "app",
        "p5": 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min'
    }
});

require(["app"]);
