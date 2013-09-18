var Skype = require('./skype.js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function SkypeDbusClient(skype)
{
  EventEmitter.call(this);
  this.send = function(msg, callback) {
     skype.Invoke(msg, callback);
  };
}
util.inherits(SkypeDbusClient, EventEmitter);

var SkypeClientIface = {
  name: 'com.Skype.API.Client',
  methods: {
    Notify: ['s', '']
  }
};
 
module.exports.createClient = function(name, bus, callback) {
  var s = new Skype(bus);
  s.Invoke('NAME ' + name, function(err, res) {
    if (err) return callback(err);
    s.Invoke('PROTOCOL 7', function(err, res) {
       if (err) return callback(err);
       var client = new SkypeDbusClient(s);
       var notifyHandler = {
         Notify: function(msg) {
           client.emit('notification', msg);
         }
       };
       s.bus.exportInterface(notifyHandler, '/com/Skype/Client', SkypeClientIface);
       callback(null, client);
    });
  });
}
