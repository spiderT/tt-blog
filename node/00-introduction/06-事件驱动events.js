const events=require('events');

const emitter=new events.EventEmitter();
//
// emitter.on('someEvent',function (arg1,arg2) {
//     console.log('listener1',arg1,arg2);
// })
//
// emitter.on('someEvent',function (arg1,arg2) {
//     console.log('listener2',arg1,arg2);
// })
//
// emitter.emit('someEvent','abd',1991);
// //listener1 abd 1991
// //listener2 abd 1991


emitter.emit('error');
