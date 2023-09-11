// put your code there
if(typeof process === 'undefined'){
    globalThis.process = {
        env:{
            NODE_ENV: 'development'
        }
    };
}