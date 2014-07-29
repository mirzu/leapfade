var OPC = new require('./opc')
var client = new OPC('localhost', 7890);
var model = OPC.loadModel(process.argv[2] || 'strip64.json');
var Leap = new require('leapjs');

var myHand = 0;
Leap.loop(function(frame){
  frame.hands.forEach(function(hand, index) {
    //console.log(hand);
    myHand = hand.palmPosition;
    //console.log(hand.palmPosition);
  });
});

function draw() {
    var time = 0.009 * new Date().getTime();
    var numParticles = 64;
    var particles = [];
    //console.log(myHand[2]);
    var red = 0;
    var green = 0;
    var blue = 0;
    for (var i = 0; i < numParticles; i++) {
        console.log(i);
        var s = i / numParticles;
        client.setPixel(i, 0, 0, 0);
        if (myHand[0] && myHand[0] > 0 && myHand[0] < numParticles) {
          //console.log(Math.ceil(myHand[0]));
          //client.setPixel(i, 0, 0, 0);
          client.setPixel(Math.ceil(myHand[0]), 128, 0, 0);
        }
    }
    client.writePixels();
    //     var theta = myHand[0] + 0.04 * i;//time + 0.04 * i;
    //     var radius = 0.2 + 1.5 * s;
    //     var x = radius * Math.cos(theta);
    //     //var x = 1.1;
    //     var y = radius * Math.sin(theta + 10.0 * Math.sin(theta * 0.15));
    //     //var y = 3.1;
    //     var hue = time * 0.01 + s * 0.2;
    //     console.log()
    //     console.log('myHand =' + myHand[0] + " " + 'x =' + x + 'y =' + y);
    //     particles[i] = {
    //         point: [x, 0, y],
    //         intensity: 0.2 * s,
    //         falloff: 175 * 0.5,
    //         color: OPC.hsv(hue, 0.5, 0.8)
    //     };
    // }
    
    // client.mapParticles(particles, model);
}

setInterval(draw, 10);

