function Skype(bus) {
    if (!bus) {
        bus = require('dbus-native').sessionBus();
	this.bus = bus;
    }
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/com/Skype', 'com.Skype.API', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Invoke = function(request, callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'com.Skype.API',
            member: 'Invoke',
            body: [request], 
            signature: 's',
        }, callback);
    };
}
module.exports = Skype;
module.exports['com.Skype.API'] = Skype;
module.exports['org.freedesktop.DBus.Properties'] = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/com/Skype', 'org.freedesktop.DBus.Properties', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Get = function(interface_name, property_name, callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Properties',
            member: 'Get',
            body: [interface_name, property_name], 
            signature: 'ss',
        }, callback);
    };
    this.Set = function(interface_name, property_name, value, callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Properties',
            member: 'Set',
            body: [interface_name, property_name, value], 
            signature: 'ssv',
        }, callback);
    };
    this.GetAll = function(interface_name, callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Properties',
            member: 'GetAll',
            body: [interface_name], 
            signature: 's',
        }, callback);
    };
}
module.exports['org.freedesktop.DBus.Introspectable'] = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/com/Skype', 'org.freedesktop.DBus.Introspectable', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Introspect = function(callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Introspectable',
            member: 'Introspect',
        }, callback);
    };
}
module.exports['org.freedesktop.DBus.Peer'] = function(bus) {
    this.addListener = this.on = function(signame, callback) {
        bus.addMatch('type=\'signal\',member=\'' + signame + '\'', function(err, result) {
            if (err) throw new Error(err);
        });
        var signalFullName = bus.mangle('/com/Skype', 'org.freedesktop.DBus.Peer', signame);
        bus.signals.on(signalFullName, function(messageBody) {
             callback.apply(null, messageBody);
        });
    };
    this.Ping = function(callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Peer',
            member: 'Ping',
        }, callback);
    };
    this.GetMachineId = function(callback) {
        bus.invoke({
            destination: 'com.Skype.API',
            path: '/com/Skype',
            interface: 'org.freedesktop.DBus.Peer',
            member: 'GetMachineId',
        }, callback);
    };
}
