var socketio        = require('socket.io')
var _               = require("underscore")
var record          = require('../models/record.js')
var record_model    = new record()
module.exports.listen = function(app){
	server = require('http').createServer(app)
    io = socketio.listen(server)
    io.set('log level',0);
    server.listen(3001)
    return io
}