var myWorker = new Worker('./demo1-worker.js', {
    name: 'demo1'
});

setTimeout(function () {
    console.log('main');
}, 1000)


myWorker.addEventListener('message', function (event) {
    var data = event.data;
    if(data.command === 'postDataToMain'){
        console.log('data.payload', data.payload)
    }
})
