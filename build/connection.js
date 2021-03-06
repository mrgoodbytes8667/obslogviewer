const realm = 'kruiz-control';

class Connection {
  constructor(address, password) {
    this.obs = this._initOBS(address, password);
    this._triggers = {
      'open': [],
      'error': []
    };
  }

  on(event, callback) {
    if(!this._triggers[event])
        this._triggers[event] = [];
    this._triggers[event].push(callback);
  }

  triggerHandler(event, params) {
      if(this._triggers[event]) {
          for(var i in this._triggers[event])
              this._triggers[event][i](params);
      }
  }

  _initOBS(address, password) {
    var obs = new OBSWebSocket();
    obs.connect({ address: address, password: password })
    .then(() => {
      this.triggerHandler('connected');
    })
    .catch(err => {
      this.triggerHandler('error', err);
    });


    // You must add this handler to avoid uncaught exceptions.
    obs.on('error', function(err) {
      this.triggerHandler('error', err);
    }.bind(this));

    obs.on('BroadcastCustomMessage', function(broadcast) {
      if (broadcast.realm === realm && typeof(broadcast.data.message) !== 'undefined') {
        this.triggerHandler(broadcast.data.message, broadcast.data.data);
      }
    }.bind(this));

    obs.on('Exiting', function() {
      obs.disconnect();
    });

    return obs;
  }

  send(message, data) {
    this.obs.send('BroadcastCustomMessage', {
      'realm': realm,
      'data': {
        'message': message,
        'data': data
      }
    }).catch(err => {
      this.triggerHandler('error', err);
    });
  }
}