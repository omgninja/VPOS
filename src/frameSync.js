/**
 * File: \src\frameSync.js
 * Created Date: Tuesday, July 26th 2022, 2:29:46 pm
 * Author: Andy Jarosz
 * License:  Creative Commons Attribution Non Commercial Share Alike 4.0
 * -----
 * Copyright (c) 2022 LOLED Virtual, LLC
 */



const io = require("socket.io-client");
const URL = "http://localhost:3031";
const socket = io(URL);
const Timecode = require('smpte-timecode')
const fs = require('fs');
const config = require('../settings.json');

var frameRate = config.frameRate;
var frameRateMultiplier = config.frameRateMultiplier;
var t = Timecode(new Date(),frameRate,false);

console.log("Using Frame Rate " + config.frameRate);
console.log("Using Frame Rate Multiplier " + config.frameRateMultiplier);

//update timecode in a loop and check if it has changed
setInterval(function(){
    t = Timecode(new Date(),frameRate,false);
    // console.log(t.toString());
    socket.emit("frameSync", t.toString());
}, 1000/frameRate * frameRateMultiplier);



// Add a connect listener
socket.on('connect', function (socket) {
    console.log("Module Started");
});

