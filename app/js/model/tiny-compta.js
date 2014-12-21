(function() {
  'use strict';

  var fs = require('fs');

  /** constructeur **/
  var TinyCompta = function() {

    this.databath    = null;
    this.dblayer     = require(__dirname + '/dal/dblayer.js');
    this.subscribers = [];
  };

  TinyCompta.prototype = {

    init: function(datapath) {
      this.datapath = datapath;
      var dbpath    = datapath + '/tinycompta_db';

      this.dblayer.initModel(dbpath);
    },

    sendEvent: function(name, data) {
      for (var key in this.subscribers) {
        if (this.subscribers[key].registerEvents().indexOf(name) > -1) {
          this.subscribers[key].handleEvent(name, data);
        }
      }
    },

    addSubscriber: function(subscriber) {
      if ('function' !== typeof subscriber.registerEvents) {
        throw new Error('subscriber object must have a registerEvents method');
      }

      if ('function' !== typeof subscriber.handleEvent) {
        throw new Error('subcriber object must have an handleEvent method');
      }

      this.subscribers.push(subscriber);
    }

  };

  module.exports = new TinyCompta();

}).call(this);
