(function() {
  'use strict';

  var fs       = require('fs');
  var mustache = require('mustache');

  var AbstractCtrl = function(container, tiny) {

    this.container = container;
    this.tiny      = tiny;
    this.mustache  = mustache;

    this.viewBuffer = fs.readFileSync(
      'views/partials/' + this._getViewName(),
      'utf8'
    );
  };

  AbstractCtrl.prototype = {

    render: function() {
      this.container.html(
        mustache.render(this.viewBuffer, this._getView())
      );

      this._initControls();
      this._mapEvents();
    },

    _getViewName: function() {
      console.log('this method must be overrided');
    },

    _getView: function() {
      return {};
    },

    _initControls: function() {
      console.log('this method must be overrided');
    },

    _mapEvents: function() {
      console.log('this method must be overrided');
    }
  };

  module.exports = AbstractCtrl;

}).call(this);
