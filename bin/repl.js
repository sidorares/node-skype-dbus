#!/usr/bin/env node
var repl = require('repl');

require('../index.js').createClient('skype console', null, function(err, skype) {
  repl.start({
    writer: function(msg) {
      process.stdout.write(msg);
      return '';
     },
     eval: function eval(cmd, context, filename, callback) {
       skype.send(cmd.slice(1, -2), callback);
     },
     prompt: 'skype> '
  });

  // enable if you want to see all notifications
  skype.on('notification', function(message) {
    //console.log(message);
  });
});
